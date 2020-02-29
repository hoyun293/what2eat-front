import { IVoteUpdateState } from './vote-update-state'
import { IVoteUpdateActions } from './vote-update-actions'
import {
  SET_VOTE_DETAIL_UPDATE_VOTE,
  ADD_VOTE_DETAIL_UPDATE_PLACEID,
  DELETE_VOTE_DETAIL_UPDATE_VOTE_ALL
} from './vote-update-constants'
import { IVoteDetailPlace } from '../../models/place'

export default function useReducer(state: IVoteUpdateState, action: IVoteUpdateActions): IVoteUpdateState {
  switch (action.type) {
    case SET_VOTE_DETAIL_UPDATE_VOTE:
      return { ...state, vote: { ...state.vote, ...action.vote } }
    case ADD_VOTE_DETAIL_UPDATE_PLACEID:
      var newVotePlaces = Array.from(state.vote.votePlaces)
      newVotePlaces.push(action.payload)
      return { ...state, vote: { ...state.vote, votePlaces: newVotePlaces } }
    case DELETE_VOTE_DETAIL_UPDATE_VOTE_ALL:
      var blankObj: IVoteDetailPlace[] = []
      return { ...state, vote: { ...state.vote, votePlaces: blankObj } }

    default:
      return state
  }
}
