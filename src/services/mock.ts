import {sample} from 'mora-common/util/array'
import {range} from 'mora-common/util/math'
import {snakeCase, capCamelCase} from 'mora-common/util/string'
import * as formatDate from 'mora-scripts/libs/lang/formatDate'

import {Operation} from '../struct/Operation'
import {Type} from '../struct/Type'
import {value2js, clone, isArrayPath} from '../util'
import {ExampleMock} from './ExampleMock'
import {generateBankNo, generateIdNo} from './inc/faker'
import {Mock} from './types'

const yod = require('yod-mock')

export interface BasicData {
  setting: Mock
  operation: Operation
  repeat: () => number[]
  exampleMocks: ExampleMock[]
}

export function mock(setting: Mock, type: Type, operation: Operation): string {
  // 解析 repeat 配置
  let {repeats = {min: 1, max: 2}} = setting.config || {}
  if (typeof repeats === 'number') repeats = {min: repeats, max: repeats}
  let yodRepeats = `@Int(${repeats.min}, ${repeats.max})`
  let repeat = () => range(yod(yodRepeats))

  // 解析 examples 配置
  let {examples = []} = setting
  let exampleMocks = examples.map(o => new ExampleMock(o, operation))

  return value2js(mock2value({setting, operation, repeat, exampleMocks}, type))
}

function mock2value(data: BasicData, type: Type, mockKey: string = '', prefixes: string[] = []): any {
  let result: any
  let emRes: null | ReturnType<ExampleMock['mock']> = null

  let em = data.exampleMocks.find(m => m.match(prefixes, !Type.isNotSimpleType(type)))
  if (em) {
    emRes = em.mock(prefixes)
    if (!emRes.isExample) result = emRes.value
  }

  if (typeof result === 'undefined') {
    if (Type.isArrayType(type)) {
      result = data.repeat().map(i => mock2value(data, type.type, mockKey, [...prefixes, `[${i}]`]))
    } else if (Type.isObjectType(type)) {
      result = type.definitions.reduce((res, d) => {
        // 有可选值则使用可选值
        if (d.enum) res[d.name] = sample(d.enum as any[])
        else res[d.name] = mock2value(data, d.type, d.name, [...prefixes, d.name])
        return res
      }, {} as any)
    } else {
      if (emRes && emRes.isExample) {
        result = mockBasicWithKey(data, prefixes, type.name, mockKey, emRes.value)
      } else {
        result = mockBasicWithKey(data, prefixes, type.name, mockKey)
      }
    }
  }


  if (data.setting.generator) result = clone(data.setting.generator(data.operation, prefixes, result))

  return result
}

function mockBasicWithKey(data: BasicData, prefixes: string[] = [], typeName: string, key?: string, exampleValue?: string | number) {
  if (!key) return mockBasic(typeName)

  const config = data.setting.config || {}
  const idSeed = prefixes.length ? prefixes.map(t => isArrayPath(t) ? '[]' : t).join('.') : 'id_seed'

  const keyParts = snakeCase(key).split('_')
  const lowerKey = key.toLowerCase()
  const isString = typeName === 'string'
  const isNumber = typeName === 'number'

  /**
   * @param keys 包含的字段
   * @param plural 是否再对比下加 "s" 的版本
   */
  const contain = (keys: string[], plural = true) => keys.some(k => keyParts.includes(k) || (!!plural && keyParts.includes(k + 's')))
  /**
   * 和 keys 中的某一字段一样，或者以其中的某一字段结尾
   * @param keys
   */
  const equal = (keys: string[]) => keys.some(k => lowerKey === k.toLowerCase() || key.endsWith(capCamelCase(k)))

  if (typeof exampleValue === 'string' || typeof exampleValue === 'number') {
    let mockValue = exampleValue.toString().split('').map(s => {
      if (/[a-z]/.test(s)) return yod('@Char("lower")')
      if (/[A-Z]/.test(s)) return yod('@Char("upper")')
      if (/[0-9]/.test(s)) return yod('@Char("number")')
      // 如果是中文
      if (/[\u4e00-\u9fa5]/.test(s)) return yod('@CW')

      return s
    }).join('')

    if (isNumber) {
      if (mockValue[0] === '0') mockValue = '1' + mockValue.substr(1) // 第一位不能为 0
      return parseFloat(mockValue)
    }

    return mockValue
  }

  // 单独处理各个类型
  if (isString) {
    const exampleStr = typeof exampleValue === 'string' ? exampleValue : ''
    const use10 = exampleStr.length === 10 || !exampleStr && config.timestampLength === 10

    // 日期(返回时间戳)
    if (key.endsWith('Time')) {
      let timestamp = parseInt(yod('@Date') + mockNumber(3), 10)
      let format = config.timeFormat
      if (typeof format === 'function') return format(timestamp)
      else if (typeof format === 'string') return formatDate(new Date(timestamp), format)
      return (use10 ? Math.round((timestamp / 1000)) : timestamp).toString()
    }
    // 身分证
    if (equal(['idNo', 'idCard'])) return generateIdNo()
    // 银行卡
    if (equal(['bankNo', 'bankCard', 'bankCardNo', 'bankAccountNo'])) return generateBankNo()
    if (equal(['bankName', 'bankCardName', 'bankAccountName'])) return sample(['农业银行', '交通银行', '中国银行', '建设银行'])

    // 内部的一些字段
    if (equal(['instalId'])) return 'FQ' + mockNumber('20181214152732062100'.length)
    if (equal(['payId'])) return mockNumber('21031001000020181231213126834388'.length)
    if (equal(['payOrderId'])) return mockNumber('21031001000020181214152728823429'.length)
    if (equal(['paySeqNo'])) return mockNumber('20181214152732823430'.length)
    if (equal(['merchantSequence'])) return mockNumber('127065636'.length)

    if (equal(['userName', 'realName', 'accountName'])) return yod('@ChineseName')
    if (equal(['firstName'])) return yod('@FirstName')
    if (equal(['lastName'])) return yod('@LastName')
    if (equal(['nickname'])) return yod('@Nickname')
    if (contain(['phone', 'mobile', 'tel'])) return yod('@Telephone')
    if (contain(['email'])) return yod('@Email')
    if (contain(['age'])) return yod('@Age')
    if (contain(['avatar'])) return yod('@Avatar')
    if (contain(['image', 'img', 'picture', 'pic', 'src', 'url', 'link'])) return yod('@Image')
    if (contain(['audio', 'voice', 'mp3'])) return yod('@Audio')
    if (contain(['video', 'mp4'])) return yod('@Video')
    if (contain(['country'])) return yod('@Country')
    if (contain(['province', 'region'])) return yod('@Province')
    if (contain(['area'])) return yod('@Area')
    if (contain(['address'])) return yod(`@Province @CW.repeat(5, 15).join("")`)
    if (contain(['text', 'title'])) return yod('@CW.repeat(15, 60).join("")')
    if (contain(['comment'])) return yod('@Comment')
  }

  // 支持多种类型的字段
  if (!exampleValue) {
    if (key.endsWith('Id') || key.length === 3 && key.endsWith('id') || equal(['id'])) {
      if (isNumber) return yod(`@Id('${idSeed}')`)
      else if (isString) return yod(`@Id('${idSeed}')`) + ''
    }
  }

  return mockBasic(typeName)
}

function mockBasic(typeName: string) {
  if (typeName === 'number') return yod('@Int')
  else if (typeName === 'number[]') return yod('@Int.repeat')
  else if (typeName === 'string') return yod('@String')
  else if (typeName === 'string[]') return yod('@String.repeat')
  else if (typeName === 'boolean') return yod('@Boolean')
  else if (typeName === 'boolean[]') return yod('@Boolean.repeat')
  else if (typeName === 'any') return {}
  else if (typeName === 'any[]') return []
  else throw new Error(`不支持 mock 的数据类型 ${typeName}`)
}

function mockNumber(len: number) {
  return yod(`@Char("number").repeat(${len}).join("")`)
}
