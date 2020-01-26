import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'

import { connect } from '../redux/redux-connect'
import { getAddressByCoordinate } from '../api/google-api'
import { Plugins } from '@capacitor/core'
import { IVoteForm } from '../models/vote'
import { setVoteForm } from '../redux/vote/vote-actions'

interface IOwnProps {}
interface IStateProps {
  voteForm: IVoteForm
}
interface IDispatchProps {
  setVoteForm: typeof setVoteForm
}

const VoteSaveFormFoodCartContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteForm,
  setVoteForm
}) => {
  useEffect(() => {
    getCurrentPosition()
  }, []) // eslint-disable-line

  const [address, setAddress] = useState('주소를 불러오는중...')

  const getCurrentPosition = async () => {
    const { coords } = await Plugins.Geolocation.getCurrentPosition()
    const { data }: any = await getAddressByCoordinate(coords.latitude, coords.longitude)
    setAddress(_.get(data.results, '[0].formatted_address'))
    setVoteForm({ placeIds: [address] })
  }

  return <ol>{address}</ol>
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ vote }) => ({
    voteForm: vote.voteForm
  }),
  mapDispatchToProps: {
    setVoteForm
  },
  component: VoteSaveFormFoodCartContainer
})
