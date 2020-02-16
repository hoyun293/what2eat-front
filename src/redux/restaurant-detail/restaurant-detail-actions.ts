import {
  SET_RESTAURANT_DETAIL_FORM,
  SET_RESTAURANT_DETAIL_LOADING,
  SET_RESTAURANT_DETAIL_MESSAGE
} from './restaurant-detail-constants'
import { TAction } from '../redux-type'
import { IRestaurantDetail } from '../../models/restaurant-detail'
import { getRestaurantDetail } from '../../api/restaurant-detail-api'

export const selectRestaurnatDetail = (placeId: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setRestaurantDetailIsLoading(true))
  const { result } = await getRestaurantDetail(placeId)
  console.log(result)
  dispatch(setRestaurantDetailForm(result['restaurantDetail']))
  dispatch(setRestaurantDetailIsLoading(false))
}

export const setRestaurantDetailForm = (restaurantDetail: IRestaurantDetail) =>
  ({
    type: SET_RESTAURANT_DETAIL_FORM,
    restaurantDetail
  } as const)

export const setRestaurantDetailIsLoading = (isLoading: boolean) =>
  ({
    type: SET_RESTAURANT_DETAIL_LOADING,
    isLoading
  } as const)

export const setRestaurantDetailErrorMessage = (errorMessage: string) =>
  ({
    type: SET_RESTAURANT_DETAIL_MESSAGE,
    errorMessage
  } as const)

export type TRestaurantDetailActions =
  | TAction<typeof setRestaurantDetailForm>
  | TAction<typeof setRestaurantDetailIsLoading>
  | TAction<typeof setRestaurantDetailErrorMessage>
