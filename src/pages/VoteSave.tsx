import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import VoteSaveFormContainer from '../containers/VoteSaveFormContainer'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'
import VoteSaveFormOptionContainer from '../containers/VoteSaveFormOptionContainer'
import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import ButtonUi from '../components/ui/ButtonUi'
import IconUi from '../components/ui/IconUi'
import { IVoteForm } from '../models/vote'

interface IOwnProps {}
interface IStateProps {
  voteForm: IVoteForm
}
interface IDispatchProps {}

const VoteSave: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ voteForm }) => {
  const [step, setStep] = useState(2)
  const history = useHistory()

  useEffect(() => {}, []) // eslint-disable-line

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='flex justify-between items-center px-container'>
            <div>{step > 1 && <IconUi iconName='icon-left-arrow' onClick={() => setStep(step - 1)} />}</div>
            <div>
              {step === 2 && (
                <IonTitle>
                  <div className='text-xl text-medium black'>투표지 담기</div>
                </IonTitle>
              )}
            </div>
            <div>
              <IconUi iconName='close' onClick={() => history.push('/main')}></IconUi>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {step === 1 && <VoteSaveFormContainer />}
        {step === 2 && (
          <Fragment>
            <VoteSaveFormFoodCartContainer />
          </Fragment>
        )}
        {step === 3 && (
          <Fragment>
            <div className='text-xxxl text-bold mb-7 text-center'>
              투표가
              <br />
              생성되었습니다!
            </div>
            {/* <VoteSaveFormOptionContainer /> */}
          </Fragment>
        )}
      </IonContent>
      <IonFooter>
        {step === 1 && (
          <ButtonShadowUi
            disabled={!voteForm.voteName && !voteForm.endDate}
            onClick={() => setStep(step + 1)}
            text='다음'
            color='yellow'
          />
        )}
        {step === 2 && (
          <ButtonShadowUi
            disabled={Object.keys(voteForm.votePlaces).length === 0}
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
