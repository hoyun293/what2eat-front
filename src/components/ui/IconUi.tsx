import * as React from 'react'
import { IonSpinner, IonRippleEffect } from '@ionic/react'

import './IconUi.scss'

interface IIconUiProps {
  iconName: string
  className?: string
  onClick?: Function
  isLoading?: boolean
}

const IconUi: React.FunctionComponent<IIconUiProps> = ({
  iconName,
  className = '',
  isLoading = false,
  onClick = () => {}
}) => {
  const iconSrc = `assets/icon/${iconName}.svg`
  return (
    <div className={className} onClick={() => onClick()}>
      {isLoading ? (
        <IonSpinner name='crescent' color='tertiary' />
      ) : iconName === 'star-full' || iconName === 'star-half' || iconName === 'star-empty' ? (
        <img className='reviewStar' src={iconSrc} alt='' />
      ) : (
        <img src={iconSrc} alt='' />
      )}
    </div>
  )
}

export default IconUi
