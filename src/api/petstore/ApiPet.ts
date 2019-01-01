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
      name: '猫632',
      photoUrls: [
        'http://llss.qiniudn.com/d1b7711b6575bc8d24806eb4110978420.png',
        'http://llss.qiniudn.com/dd9cb918ac624e719e173833423d8fc6c.jpg',
      ],
      tags: [
        {
          id: 1,
          name: 'YaE4LtVqGjGI2Is',
        },
      ],
      status: 'available',
    }
  })
}
//#endregion getPetById--mock

