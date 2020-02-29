import { IVote, IVoteDetail } from '../../models/vote'
import {
  SET_VOTE_DETAIL_UPDATE_VOTE,
  ADD_VOTE_DETAIL_UPDATE_PLACEID,
  DELETE_VOTE_DETAIL_UPDATE_VOTE_ALL
} from './vote-update-constants'
import { TAction } from '../redux-type'
import { IVoteDetailPlace } from '../../models/place'

export const editUserVotes = (voteId: string, payload: string[]) => async (dispatch: React.Dispatch<any>) => {
  //dispatch()
}
export const editVoteDetail = (vote: IVote) => async (dispatch: React.Dispatch<any>) => {
  //dispatch(setVoteDetailUpdate(vote))
}
export const setVoteDetailUpdateVote = (vote: IVoteDetail) =>
  ({
    type: SET_VOTE_DETAIL_UPDATE_VOTE,
    vote
  } as const)
export const deleteVoteDetailUpdateVote = () =>
  ({
    type: DELETE_VOTE_DETAIL_UPDATE_VOTE_ALL
  } as const)
export const addVoteDetailUpdatePlaceId = (payload: IVoteDetailPlace) =>
  ({
    type: ADD_VOTE_DETAIL_UPDATE_PLACEID,
    payload
  } as const)
export type IVoteUpdateActions =
  | TAction<typeof setVoteDetailUpdateVote>
  | TAction<typeof addVoteDetailUpdatePlaceId>
  | TAction<typeof deleteVoteDetailUpdateVote>
