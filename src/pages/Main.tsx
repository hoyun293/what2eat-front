import React, { useEffect, useState } from 'react'
import { IonContent, IonPage, IonImg, useIonViewWillEnter, IonRippleEffect } from '@ionic/react'
import { Plugins, Capacitor } from '@capacitor/core'
import { useHistory } from 'react-router-dom'

import { connect } from '../redux/redux-connect'
import { selectVoteRooms } from '../redux/vote-room/vote-room-actions'
import MainFormVoteRoomListContainer from '../containers/MainFormVoteRoomListContainer'
import { signIn } from '../redux/user/user-actions'
import './Main.scss'
import { IVoteRoom } from '../models/vote-room'
import { setVoteInsertInit, setVoteInsertStep } from '../redux/vote-insert/vote-insert-actions'
import { setUiIsLoader, setUiToast } from '../redux/ui/ui-actions'
import { setVoteDetailInit } from '../redux/vote-detail/vote-detail-actions'

interface IOwnProps {}
interface IStateProps {
  voteRooms: IVoteRoom[]
  voteInsertStep: number
}
interface IDispatchProps {
  selectVoteRooms: typeof selectVoteRooms
  signIn: typeof signIn
  setVoteInsertInit: typeof setVoteInsertInit
  setUiIsLoader: typeof setUiIsLoader
  setUiToast: typeof setUiToast
  setVoteInsertStep: typeof setVoteInsertStep
  setVoteDetailInit: typeof setVoteDetailInit
}

const Main: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  selectVoteRooms,
  voteRooms,
  setVoteInsertInit,
  setUiIsLoader,
  setUiToast,
  voteInsertStep,
  setVoteInsertStep,
  setVoteDetailInit
}) => {
  const history = useHistory()
  const [toggle, setToggle] = useState(0)
  const [index, setIndex] = useState(0)
  const [votes, setVotes] = useState<Array<IVoteRoom>>([])

  const compareDate = (date1: string, date2: string) => {
    var year1 = Number(date1.substring(0, 4))
    var year2 = Number(date2.substring(0, 4))
    var month1 = Number(date1.substring(5, 7))
    var month2 = Number(date2.substring(5, 7))
    var day1 = Number(date1.substring(8, 10))
    var day2 = Number(date2.substring(8, 10))
    var time1 =
      Number(date1.substring(11, 13)) * 3600 +
      Number(date1.substring(14, 16)) * 60 +
      +Number(date1.substring(17, 19))
    var time2 =
      Number(date2.substring(11, 13)) * 3600 +
      Number(date2.substring(14, 16)) * 60 +
      +Number(date2.substring(17, 19))

    if (year1 > year2) {
      return year2 - year1
    } else if (year1 < year2) {
      return year2 - year1
    } else {
      if (month1 > month2) {
        return month2 - month1
      } else if (month1 < month2) {
        return month2 - month1
      } else {
        if (day1 > day2) {
          return day2 - day1
        } else if (day1 < day2) {
          return day2 - day1
        } else {
          if (time1 > time2) {
            return time2 - time1
          } else {
            return time2 - time1
          }
        }
      }
    }
  }
  const sortInCreate = () => {
    votes.sort((a: IVoteRoom, b: IVoteRoom): number => {
      return compareDate(a.voteCreateDtm, b.voteCreateDtm)
    })
  }
  const sortInEnd = () => {
    votes.sort((a: IVoteRoom, b: IVoteRoom): number => {
      return -1 * compareDate(a.voteEndDtm, b.voteEndDtm)
    })
  }

  // 최초 페이지 로딩시 로더를 보여줍니다.
  useEffect(() => {
    setUiIsLoader(true)
  }, []) // eslint-disable-line

  let timePeriodToExit = 2000
  let lastTimeBackPress = 0

  const exitApp = () => {
    if (Date.now() - lastTimeBackPress < timePeriodToExit) {
      Plugins.App.exitApp()
    } else {
      lastTimeBackPress = Date.now()
      setUiToast({ isOpen: true, message: '한 번 더 누르시면 앱을 종료합니다' })
    }
  }

  useEffect(() => {
    if (Capacitor.isNative) {
      Plugins.App.addListener('backButton', e => {
        if (history.location.pathname === '/') {
          exitApp()
        } else if (history.location.pathname === '/vote-save') {
          history.push('/')
        } else {
          history.goBack()
        }
      })
    }
  }, []) // eslint-disable-line

  useIonViewWillEnter(() => {
    setUiIsLoader(false)
    // TODO: 투표방 생성 이후, 페이지 재진입시에 호출이 필요해서 필요합니다.
    // 제가 임의로 수정했으니, 한번 확인해주셔요 ^^
    selectVoteRooms()
    setIndex(index + 1)
  })

  useEffect(() => {
    // if (index === 0) {
    //   selectVoteRooms()
    //   setIndex(index + 1)
    // }

    //selectVoteRooms(pagingNum, bool)  onClick 시 pagingNum, bool만 바꾸게 해야되지 않을까?
    // toggle 값 바뀌면 useEffect가 실행되고 selectVoteRooms가 2번실행될듯?
    //console.log('addVote start')

    if (index === 1) {
      setVotes(voteRooms)
      setIndex(index + 1)
    }

    if (index === 2) {
      if (toggle % 2 === 1) {
        sortInEnd()
      } else {
        sortInCreate()
      }
      setIndex(index + 1)
    }
  }, [voteRooms, votes]) // eslint-disable-line

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='mb-1 flex px-container'>
          <div className='pageHeadPhrase text-xxxl'>
            오늘도 맛있는
            <br />
            하루되세요
          </div>
          <IonImg className='toggleIcon' src='/assets/icon/sorting btn_icon.svg' alt='' />
          {toggle % 2 === 1 && (
            <div
              className='toggleName text-lg'
              onClick={() => {
                setToggle(toggle + 1)
                sortInCreate()
                setVotes(votes)
              }}
            >
              마감순
            </div>
          )}
          {toggle % 2 === 0 && (
            <div
              className='toggleName text-lg'
              onClick={() => {
                setToggle(toggle + 1)
                sortInEnd()
                setVotes(votes)
              }}
            >
              최신순
            </div>
          )}
        </div>
        <div
          className='background-img'
          style={{
            height: voteRooms ? (voteRooms.length > 5 ? 'auto' : '100%') : '100%'
          }}
        >
          <MainFormVoteRoomListContainer sortedVoteRooms={votes} />
          <div
            className='bottom-floating ion-activatable ripple-parent br-full'
            onClick={() => {
              setVoteInsertInit()
              setVoteDetailInit()
              history.push('/vote-save')
            }}
          >
            <IonRippleEffect></IonRippleEffect>
            <img className='btn_add' src='/assets/img/floating_btn_add.svg' alt='' />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteRoom, voteInsert }) => ({
    voteRooms: voteRoom.voteRooms,
    voteInsertStep: voteInsert.step
  }),
  mapDispatchToProps: {
    selectVoteRooms,
    signIn,
    setVoteInsertInit,
    setUiIsLoader,
    setUiToast,
    setVoteInsertStep,
    setVoteDetailInit
  },
  component: Main
})
