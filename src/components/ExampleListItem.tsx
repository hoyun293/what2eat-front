import * as React from 'react'

interface IExampleListItemProps {
  title: string
  content: string
}

const ExampleListItem: React.FunctionComponent<IExampleListItemProps> = props => {
  return (
    <li>
      <h1>{props.title}</h1>
      <div>{props.content}</div>
    </li>
  )
}

export default ExampleListItem
