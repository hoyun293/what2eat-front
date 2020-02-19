import React from 'react'
import { IonSlides, IonSlide } from '@ionic/react'

interface IOwnProps {}
interface IStateProps {
  photoUrl: string
  key: number
}
interface IDispatchProps {}

const RestaurantPhotoSlideContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  photoUrl,
  key
}) => {
  return (
    <div className='foodPhotoBox'>
      <img className='foodPhoto' alt='' src={photoUrl}></img>
    </div>
  )
}

export default RestaurantPhotoSlideContainer
