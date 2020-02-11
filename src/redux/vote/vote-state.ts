import { IPlace } from './../../models/place.d'
import { ICommonState } from './../redux-type'
import { IVoteForm } from '../../models/vote'

export interface IVoteState extends ICommonState {
  voteForm: IVoteForm
  votePlaces: IPlace[]
  pagetoken: string
  disableVotePlacesInfiniteScroll: boolean
}
