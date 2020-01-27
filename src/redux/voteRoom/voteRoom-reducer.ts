import { SET_VOTE_IS_LOADING, SET_VOTE_ERROR_MESSAGE, SET_VOTE_FORM } from './voteRoom-constants'
import { IVoteRoomState } from './voteRoom-state'
import { TVoteActions } from './voteRoom-actions'

export default function userReducer(state: IVoteRoomState, action: TVoteActions): IVoteRoomState {
  switch (action.type) {
    case SET_VOTE_FORM:
      console.log('set voteForm')
      console.log(state.voteRoom)
      console.log(action.voteForm)

      return { ...state, voteRoom: { ...state.voteRoom, ...action.voteForm } }
    case SET_VOTE_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_VOTE_ERROR_MESSAGE:
      return { ...state }
  }
}
