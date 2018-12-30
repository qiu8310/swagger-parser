import {api} from './base'

export namespace pet {
  export namespace findPetsByStatus {
    export interface Options {
      /** Status values that need to be considered for filter */
      status: any[]
    }
    export interface O extends api.FilterRequest<Options> {}
    export interface ReturnsSubItemPropCategory {
      id: number
      name: string
    }
    export type ReturnsSubItemPropPhotoUrls = string[]
    export interface ReturnsSubItemPropTagsSubItem {
      id: number
      name: string
    }
    export type ReturnsSubItemPropTags = ReturnsSubItemPropTagsSubItem[]
    export interface ReturnsSubItem {
      id?: number
      category?: ReturnsSubItemPropCategory
      name: string
      photoUrls: ReturnsSubItemPropPhotoUrls
      tags?: ReturnsSubItemPropTags
      /** pet status in the store */
      status?: string
    }
    /** successful operation */
    export type Returns = ReturnsSubItem[]
    export type R = api.FilterResponse<Returns>
  }
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
