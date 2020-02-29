import { IonContent, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { connect } from '../redux/redux-connect'
import { selectVoteRooms } from '../redux/vote-room/vote-room-actions'
import MainFormVoteRoomListContainer from '../containers/MainFormVoteRoomListContainer'
import { signIn } from '../redux/user/user-actions'
import './Main.scss'
import { IVoteRoom } from '../models/vote-room'
import { changeStep } from '../redux/vote-insert/vote-insert-actions'

interface IOwnProps {}
interface IStateProps {
  voteRooms: IVoteRoom[]
}
interface IDispatchProps {
  selectVoteRooms: typeof selectVoteRooms
  signIn: typeof signIn
  changeStep: typeof changeStep
}

const Main: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  selectVoteRooms,
  voteRooms,
  changeStep
}) => {
  const history = useHistory()
  const [toggle, setToggle] = useState(1)
  const pagingNum = 5
  useEffect(() => {
    //signIn()
    selectVoteRooms()
    //selectVoteRooms(pagingNum, bool)  onClick 시 pagingNum, bool만 바꾸게 해야되지 않을까?
    // toggle 값 바뀌면 useEffect가 실행되고 selectVoteRooms가 2번실행될듯?
  }, [toggle]) // eslint-disable-line
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='mb-1 flex px-container'>
          <div className='pageHeadPhrase text-xxxl'>
            오늘도 맛있는
            <br />
            하루되세요
          </div>
          <img className='toggleIcon' src='/assets/icon/sorting btn_icon.svg' alt='' />
          {toggle % 2 === 1 && (
            <div
              className='toggleName text-lg'
              onClick={() => {
                setToggle(toggle + 1)
                selectVoteRooms(pagingNum, true)
              }}
            >
              마감순
            </div>
          )}
          {toggle % 2 === 0 && (
            <div
              className='toggleName text-lg'
              onClick={() => {
                setToggle(toggle + 1)
                selectVoteRooms(pagingNum, false)
              }}
            >
              인기순
            </div>
          )}
        </div>
        <div
          className='background-img'
          style={{
            height: voteRooms ? (voteRooms.length > 5 ? 'auto' : '100%') : '100%'
          }}
        >
          <MainFormVoteRoomListContainer />
          <div
            className='bottom-floating'
            onClick={() => {
              changeStep(1)
              history.push('/vote-save')
            }}
          >
            <img src='/assets/img/floating_btn_add.svg' alt='' />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteRoom }) => ({
    voteRooms: voteRoom.voteRooms
  }),
  mapDispatchToProps: {
    selectVoteRooms,
    signIn,
    changeStep
  },
  component: Main
})
