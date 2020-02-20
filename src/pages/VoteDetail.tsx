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
import _ from 'lodash'

import VoteSaveFormContainer from '../containers/VoteSaveFormContainer'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'
import VoteSaveCompleteContainer from '../containers/VoteSaveCompleteContainer'
import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import IconUi from '../components/ui/IconUi'

import './VoteDetail.scss'

import { insertVote } from '../redux/vote-insert/vote-insert-actions'
import VoteDetailTitleContainer from '../containers/VoteDetailTitleContainer'
import VoteDetailPlaceListContainer from '../containers/VoteDetailPlaceListContainer'

interface IOwnProps {}
interface IStateProps {}
interface IDispatchProps {}
interface MatchParams {
  voteId: string
}

const getThemeNum = (str: string) => {
  return (str.charCodeAt(0) % 2) + 1
}

const VoteDetail: React.FC<IOwnProps & IStateProps & IDispatchProps & RouteComponentProps<MatchParams>> = ({
  match
}) => {
  const [scrollY, setScrollY] = useState(0)

  const history = useHistory()
  const themeNum = getThemeNum(match.params.voteId)
  console.log(match.params.voteId)

  useEffect(() => {}, []) // eslint-disable-line

  return (
    <IonPage>
      <IonHeader mode='ios' translucent={false}>
        <IonToolbar className={`theme-${themeNum} ${scrollY === 0 && 'hidden'}`}>
          <IconUi iconName='left-arrow' className='pl-4' onClick={() => history.push('/main')}></IconUi>
          <IonTitle>이번달 저녁회식 뭐먹죠</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        className={`theme-${themeNum}`}
        scrollEvents={true}
        onIonScroll={({ detail }) => setScrollY(detail.currentY)}
      >
        <VoteDetailTitleContainer themeNum={themeNum} />
        <VoteDetailPlaceListContainer themeNum={themeNum} />

        <IonFab vertical='top' horizontal='start' slot='fixed' onClick={() => history.push('/main')}>
          {scrollY === 0 && (
            <IconUi
              iconName='left-arrow-white'
              className='pl-4'
              onClick={() => history.push('/main')}
            ></IconUi>
          )}
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
