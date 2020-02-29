import { SET_VOTEROOM_IS_LOADING, SET_VOTEROOM_ERROR_MESSAGE, SET_VOTEROOM_FORM } from './vote-room-constants'
import { IVoteRoomState } from './vote-room-state'
import { TVoteActions } from './vote-room-actions'

export default function userReducer(state: IVoteRoomState, action: TVoteActions): IVoteRoomState {
  switch (action.type) {
    case SET_VOTEROOM_FORM:
      return { ...state, voteRooms: action.voteRoom }
    case SET_VOTEROOM_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_VOTEROOM_ERROR_MESSAGE:
      return { ...state }
  }
}
