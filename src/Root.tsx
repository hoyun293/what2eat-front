import React, { createContext } from 'react'
import { initialState, IState, rootReducers } from './redux/root-state'
import App from './App'
import useSagaReducer from 'use-saga-reducer'
import { combineSagas } from './redux/root-saga'

export interface IRootContextState {
  state: IState
  dispatch: React.Dispatch<any>
}

export const RootContext = createContext<IRootContextState>({
  state: initialState,
  dispatch: () => undefined
})

const Root: React.FC = props => {
  const [store, dispatch] = useSagaReducer(combineSagas, rootReducers, initialState)
  return (
    <RootContext.Provider
      value={{
        state: store,
        dispatch
      }}
    >
      <App />
    </RootContext.Provider>
  )
}

export default Root
