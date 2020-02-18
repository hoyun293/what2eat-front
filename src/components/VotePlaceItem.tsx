import * as React from 'react'
import { IPlace } from '../models/place'
import { getNumberUnit } from '../utils/number-util'

import './VotePlaceItem.scss'
import IconUi from './ui/IconUi'
import ReviewStar from './ReviewStar'

interface IVotePlace extends IPlace {
  nowLatitude: number
  nowLongitude: number
  isAdded: boolean
  onClickItem: Function
}

const getDistanceByCordinate = ({
  latitude,
  longitude,
  nowLatitude,
  nowLongitude
}: {
  latitude: number
  longitude: number
  nowLatitude: number
  nowLongitude: number
}) => {
  var R = 6378.137 // Radius of earth in KM
  var dLat = (nowLatitude * Math.PI) / 180 - (latitude * Math.PI) / 180
  var dLon = (nowLongitude * Math.PI) / 180 - (longitude * Math.PI) / 180
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latitude * Math.PI) / 180) *
      Math.cos((nowLatitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return (d * 1000).toFixed(0)
}

const VotePlaceItem: React.FunctionComponent<IVotePlace> = ({
  placeId,
  name,
  rating,
  userRatingsTotal,
  photoUrl,
  lat,
  lng,
  nowLatitude,
  nowLongitude,
  isAdded,
  onClickItem
}) => {
  const distance = getDistanceByCordinate({ latitude: lat, longitude: lng, nowLatitude, nowLongitude })

  return (
    <li key={placeId} className='item-container'>
      <div
        className='image-container'
        style={{
          backgroundImage: `url(${photoUrl || '/assets/img/list-place-thumb-empty.svg'})`,
          backgroundSize: photoUrl ? 'cover' : 'initial'
        }}
      >
        <img src='/assets/img/vote-place-thumb-holder.png' alt='' />
      </div>
      <div className='info-container flex justify-between'>
        <div
          className='flex-col'
          onClick={() => {
            window.location.href = `http://what2eat.me/restaurant-detail/${placeId}`
            //window.location.href = `http://localhost:5500/restaurant-detail/${placeId}`
          }}
        >
          <div>{name}</div>
          <div className='mt-1 flex text-base leading-none'>
            <ReviewStar rating={rating} userRatingsTotal={userRatingsTotal}></ReviewStar>
            <div className='gray px-1'>·</div>
            <span className='purple'>{getNumberUnit(distance)}m</span>
          </div>
        </div>
        <div
          onClick={() => {
            onClickItem({ placeId, photoUrl, name })
          }}
        >
          {isAdded ? <IconUi iconName='remove-btn'></IconUi> : <IconUi iconName='add-btn'></IconUi>}
        </div>
      </div>
    </li>
  )
}

export default VotePlaceItem
