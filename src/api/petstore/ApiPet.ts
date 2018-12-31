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
 * **TAG:** pet； &nbsp;&nbsp; **PATH:** /pet/{petId}；
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
      name: '猫822',
      photoUrls: [
        'http://llss.qiniudn.com/dde050ca7fdf7a02f8b0474d9122455cc.png',
        'http://llss.qiniudn.com/dd9cb918ac624e719e173833423d8fc6c.jpg',
        'http://llss.qiniudn.com/d1eef203c492adee12aa9a5cad5ec7c5a.png',
        'http://llss.qiniudn.com/dd9cb918ac624e719e173833423d8fc6c.jpg',
      ],
      tags: [
        {
          id: 1,
          name: '0dhOBMU',
        },
      ],
      status: 'IT3G3g5q5GVqLxvMhB',
    }
  })
}
//#endregion getPetById--mock
