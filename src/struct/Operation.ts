import * as warn from 'mora-scripts/libs/sys/warn'

import {FORMAT} from '../config'
import {mock} from '../services/mock'
import {Mock} from '../services/types'
import {Definition} from './Definition'
import {Desc} from './Desc'
import {Type, ObjectType} from './Type'

const {EOL, TAB} = FORMAT

class LocateError extends Error {}

export namespace Operation {
  export interface OperationObject {
    /** 处理过的标准的标签名称 */
    tag: string
    /** 处理过后的 operationId  */
    id: string
    /** swagger 文档中的 operationId */
    rawId: string
    /** swagger 文档中的 tag 名称 */
    rawTag: string
    /** 描述 */
    desc?: string
    /** http method，大写字母 */
    method: string
    /** 如果 path 中有参数，会使用 {} 包裹 */
    path: string
    /** 参数，分不同的地方，可以存在 query/header/path/formData/cookie/body 中 */
    parameters: ParameterObject[]
    /** 返回的类型 */
    returns: Type
  }

  export type IN = 'query' | 'header' | 'path' | 'formData' | 'cookie' | 'body'

  export interface BodyParameterObject {
    in: 'body'
    type: Type
  }

  export interface RestParameterObject {
    in: Exclude<IN, 'body'>
    type: ObjectType
  }

  export type ParameterObject = BodyParameterObject | RestParameterObject
}

export class Operation {
  static parseTargetPath = parseTargetPath
  constructor(public opt: Operation.OperationObject) {
  }

  get key() {
    return this.opt.tag + '.' + this.opt.id
  }

  private mergeParameters() {
    let type = new ObjectType([])
    this.opt.parameters.forEach(p => {
      if (p.in === 'body') {
        if (Type.isObjectType(p.type)) {
          type.merge(p.type)
        } else {
          type.merge(new ObjectType([new Definition('__rawBody', p.type, true)]))
        }
      } else {
        // 其它情况肯定是 ObjectType
        if (Type.isObjectType(p.type)) {
          type.merge(p.type)
        } else {
          throw new Error(`内部解析引擎问题！（非 body 类型的参数应该都是 ObjectType）`)
        }
      }
    })
    return type
  }

  toBase(config: {baseMethod?: string, language?: string, docPrefix?: string}) {
    const {id, tag, parameters, desc, method, path} = this.opt
    const hasOptions = parameters.length

    // 获取配置
    const settingRows = [`path: '${path.replace(/{(\w+)}/g, ':$1')}'`]
    if (method !== config.baseMethod) settingRows.push(`method: '${method}'`)
    if (parameters.find(p => p.in === 'formData')) settingRows.push(`http: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}`)
    parameters.forEach(p => {
      if (Type.isObjectType(p.type) && p.type.definitions.length) {
        let str = p.type.definitions.map(d => d.name).join('&')
        if (p.in === 'formData' || p.in === 'body') settingRows.push(`body: '${str}'`)
        else if (p.in === 'header') settingRows.push(`header: '${str}'`)
        else if (p.in === 'query') settingRows.push(`query: '${str}'`)
      }
    })
    const setting = settingRows.join(', ')
    const apiRows: string[] = []

    let {opt} = this
    let doc = new Desc()
    doc.push(desc)
    doc.push(`${EOL}**TAG:** ${opt.rawTag}； &nbsp;&nbsp; **PATH:** ${opt.path}；`)

    if (config.docPrefix) {
      doc.push(`@see [线上文档](${config.docPrefix}/${this.opt.rawTag}/${this.opt.rawId})`)
    }

    // api 调用
    if (config.language === 'js') {
      let ns = `@type {import("@hujiang/foe-api").Application.ApiReturnsWithData<import("./modal").${tag}.${id}.O, import("./modal").${tag}.${id}.R, api.FilterMock<import("./modal").${tag}.${id}.R>>}`
      doc.push(ns)
      apiRows.push(...doc.toDocLines())
      apiRows.push(`export const ${id} = api(s + '${id}', {${setting}})`)
    } else {
      let nsOpt = hasOptions ? ` export type O = ${tag}.${id}.O;` : ''
      let ns = `export namespace ${id} {${nsOpt} export type R = ${tag}.${id}.R }`
      apiRows.push(ns, ...doc.toDocLines())
      if (hasOptions) {
        apiRows.push(`export const ${id} = api<${id}.O, ${id}.R>(s + '${id}', {${setting}})`)
      } else {
        apiRows.push(`export const ${id} = api<${id}.R>(s + '${id}', {${setting}})`)
      }
    }

    return apiRows.join(EOL)
  }

  toMock(setting: Mock = {}) {
    const {returns, id} = this.opt
    let mockStr = mock(setting, returns, this)
    if (!mockStr) return ''

    mockStr = mockStr.replace(/\r?\n/g, EOL + TAB) // 换行后面加个 TAB
    mockStr = `${id}.mock('自动生成', () => {${EOL}${TAB}return ${mockStr}${EOL}})`
    return [
      `if (__DEV__) {`,
      ...mockStr.split(/\r?\n/).map(r => TAB + r),
      '}'
    ].join(EOL)
  }

  /**
   * modal 是给 foeApi 和 nodeApi 的 ts 定义
   */
  toModal() {
    const {parameters, returns} = this.opt
    const modal: string[] = []

    /**
     * 处理参数
     */
    if (parameters.length) {
      const paramType = this.mergeParameters()
      paramType.toTS('Options', modal)
      modal.push(`export interface O extends api.FilterRequest<Options> {}`)
    }

    /**
     * 处理返回值
     */
    if (Type.isNotSimpleType(returns)) {
      returns.toTS('Returns', modal)
    } else {
      modal.push(`export type Returns = ${returns.toString()}`)
    }

    // 对象可以继承，非对象不能继承
    if (Type.isObjectType(returns)) {
      modal.push(`export interface R extends api.FilterResponse<Returns> {}`)
    } else {
      modal.push(`export type R = api.FilterResponse<Returns>`)
    }

    return modal.join(EOL)
  }

  /** 获取指定路径上的 Type */
  operateSubTypeByPath(type: Type, targetPath: string): Type
  /** 删除指定路径上的 Type，返回删除了的 Type */
  operateSubTypeByPath(type: Type, targetPath: string, omit: boolean): Type
  operateSubTypeByPath(type: Type, targetPath: string, omit?: boolean) {
    let parts = parseTargetPath(targetPath)
    let error = () => {
      throw new LocateError(`${this.key} 无法定位路径 ${targetPath}`)
    }

    for (let i = 0; i < parts.length; i++) {
      let {key, indexes} = parts[i]
      for (let index = 0; index < indexes.length; index++) {
        if (Type.isArrayType(type)) {
          type = type.type
        } else {
          error()
        }
      }

      if (Type.isObjectType(type)) {
        let definition = type.definitions.find(d => d.name === key)
        if (definition) {
          if (i === parts.length - 1 && omit) {
            type.definitions = type.definitions.filter(d => d !== definition)
          }
          type = definition.type
        } else {
          error()
        }
      } else {
        error()
      }
    }

    return type
  }

  private __operateSubTypeByPath(ignoreWarn: boolean, type: Type, targetPath: string, omit?: boolean) {
    try {
      return this.operateSubTypeByPath(type, targetPath, !!omit)
    } catch (e) {
      if (e instanceof LocateError) {
        if (!ignoreWarn) warn(e.message)
        return type
      } else {
        throw e
      }
    }
  }

  /**
   * 忽略指定位置的参数
   *
   * @param targetPath 字段的路径，如下示例：
   *
   * - 'code'         忽略对象中的 code 字段
   * - '[].code'      忽略数组中的每一项中的 code 字段
   * - 'data.code'    忽略 data.code 字段
   * - 'arr[].code'   忽略数组 arr 中每一项的 code 字段
   * - 'arr[][].code' 忽略数组 arr 中所有数组中的每一项的 code 字段
   */
  omitParameter(location: Operation.IN, targetPath: string, ignoreWarn = false) {
    let param = this.opt.parameters.find(p => p.in === location)
    if (!param) {
      if (!ignoreWarn) {
        warn(`${this.key} 中的 ${location} 没有任何参数`)
      }
    } else {
      this.__operateSubTypeByPath(ignoreWarn, param.type, targetPath, true)
    }
    return this
  }

  /**
   * 忽略 response 中的某个字段
   *
   * @param targetPath 字段的路径，如下示例：
   *
   * - 'code'         忽略对象中的 code 字段
   * - '[].code'      忽略数组中的每一项中的 code 字段
   * - 'data.code'    忽略 data.code 字段
   * - 'arr[].code'   忽略数组 arr 中每一项的 code 字段
   * - 'arr[][].code' 忽略数组 arr 中所有数组中的每一项的 code 字段
   */
  omitResponse(targetPath: string, ignoreWarn = false) {
    this.__operateSubTypeByPath(ignoreWarn, this.opt.returns, targetPath, true)
    return this
  }

  /**
   * 选择 response 中的某个字段来作为新的 response
   * @param targetPath 字段的路径，如下示例：
   *
   * - 'code'         忽略对象中的 code 字段
   * - '[].code'      忽略数组中的每一项中的 code 字段
   * - 'data.code'    忽略 data.code 字段
   * - 'arr[].code'   忽略数组 arr 中每一项的 code 字段
   * - 'arr[][].code' 忽略数组 arr 中所有数组中的每一项的 code 字段
   */
  pickResponse(targetPath: string, ignoreWarn = false) {
    let {returns} = this.opt
    let type = this.__operateSubTypeByPath(ignoreWarn, returns, targetPath)
    type.desc = returns.desc
    this.opt.returns = type
    return type
  }
}

function parseTargetPath(targetPath: string) {
  const res: Array<{indexes: number[], key: string}> = []
  const regWithKey = /^(\w+)\[\s*(\d*)\s*\](.*)$/
  const regWithoutKey = /^\[\s*(\d*)\s*\](.*)$/
  const toIndex = (s: string) => s ? parseInt(s, 10) : -1

  let indexes: number[] = []
  targetPath.split('.').forEach(key => {
    if (regWithKey.test(key)) {
      res.push({key: RegExp.$1, indexes})
      indexes = []
      indexes.push(toIndex(RegExp.$2))
      key = RegExp.$3
    } else if (regWithoutKey.test(key)) {
      indexes.push(toIndex(RegExp.$1))
      key = RegExp.$2
    } else {
      res.push({key, indexes})
      indexes = []
      key = ''
    }

    while (key) {
      if (regWithoutKey.test(key)) {
        indexes.push(toIndex(RegExp.$1))
        key = RegExp.$2
      } else {
        throw new Error(`无法解析路径 "${targetPath}"`)
      }
    }
  })

  if (indexes.length) throw new Error(`路径 "${targetPath}" 最后一个不能是数组`)

  return res
}
