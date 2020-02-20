import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'

import { connect } from '../redux/redux-connect'
import IconUi from '../components/ui/IconUi'
import { IonModal, IonPopover } from '@ionic/react'
import VotePlaceItem from '../components/VotePlaceItem'

import './VoteDetailPlaceListContainer.scss'

interface IOwnProps {
  themeNum: number
}
interface IStateProps {}
interface IDispatchProps {}

const VoteDetailPlaceListContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ themeNum }) => {
  const [isShowModal, setIsShowModal] = useState(false)

  useEffect(() => {}, []) // eslint-disable-line

  return (
    <div className='vote-detail-place-list-container flex move-up'>
      <div className='vote-detail-place-list-container__handle'></div>
    </div>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({}) => ({}),
  mapDispatchToProps: {},
  component: VoteDetailPlaceListContainer
})
