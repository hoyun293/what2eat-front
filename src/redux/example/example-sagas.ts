import { setExampleNews } from './example-actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getExampleNewsApi } from '../../api/example-api'
import { SELECT_EXAMPLE_NEWS } from './example-constants'

function* selectExampleNews() {
  const { data } = yield call(getExampleNewsApi)
  yield put(setExampleNews({ news: data }))
}

export const exampleSagas = [takeLatest(SELECT_EXAMPLE_NEWS, selectExampleNews)]
