import * as React from 'react'
import { IonButton } from '@ionic/react'

import './ButtonShadowUi.scss'

interface IButtonShadowUiProps {
  color: string
  text: string
  onClick: Function
}

const ButtonShadowUi: React.FunctionComponent<IButtonShadowUiProps> = ({
  text = '',
  color = 'yellow',
  onClick
}) => {
  return (
    <div className='button-shadow__container'>
      <IonButton className='m-4 mt-3' expand='block' color={color} onClick={() => onClick()}>
        {text}
      </IonButton>
    </div>
  )
}

export default ButtonShadowUi
