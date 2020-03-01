import {
  SET_VOTE_INSERT_IS_LOADING,
  SET_VOTE_INSERT_ERROR_MESSAGE,
  SET_VOTE_INSERT_FORM,
  SET_VOTE_INSERT_PLACES,
  SET_VOTE_INSERT_PAGETOKEN,
  SET_DISABLE_VOTE_PLACES_INFINITE_SCROLL,
  SET_VOTE_INSERT_FORM_PLACE_ID,
  DELETE_VOTE_INSERT_FORM_PLACE_ID,
  SET_VOTE_INSERT_VOTE_URL,
  SET_VOTE_INSERT_STEP,
  DELETE_VOTE_INSERT_FORM_ALL,
  SET_VOTE_INSERT_INIT
} from './vote-insert-constants'
import { IVoteInsertState } from './vote-insert-state'
import { TVoteActions } from './vote-insert-actions'

export default function userReducer(state: IVoteInsertState, action: TVoteActions): IVoteInsertState {
  const voteForm = state.voteForm || {}

  switch (action.type) {
    case SET_VOTE_INSERT_FORM:
      return { ...state, voteForm: { ...state.voteForm, ...action.voteForm } }
    case SET_VOTE_INSERT_FORM_PLACE_ID:
      return {
        ...state,
        voteForm: {
          ...state.voteForm,
          votePlaces: { ...voteForm.votePlaces, [action.votePlace.placeId]: action.votePlace }
        }
      }
    case SET_VOTE_INSERT_PAGETOKEN:
      return { ...state, pagetoken: action.pagetoken }
    case DELETE_VOTE_INSERT_FORM_PLACE_ID:
      const newFormPlaces = { ...voteForm.votePlaces }
      delete newFormPlaces[action.votePlace.placeId]
      return { ...state, voteForm: { ...state.voteForm, votePlaces: newFormPlaces } }
    case DELETE_VOTE_INSERT_FORM_ALL:
      const blankObj = {}
      return { ...state, voteForm: { ...state.voteForm, votePlaces: blankObj } }
    case SET_VOTE_INSERT_PLACES:
      return {
        ...state,
        votePlaces: action.reset ? action.votePlaces : [...state.votePlaces, ...action.votePlaces]
      }
    case SET_DISABLE_VOTE_PLACES_INFINITE_SCROLL:
      return {
        ...state,
        disableVotePlacesInfiniteScroll: action.disableVotePlacesInfiniteScroll
      }
    case SET_VOTE_INSERT_VOTE_URL:
      return { ...state, voteUrl: action.voteUrl }
    case SET_VOTE_INSERT_STEP:
      return { ...state, step: action.step }
    case SET_VOTE_INSERT_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_VOTE_INSERT_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage }
    case SET_VOTE_INSERT_INIT:
      return { ...action.voteInsert }
  }
}
