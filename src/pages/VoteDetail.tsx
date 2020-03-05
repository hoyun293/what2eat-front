import { IonContent, IonFooter, IonPage, IonFab, useIonViewWillEnter } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import _ from 'lodash'

import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import IconUi from '../components/ui/IconUi'

import './VoteDetail.scss'

import { selectVote, insertUserVotes, setVoteDetailInit } from '../redux/vote-detail/vote-detail-actions'
import VoteDetailTitleContainer from '../containers/VoteDetailTitleContainer'
import VoteDetailPlaceListContainer from '../containers/VoteDetailPlaceListContainer'
import { IVoteDetail } from '../models/vote'
import { setUiIsLoader } from '../redux/ui/ui-actions'

interface IOwnProps {}
interface IStateProps {
  vote: IVoteDetail
  isVoteEnd: boolean
  isVoteDone: boolean
  isLoading: boolean
  votePlaceIds: string[]
  votePlaceIdsForm: string[]
}
interface IDispatchProps {
  selectVote: typeof selectVote
  insertUserVotes: typeof insertUserVotes
  setUiIsLoader: typeof setUiIsLoader
  setVoteDetailInit: typeof setVoteDetailInit
}

interface MatchParams {
  voteUrl: string
}

const getThemeNum = (str: string) => {
  return (str.charCodeAt(0) % 2) + 1
}

const VoteDetail: React.FC<IOwnProps & IStateProps & IDispatchProps & RouteComponentProps<MatchParams>> = ({
  match,
  vote,
  isVoteDone,
  isVoteEnd,
  isLoading,
  setUiIsLoader,
  votePlaceIds,
  votePlaceIdsForm,
  selectVote,
  insertUserVotes,
  setVoteDetailInit
}) => {
  const [scrollY, setScrollY] = useState(0)
  const [isVoteEdit, setIsVoteEdit] = useState(false)
  const voteUrl = match.params.voteUrl

  const history = useHistory()
  const themeNum = getThemeNum(voteUrl)

  useEffect(() => {
    // setVoteDetailInit()
    selectVote(voteUrl)
  }, [voteUrl, isVoteDone, _.sum(votePlaceIds)]) // eslint-disable-line

  useEffect(() => {
    if (isVoteEdit === true) {
      setIsVoteEdit(false)
    }
  }, [_.sum(votePlaceIds)]) // eslint-disable-line

  useEffect(() => {
    setUiIsLoader(isLoading)
  }, [isLoading]) // eslint-disable-line

  return (
    <IonPage>
      <IonContent
        fullscreen
        className={`theme-${themeNum}`}
        scrollEvents={true}
        onIonScroll={({ detail }) => setScrollY(detail.currentY)}
      >
        <VoteDetailTitleContainer themeNum={themeNum} voteUrl={voteUrl} />
        <VoteDetailPlaceListContainer themeNum={themeNum} isVoteEdit={isVoteEdit} />

        <IonFab
          vertical='top'
          horizontal='start'
          slot='fixed'
          className='w-full top-0-safe-area left-0'
          onClick={() => history.push('/')}
        >
          {scrollY === 0 ? (
            <IconUi
              iconName='left-arrow-white'
              className='pl-4 pt-3'
              onClick={() => history.push('/')}
            ></IconUi>
          ) : (
            <div className='bg-white flex items-center height-50'>
              <IconUi iconName='left-arrow' className='pl-4 pr-3' onClick={() => history.push('/')}></IconUi>
              <div className='w-2/3 text-xl text-center text-bold'>{vote.voteName}</div>
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
            onClick={() => insertUserVotes(vote.voteId, votePlaceIdsForm)}
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
              onClick={() => insertUserVotes(vote.voteId, votePlaceIdsForm)}
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
    vote: voteDetail.vote,
    isVoteEnd: voteDetail.isVoteEnd,
    isVoteDone: voteDetail.isVoteDone,
    votePlaceIdsForm: voteDetail.votePlaceIdsForm,
    votePlaceIds: voteDetail.votePlaceIds,
    isLoading: voteDetail.isLoading
  }),
  mapDispatchToProps: {
    selectVote,
    insertUserVotes,
    setVoteDetailInit,
    setUiIsLoader
  },
  component: VoteDetail
})
