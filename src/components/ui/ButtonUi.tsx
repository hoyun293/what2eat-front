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
  height = '5.2rem',
  onClick = () => {}
}) => {
  return (
    <IonButton expand='block' color={color} style={{ height }} onClick={() => onClick()}>
      {text}
    </IonButton>
  )
}

export default ButtonUi
