import {Type} from '../struct/Type'

export function mock(type: Type) {
  return `{
  id: 1,
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  phone: '',
  userStatus: 1,
  username: '',
}`
}
