import {
  SET_VOTE_DETAIL_IS_VOTE_DONE,
  SET_VOTE_DETAIL_IS_VOTE_END,
  SET_VOTE_DETAIL_IS_LOADING,
  SET_VOTE_DETAIL_ERROR_MESSAGE,
  SET_VOTE_DETAIL_VOTE,
  SET_VOTE_DETAIL_VOTE_PLACE_ID_FORM,
  DELETE_VOTE_DETAIL_VOTE_PLACE_ID_FORM
} from './vote-detail-constants'
import { IVoteDetailState } from './vote-detail-state'
import { TVoteActions } from './vote-detail-actions'

export default function userReducer(state: IVoteDetailState, action: TVoteActions): IVoteDetailState {
  switch (action.type) {
    case SET_VOTE_DETAIL_VOTE:
      return { ...state, vote: { ...state.vote, ...action.vote } }
    case SET_VOTE_DETAIL_VOTE_PLACE_ID_FORM:
      const isExist = state.votePlaceIdsForm.indexOf(action.placeId) > -1
      if (isExist) return state
      return { ...state, votePlaceIdsForm: [...state.votePlaceIdsForm, action.placeId] }
    case DELETE_VOTE_DETAIL_VOTE_PLACE_ID_FORM:
      return { ...state, votePlaceIdsForm: state.votePlaceIdsForm.filter(v => v !== action.placeId) }
    case SET_VOTE_DETAIL_IS_VOTE_END:
      return { ...state, isVoteEnd: action.isVoteEnd }
    case SET_VOTE_DETAIL_IS_VOTE_DONE:
      return { ...state, isVoteDone: action.isVoteDone }
    case SET_VOTE_DETAIL_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_VOTE_DETAIL_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage }
  }
}
