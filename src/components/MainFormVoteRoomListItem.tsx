import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { IonImg, IonRippleEffect } from '@ionic/react'

import './MainFormVoteRoomListItem.scss'

interface IMainFromVoteRoomListItemProps {
  voteRoomTitle: string
  voteRoomStatus: boolean
  isPrivateStatus: boolean
  voteUrl: string
}

const getClassNameByStatus = (voteRoomStatus: boolean, isPrivateStatus: boolean): number => {
  if (isPrivateStatus === true) {
    return 0
  } else {
    if (voteRoomStatus === true) {
      return 1
    } else {
      return 2
    }
  }
}
const MainFormVoteRoomListItem: React.FunctionComponent<IMainFromVoteRoomListItemProps> = props => {
  const history = useHistory()

  return (
    <div className='ion-activatable ripple-parent'>
      <IonRippleEffect></IonRippleEffect>
      <div className='itemBox mb-1_5 flex' onClick={() => history.push(`/vote/${props.voteUrl}`)}>
        {props.voteRoomStatus === true && (
          <img className='voteBox' src='/assets/img/list_vote_icon_off.svg' alt='' />
        )}
        {props.voteRoomStatus === false && (
          <img className='voteBox' src='/assets/img/list_vote_icon_on.svg' alt='' />
        )}
        <div className='itemContent flex-col pt-1 pl-3'>
          <div className='voteTitle text-left text-lg'>{props.voteRoomTitle}</div>
          {props.voteRoomStatus === false && <div className='voteOn text-sm'>투표진행중</div>}
          {props.voteRoomStatus === true && <div className='voteOff text-sm'>투표마감됨</div>}
        </div>

        {getClassNameByStatus(props.voteRoomStatus, props.isPrivateStatus) === 0 && (
          <img className='cplBtn' src='/assets/img/list_vote_badge_done.svg' alt='' />
        )}
        {getClassNameByStatus(props.voteRoomStatus, props.isPrivateStatus) === 1 && (
          <img className='cplBtn' src='/assets/img/list_vote_badge_expired.svg' alt='' />
        )}
        {getClassNameByStatus(props.voteRoomStatus, props.isPrivateStatus) === 2 && (
          <img className='cplBtn' src='/assets/img/list_vote_badge_notdone.svg' alt='' />
        )}
      </div>
    </div>
  )
}

export default MainFormVoteRoomListItem
