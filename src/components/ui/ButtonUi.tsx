import * as React from 'react'
import { IonButton } from '@ionic/react'

import './ButtonUi.scss'

interface IButtonUiProps {
  color: string
}

const ButtonUi: React.FunctionComponent<IButtonUiProps> = ({ color = 'yellow' }) => {
  return <IonButton expand='block' color={color}></IonButton>
}

export default ButtonUi
