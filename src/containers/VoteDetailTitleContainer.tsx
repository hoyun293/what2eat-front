import React, { useEffect, useState } from 'react'
import moment from '../utils/moment-util'

import { connect } from '../redux/redux-connect'
import IconUi from '../components/ui/IconUi'

import './VoteDetailTitleContainer.scss'
import { useHistory } from 'react-router-dom'
import ShareLink from '../components/ShareLink'
import { IVoteDetail } from '../models/vote'
import { setVoteDetailUpdateVote } from '../redux/vote-update/vote-update-actions'

interface IOwnProps {
  themeNum: number
  voteUrl: string
}
interface IStateProps {
  vote: IVoteDetail
}
interface IDispatchProps {
  setVoteDetailUpdateVote: typeof setVoteDetailUpdateVote
}

const VoteDetailTitleContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  themeNum,
  voteUrl,
  vote,
  setVoteDetailUpdateVote
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false)

  useEffect(() => {}, []) // eslint-disable-line
  const history = useHistory()

  return (
    <div className='vote-detail-title-container'>
      <div className='flex flex-1 mt-3'>
        <div className='flex items-end text-base white w-full'>
          {vote.voteEndDtm && `${moment(vote.voteEndDtm).format('MM.DD(dd) A hh:mm')} 마감`}
        </div>
        <div className='w-full'>
          <img className='w-full' src={`/assets/img/vote-theme-${themeNum}.svg`} alt='' />
        </div>
      </div>
      <div className='text-xxxl white text-bold'>{vote.voteName}</div>

      <div className='flex flex-1 pt-6'>
        <div
          className='bg-white-opacity-30 flex-center white w-full br-md py-4'
          onClick={() => {
            setVoteDetailUpdateVote(vote)
            history.push('/vote-update')
          }}
        >
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
  mapDispatchToProps: {
    setVoteDetailUpdateVote
  },
  component: VoteDetailTitleContainer
})
