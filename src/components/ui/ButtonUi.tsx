import * as React from 'react'
import { IonButton } from '@ionic/react'

import './ButtonUi.scss'

interface IButtonUiProps {
  color: string
  text: string
  onClick?: Function
  height?: string
}

const ButtonUi: React.FunctionComponent<IButtonUiProps> = ({
  color = 'yellow',
  text,
  height = '8.2rem',
  onClick = () => {}
}) => {
  return (
    <div className='button'>
      <IonButton
        className='button__container text-xl p-4 pt-3 m-0'
        expand='block'
        color={color}
        style={{ height }}
        onClick={() => onClick()}
      >
        {text}
      </IonButton>
    </div>
  )
}

export default ButtonUi
