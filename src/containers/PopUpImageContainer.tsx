import React from 'react'
import './PopUpImageContainer.scss'

interface IOwnProps {}
interface IStateProps {
  photoUrl: string
  onClick: Function
}
interface IDispatchProps {}

const PopUpImageContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ photoUrl, onClick }) => {
  return (
    <div className='popUpParent'>
      <img
        className='popUpImage'
        src={photoUrl}
        alt=''
        onClick={() => {
          onClick()
        }}
      ></img>
    </div>
  )
}

export default PopUpImageContainer
