import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import React, { useEffect, useState, Fragment } from 'react'

import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import ButtonUi from '../components/ui/ButtonUi'
import IconUi from '../components/ui/IconUi'
import { IVote } from '../models/vote'

interface IOwnProps {}
interface IStateProps {
  voteForm: IVote
}
interface IDispatchProps {}

const Main: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ voteForm }) => {
  const [step, setStep] = useState(1)

  useEffect(() => {}, []) // eslint-disable-line

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
          {step === 1}
          {step === 2 && <Fragment></Fragment>}
          {step === 3 && (
            <Fragment>
              <div className='text-xxxl font-bold mb-7 text-center'>
                투표가
                <br />
                생성되었습니다!
              </div>
              {/* <VoteSaveFormOptionContainer /> */}
            </Fragment>
          )}

          <div className='bottom-floating'>
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
  mapDispatchToProps: {},
  component: Main
})
