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
        name: 'Pet种类 2',
      },
      name: '猫211',
      photoUrls: [
        'http://llss.qiniudn.com/df5a0f51a205e7bd71bbb61688bc09abf.png',
        'http://llss.qiniudn.com/d0e7a2f0f3392f4df8ef3babb876c74a5.png',
        'http://llss.qiniudn.com/ddad40594715b7ed672ecf0d3418fe9c4.jpg',
        'http://llss.qiniudn.com/d38770fce78dfca736d1dafaa1371ffed.png',
      ],
      tags: [
        {
          id: 1,
          name: 'xadP9SPdJ7jVmvJdQY',
        },
      ],
      status: 'kJTqWqFRENrG5d',
    }
  })
}
//#endregion getPetById--mock

