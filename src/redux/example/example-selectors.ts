import { createSelector } from 'reselect'
import { IState } from '../root-state'

export const exampleState = (state: IState) => state.example

export const getExampleNews = createSelector(exampleState, ({ news }) => {
  return news
})

export const getExmapleCount = createSelector(exampleState, ({ count }) => {
  return count
})
