import * as React from 'react'
import * as _ from 'lodash'

import { IVoteRoom } from '../models/vote-room'
import MainFormVoteRoomListItem from '../components/MainFormVoteRoomListItem'
import { connect } from '../redux/redux-connect'
import './MainFormVoteRoomListContainer.scss'

interface IOwnProps {}
interface IStateProps {
  voteRooms: IVoteRoom[]
}
interface IDispatchProps {}

const MainFormVoteRoomListContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ voteRooms }) => {
  return (
    <ol className='align-center flex justify-between items-center'>
      {_.map(voteRooms, (v, i) => (
        <MainFormVoteRoomListItem
          key={i}
          voteRoomTitle={v.voteRoomTitle}
          voteRoomStatus={v.voteRoomStatus}
          isPrivateStatus={v.isPrivateStatus}
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
