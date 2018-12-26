import {api} from './base'
import {store} from './modal'

const s = 'ApiStore.'

//#region getInventory
//#region getInventory__base
export namespace getInventory { export type R = store.getInventory.R }
/**
 * Returns pet inventories by status
 *
 * Returns a map of status codes to quantities
 */
export const getInventory = api<getInventory.R>(s + 'getInventory', {path: '/store/inventory', method: 'GET'})
//#endregion getInventory__base

//#region getInventory__mock
if (__DEV__) {
  getInventory.mock('自动生成', () => {
    return {}
  })
}
//#endregion getInventory__mock
//#endregion getInventory

//#region placeOrder
//#region placeOrder__base
export namespace placeOrder { export type O = store.placeOrder.O; export type R = store.placeOrder.R }
/**
 * Place an order for a pet
 */
export const placeOrder = api<placeOrder.O, placeOrder.R>(s + 'placeOrder', {path: '/store/order', body: 'id&petId&quantity&shipDate&status&complete'})
//#endregion placeOrder__base

//#region placeOrder__mock
if (__DEV__) {
  placeOrder.mock('自动生成', () => {
    return {
      id: 11,
      petId: 12,
      quantity: 987,
      shipDate: 'Fk5OmfNFluL8',
      status: 'l3y',
      complete: true,
    }
  })
}
//#endregion placeOrder__mock
//#endregion placeOrder

//#region getOrderById
//#region getOrderById__base
export namespace getOrderById { export type O = store.getOrderById.O; export type R = store.getOrderById.R }
/**
 * Find purchase order by ID
 *
 * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
 */
export const getOrderById = api<getOrderById.O, getOrderById.R>(s + 'getOrderById', {path: '/store/order/:orderId', method: 'GET'})
//#endregion getOrderById__base

//#region getOrderById__mock
if (__DEV__) {
  getOrderById.mock('自动生成', () => {
    return {
      id: 13,
      petId: 14,
      quantity: 600,
      shipDate: 'CMgsDA8P',
      status: '0LNUOGrz3EV4gnnWL',
      complete: true,
    }
  })
}
//#endregion getOrderById__mock
//#endregion getOrderById

//#region deleteOrder
//#region deleteOrder__base
export namespace deleteOrder { export type O = store.deleteOrder.O; export type R = store.deleteOrder.R }
/**
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
 */
export const deleteOrder = api<deleteOrder.O, deleteOrder.R>(s + 'deleteOrder', {path: '/store/order/:orderId', method: 'DELETE'})
//#endregion deleteOrder__base

//#region deleteOrder__mock
if (__DEV__) {
  deleteOrder.mock('自动生成', () => {
    return {}
  })
}
//#endregion deleteOrder__mock
//#endregion deleteOrder
