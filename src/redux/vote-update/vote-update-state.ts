import { IVote, IVoteDetail } from '../../models/vote'
import { ICommonState } from '../redux-type'

export interface IVoteUpdateState extends ICommonState {
  vote: IVoteDetail
  votePlaceIds: Array<string>
  votePlaceIdsForm: Array<string>
  isVoteEnd: boolean
  isVoteDone: boolean
}
