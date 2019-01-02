import * as fs from 'fs-extra'
import {series} from 'mora-common/util/async'
import {capCamelCase} from 'mora-common/util/string'
import {info, clog} from 'mora-scripts/libs/sys'

import * as path from 'path'
import {FORMAT} from '../config'
import {parser2} from '../parser2'
import {swagger2} from '../schema/swagger2'
import {Operation} from '../struct/Operation'
import {eachObject} from '../util'
import {getConfig, lookupRootDir, getSwaggerJson, writeFile, parseApiFile, getFile, groupApi2File} from './helper'

const {TAB, EOL} = FORMAT

export async function generate(cliOpts: {name?: string[], force?: boolean, mock?: boolean, base?: boolean} = {}) {
  const root = lookupRootDir(__dirname)
  const configs = getConfig()

  const onlyUpdateMock = cliOpts.mock && !cliOpts.base
  const onlyUpdateBase = cliOpts.base && !cliOpts.mock
  const userConfigs = (cliOpts.name || []).map(c => {
    let [name, tagName, apiName] = c.split('.')
    return {name, tagName, apiName}
  })

  const matchUserConfigs = (name: string, tagName: string, apiName: string) => {
    return !userConfigs.length ? true : userConfigs.find(obj => obj.name === name && (!obj.tagName || obj.tagName === tagName) && (!obj.apiName || obj.apiName === apiName))
  }

  await series(configs, async (c, configIndex) => {
    let userConfig: typeof userConfigs[0] | undefined
    if (userConfigs.length) {
      userConfig = userConfigs.find(u => u.name === c.name)
      if (!userConfig) return
    } else if (c.disabled) {
      return
    }

    info(`解析 ${c.name} 项目 ${c.showUpdateLog && userConfig ? JSON.stringify(userConfig) : ''} ...`)

    const json = await getSwaggerJson<swagger2.Schema>(c)
    if (!/^2\./.test(json.swagger)) throw new Error(`不支持 swagger 版本：${json.swagger}`)

    const {type = 'fe', language = 'ts'} = c
    const tags = parser2(json, c)

    const tpl = (...name: string[]) => path.join(root, 'template', ...name)
    const out = (...name: string[]) => path.resolve(c.outputDir, ...name)
    const data = {...getRenderData(json, tags), type, name: c.name}

    renderWhenNotExist(tpl(`common-${type}`), out('..', `common-${type}`), data, language)
    renderWhenNotExist(tpl('base'), out('base'), data, language)

    let modal: string[] = [
      '// tslint:disable', // 禁用 tslint
      `import {api} from './base'`, ''
    ]
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
      let fullFileName = out(fileName + '.' + language)

      // 如果存在旧文件，则解析旧文件结构
      const {api, dp} = parseApiFile(getFile(fullFileName))

      eachObject(tagObj, (apiName, operation) => {
        if (c.showGenerateLog) console.log(`  generate ${tagName}.${apiName} ${operation.opt.path}`)
        modal.push(`${TAB}export namespace ${apiName} {`)
        modal.push(prefix(operation.toModal(), TAB.repeat(2)))

        let ref = api[apiName]
        let id = `${c.name}.${tagName}.${apiName}`
        if (matchUserConfigs(c.name, tagName, apiName)) {
          if (!onlyUpdateMock && (!ref || !ref.base || ref.base.action === 'auto' || cliOpts.force)) {
            if (c.showUpdateLog) updateLog('Update Base', `${id}`)
            dp.set(
              `${apiName}.base`,
              {action: 'auto', code: operation.toBase({...data, docPrefix: c.docPrefix, language})
            })
          }
          if (!onlyUpdateBase && (!ref || !ref.mock || ref.mock.action === 'auto' || cliOpts.force)) {
            if (c.disableMock) {
              if (c.showUpdateLog) updateLog('Disable Mock', `${id}`)
              dp.set(`${apiName}.mock`, false)
            } else {
              if (c.showUpdateLog) updateLog('Update Mock', `${id}`)
              dp.set(`${apiName}.mock`, {action: 'auto', code: operation.toMock(c.mock)})
            }
          }
        }
        dp.set(`${apiName}.exists`, true) // 标识这个 api 存在，否则会被移除

        modal.push(`${TAB}}`)
      })

      // 生成文件
      let s = language === 'js'
        ? `// @ts-check${EOL}import {api} from './base'${EOL}${EOL}const s = '${fileName}.'${EOL}${EOL}`
        : `import {api} from './base'${EOL}import {${tagName}} from './modal'${EOL}${EOL}const s = '${fileName}.'${EOL}${EOL}`
      writeFile(fullFileName, s + groupApi2File(api))
      files.push(fileName + '.' + language)

      modal.push(`}`)
    })

    // 将其它的 Api 开头的文件删除了
    fs.readdirSync(c.outputDir).forEach(n => {
      if (n.startsWith('Api') && !files.includes(n)) fs.unlinkSync(path.join(c.outputDir, n))
    })

    // 生成 modal
    writeFile(out(`modal${language === 'js' ? '.d' : ''}.ts`), modal.join(EOL) + EOL)
  })
}

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

function renderWhenNotExist(fromFile: string, toFile: string, data: any, language = 'ts') {

  let run = (_fromFile: string, _toFile: string) => {
    // 如果文件存在，则不覆盖
    if (fs.existsSync(_toFile)) return

    let content = fs.readFileSync(_fromFile, 'utf-8')
    content = content.replace(/\${(\w+)}/g, (r, key) => {
      if (data.hasOwnProperty(key)) {
        return data[key]
      } else {
        return r
      }
    })
    writeFile(_toFile, content)
  }

  if (language === 'ts') {
    run(fromFile + '.ts.dtpl', toFile + '.ts')
  } else if (language === 'js') {
    run(fromFile + '.js.dtpl', toFile + '.js')
    run(fromFile + '.d.ts.dtpl', toFile + '.d.ts')
  } else {
    throw new Error(`不支持生成语言： "${language}"`)
  }
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

function updateLog(action: string, id: string) {
  clog(`  %c${action} %c${id}`, 'white', 'magenta')
}
