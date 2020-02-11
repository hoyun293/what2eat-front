export interface IGetVotePlaces {
  latitude: number
  longitude: number
  rankby: 'prominence' | 'distance' | any
  radius: number
  pagetoken?: string
}
