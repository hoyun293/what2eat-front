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
  title: string
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
declare const branch: any

const shareKakao = (shareUrl: string, imageUrl: string, title: string, success = () => {}) => {
  const url = `${config.LINK_URL}/${shareUrl}`

  return branch.link(
    {
      data: {
        $deeplink_path: shareUrl
      }
    },
    (err: any, link: any) => {
      console.log(err)
      console.log(link)

      if (isMobile) {
        return Kakao.Link.sendDefault({
          objectType: 'feed',
          content: {
            title,
            imageUrl,
            link: { mobileWebUrl: link, webUrl: link }
          },
          buttons: [
            {
              title: '투표하러가기',
              link: { mobileWebUrl: link, webUrl: link }
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
  )
}

const copyUrl = (urlPath: string, success = () => {}) => {
  const url = `${config.WEB_URL}${urlPath}`
  if (copy(url)) {
    success()
  }
}

const ShareLink: React.FunctionComponent<IOwnProps & IStateProps & IDispatchProps> = ({
  shareUrl,
  title,
  thumbnailUrl = `${config.WEB_URL}/assets/img/meta.png`,
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
    <IonPopover
      isOpen={isOpen}
      cssClass='cart-list-modal'
      onWillPresent={() => setUiIsLoader(false)}
      onDidDismiss={() => setIsOpen(false)}
    >
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
              shareKakao(shareUrl, thumbnailUrl, title, () => {
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
