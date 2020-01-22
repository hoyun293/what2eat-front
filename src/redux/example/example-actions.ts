import { ISetExampleNews } from './example-payloads'
import {
  SET_EXAMPLE_NEWS,
  INCREASE_EXAMPLE_COUNT,
  SET_EXAMPLE_IS_LOADING,
  SET_EXAMPLE_ERROR_MESSAGE
} from './example-constants'
import { TAction } from '../redux-type'
import { getExampleNewsApi } from '../../api/example-api'
import { setUserIsLoading } from '../user/user-actions'

export const selectExampleNews = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setUserIsLoading(true))
  const { result } = await getExampleNewsApi()
  dispatch(setExampleNews({ news: result.news }))
  dispatch(setUserIsLoading(false))
}

export const setExampleIsLoading = (isLoading: boolean) =>
  ({
    type: SET_EXAMPLE_IS_LOADING,
    isLoading
  } as const)

export const setExampleErrorMessage = (errorMessage: string) =>
  ({
    type: SET_EXAMPLE_ERROR_MESSAGE,
    errorMessage
  } as const)

export const increaseExampleCount = (payload: number) =>
  ({
    type: INCREASE_EXAMPLE_COUNT,
    payload
  } as const)

export const setExampleNews = (payload: Partial<ISetExampleNews>) =>
  ({
    type: SET_EXAMPLE_NEWS,
    payload
  } as const)

export type TExampleActions =
  | TAction<typeof setExampleNews>
  | TAction<typeof setExampleIsLoading>
  | TAction<typeof increaseExampleCount>
  | TAction<typeof setExampleErrorMessage>
