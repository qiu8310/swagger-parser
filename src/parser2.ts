/**!
 * 对 swagger2.0 的解析
 */
import {camelCase, capCamelCase} from 'mora-common/util/string'
import * as DotProp from 'mora-scripts/libs/lang/DotProp'

import {swagger2} from './schema/swagger2'
import {Definition} from './struct/Definition'
import {Desc} from './struct/Desc'
import {Operation} from './struct/Operation'
import {Type, ArrayType, ObjectType} from './struct/Type'
import {Omit, eachObject, isValidTagName, smartGetUniqueTagNameFromPaths} from './util'

export namespace parser2 {
  export interface Options {
    /**
     * 如果 swagger 中的接口没有指定 tag 名称，则使用这个名称（ 默认为 "tag" ）
     */
    defaultTagName?: string

    /**
     * 默认情况下标识为 deprecated 的 api 会去除，设定此为 true 可以保留这些 api
     */
    reserveDeprecatedApi?: boolean

    /**
     * 对 tag 和 api 的名称处理
     *
     * 有些 swagger 生成的 tag 都默认会带 "-endpoint" 后缀，如 "order-endpoint"
     * 同时，有些 swagger 生成的 api 都会加上 "UsingPOST/GET/DELETE" 后缀，如 "createOrderUsingPOST"
     */
    normalizeName?: boolean

    /**
     * 后台的 tag name 经常是中文名，而 swagger-parser 需要将 tag name 当作文件名称
     * 所以不能用中文名，如果此选项为 true，则会根据 api 的路径来智能的获取不重复的 tag name，
     * 此操作在 tagNameMap 之前，并且当且仅当 tag name 中不存在英文时会解析
     *
     * 默认值： true
     */
    smartTagName?: boolean

    /**
     * 将 tag 的名称映射成另一个
     *
     * 如果返回 false，则整个 tag 和它下面的 api 都不会生成 json
     * 如果返回 true，则名字不变
     */
    tagNameMap?: (oldName: string) => string | boolean

    /**
     * 将 api 的名称映射成另一个
     *
     * 如果返回 false，则会不会生成此 api 相关的 json
     * 如果返回 true，则名字不变
     */
    apiNameMap?: (oldName: string) => string | boolean

    /**
     * 对 api 的参数或返回值进行过滤处理
     *
     * tagName、apiName 是 tagNameMap、apiNameMap 处理过后的值
     *
     * 注意：如果一个 api 有多个 tag，则同一个接口会多次调用此函数
     */
    operationMap?: (operation: Operation, tagName: string, apiName: string) => void
  }

  export namespace Returns {
    export interface Object {
      tags: TagsObject
    }

    export interface TagsObject {
      [tagKey: string]: OperationsObject
    }

    export interface OperationsObject {
      [operationId: string]: Operation
    }
  }
}

export function parser2(schema: swagger2.Schema, options: parser2.Options = {}) {
  const tags: parser2.Returns.TagsObject = {}
  const operations: Operation[] = []
  // 含有默认值的配置
  const {normalizeName = true, smartTagName = true} = options

  // 遍历所有 path
  eachObject(schema.paths, (pathKey, pathObj) => {
    const {$ref, parameters, ...restPathObj} = pathObj

    // 遍历所有 operation (即 get/post/delete 这种 http method)
    const allPathObj: {[key: string]: swagger2.OperationObject} = {...getRef(schema, $ref), ...restPathObj} as any

    eachObject(allPathObj, (operationMethod, operationObject) => {
      // 合并全局定义的 parameters
      const operationParameters = [...(parameters || []), ...(operationObject.parameters || [])]

      if (operationObject.deprecated && !options.reserveDeprecatedApi) return

      // 将 http method 改成大写
      operationMethod = operationMethod.toUpperCase()

      // 此 http api 所在的 tag
      const operationTags = operationObject.tags || []
      if (!operationTags.length) operationTags.push(options.defaultTagName || 'tag')

      // 遍历所有 tag ( 一般一个 api 只会定义一个 tag )
      operationTags.forEach(tagName => {
        let apiName = operationObject.operationId

        if (normalizeName) tagName = normalizeTagName(tagName)
        if (options.tagNameMap) {
          let newname = options.tagNameMap(tagName)
          if (!newname) return
          if (typeof newname === 'string') tagName = newname
        }
        // , capCamelCase 会过滤掉中文，所以如果是中文的话则使用它本身
        tagName = isValidTagName(tagName) ? capCamelCase(tagName) : tagName

        if (normalizeName) apiName = normalizeApiName(apiName)
        if (options.apiNameMap) {
          let newname = options.apiNameMap(apiName)
          if (!newname) return
          if (typeof newname === 'string') apiName = newname
        }
        apiName = camelCase(apiName)

        let tagOperations = getObjectValue(tags, tagName)
        let operation = {} as Operation.OperationObject

        operation.tag = tagName
        operation.id = apiName
        operation.rawId = operationObject.operationId
        operation.method = operationMethod.toUpperCase()
        operation.path = pathKey

        parseOperationDesc(operationObject).assignTo(operation)
        operation.parameters = parseOperationParameters(schema, operationParameters)

        // operation.returns
        let r = operationObject.responses['200'] || operationObject.responses.default
        let returnType = new Type('any')
        if (r) {
          r = mergeRef(r as any, schema) as swagger2.ResponseObject
          if (r.schema) {
            returnType = getSchemaObjectType(schema, r.schema, true)
          }
          if (r.description) returnType.desc = r.description
        }
        operation.returns = returnType

        tagOperations[apiName] = new Operation(operation)
        operations.push(tagOperations[apiName])
      })
    })
  })

  if (smartTagName) {
    let takenTags: string[] = []
    let invalidTagObjs: Array<{paths: string[], name: string}> = []
    eachObject(tags, (tagName, tagObj) => {
      if (isValidTagName(tagName)) takenTags.push(tagName)
      else invalidTagObjs.push({name: tagName, paths: Object.entries(tagObj).map(([k, v]) => v.opt.path)})
    })
    let newTagMap = smartGetUniqueTagNameFromPaths(invalidTagObjs, takenTags)
    eachObject(newTagMap, (oldTagName, newTagName) => {
      tags[newTagName] = tags[oldTagName]
      delete tags[oldTagName]
      eachObject(tags[newTagName], (apiName, operation) => operation.opt.tag = newTagName)
    })
  }

  eachObject(tags, (tagName) => {
    if (!isValidTagName(tagName)) {
      throw new Error(`Tag 名称（"${tagName}"）需要是纯英文的，请使用 tagNameMap 将其转化成英文名`)
    }
  })
  operations.forEach(op => options.operationMap && options.operationMap(op, op.opt.tag, op.opt.id))
  return tags
}

function parseOperationDesc(operationObject: swagger2.OperationObject) {
  let desc = new Desc()
  desc.push(operationObject.summary)
  desc.push(operationObject.description)
  desc.deprecated(operationObject.deprecated)

  let {externalDocs} = operationObject
  if (externalDocs) desc.push(`${externalDocs.description || 'external docs'} @see ${externalDocs.url}`)

  return desc
}


function parse2definition(param: swagger2.SchemaObject | swagger2.RestParameterObject, def: Definition) {
  let desc = new Desc()
  desc.push(param.description)

  if (param.enum) {
    def.enum = param.enum.map(a => JSON.stringify(a))
    desc.push(`可选值： ${def.enum.join(' | ')}`)
  }
  if (param.hasOwnProperty('default')) {
    def.defaultValue = JSON.stringify(param.default)
    desc.push(`默认值： ${def.defaultValue}`)
  }

  desc.assignTo(def)
}

function parseOperationParameters(schema: swagger2.Schema, operationParameters: swagger2.ParameterObject[]): Operation.ParameterObject[] {
  let res: Operation.ParameterObject[] = []
  let map: {[key: string]: Definition[]} = {
    query: [],
    header: [],
    path: [],
    formData: []
  }

  operationParameters.forEach(p => {
    if (p.in === 'body') {
      const type = getSchemaObjectType(schema, p.schema)
      if (!type.desc && p.description) type.desc = p.description
      const found = res.find(r => r.in === p.in)
      const foundObj: Operation.ParameterObject = !found ? {in: p.in, type} : found
      if (found) foundObj.type = type
      else res.push(foundObj)
    } else {
      let def = new Definition(p.name, new Type(p.type))
      def.required = !!p.required
      parse2definition(p, def)
      map[p.in].push(def)
    }
  })

  Object.keys(map).forEach(k => {
    const defs = map[k]
    if (defs.length) res.push({in: k as 'query', type: new ObjectType(defs)})
  })

  return res
}

/**
 *
 * @param schema
 * @param obj
 * @param defaultRequired 默认是否 required （ 主要针对 response，response 中的对象应该统一 required ）
 */
function getSchemaObjectType(schema: swagger2.Schema, obj: swagger2.SchemaObject, defaultRequired?: boolean) {
  const mergedObj = mergeRef(obj, schema)
  const {type = 'any', items, required = []} = mergedObj
  let rtn: Type
  if (type === 'array') {
    if (items) {
      const mergedItems = mergeRef(items, schema)
      const mergedType = getSchemaObjectType(schema, mergedItems, defaultRequired)
      rtn = new ArrayType(mergedType)
    } else {
      rtn = new ArrayType(new Type('any'))
    }
  } else if (type === 'object') {
    const defs: Definition[] = []
    rtn = new ObjectType(defs)
    eachObject(mergedObj.properties || {}, (propKey, propValue) => {
      const def = new Definition(propKey, getSchemaObjectType(schema, propValue, defaultRequired))
      if (propValue.description) def.desc = propValue.description
      def.required = defaultRequired && !required.length ? defaultRequired : required.includes(propKey)
      defs.push(def)
    })
  } else {
    let typeArr = Array.isArray(type) ? type : [type]
    rtn = new Type(typeArr.join(' | '))
  }
  if (mergedObj.description) rtn.desc = mergedObj.description
  return rtn
}

/**
 * 获取定义
 * @param schema swagger schema
 * @param $ref #/definitions/Pet
 */
function getRef<T = any>(schema: swagger2.Schema, $ref?: string): undefined | T {
  if (!$ref) return
  const dp = new DotProp(schema)
  const refPath = $ref.replace(/^#\//, '').split('/').join('.')
  return dp.get(refPath)
}

/** 合并 ref 中引用的字段 */
function mergeRef<T extends {$ref?: string}>(obj: T, schema: swagger2.Schema): Omit<T, '$ref'> {
  const {$ref, ...rest} = obj as any
  if ($ref) {
    return {...rest, ...getRef(schema, $ref) as any}
  }
  return rest
}

/**
 * 获取对象中指定的 key 的值，如果不存在，则设置其为 defaultValue
 */
function getObjectValue<T>(obj: {[key: string]: T}, key: string, defaultValue: T = {} as any): T {
  if (!obj[key]) obj[key] = defaultValue
  return obj[key]
}

function normalizeTagName(name: string) {
  return name.replace(/-endpoint$/, '')
}

function normalizeApiName(name: string) {
  return name.replace(/Using[A-Z]+$/, '')
}
