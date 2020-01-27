import * as React from 'react'
import './MainFormVoteRoomListItem.scss'

interface IMainFromVoteRoomListItemProps {
  vote_room_title: string
  vote_room_status: boolean
  is_private_status: boolean
}

const getClassNameByStatus = (vote_room_status:boolean, is_private_status:boolean)  => {

};

const MainFormVoteRoomListItem: React.FunctionComponent<IMainFromVoteRoomListItemProps> = props => {
  return (
    <div>
      <div className={`${getClassNameByStatus(props.vote_room_status, props.is_private_status)}`}>

        {/* { <img src = '/assets/img/list_vote_icon_on.svg'/>}
        {props.is_private_status === false && <img src = '/assets/img/list_vote_icon_off.svg'/>} 
        {props.vote_room_status === false && <img src = '/assets/img/list_vote_icon_off.svg'/>}         */}
      </div>
      <h3>{props.vote_room_title}</h3>
      <div>{props.is_private_status}</div>
    </div>
  )
}

export default MainFormVoteRoomListItem
