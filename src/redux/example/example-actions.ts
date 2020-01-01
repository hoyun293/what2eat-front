import { ISetExampleNews } from './example-payloads'
import { SET_EXAMPLE_NEWS, INCREASE_EXAMPLE_COUNT, SELECT_EXAMPLE_NEWS } from './example-constants'
import { TAction } from '../redux-type'

export const selectExampleNews = () =>
  ({
    type: SELECT_EXAMPLE_NEWS
  } as const)

export const setExampleNews = (payload: Partial<ISetExampleNews>) =>
  ({
    type: SET_EXAMPLE_NEWS,
    payload
  } as const)

export const increaseExampleCount = (payload: number) =>
  ({
    type: INCREASE_EXAMPLE_COUNT,
    payload
  } as const)

export type TExampleActions =
  | TAction<typeof setExampleNews>
  | TAction<typeof increaseExampleCount>
  | TAction<typeof selectExampleNews>
