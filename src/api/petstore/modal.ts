import {api} from './base'
export namespace user {
  export namespace bindBankCard {
    export interface Options extends api.FilterRequest<RawOptions> {}
    export interface Result extends api.FilterResponse<RawResult> {}
    export interface RawOptions {}
    export interface RawResult {}
  }
}
