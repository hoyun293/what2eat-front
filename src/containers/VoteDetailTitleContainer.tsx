import React, { useEffect, useState } from 'react'
import moment from '../utils/moment-util'

import { connect } from '../redux/redux-connect'
import IconUi from '../components/ui/IconUi'

import './VoteDetailTitleContainer.scss'
import ShareLink from '../components/ShareLink'
import { IVoteDetail } from '../models/vote'

interface IOwnProps {
  themeNum: number
  voteUrl: string
}
interface IStateProps {
  vote: IVoteDetail
}
interface IDispatchProps {}

const VoteDetailTitleContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  themeNum,
  voteUrl,
  vote
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false)

  useEffect(() => {}, []) // eslint-disable-line

  return (
    <div className='vote-detail-title-container'>
      <div className='flex flex-1 mt-3'>
        <div className='flex items-end text-base white w-full'>
          {moment(vote.voteEndDtm).format('MM.DD(dd) A hh:mm')} 마감
        </div>
        <div className='w-full'>
          <img className='w-full' src={`/assets/img/vote-theme-${themeNum}.svg`} alt='' />
        </div>
      </div>
      <div className='text-xxxl white text-bold'>{vote.voteName}</div>

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
  mapStateToProps: ({ voteDetail }) => ({
    vote: voteDetail.vote
  }),
  mapDispatchToProps: {},
  component: VoteDetailTitleContainer
})
