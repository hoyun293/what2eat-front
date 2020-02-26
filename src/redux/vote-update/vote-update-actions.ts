import { IVote } from '../../models/vote'
import { SET_VOTE_DETAIL_UPDATE } from './vote-update-constants'
import { TAction } from '../redux-type'

export const editUserVotes = (voteId: string, payload: string[]) => async (dispatch: React.Dispatch<any>) => {
  //dispatch()
}

export const editVoteDetail = (vote: IVote) => async (dispatch: React.Dispatch<any>) => {
  console.log('edit')

  dispatch(setVoteDetailUpdate(vote))
}

export const setVoteDetailUpdate = (vote: IVote) => ({
  type: SET_VOTE_DETAIL_UPDATE,
  vote
})

export type IVoteUpdateActions = TAction<typeof setVoteDetailUpdate>
