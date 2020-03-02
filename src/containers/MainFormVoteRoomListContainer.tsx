import * as React from 'react'
import * as _ from 'lodash'

import { IVoteRoom } from '../models/vote-room'
import MainFormVoteRoomListItem from '../components/MainFormVoteRoomListItem'
import { connect } from '../redux/redux-connect'
import './MainFormVoteRoomListContainer.scss'

interface IOwnProps {}
interface IStateProps {
  sortedVoteRooms: IVoteRoom[]
}
interface IDispatchProps {}

const MainFormVoteRoomListContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  sortedVoteRooms
}) => {
  return (
    <div className='px-container pt-3'>
      <ol className='align-center flex-col justify-between'>
        {_.map(sortedVoteRooms, (v, i) => (
          <MainFormVoteRoomListItem
            key={v._id}
            voteUrl={v.voteUrl}
            voteRoomTitle={v.voteName}
            voteRoomStatus={v.isEnded}
            isPrivateStatus={v.isVoted}
          />
        ))}
      </ol>
    </div>
  )
}

export default MainFormVoteRoomListContainer
