import { exampleSagas } from './example/example-sagas'
import { all } from 'redux-saga/effects'

export function* combineSagas() {
  yield all([...exampleSagas])
}
