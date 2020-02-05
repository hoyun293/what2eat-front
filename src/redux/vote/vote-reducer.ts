import {
  SET_VOTE_IS_LOADING,
  SET_VOTE_ERROR_MESSAGE,
  SET_VOTE_FORM,
  SET_VOTE_PLACES,
  SET_VOTE_FORM_PLACE_ID,
  DELETE_VOTE_FORM_PLACE_ID
} from './vote-constants'
import { IVoteState } from './vote-state'
import { TVoteActions } from './vote-actions'

export default function userReducer(state: IVoteState, action: TVoteActions): IVoteState {
  const voteForm = state.voteForm || {}

  switch (action.type) {
    case SET_VOTE_FORM:
      return { ...state, voteForm: { ...state.voteForm, ...action.voteForm } }
    case SET_VOTE_FORM_PLACE_ID:
      return {
        ...state,
        voteForm: {
          ...state.voteForm,
          votePlaces: { ...voteForm.votePlaces, [action.votePlace.placeId]: action.votePlace }
        }
      }
    case DELETE_VOTE_FORM_PLACE_ID:
      const newFormPlaces = { ...voteForm.votePlaces }
      delete newFormPlaces[action.votePlace.placeId]
      return { ...state, voteForm: { ...state.voteForm, votePlaces: newFormPlaces } }
    case SET_VOTE_PLACES:
      return {
        ...state,
        votePlaces: action.reset ? action.votePlaces : [...state.votePlaces, ...action.votePlaces]
      }
    case SET_VOTE_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_VOTE_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage }
  }
}
