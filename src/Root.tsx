import React, { createContext, useReducer } from 'react'
import { initialState, IState, rootReducers } from './redux/root-state'
import App from './App'

export interface IRootContextState {
  state: IState
  dispatch: React.Dispatch<any>
}

export const RootContext = createContext<IRootContextState>({
  state: initialState,
  dispatch: () => undefined
})

const Root: React.FC = props => {
  const [store, dispatch] = useReducer(rootReducers, initialState)

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
