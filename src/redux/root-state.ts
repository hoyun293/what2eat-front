import { IExampleState } from './example/example-state'
import { combineReducers } from './combine-reducers'
import example from './example/example-reducer'
import user from './user/user-reducer'
import { IUserState } from './user/user-state'

export const initialState: IState = {
  example: {
    news: [],
    count: 0,
    isLoading: false,
    errorMessage: ''
  } as IExampleState,
  user: {
    userDomain: {},
    isLoading: false,
    errorMessage: ''
  } as IUserState
}

export const rootReducers = combineReducers({
  example,
  user
})

export type IState = ReturnType<typeof rootReducers>
