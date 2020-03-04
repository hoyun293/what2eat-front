import React, { useEffect } from 'react'
import './VotePlaceItem.scss'
import { IonPopover, IonImg } from '@ionic/react'

import { isMobile } from 'react-device-detect'
import copy from 'copy-to-clipboard'
import Helmet from 'react-helmet'

import { connect } from '../redux/redux-connect'

import config from '../config'
import { setUiToast, setUiIsLoader } from '../redux/ui/ui-actions'

interface IOwnProps {
  shareUrl: string
  isOpen: boolean
  thumbnailUrl?: string
  setIsOpen: Function
}
interface IStateProps {}
interface IDispatchProps {
  setUiToast: typeof setUiToast
  setUiIsLoader: typeof setUiIsLoader
}

declare const Kakao: any

const shareKakao = (shareUrl: string, imageUrl: string, success = () => {}) => {
  const url = `${config.WEB_URL}${shareUrl}`
  if (isMobile) {
    console.log(Kakao.Link)
    return Kakao.Link.sendDefault({
      // container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: '투표 공유하기',
        imageUrl,
        link: { mobileWebUrl: url, webUrl: url }
      },
      buttons: [
        {
          title: '앱에서 바로 확인',
          link: { mobileWebUrl: url, webUrl: url }
        }
      ],
      success,
      fail: () => {
        alert('카카오톡 공유하기를 지원하지 않는 환경입니다.')
      }
    })
  } else {
    copy(url)
    success()
  }
}

const copyUrl = (urlPath: string, success = () => {}) => {
  const url = `${config.WEB_URL}${urlPath}`
  if (copy(url)) {
    success()
  }
}

const ShareLink: React.FunctionComponent<IOwnProps & IStateProps & IDispatchProps> = ({
  shareUrl,
  thumbnailUrl = `${config.WEB_URL}/assets/img/logo.png`,
  isOpen,
  setIsOpen,
  setUiToast,
  setUiIsLoader
}) => {
  const handleScriptInject = ({ scriptTags }: any) => {
    if (scriptTags) {
      const scriptTag = scriptTags[0]
      scriptTag.onload = () => {
        if (!Kakao.isInitialized()) {
          Kakao.init(config.KAKAO_JS_KEY)
        }
        console.log('end')
      }
    }
  }

  return (
    <IonPopover isOpen={isOpen} cssClass='cart-list-modal' onWillPresent={() => setUiIsLoader(false)}>
      <Helmet
        script={[{ src: '//developers.kakao.com/sdk/js/kakao.min.js' }]}
        onChangeClientState={(newState, addedTags) => handleScriptInject(addedTags)}
      />
      <div>
        <div className='flex-center text-xl text-medium pt-5 pb-2'>투표 초대하기</div>
        <div className='flex flex-center'>
          <div
            id='kakao-link-btn'
            className='flex-col'
            onClick={() =>
              shareKakao(shareUrl, thumbnailUrl, () => {
                setIsOpen(false)
              })
            }
          >
            <IonImg src='/assets/img/share-kakao.png' className='w-20' alt='' />
            <div className='text-center text-xs dark-gray'>카카오톡</div>
          </div>
          <div
            className='flex-col ml-8'
            onClick={() =>
              copyUrl(shareUrl, () => {
                setIsOpen(false)
                setUiToast({ isOpen: true, message: '클립보드 복사에 성공하였습니다.' })
              })
            }
          >
            <IonImg src='/assets/img/share-link.svg' className='w-20' alt='' />
            <div className='text-center text-xs dark-gray'>URL</div>
          </div>
        </div>
        <div className='x-divider mt-2'></div>
        <div onClick={() => setIsOpen(false)} className='purple text-sm flex-center h-11'>
          닫기
        </div>
      </div>
    </IonPopover>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteRoom }) => ({
    voteRooms: voteRoom.voteRooms
  }),
  mapDispatchToProps: {
    setUiToast,
    setUiIsLoader
  },
  component: ShareLink
})
