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
    <div
      className='popUpParent'
      onClick={() => {
        console.log('test')
        onClick()
      }}
    >
      <img className='popUpImage' src={photoUrl} alt=''></img>
    </div>
  )
}

export default PopUpImageContainer
