#!/usr/bin/env node

import * as sys from 'mora-scripts/libs/sys'
import * as cli from 'mora-scripts/libs/tty/cli'
import {generate} from '../services/generate'

const handle = (e: any) => {
  if (e.message) {
    sys.error(e.message + '\r\n\r\n')
  }
  console.log(e)
}
process.on('unhandledRejection', handle)
process.on('uncaughtException', handle)

cli({
  usage: 'swagger-parser [options]',
  version: false,
}).options({
  'name | n':   '<array>    重新生成指定名称的 swagger，同时可以指定 tagName 和 apiName\n如：“ --name petstore.Pet.findPetById ” 表示重新生成 findPetById\n注意：tagName 前面没有 Api 前缀',
  'force | f':  '<boolean>  强制重新生成指定的文件，并且会将 manual 的配置更新为 auto',
  'mock':       '<boolean>  只更新 mock 区域',
  'base':       '<boolean>  只更新 base 区域'
}).parse(async (res, self) => {
  await generate(res as any)
})
