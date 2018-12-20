import {Definition} from './Definition'
// import {SIMPLE_TYPE_MAP} from '../config'

function isObjectType(t: Type): t is ObjectType {
  return t instanceof ObjectType
}
function isArrayType(t: Type): t is ArrayType {
  return t instanceof ArrayType
}

export class Type {
  static isObjectType = isObjectType
  static isArrayType = isArrayType

  /** 类型描述 */
  desc?: string

  /**
   * @param name 类型名
   */
  constructor(public name: string) {
    if (!name) throw new Error(`不支持空 Type 的创建`)
  }

  // toTS() {
  //   let type = this.name.toLowerCase()
  //   if (type in SIMPLE_TYPE_MAP) return SIMPLE_TYPE_MAP[type]

  //   let arr = type.split(/\s*|\s*/).map(t => SIMPLE_TYPE_MAP[t])
  //   if (arr.some(t => !t)) throw new Error(`无法识别的类型： "${type}"`)

  //   return arr.join(' | ')
  // }
}

export class ObjectType extends Type {
  constructor(public definitions: Definition[]) {
    super('Object')
  }

  // toTS() {

  // }
}

export class ArrayType extends Type {
  constructor(public type: Type) {
    super('Array')
  }

  // toTS() {

  // }
}
