import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import VoteSaveFormContainer from '../containers/VoteSaveFormContainer'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'
import VoteSaveCompleteContainer from '../containers/VoteSaveCompleteContainer'
import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import IconUi from '../components/ui/IconUi'
import { IVoteForm } from '../models/vote'

import './VoteSave.scss'

interface IOwnProps {}
interface IStateProps {
  voteForm: IVoteForm
}
interface IDispatchProps {}

const VoteSave: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ voteForm }) => {
  const [step, setStep] = useState(3)
  const history = useHistory()

  useEffect(() => {}, []) // eslint-disable-line

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={`toolbar--step${step}`}>
          <div className='flex justify-between items-center px-container'>
            <div>{step === 2 && <IconUi iconName='icon-left-arrow' onClick={() => setStep(step - 1)} />}</div>
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
        {step === 2 && <VoteSaveFormFoodCartContainer />}
        {step === 3 && <VoteSaveCompleteContainer />}
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
