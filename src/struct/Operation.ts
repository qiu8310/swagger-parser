import {FORMAT} from '../config'
import {Definition} from './Definition'
import {Type, ObjectType} from './Type'

export namespace Operation {
  export interface OperationObject {
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

  toTS() {
    let {parameters, returns} = this.opt
    let rows: string[] = []

    /**
     * 处理参数
     */
    if (parameters.length) {
      let type = new ObjectType([])
      parameters.forEach(p => {
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
      type.toTS('RawOptions', rows)
      rows.push(`export interface Options extends api.FilterRequest<RawOptions> {}`)
    }

    /**
     * 处理返回值
     */
    if (Type.isNotSimpleType(returns)) {
      returns.toTS('RawReturns', rows)
    } else {
      rows.push(`export type RawReturns = ${returns.toString()}`)
    }

    // 对象可以继承，非对象不能继承
    if (Type.isObjectType(returns)) {
      rows.push(`export interface Returns extends api.FilterResponse<RawReturns> {}`)
    } else {
      rows.push(`export type Returns = api.FilterResponse<RawReturns>`)
    }

    return rows.join(FORMAT.EOL)
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
