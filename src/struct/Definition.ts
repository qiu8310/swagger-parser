import { Type } from './Type'

export class Definition {
  /** 字段描述 */
  desc?: string

  /** 是否必传 */
  required?: boolean

  /** 可选值 */
  enum?: string[] | number[]

  /** 默认值 */
  defaultValue?: any

  /**
   * @param name 字段名称
   * @param type 字段类型
   */
  constructor(public name: string, public type: Type) {

  }

  // toTS() {

  // }
}
