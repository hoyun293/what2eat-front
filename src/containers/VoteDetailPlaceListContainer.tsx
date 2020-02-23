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

import { IVote } from '../models/vote'

import './VoteDetailPlaceListContainer.scss'

const places = [
  {
    placeId: 'ChIJf7r2G6B7ezUR0Spbjzr6eck',
    name: '데블스토어',
    photoUrl: 'assets/img/food-1.jpeg',
    lat: 37.4961895,
    lng: 127.0253834,
    voteCount: 5,
    isAdded: true,
    isMostVoted: true
  },
  {
    placeId: 'ChIJjffgKeR7ezURbphP_YpaYEE',
    name: '고반식당 삼성점',
    photoUrl: 'assets/img/food-2.jpeg',
    lat: 39.4961895,
    lng: 127.0253834,
    voteCount: 2,
    isAdded: false,
    isMostVoted: false
  },
  {
    placeId: 'ChIJVS5FkuZ7ezURuqmWGhPufXE',
    name: '칼리가리박사의 밀실',
    photoUrl: 'assets/img/food-3.jpeg',
    lat: 34.4961895,
    lng: 127.0253834,
    voteCount: 5,
    isAdded: false,
    isMostVoted: true
  },
  {
    placeId: 'ChIJZeBnkuZ7ezURK49I1xqHFOo',
    name: '느린마을 양조장 강남점',
    photoUrl: 'assets/img/food-4.jpeg',
    lat: 31.4961895,
    lng: 127.0253834,
    voteCount: 1,
    isAdded: false,
    isMostVoted: false
  }
]
interface IOwnProps {
  themeNum: number
  isVoteEdit: boolean
}
interface IStateProps {
  isVoteDone: boolean
  vote: IVote
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
  const [isShowModal, setIsShowModal] = useState(false)
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
          {_.map(places, (v, i) =>
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
