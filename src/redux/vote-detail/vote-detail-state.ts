import { ICommonState } from '../redux-type'
import { IVote } from '../../models/vote'

export interface IVoteDetailState extends ICommonState {
  vote: IVote
  votePlaceIdsForm: string[]
  isVoteEnd: boolean
  isVoteDone: boolean
}
