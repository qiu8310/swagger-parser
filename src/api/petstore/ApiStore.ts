import {api} from './base'
import {store} from './modal'

const s = 'ApiStore.'

//#region getInventory--base auto
export namespace getInventory { export type R = store.getInventory.R }
/**
 * Returns pet inventories by status
 *
 * Returns a map of status codes to quantities
 */
export const getInventory = api<getInventory.R>(s + 'getInventory', {path: '/store/inventory', method: 'GET'})
//#endregion getInventory--base
//#region getInventory--mock auto
if (__DEV__) {
  getInventory.mock('自动生成', () => {
    return {}
  })
}
//#endregion getInventory--mock


//#region placeOrder--base auto
export namespace placeOrder { export type O = store.placeOrder.O; export type R = store.placeOrder.R }
/** Place an order for a pet */
export const placeOrder = api<placeOrder.O, placeOrder.R>(s + 'placeOrder', {path: '/store/order', body: 'id&petId&quantity&shipDate&status&complete'})
//#endregion placeOrder--base
//#region placeOrder--mock auto
if (__DEV__) {
  placeOrder.mock('自动生成', () => {
    return {
      id: 12,
      petId: 13,
      quantity: 206,
      shipDate: 'UazikoUJ7o',
      /** Order Status */
      status: 'GRnrnEtdBbQnIP',
      complete: false,
    }
  })
}
//#endregion placeOrder--mock


//#region getOrderById--base auto
export namespace getOrderById { export type O = store.getOrderById.O; export type R = store.getOrderById.R }
/**
 * Find purchase order by ID
 *
 * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
 */
export const getOrderById = api<getOrderById.O, getOrderById.R>(s + 'getOrderById', {path: '/store/order/:orderId', method: 'GET'})
//#endregion getOrderById--base
//#region getOrderById--mock auto
if (__DEV__) {
  getOrderById.mock('自动生成', () => {
    return {
      id: 14,
      petId: 15,
      quantity: 132,
      shipDate: '1mmwdGT5u2k',
      /** Order Status */
      status: 'qv7x3aybZ',
      complete: true,
    }
  })
}
//#endregion getOrderById--mock


//#region deleteOrder--base auto
export namespace deleteOrder { export type O = store.deleteOrder.O; export type R = store.deleteOrder.R }
/**
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
 */
export const deleteOrder = api<deleteOrder.O, deleteOrder.R>(s + 'deleteOrder', {path: '/store/order/:orderId', method: 'DELETE'})
//#endregion deleteOrder--base
//#region deleteOrder--mock auto
if (__DEV__) {
  deleteOrder.mock('自动生成', () => {
    return {}
  })
}
//#endregion deleteOrder--mock

