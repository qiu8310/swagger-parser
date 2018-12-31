import {sample} from 'mora-common/util/array'
import {Operation} from '../struct/Operation'
import {clone, isArrayPath} from '../util'
import {Mock} from './types'
const yod = require('yod-mock')

export namespace ExampleMock {
  export interface Condition {
    tag?: string
    id?: string
    fields: Field[]
  }

  export interface ArrayField {
    type: 'array'
    index: number
  }

  export type Flag = 'start' | 'end' | 'include' | 'equal'
  export interface ObjectField {
    type: 'object'
    flag: Flag
    key: string
  }

  export type Field = ArrayField | ObjectField
}

const FLAG_MAP: {[key: string]: ExampleMock.Flag} = {'~': 'include', '^': 'start', '$': 'end'}


export class ExampleMock {
  // @ts-ignore
  private internalMatch: (prefixes: string[]) => boolean
  /**
   * @param isLeaf 是否是叶子节点
   */
  match(prefixes: string[], isLeaf: boolean) {
    if (this.opts.leaf && !isLeaf) return false
    return this.internalMatch(prefixes)
  }

  constructor(private opts: Required<Mock>['examples'][0], public operation: Operation) {
    let m = this.opts.match
    if (typeof m === 'function') {
      let fn = m
      this.internalMatch = (prefixes: string[]) => fn(this.operation, prefixes)
    } else if (typeof m === 'string') {
      this.internalMatch = this.generateMatchByStr(m)
    }
  }

  private parseCondition(str: string): ExampleMock.Condition {
    let tagRegExp = /@(\w+)\b/
    let tag: undefined | string
    if (tagRegExp.test(str)) {
      tag = RegExp.$1
      str = str.replace(tagRegExp, '')
    }

    let idRegExp = /#(\w+)\b/
    let id: undefined | string
    if (idRegExp.test(str)) {
      id = RegExp.$1
      str = str.replace(idRegExp, '')
    }

    const regWithKey = /^([~^$])?(\w+)\[\s*(\d*)\s*\](.*)$/
    const regWithoutKey = /^\[\s*(\d*)\s*\](.*)$/
    const fields: ExampleMock.Field[] = []
    const toIndex = (s: string) => s ? parseInt(s, 10) : -1
    const toFlag: ((s: string) => ExampleMock.Flag) = (s: string) => (FLAG_MAP[s] || 'equal')

    const parts = str.split('.')
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i]

      while (part) {
        if (regWithKey.test(part)) {
          let flag = RegExp.$1
          let key = RegExp.$2
          let index = RegExp.$3
          part = RegExp.$4
          fields.push(
            {type: 'object', flag: toFlag(flag), key},
            {type: 'array', index: toIndex(index)}
          )
        } else if (regWithoutKey.test(part)) {
          let index = RegExp.$1
          part = RegExp.$2
          fields.push({type: 'array', index: toIndex(index)})
        } else {
          if (FLAG_MAP[part[0]]) {
            fields.push({type: 'object', key: part.slice(1), flag: FLAG_MAP[part[0]]})
          } else {
            fields.push({type: 'object', key: part, flag: 'equal'})
          }
          part = ''
        }
      }
    }

    return {
      tag,
      id,
      fields
    }
  }

  private matchCondition(cond: ExampleMock.Condition, prefixes: string[]) {
    let {tag, id} = this.operation.opt
    if (cond.tag && cond.tag !== tag) return false
    if (cond.id && cond.id !== id) return false
    if (cond.fields.length > prefixes.length) return false
    // 空和空匹配才算成功
    if (cond.fields.length === 0 && prefixes.length) return false

    if (this.opts.exect && cond.fields.length !== prefixes.length) return false

    let fields = [...cond.fields].reverse()
    let keys = [...prefixes].reverse()

    return fields.every((f, i) => {
      let key = keys[i]
      if (f.type === 'array') {
        if (!isArrayPath(key)) return false
        if (f.index === -1 || `[${f.index}]` === key) return true
      } else if (f.type === 'object') {
        if (f.flag === 'equal' && f.key === key) return true
        if (f.flag === 'include' && key.includes(f.key)) return true
        if (f.flag === 'start' && key.startsWith(f.key)) return true
        if (f.flag === 'end' && key.endsWith(f.key)) return true
      }
      return false
    })
  }

  private generateMatchByStr(m: string) {
    let orConditions = m.split(/\s*\|+\s*/).map(c1 => {
      let andConditions = c1.split(/\s*\&+\s*/).map(c2 => this.parseCondition(c2))
      return andConditions
    })

    return (prefixes: string[]) => {
      return orConditions.some(andConditions => andConditions.every(cond => this.matchCondition(cond, prefixes)))
    }
  }

  mock(prefixes: string[]) {
    let {value} = this.opts
    let isExample = false
    let res: any
    if (typeof value === 'function') {
      res = clone(value(this.operation, prefixes))
    } else if (Array.isArray(value)) {
      res = clone(sample(value))
    } else if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      res = yod(value.substr(1, value.length - 2))
    } else {
      res = value
      isExample = true
    }
    return {isExample, value: res}
  }
}
