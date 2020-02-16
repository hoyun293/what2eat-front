import { ICommonState } from '../redux-type'
import { IRestaurantDetail } from '../../models/restaurant-detail'

export interface IRestaurantDetailState extends ICommonState {
  restaurantDetailInfo: IRestaurantDetail
}
