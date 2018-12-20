import * as fs from 'fs-extra'
import {series} from 'mora-common/util/async'

import * as path from 'path'
import {parser2} from '../parser2'
import {swagger2} from '../schema/swagger2'
import {Operation} from '../struct/Operation'
import {eachObject} from '../util'
import {getConfig, getSwaggerJson, writeFile} from './helper'

export async function generate() {
  await series(getConfig(), async c => {
    const json = await getSwaggerJson<swagger2.Schema>(c)
    if (!/^2\./.test(json.swagger)) throw new Error(`不支持 swagger 版本：${json.swagger}`)

    const {type = 'fe'} = c
    const tags = parser2(json, c)

    const tpl = (...name: string[]) => path.resolve(__dirname, 'template', type, ...name)
    const out = (...name: string[]) => path.resolve(c.outputDir, ...name)
    const data = getRenderData(json, tags)

    render(tpl('common.ts.dtpl'), out('..', 'common.ts'), data)
    render(tpl('base.ts.dtpl'), out('base.ts'), data)

    eachObject(tags, (tagName, tagObj) => {
      // let modal = ''
      // let api = ''

      eachObject(tagObj, (apiName, operation) => {

      })
      // 生成一个 tag 的 ts 文件
    })
  })
}

generate().then(() => {}).catch((e) => console.log(e))

function eachTags(tags: parser2.Returns.TagsObject, fn: (tagName: string, apiName: string, operation: Operation) => void) {
  eachObject(tags, (tagName, tagObj) => {
    eachObject(tagObj, (apiName, operation) => fn(tagName, apiName, operation))
  })
}

function getRenderData(json: swagger2.Schema, tags: parser2.Returns.TagsObject) {
  let basePath = json.basePath || ''
  let baseMethod = 'POST'

  let maxCount = -1
  let methodCount: {[key: string]: number} = {}
  eachTags(tags, (tagName, apiName, operation) => {
    let method = operation.opt.method
    if (!methodCount[method]) {
      methodCount[method] = 1
    } else {
      methodCount[method]++
    }
  })

  eachObject(methodCount, (method, count) => {
    if (count > maxCount) {
      baseMethod = method
      maxCount = count
    }
  })

  return {basePath, baseMethod}
}

function render(fromFile: string, toFile: string, data: any) {
  // 如果文件存在，则不覆盖
  if (fs.existsSync(toFile)) return

  let content = fs.readFileSync(fromFile, 'utf-8')
  content = content.replace(/\${(\w+)}/g, (r, key) => {
    if (data.hasOwnProperty(key)) {
      return data[key]
    } else {
      return r
    }
  })
  writeFile(toFile, content)
}
