import { SET_VOTE_IS_LOADING, SET_VOTE_ERROR_MESSAGE, SET_VOTE_FORM } from './vote-constants'
import { IVoteState } from './vote-state'
import { TVoteActions } from './vote-actions'

export default function userReducer(state: IVoteState, action: TVoteActions): IVoteState {
  switch (action.type) {
    case SET_VOTE_FORM:
      console.log('set voteForm')
      console.log(state.voteForm)
      console.log(action.voteForm)

      return { ...state, voteForm: { ...state.voteForm, ...action.voteForm } }
    case SET_VOTE_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_VOTE_ERROR_MESSAGE:
      return { ...state }
  }
}
