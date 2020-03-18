import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { getNumberUnit } from '../utils/number-util'

import './VoteDetailPlaceListItem.scss'
import IconUi from './ui/IconUi'
import {
  setIsRestaurantPage,
  setRestaurantDistance
} from '../redux/restaurant-detail/restaurant-detail-actions'
import { connect } from '../redux/redux-connect'

interface IOwnProps {
  placeId: string
  name: string
  photoUrl: string
  voteCount: number
  distance: string
  isAdded: boolean
  isMostVoted: boolean
}
interface IOwnProps2 {
  placeId: string
  name: string
  photoUrl: string
  voteCount: number
  distance: string
  isAdded: boolean
  isMostVoted: boolean
  onClickItem: Function
  isMultiVote: boolean
}

interface IStateProps {}
interface IDispatchProps {
  setIsRestaurantPage: typeof setIsRestaurantPage
  setRestaurantDistance: typeof setRestaurantDistance
}
interface IVoteDetailPlaceListItem {
  placeId: string
  name: string
  photoUrl: string
  voteCount: number
  distance: string
  isAdded: boolean
  isMostVoted: boolean
}

export interface IVoteDetailPlaceListItemEdit extends IVoteDetailPlaceListItem {
  onClickItem: Function
  isMultiVote: boolean
}

const VoteDetailPlaceListItemEditComponent: React.FC<IOwnProps2 & IStateProps & IDispatchProps> = ({
  placeId,
  name,
  photoUrl,
  voteCount,
  distance,
  isAdded,
  isMostVoted,
  isMultiVote,
  onClickItem,
  setIsRestaurantPage,
  setRestaurantDistance
}) => {
  const history = useHistory()

  return (
    <li
      key={placeId}
      className={`flex w-full justify-between br-xxlg bg-white relative py-4 px-4 my-4 ${isMostVoted &&
        'most-voted'}`}
    >
      {isMostVoted && <IconUi iconName='most-voted' className='absolute left-0 top-0'></IconUi>}
      <div
        className='flex'
        onClick={() => {
          history.push(`/restaurant-detail/${placeId}`)
          setRestaurantDistance(getNumberUnit(distance))
          setIsRestaurantPage(false)
        }}
      >
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
        onClick={e => {
          onClickItem(placeId, isMultiVote)
        }}
      >
        <IconUi className={`${!isAdded && 'hidden'}`} iconName='vote-on'></IconUi>
        <IconUi className={`${isAdded && 'hidden'}`} iconName='vote-off'></IconUi>
      </div>
    </li>
  )
}
//window.location.href = `http://what2eat.me/restaurant-detail/${placeId}`

const VoteDetailPlaceListItemComponent: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  placeId,
  name,
  photoUrl,
  voteCount,
  distance,
  isAdded,
  isMostVoted,
  setIsRestaurantPage,
  setRestaurantDistance
}) => {
  const history = useHistory()

  return (
    <li
      key={placeId}
      className={`flex w-full justify-between br-xxlg bg-white py-4 relative px-4 my-4 ${isMostVoted &&
        'most-voted'}`}
    >
      {isMostVoted && <IconUi iconName='most-voted' className='absolute left-0 top-0'></IconUi>}
      <div
        className='flex'
        onClick={() => {
          history.push(`/restaurant-detail/${placeId}`)
          setRestaurantDistance(getNumberUnit(distance))
          setIsRestaurantPage(false)
        }}
      >
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
      <div className='flex-center'>{isAdded && <IconUi iconName='vote-done'></IconUi>}</div>
    </li>
  )
}
export const VoteDetailPlaceListItem = connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: () => ({}),
  mapDispatchToProps: { setIsRestaurantPage, setRestaurantDistance },
  component: VoteDetailPlaceListItemComponent
})
export const VoteDetailPlaceListItemEdit = connect<IOwnProps2, IStateProps, IDispatchProps>({
  mapStateToProps: () => ({}),
  mapDispatchToProps: { setIsRestaurantPage, setRestaurantDistance },
  component: VoteDetailPlaceListItemEditComponent
})
