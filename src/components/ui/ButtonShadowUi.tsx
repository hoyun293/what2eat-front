import * as React from 'react'
import { IonButton } from '@ionic/react'

import './ButtonShadowUi.scss'

interface IButtonShadowUiProps {
  color: string
  text: string
  onClick?: Function
  disabled?: boolean
  className?: string
}

const ButtonShadowUi: React.FunctionComponent<IButtonShadowUiProps> = ({
  text = '',
  color = 'yellow',
  onClick = () => {},
  className = '',
  disabled = false
}) => {
  return (
    <div className={`button-shadow ${className}`}>
      <img className='button-shadow__gradient' src='/assets/bg/bg-gray-gradient.svg' alt='' />
      <div className='button-shadow__container'>
        <IonButton
          className='p-4 pt-3 m-0'
          disabled={disabled}
          expand='block'
          color={color}
          onClick={() => onClick()}
        >
          {text}
        </IonButton>
      </div>
    </div>
  )
}

export default ButtonShadowUi
