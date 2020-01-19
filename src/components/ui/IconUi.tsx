import * as React from 'react'

import './IconUi.scss'

interface IIconUiProps {
  iconName: string
  onClick?: Function
}

const IconUi: React.FunctionComponent<IIconUiProps> = ({ iconName, onClick = () => {} }) => {
  const iconSrc = `assets/icon/${iconName}.svg`
  return (
    <div className='icon-container' onClick={() => onClick()}>
      <img src={iconSrc} alt='' />
    </div>
  )
}

export default IconUi
