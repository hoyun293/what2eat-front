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
import _ from 'lodash'

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
  setVoteDetailInit,
}) => {
  const history = useHistory()
  const [toggle, setToggle] = useState(0)
  const [index, setIndex] = useState(0)
  const [votes, setVotes] = useState<Array<IVoteRoom>>([])
  const [newVotes, setNewVotes] = useState<Array<IVoteRoom>>([])
  const [oldVotes, setOldVotes] = useState<Array<IVoteRoom>>([])
  const [voteToggle, setVoteToggle] = useState(0)
  const chooseNewVote = (date: string): boolean => {
    var today = new Date()
    var _date = new Date(
      Number(date.substring(0, 4)),
      Number(date.substring(5, 7)) - 1,
      Number(date.substring(8, 10))
    )
    var day = 60 * 60 * 24 * 1000
    if (Math.floor((today.getTime() - _date.getTime()) / day) > 7) {
      return false
    } else {
      return true
    }
  }
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
  const sortInCreate = (voteArr: Array<IVoteRoom>) => {
    voteArr.sort((a: IVoteRoom, b: IVoteRoom): number => {
      return compareDate(a.voteCreateDtm, b.voteCreateDtm)
    })
  }
  const sortInEnd = (voteArr: Array<IVoteRoom>) => {
    voteArr.sort((a: IVoteRoom, b: IVoteRoom): number => {
      return -1 * compareDate(a.voteEndDtm, b.voteEndDtm)
    })
  }

  // ?????? ????????? ????????? ????????? ???????????????.
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
      setUiToast({ isOpen: true, message: '??? ??? ??? ???????????? ?????? ???????????????' })
    }
  }

  useEffect(() => {
    if (Capacitor.isNative) {
      Plugins.App.addListener('backButton', (e) => {
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
    // TODO: ????????? ?????? ??????, ????????? ??????????????? ????????? ???????????? ???????????????.
    // ?????? ????????? ???????????????, ?????? ?????????????????? ^^
    selectVoteRooms()
    setIndex(index + 1)
  })

  useEffect(() => {
    //selectVoteRooms(pagingNum, bool)  onClick ??? pagingNum, bool??? ????????? ???????????? ??????????
    // toggle ??? ????????? useEffect??? ???????????? selectVoteRooms??? 2????????????????

    if (index === 1) {
      setVotes(voteRooms)
      // ???????????? ?????? ????????? ????????? ????????????.
      var newVoteArr = _.filter(voteRooms, (v) => {
        return chooseNewVote(v.voteCreateDtm) === true
      })
      var oldVoteArr = _.filter(voteRooms, (v) => {
        return chooseNewVote(v.voteCreateDtm) === false
      })

      if (voteToggle === 0) {
        if (toggle % 2 === 0) {
          sortInCreate(newVoteArr)
          setNewVotes(newVoteArr)
          setOldVotes(oldVoteArr)
        } else {
          sortInEnd(newVoteArr)
          setNewVotes(newVoteArr)
          setOldVotes(oldVoteArr)
        }
      } else {
        if (toggle % 2 === 0) {
          sortInCreate(oldVoteArr)
          setOldVotes(oldVoteArr)
          setNewVotes(newVoteArr)
        } else {
          sortInEnd(oldVoteArr)
          setOldVotes(oldVoteArr)
          setNewVotes(newVoteArr)
        }
      }
      setIndex(index + 1)
    }
  }, [voteRooms, votes]) // eslint-disable-line

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='mb-1 flex px-container'>
          <div className='pageHeadPhrase text-xxxl'>
            ????????? ?????????
            <br />
            ???????????????
          </div>
          <IonImg className='toggleIcon' src='/assets/icon/sorting btn_icon.svg' alt='' />
          {toggle % 2 === 1 && (
            <div
              className='toggleName text-lg'
              onClick={() => {
                setToggle(toggle + 1)
                if (voteToggle === 0) {
                  sortInCreate(newVotes)
                  setNewVotes(newVotes)
                } else {
                  sortInCreate(oldVotes)
                  setOldVotes(oldVotes)
                }
              }}
            >
              ?????????
            </div>
          )}
          {toggle % 2 === 0 && (
            <div
              className='toggleName text-lg'
              onClick={() => {
                setToggle(toggle + 1)
                if (voteToggle === 0) {
                  sortInEnd(newVotes)
                  setNewVotes(newVotes)
                } else {
                  sortInEnd(oldVotes)
                  setOldVotes(oldVotes)
                }
              }}
            >
              ?????????
            </div>
          )}
        </div>
        <div className='vote_choose'>
          <div className='vote_btns'>
            <div
              id='vote_new'
              className='vote_new'
              onClick={() => {
                setVoteToggle(0)
                var oldVote = document.getElementById('vote_old')
                var newVote = document.getElementById('vote_new')
                if (oldVote !== null) {
                  oldVote.style.color = 'black'
                  oldVote.style.backgroundColor = 'white'
                }
                if (newVote !== null) {
                  newVote.style.color = 'white'
                  newVote.style.backgroundColor = '#5f5cce'
                }
                if (toggle % 2 === 1) {
                  sortInEnd(newVotes)
                  setNewVotes(newVotes)
                } else {
                  sortInCreate(newVotes)
                  setNewVotes(newVotes)
                }
              }}
            >
              ?????? ??????
            </div>
            <div
              id='vote_old'
              className='vote_old'
              onClick={() => {
                setVoteToggle(1)
                var oldVote = document.getElementById('vote_old')
                var newVote = document.getElementById('vote_new')
                if (oldVote !== null) {
                  oldVote.style.color = 'white'
                  oldVote.style.backgroundColor = '#5f5cce'
                }
                if (newVote !== null) {
                  newVote.style.color = 'black'
                  newVote.style.backgroundColor = 'white'
                }
                if (toggle % 2 === 1) {
                  sortInEnd(oldVotes)
                  setOldVotes(oldVotes)
                } else {
                  sortInCreate(oldVotes)
                  setOldVotes(oldVotes)
                }
              }}
            >
              ?????? ??????
            </div>
          </div>
        </div>
        <div className='background-img'>
          {voteToggle === 0 && <MainFormVoteRoomListContainer sortedVoteRooms={newVotes} />}
          {voteToggle === 1 && <MainFormVoteRoomListContainer sortedVoteRooms={oldVotes} />}
          {index >= 2 && votes.length === 0 && (
            <img className='welcome_tooltip' src='/assets/img/tooltip_welcome.svg' alt=''></img>
          )}
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
    voteInsertStep: voteInsert.step,
  }),
  mapDispatchToProps: {
    selectVoteRooms,
    signIn,
    setVoteInsertInit,
    setUiIsLoader,
    setUiToast,
    setVoteInsertStep,
    setVoteDetailInit,
  },
  component: Main,
})
