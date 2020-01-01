import React, { useEffect } from 'react'
import * as _ from 'lodash'

import { INews } from '../models/news.d'
import ExampleListItem from '../components/ExampleListItem'
import { connect } from 'react-redux'
import { selectExampleNews } from '../redux/example/example-actions'
import { IState } from '../redux/root-state'

interface IOwnProps {}
interface IStateProps {
  readonly news: INews[]
}
interface IDispatchProps {
  selectExampleNews: typeof selectExampleNews
}

const ExampleListContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  news,
  selectExampleNews
}) => {
  useEffect(() => {
    console.log('TCL: selectExampleNews', selectExampleNews)
    selectExampleNews()
    // eslint-disable-next-line
  }, [])

  console.log(news)

  return (
    <ol>
      {_.map(news, (v, i) => (
        <ExampleListItem key={i} title={v.title} user={v.user} />
      ))}
    </ol>
  )
}

const mapStateToProps = ({ example }: IState) => ({
  news: example.news
})

// TODO: any 고칠것!!
const mapDispatchToProps = (dispatch: any) => ({
  selectExampleNews: () => dispatch(selectExampleNews())
})

export default connect(mapStateToProps, mapDispatchToProps)(ExampleListContainer)
