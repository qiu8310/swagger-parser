import {api} from './base'
import {pet} from './modal'

const s = 'ApiPet.'

//#region addPet--base auto
export namespace addPet { export type O = pet.addPet.O; export type R = pet.addPet.R }
/** Add a new pet to the store */
export const addPet = api<addPet.O, addPet.R>(s + 'addPet', {path: '/pet', body: 'id&category&name&photoUrls&tags&status'})
//#endregion addPet--base
//#region addPet--mock auto
if (__DEV__) {
  addPet.mock('自动生成', () => {
    return {}
  })
}
//#endregion addPet--mock


//#region updatePet--base auto
export namespace updatePet { export type O = pet.updatePet.O; export type R = pet.updatePet.R }
/** Update an existing pet */
export const updatePet = api<updatePet.O, updatePet.R>(s + 'updatePet', {path: '/pet', method: 'PUT', body: 'id&category&name&photoUrls&tags&status'})
//#endregion updatePet--base
//#region updatePet--mock auto
if (__DEV__) {
  updatePet.mock('自动生成', () => {
    return {}
  })
}
//#endregion updatePet--mock


//#region findPetsByStatus--base auto
export namespace findPetsByStatus { export type O = pet.findPetsByStatus.O; export type R = pet.findPetsByStatus.R }
/**
 * Finds Pets by status
 *
 * Multiple status values can be provided with comma separated strings
 */
export const findPetsByStatus = api<findPetsByStatus.O, findPetsByStatus.R>(s + 'findPetsByStatus', {path: '/pet/findByStatus', method: 'GET', query: 'status'})
//#endregion findPetsByStatus--base
//#region findPetsByStatus--mock auto
if (__DEV__) {
  findPetsByStatus.mock('自动生成', () => {
    return [
      {
        id: 1,
        category: {
          id: 2,
          name: '9sMhre',
        },
        name: 'YJemg',
        photoUrls: [
          'http://llss.qiniudn.com/db7a67689947e3077c6c34b1f4f86762d.png',
          'http://llss.qiniudn.com/d6bd2a4ca24cefe66346b75eaa00e69f7.png',
        ],
        tags: [
          {
            id: 3,
            name: 'xTz6Jd',
          },
          {
            id: 4,
            name: 'Wvwms1i1gfddZM3w',
          },
        ],
        /** pet status in the store */
        status: 'ii3pdu5J',
      },
      {
        id: 5,
        category: {
          id: 6,
          name: '4LOqPN1',
        },
        name: '05WodRxV',
        photoUrls: [
          'http://llss.qiniudn.com/dfe7dfb5b0a15b1489adb2575145ccfa3.jpg',
        ],
        tags: [
          {
            id: 7,
            name: 'qHqmotd',
          },
        ],
        /** pet status in the store */
        status: '4VDNTGD',
      },
    ]
  })
}
//#endregion findPetsByStatus--mock


//#region getPetById--base auto
export namespace getPetById { export type O = pet.getPetById.O; export type R = pet.getPetById.R }
/**
 * Find pet by ID
 *
 * Returns a single pet
 */
export const getPetById = api<getPetById.O, getPetById.R>(s + 'getPetById', {path: '/pet/:petId', method: 'GET'})
//#endregion getPetById--base
//#region getPetById--mock auto
if (__DEV__) {
  getPetById.mock('自动生成', () => {
    return {
      id: 8,
      category: {
        id: 9,
        name: 'tn8gAl6P65Dx',
      },
      name: 'y9jRZ',
      photoUrls: [
        'http://llss.qiniudn.com/d5641a3454bc3a9d918405e4766077e66.jpg',
        'http://llss.qiniudn.com/dd9cb918ac624e719e173833423d8fc6c.jpg',
      ],
      tags: [
        {
          id: 10,
          name: 'Jd8fiuuy8S8Ugxhnuz',
        },
      ],
      /** pet status in the store */
      status: 'LxQbiY9wzeOhU7nl',
    }
  })
}
//#endregion getPetById--mock


//#region updatePetWithForm--base auto
export namespace updatePetWithForm { export type O = pet.updatePetWithForm.O; export type R = pet.updatePetWithForm.R }
/** Updates a pet in the store with form data */
export const updatePetWithForm = api<updatePetWithForm.O, updatePetWithForm.R>(s + 'updatePetWithForm', {path: '/pet/:petId', http: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, body: 'name&status'})
//#endregion updatePetWithForm--base
//#region updatePetWithForm--mock auto
if (__DEV__) {
  updatePetWithForm.mock('自动生成', () => {
    return {}
  })
}
//#endregion updatePetWithForm--mock


//#region deletePet--base auto
export namespace deletePet { export type O = pet.deletePet.O; export type R = pet.deletePet.R }
/** Deletes a pet */
export const deletePet = api<deletePet.O, deletePet.R>(s + 'deletePet', {path: '/pet/:petId', method: 'DELETE', header: 'api_key'})
//#endregion deletePet--base
//#region deletePet--mock auto
if (__DEV__) {
  deletePet.mock('自动生成', () => {
    return {}
  })
}
//#endregion deletePet--mock


//#region uploadFile--base auto
export namespace uploadFile { export type O = pet.uploadFile.O; export type R = pet.uploadFile.R }
/** uploads an image */
export const uploadFile = api<uploadFile.O, uploadFile.R>(s + 'uploadFile', {path: '/pet/:petId/uploadImage', http: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, body: 'additionalMetadata&file'})
//#endregion uploadFile--base
//#region uploadFile--mock auto
if (__DEV__) {
  uploadFile.mock('自动生成', () => {
    return {
      code: 770,
      type: 'V9b7',
      message: 'Te4YW',
    }
  })
}
//#endregion uploadFile--mock

