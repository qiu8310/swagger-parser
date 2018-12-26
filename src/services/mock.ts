import {snakeCase, capCamelCase} from 'mora-common/util/string'
import {FORMAT} from '../config'
import {Type, getDesc} from '../struct/Type'
import {generateBankNo, generateIdNo} from './inc/faker'

const {EOL, TAB} = FORMAT
const yod = require('yod-mock')

// @TODO: 支持加一些配置
export function mock(type: Type, key?: string, prefixes: string[] = [], level = 0): string {
  let prefix = TAB.repeat(level)
  if (Type.isArrayType(type)) {
    let res: string[] = []
    res.push('[')
    // 生成 1-2 项数据
    new Array(yod('@Int(1, 2)')).fill(0)
      .map(() => mock(type.type, key, [...prefixes, '[]'], level + 1))
      .forEach(r => res.push(`${prefix}${TAB}${r},`))
    res.push(`${prefix}]`)
    return res.join(EOL)
  } else if (Type.isObjectType(type)) {
    if (!type.definitions.length) return '{}'
    let res: string[] = []
    res.push('{')
    type.definitions.forEach(d => {
      res.push(...getDesc(d.desc).map(l => prefix + TAB + l))
      res.push(`${prefix}${TAB}${d.name}: ${mock(d.type, d.name, [...prefixes, d.name], level + 1)},`)
    })
    res.push(`${prefix}}`)
    return res.join(EOL)
  } else {
    // 字符串要加上引号
    let res = mockBasicWithKey(type.name, key)
    return typeof res === 'string' ? `'${res}'` : JSON.stringify(res)
  }
}

function mockBasicWithKey(typeName: string, key?: string, exampleValue?: string | number) {
  if (!key) return mockBasic(typeName)

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

  // 支持多种类型的字段
  if (key.endsWith('Id') || key.length === 3 && key.endsWith('id') || equal(['id'])) {
    if (isNumber) return yod('@Id')
    else if (isString) return yod('@Id') + ''
  }

  // 单独处理各个类型
  if (isString) {
    const exampleStr = typeof exampleValue === 'string' ? exampleValue : ''
    // 日期(返回时间戳)
    if (key.endsWith('Time')) return yod('@Date') + (exampleStr.length === 13 ? yod('@Char("number").repeat(3).join("")') : '')
    // 身分证
    if (equal(['idNo', 'idCard'])) return mask(generateIdNo(), exampleStr)
    // 银行卡
    if (equal(['bankNo', 'bankCard', 'bankAccountNo'])) return mask(generateBankNo(), exampleStr)
    if (equal(['userName', 'realName', 'accountName'])) return yod('@ChineseName')
    if (equal(['firstName'])) return yod('@FirstName')
    if (equal(['lastName'])) return yod('@LastName')
    if (equal(['nickname'])) return yod('@Nickname')
    if (contain(['phone', 'mobile', 'tel'])) return mask(yod('@Telephone'), exampleStr)
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

  if (exampleValue != null) {
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

function mask(str: string, exampleStr: string) {
  if (exampleStr && exampleStr.includes('*')) {
    let mat = /\*+/.exec(exampleStr)
    if (mat) {
      return str.substr(0, mat.index) + mat[0] + str.substr(mat[0].length + mat.index - exampleStr.length)
    }
  }
  return str
}
