import {api} from './base'
import {pet} from './modal'

const s = 'ApiPet.'

//#region getPetById--base auto
export namespace getPetById { export type O = pet.getPetById.O; export type R = pet.getPetById.R }
/**
 * Find pet by ID
 *
 * Returns a single pet
 */
export const getPetById = api<getPetById.O, getPetById.R>(s + 'getPetById', {path: '/pet/:petId'})
//#endregion getPetById--base
//#region getPetById--mock auto
if (__DEV__) {
  getPetById.mock('自动生成', () => {
    return {
      id: 7,
      category: {
        id: 8,
        name: 'ngTZwPQEUg5Vj',
      },
      name: 'DCinPAamL',
      photoUrls: [
        'http://llss.qiniudn.com/d0e7a2f0f3392f4df8ef3babb876c74a5.png',
        'http://llss.qiniudn.com/d3210648b6af2670f9b55908df159db90.jpg',
      ],
      tags: [
        {
          id: 9,
          name: 'HBCgN1b5ztOmTWNXf',
        },
        {
          id: 10,
          name: 'oyxeWDwt6Y',
        },
      ],
      /** pet status in the store */
      status: 'MoPC6dFtvWbJ',
    }
  })
}
//#endregion getPetById--mock


//#region findPetsByStatus--base auto
export namespace findPetsByStatus { export type O = pet.findPetsByStatus.O; export type R = pet.findPetsByStatus.R }
/**
 * Finds Pets by status
 *
 * Multiple status values can be provided with comma separated strings
 */
export const findPetsByStatus = api<findPetsByStatus.O, findPetsByStatus.R>(s + 'findPetsByStatus', {path: '/pet/findByStatus', query: 'status'})
//#endregion findPetsByStatus--base
//#region findPetsByStatus--mock auto
if (__DEV__) {
  findPetsByStatus.mock('自动生成', () => {
    return [
      {
        id: 1,
        category: {
          id: 2,
          name: 'pt',
        },
        name: 'ULPD',
        photoUrls: [
          'http://llss.qiniudn.com/dcaca24a3ea9f4bf88b59e17650ed2b78.png',
        ],
        tags: [
          {
            id: 3,
            name: 'Mi2OW',
          },
        ],
        /** pet status in the store */
        status: 'E6MclXtbDqS5Vjhq',
      },
      {
        id: 4,
        category: {
          id: 5,
          name: 'm0xG2PAy',
        },
        name: 'zcZqB8BGZe7klIVnPAz',
        photoUrls: [
          'http://llss.qiniudn.com/d3b6a66612b8516fc334531a4f820e99a.jpg',
        ],
        tags: [
          {
            id: 6,
            name: 'aWz',
          },
        ],
        /** pet status in the store */
        status: '44d',
      },
    ]
  })
}
//#endregion findPetsByStatus--mock

