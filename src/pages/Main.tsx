import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import ButtonUi from '../components/ui/ButtonUi'
import IconUi from '../components/ui/IconUi'
import { IVote } from '../models/vote'
import { selectVoteRooms } from '../redux/vote-room/vote-room-actions'
import MainFormVoteRoomListContainer from '../containers/MainFormVoteRoomListContainer'
import './Main.scss'

interface IOwnProps {}
interface IStateProps {}
interface IDispatchProps {
  selectVoteRooms: typeof selectVoteRooms
}

const Main: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ selectVoteRooms }) => {
  const history = useHistory()
  const [toggle, setToggle] = useState(1)
  const pagingNum = 5

  useEffect(() => {
    selectVoteRooms()
    //selectVoteRooms(pagingNum, bool)  onClick 시 pagingNum, bool만 바꾸게 해야되지 않을까?
    // toggle 값 바뀌면 useEffect가 실행되고 selectVoteRooms가 2번실행될듯?
  }, [toggle]) // eslint-disable-line

  return (
    <IonPage>
      <IonContent className='ion-padding' fullscreen>
        <div className='mb-7 flex'>
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
        <div className='background-img'>
          <MainFormVoteRoomListContainer />

          <div className='bottom-floating' onClick={() => history.push('/vote-save')}>
            <img src='/assets/img/floating_btn_add.svg' alt='' />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: () => ({}),
  mapDispatchToProps: {
    selectVoteRooms
  },
  component: Main
})
