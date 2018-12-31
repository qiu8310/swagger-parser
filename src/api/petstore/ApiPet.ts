import {api} from './base'
import {Pet} from './modal'

const s = 'ApiPet.'

//#region getPetById--base auto
export namespace getPetById { export type O = Pet.getPetById.O; export type R = Pet.getPetById.R }
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
      id: 1,
      category: {
        id: 1,
        name: 'Pet种类 3',
      },
      name: '猫852',
      photoUrls: [
        'http://llss.qiniudn.com/d5641a3454bc3a9d918405e4766077e66.jpg',
        'http://llss.qiniudn.com/dcb18055d22c6d61cb0b61059faf66a63.png',
        'http://llss.qiniudn.com/de36a4811f982c6f30aedb321d5dec20f.jpg',
      ],
      tags: [
        {
          id: 1,
          name: 'QBlaI6PcEDY5f',
        },
      ],
      status: '92FaC',
    }
  })
}
//#endregion getPetById--mock

