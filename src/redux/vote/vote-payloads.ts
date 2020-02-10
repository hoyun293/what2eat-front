export interface IGetVotePlaces {
  latitude: number
  longitude: number
  sortBy: 'prominence' | 'distance' | any
  distance: number
  nextpagetoken?: string
}
