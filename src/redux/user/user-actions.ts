import { IUser } from './../../models/user.d'
import {
  SET_USER_DOMAIN,
  SET_USER_IS_LOADING,
  SET_USER_ERROR_MESSAGE,
  SET_USER_IS_LOGIN
} from './user-constants'
import { TAction } from '../redux-type'
import { postSignInApi } from '../../api/user-api'
import { setAuthoriation } from '../../utils/http-with-credential-util'

const accountTs = localStorage.getItem('account-ts') || '0'
const ts = new Date().getTime()
export const signIn = () => async (dispatch: React.Dispatch<any>) => {
  //3 hour
  const expire = 1000 * 60 * 60 * 3
  if (parseInt(accountTs) + expire > ts) {
    const token = localStorage.getItem('token') || ''
    setAuthoriation(token)
    dispatch(setUserIsLogin(true))
    return true
  }

  dispatch(setUserIsLoading(true))

  postSignInApi()
    .then(({ result }) => {
      dispatch(setUserDomain(result))
      dispatch(setUserIsLoading(false))
      localStorage.setItem('token', result.token)
      localStorage.setItem('account', result.account)
      localStorage.setItem('userId', result.userId)

      setAuthoriation(result.token)
      dispatch(setUserIsLogin(true))
    })
    .catch(err => dispatch(setUserErrorMessage(err.message)))
}

export const setUserDomain = (userDomain: IUser) =>
  ({
    type: SET_USER_DOMAIN,
    userDomain
  } as const)

export const setUserIsLogin = (isLogin: boolean) =>
  ({
    type: SET_USER_IS_LOGIN,
    isLogin
  } as const)

export const setUserIsLoading = (isLoading: boolean) =>
  ({
    type: SET_USER_IS_LOADING,
    isLoading
  } as const)

export const setUserErrorMessage = (errorMessage: string) =>
  ({
    type: SET_USER_ERROR_MESSAGE,
    errorMessage
  } as const)

export type TUserActions =
  | TAction<typeof setUserDomain>
  | TAction<typeof setUserIsLogin>
  | TAction<typeof setUserIsLoading>
  | TAction<typeof setUserErrorMessage>
