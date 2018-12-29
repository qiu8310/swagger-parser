import * as fs from 'fs-extra'
import {series} from 'mora-common/util/async'
import {capCamelCase} from 'mora-common/util/string'

import * as path from 'path'
import {FORMAT} from '../config'
import {parser2} from '../parser2'
import {swagger2} from '../schema/swagger2'
import {Operation} from '../struct/Operation'
import {eachObject} from '../util'
import {getConfig, lookupRootDir, getSwaggerJson, writeFile, parseApiFile, getFile, groupApi2File} from './helper'

const {TAB, EOL} = FORMAT

export async function generate() {
  const root = lookupRootDir()
  await series(getConfig(), async c => {
    const json = await getSwaggerJson<swagger2.Schema>(c)
    if (!/^2\./.test(json.swagger)) throw new Error(`不支持 swagger 版本：${json.swagger}`)

    const {type = 'fe'} = c
    const tags = parser2(json, c)

    const tpl = (...name: string[]) => path.join(root, 'template', ...name)
    const out = (...name: string[]) => path.resolve(c.outputDir, ...name)
    const data = {...getRenderData(json, tags), type}

    renderWhenNotExist(tpl(`common-${type}.ts.dtpl`), out('..', `common-${type}.ts`), data)
    renderWhenNotExist(tpl('base.ts.dtpl'), out('base.ts'), data)

    let modal: string[] = [`import {api} from './base'`, '']
    let files: string[] = []
    eachObject(tags, (tagName, tagObj) => {
      modal.push(`export namespace ${tagName} {`)

      // 使用用户指定的名称
      let fileName = capCamelCase('Api ' + tagName)
      if (c.fileNameMap) {
        let tempFileName = c.fileNameMap(fileName)
        if (!tempFileName) return
        if (tempFileName && typeof tempFileName === 'string') fileName = tempFileName
      }
      let fullFileName = out(fileName + '.ts')

      // 如果存在旧文件，则解析旧文件结构
      const {api, dp} = parseApiFile(getFile(fullFileName))

      eachObject(tagObj, (apiName, operation) => {
        modal.push(`${TAB}export namespace ${apiName} {`)
        modal.push(prefix(operation.toModal(), TAB.repeat(2)))

        let ref = api[apiName]
        if (!ref || !ref.base || ref.base.action === 'auto') dp.set(`${apiName}.base.code`, operation.toBase({...data}))
        if (!ref || !ref.mock || ref.mock.action === 'auto') dp.set(`${apiName}.mock.code`, operation.toMock())
        dp.set(`${apiName}.updated`, true)

        modal.push(`${TAB}}`)
      })

      // 生成文件
      let s = `import {api} from './base'${EOL}import {${tagName}} from './modal'${EOL}${EOL}const s = '${fileName}.'${EOL}${EOL}`
      writeFile(fullFileName, s + groupApi2File(api))
      files.push(fileName + '.ts')

      modal.push(`}`)
    })

    // 将其它的 Api 开头的文件删除了
    fs.readdirSync(c.outputDir).forEach(n => {
      if (n.startsWith('Api') && !files.includes(n)) fs.unlinkSync(path.join(c.outputDir, n))
    })

    // 生成 modal
    writeFile(out('modal.ts'), modal.join(EOL) + EOL)
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

function renderWhenNotExist(fromFile: string, toFile: string, data: any) {
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

function prefix(content: string, prefixStr: string) {
  return content.split(/\r?\n/).map(l => {
    let s = l.trimRight()
    if (s) {
      return prefixStr + s
    } else {
      return ''
    }
  }).join(EOL)
}
