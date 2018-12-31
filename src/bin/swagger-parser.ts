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
}).options({
  'name|n': '<array> 重新生成指定名称的 swagger'
}).parse(async (res, self) => {
  await generate({name: res.name})
})
