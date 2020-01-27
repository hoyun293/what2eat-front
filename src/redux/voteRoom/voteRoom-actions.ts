import { IVoteRoom } from './../../models/voteRoom'
import { SET_VOTEROOM_FORM, SET_VOTEROOM_IS_LOADING, SET_VOTEROOM_ERROR_MESSAGE } from './voteRoom-constants'
import { TAction } from '../redux-type'

//export const signIn = () => async (dispatch: React.Dispatch<any>) => {
//  dispatch(setVoteRoomIsLoading(true))
//}

export const setVoteRoomForm = (voteForm: Partial<IVoteRoom>) =>
  ({
    type: SET_VOTEROOM_FORM,
    voteForm
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
