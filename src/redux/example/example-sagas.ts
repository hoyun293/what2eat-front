import { setExampleNews } from './example-actions'
import { all, call, put, takeLatest, select, delay } from 'redux-saga/effects'
import { getExampleNewsApi } from '../../api/example-api'
import { SELECT_EXMAPLE_NEWS } from './example-constants'

function* selectExampleNews() {
  const res = yield call(getExampleNewsApi)
  console.log(res)
  yield put(setExampleNews(res.data))
}

export function* exampleSagas() {
  yield all([takeLatest(SELECT_EXMAPLE_NEWS, selectExampleNews)])
}
