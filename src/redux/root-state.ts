import { combineReducers } from './combine-reducers'
import { exampleReducer } from './example/example-reducer'

export const initialState: TRootState = {
  example: {
    news: [
      {
        title: '안녕!!',
        content: '내용입니다!'
      },
      {
        title: '안뇽!!!!',
        content: '내용입니다!'
      },
      {
        title: '안냥!!',
        content: '내용입니다!'
      }
    ],
    count: 0
  }
}

export const rootReducers = combineReducers({
  example: exampleReducer
})

export type TRootState = ReturnType<typeof rootReducers>
