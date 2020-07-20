import React, { useEffect, useState } from 'react'
import { IonImg } from '@ionic/react'
import { Capacitor } from '@capacitor/core'
import { useHistory } from 'react-router-dom'

import moment from '../utils/moment-util'
import { connect } from '../redux/redux-connect'
import IconUi from '../components/ui/IconUi'

import './VoteDetailTitleContainer.scss'
import ShareLink from '../components/ShareLink'
import { IVoteDetail } from '../models/vote'
import { setVoteDetailUpdateVote } from '../redux/vote-update/vote-update-actions'
import { setUiIsLoader } from '../redux/ui/ui-actions'
import { shareLink } from '../utils/branch-io-util'

interface IOwnProps {
  themeNum: number
  voteUrl: string
}
interface IStateProps {
  vote: IVoteDetail
  isVoteEnd: boolean
}
interface IDispatchProps {
  setVoteDetailUpdateVote: typeof setVoteDetailUpdateVote
  setUiIsLoader: typeof setUiIsLoader
}

const VoteDetailTitleContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  themeNum,
  voteUrl,
  vote,
  setVoteDetailUpdateVote,
  setUiIsLoader,
  isVoteEnd,
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false)

  useEffect(() => {}, []) // eslint-disable-line
  const history = useHistory()

  return (
    <div className='vote-detail-title-container'>
      <div className='flex flex-1 mt-3'>
        <div className='flex items-end text-sm white w-full'>
          {vote.voteEndDtm && `${moment(vote.voteEndDtm).format('MM.DD(dd) A hh:mm')} 마감`}
        </div>
        <div className='w-full height-100'>
          <IonImg className='w-full' src={`/assets/img/vote-theme-${themeNum}.svg`} alt='' />
        </div>
      </div>
      <div className='text-xxxl white text-bold'>{vote.voteName}</div>
      <div className='flex flex-1 pt-6'>
        {isVoteEnd === false && (
          <div
            className='bg-white-opacity-30 flex-center white w-full br-md py-2'
            onClick={() => {
              setVoteDetailUpdateVote(vote)
              history.push('/vote-update')
            }}
          >
            <IconUi iconName='edit' className='pr-1 mt-2'></IconUi> 편집
          </div>
        )}
        {isVoteEnd === false && (
          <div
            className='ml-2 flex-center bg-white w-full br-md py-2'
            onClick={() => {
              if (Capacitor.isNative && Capacitor.platform === 'ios') {
                return shareLink(voteUrl, vote.voteName)
              }
              setIsShareOpen(true)
              setUiIsLoader(true)
            }}
          >
            <IconUi iconName='share' className='pr-1 mt-2'></IconUi> 투표초대
          </div>
        )}
      </div>

      <ShareLink
        sharePath={`vote/${voteUrl}`}
        title={vote.voteName}
        isOpen={isShareOpen}
        setIsOpen={setIsShareOpen}
      ></ShareLink>
    </div>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteDetail }) => ({
    vote: voteDetail.vote,
    isVoteEnd: voteDetail.isVoteEnd,
  }),
  mapDispatchToProps: {
    setVoteDetailUpdateVote,
    setUiIsLoader,
  },
  component: VoteDetailTitleContainer,
})
