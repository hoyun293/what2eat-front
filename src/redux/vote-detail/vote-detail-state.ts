import { ICommonState } from '../redux-type'
import { IVoteDetail } from '../../models/vote'

export interface IVoteDetailState extends ICommonState {
  vote: IVoteDetail
  votePlaceIdsForm: Array<string>
  isVoteEnd: boolean
  isVoteDone: boolean
}
