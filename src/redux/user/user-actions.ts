import { IUser } from './../../models/user.d'
import { SET_USER_DOMAIN, SET_USER_IS_LOADING, SET_USER_ERROR_MESSAGE } from './user-constants'
import { TAction } from '../redux-type'
import { postSignInApi } from '../../api/user-api'
import { setAuthoriation } from '../../utils/http-with-credential-util'

export const signIn = () => async (dispatch: React.Dispatch<any>) => {
  const accountTs = localStorage.getItem('account-ts') || '0'
  const ts = new Date().getTime()
  //3 hour
  const expire = 1000 * 60 * 60 * 3
  if (parseInt(accountTs) + expire > ts) {
    return true
  }

  dispatch(setUserIsLoading(true))

  postSignInApi()
    .then(({ result }) => {
      dispatch(setUserDomain(result))
      dispatch(setUserIsLoading(false))

      localStorage.setItem('token', result.token)
      localStorage.setItem('account', result.account)
      // localStorage.setItem('account', 'guest-test')

      setAuthoriation(result.token)
    })
    .catch(err => dispatch(setUserErrorMessage(err.message)))
}

export const setUserDomain = (userDomain: IUser) =>
  ({
    type: SET_USER_DOMAIN,
    userDomain
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
  | TAction<typeof setUserIsLoading>
  | TAction<typeof setUserErrorMessage>
