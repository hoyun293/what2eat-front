import { ICommonState } from './../redux-type'
import { IVote } from '../../models/vote'

export interface IVoteState extends ICommonState {
  voteForm: IVote
}
