import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import ButtonUi from '../components/ui/ButtonUi'
import IconUi from '../components/ui/IconUi'
import { IVote } from '../models/vote'
import {selectVoteRooms} from '../redux/vote-room/vote-room-actions'
import MainFormVoteRoomListContainer from '../containers/MainFormVoteRoomListContainer'
interface IOwnProps {}
interface IStateProps {
  voteForm: IVote
}
interface IDispatchProps {
  selectVoteRooms: typeof selectVoteRooms
}

const Main: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ 
  voteForm,
  selectVoteRooms 
}) => {
  const [step, setStep] = useState(1)
  const history = useHistory()

  useEffect(() => {
    selectVoteRooms()
  }, []) // eslint-disable-line

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <div className='flex-center px-container'>
            <div className='w-1/6'>
              {step > 1 && <IconUi iconName='icon-left-arrow' onClick={() => setStep(step - 1)} />}
            </div>
            <div className='w-4/6'>{step === 2 && <IonTitle>투표지 담기</IonTitle>}</div>
            <div className='w-1/6 text-right'>
              <IconUi iconName='close' onClick={() => (window.location.href = '/home')}></IconUi>
            </div>
          </div>
        </IonToolbar>
      </IonHeader> */}

      <IonContent className='ion-padding' fullscreen>
        <div className='text-xxxl font-bold mb-7'>
          오늘도 맛있는
          <br />
          하루되세요
        </div>
        <div className='background-img'>
          <MainFormVoteRoomListContainer/>

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
