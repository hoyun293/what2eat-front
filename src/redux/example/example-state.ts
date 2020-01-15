import { ICommonState } from './../redux-type'
import { INews } from '../../models/news'

export interface IExampleState extends ICommonState {
  news: INews[]
  count: number
}
