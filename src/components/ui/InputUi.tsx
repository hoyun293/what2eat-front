import * as React from 'react'
import { IonInput } from '@ionic/react'

import './InputUi.scss'

interface IInputUiProps {
  placeholder?: string
  onChange: Function
  maxlength?: number
  value?: string
}

const InputUi: React.FunctionComponent<IInputUiProps> = ({ placeholder, onChange, maxlength, value }) => {
  return (
    <IonInput
      value={value}
      maxlength={maxlength}
      placeholder={placeholder}
      onIonInput={e => onChange(e)}
    ></IonInput>
  )
}

export default InputUi
