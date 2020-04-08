import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IonButton, IonContent, IonImg } from '@ionic/react'

import { connect } from '../redux/redux-connect'
import { setUiIsLoader } from '../redux/ui/ui-actions'

import './VoteSaveCompleteContainer.scss'
import ShareLink from '../components/ShareLink'
import { IVoteForm } from '../models/vote'
import { Capacitor } from '@capacitor/core'
import { shareLink } from '../utils/branch-io-util'

interface IOwnProps {}
interface IStateProps {
  voteUrl: string
  voteForm: IVoteForm
}
interface IDispatchProps {
  setUiIsLoader: typeof setUiIsLoader
}

const VoteSaveCompleteContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteUrl,
  setUiIsLoader,
  voteForm,
}) => {
  const history = useHistory()
  const [isShowShare, setIsShowShare] = useState(false)

  return (
    <IonContent fullscreen>
      <div className='bg-yellow h-full px-container pt-12'>
        <div className='text-xxxl text-bold pt-3 text-center'>
          투표가
          <br />
          생성되었습니다!
        </div>
        <div className='mt-9'>
          <IonImg className='w-67 m-auto height-159' src='/assets/img/vote-save-complete.svg' alt='' />
        </div>
        <div>
          <IonButton
            className='vote-button'
            onClick={() => {
              if (Capacitor.isNative && Capacitor.platform === 'ios') {
                return shareLink(voteUrl, voteForm.voteName)
              }
              setIsShowShare(true)
              setUiIsLoader(true)
            }}
            expand='block'
            color='white'
          >
            투표 공유하기
          </IonButton>
        </div>
        <div className='pt-1'>
          <IonButton
            className='vote-button'
            color='white'
            expand='block'
            onClick={() => history.push(`/vote/${voteUrl}`)}
          >
            투표 하러가기
          </IonButton>
        </div>
        <div className='dark-gray text-xl text-center pt-4' onClick={() => history.push('/')}>
          홈으로 이동
        </div>
      </div>

      <ShareLink
        shareUrl={`vote/${voteUrl}`}
        title={voteForm.voteName}
        isOpen={isShowShare}
        setIsOpen={setIsShowShare}
      ></ShareLink>
    </IonContent>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteInsert }) => ({
    voteUrl: voteInsert.voteUrl,
    voteForm: voteInsert.voteForm,
  }),
  mapDispatchToProps: {
    setUiIsLoader,
  },
  component: VoteSaveCompleteContainer,
})
