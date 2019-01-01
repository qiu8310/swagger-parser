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
        name: 'Pet种类 2',
      },
      name: '猫286',
      photoUrls: [
        'http://llss.qiniudn.com/dc5411e2c92063a0e9799394ad0db1c8a.jpg',
        'http://llss.qiniudn.com/db3f61d51711315dc6e01df8a381ba4b1.png',
        'http://llss.qiniudn.com/d419629638aa5faf88b9d186476b71141.jpg',
        'http://llss.qiniudn.com/de36a4811f982c6f30aedb321d5dec20f.jpg',
      ],
      tags: [
        {
          id: 1,
          name: 'xtPstFPB5u',
        },
      ],
      status: 'available',
    }
  })
}
//#endregion getPetById--mock

