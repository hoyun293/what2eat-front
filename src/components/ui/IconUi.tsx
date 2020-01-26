import * as React from 'react'

import './IconUi.scss'

interface IIconUiProps {
  iconName: string
  className?: string
  onClick?: Function
}

const IconUi: React.FunctionComponent<IIconUiProps> = ({ iconName, className = '', onClick = () => {} }) => {
  const iconSrc = `assets/icon/${iconName}.svg`
  return (
    <div className={className} onClick={() => onClick()}>
      <img src={iconSrc} alt='' />
    </div>
  )
}

export default IconUi
