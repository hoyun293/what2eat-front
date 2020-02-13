import {
  IonContent,
  IonHeader,
  IonFooter,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import VoteSaveFormContainer from '../containers/VoteSaveFormContainer'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'
import VoteSaveCompleteContainer from '../containers/VoteSaveCompleteContainer'
import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import IconUi from '../components/ui/IconUi'

import './VoteDetail.scss'

import { insertVote } from '../redux/vote-insert/vote-insert-actions'

interface IOwnProps {}
interface IStateProps {}
interface IDispatchProps {}
interface MatchParams {
  voteId: string
}

const getThemeNum = (str: string) => {
  return str.charCodeAt(0) % 2
}

const VoteDetail: React.FC<IOwnProps & IStateProps & IDispatchProps & RouteComponentProps<MatchParams>> = ({
  match
}) => {
  const [step, setStep] = useState(1)
  const history = useHistory()
  const themeNum = getThemeNum(match.params.voteId)
  console.log(match.params.voteId)

  useEffect(() => {}, []) // eslint-disable-line

  useEffect(() => {}, []) // eslint-disable-line

  return (
    <IonPage>
      <IonHeader mode='ios' translucent={false}>
        <IonToolbar className={`toolbar--step${step}`}>
          {/* <IconUi
            iconName='left-arrow-white'
            // onClick={() => setIsShowModal(false)}
          ></IconUi> */}
          {/* <div className='flex justify-between items-center px-container'>
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
          </div> */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={`theme-${themeNum}`}>
        <IonFab
          vertical='top'
          horizontal='start'
          slot='fixed'
          edge={true}
          onClick={() => history.push('/main')}
        >
          <IconUi
            iconName='left-arrow-white'
            // onClick={() => setIsShowModal(false)}
          ></IconUi>
        </IonFab>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({}) => ({}),
  mapDispatchToProps: {},
  component: VoteDetail
})
