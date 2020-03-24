import * as React from 'react'
import { getNumberUnit } from '../utils/number-util'
import { IonImg, IonRippleEffect } from '@ionic/react'

import './VotePlaceItem.scss'
import IconUi from './ui/IconUi'
import ReviewStar from './ReviewStar'
import { useHistory } from 'react-router-dom'
import { connect } from '../redux/redux-connect'
import { setRestaurantDistance } from '../redux/restaurant-detail/restaurant-detail-actions'

interface IOwnProps {
  placeId: string
  name: string
  rating: number
  userRatingsTotal: number
  photoUrl: string
  distance: string
  isAdded: boolean
  onClickItem: Function
  isReadOnly?: boolean
}
interface IStateProps {}

interface IDispatchProps {
  setRestaurantDistance: typeof setRestaurantDistance
}
interface IVotePlace {
  placeId: string
  name: string
  rating: number
  userRatingsTotal: number
  photoUrl: string
  distance: string
  isAdded: boolean
  onClickItem: Function
  isReadOnly?: boolean
}

const VotePlaceItem: React.FunctionComponent<IOwnProps & IStateProps & IDispatchProps> = ({
  placeId,
  name,
  rating,
  userRatingsTotal,
  photoUrl,
  distance,
  isAdded,
  onClickItem,
  setRestaurantDistance,
  isReadOnly = false
}) => {
  const history = useHistory()
  return (
    <li
      key={placeId}
      className='item-container'
      onClick={() => {
        setRestaurantDistance(getNumberUnit(distance))
        history.push(`/restaurant-detail/${placeId}`)
      }}
    >
      <div
        className='image-container relative'
        style={{
          backgroundImage: `url(${photoUrl || '/assets/img/list-place-thumb-empty.svg'})`,
          backgroundSize: photoUrl ? 'cover' : 'initial'
        }}
      >
        {isReadOnly && (
          <div className='bg-black-opacity-60 absolute w-full h-full white text-xl flex-center already-added'>
            이미 투표지에 추가되어 있음
          </div>
        )}
        <IonImg src='/assets/img/vote-place-thumb-holder.png' alt='' />
      </div>
      <div className='info-container flex justify-between relative bottom-0'>
        <div className='flex-col'>
          <div className='text-17'>{name}</div>
          <div className='mt-1 flex text-base leading-none'>
            <ReviewStar rating={rating} userRatingsTotal={userRatingsTotal}></ReviewStar>
            <div className='gray px-1'>·</div>
            <span className='purple'>{getNumberUnit(distance)}m</span>
          </div>
        </div>

        <div
          onClick={e => {
            e.stopPropagation()
            onClickItem({ placeId, photoUrl, name })
          }}
          className={isReadOnly ? 'hidden' : ''}
        >
          <IconUi className={`${!isAdded ? 'hidden' : 'iconRemove'}`} iconName='remove-btn'></IconUi>
          <IconUi className={`${isAdded ? 'hidden' : 'iconAdd'}`} iconName='add-btn'></IconUi>
        </div>
      </div>
    </li>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: () => ({}),
  mapDispatchToProps: {
    setRestaurantDistance
  },
  component: VotePlaceItem
})
