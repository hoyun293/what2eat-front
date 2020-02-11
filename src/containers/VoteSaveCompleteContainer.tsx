import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { IonToast, IonButton } from '@ionic/react'
import copy from 'copy-to-clipboard'
import Helmet from 'react-helmet'

import { connect } from '../redux/redux-connect'
import config from '../config'

import './VoteSaveCompleteContainer.scss'

interface IOwnProps {}
interface IStateProps {}
interface IDispatchProps {}
declare const Kakao: any

const VoteSaveCompleteContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = () => {
  const history = useHistory()
  const [isShowToast, setIsShowToast] = useState(false)
  const handleScriptInject = ({ scriptTags }: any) => {
    if (scriptTags) {
      const scriptTag = scriptTags[0]
      scriptTag.onload = () => {
        if (!Kakao.isInitialized()) {
          Kakao.init(config.KAKAO_JS_KEY)
        }
      }
    }
  }

  const shareKakao = () => {
    const url = 'https://what2eat.me'
    if (isMobile) {
      return Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '투표 공유하기',
          photoUrl: '/assets/img/logo.png',
          link: { mobileWebUrl: url, webUrl: url }
        },
        buttons: [
          {
            title: '앱에서 바로 확인',
            link: { mobileWebUrl: url, webUrl: url }
          }
        ],
        success: () => {},
        fail: () => {
          alert('카카오톡 공유하기를 지원하지 않는 환경입니다.')
        }
      })
    } else {
      copy(url)
      setIsShowToast(true)
    }
  }

  return (
    <div className='bg-yellow h-full px-container'>
      <Helmet
        script={[{ src: '//developers.kakao.com/sdk/js/kakao.min.js' }]}
        onChangeClientState={(newState, addedTags) => handleScriptInject(addedTags)}
      />
      <div className='text-xxxl text-bold pt-3 text-center'>
        투표가
        <br />
        생성되었습니다!
      </div>
      <div className='text-center pt-9'>
        <img className='text-center' src='/assets/img/vote-save-complete.svg' alt='' />
      </div>
      <div>
        <IonButton className='vote-button' onClick={() => shareKakao()} expand='block' color='white'>
          투표 공유하기
        </IonButton>
      </div>
      <div className='pt-2'>
        {/* TODO : 연동 필요 */}
        <IonButton className='vote-button' color='white' expand='block'>
          투표 하러가기
        </IonButton>
      </div>
      <div className='dark-gray text-xl text-center pt-4' onClick={() => history.push('/main')}>
        홈으로 이동
      </div>

      <IonToast
        isOpen={isShowToast}
        onDidDismiss={() => setIsShowToast(false)}
        message='클립보드에 복사되었습니다.'
        duration={1000}
      />
    </div>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: () => ({}),
  mapDispatchToProps: {},
  component: VoteSaveCompleteContainer
})
