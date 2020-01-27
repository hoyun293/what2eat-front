import { ICommonState } from '../redux-type'
import { IVoteRoom } from '../../models/vote-room'

export interface IVoteRoomState extends ICommonState {
  voteRooms: IVoteRoom[]
}
