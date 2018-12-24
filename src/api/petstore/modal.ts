import {api} from './base'

export namespace user {
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
}
