import * as React from 'react'
import { getNumberUnit } from '../utils/number-util'

import './VotePlaceItem.scss'
import IconUi from './ui/IconUi'
import ReviewStar from './ReviewStar'

interface IVotePlace {
  placeId: string
  name: string
  rating: number
  userRatingsTotal: number
  photoUrl: string
  distance: string
  isAdded: boolean
  onClickItem: Function
}

const VotePlaceItem: React.FunctionComponent<IVotePlace> = ({
  placeId,
  name,
  rating,
  userRatingsTotal,
  photoUrl,
  distance,
  isAdded,
  onClickItem
}) => {
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
