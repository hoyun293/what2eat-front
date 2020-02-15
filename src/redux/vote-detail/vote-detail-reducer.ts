import { SET_VOTE_DETAIL_IS_LOADING, SET_VOTE_DETAIL_ERROR_MESSAGE } from './vote-detail-constants'
import { IVoteDetailState } from './vote-detail-state'
import { TVoteActions } from './vote-detail-actions'

export default function userReducer(state: IVoteDetailState, action: TVoteActions): IVoteDetailState {
  switch (action.type) {
    case SET_VOTE_DETAIL_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_VOTE_DETAIL_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage }
  }
}
