import * as React from 'react'
import './MainFormVoteRoomListItem.scss'

interface IMainFromVoteRoomListItemProps {
  voteRoomTitle: string
  voteRoomStatus: boolean
  isPrivateStatus: boolean
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
  return (
    <div>
      <div className='itemBox mb-1_5 flex'>
        {props.voteRoomStatus === true && (
          <img className='voteBox pl-3 pt-2_5 pb-2_5' src='/assets/img/list_vote_icon_off.svg' alt='' />
        )}
        {props.voteRoomStatus === false && (
          <img className='voteBox pl-3 pt-2_5 pb-2_5' src='/assets/img/list_vote_icon_on.svg' alt='' />
        )}
        <div className='itemContent flex-col pt-1 pl-3'>
          <div className='voteTitle text-left text-lg'>{props.voteRoomTitle}</div>
          {props.voteRoomStatus === true && <div className='voteOn text-sm'>투표진행중</div>}
          {props.voteRoomStatus === false && <div className='voteOff text-sm'>투표마감됨</div>}
        </div>

        {getClassNameByStatus(props.voteRoomStatus, props.isPrivateStatus) === 0 && (
          <img className='cplBtn mr-3' src='/assets/img/list_vote_badge_done.svg' alt='' />
        )}
        {getClassNameByStatus(props.voteRoomStatus, props.isPrivateStatus) === 1 && (
          <img className='cplBtn mr-3' src='/assets/img/list_vote_badge_expired.svg' alt='' />
        )}
        {getClassNameByStatus(props.voteRoomStatus, props.isPrivateStatus) === 2 && (
          <img className='cplBtn mr-3' src='/assets/img/list_vote_badge_notdone.svg' alt='' />
        )}
      </div>
    </div>
  )
}

export default MainFormVoteRoomListItem
