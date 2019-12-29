import { SET_EXMAPLE_NEWS, INCREASE_EXMAPLE_COUNT } from './example-constants'
import { IExampleState } from './example-state'
import { TExampleActions } from './example-actions'

export function exampleReducer(state: IExampleState, action: TExampleActions): IExampleState {
  switch (action.type) {
    case SET_EXMAPLE_NEWS:
      return { ...state, ...action.payload }
    case INCREASE_EXMAPLE_COUNT:
      return { ...state, count: action.payload }
  }
}
