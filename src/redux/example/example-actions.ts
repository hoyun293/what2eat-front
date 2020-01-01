import { ISetExampleNews } from './example-payloads'
import { SET_EXMAPLE_NEWS, INCREASE_EXMAPLE_COUNT, SELECT_EXMAPLE_NEWS } from './example-constants'

export const selectExampleNews = () =>
  ({
    type: SELECT_EXMAPLE_NEWS,
    payload: null
  } as const)

export const setExampleNews = (payload: Partial<ISetExampleNews>) =>
  ({
    type: SET_EXMAPLE_NEWS,
    payload
  } as const)

export const increaseExampleCount = (payload: number) =>
  ({
    type: INCREASE_EXMAPLE_COUNT,
    payload: { count: payload }
  } as const)
