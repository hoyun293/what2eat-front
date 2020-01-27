import * as React from 'react'
import * as _ from 'lodash'

import { IVoteRoom } from '../models/vote-room'
import MainFormVoteRoomListItem from '../components/MainFormVoteRoomListItem'
import { connect } from '../redux/redux-connect'

interface IOwnProps {}
interface IStateProps {
  voteRooms: IVoteRoom[]
}
interface IDispatchProps {}

const MainFormVoteRoomListContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ voteRooms }) => {
  return (
    <ol>
      {_.map(voteRooms, (v, i) => (
        <MainFormVoteRoomListItem
          key={i}
          vote_room_title={v.vote_room_title}
          vote_room_status={v.vote_room_status}
          is_private_status={v.is_private_status}
        />
      ))}
    </ol>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteRoom }) => ({
    voteRooms: voteRoom.voteRooms
  }),
  mapDispatchToProps: {},
  component: MainFormVoteRoomListContainer
})
