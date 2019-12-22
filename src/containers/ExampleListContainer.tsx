import * as React from 'react'
import * as _ from 'lodash'

import ExampleListItem from '../components/ExampleListItem'

interface IExampleListContainerProps {}

const items = [
  {
    title: '안녕!!',
    content: '내용입니다!'
  },
  {
    title: '안뇽!!!!',
    content: '내용입니다!'
  },
  {
    title: '안냥!!',
    content: '내용입니다!'
  }
]

const ExampleListContainer: React.FunctionComponent<IExampleListContainerProps> = props => {
  return (
    <ol>
      {_.map(items, v => (
        <ExampleListItem title={v.title} content={v.content} />
      ))}
    </ol>
  )
}

export default ExampleListContainer
