import {api} from './base'
import {Pet} from './modal'

const s = 'ApiPet.'

//#region getPetById--base auto
export namespace getPetById { export type O = Pet.getPetById.O; export type R = Pet.getPetById.R }
/**
 * Find pet by ID
 *
 * Returns a single pet
 *
 *
 * **TAG:** pet； &nbsp;&nbsp; **PATH:** /pet/{petId}；
 *
 * @see [线上文档](https://petstore.swagger.io/#/pet/getPetById)
 */
export const getPetById = api<getPetById.O, getPetById.R>(s + 'getPetById', {path: '/pet/:petId'})
//#endregion getPetById--base
//#region getPetById--mock auto
if (__DEV__) {
  getPetById.mock('自动生成', () => {
    return {
      id: 1,
      category: {
        id: 1,
        name: 'Pet种类 3',
      },
      name: '猫886',
      photoUrls: [
        'http://llss.qiniudn.com/de630142571df3f0fb671289d946f4fef.png',
        'http://llss.qiniudn.com/de36a4811f982c6f30aedb321d5dec20f.jpg',
        'http://llss.qiniudn.com/d948b0ebb07848576c020f1a169599d62.jpg',
        'http://llss.qiniudn.com/de630142571df3f0fb671289d946f4fef.png',
        'http://llss.qiniudn.com/d0072bb62bbc8a3cc9087518097cad483.png',
      ],
      tags: [
        {
          id: 1,
          name: 'L0OGda',
        },
      ],
      status: 'pending',
    }
  })
}
//#endregion getPetById--mock

