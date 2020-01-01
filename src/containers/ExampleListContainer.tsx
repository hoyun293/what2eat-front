import * as React from 'react'
import * as _ from 'lodash'

import { INews } from '../models/news.d'
import ExampleListItem from '../components/ExampleListItem'
import { connect } from '../redux/redux-connect'

interface IOwnProps {}
interface IStateProps {
  readonly news: INews[]
}
interface IDispatchProps {}

const ExampleListContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ news }) => {
  return (
    <ol>
      {_.map(news, (v, i) => (
        <ExampleListItem key={i} title={v.title} user={v.user} />
      ))}
    </ol>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ example }) => ({
    news: example.news
  }),
  mapDispatchToProps: {},
  component: ExampleListContainer
})
