import * as findup from 'mora-scripts/libs/fs/findup'

import * as fs from 'fs-extra'
import * as got from 'got'
import * as path from 'path'
import {parser2} from '../parser2'

export interface Config extends parser2.Options {
  /** 指定是给前端用的还是给 node 用的 api */
  type?: 'fe' | 'node'
  /** 指定 swagger json 的地址，可以是个 url 链接，或本地路径（相对于项目根目录） */
  json: string
  /** 生成的 ts 所在的路径（相对于项目根目录） */
  outputDir: string
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
  fs.writeFileSync(filepath, data)
}
