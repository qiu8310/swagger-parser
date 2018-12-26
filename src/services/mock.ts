import {sample} from 'mora-common/util/array'
import {sum} from 'mora-common/util/math'
import {snakeCase} from 'mora-common/util/string'

import {FORMAT} from '../config'
import {Type} from '../struct/Type'

const {EOL, TAB} = FORMAT
const yod = require('yod-mock')

export function mock(type: Type, key?: string, level = 0): string {
  let prefix = TAB.repeat(level)
  if (Type.isArrayType(type)) {
    let res: string[] = []
    res.push('[')
    new Array(yod('@Int(1, 4)')).fill(0)
      .map(() => mock(type.type, key, level + 1))
      .forEach(r => res.push(`${prefix}${TAB}${r},`))
    res.push(`${prefix}]`)
    return res.join(EOL)
  } else if (Type.isObjectType(type)) {
    if (!type.definitions.length) return '{}'
    let res: string[] = []
    res.push('{')
    type.definitions.forEach(d => {
      res.push(`${prefix}${TAB}${d.name}: ${mock(d.type, d.name, level + 1)},`)
    })
    res.push(`${prefix}}`)
    return res.join(EOL)
  } else {
    // 字符串要加上引号
    let res = mockBasicWithKey(type.name, key)
    return typeof res === 'string' ? `'${res}'` : JSON.stringify(res)
  }
}

// let obj = new ObjectType([
//   new Definition('uid', new Type('number')),
//   new Definition('userMobile', new Type('string')),
//   new Definition('idNo', new Type('string')),
//   new Definition('bankNo', new Type('string')),
// ])
// let arr = new ArrayType(obj)
// let objArr = new ObjectType([
//   new Definition('arr', arr)
// ])
// console.log(mock(obj))
// console.log(mock(objArr))

// // number / string / boolean / any / any[]
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
  const equal = (keys: string[]) => keys.some(k => lowerKey === k.toLowerCase())

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
    if (equal(['userName', 'realName', 'accountName']) || key.endsWith('UserName')) return yod('@ChineseName')
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

function generateIdNo() {
  let coefficientArray = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'] // 加权因子
  let lastNumberArray = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码
  let address = sample(require('./inc/address-code.json')) // 住址
  let birthday = yod('@Date("YYYYMMDD", -80)')  // '19810101' // 生日
  let s = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString()
  let array = (address + birthday + s).split('')
  let total = 0
  for (let i = 0; i < array.length; i++) {
      total = total + parseInt(array[i], 10) * parseInt(coefficientArray[i], 10)
  }
  let lastNumber = lastNumberArray[total % 11]

  return address + birthday + s + lastNumber
}

/**
 * @param type 1: 借记卡  4: 信用卡
 */
function generateBankNo(type = [1, 4]) {
  const [prefix, , , total] = sample(require('./inc/bank-common.json').filter((it: any[]) => type.includes(it[4])))

  let randomNumCount = total - prefix.length - 1
  let bankNo = prefix + yod(`@Char('number').repeat(${randomNumCount}).join("")`)
  bankNo += getBankNoVerificationCode(bankNo)

  return bankNo
}

/**
 *
 * 校验码为银行卡号最后一位，采用LUHN算法，亦称模10算法。计算方法如下：
 * 第一步：从右边第1个数字开始每隔一位乘以2；
 * 第二步：把在第一步中获得的乘积的各位数字相加，然后再与原号码中未乘2的各位数字相加；
 * 第三步：对于第二步求和值中个位数求10的补数，如果个位数为0则该校验码为0。
 */
function getBankNoVerificationCode(bankcard: string) {
  let toArray = (str: string | number) => str.toString().split('').map(i => parseInt(i, 10))
  let nums = toArray(bankcard).reverse()

  // 偶数和
  const evenSum = sum(nums.filter((r, i) => i % 2 === 1))
  // 奇数*2 各个位数和
  const oddSum = nums.filter((r, i) => i % 2 === 0).map(r => r * 2).reduce((accumulator, currentValue) => accumulator + sum(toArray(currentValue)), 0)
  const verificationCode = 10 - ((oddSum + evenSum) % 10 || 10)
  return verificationCode
}
