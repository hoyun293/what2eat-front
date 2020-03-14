import {
  SET_RESTAURANT_DETAIL_LOADING,
  SET_RESTAURANT_DETAIL_MESSAGE,
  SET_RESTAURANT_DETAIL_FORM,
  SET_RESTAURANT_DETAIL_INIT,
  SET_IS_RESTAURANT_PAGE
} from './restaurant-detail-constants'
import { TRestaurantDetailActions } from './restaurant-detail-actions'
import { IRestaurantDetailState } from './restaurant-detail-state'

export default function userReducer(
  state: IRestaurantDetailState,
  action: TRestaurantDetailActions
): IRestaurantDetailState {
  switch (action.type) {
    case SET_RESTAURANT_DETAIL_FORM:
      return { ...state, restaurantDetailInfo: action.restaurantDetail }
    case SET_RESTAURANT_DETAIL_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_RESTAURANT_DETAIL_MESSAGE:
      return { ...state }
    case SET_RESTAURANT_DETAIL_INIT:
      return { ...action.restaurantDetailInit }
    case SET_IS_RESTAURANT_PAGE:
      return { ...state, isVoteUpdatePage: action.isRestaurantPage }
    default:
      return { ...state }
  }
}
