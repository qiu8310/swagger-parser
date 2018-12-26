import {api} from './base'

export namespace pet {
  export namespace addPet {
    export interface OptionsPropCategory {
      id?: number
      name?: string
    }
    export type OptionsPropPhotoUrls = string[]
    export interface OptionsPropTagsSubItem {
      id?: number
      name?: string
    }
    export type OptionsPropTags = OptionsPropTagsSubItem[]
    /**
     * Pet object that needs to be added to the store
     */
    export interface Options {
      id?: number
      category?: OptionsPropCategory
      name: string
      photoUrls: OptionsPropPhotoUrls
      tags?: OptionsPropTags
      status?: string
    }
    export interface O extends api.FilterRequest<Options> {}
    export type Returns = any
    export type R = api.FilterResponse<Returns>
  }
  export namespace updatePet {
    export interface OptionsPropCategory {
      id?: number
      name?: string
    }
    export type OptionsPropPhotoUrls = string[]
    export interface OptionsPropTagsSubItem {
      id?: number
      name?: string
    }
    export type OptionsPropTags = OptionsPropTagsSubItem[]
    /**
     * Pet object that needs to be added to the store
     */
    export interface Options {
      id?: number
      category?: OptionsPropCategory
      name: string
      photoUrls: OptionsPropPhotoUrls
      tags?: OptionsPropTags
      status?: string
    }
    export interface O extends api.FilterRequest<Options> {}
    export type Returns = any
    export type R = api.FilterResponse<Returns>
  }
  export namespace findPetsByStatus {
    export interface Options {
      /**
       * Status values that need to be considered for filter
       */
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
      status?: string
    }
    /**
     * successful operation
     */
    export type Returns = ReturnsSubItem[]
    export type R = api.FilterResponse<Returns>
  }
  export namespace getPetById {
    export interface Options {
      /**
       * ID of pet to return
       */
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
    /**
     * successful operation
     */
    export interface Returns {
      id?: number
      category?: ReturnsPropCategory
      name: string
      photoUrls: ReturnsPropPhotoUrls
      tags?: ReturnsPropTags
      status?: string
    }
    export interface R extends api.FilterResponse<Returns> {}
  }
  export namespace updatePetWithForm {
    export interface Options {
      /**
       * ID of pet that needs to be updated
       */
      petId: number
      /**
       * Updated name of the pet
       */
      name?: string
      /**
       * Updated status of the pet
       */
      status?: string
    }
    export interface O extends api.FilterRequest<Options> {}
    export type Returns = any
    export type R = api.FilterResponse<Returns>
  }
  export namespace deletePet {
    export interface Options {
      api_key?: string
      /**
       * Pet id to delete
       */
      petId: number
    }
    export interface O extends api.FilterRequest<Options> {}
    export type Returns = any
    export type R = api.FilterResponse<Returns>
  }
  export namespace uploadFile {
    export interface Options {
      /**
       * ID of pet to update
       */
      petId: number
      /**
       * Additional data to pass to server
       */
      additionalMetadata?: string
      /**
       * file to upload
       */
      file?: any
    }
    export interface O extends api.FilterRequest<Options> {}
    /**
     * successful operation
     */
    export interface Returns {
      code: number
      type: string
      message: string
    }
    export interface R extends api.FilterResponse<Returns> {}
  }
}
export namespace store {
  export namespace getInventory {
    /**
     * successful operation
     */
    export interface Returns {
    }
    export interface R extends api.FilterResponse<Returns> {}
  }
  export namespace placeOrder {
    /**
     * Order modal
     */
    export interface Options {
      id?: number
      petId?: number
      quantity?: number
      shipDate?: string
      status?: string
      complete?: boolean
    }
    export interface O extends api.FilterRequest<Options> {}
    /**
     * successful operation
     */
    export interface Returns {
      id: number
      petId: number
      quantity: number
      shipDate: string
      status: string
      complete: boolean
    }
    export interface R extends api.FilterResponse<Returns> {}
  }
  export namespace getOrderById {
    export interface Options {
      /**
       * ID of pet that needs to be fetched
       */
      orderId: number
    }
    export interface O extends api.FilterRequest<Options> {}
    /**
     * successful operation
     */
    export interface Returns {
      id: number
      petId: number
      quantity: number
      shipDate: string
      status: string
      complete: boolean
    }
    export interface R extends api.FilterResponse<Returns> {}
  }
  export namespace deleteOrder {
    export interface Options {
      /**
       * ID of the order that needs to be deleted
       */
      orderId: number
    }
    export interface O extends api.FilterRequest<Options> {}
    export type Returns = any
    export type R = api.FilterResponse<Returns>
  }
}
export namespace user {
  export namespace createUser {
    /**
     * user modal
     */
    export interface Options {
      id?: number
      username?: string
      firstName?: string
      lastName?: string
      email?: string
      password?: string
      phone?: string
      userStatus?: number
    }
    export interface O extends api.FilterRequest<Options> {}
    export type Returns = any
    export type R = api.FilterResponse<Returns>
  }
  export namespace createUsersWithArrayInput {
    /**
     * user modal
     */
    export interface OptionsPropRawBodySubItem {
      id?: number
      username?: string
      firstName?: string
      lastName?: string
      email?: string
      password?: string
      phone?: string
      userStatus?: number
    }
    /**
     * List of user object
     */
    export type OptionsPropRawBody = OptionsPropRawBodySubItem[]
    export interface Options {
      __rawBody: OptionsPropRawBody
    }
    export interface O extends api.FilterRequest<Options> {}
    export type Returns = any
    export type R = api.FilterResponse<Returns>
  }
  export namespace createUsersWithListInput {
    /**
     * user modal
     */
    export interface OptionsPropRawBodySubItem {
      id?: number
      username?: string
      firstName?: string
      lastName?: string
      email?: string
      password?: string
      phone?: string
      userStatus?: number
    }
    /**
     * List of user object
     */
    export type OptionsPropRawBody = OptionsPropRawBodySubItem[]
    export interface Options {
      __rawBody: OptionsPropRawBody
    }
    export interface O extends api.FilterRequest<Options> {}
    export type Returns = any
    export type R = api.FilterResponse<Returns>
  }
  export namespace loginUser {
    export interface Options {
      /**
       * The user name for login
       */
      username: string
      /**
       * The password for login in clear text
       */
      password: string
    }
    export interface O extends api.FilterRequest<Options> {}
    export type Returns = string
    export type R = api.FilterResponse<Returns>
  }
  export namespace logoutUser {
    export type Returns = any
    export type R = api.FilterResponse<Returns>
  }
  export namespace getUserByName {
    export interface Options {
      /**
       * The name that needs to be fetched. Use user1 for testing.
       */
      username: string
    }
    export interface O extends api.FilterRequest<Options> {}
    /**
     * successful operation
     */
    export interface Returns {
      id: number
      username: string
      firstName: string
      lastName: string
      email: string
      password: string
      phone: string
      userStatus: number
    }
    export interface R extends api.FilterResponse<Returns> {}
  }
  export namespace updateUser {
    /**
     * user modal
     */
    export interface Options {
      id?: number
      /**
       * name that need to be updated
       */
      username: string
      firstName?: string
      lastName?: string
      email?: string
      password?: string
      phone?: string
      userStatus?: number
    }
    export interface O extends api.FilterRequest<Options> {}
    export type Returns = any
    export type R = api.FilterResponse<Returns>
  }
  export namespace deleteUser {
    export interface Options {
      /**
       * The name that needs to be deleted
       */
      username: string
    }
    export interface O extends api.FilterRequest<Options> {}
    export type Returns = any
    export type R = api.FilterResponse<Returns>
  }
}
