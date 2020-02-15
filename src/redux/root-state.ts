import { IExampleState } from './example/example-state'
import { combineReducers } from './combine-reducers'
import example from './example/example-reducer'
import user from './user/user-reducer'
import voteInsert from './vote-insert/vote-insert-reducer'
import voteRoom from './vote-room/vote-room-reducer'
import voteDetail from './vote-detail/vote-detail-reducer'
import { IUserState } from './user/user-state'
import { IVoteInsertState } from './vote-insert/vote-insert-state'
import { IVoteRoomState } from './vote-room/vote-room-state'
import { IVoteDetailState } from './vote-detail/vote-detail-state'
import moment from 'moment'

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
  voteInsert: {
    voteForm: {
      voteName: '',
      isMultiVote: false,
      voteEndDtm: moment()
        .add(7, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      votePlaces: {}
    },
    votePlaces: [],
    pagetoken: '',
    disableVotePlacesInfiniteScroll: false,
    isLoading: false,
    errorMessage: ''
  } as IVoteInsertState,
  voteRoom: {
    voteRooms: [],
    isLoading: false,
    errorMessage: ''
  } as IVoteRoomState,
  voteDetail: {
    isLoading: false,
    errorMessage: ''
  } as IVoteDetailState
}

export const rootReducers = combineReducers({
  example,
  user,
  voteInsert,
  voteRoom,
  voteDetail
})

export type IState = ReturnType<typeof rootReducers>
