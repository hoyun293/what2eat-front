import * as React from 'react'
import { IonButton } from '@ionic/react'

import './ButtonUi.scss'

interface IButtonUiProps {
  color: string
  text: string
}

const ButtonUi: React.FunctionComponent<IButtonUiProps> = ({ text = '', color = 'yellow' }) => {
  return (
    <div className='button-no-shadow'>
      <IonButton className='button-no-shadow__container p-4 pt-3 m-0' expand='block' color={color}>
        {text}
      </IonButton>
    </div>
  )
}

export default ButtonUi
