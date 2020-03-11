import * as React from 'react'
import { IonImg } from '@ionic/react'
import { getNumberUnit } from '../utils/number-util'

import './VoteDetailPlaceListItem.scss'
import IconUi from './ui/IconUi'

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

const VoteDetailPlaceListItemEdit: React.FunctionComponent<IVoteDetailPlaceListItemEdit> = ({
  placeId,
  name,
  photoUrl,
  voteCount,
  distance,
  isAdded,
  isMostVoted,
  isMultiVote,
  onClickItem
}) => {
  return (
    <li
      key={placeId}
      className={`flex w-full justify-between br-xxlg bg-white relative py-6 px-4 my-4 ${isMostVoted &&
        'most-voted'}`}
    >
      {isMostVoted && <IconUi iconName='most-voted' className='absolute left-0 top-0'></IconUi>}
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
      <div className='flex-center' onClick={() => onClickItem(placeId, isMultiVote)}>
        <IconUi className={`${!isAdded && 'hidden'}`} iconName='vote-on'></IconUi>
        <IconUi className={`${isAdded && 'hidden'}`} iconName='vote-off'></IconUi>
      </div>
    </li>
  )
}
//window.location.href = `http://what2eat.me/restaurant-detail/${placeId}`

const VoteDetailPlaceListItem: React.FunctionComponent<IVoteDetailPlaceListItem> = ({
  placeId,
  name,
  photoUrl,
  voteCount,
  distance,
  isAdded,
  isMostVoted
}) => {
  return (
    <li
      key={placeId}
      className={`flex w-full justify-between br-xxlg bg-white py-6 relative px-4 my-4 ${isMostVoted &&
        'most-voted'}`}
    >
      {isMostVoted && <IconUi iconName='most-voted' className='absolute left-0 top-0'></IconUi>}
      <div className='flex'>
        <IonImg src={photoUrl} alt='' className='br-lg place-image' />
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

export { VoteDetailPlaceListItemEdit, VoteDetailPlaceListItem }
