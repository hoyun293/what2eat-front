export {}
// import { createStore, applyMiddleware, Middleware } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import * as _ from 'lodash'

// import rootReducer from './root-reducer'
// import allSagas from './root-saga'

// const sagaMiddleware = createSagaMiddleware()

// const bindMiddleware = (middlewares: Middleware[]) => {
//   // TODO : 환경변수 셋팅 후 마무리
//   // if (process.env.NODE_ENV !== 'production') {
//   const { composeWithDevTools } = require('redux-devtools-extension') // eslint-disable-line @typescript-eslint/no-var-requires
//   return composeWithDevTools(applyMiddleware(...middlewares))
//   // }
//   // return applyMiddleware(...middlewares)
// }

// export function configureStore() {
//   const middlewares: Middleware[] = [sagaMiddleware]

//   const store = createStore(rootReducer, bindMiddleware(middlewares))

//   _.each(allSagas, (saga: any) => sagaMiddleware.run(saga))

//   return { store }
// }
