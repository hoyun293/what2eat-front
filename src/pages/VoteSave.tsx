import {
  IonHeader,
  IonFooter,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  useIonViewWillEnter
} from '@ionic/react'
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

  useEffect(() => {
    setUiIsLoader(true)
  }, []) // eslint-disable-line

  useIonViewWillEnter(() => {
    setUiIsLoader(false)
  })

  return (
    <IonPage>
      {step === 1 && (
        <>
          <IonFab
            vertical='top'
            horizontal='end'
            slot='fixed'
            className='top-0-safe-area'
            onClick={() => history.push('/')}
          >
            <IconUi
              iconName='close'
              className='iconStepOneClose pt-4 pr-2'
              onClick={() => history.push('/')}
            ></IconUi>
          </IonFab>
          <VoteSaveFormContainer />
        </>
      )}
      {step === 2 && (
        <>
          <IonHeader>
            <IonToolbar className={`toolbar--step${step}`}>
              <div className='flex justify-between items-center px-container'>
                <div>
                  <IconUi
                    iconName='left-arrow'
                    className='leftArrow'
                    onClick={() => setVoteInsertStep(step - 1)}
                  />
                </div>
                <div>
                  <IonTitle>
                    <div className='text-17 text-medium black'>????????? ??????</div>
                  </IonTitle>
                </div>
                <div>
                  <IconUi
                    iconName='close'
                    className='iconStepTwoClose'
                    onClick={() => history.push('/')}
                  ></IconUi>
                </div>
              </div>
            </IonToolbar>
          </IonHeader>
          <VoteSaveFormFoodCartContainer />
        </>
      )}
      {(step === 1 || step === 2) && (
        <IonFooter>
          <ButtonShadowUi
            disabled={
              step === 1
                ? !voteForm.voteName || !voteForm.voteEndDtm
                : Object.keys(voteForm.votePlaces).length === 0
            }
            onClick={() =>
              step === 1
                ? setVoteInsertStep(step + 1)
                : insertVote({
                    voteName: voteForm.voteName,
                    placeIds: Object.keys(voteForm.votePlaces),
                    isMultiVote: voteForm.isMultiVote,
                    voteEndDtm: voteForm.voteEndDtm
                  })
            }
            text='??????'
            color='yellow'
          />
        </IonFooter>
      )}
      {step === 3 && (
        <>
          <IonFab
            vertical='top'
            horizontal='end'
            slot='fixed'
            className='top-0-safe-area'
            onClick={() => history.push('/')}
          >
            <IconUi iconName='close' className='pt-4 pr-2' onClick={() => history.push('/')}></IconUi>
          </IonFab>
          <VoteSaveCompleteContainer />
        </>
      )}
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
