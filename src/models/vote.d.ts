export interface IVote {
  voteName: string
  isMulti: boolean
  endDate: Date
  places: IPlace[]
}

interface VoteForm extends IVote {
  placeIds: string[]
}

export type IVoteForm = PickPartial<VoteForm, 'voteName' | 'isMulti' | 'endDate' | 'placeIds'>
