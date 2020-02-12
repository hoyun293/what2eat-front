export interface IGetVotePlaces {
  latitude: number
  longitude: number
  rankby: 'prominence' | 'distance' | any
  radius: number
  pagetoken?: string
}

export interface IPostVote {
  voteName: string
  voteEndDtm: string // YYYY-MM-DD HH:mm:ss
  isMultiVote: boolean
  placeIds: string[]
}
