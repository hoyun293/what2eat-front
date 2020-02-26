import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'

import { connect } from '../redux/redux-connect'
import IconUi from '../components/ui/IconUi'
import { Plugins } from '@capacitor/core'

import { VoteDetailPlaceListItem, VoteDetailPlaceListItemEdit } from '../components/VoteDetailPlaceListItem'
import {
  setVoteDetailVotePlaceIdForm,
  deleteVoteDetailVotePlaceIdForm
} from '../redux/vote-detail/vote-detail-actions'
import { getDistanceByCordinate } from '../utils/distance-util'

import { IVoteDetail } from '../models/vote'

import './VoteDetailPlaceListContainer.scss'
interface IOwnProps {
  themeNum: number
  isVoteEdit: boolean
}
interface IStateProps {
  isVoteDone: boolean
  vote: IVoteDetail
  votePlaceIdsForm: string[]
}
interface IDispatchProps {
  setVoteDetailVotePlaceIdForm: typeof setVoteDetailVotePlaceIdForm
  deleteVoteDetailVotePlaceIdForm: typeof deleteVoteDetailVotePlaceIdForm
}
const INIT_LATITUDE = 37.4961895
const INIT_LONGITUDE = 127.0253834

const VoteDetailPlaceListContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  themeNum,
  isVoteEdit,
  isVoteDone,
  vote,
  votePlaceIdsForm,
  setVoteDetailVotePlaceIdForm,
  deleteVoteDetailVotePlaceIdForm
}) => {
  const [coordinate, setCoordinate] = useState({ lat: INIT_LATITUDE, lng: INIT_LONGITUDE })

  useEffect(() => {
    getCurrentPosition()
  }, []) // eslint-disable-line

  const getCurrentPosition = async () => {
    try {
      const { coords } = await Plugins.Geolocation.getCurrentPosition()
      setCoordinate({ lat: coords.latitude, lng: coords.longitude })
    } catch (e) {
      setCoordinate({ lat: 37.4961895, lng: 127.0253834 })
    }
  }

  return (
    <div className='vote-detail-place-list-container flex-col move-up'>
      <div className='px-container'>
        <div className='vote-detail-place-list-container__handle'></div>
        <div className='flex justify-between mx-1'>
          <div>
            총 <span className='yellow-dark'>4</span>개
          </div>
          {vote.isMultiVote && (
            <div className='flex gray'>
              <IconUi iconName='multi-vote' className='mr-1'></IconUi>복수투표 가능
            </div>
          )}
        </div>
        <ul>
          {_.map(vote.votePlaces, (v, i) =>
            !isVoteDone || isVoteEdit ? (
              <VoteDetailPlaceListItemEdit
                key={v.placeId}
                placeId={v.placeId}
                name={v.name}
                photoUrl={v.photoUrl}
                voteCount={v.voteCount}
                distance={getDistanceByCordinate({
                  latitude: coordinate.lat,
                  longitude: coordinate.lng,
                  nowLatitude: v.lat,
                  nowLongitude: v.lng
                })}
                isAdded={votePlaceIdsForm.indexOf(v.placeId) > -1}
                isMostVoted={v.isMostVoted}
                onClickItem={
                  votePlaceIdsForm.indexOf(v.placeId) > -1
                    ? deleteVoteDetailVotePlaceIdForm
                    : setVoteDetailVotePlaceIdForm
                }
              />
            ) : (
              <VoteDetailPlaceListItem
                key={v.placeId}
                placeId={v.placeId}
                name={v.name}
                photoUrl={v.photoUrl}
                voteCount={v.voteCount}
                distance={getDistanceByCordinate({
                  latitude: coordinate.lat,
                  longitude: coordinate.lng,
                  nowLatitude: v.lat,
                  nowLongitude: v.lng
                })}
                isAdded={v.isAdded}
                isMostVoted={v.isMostVoted}
              />
            )
          )}
        </ul>
      </div>
    </div>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteDetail }) => ({
    vote: voteDetail.vote,
    isVoteDone: voteDetail.isVoteDone,
    votePlaceIdsForm: voteDetail.votePlaceIdsForm
  }),
  mapDispatchToProps: {
    setVoteDetailVotePlaceIdForm,
    deleteVoteDetailVotePlaceIdForm
  },
  component: VoteDetailPlaceListContainer
})
