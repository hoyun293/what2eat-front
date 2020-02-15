import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import VoteSaveFormContainer from '../containers/VoteSaveFormContainer'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'
import VoteSaveCompleteContainer from '../containers/VoteSaveCompleteContainer'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import IconUi from '../components/ui/IconUi'
import { IVoteForm } from '../models/vote'

import './VoteSave.scss'

import { insertVote } from '../redux/vote-insert/vote-insert-actions'

interface IOwnProps {}
interface IStateProps {
  voteForm: IVoteForm
  voteErrorMessage: string
}
interface IDispatchProps {
  insertVote: typeof insertVote
}

const VoteSave: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteForm,
  voteErrorMessage,
  insertVote
}) => {
  const [step, setStep] = useState(1)
  const history = useHistory()

  useEffect(() => {}, []) // eslint-disable-line

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={`toolbar--step${step}`}>
          <div className='flex justify-between items-center px-container'>
            <div>{step === 2 && <IconUi iconName='left-arrow' onClick={() => setStep(step - 1)} />}</div>
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
            disabled={!voteForm.voteName || !voteForm.voteEndDtm}
            onClick={() => setStep(step + 1)}
            text='다음'
            color='yellow'
          />
        )}
        {step === 2 && (
          <ButtonShadowUi
            disabled={Object.keys(voteForm.votePlaces).length === 0}
            onClick={async () => {
              const { isMultiVote, voteName, votePlaces, voteEndDtm } = voteForm

              await insertVote({
                voteName: voteName,
                placeIds: Object.keys(votePlaces),
                isMultiVote,
                voteEndDtm
              })

              if (!voteErrorMessage) setStep(step + 1)
            }}
            text='다음'
            color='yellow'
          />
        )}
      </IonFooter>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteInsert }) => ({
    voteForm: voteInsert.voteForm,
    voteErrorMessage: voteInsert.errorMessage
  }),
  mapDispatchToProps: {
    insertVote
  },
  component: VoteSave
})
