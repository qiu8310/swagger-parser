import {api} from './base'
import {pet} from './modal'

const s = 'ApiPet.'

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
          name: 'pNUByUU8gZ5UT',
        },
        name: 'Yai',
        photoUrls: [
          'http://llss.qiniudn.com/df99d8b1259f8ac34a9590d7fd83e746d.jpg',
        ],
        tags: [
          {
            id: 3,
            name: '6TBsAL43LJBU9e2JCt',
          },
        ],
        /** pet status in the store */
        status: 'ygDK9zsKXRhtH0bdWOZ',
      },
      {
        id: 4,
        category: {
          id: 5,
          name: 'KjsggkQARV',
        },
        name: 'mMBt',
        photoUrls: [
          'http://llss.qiniudn.com/db7a67689947e3077c6c34b1f4f86762d.png',
          'http://llss.qiniudn.com/d0072bb62bbc8a3cc9087518097cad483.png',
        ],
        tags: [
          {
            id: 6,
            name: 'lBiFgHK2J2OkC',
          },
          {
            id: 7,
            name: 'YKjfWqZqgRH78zjIpIyy',
          },
        ],
        /** pet status in the store */
        status: 'fHWFQjTqNeEivBIqVhU',
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
export const getPetById = api<getPetById.O, getPetById.R>(s + 'getPetById', {path: '/pet/:petId'})
//#endregion getPetById--base
//#region getPetById--mock auto
if (__DEV__) {
  getPetById.mock('自动生成', () => {
    return {
      id: 8,
      category: {
        id: 9,
        name: 'FZ3jtsv',
      },
      name: 'zMLX',
      photoUrls: [
        'http://llss.qiniudn.com/de36a4811f982c6f30aedb321d5dec20f.jpg',
      ],
      tags: [
        {
          id: 10,
          name: 'MZ7fazX2En',
        },
        {
          id: 11,
          name: 'Cl6lVY2oM',
        },
      ],
      /** pet status in the store */
      status: '71atMfNIZV',
    }
  })
}
//#endregion getPetById--mock

