import { ICommonState } from './../redux-type'
import { INews } from '../../models/news'

export interface IExampleState extends ICommonState {
  readonly news: INews[]
  readonly count: number
}
