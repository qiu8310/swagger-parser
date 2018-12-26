import {api} from './base'
import {user} from './modal'

const s = 'ApiUser.'

//#region createUser__base auto
export namespace createUser { export type O = user.createUser.O; export type R = user.createUser.R }
/**
 * Create user
 *
 * This can only be done by the logged in user.
 */
export const createUser = api<createUser.O, createUser.R>(s + 'createUser', {path: '/user', body: 'id&username&firstName&lastName&email&password&phone&userStatus'})
//#endregion createUser__base
//#region createUser__mock auto
if (__DEV__) {
  createUser.mock('自动生成', () => {
    return {}
  })
}
//#endregion createUser__mock


//#region createUsersWithArrayInput__base auto
export namespace createUsersWithArrayInput { export type O = user.createUsersWithArrayInput.O; export type R = user.createUsersWithArrayInput.R }
/** Creates list of users with given input array */
export const createUsersWithArrayInput = api<createUsersWithArrayInput.O, createUsersWithArrayInput.R>(s + 'createUsersWithArrayInput', {path: '/user/createWithArray'})
//#endregion createUsersWithArrayInput__base
//#region createUsersWithArrayInput__mock auto
if (__DEV__) {
  createUsersWithArrayInput.mock('自动生成', () => {
    return {}
  })
}
//#endregion createUsersWithArrayInput__mock


//#region createUsersWithListInput__base auto
export namespace createUsersWithListInput { export type O = user.createUsersWithListInput.O; export type R = user.createUsersWithListInput.R }
/** Creates list of users with given input array */
export const createUsersWithListInput = api<createUsersWithListInput.O, createUsersWithListInput.R>(s + 'createUsersWithListInput', {path: '/user/createWithList'})
//#endregion createUsersWithListInput__base
//#region createUsersWithListInput__mock auto
if (__DEV__) {
  createUsersWithListInput.mock('自动生成', () => {
    return {}
  })
}
//#endregion createUsersWithListInput__mock


//#region loginUser__base auto
export namespace loginUser { export type O = user.loginUser.O; export type R = user.loginUser.R }
/** Logs user into the system */
export const loginUser = api<loginUser.O, loginUser.R>(s + 'loginUser', {path: '/user/login', method: 'GET', query: 'username&password'})
//#endregion loginUser__base
//#region loginUser__mock auto
if (__DEV__) {
  loginUser.mock('自动生成', () => {
    return 'jBeIdpfYUKG5BFrt'
  })
}
//#endregion loginUser__mock


//#region logoutUser__base auto
export namespace logoutUser { export type R = user.logoutUser.R }
/** Logs out current logged in user session */
export const logoutUser = api<logoutUser.R>(s + 'logoutUser', {path: '/user/logout', method: 'GET'})
//#endregion logoutUser__base
//#region logoutUser__mock auto
if (__DEV__) {
  logoutUser.mock('自动生成', () => {
    return {}
  })
}
//#endregion logoutUser__mock


//#region getUserByName__base auto
export namespace getUserByName { export type O = user.getUserByName.O; export type R = user.getUserByName.R }
/** Get user by user name */
export const getUserByName = api<getUserByName.O, getUserByName.R>(s + 'getUserByName', {path: '/user/:username', method: 'GET'})
//#endregion getUserByName__base
//#region getUserByName__mock auto
if (__DEV__) {
  getUserByName.mock('自动生成', () => {
    return {
      id: 11,
      username: '韩卫婵',
      firstName: 'Tommy',
      lastName: 'Walton',
      email: 'cecilia@ocafef.com',
      password: 'kqIp',
      phone: '15967935571',
      /** User Status */
      userStatus: 890,
    }
  })
}
//#endregion getUserByName__mock


//#region updateUser__base auto
export namespace updateUser { export type O = user.updateUser.O; export type R = user.updateUser.R }
/**
 * Updated user
 *
 * This can only be done by the logged in user.
 */
export const updateUser = api<updateUser.O, updateUser.R>(s + 'updateUser', {path: '/user/:username', method: 'PUT', body: 'id&username&firstName&lastName&email&password&phone&userStatus'})
//#endregion updateUser__base
//#region updateUser__mock auto
if (__DEV__) {
  updateUser.mock('自动生成', () => {
    return {}
  })
}
//#endregion updateUser__mock


//#region deleteUser__base auto
export namespace deleteUser { export type O = user.deleteUser.O; export type R = user.deleteUser.R }
/**
 * Delete user
 *
 * This can only be done by the logged in user.
 */
export const deleteUser = api<deleteUser.O, deleteUser.R>(s + 'deleteUser', {path: '/user/:username', method: 'DELETE'})
//#endregion deleteUser__base
//#region deleteUser__mock auto
if (__DEV__) {
  deleteUser.mock('自动生成', () => {
    return {}
  })
}
//#endregion deleteUser__mock

