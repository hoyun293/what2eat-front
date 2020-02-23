import {
  SET_VOTE_DETAIL_VOTE,
  SET_VOTE_DETAIL_IS_LOADING,
  SET_VOTE_DETAIL_ERROR_MESSAGE,
  SET_VOTE_DETAIL_IS_VOTE_END,
  SET_VOTE_DETAIL_IS_VOTE_DONE,
  SET_VOTE_DETAIL_VOTE_PLACE_ID_FORM,
  DELETE_VOTE_DETAIL_VOTE_PLACE_ID_FORM
} from './vote-detail-constants'
import { TAction } from '../redux-type'
import { IVote } from '../../models/vote'
import { postUserVotes } from '../../api/user-vote-api'

export const insertUserVotes = (voteId: string, payload: string[]) => async (
  dispatch: React.Dispatch<any>
) => {
  dispatch(setVoteDetailIsLoading(true))

  postUserVotes(voteId, payload)
    .then(() => {
      dispatch(setVoteDetailIsLoading(false))
    })
    .catch(err => dispatch(setVoteDetailErrorMessage(err.message)))
}

export const setVoteDetailVote = (vote: Partial<IVote>) =>
  ({
    type: SET_VOTE_DETAIL_VOTE,
    vote
  } as const)

export const setVoteDetailVotePlaceIdForm = (placeId: string) =>
  ({
    type: SET_VOTE_DETAIL_VOTE_PLACE_ID_FORM,
    placeId
  } as const)

export const deleteVoteDetailVotePlaceIdForm = (placeId: string) =>
  ({
    type: DELETE_VOTE_DETAIL_VOTE_PLACE_ID_FORM,
    placeId
  } as const)

export const setVoteDetailIsVoteEnd = (isVoteEnd: boolean) =>
  ({
    type: SET_VOTE_DETAIL_IS_VOTE_END,
    isVoteEnd
  } as const)

export const setVoteDetailIsVoteDone = (isVoteDone: boolean) =>
  ({
    type: SET_VOTE_DETAIL_IS_VOTE_DONE,
    isVoteDone
  } as const)

export const setVoteDetailIsLoading = (isLoading: boolean) =>
  ({
    type: SET_VOTE_DETAIL_IS_LOADING,
    isLoading
  } as const)

export const setVoteDetailErrorMessage = (errorMessage: string) =>
  ({
    type: SET_VOTE_DETAIL_ERROR_MESSAGE,
    errorMessage
  } as const)

export type TVoteActions =
  | TAction<typeof setVoteDetailIsLoading>
  | TAction<typeof setVoteDetailErrorMessage>
  | TAction<typeof setVoteDetailIsVoteDone>
  | TAction<typeof setVoteDetailIsVoteEnd>
  | TAction<typeof setVoteDetailVote>
  | TAction<typeof setVoteDetailVotePlaceIdForm>
  | TAction<typeof deleteVoteDetailVotePlaceIdForm>
