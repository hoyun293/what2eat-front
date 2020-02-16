export interface IRestaurantDetail {
  name: string
  lat: number
  lng: number
  temp: IRestaurantDetail
  rating: number
  formattedAddress: string
  formattedPhoneNumber: string
  photoUrl: string
  userPhotoUrl: string[]
  userRatingsTotal: number

  // isOpen: boolean
  // closeTime: string
}
