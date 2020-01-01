import { IExampleState } from './example/example-state'
import { combineReducers, Reducer, AnyAction } from 'redux'
import example from './example/example-reducer'

export interface IState {
  example: IExampleState
}

export const rootReducers: Reducer<IState, AnyAction> = combineReducers<IState>({
  example
})
