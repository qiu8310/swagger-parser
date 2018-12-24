import * as fs from 'fs-extra'
import * as got from 'got'
import * as findup from 'mora-scripts/libs/fs/findup'
import * as DotProp from 'mora-scripts/libs/lang/DotProp'

import * as path from 'path'
import {FORMAT} from '../config'
import {parser2} from '../parser2'

export interface Config extends parser2.Options {
  /** 指定是给前端用的还是给 node 用的 api */
  type?: 'fe' | 'node'
  /** 指定 swagger json 的地址，可以是个 url 链接，或本地路径（相对于项目根目录） */
  json: string
  /** 生成的 ts 所在的路径（相对于项目根目录） */
  outputDir: string

  /** 生成的 api 的名称，默认使用 Api[TagName] 的结构 */
  fileNameMap?: (oldName: string) => string | boolean
}

export function lookupRootDir() {
  try {
    return path.dirname(findup.pkg())
  } catch (e) {
    throw new Error(`无法定位到项目根目录，请确保当前目录在一个含有 package.json 的项目中`)
  }
}

/**
 * 获取固定目录下的配置文件
 */
export function getConfig(): Config[] {
  const root = lookupRootDir()
  const relativePath = path.join('src', 'api', '_config.js')
  const filePath = path.join(root, relativePath)
  if (!fs.existsSync(filePath)) throw new Error(`配置文件 ${relativePath} 不存在`)

  const configs: Config[] = [].concat(require(filePath))

  // 格式化 json
  configs.forEach(c => {
    c.outputDir = path.resolve(root, c.outputDir)
    if (!isUrl(c.json)) c.json = path.resolve(root, c.json)
  })

  return configs
}

/**
 * 获取配置文件中的 swagger json 对象
 */
export async function getSwaggerJson<T>(c: Config) {
  let outputDir = c.outputDir
  let json: T
  if (isUrl(c.json)) {
    json = await getJsonFromUrl<T>(c.json)
  } else {
    json = require(c.json)
  }
  writeFile(path.join(outputDir, 'swagger.json'), JSON.stringify(json, null, 2))

  return json
}

/**
 * 判断字符串是不是一个 url 字符串
 */
function isUrl(str: string) {
  return /^\w+:/.test(str)
}


/**
 * 实时获取在线的 swagger json
 */
async function getJsonFromUrl<T = any>(jsonUrl: string): Promise<T> {
  return (await got(jsonUrl, {json: true})).body
}

export function writeFile(filepath: string, data: string | Buffer) {
  fs.ensureDirSync(path.dirname(filepath))
  // 和原文件内容一样，不需要重新写入
  if (!(data && typeof data === 'string' && data === getFile(filepath))) {
    fs.writeFileSync(filepath, data)
  }
}

export function getFile(filepath: string) {
  if (fs.existsSync(filepath)) return fs.readFileSync(filepath).toString()
  return ''
}


export interface ApiFileStruct {
  [key: string]: {
    base?: {action: 'refresh' | 'reserve', code: string}
    mock?: {action: 'refresh' | 'reserve', code: string}
    updated: boolean
  }
}

const DEFAULT_ACTION: any = {base: 'refresh', mock: 'reserve'}
/**
 * 解析已经存在的 api 文件的内容
 * @param content
 * //#region bindBankCard__base/mock  refresh/reserve (base 默认 refresh，mock 默认会 reserve)
 * //#endregion bindBankCard__base/mock
 */
export function parseApiFile(content: string) {
  const regexp = /^\/\/\s*#region\s+([a-zA-Z0-9]+)__(base|mock)(?:\s+(refresh|reserve))?([\s\S]*?)\/\/\s*#endregion\s+\1__\2/mg
  const api: ApiFileStruct = {}
  const dp = new DotProp(api)

  content.replace(regexp, (_, id, feature, action, code) => {
    if (!action) action = DEFAULT_ACTION[feature]
    dp.set(`${id}.updated`, false)
    dp.set(`${id}.${feature}`, {action, code: code.trim()})
    return _
  })

  return {api, dp}
}

export function groupApi2File(api: ApiFileStruct) {
  const rows: string[] = []
  Object.keys(api).forEach(id => {
    let {base, mock, updated} = api[id]

    let hasCode = base && updated || mock
    if (hasCode) rows.push(`//#region ${id}`)

    if (base && updated) { // 删除了的 base 不保留
      rows.push(`//#region ${id}__base${base.action && base.action !== DEFAULT_ACTION.base ? ` ${base.action}` : ''}`)
      rows.push(base.code)
      rows.push(`//#endregion ${id}__base`)
      if (mock) rows.push('') // 添加一个空行
    }
    if (mock) { // 删除了的 mock 继续保留，但加上注释，并且自动重置成空 action
      rows.push(`//#region ${id}__mock`)
      rows.push(updated ? mock.code : commentCode(mock.code))
      rows.push(`//#endregion ${id}__mock`)
    }
    if (hasCode) rows.push(`//#endregion ${id}`, '')
  })
  return rows.join(FORMAT.EOL)
}

export function isCodeCommented(code: string) {
  return code.split(/\r?\n/).every(l => {
    l = l.trim()
    if (!l) return true
    if (l.startsWith('/**') || l.startsWith('*') || l.startsWith('*/')) return true
    if (l.startsWith('//')) return true
    return false
  })
}
export function commentCode(code: string) {
  if (isCodeCommented(code)) return code
  return code.split(/\r?\n/).map(row => {
    let l = row.trim()
    if (!l) return row
    if (l.startsWith('/**') || l.startsWith('*') || l.startsWith('*/')) return row
    return '// ' + row
  }).join(FORMAT.EOL)
}
