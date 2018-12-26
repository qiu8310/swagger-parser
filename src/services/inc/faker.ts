import {sample} from 'mora-common/util/array'
import {sum} from 'mora-common/util/math'

import * as addressCode from './address-code.json'
import * as banks from './bank-common.json'

const yod = require('yod-mock')

export function generateIdNo() {
  let coefficientArray = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'] // 加权因子
  let lastNumberArray = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码
  let address = sample(addressCode) // 住址
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
export function generateBankNo(type = [1, 4]) {
  const [prefix, , , total] = sample(banks.filter((it: any[]) => type.includes(it[4])))

  let randomNumCount = (total as number) - prefix.toString().length - 1
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
