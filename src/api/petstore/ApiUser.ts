import {api} from './base'
import {user} from './modal'

const s = 'ApiUser'
const __DEV__ = true

//#region bindBankCard
//#region bindBankCard__base
export namespace bindBankCard {
  export type Q = user.bindBankCard.Options
  export type R = user.bindBankCard.Result
}
/**
 * 绑定银行卡
 */
export const bindBankCard = api<bindBankCard.Q, bindBankCard.R>(s + 'bindBankCard', {path: '/v2/bank/bind'})
//#endregion bindBankCard__base

//#region bindBankCard__mock
if (__DEV__) {
  bindBankCard.mock('自动生成', {})
}
//#endregion bindBankCard__mock
//#endregion bindBankCard
