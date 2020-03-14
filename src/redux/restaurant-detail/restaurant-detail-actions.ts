import {
  SET_RESTAURANT_DETAIL_FORM,
  SET_RESTAURANT_DETAIL_LOADING,
  SET_RESTAURANT_DETAIL_MESSAGE,
  SET_RESTAURANT_DETAIL_INIT,
  SET_IS_RESTAURANT_PAGE
} from './restaurant-detail-constants'
import { TAction } from '../redux-type'
import { IRestaurantDetail } from '../../models/restaurant-detail'
import { getRestaurantDetail } from '../../api/restaurant-detail-api'
import { initialState } from '../root-state'
import { IRestaurantDetailState } from './restaurant-detail-state'

const restaurantDetailInit: IRestaurantDetailState = initialState.restaurantDetail
export const selectRestaurnatDetail = (placeId: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setRestaurantDetailIsLoading(true))
  const { result } = await getRestaurantDetail(placeId)
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

export const setRestaurantDetailInit = () =>
  ({
    type: SET_RESTAURANT_DETAIL_INIT,
    restaurantDetailInit
  } as const)

export const setIsRestaurantPage = (isRestaurantPage: boolean) =>
  ({
    type: SET_IS_RESTAURANT_PAGE,
    isRestaurantPage
  } as const)
export type TRestaurantDetailActions =
  | TAction<typeof setIsRestaurantPage>
  | TAction<typeof setRestaurantDetailForm>
  | TAction<typeof setRestaurantDetailIsLoading>
  | TAction<typeof setRestaurantDetailErrorMessage>
  | TAction<typeof setRestaurantDetailInit>
