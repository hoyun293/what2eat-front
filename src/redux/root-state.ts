import { IExampleState } from './example/example-state'
import { combineReducers } from './combine-reducers'
import example from './example/example-reducer'

export const initialState: IState = {
  example: {
    news: [],
    count: 0
  } as IExampleState
}

export const rootReducers = combineReducers({
  example
})

export type IState = ReturnType<typeof rootReducers>
