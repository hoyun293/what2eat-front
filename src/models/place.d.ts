export interface IPlace {
  placeId: string
  name: string
  rating: number
  userRatingsTotal: number
  photoUrl: string
  lat: number
  lng: number
}

export interface IVoteDetailPlace extends IPlace {
  voteUserIds: string[]
  voteCount: number
  isAdded: boolean
  isMostVoted: boolean
}
