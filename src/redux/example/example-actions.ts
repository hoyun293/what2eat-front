import { ISetExampleNews } from './example-payloads'
import { SET_EXMAPLE_NEWS, INCREASE_EXMAPLE_COUNT } from './example-constants'
import { TAction } from '../redux-type'

export const setExampleNews = (payload: Partial<ISetExampleNews>) =>
  ({
    type: SET_EXMAPLE_NEWS,
    payload
  } as const)

export const increaseExampleCount = (payload: number) =>
  ({
    type: INCREASE_EXMAPLE_COUNT,
    payload
  } as const)

export type TExampleActions = TAction<typeof setExampleNews> | TAction<typeof increaseExampleCount>
