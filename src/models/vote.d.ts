export interface IVote {
  voteName: string
  isMulti: boolean
  endDate: Date
  votePlaces: IPlace[]
}

interface VoteForm extends IVote {
  votePlaceIds: string[]
}

export type IVoteForm = PickPartial<VoteForm, 'voteName' | 'isMulti' | 'endDate' | 'placeIds'>
