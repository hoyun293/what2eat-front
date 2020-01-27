import { SET_VOTEROOM_IS_LOADING, SET_VOTEROOM_ERROR_MESSAGE, SET_VOTEROOM_FORM } from './voteRoom-constants'
import { IVoteRoomState } from './voteRoom-state'
import { TVoteActions } from './voteRoom-actions'

export default function userReducer(state: IVoteRoomState, action: TVoteActions): IVoteRoomState {
  switch (action.type) {
    case SET_VOTEROOM_FORM:
      console.log('set voteForm')
      console.log(state.voteRooms)
      console.log(action.voteForm)

      return { ...state, voteRooms: { ...state.voteRooms, ...action.voteForm } }
    case SET_VOTEROOM_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_VOTEROOM_ERROR_MESSAGE:
      return { ...state }
  }
}
