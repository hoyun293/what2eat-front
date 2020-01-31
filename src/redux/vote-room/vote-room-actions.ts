import { IVoteRoom } from '../../models/vote-room'
import { SET_VOTEROOM_FORM, SET_VOTEROOM_IS_LOADING, SET_VOTEROOM_ERROR_MESSAGE } from './vote-room-constants'
import { TAction } from '../redux-type'
import { getMyVoteRooms } from '../../api/voteRoom-api'
import { IVoteRoomState } from './vote-room-state'

export const selectVoteRooms = (limit: number = 5, orderby: boolean = true) => async (
  dispatch: React.Dispatch<any>
) => {
  dispatch(setVoteRoomIsLoading(true))
  const { result } = await getMyVoteRooms(limit, orderby)
  console.log(result)
  dispatch(setVoteRoomForm(result.rooms))
  dispatch(setVoteRoomIsLoading(false))
}
//export const signIn = () => async (dispatch: React.Dispatch<any>) => {
//  dispatch(setVoteRoomIsLoading(true))
//}

export const setVoteRoomForm = (voteRoom: IVoteRoom[]) =>
  ({
    type: SET_VOTEROOM_FORM,
    voteRoom
  } as const)

export const setVoteRoomIsLoading = (isLoading: boolean) =>
  ({
    type: SET_VOTEROOM_IS_LOADING,
    isLoading
  } as const)

export const setVoteRoomErrorMessage = (errorMessage: string) =>
  ({
    type: SET_VOTEROOM_ERROR_MESSAGE,
    errorMessage
  } as const)

export type TVoteActions =
  | TAction<typeof setVoteRoomForm>
  | TAction<typeof setVoteRoomIsLoading>
  | TAction<typeof setVoteRoomErrorMessage>
