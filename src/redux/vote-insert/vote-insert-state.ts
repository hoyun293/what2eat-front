import { IPlace } from '../../models/place'
import { ICommonState } from '../redux-type'
import { IVoteForm } from '../../models/vote'

export interface IVoteInsertState extends ICommonState {
  voteForm: IVoteForm
  votePlaces: IPlace[]
  pagetoken: string
  disableVotePlacesInfiniteScroll: boolean
}
