import { IPlace } from './place'

export interface IVote {
  voteName: string
  isMulti: boolean
  endDate: string
  votePlaces: IPlace[]
}

export interface IVoteForm extends IVote {
  votePlaces: {
    [key: string]: IPlace
  }
}
