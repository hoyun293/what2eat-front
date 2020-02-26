import { IVote } from '../../models/vote'
import { ICommonState } from '../redux-type'

export interface IVoteUpdateState extends ICommonState {
  vote: IVote
}
