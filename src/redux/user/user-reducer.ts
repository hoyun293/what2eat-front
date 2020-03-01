import {
  SET_USER_IS_LOADING,
  SET_USER_ERROR_MESSAGE,
  SET_USER_DOMAIN,
  SET_USER_IS_LOGIN
} from './user-constants'
import { IUserState } from './user-state'
import { TUserActions } from './user-actions'

export default function userReducer(state: IUserState, action: TUserActions): IUserState {
  switch (action.type) {
    case SET_USER_DOMAIN:
      return { ...state, userDomain: action.userDomain }
    case SET_USER_IS_LOGIN:
      return { ...state, isLogin: action.isLogin }
    case SET_USER_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_USER_ERROR_MESSAGE:
      return { ...state }
  }
}
