import * as React from 'react'
import { IPlace } from '../models/place'
import { getNumberUnit } from '../utils/number-util'

import './VoteDetailPlaceListItem.scss'
import IconUi from './ui/IconUi'

// interface IVotePlace extends IPlace {
// nowLatitude: number
// nowLongitude: number
// isAdded: boolean
// onClickItem: Function
// }

export interface IVoteDetailPlaceListItem {
  placeId: string
  name: string
  photoUrl: string
  voteCount: number
  lat: number
  lng: number
  nowLatitude: number
  nowLongitude: number
  isAdded: boolean
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

const VotePlaceItem: React.FunctionComponent<IVoteDetailPlaceListItem> = ({
  placeId,
  name,
  photoUrl,
  voteCount,
  lat,
  lng,
  nowLatitude,
  nowLongitude,
  isAdded
  // onClickItem
}) => {
  const distance = getDistanceByCordinate({ latitude: lat, longitude: lng, nowLatitude, nowLongitude })

  return (
    <li key={placeId} className='flex w-full justify-between br-xlg bg-white py-6 px-4 my-4'>
      <div className='flex'>
        <img src={photoUrl} alt='' className='br-lg place-image' />
        <div className='flex-col justify-center ml-3'>
          <div>{name}</div>
          <div className='mt-1 flex text-base leading-none'>
            <div className='flex-center gray'>
              <IconUi iconName='people' className='mr-1'></IconUi> {voteCount}명
            </div>
            <div className='gray px-1'>·</div>
            <span className='purple'>{getNumberUnit(distance)}m</span>
          </div>
        </div>
      </div>
      <div
        className='flex-center'
        onClick={() => {
          // onClickItem({ placeId, photoUrl, name })
        }}
      >
        {isAdded ? <IconUi iconName='remove-btn'></IconUi> : <IconUi iconName='add-btn'></IconUi>}
      </div>
      {/* <div></div> */}
      {/* <div className='info-container flex justify-between'>
        <div
          className='flex-col'
          onClick={() => {
            window.location.href = `http://what2eat.me/restaurant-detail/${placeId}`
            //window.location.href = `http://localhost:5500/restaurant-detail/${placeId}`
          }}
        ></div>
      </div> */}
    </li>
  )
}

export default VotePlaceItem
