import * as React from 'react'

import './SpinnerUi.scss'

interface ILoaderUiProps {
  isFull?: boolean
  color?: string
}

const LoaderUi: React.FunctionComponent<ILoaderUiProps> = props => {
  return (
    <div className='spinner'>
      <img className={props.isFull ? 'spinner--full' : ''} src='/assets/loader.gif' alt='' />
    </div>
  )
}

export default LoaderUi
