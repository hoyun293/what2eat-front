import { IVoteUpdateState } from './vote-update-state'
import { IVoteUpdateActions } from './vote-update-actions'
import { SET_VOTE_DETAIL_UPDATE } from './vote-update-constants'

export default function useReducer(state: IVoteUpdateState, action: IVoteUpdateActions): IVoteUpdateState {
  switch (action.type) {
    case SET_VOTE_DETAIL_UPDATE:
      console.log('reducer')
      return { ...state, vote: action.vote }
    default:
      return state
  }
}
