import {api} from './base'

export namespace Pet {
  export namespace getPetById {
    export interface Options {
      /** ID of pet to return */
      petId: number
    }
    export interface O extends api.FilterRequest<Options> {}
    export interface ReturnsPropCategory {
      id: number
      name: string
    }
    export type ReturnsPropPhotoUrls = string[]
    export interface ReturnsPropTagsSubItem {
      id: number
      name: string
    }
    export type ReturnsPropTags = ReturnsPropTagsSubItem[]
    /** successful operation */
    export interface Returns {
      id?: number
      category?: ReturnsPropCategory
      name: string
      photoUrls: ReturnsPropPhotoUrls
      tags?: ReturnsPropTags
      /** pet status in the store */
      status?: string
    }
    export interface R extends api.FilterResponse<Returns> {}
  }
}
