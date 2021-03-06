import {FORMAT} from '../config'
import {getDocLines} from '../util'

/**
 * 支持 markdown 的 Desc
 */
export class Desc {
  private rows: string[] = []

  merge(desc: Desc) {
    this.rows.push(...desc.rows)
  }

  push(row?: string) {
    if (row) this.rows.push(row)
  }

  deprecated(deprecated?: boolean) {
    if (deprecated) this.rows.push('@deprecated')
  }

  assignTo<T extends {desc?: string}>(obj: T) {
    let s = this.toString()
    if (s.trim()) obj.desc = s
  }

  toString() {
    // markdown 需要换多行
    return this.rows.join(FORMAT.EOL.repeat(2))
  }

  toDocLines() {
    return getDocLines(this.toString())
  }
}
