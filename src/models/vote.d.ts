export interface IVote {
  voteName: string
  isMulti: boolean
  endDate: Date
  votePlaces: IPlace[]
}

interface VoteForm extends IVote {
  placeIds: {
    [key: string]: string
  }
}

export type IVoteForm = PickPartial<VoteForm, 'voteName' | 'isMulti' | 'endDate' | 'placeIds'>
