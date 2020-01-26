import { IExampleState } from './example/example-state'
import { combineReducers } from './combine-reducers'
import example from './example/example-reducer'
import user from './user/user-reducer'
import vote from './vote/vote-reducer'
import { IUserState } from './user/user-state'
import { IVoteState } from './vote/vote-state'

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
  } as IUserState,
  vote: {
    voteForm: {
      voteName: '',
      placeIds: []
    },
    places: [],
    isLoading: false,
    errorMessage: ''
  } as IVoteState
}

export const rootReducers = combineReducers({
  example,
  user,
  vote
})

export type IState = ReturnType<typeof rootReducers>
