import { IVoteDetail } from '../../models/vote'
import {
  SET_VOTE_DETAIL_UPDATE_VOTE,
  ADD_VOTE_DETAIL_UPDATE_PLACEID,
  DELETE_VOTE_DETAIL_UPDATE_VOTE_ALL,
  SET_VOTE_DETAIL_UPDATE_VOTE_IS_LOADING,
  SET_VOTE_DETAIL_UPDATE_VOTE_ERROR_MESSAGE
} from './vote-update-constants'
import { TAction } from '../redux-type'
import { IVoteDetailPlace } from '../../models/place'
import { IPostVote } from '../vote-insert/vote-insert-payloads'
import { postVoteUpdate } from '../../api/vote-update-api'
import { setVoteDetailRefetch } from '../vote-detail/vote-detail-actions'

export const editUserVotes = (voteId: string, payload: string[]) => async (dispatch: React.Dispatch<any>) => {
}
export const editVoteDetail = (vote: IPostVote, voteUrl: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setVoteDetailUpdateIsLoading(true))

  postVoteUpdate(vote, voteUrl)
    .then(({ result }) => {
      dispatch(setVoteDetailRefetch())
    })
    .catch(err => {
      var errMessage: string = err.response.data
      var tempStr = errMessage.substr(17)
      var errMsg = tempStr.substr(0, tempStr.length - 2)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      dispatch(setVoteDetailUpdateErrorMessage(errMsg))
    })
    .finally(() => {
      dispatch(setVoteDetailUpdateIsLoading(false))
      console.log('isLoading done')
    })
}
export const setVoteDetailUpdateVote = (vote: Partial<IVoteDetail>) =>
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

export const setVoteDetailUpdateIsLoading = (isLoading: boolean) =>
  ({
    type: SET_VOTE_DETAIL_UPDATE_VOTE_IS_LOADING,
    isLoading
  } as const)

export const setVoteDetailUpdateErrorMessage = (errorMessage: string) =>
  ({
    type: SET_VOTE_DETAIL_UPDATE_VOTE_ERROR_MESSAGE,
    errorMessage
  } as const)
export type IVoteUpdateActions =
  | TAction<typeof setVoteDetailUpdateVote>
  | TAction<typeof addVoteDetailUpdatePlaceId>
  | TAction<typeof deleteVoteDetailUpdateVote>
  | TAction<typeof setVoteDetailUpdateIsLoading>
  | TAction<typeof setVoteDetailUpdateErrorMessage>
