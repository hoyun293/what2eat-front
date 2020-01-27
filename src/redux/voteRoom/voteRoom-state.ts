import { ICommonState } from '../redux-type'
import { IVoteRoom } from '../../models/voteRoom'

export interface IVoteRoomState extends ICommonState {
  voteRooms: IVoteRoom[]
}
