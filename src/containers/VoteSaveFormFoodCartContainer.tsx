import * as React from 'react'
import * as _ from 'lodash'

import { INews } from '../models/news.d'
import { connect } from '../redux/redux-connect'

interface IOwnProps {}
interface IStateProps {
  readonly news: INews[]
}
interface IDispatchProps {}

const VoteSaveFormFoodCartContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ news }) => {
  return <ol></ol>
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ example }) => ({
    news: example.news
  }),
  mapDispatchToProps: {},
  component: VoteSaveFormFoodCartContainer
})
