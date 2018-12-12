/**!
 * 对 swagger2.0 的解析
 */

import {swagger2} from './schema/swagger2'
import * as DotProp from 'mora-scripts/libs/lang/DotProp'
import {Type, ArrayType, ObjectType} from './struct/Type'
import {Desc} from './struct/Desc'
import {Definition} from './struct/Definition'
import {SIMPLE_TYPE_MAP} from './config'
import {Omit} from './util'
import {writeFileSync} from 'fs'

export namespace parser2 {
  export interface Options {
    /**
     * 如果 swagger 中的接口没有指定 tag 名称，则使用这个名称（ 默认为 "tag" ）
     */
    defaultTagName?: string
  }

  export namespace Returns {
    export interface Object {
      tags: TagsObject
    }

    export interface TagsObject {
      [tagKey: string]: OperationsObject
    }

    export interface OperationsObject {
      [operationId: string]: {
        desc: string
        method: string
        /** 如果 path 中有参数，会使用 {} 包裹 */
        path: string
        parameters: ParameterObject[]
        returns: Type
      }
    }

    export interface BodyParameterObject {
      in: 'body'
      type: Type
    }

    export interface RestParameterObject {
      in: 'query' | 'header' | 'path' | 'formData' | 'cookie'
      type: ObjectType
    }

    export type ParameterObject = BodyParameterObject | RestParameterObject
  }
}

export function parser2(schema: swagger2.Schema, options: parser2.Options = {}) {
  const tags: parser2.Returns.TagsObject = {}

  // 遍历所有 path
  Object.entries(schema.paths).forEach(([pathKey, pathObj]) => {
    const {$ref, parameters, ...restPathObj} = pathObj

    // 遍历所有 operation (即 get/post/delete 这种 http method)
    const allPathObj: {[key: string]: swagger2.OperationObject} = {...getRef(schema, $ref), ...restPathObj} as any
    Object.entries(allPathObj).forEach(([operationMethod, operationObject]) => {
      // 合并全局定义的 parameters
      const operationParameters = [...(parameters || []), ...(operationObject.parameters || [])]

      if (operationObject.deprecated) return

      // 将 http method 改成大写
      operationMethod = operationMethod.toUpperCase()

      // 此 http api 所在的 tag
      const operationTags = operationObject.tags || []
      if (!operationTags.length) operationTags.push(options.defaultTagName || 'tag')

      // 遍历所有 tag ( 一般一个 api 只会定义一个 tag )
      operationTags.forEach(t => {
        let operations = getObjectValue(tags, t)
        let operation = getObjectValue(operations, operationObject.operationId)
        operation.method = operationMethod
        operation.path = pathKey

        operation.desc = parseOperationDesc(operationObject)
        operation.parameters = parseOperationParameters(schema, operationParameters)

        // TODO: operationObject.security
      })

    })
  })

  // console.log(tags)
  writeFileSync('./s.json', JSON.stringify(tags, null, 2))
}

function parseOperationDesc(operationObject: swagger2.OperationObject) {
  let desc = new Desc()
  desc.push(operationObject.summary)
  desc.push(operationObject.description)
  desc.deprecated(operationObject.deprecated)

  let {externalDocs} = operationObject
  if (externalDocs) desc.push(`${externalDocs.description || 'external docs'} @see ${externalDocs.url}`)

  return desc.toString()
}

function parseObjectDesc<T extends {description?: string, enum?: any[], default?: any}>(param: T) {
  let desc = new Desc()
  desc.push(param.description)
  if (param.enum) desc.push(`可选值：${param.enum.map(e => JSON.stringify(e)).join(' | ')}`)
  if (param.hasOwnProperty('default')) desc.push(`默认值：${JSON.stringify(param.default)}`)
  return desc.toString()
}

function parseOperationParameters(schema: swagger2.Schema, operationParameters: swagger2.ParameterObject[]): parser2.Returns.ParameterObject[] {
  let res: parser2.Returns.ParameterObject[] = []
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
      const foundObj: parser2.Returns.ParameterObject = !found ? {in: p.in, type} : found
      if (found) foundObj.type = type
      else res.push(foundObj)
    } else {
      let def = new Definition(p.name, new Type(SIMPLE_TYPE_MAP[p.type] || p.type))
      def.required = !!p.required
      def.desc = parseObjectDesc(p)
      map[p.in].push(def)
    }
  })

  Object.keys(map).forEach(k => {
    const defs = map[k]
    if (defs.length) res.push({in: k as 'query', type: new ObjectType(defs)})
  })

  return res
}

function getSchemaObjectType(schema: swagger2.Schema, obj: swagger2.SchemaObject) {
  const mergedObj = mergeRef(obj, schema)
  const {type = 'any', items, required = []} = mergedObj
  let rtn: Type
  if (type === 'array') {
    if (items) {
      const mergedItems = mergeRef(items, schema)
      const mergedType = getSchemaObjectType(schema, mergedItems)
      rtn = new ArrayType(mergedType)
    } else {
      rtn = new ArrayType(new Type('any'))
    }
  } else if (type === 'object') {
    const defs: Definition[] = []
    rtn = new ObjectType(defs)
    Object.entries(mergedObj.properties || {}).forEach(([propKey, propValue]) => {
      const def = new Definition(propKey, getSchemaObjectType(schema, propValue))
      def.required = required.includes(propKey)
      defs.push(def)
    })
  } else {
    let typeArr = Array.isArray(type) ? type : [type]
    rtn = new Type(typeArr.map(t => SIMPLE_TYPE_MAP[t] || t).join(' | '))
  }
  rtn.desc = parseObjectDesc(mergedObj)
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

parser2(require('../example/daybreak.json'))
// parser2(require('../example/credit.json'))
