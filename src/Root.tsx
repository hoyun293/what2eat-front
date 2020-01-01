import React from 'react'
import App from './App'
import { configureStore } from './redux/create-store'
import { Provider } from 'react-redux'

const { store } = configureStore()

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root
