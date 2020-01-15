import { ICommonState } from './../redux-type'
import { IUser } from '../../models/user'

export interface IUserState extends ICommonState {
  userDomain: IUser
}
