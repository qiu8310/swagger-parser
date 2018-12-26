import {api} from './base'
import {pet} from './modal'

const s = 'ApiPet.'

//#region addPet__base manual
export namespace addPet { export type O = pet.addPet.O; export interface R {id: string} }
/** Add a new pet to the store */
export const addPet = api<addPet.O, addPet.R>(s + 'addPet', {path: '/pet', body: 'id&category&name&photoUrls&tags&status'})
//#endregion addPet__base
//#region addPet__mock manual
if (__DEV__) {
  addPet.mock('自动生成', () => {
    return {id: '1'}
  })
}
//#endregion addPet__mock


//#region updatePet__base auto
export namespace updatePet { export type O = pet.updatePet.O; export type R = pet.updatePet.R }
/** Update an existing pet */
export const updatePet = api<updatePet.O, updatePet.R>(s + 'updatePet', {path: '/pet', method: 'PUT', body: 'id&category&name&photoUrls&tags&status'})
//#endregion updatePet__base
//#region updatePet__mock auto
if (__DEV__) {
  updatePet.mock('自动生成', () => {
    return {}
  })
}
//#endregion updatePet__mock


//#region findPetsByStatus__base auto
export namespace findPetsByStatus { export type O = pet.findPetsByStatus.O; export type R = pet.findPetsByStatus.R }
/**
 * Finds Pets by status
 *
 * Multiple status values can be provided with comma separated strings
 */
export const findPetsByStatus = api<findPetsByStatus.O, findPetsByStatus.R>(s + 'findPetsByStatus', {path: '/pet/findByStatus', method: 'GET', query: 'status'})
//#endregion findPetsByStatus__base
//#region findPetsByStatus__mock auto
if (__DEV__) {
  findPetsByStatus.mock('自动生成', () => {
    return [
      {
        id: 1,
        category: {
          id: 2,
          name: 'U18xe6iIv0Yp',
        },
        name: '5ozUn6CFpq',
        photoUrls: [
          'http://llss.qiniudn.com/dea588d75975a0ae9f76f8a5ae2fa88b0.jpg',
        ],
        tags: [
          {
            id: 3,
            name: 'AVtIBLo1s30nubj0M',
          },
        ],
        /** pet status in the store */
        status: 'iazb518',
      },
    ]
  })
}
//#endregion findPetsByStatus__mock


//#region getPetById__base auto
export namespace getPetById { export type O = pet.getPetById.O; export type R = pet.getPetById.R }
/**
 * Find pet by ID
 *
 * Returns a single pet
 */
export const getPetById = api<getPetById.O, getPetById.R>(s + 'getPetById', {path: '/pet/:petId', method: 'GET'})
//#endregion getPetById__base
//#region getPetById__mock auto
if (__DEV__) {
  getPetById.mock('自动生成', () => {
    return {
      id: 4,
      category: {
        id: 5,
        name: 'oclxJel',
      },
      name: '3rFqBTeRnACt25tIVCc',
      photoUrls: [
        'http://llss.qiniudn.com/de36a4811f982c6f30aedb321d5dec20f.jpg',
        'http://llss.qiniudn.com/dcaca24a3ea9f4bf88b59e17650ed2b78.png',
      ],
      tags: [
        {
          id: 6,
          name: 'kP0',
        },
      ],
      /** pet status in the store */
      status: '3JSbAD5i09N2CWhZIf',
    }
  })
}
//#endregion getPetById__mock


//#region updatePetWithForm__base auto
export namespace updatePetWithForm { export type O = pet.updatePetWithForm.O; export type R = pet.updatePetWithForm.R }
/** Updates a pet in the store with form data */
export const updatePetWithForm = api<updatePetWithForm.O, updatePetWithForm.R>(s + 'updatePetWithForm', {path: '/pet/:petId', http: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, body: 'name&status'})
//#endregion updatePetWithForm__base
//#region updatePetWithForm__mock auto
if (__DEV__) {
  updatePetWithForm.mock('自动生成', () => {
    return {}
  })
}
//#endregion updatePetWithForm__mock


//#region deletePet__base auto
export namespace deletePet { export type O = pet.deletePet.O; export type R = pet.deletePet.R }
/** Deletes a pet */
export const deletePet = api<deletePet.O, deletePet.R>(s + 'deletePet', {path: '/pet/:petId', method: 'DELETE', header: 'api_key'})
//#endregion deletePet__base
//#region deletePet__mock auto
if (__DEV__) {
  deletePet.mock('自动生成', () => {
    return {}
  })
}
//#endregion deletePet__mock


//#region uploadFile__base auto
export namespace uploadFile { export type O = pet.uploadFile.O; export type R = pet.uploadFile.R }
/** uploads an image */
export const uploadFile = api<uploadFile.O, uploadFile.R>(s + 'uploadFile', {path: '/pet/:petId/uploadImage', http: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, body: 'additionalMetadata&file'})
//#endregion uploadFile__base
//#region uploadFile__mock auto
if (__DEV__) {
  uploadFile.mock('自动生成', () => {
    return {
      code: 960,
      type: '59F7j',
      message: 'FgwkAZ9K2j0LFGfYv6PH',
    }
  })
}
//#endregion uploadFile__mock

