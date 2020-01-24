import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import VoteSaveFormContainer from '../containers/VoteSaveFormContainer'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'
import VoteSaveFormOptionContainer from '../containers/VoteSaveFormOptionContainer'
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

const VoteSave: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ voteForm }) => {
  const [step, setStep] = useState(1)

  useEffect(() => {}, []) // eslint-disable-line

  console.log(voteForm)

  return (
    <IonPage>
      <IonHeader>
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
      </IonHeader>
      <IonContent className='ion-padding' fullscreen>
        {step === 1 && <VoteSaveFormContainer />}
        {step === 2 && (
          <Fragment>
            <VoteSaveFormFoodCartContainer />
          </Fragment>
        )}
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
      </IonContent>
      <IonFooter>
        {voteForm.placeIds.length} 2
        {step === 1 && (
          <ButtonShadowUi
            disabled={!voteForm.voteName}
            onClick={() => setStep(step + 1)}
            text='다음'
            color='yellow'
          />
        )}
        {step === 2 && (
          <ButtonShadowUi
            disabled={voteForm.placeIds.length === 0}
            onClick={() => setStep(step + 1)}
            text='다음'
            color='yellow'
          />
        )}
        {step === 3 && <ButtonShadowUi onClick={() => {}} color='yellow' text='저장' />}
      </IonFooter>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ vote }) => ({
    voteForm: vote.voteForm
  }),
  mapDispatchToProps: {},
  component: VoteSave
})
