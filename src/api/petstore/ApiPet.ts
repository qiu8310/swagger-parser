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
      name: '猫291',
      photoUrls: [
        'http://llss.qiniudn.com/d49523ccc8c872de1a255e8879ff0548c.jpg',
        'http://llss.qiniudn.com/d3b6a66612b8516fc334531a4f820e99a.jpg',
        'http://llss.qiniudn.com/d11258715ca4af94e73f28b6a6d51aac1.jpg',
      ],
      tags: [
        {
          id: 1,
          name: 'fIiDKB',
        },
      ],
      status: 'sold',
    }
  })
}
//#endregion getPetById--mock

