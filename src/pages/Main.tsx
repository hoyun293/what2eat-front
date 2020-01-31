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
interface IStateProps {
  voteForm: IVote
}
interface IDispatchProps {
  selectVoteRooms: typeof selectVoteRooms
}

const Main: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ voteForm, selectVoteRooms }) => {
  const history = useHistory()
  const [toggle, setToggle] = useState(1)
  const pagingNum = 5
  useEffect(() => {
    selectVoteRooms()
  }, [toggle]) // eslint-disable-line

  return (
    <IonPage>
      <IonContent className='ion-padding' fullscreen>
        <div className='mb-7 flex'>
          <div className='pageHeadPhrase'>오늘도 맛있는 하루되세요</div>
          <img className='toggleIcon' src='/assets/icon/sorting btn_icon.svg' alt='' />
          {toggle % 2 === 1 && (
            <div
              className='toggleName'
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
              className='toggleName'
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
  mapStateToProps: ({ vote }) => ({
    voteForm: vote.voteForm
  }),
  mapDispatchToProps: {
    selectVoteRooms
  },
  component: Main
})
