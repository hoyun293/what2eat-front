import { INews } from '../../models/news'

export interface IExampleState {
  readonly news: INews[]
  readonly count: number
}
