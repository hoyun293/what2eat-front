import * as React from 'react'

interface IMainFromVoteRoomListItemProps {
  vote_room_title: string
  vote_room_status: boolean
  is_private_status: boolean
}

const MainFormVoteRoomListItem: React.FunctionComponent<IMainFromVoteRoomListItemProps> = props => {
  return (
    <li>
      <h1>{props.vote_room_title}</h1>
      <div>{props.vote_room_status}</div>
      <div>{props.is_private_status}</div>

    </li>
  )
}

export default MainFormVoteRoomListItem
