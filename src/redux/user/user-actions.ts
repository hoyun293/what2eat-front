import { IUser } from './../../models/user.d'
import { SET_USER_DOMAIN, SET_USER_IS_LOADING, SET_USER_ERROR_MESSAGE } from './user-constants'
import { TAction } from '../redux-type'
import { postSignInApi } from '../../api/user-api'

export const signIn = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setUserIsLoading(true))

  postSignInApi()
    .then(({ data }) => {
      dispatch(setUserDomain(data))
      dispatch(setUserIsLoading(false))

      // TODO : 테스트 필요
      console.log(data.token)
      localStorage.setItem('token', data.token)
      localStorage.setItem('account', data.account)
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
