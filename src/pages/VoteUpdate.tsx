import React, { useRef, useEffect, useState } from 'react'
import { IonPage, IonContent, IonImg, useIonViewWillEnter } from '@ionic/react'
import { IVote, IVoteForm } from '../models/vote'
import './VoteUpdate.scss'
import InputUi from '../components/ui/InputUi'
import IconUi from '../components/ui/IconUi'
import DateTime from '../components/DateTime'
import ButtonUi from '../components/ui/ButtonUi'
import { connect } from '../redux/redux-connect'
import { editVoteDetail, setVoteDetailUpdateVote } from '../redux/vote-update/vote-update-actions'
import { useHistory } from 'react-router-dom'
import {
  changeStep,
  setVoteInsertPlace,
  deleteVoteInsertPlaceAll
} from '../redux/vote-insert/vote-insert-actions'
import _ from 'lodash'
import { IPlace } from '../models/place'
import { setUiIsLoader } from '../redux/ui/ui-actions'

interface IOwnProps {}
interface IStateProps {
  voteUpdateForm: IVote
  voteUrl: string
  isLoading: boolean
}
interface IDispatchProps {
  editVoteDetail: typeof editVoteDetail
  changeStep: typeof changeStep
  setVoteInsertPlace: typeof setVoteInsertPlace
  deleteVoteInsertPlaceAll: typeof deleteVoteInsertPlaceAll
  setUiIsLoader: typeof setUiIsLoader
  setVoteDetailUpdateVote: typeof setVoteDetailUpdateVote
}

const VoteUpdate: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  editVoteDetail,
  setVoteInsertPlace,
  deleteVoteInsertPlaceAll,
  voteUpdateForm,
  setUiIsLoader,
  setVoteDetailUpdateVote,
  voteUrl,
  isLoading
}) => {
  const datepickerRef = useRef<HTMLInputElement>()
  const history = useHistory()
  const [index, setIndex] = useState(0)
  // 최초 페이지 로딩시 로더를 보여줍니다.
  useEffect(() => {
    setUiIsLoader(true)
    setIndex(index + 1)
  }, []) // eslint-disable-line

  useEffect(() => {
    if (index >= 1 && isLoading === false) {
      history.push(`/vote/${voteUrl}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])
  useIonViewWillEnter(() => {
    setUiIsLoader(false)
  })
  console.log(index)
  return (
    <IonPage>
      <IonContent>
        <div>
          <div className='px-container flex text-center'>
            <div className='dummy'></div>
            <div className='HeaderTitle text-xxl'>투표편집</div>
            <img
              className='HeaderIcon'
              src='/assets/icon/close.svg'
              alt=''
              onClick={() => {
                history.goBack()
              }}
            />
          </div>
          <img className='bodyImg ' src='/assets/img/vote-update.svg' alt='' />
          <div className='x-container'>
            <InputUi
              value={voteUpdateForm.voteName}
              maxlength={24}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                setVoteDetailUpdateVote({ voteName: target.value })
              }}
            ></InputUi>
            <div className='x-divider'></div>
            <div className='text-right text-xs gray mt-1'>{voteUpdateForm.voteName.length || 0}/24</div>
          </div>
          <div className='spaceMaker'></div>
          <div className='x-divider'></div>
          <div className='py-4 px-container flex items-center justify-between'>
            <div className='flex items-center'>
              <IconUi className='checkIconUi pr-3' iconName='check'></IconUi>
              <div className='multiStr1 text-xl text-medium'>복수투표 가능</div>
            </div>
            {voteUpdateForm.isMultiVote === true && (
              <div className='multiStr2 text-base'>가능 (편집 불가능)</div>
            )}
            {voteUpdateForm.isMultiVote === false && (
              <div className='multiStr2 text-base'>불가능 (편집 불가능)</div>
            )}
          </div>
          <div className='x-divider' />
          <div className='py-4 px-container flex items-center justify-between'>
            <div className='flex items-center'>
              <IconUi className='iconUi pr-3' iconName='clock'></IconUi>
              <div className='deadlineStr text-xl text-medium '>마감시한 설정</div>
            </div>
            <div className='purple flex items-center text-base'>
              <DateTime
                ref={datepickerRef}
                value={voteUpdateForm.voteEndDtm}
                onChange={(voteEndDtm: string) => setVoteDetailUpdateVote({ voteEndDtm })}
              />
              <IconUi
                iconName='arrow'
                className='arrowIcon ml-2'
                onClick={() => {
                  datepickerRef.current && datepickerRef.current.click()
                }}
              ></IconUi>
            </div>
          </div>
          <div className='x-divider' />
          <div className='py-4 px-container flex items-center justify-between'>
            <div className='flex items-center'>
              <IconUi className='iconUi pr-3' iconName='add'></IconUi>
              <div className='multiStr1 text-xl text-medium'>투표지 추가하기</div>
            </div>
            <div className='purple flex items-center'>
              <div className='text-base '>+ {voteUpdateForm.votePlaces.length}개</div>
              <IconUi
                className='arrowIcon ml-2'
                iconName='arrow-horizontal'
                onClick={() => {
                  deleteVoteInsertPlaceAll()
                  _.map(voteUpdateForm.votePlaces, (v, i) => {
                    var placeId = v.placeId
                    var photoUrl = v.photoUrl
                    var name = v.name
                    setVoteInsertPlace({ placeId, photoUrl, name } as IPlace)
                  })
                  history.push('/vote-update-foodcart')
                }}
              ></IconUi>
            </div>
          </div>
          <div className='x-divider' />
          <ButtonUi
            color='yellow'
            text='저장'
            onClick={() => {
              const ids: string[] = []
              _.map(voteUpdateForm.votePlaces, (v, i) => {
                ids.push(v.placeId)
              })
              editVoteDetail(
                {
                  voteName: voteUpdateForm.voteName,
                  isMultiVote: true,
                  voteEndDtm: voteUpdateForm.voteEndDtm,
                  placeIds: ids
                },
                voteUrl
              )
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteUpdateDetail, voteDetail }) => ({
    voteUpdateForm: voteUpdateDetail.vote,
    voteUrl: voteDetail.voteUrl,
    isLoading: voteUpdateDetail.isLoading
  }),
  mapDispatchToProps: {
    editVoteDetail,
    changeStep,
    setVoteInsertPlace,
    deleteVoteInsertPlaceAll,
    setUiIsLoader,
    setVoteDetailUpdateVote
  },
  component: VoteUpdate
})
