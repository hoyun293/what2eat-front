import { IExampleState } from './example/example-state'
import { combineReducers } from './combine-reducers'
import example from './example/example-reducer'
import user from './user/user-reducer'
import vote from './vote/vote-reducer'
import voteRoom from './vote-room/vote-room-reducer'
import { IUserState } from './user/user-state'
import { IVoteState } from './vote/vote-state'
import { IVoteRoomState } from './vote-room/vote-room-state'

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
      votePlaceIds: []
    },
    votePlaces: [],
    isLoading: false,
    errorMessage: ''
  } as IVoteState,
  voteRoom: {
    voteRooms: [],
    isLoading: false,
    errorMessage: ''
  } as IVoteRoomState
}

export const rootReducers = combineReducers({
  example,
  user,
  vote,
  voteRoom
})

export type IState = ReturnType<typeof rootReducers>
