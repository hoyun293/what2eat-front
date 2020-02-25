import {
  SET_VOTE_DETAIL_VOTE,
  SET_VOTE_DETAIL_IS_LOADING,
  SET_VOTE_DETAIL_ERROR_MESSAGE,
  SET_VOTE_DETAIL_IS_VOTE_END,
  SET_VOTE_DETAIL_IS_VOTE_DONE,
  SET_VOTE_DETAIL_VOTE_PLACE_IDS_FORM,
  SET_VOTE_DETAIL_VOTE_PLACE_ID_FORM,
  DELETE_VOTE_DETAIL_VOTE_PLACE_ID_FORM
} from './vote-detail-constants'
import * as _ from 'lodash'
import moment from 'moment'

import { TAction } from '../redux-type'
import { IVoteDetail } from '../../models/vote'
import { getVote } from '../../api/vote-api'
import { postUserVotes } from '../../api/user-vote-api'

export const selectVote = (voteUrl: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setVoteDetailIsLoading(true))

  getVote(voteUrl)
    .then(({ result }) => {
      console.log(result)

      const { _id, voteName, voteEndDtm, isMultiVote, places, placeIds } = result.voteDeatil
      // const { voteName, voteEndDtm, isMultiVote } = result.voteDetail
      const userId = localStorage.getItem('account')
      const maxVote = _.max(_.map(places, v => v.voteUserIds.length))

      dispatch(
        setVoteDetailVote({
          voteId: _id,
          voteName,
          voteEndDtm,
          isMultiVote,
          votePlaces: _.map(places, v => ({
            ...v,
            photoUrl: v.photoUrl || '/assets/img/list-place-thumb-empty.svg',
            voteCount: v.voteUserIds.length,
            isAdded: v.voteUserIds.indexOf(userId) > -1,
            isMostVoted: maxVote === v.voteUserIds.length
          }))
        })
      )
      dispatch(setVoteDetailIsVoteDone(_.some(places, v => v.voteUserIds.indexOf(userId) > -1)))
      dispatch(setVoteDetailIsVoteEnd(moment().isSameOrAfter(voteEndDtm)))
      dispatch(setVoteDetailVotePlaceIdsForm(placeIds))

      dispatch(setVoteDetailIsLoading(false))
    })
    .catch(err => dispatch(setVoteDetailErrorMessage(err.message)))
}

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

export const setVoteDetailVote = (vote: IVoteDetail) =>
  ({
    type: SET_VOTE_DETAIL_VOTE,
    vote
  } as const)

export const setVoteDetailVotePlaceIdsForm = (votePlaceIdsForm: string[]) =>
  ({
    type: SET_VOTE_DETAIL_VOTE_PLACE_IDS_FORM,
    votePlaceIdsForm
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
  | TAction<typeof setVoteDetailVotePlaceIdsForm>
  | TAction<typeof setVoteDetailVotePlaceIdForm>
  | TAction<typeof deleteVoteDetailVotePlaceIdForm>
