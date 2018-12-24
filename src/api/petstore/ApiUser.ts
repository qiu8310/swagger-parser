import {api} from './base'
import {user} from './modal'

const s = 'ApiUser'

//#region getUserByName
//#region getUserByName__base
export namespace getUserByName { export type O = user.getUserByName.O; export type R = user.getUserByName.R }
/**
 * Get user by user name
 */
export const getUserByName = api<getUserByName.O, getUserByName.R>(s + 'getUserByName', {path: '/user/:username'})
//#endregion getUserByName__base

//#region getUserByName__mock
if (__DEV__) {
  getUserByName.mock('自动生成', () => {
    return {
      id: 1,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      phone: '',
      userStatus: 1,
      username: '',
    }
  })
}
//#endregion getUserByName__mock
//#endregion getUserByName
