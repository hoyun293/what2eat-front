import {
  SET_VOTE_DETAIL_IS_VOTE_DONE,
  SET_VOTE_DETAIL_IS_VOTE_END,
  SET_VOTE_DETAIL_IS_LOADING,
  SET_VOTE_DETAIL_ERROR_MESSAGE,
  SET_VOTE_DETAIL_VOTE,
  SET_VOTE_DETAIL_VOTE_PLACE_ID_FORM,
  DELETE_VOTE_DETAIL_VOTE_PLACE_ID_FORM,
  SET_VOTE_DETAIL_VOTE_PLACE_IDS_FORM,
  SET_VOTE_DETAIL_VOTE_PLACE_IDS,
  SET_VOTE_DETAIL_INIT,
  SET_VOTE_DETAIL_URL,
  SET_VOTE_DETAIL_REFETCH
} from './vote-detail-constants'
import { IVoteDetailState } from './vote-detail-state'
import { TVoteActions } from './vote-detail-actions'

export default function userReducer(state: IVoteDetailState, action: TVoteActions): IVoteDetailState {
  switch (action.type) {
    case SET_VOTE_DETAIL_VOTE:
      return { ...state, vote: { ...state.vote, ...action.vote } }
    case SET_VOTE_DETAIL_VOTE_PLACE_IDS:
      return { ...state, votePlaceIds: action.votePlaceIds }
    case SET_VOTE_DETAIL_VOTE_PLACE_IDS_FORM:
      return { ...state, votePlaceIdsForm: action.votePlaceIdsForm }
    case SET_VOTE_DETAIL_VOTE_PLACE_ID_FORM:
      const isExist = state.votePlaceIdsForm.indexOf(action.placeId) > -1
      if (isExist) return state
      const votePlaceIdsForm = action.isMultiVote
        ? [...state.votePlaceIdsForm, action.placeId]
        : [action.placeId]
      return { ...state, votePlaceIdsForm: votePlaceIdsForm }
    case DELETE_VOTE_DETAIL_VOTE_PLACE_ID_FORM:
      return { ...state, votePlaceIdsForm: state.votePlaceIdsForm.filter(v => v !== action.placeId) }
    case SET_VOTE_DETAIL_IS_VOTE_END:
      return { ...state, isVoteEnd: action.isVoteEnd }
    case SET_VOTE_DETAIL_IS_VOTE_DONE:
      return { ...state, isVoteDone: action.isVoteDone }
    case SET_VOTE_DETAIL_URL:
      return { ...state, voteUrl: action.voteUrl }
    case SET_VOTE_DETAIL_REFETCH:
      return { ...state, refetch: state.refetch + 1 }
    case SET_VOTE_DETAIL_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_VOTE_DETAIL_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage }
    case SET_VOTE_DETAIL_INIT:
      console.log(state)
      //  var newVoteDetail = Object.assign(action.voteDetail)
      // console.log(newVoteDetail)

      //return { ...state, ...newVoteDetail }
      //      console.log(action.voteDetail)
      //  return action.voteDetail
      return { ...state, ...action.voteDetail }
  }
}
