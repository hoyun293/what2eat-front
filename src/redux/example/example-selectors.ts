import { createSelector } from 'reselect'
import { TRootState } from '../root-state'

export const exampleState = (state: TRootState) => state.example

export const getExampleNews = createSelector(exampleState, ({ news }) => {
  return news
})

export const getExmapleCount = createSelector(exampleState, ({ count }) => {
  return count
})
