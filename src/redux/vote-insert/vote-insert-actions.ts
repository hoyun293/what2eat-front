import { IGetVotePlaces, IPostVote } from './vote-insert-payloads'
import { IVoteForm } from '../../models/vote'
import {
  SET_VOTE_INSERT_FORM,
  SET_VOTE_INSERT_IS_LOADING,
  SET_VOTE_INSERT_ERROR_MESSAGE,
  SET_VOTE_INSERT_PLACES,
  SET_VOTE_INSERT_PAGETOKEN,
  DELETE_VOTE_INSERT_FORM_PLACE_ID,
  SET_VOTE_INSERT_FORM_PLACE_ID,
  SET_DISABLE_VOTE_PLACES_INFINITE_SCROLL,
  SET_VOTE_INSERT_VOTE_URL,
  SET_VOTE_INSERT_STEP
} from './vote-insert-constants'
import { TAction } from '../redux-type'
import { getVotePlaces, postVote } from '../../api/vote-api'
import { IPlace } from '../../models/place'

export const insertVote = (payload: IPostVote) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setVoteInsertIsLoading(true))

  postVote(payload)
    .then(({ result }) => {
      dispatch(setVoteInsertVoteUrl(result.voteUrl))
      dispatch(setVoteInsertStep(3))
      dispatch(setVoteInsertIsLoading(false))
    })
    .catch(err => dispatch(setVoteInsertErrorMessage(err.message)))
}

export const changeStep = (step: number) => (dispatch: React.Dispatch<any>) => {
  dispatch(setVoteInsertStep(step))
}
export const selectVotePlaces = (payload: IGetVotePlaces) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setVoteInsertIsLoading(true))
  getVotePlaces(payload)
    .then(({ result }) => {
      dispatch(setVoteInsertPlaces(result.restaurants, !payload.pagetoken))
      dispatch(setVoteInsertPagetoken(result.nextPageToken))

      if (result.restaurants.length > 0) {
        dispatch(setDisableVotePlacesInfiniteScroll(result.restaurants.length < 20))
      } else {
        dispatch(setDisableVotePlacesInfiniteScroll(true))
      }
    })
    .catch(err => dispatch(setVoteInsertErrorMessage(err.message)))
}

export const setVoteInsertPagetoken = (pagetoken: string) =>
  ({
    type: SET_VOTE_INSERT_PAGETOKEN,
    pagetoken
  } as const)

export const setVoteInsertForm = (voteForm: Partial<IVoteForm>) =>
  ({
    type: SET_VOTE_INSERT_FORM,
    voteForm
  } as const)

export const setVoteInsertPlace = (votePlace: IPlace) =>
  ({
    type: SET_VOTE_INSERT_FORM_PLACE_ID,
    votePlace
  } as const)

export const deleteVoteInsertPlace = (votePlace: IPlace) =>
  ({
    type: DELETE_VOTE_INSERT_FORM_PLACE_ID,
    votePlace
  } as const)

export const setVoteInsertPlaces = (votePlaces: IPlace[], reset: boolean = true) =>
  ({
    type: SET_VOTE_INSERT_PLACES,
    votePlaces,
    reset
  } as const)

export const setDisableVotePlacesInfiniteScroll = (disableVotePlacesInfiniteScroll: boolean) =>
  ({
    type: SET_DISABLE_VOTE_PLACES_INFINITE_SCROLL,
    disableVotePlacesInfiniteScroll
  } as const)

export const setVoteInsertVoteUrl = (voteUrl: string) =>
  ({
    type: SET_VOTE_INSERT_VOTE_URL,
    voteUrl
  } as const)

export const setVoteInsertStep = (step: number) =>
  ({
    type: SET_VOTE_INSERT_STEP,
    step
  } as const)

export const setVoteInsertIsLoading = (isLoading: boolean) =>
  ({
    type: SET_VOTE_INSERT_IS_LOADING,
    isLoading
  } as const)

export const setVoteInsertErrorMessage = (errorMessage: string) =>
  ({
    type: SET_VOTE_INSERT_ERROR_MESSAGE,
    errorMessage
  } as const)

export type TVoteActions =
  | TAction<typeof setVoteInsertForm>
  | TAction<typeof setVoteInsertPlaces>
  | TAction<typeof setVoteInsertPagetoken>
  | TAction<typeof setVoteInsertIsLoading>
  | TAction<typeof setVoteInsertErrorMessage>
  | TAction<typeof setVoteInsertPlace>
  | TAction<typeof setDisableVotePlacesInfiniteScroll>
  | TAction<typeof deleteVoteInsertPlace>
  | TAction<typeof setVoteInsertVoteUrl>
  | TAction<typeof setVoteInsertStep>
