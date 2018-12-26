import {api} from './base'
import {pet} from './modal'

const s = 'ApiPet.'

//#region addPet
//#region addPet__base
export namespace addPet { export type O = pet.addPet.O; export type R = pet.addPet.R }
/**
 * Add a new pet to the store
 */
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
/**
 * Update an existing pet
 */
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
          name: 'M5n55uCdCXIXFi3V9',
        },
        name: 'qkC0ls',
        photoUrls: [
          'http://llss.qiniudn.com/d79caa92b25c7f63f5066dc22dc0282de.jpg',
        ],
        tags: [
          {
            id: 3,
            name: 'PN9dBZRWe',
          },
          {
            id: 4,
            name: 'yytmWeg',
          },
          {
            id: 5,
            name: 'moT8pp7lv6f',
          },
          {
            id: 6,
            name: 'DS3AnSj4i8biVWID',
          },
        ],
        status: '5O7ByeGt9eQ9vkNjgRB',
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
      id: 7,
      category: {
        id: 8,
        name: 'd0BPxGzI592C2asrs',
      },
      name: 'Io4Oz6HTnibtKlvdh',
      photoUrls: [
        'http://llss.qiniudn.com/d868f7175ff7f7e6c2e116988f6851f3b.jpg',
        'http://llss.qiniudn.com/d35853039e8912f05891f45dfe15af661.png',
        'http://llss.qiniudn.com/d6bd2a4ca24cefe66346b75eaa00e69f7.png',
        'http://llss.qiniudn.com/d95b334d0510ddf80d029711ff24545a7.png',
      ],
      tags: [
        {
          id: 9,
          name: '7QM',
        },
        {
          id: 10,
          name: 'pGmLiyp',
        },
      ],
      status: 'Sw2zPKGLyPuOGwM432',
    }
  })
}
//#endregion getPetById__mock
//#endregion getPetById

//#region updatePetWithForm
//#region updatePetWithForm__base
export namespace updatePetWithForm { export type O = pet.updatePetWithForm.O; export type R = pet.updatePetWithForm.R }
/**
 * Updates a pet in the store with form data
 */
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
/**
 * Deletes a pet
 */
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
/**
 * uploads an image
 */
export const uploadFile = api<uploadFile.O, uploadFile.R>(s + 'uploadFile', {path: '/pet/:petId/uploadImage', http: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, body: 'additionalMetadata&file'})
//#endregion uploadFile__base

//#region uploadFile__mock
if (__DEV__) {
  uploadFile.mock('自动生成', () => {
    return {
      code: 929,
      type: 'AL1rxZ2IiuhzDlTU',
      message: 'lO9WkyqH9C',
    }
  })
}
//#endregion uploadFile__mock
//#endregion uploadFile
