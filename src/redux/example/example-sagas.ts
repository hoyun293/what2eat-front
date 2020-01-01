import { setExampleNews } from './example-actions'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getExampleNewsApi } from '../../api/example-api'
import { SELECT_EXMAPLE_NEWS } from './example-constants'

function* selectExampleNews() {
  const { data } = yield call(getExampleNewsApi)
  yield put(setExampleNews(data))
}

export function* exampleSagas() {
  yield all([takeLatest(SELECT_EXMAPLE_NEWS, selectExampleNews)])
}
