import { User } from './model/model-usuario'

declare module 'restify' {
  export interface Request {
    authenticated: User
  }
}
