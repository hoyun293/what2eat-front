import { IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import VoteSaveFormContainer from '../containers/VoteSaveFormContainer'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'
import VoteSaveCompleteContainer from '../containers/VoteSaveCompleteContainer'
import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import IconUi from '../components/ui/IconUi'
import { IVoteForm } from '../models/vote'

import './VoteSave.scss'

import { insertVote, setVoteInsertStep, setVoteInsertInit } from '../redux/vote-insert/vote-insert-actions'
import { setUiIsLoader } from '../redux/ui/ui-actions'

interface IOwnProps {}
interface IStateProps {
  step: number
  voteForm: IVoteForm
  voteErrorMessage: string
  isLoading: boolean
}
interface IDispatchProps {
  setVoteInsertInit: typeof setVoteInsertInit
  insertVote: typeof insertVote
  setVoteInsertStep: typeof setVoteInsertStep
  setUiIsLoader: typeof setUiIsLoader
}

const VoteSave: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  step,
  isLoading,
  setUiIsLoader,
  voteForm,
  voteErrorMessage,
  setVoteInsertInit,
  insertVote,
  setVoteInsertStep
}) => {
  const history = useHistory()

  useIonViewWillEnter(() => {
    setVoteInsertInit()
  })

  useEffect(() => {
    setUiIsLoader(isLoading)
  }, [isLoading]) // eslint-disable-line

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={`toolbar--step${step}`}>
          <div className='flex justify-between items-center px-container'>
            <div>
              {step === 2 && <IconUi iconName='left-arrow' onClick={() => setVoteInsertStep(step - 1)} />}
            </div>
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

      {step === 1 && <VoteSaveFormContainer />}
      {step === 2 && <VoteSaveFormFoodCartContainer />}
      {step === 3 && <VoteSaveCompleteContainer />}
      <IonFooter>
        {step === 1 && (
          <ButtonShadowUi
            disabled={!voteForm.voteName || !voteForm.voteEndDtm}
            onClick={() => setVoteInsertStep(step + 1)}
            text='다음'
            color='yellow'
          />
        )}
        {step === 2 && (
          <ButtonShadowUi
            disabled={Object.keys(voteForm.votePlaces).length === 0}
            onClick={async () => {
              const { isMultiVote, voteName, votePlaces, voteEndDtm } = voteForm

              insertVote({
                voteName: voteName,
                placeIds: Object.keys(votePlaces),
                isMultiVote,
                voteEndDtm
              })
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
    voteErrorMessage: voteInsert.errorMessage,
    step: voteInsert.step,
    isLoading: voteInsert.isLoading
  }),
  mapDispatchToProps: {
    setVoteInsertInit,
    insertVote,
    setVoteInsertStep,
    setUiIsLoader
  },
  component: VoteSave
})
