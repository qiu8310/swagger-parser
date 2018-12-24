import {FORMAT} from '../config'
import {Definition} from './Definition'
import {Type, ObjectType, getDesc} from './Type'

const {EOL} = FORMAT


export namespace Operation {
  export interface OperationObject {
    /** 当前 api 所在的标签名称 */
    tag: string
    /** 处理过后的 operationId  */
    id: string
    /** swagger 文档中的 operationId */
    rawId: string
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
  constructor(public opt: Operation.OperationObject) {

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

  toNodeBase() {

  }

  toNodeMock() {

  }

  toFeBase(config: {baseMethod?: string}) {
    const {id, tag, parameters, desc, method, path} = this.opt
    const hasOptions = parameters.length

    // 获取配置
    const settingRows = [`path: '${path.replace(/{(\w+)}/g, ':$1')}'`]
    if (method !== config.baseMethod) settingRows.push(`method: '${method}'`)
    if (parameters.find(p => p.in === 'formData')) settingRows.push(`http: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}`)
    parameters.forEach(p => {
      if (Type.isObjectType(p.type)) {
        let str = p.type.definitions.map(d => d.name).join('&')
        if (p.in === 'formData' || p.in === 'body') settingRows.push(`body: '${str}'`)
        else if (p.in === 'header') settingRows.push(`header: '${str}'`)
        else if (p.in === 'query') settingRows.push(`query: '${str}'`)
      }
    })
    const setting = settingRows.join(', ')

    // api 调用
    let opt = hasOptions ? ` export type O = ${tag}.${id}.O;` : ''
    let ns = `export namespace ${id} {${opt} export type R = ${tag}.${id}.R }`
    const apiRows = [ns, ...getDesc(desc)]
    if (hasOptions) {
      apiRows.push(`export const ${id} = api<${id}.O, ${id}.R>(s + '${id}', {${setting}})`)
    } else {
      apiRows.push(`export const ${id} = api<${id}.R>(s + '${id}', {${setting}})`)
    }

    return apiRows.join(EOL)
  }

  toFeMock() {
    return ''
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

  /** 忽略指定位置的参数 */
  omitParameter(location: Operation.IN, targetPath: string) {}

  /** 忽略 response 中的某个字段 */
  omitResponse(targetPath: string) {}
  /** 选择 response 中的某个字段来作为新的 response */
  pickResponse(targetPath: string) {}
  /** 将旧的 response 对象放入一个新的 response（对象） 中 */
  wrapResponse(wrapContainer: any) {}
}
