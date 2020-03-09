import { IUiState } from './ui/ui-state'
import { combineReducers } from './combine-reducers'
import ui from './ui/ui-reducer'
import user from './user/user-reducer'
import voteInsert from './vote-insert/vote-insert-reducer'
import voteRoom from './vote-room/vote-room-reducer'
import voteDetail from './vote-detail/vote-detail-reducer'
import voteUpdateDetail from './vote-update/vote-update-reducer'
import restaurantDetail from './restaurant-detail/restaurant-detail-reducer'
import { IUserState } from './user/user-state'
import { IVoteInsertState } from './vote-insert/vote-insert-state'
import { IVoteRoomState } from './vote-room/vote-room-state'
import { IVoteDetailState } from './vote-detail/vote-detail-state'
import moment from 'moment'
import { IRestaurantDetailState } from './restaurant-detail/restaurant-detail-state'
import { IVoteUpdateState } from './vote-update/vote-update-state'

export const initialState: IState = {
  ui: {
    alert: {
      isOpen: false,
      title: '',
      message: ''
    },
    toast: {
      isOpen: false,
      message: '',
      duration: 2000
    },
    isLoader: false
  } as IUiState,
  user: {
    userDomain: {},
    isLogin: false,
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
    step: 1,
    votePlaces: [],
    pagetoken: '',
    disableVotePlacesInfiniteScroll: false,
    voteUrl: '',
    isLoading: false,
    errorMessage: ''
  } as IVoteInsertState,
  voteRoom: {
    voteRooms: [],
    isLoading: false,
    errorMessage: ''
  } as IVoteRoomState,
  voteDetail: {
    vote: {
      voteId: '',
      voteName: '',
      isMultiVote: false,
      voteEndDtm: '',
      votePlaces: []
    },
    votePlaceIds: [],
    votePlaceIdsForm: [],
    voteUrl: '',
    isVoteEnd: false,
    isVoteDone: false,
    refetch: 0,
    isLoading: false,
    errorMessage: ''
  } as IVoteDetailState,
  voteUpdateDetail: {
    vote: {
      voteId: '',
      voteName: '',
      isMultiVote: false,
      voteEndDtm: '',
      votePlaces: []
    },
    votePlaceIds: [],
    votePlaceIdsForm: [],
    isVoteEnd: false,
    isVoteDone: false,
    isLoading: false,
    errorMessage: ''
  } as IVoteUpdateState,
  restaurantDetail: {
    restaurantDetailInfo: {},
    isLoading: false,
    errorMessage: ''
  } as IRestaurantDetailState
}

export const rootReducers = combineReducers({
  ui,
  user,
  voteInsert,
  voteRoom,
  voteDetail,
  voteUpdateDetail,
  restaurantDetail
})

export type IState = ReturnType<typeof rootReducers>
