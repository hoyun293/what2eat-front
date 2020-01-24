import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'

import { INews } from '../models/news.d'
import { connect } from '../redux/redux-connect'
import { getAddressByCoordinate } from '../api/google-api'
import { Plugins } from '@capacitor/core'

interface IOwnProps {}
interface IStateProps {
  news: INews[]
}
interface IDispatchProps {}

const VoteSaveFormFoodCartContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ news }) => {
  useEffect(() => {
    getCurrentPosition()
  }, [])

  const [address, setAddress] = useState('')

  const getCurrentPosition = async () => {
    const { coords } = await Plugins.Geolocation.getCurrentPosition()
    const { data }: any = await getAddressByCoordinate(coords.latitude, coords.longitude)
    setAddress(_.get(data.results, '[0].formatted_address'))
  }

  return <ol>{address}</ol>
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ example }) => ({
    news: example.news
  }),
  mapDispatchToProps: {},
  component: VoteSaveFormFoodCartContainer
})
