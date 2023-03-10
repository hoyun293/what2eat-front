import React from 'react'
interface IOwnProps {}
interface IStateProps {
  photoUrl: string
  key: number
  onClick: Function
}
interface IDispatchProps {}

const RestaurantPhotoSlideContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  photoUrl,
  key,
  onClick
}) => {
  return (
    <div className='foodPhotoBox'>
      <img
        className='foodPhoto'
        alt=''
        src={photoUrl}
        onClick={() => {
          onClick()
        }}
      ></img>
    </div>
  )
}

export default RestaurantPhotoSlideContainer
