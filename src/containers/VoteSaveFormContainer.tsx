import React from 'react'
import * as _ from 'lodash'

import { INews } from '../models/news.d'
import { connect } from '../redux/redux-connect'
import { getPlaceList } from '../api/google-api'

interface IOwnProps {}
interface IStateProps {
  news: INews[]
}
interface IDispatchProps {}

const VoteSaveFormContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ news }) => {
  React.useEffect(() => {
    googleFunction()
  }, [])
  const googleFunction = async () => {
    const res = await getPlaceList({
      radius: 1000,
      longitude: 37.482643,
      latitude: 126.896992,
      sortBy: 'prominence'
    })
    console.log('TCL: googleFunction -> re', res)
  }

  return <ol></ol>
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ example }) => ({
    news: example.news
  }),
  mapDispatchToProps: {},
  component: VoteSaveFormContainer
})
