import {api} from './base'
import {pet} from './modal'

const s = 'ApiPet.'

//#region addPet
//#region addPet__base
export namespace addPet { export type O = pet.addPet.O; export type R = pet.addPet.R }
/** Add a new pet to the store */
export const addPet = api<addPet.O, addPet.R>(s + 'addPet', {path: '/pet', body: 'id&category&name&photoUrls&tags&status'})
//#endregion addPet__base

//#region addPet__mock
if (__DEV__) {
  addPet.mock('自动生成', () => {
    return {}
  })
}
//#endregion addPet__mock
//#endregion addPet

//#region updatePet
//#region updatePet__base
export namespace updatePet { export type O = pet.updatePet.O; export type R = pet.updatePet.R }
/** Update an existing pet */
export const updatePet = api<updatePet.O, updatePet.R>(s + 'updatePet', {path: '/pet', method: 'PUT', body: 'id&category&name&photoUrls&tags&status'})
//#endregion updatePet__base

//#region updatePet__mock
if (__DEV__) {
  updatePet.mock('自动生成', () => {
    return {}
  })
}
//#endregion updatePet__mock
//#endregion updatePet

//#region findPetsByStatus
//#region findPetsByStatus__base
export namespace findPetsByStatus { export type O = pet.findPetsByStatus.O; export type R = pet.findPetsByStatus.R }
/**
 * Finds Pets by status
 *
 * Multiple status values can be provided with comma separated strings
 */
export const findPetsByStatus = api<findPetsByStatus.O, findPetsByStatus.R>(s + 'findPetsByStatus', {path: '/pet/findByStatus', method: 'GET', query: 'status'})
//#endregion findPetsByStatus__base

//#region findPetsByStatus__mock
if (__DEV__) {
  findPetsByStatus.mock('自动生成', () => {
    return [
      {
        id: 1,
        category: {
          id: 2,
          name: 'eL3nfdsCYNa',
        },
        name: '11yX7',
        photoUrls: [
          'http://llss.qiniudn.com/dea588d75975a0ae9f76f8a5ae2fa88b0.jpg',
        ],
        tags: [
          {
            id: 3,
            name: '0CYvjk8VHPf7Nh00',
          },
        ],
        /** pet status in the store */
        status: 'ZV',
      },
    ]
  })
}
//#endregion findPetsByStatus__mock
//#endregion findPetsByStatus

//#region getPetById
//#region getPetById__base
export namespace getPetById { export type O = pet.getPetById.O; export type R = pet.getPetById.R }
/**
 * Find pet by ID
 *
 * Returns a single pet
 */
export const getPetById = api<getPetById.O, getPetById.R>(s + 'getPetById', {path: '/pet/:petId', method: 'GET'})
//#endregion getPetById__base

//#region getPetById__mock
if (__DEV__) {
  getPetById.mock('自动生成', () => {
    return {
      id: 4,
      category: {
        id: 5,
        name: 'LXyWMMFkwO5nmE8m',
      },
      name: 'HWI6rYgYr9Alw',
      photoUrls: [
        'http://llss.qiniudn.com/dea588d75975a0ae9f76f8a5ae2fa88b0.jpg',
        'http://llss.qiniudn.com/dd57fa4343de47aab98d737e28efd3c85.png',
      ],
      tags: [
        {
          id: 6,
          name: 'exTLQHAKc77ZzTmMZ',
        },
        {
          id: 7,
          name: '1JOCdiB',
        },
      ],
      /** pet status in the store */
      status: 'ntUSdw',
    }
  })
}
//#endregion getPetById__mock
//#endregion getPetById

//#region updatePetWithForm
//#region updatePetWithForm__base
export namespace updatePetWithForm { export type O = pet.updatePetWithForm.O; export type R = pet.updatePetWithForm.R }
/** Updates a pet in the store with form data */
export const updatePetWithForm = api<updatePetWithForm.O, updatePetWithForm.R>(s + 'updatePetWithForm', {path: '/pet/:petId', http: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, body: 'name&status'})
//#endregion updatePetWithForm__base

//#region updatePetWithForm__mock
if (__DEV__) {
  updatePetWithForm.mock('自动生成', () => {
    return {}
  })
}
//#endregion updatePetWithForm__mock
//#endregion updatePetWithForm

//#region deletePet
//#region deletePet__base
export namespace deletePet { export type O = pet.deletePet.O; export type R = pet.deletePet.R }
/** Deletes a pet */
export const deletePet = api<deletePet.O, deletePet.R>(s + 'deletePet', {path: '/pet/:petId', method: 'DELETE', header: 'api_key'})
//#endregion deletePet__base

//#region deletePet__mock
if (__DEV__) {
  deletePet.mock('自动生成', () => {
    return {}
  })
}
//#endregion deletePet__mock
//#endregion deletePet

//#region uploadFile
//#region uploadFile__base
export namespace uploadFile { export type O = pet.uploadFile.O; export type R = pet.uploadFile.R }
/** uploads an image */
export const uploadFile = api<uploadFile.O, uploadFile.R>(s + 'uploadFile', {path: '/pet/:petId/uploadImage', http: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, body: 'additionalMetadata&file'})
//#endregion uploadFile__base

//#region uploadFile__mock
if (__DEV__) {
  uploadFile.mock('自动生成', () => {
    return {
      code: 899,
      type: 'hRmuMF3cPLQ',
      message: '9q5s0Ic',
    }
  })
}
//#endregion uploadFile__mock
//#endregion uploadFile
