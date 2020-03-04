import React from 'react'

import './SpinnerUi.scss'

interface ISpinnerUiProps {
  isFull?: boolean
  color?: string
}

const SpinnerUi: React.FunctionComponent<ISpinnerUiProps> = props => {
  return (
    <div className='spinner'>
      <img className={props.isFull ? 'spinner--full' : ''} src='/assets/loader.gif' alt='' />
    </div>
  )
}

export default SpinnerUi
