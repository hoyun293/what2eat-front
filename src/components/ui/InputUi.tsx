import * as React from 'react'
import { IonInput } from '@ionic/react'

import './InputUi.scss'

interface IInputUiProps {
  placeholder?: string
}

const InputUi: React.FunctionComponent<IInputUiProps> = ({ placeholder }) => {
  return <IonInput placeholder={placeholder}></IonInput>
}

export default InputUi
