import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonFab } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import _ from 'lodash'

import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import IconUi from '../components/ui/IconUi'

import './VoteDetail.scss'

import { insertUserVotes } from '../redux/vote-detail/vote-detail-actions'
import VoteDetailTitleContainer from '../containers/VoteDetailTitleContainer'
import VoteDetailPlaceListContainer from '../containers/VoteDetailPlaceListContainer'

interface IOwnProps {}
interface IStateProps {
  isVoteEnd: boolean
  isVoteDone: boolean
  votePlaceIdsForm: string[]
}
interface IDispatchProps {
  insertUserVotes: typeof insertUserVotes
}

interface MatchParams {
  voteId: string
}

const getThemeNum = (str: string) => {
  return (str.charCodeAt(0) % 2) + 1
}

const VoteDetail: React.FC<IOwnProps & IStateProps & IDispatchProps & RouteComponentProps<MatchParams>> = ({
  match,
  isVoteDone,
  isVoteEnd,
  votePlaceIdsForm,
  insertUserVotes
}) => {
  const [scrollY, setScrollY] = useState(0)
  const [isVoteEdit, setIsVoteEdit] = useState(false)

  const history = useHistory()
  const themeNum = getThemeNum(match.params.voteId)

  useEffect(() => {}, []) // eslint-disable-line

  return (
    <IonPage>
      <IonContent
        fullscreen
        className={`theme-${themeNum}`}
        scrollEvents={true}
        onIonScroll={({ detail }) => setScrollY(detail.currentY)}
      >
        <VoteDetailTitleContainer themeNum={themeNum} />
        <VoteDetailPlaceListContainer themeNum={themeNum} isVoteEdit={isVoteEdit} />

        <IonFab
          vertical='top'
          horizontal='start'
          slot='fixed'
          className='w-full top-0-safe-area left-0'
          onClick={() => history.push('/main')}
        >
          {scrollY === 0 ? (
            <IconUi
              iconName='left-arrow-white'
              className='pl-4 pt-3'
              onClick={() => history.push('/main')}
            ></IconUi>
          ) : (
            <div className='bg-white flex items-center height-50'>
              <IconUi
                iconName='left-arrow'
                className='pl-4 pr-3'
                onClick={() => history.push('/main')}
              ></IconUi>
              <div className='w-2/3 text-xl text-center text-bold'>이번달 저녁회식 뭐먹죠</div>
            </div>
          )}
        </IonFab>
      </IonContent>
      <IonFooter>
        {isVoteEnd && <ButtonShadowUi disabled={true} text='투표 마감' color='gray' />}
        {!isVoteEnd && isVoteDone && !isVoteEdit && (
          <ButtonShadowUi onClick={() => setIsVoteEdit(true)} text='재투표하기' color='yellow' />
        )}
        {!isVoteEnd && !isVoteDone && (
          <ButtonShadowUi
            onClick={() => insertUserVotes(match.params.voteId, votePlaceIdsForm)}
            text='투표하기'
            color={votePlaceIdsForm.length > 0 ? 'yellow' : 'gray'}
          />
        )}
        {!isVoteEnd && isVoteEdit && (
          <div className='flex w-full'>
            <ButtonShadowUi
              onClick={() => setIsVoteEdit(false)}
              text='취소'
              color='yellow'
              className='w-1/3'
            />
            <ButtonShadowUi
              onClick={() => insertUserVotes(match.params.voteId, votePlaceIdsForm)}
              text='투표하기'
              disabled={votePlaceIdsForm.length === 0}
              color={votePlaceIdsForm.length > 0 ? 'yellow' : 'gray'}
              className='w-full -ml-5'
            />
          </div>
        )}
      </IonFooter>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteDetail }) => ({
    isVoteEnd: voteDetail.isVoteEnd,
    isVoteDone: voteDetail.isVoteDone,
    votePlaceIdsForm: voteDetail.votePlaceIdsForm
  }),
  mapDispatchToProps: {
    insertUserVotes
  },
  component: VoteDetail
})
