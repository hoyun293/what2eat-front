import { SET_EXMAPLE_NEWS, INCREASE_EXMAPLE_COUNT, SELECT_EXMAPLE_NEWS } from './example-constants'
import { IExampleState } from './example-state'
import { handleActions } from 'redux-actions'

const initialExampleState: IExampleState = {
  news: [],
  count: 0
}

export default handleActions<IExampleState>(
  {
    [SELECT_EXMAPLE_NEWS]: (state, action) => ({ ...state }),
    [SET_EXMAPLE_NEWS]: (state, action) => ({ ...state, ...action.payload }),
    [INCREASE_EXMAPLE_COUNT]: (state, action) => ({ ...state, ...action.payload })
  },
  initialExampleState
)
