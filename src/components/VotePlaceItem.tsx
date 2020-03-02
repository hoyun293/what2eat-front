import * as React from 'react'
import { getNumberUnit } from '../utils/number-util'

import './VotePlaceItem.scss'
import IconUi from './ui/IconUi'
import ReviewStar from './ReviewStar'
import { useHistory } from 'react-router-dom'

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
  const history = useHistory()
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
            history.push(`/restaurant-detail/${placeId}`)
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
          <IconUi className={`${!isAdded && 'hidden'}`} iconName='remove-btn'></IconUi>
          <IconUi className={`${isAdded && 'hidden'}`} iconName='add-btn'></IconUi>
        </div>
      </div>
    </li>
  )
}

export default VotePlaceItem
