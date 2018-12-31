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
        name: 'Pet种类 1',
      },
      name: '猫710',
      photoUrls: [
        'http://llss.qiniudn.com/df99d8b1259f8ac34a9590d7fd83e746d.jpg',
        'http://llss.qiniudn.com/dcaca24a3ea9f4bf88b59e17650ed2b78.png',
        'http://llss.qiniudn.com/de18381409caf8784cbc717c975353060.jpg',
      ],
      tags: [
        {
          id: 1,
          name: 'W9VUoJV1m23Icvk',
        },
      ],
      status: 'available',
    }
  })
}
//#endregion getPetById--mock

