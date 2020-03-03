import { IonContent, IonPage, IonImg, useIonViewWillEnter } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { connect } from '../redux/redux-connect'
import { selectVoteRooms } from '../redux/vote-room/vote-room-actions'
import MainFormVoteRoomListContainer from '../containers/MainFormVoteRoomListContainer'
import { signIn } from '../redux/user/user-actions'
import './Main.scss'
import { IVoteRoom } from '../models/vote-room'
import { changeStep } from '../redux/vote-insert/vote-insert-actions'
import _ from 'lodash'

interface IOwnProps {}
interface IStateProps {
  voteRooms: IVoteRoom[]
}
interface IDispatchProps {
  selectVoteRooms: typeof selectVoteRooms
  signIn: typeof signIn
  changeStep: typeof changeStep
}

const Main: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  selectVoteRooms,
  voteRooms,
  changeStep
}) => {
  const history = useHistory()
  const [toggle, setToggle] = useState(1)
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

  useEffect(() => {
    //signIn()
    if (index === 0) {
      //  useIonViewWillEnter(() => {
      selectVoteRooms()
      //  })
      setIndex(index + 1)
    }
    //selectVoteRooms(pagingNum, bool)  onClick 시 pagingNum, bool만 바꾸게 해야되지 않을까?
    // toggle 값 바뀌면 useEffect가 실행되고 selectVoteRooms가 2번실행될듯?
    //console.log('addVote start')

    if (index === 1) {
      setVotes(voteRooms)
      setIndex(index + 1)
    }

    if (index === 2) {
      sortInEnd()
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
            className='bottom-floating'
            onClick={() => {
              changeStep(1)
              history.push('/vote-save')
            }}
          >
            <img src='/assets/img/floating_btn_add.svg' alt='' />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteRoom }) => ({
    voteRooms: voteRoom.voteRooms
  }),
  mapDispatchToProps: {
    selectVoteRooms,
    signIn,
    changeStep
  },
  component: Main
})
