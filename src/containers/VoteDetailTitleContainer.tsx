import React, { useEffect, useState } from 'react'

import { connect } from '../redux/redux-connect'
import IconUi from '../components/ui/IconUi'

import './VoteDetailTitleContainer.scss'
import ShareLink from '../components/ShareLink'

interface IOwnProps {
  themeNum: number
  voteUrl: string
}
interface IStateProps {}
interface IDispatchProps {}

const VoteDetailTitleContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  themeNum,
  voteUrl
}) => {
  const [isShareOpen, setIsShareOpen] = useState(true)

  useEffect(() => {}, []) // eslint-disable-line

  return (
    <div className='vote-detail-title-container'>
      <div className='flex flex-1 mt-3'>
        <div className='flex items-end text-base white w-full'>01.15(수) 오전 11:30 마감</div>
        <div className='w-full'>
          <img className='w-full' src={`/assets/img/vote-theme-${themeNum}.svg`} alt='' />
        </div>
      </div>
      <div className='text-xxxl white text-bold'>이번달 저녁회식 뭐먹죠</div>

      <div className='flex flex-1 pt-6'>
        <div className='bg-white-opacity-30 flex-center white w-full br-md py-4'>
          <IconUi iconName='edit' className='pr-1'></IconUi> 편집
        </div>
        <div className='ml-2 flex-center bg-white w-full br-md py-4' onClick={() => setIsShareOpen(true)}>
          <IconUi iconName='share' className='pr-1'></IconUi> 투표초대
        </div>
      </div>

      <ShareLink shareUrl={`/vote/${voteUrl}`} isOpen={isShareOpen} setIsOpen={setIsShareOpen}></ShareLink>
    </div>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteDetail }) => ({}),
  mapDispatchToProps: {},
  component: VoteDetailTitleContainer
})
