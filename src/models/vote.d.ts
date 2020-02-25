import { IPlace, IVoteDetailPlace } from './place'

export interface IVote {
  voteName: string
  isMultiVote: boolean
  voteEndDtm: string
  votePlaces: IPlace[]
}

export interface IVoteForm extends IVote {
  votePlaces: {
    [key: string]: IPlace
  }
}

export interface IVoteDetail extends IVote {
  voteId: string
  votePlaces: IVoteDetailPlace[]
}
