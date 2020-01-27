import { IExampleState } from './example/example-state'
import { combineReducers } from './combine-reducers'
import example from './example/example-reducer'
import user from './user/user-reducer'
import vote from './vote/vote-reducer'
import voteRoom from './voteRoom/voteRoom-reducer'
import { IUserState } from './user/user-state'
import { IVoteState } from './vote/vote-state'
import { IVoteRoomState } from './voteRoom/voteRoom-state'

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
  } as IVoteState,
  voteRoom: {
    voteRoom: {
      vote_room_key: 0,
      vote_room_title: '',
      vote_room_status: true,
      is_private_status: false
    },
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
