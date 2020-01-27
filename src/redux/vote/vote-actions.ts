import { IVoteForm } from './../../models/vote.d'
import { SET_VOTE_FORM, SET_VOTE_IS_LOADING, SET_VOTE_ERROR_MESSAGE, SET_VOTE_PLACES } from './vote-constants'
import { TAction } from '../redux-type'
import { getVotePlaces, postVote } from '../../api/vote-api'
import { IPlace } from '../../models/place'

export const insertVote = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setVoteIsLoading(true))

  postVote({})
    .then(() => {
      dispatch(setVoteIsLoading(false))
    })
    .catch(err => dispatch(setVoteErrorMessage(err.message)))
}

export const selectVotePlaces = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setVoteIsLoading(true))
  getVotePlaces({})
    .then(({ result }) => {
      dispatch(setVotePlaces(result.places))
      dispatch(setVoteIsLoading(false))
    })
    .catch(err => dispatch(setVoteErrorMessage(err.message)))
}

export const setVoteForm = (voteForm: IVoteForm) =>
  ({
    type: SET_VOTE_FORM,
    voteForm
  } as const)

export const setVotePlaces = (votePlaces: IPlace[]) =>
  ({
    type: SET_VOTE_PLACES,
    votePlaces
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
  | TAction<typeof setVotePlaces>
  | TAction<typeof setVoteIsLoading>
  | TAction<typeof setVoteErrorMessage>
