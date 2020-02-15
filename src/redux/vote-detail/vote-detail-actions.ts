import { SET_VOTE_DETAIL_IS_LOADING, SET_VOTE_DETAIL_ERROR_MESSAGE } from './vote-detail-constants'
import { TAction } from '../redux-type'

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

export type TVoteActions = TAction<typeof setVoteDetailIsLoading> | TAction<typeof setVoteDetailErrorMessage>
