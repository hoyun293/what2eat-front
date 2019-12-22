import * as React from 'react'
import { IonSpinner } from '@ionic/react'

import './SpinnerUi.scss'

interface ILoaderUiProps {
  isFull?: boolean
  color?: string
}

const LoaderUi: React.FunctionComponent<ILoaderUiProps> = props => {
  return (
    <div className='spinner'>
      <IonSpinner color={props.color ? props.color : ''} className={props.isFull ? 'spinner--full' : ''} />
    </div>
  )
}

export default LoaderUi
