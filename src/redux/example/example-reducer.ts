import {
  SET_EXAMPLE_NEWS,
  INCREASE_EXAMPLE_COUNT,
  SET_EXAMPLE_ERROR_MESSAGE,
  SET_EXAMPLE_IS_LOADING
} from './example-constants'
import { IExampleState } from './example-state'
import { TExampleActions } from './example-actions'

export default function exampleReducer(state: IExampleState, action: TExampleActions): IExampleState {
  switch (action.type) {
    case SET_EXAMPLE_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_EXAMPLE_NEWS:
      return { ...state, news: action.news }
    case SET_EXAMPLE_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage }
    case INCREASE_EXAMPLE_COUNT:
      return { ...state, count: action.payload }
  }
}
