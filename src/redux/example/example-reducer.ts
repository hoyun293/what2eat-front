import { SET_EXAMPLE_NEWS, INCREASE_EXAMPLE_COUNT, SELECT_EXAMPLE_NEWS } from './example-constants'
import { IExampleState } from './example-state'
import { TExampleActions } from './example-actions'

export function exampleReducer(state: IExampleState, action: TExampleActions): IExampleState {
  switch (action.type) {
    case SELECT_EXAMPLE_NEWS:
      return { ...state }
    case SET_EXAMPLE_NEWS:
      return { ...state, ...action.payload }
    case INCREASE_EXAMPLE_COUNT:
      return { ...state, count: action.payload }
  }
}
