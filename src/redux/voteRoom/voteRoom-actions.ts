import { IVote } from './../../models/vote.d'
import { SET_VOTE_FORM, SET_VOTE_IS_LOADING, SET_VOTE_ERROR_MESSAGE } from './vote-constants'
import { TAction } from '../redux-type'

export const signIn = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setVoteIsLoading(true))
}

export const setVoteForm = (voteForm: Partial<IVote>) =>
  ({
    type: SET_VOTE_FORM,
    voteForm
  } as const)

export const setVoteIsLoading = (isLoading: boolean) =>
  ({
    type: SET_VOTE_IS_LOADING,
    isLoading
  } as const)

export const setVoteErrorMessage = (errorMessage: string) =>
  ({
    type: SET_VOTE_ERROR_MESSAGE,
    errorMessage
  } as const)

export type TVoteActions =
  | TAction<typeof setVoteForm>
  | TAction<typeof setVoteIsLoading>
  | TAction<typeof setVoteErrorMessage>
