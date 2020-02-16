import React from 'react'
import { IonSlides, IonSlide } from '@ionic/react'

interface IOwnProps {}
interface IStateProps {
  photoUrl: string
}
interface IDispatchProps {}

const RestaurantPhotoSlideContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ photoUrl }) => {
  return (
    <IonSlide>
      <div className='foodPhotoBox flex justify-between ml-5 mr-5'>
        <img className='foodPhoto' src={photoUrl}></img>
        <img className='foodPhoto' src=''></img>
        <img className='foodPhoto' src=''></img>
      </div>
    </IonSlide>
  )
}

export default RestaurantPhotoSlideContainer
