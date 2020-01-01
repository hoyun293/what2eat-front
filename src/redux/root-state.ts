import { combineReducers } from './combine-reducers'
import { exampleReducer } from './example/example-reducer'

export const initialState: TRootState = {
  example: {
    news: [],
    count: 0
  }
}

export const rootReducers = combineReducers({
  example: exampleReducer
})

export type TRootState = ReturnType<typeof rootReducers>
