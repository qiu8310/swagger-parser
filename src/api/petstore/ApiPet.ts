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
          name: 'O9JeYt8NRNCE',
        },
        name: 'oEkSipcv2Wo9ZCkJ0mJY',
        photoUrls: [
          'http://llss.qiniudn.com/d53024d79aeebacf41c225984ef49eb7f.jpg',
          'http://llss.qiniudn.com/df8ec7257295a930a836f76b9a20a5834.png',
        ],
        tags: [
          {
            id: 3,
            name: 'OW0Z',
          },
          {
            id: 4,
            name: 'kVC',
          },
        ],
        /** pet status in the store */
        status: 'dsKHbVx8z9qOviLtxpg',
      },
      {
        id: 5,
        category: {
          id: 6,
          name: '92IhdYMxOUuhjt',
        },
        name: 'z9Y97F5NnCGbepLM4v8k',
        photoUrls: [
          'http://llss.qiniudn.com/d38770fce78dfca736d1dafaa1371ffed.png',
          'http://llss.qiniudn.com/d6bd2a4ca24cefe66346b75eaa00e69f7.png',
        ],
        tags: [
          {
            id: 7,
            name: 'XnRJ0TSqZj8See7th',
          },
        ],
        /** pet status in the store */
        status: 'JjQQ',
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
        name: 'CDZxUI5VtkHAeh7Z',
      },
      name: 'TgB1Tn5qLAXFuI',
      photoUrls: [
        'http://llss.qiniudn.com/df8ec7257295a930a836f76b9a20a5834.png',
      ],
      tags: [
        {
          id: 10,
          name: 'L143yMB7in6YGtkOM',
        },
        {
          id: 11,
          name: '5EyWGItswjuwf',
        },
      ],
      /** pet status in the store */
      status: '3tSp3RyzDiPPUkcORD',
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
      code: 479,
      type: 'rapTTqK',
      message: 'Txl',
    }
  })
}
//#endregion uploadFile--mock

