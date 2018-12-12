import {Definition} from './Definition'

export class Type {
  /** 类型描述 */
  desc?: string

  /**
   * @param name 类型名
   */
  constructor(public name: string) {}
}

export class ObjectType extends Type {
  constructor(public definitions: Definition[]) {
    super('Object')
  }
}

export class ArrayType extends Type {
  constructor(public type: Type) {
    super('Array')
  }
}
