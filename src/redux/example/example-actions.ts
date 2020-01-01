import { ISetExampleNews } from './example-payloads'
import { SET_EXMAPLE_NEWS, INCREASE_EXMAPLE_COUNT, SELECT_EXMAPLE_NEWS } from './example-constants'

export const selectExampleNews = () => ({
  type: SELECT_EXMAPLE_NEWS,
  payload: null
})

export const setExampleNews = (news: Partial<ISetExampleNews>) => ({
  type: SET_EXMAPLE_NEWS,
  payload: { news }
})

export const increaseExampleCount = (count: number) => ({
  type: INCREASE_EXMAPLE_COUNT,
  payload: { count }
})
