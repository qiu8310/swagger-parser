import {api} from './base'

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
