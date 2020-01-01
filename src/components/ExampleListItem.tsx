import * as React from 'react'

interface IExampleListItemProps {
  title: string
  user: string
}

const ExampleListItem: React.FunctionComponent<IExampleListItemProps> = props => {
  return (
    <li>
      <h1>{props.title}</h1>
      <div>{props.user}</div>
    </li>
  )
}

export default ExampleListItem
