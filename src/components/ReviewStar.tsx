import React from 'react'
import _ from 'lodash'
import IconUi from './ui/IconUi'

interface IReviewStarProps {
  rating: number
  userRatingsTotal: number
  className?: string
}

const ReviewStar: React.FC<IReviewStarProps> = ({ rating = 0, userRatingsTotal = 0, className = '' }) => {
  const fullStarCount = Math.floor(rating)
  const halfStarCount = rating - fullStarCount >= 0.5 ? 1 : 0
  const emptyStarCount = 5 - fullStarCount - halfStarCount

  return (
    <ul className={`${className} flex items-center pl-0`}>
      <li className='text-base leading-none gray pr-1'>{rating}</li>
      {_.map(new Array(fullStarCount), (v, i) => (
        <li key={_.toString(i)}>
          <IconUi iconName='star-full'></IconUi>
        </li>
      ))}
      {halfStarCount === 1 && (
        <li>
          <IconUi iconName='star-half'></IconUi>
        </li>
      )}
      {_.map(new Array(emptyStarCount), (v, i) => (
        <li key={_.toString(i)}>
          <IconUi iconName='star-empty'></IconUi>
        </li>
      ))}
      <li className='pl-1 text-base leading-none gray'>({userRatingsTotal || 0})</li>
    </ul>
  )
}

export default ReviewStar
