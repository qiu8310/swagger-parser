import {api} from './base'

export namespace pet {
  export namespace addPet {
    export interface RawOptionsPropCategory {
      id?: number
      name?: string
    }
    export type RawOptionsPropPhotoUrls = string[]
    export interface RawOptionsPropTagsSubItem {
      id?: number
      name?: string
    }
    export type RawOptionsPropTags = RawOptionsPropTagsSubItem[]
    /**
     * Pet object that needs to be added to the store
     */
    export interface RawOptions {
      id?: number
      category?: RawOptionsPropCategory
      name: string
      photoUrls: RawOptionsPropPhotoUrls
      tags?: RawOptionsPropTags
      status?: string
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    export type RawReturns = any
    export type Returns = api.FilterResponse<RawReturns>
  }
  export namespace updatePet {
    export interface RawOptionsPropCategory {
      id?: number
      name?: string
    }
    export type RawOptionsPropPhotoUrls = string[]
    export interface RawOptionsPropTagsSubItem {
      id?: number
      name?: string
    }
    export type RawOptionsPropTags = RawOptionsPropTagsSubItem[]
    /**
     * Pet object that needs to be added to the store
     */
    export interface RawOptions {
      id?: number
      category?: RawOptionsPropCategory
      name: string
      photoUrls: RawOptionsPropPhotoUrls
      tags?: RawOptionsPropTags
      status?: string
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    export type RawReturns = any
    export type Returns = api.FilterResponse<RawReturns>
  }
  export namespace findPetsByStatus {
    export interface RawOptions {
      /**
       * Status values that need to be considered for filter
       */
      status: any[]
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    export interface RawReturnsSubItemPropCategory {
      id: number
      name: string
    }
    export type RawReturnsSubItemPropPhotoUrls = string[]
    export interface RawReturnsSubItemPropTagsSubItem {
      id: number
      name: string
    }
    export type RawReturnsSubItemPropTags = RawReturnsSubItemPropTagsSubItem[]
    export interface RawReturnsSubItem {
      id?: number
      category?: RawReturnsSubItemPropCategory
      name: string
      photoUrls: RawReturnsSubItemPropPhotoUrls
      tags?: RawReturnsSubItemPropTags
      status?: string
    }
    /**
     * successful operation
     */
    export type RawReturns = RawReturnsSubItem[]
    export type Returns = api.FilterResponse<RawReturns>
  }
  export namespace getPetById {
    export interface RawOptions {
      /**
       * ID of pet to return
       */
      petId: number
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    export interface RawReturnsPropCategory {
      id: number
      name: string
    }
    export type RawReturnsPropPhotoUrls = string[]
    export interface RawReturnsPropTagsSubItem {
      id: number
      name: string
    }
    export type RawReturnsPropTags = RawReturnsPropTagsSubItem[]
    /**
     * successful operation
     */
    export interface RawReturns {
      id?: number
      category?: RawReturnsPropCategory
      name: string
      photoUrls: RawReturnsPropPhotoUrls
      tags?: RawReturnsPropTags
      status?: string
    }
    export interface Returns extends api.FilterResponse<RawReturns> {}
  }
  export namespace updatePetWithForm {
    export interface RawOptions {
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
    export interface Options extends api.FilterRequest<RawOptions> {}
    export type RawReturns = any
    export type Returns = api.FilterResponse<RawReturns>
  }
  export namespace deletePet {
    export interface RawOptions {
      api_key?: string
      /**
       * Pet id to delete
       */
      petId: number
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    export type RawReturns = any
    export type Returns = api.FilterResponse<RawReturns>
  }
  export namespace uploadFile {
    export interface RawOptions {
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
    export interface Options extends api.FilterRequest<RawOptions> {}
    /**
     * successful operation
     */
    export interface RawReturns {
      code: number
      type: string
      message: string
    }
    export interface Returns extends api.FilterResponse<RawReturns> {}
  }
}
export namespace store {
  export namespace getInventory {
    /**
     * successful operation
     */
    export interface RawReturns {
    }
    export interface Returns extends api.FilterResponse<RawReturns> {}
  }
  export namespace placeOrder {
    /**
     * Order modal
     */
    export interface RawOptions {
      id?: number
      petId?: number
      quantity?: number
      shipDate?: string
      status?: string
      complete?: boolean
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    /**
     * successful operation
     */
    export interface RawReturns {
      id: number
      petId: number
      quantity: number
      shipDate: string
      status: string
      complete: boolean
    }
    export interface Returns extends api.FilterResponse<RawReturns> {}
  }
  export namespace getOrderById {
    export interface RawOptions {
      /**
       * ID of pet that needs to be fetched
       */
      orderId: number
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    /**
     * successful operation
     */
    export interface RawReturns {
      id: number
      petId: number
      quantity: number
      shipDate: string
      status: string
      complete: boolean
    }
    export interface Returns extends api.FilterResponse<RawReturns> {}
  }
  export namespace deleteOrder {
    export interface RawOptions {
      /**
       * ID of the order that needs to be deleted
       */
      orderId: number
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    export type RawReturns = any
    export type Returns = api.FilterResponse<RawReturns>
  }
}
export namespace user {
  export namespace createUser {
    /**
     * user modal
     */
    export interface RawOptions {
      id?: number
      username?: string
      firstName?: string
      lastName?: string
      email?: string
      password?: string
      phone?: string
      userStatus?: number
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    export type RawReturns = any
    export type Returns = api.FilterResponse<RawReturns>
  }
  export namespace createUsersWithArrayInput {
    /**
     * user modal
     */
    export interface RawOptionsPropRawBodySubItem {
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
    export type RawOptionsPropRawBody = RawOptionsPropRawBodySubItem[]
    export interface RawOptions {
      __rawBody: RawOptionsPropRawBody
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    export type RawReturns = any
    export type Returns = api.FilterResponse<RawReturns>
  }
  export namespace createUsersWithListInput {
    /**
     * user modal
     */
    export interface RawOptionsPropRawBodySubItem {
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
    export type RawOptionsPropRawBody = RawOptionsPropRawBodySubItem[]
    export interface RawOptions {
      __rawBody: RawOptionsPropRawBody
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    export type RawReturns = any
    export type Returns = api.FilterResponse<RawReturns>
  }
  export namespace loginUser {
    export interface RawOptions {
      /**
       * The user name for login
       */
      username: string
      /**
       * The password for login in clear text
       */
      password: string
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    export type RawReturns = string
    export type Returns = api.FilterResponse<RawReturns>
  }
  export namespace logoutUser {
    export type RawReturns = any
    export type Returns = api.FilterResponse<RawReturns>
  }
  export namespace getUserByName {
    export interface RawOptions {
      /**
       * The name that needs to be fetched. Use user1 for testing.
       */
      username: string
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    /**
     * successful operation
     */
    export interface RawReturns {
      id: number
      username: string
      firstName: string
      lastName: string
      email: string
      password: string
      phone: string
      userStatus: number
    }
    export interface Returns extends api.FilterResponse<RawReturns> {}
  }
  export namespace updateUser {
    /**
     * user modal
     */
    export interface RawOptions {
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
    export interface Options extends api.FilterRequest<RawOptions> {}
    export type RawReturns = any
    export type Returns = api.FilterResponse<RawReturns>
  }
  export namespace deleteUser {
    export interface RawOptions {
      /**
       * The name that needs to be deleted
       */
      username: string
    }
    export interface Options extends api.FilterRequest<RawOptions> {}
    export type RawReturns = any
    export type Returns = api.FilterResponse<RawReturns>
  }
}
