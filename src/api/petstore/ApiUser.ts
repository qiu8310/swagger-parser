import {api} from './base'
import {user} from './modal'

const s = 'ApiUser'
const __DEV__ = true

//#region bindBankCard
//#region bindBankCard__base
export namespace bindBankCard {
  export type O = user.createUser.O
  export type R = user.createUser.R
}
/**
 * 绑定银行卡
 */
export const bindBankCard = api<bindBankCard.O, bindBankCard.R>(s + 'bindBankCard', {path: '/v2/bank/bind', body: '', query: '', header: '', http: {headers: {}}})
//#endregion bindBankCard__base

//#region bindBankCard__mock
if (__DEV__) {
  bindBankCard.mock('自动生成', {})
}
//#endregion bindBankCard__mock
//#endregion bindBankCard

export namespace uploadFile {
}
export const uploadFile = api<any>(s + 'uploadFile', {path: '/pet/:petId/uploadImage', http: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}})
