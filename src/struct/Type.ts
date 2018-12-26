import {capCamelCase} from 'mora-common/util/string'
import {FORMAT, SIMPLE_TYPE_MAP} from '../config'
import {Definition} from './Definition'
import {Desc} from './Desc'

const {TAB} = FORMAT

function isObjectType(t: Type): t is ObjectType {
  return t instanceof ObjectType
}
function isArrayType(t: Type): t is ArrayType {
  return t instanceof ArrayType
}
function isNotSimpleType(t: Type): t is ObjectType | ArrayType {
  return isObjectType(t) || isArrayType(t)
}

export class Type {
  static isObjectType = isObjectType
  static isArrayType = isArrayType
  static isNotSimpleType = isNotSimpleType

  /** 类型描述 */
  desc?: string

  /**
   * @param name 类型名
   */
  constructor(public name: string) {
    if (!name) throw new Error(`不支持空 Type 的创建`)
    if (name in SIMPLE_TYPE_MAP) {
      this.name =  SIMPLE_TYPE_MAP[name.toLowerCase()]
    }
    if (!this.name) throw new Error(`不支持的类型标识 "${name}"`)
  }

  toString() {
    return this.name
  }
}

export class ObjectType extends Type {
  constructor(public definitions: Definition[]) {
    super('Object')
  }

  merge(type: ObjectType) {
    let desc = new Desc()
    desc.push(this.desc)
    desc.push(type.desc)
    desc.assignTo(this)

    type.definitions.forEach(d => {
      let found = this.definitions.find(f => f.name === d.name)
      if (!found) {
        this.definitions.push(d)
      } else {
        // 使用优先级高的 Type
        if (!found.required && d.required) {
          found.required = d.required
          if (d.desc) found.desc = d.desc
        }
      }
    })

    // this.definitions.push(...type.definitions)
  }

  toTS(name: string, container: string[] = []) {
    const rows = getDesc(this.desc)

    rows.push(`export interface ${name} {`)
    this.definitions.forEach(d => {
      rows.push(...prefix(getDesc(d.desc)))

      let typeName = capCamelCase(name + ' prop ' + d.name)
      if (d.enum && d.enum.length) {
        container.push(`export type ${typeName} = ${d.enum.join(' | ')}`)
      } else if (isNotSimpleType(d.type)) {
        d.type.toTS(typeName, container)
      } else {
        typeName = d.type.toString()
      }

      rows.push(`${TAB}${d.name}${d.required ? '' : '?'}: ${typeName}`)
    })
    rows.push(`}`)

    container.push(...rows)
    return container
  }
}

export class ArrayType extends Type {
  constructor(public type: Type) {
    super('Array')
  }

  toTS(name: string, container: string[] = []) {
    const rows = getDesc(this.desc)
    let subTypeName = capCamelCase(name + 'SubItem')

    if (isNotSimpleType(this.type)) {
      this.type.toTS(subTypeName, container)
    } else {
      subTypeName = this.type.toString()
    }

    rows.push(`export type ${name} = ${subTypeName}[]`)
    container.push(...rows)

    return container
  }
}


export function getDesc(desc: string | undefined) {
  if (!desc) return []
  let lines = desc.split(/\r?\n/).map(l => {
    if (l.trim()) {
      return ' * ' + l.trimRight()
    } else {
      return ' *'
    }
  })
  return ['/**', ...lines, ' */']
}

function prefix(lines: string[], tabCount = 1) {
  return lines.map(l => TAB.repeat(tabCount) + l)
}
