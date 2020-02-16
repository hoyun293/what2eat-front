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
    <div className='px-container pt-3'>
      <ol className='align-center flex-col justify-between'>
        {_.map(voteRooms, (v, i) => (
          <MainFormVoteRoomListItem
            //key={i}
            //voteRoomTitle={v.voteRoomTitle}
            //voteRoomStatus={v.voteRoomStatus}
            //isPrivateStatus={v.isPrivateStatus}
            key={v._id}
            voteRoomTitle={v.voteName}
            voteRoomStatus={v.isEnded}
            isPrivateStatus={v.isVoted}
          />
        ))}
      </ol>
    </div>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteRoom }) => ({
    voteRooms: voteRoom.voteRooms
  }),
  mapDispatchToProps: {},
  component: MainFormVoteRoomListContainer
})
