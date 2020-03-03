/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState } from 'react'
import { IVote, IVoteForm } from '../models/vote'
import './VoteUpdate.scss'
import InputUi from '../components/ui/InputUi'
import IconUi from '../components/ui/IconUi'
import DateTime from '../components/DateTime'
import ButtonUi from '../components/ui/ButtonUi'
import { connect } from '../redux/redux-connect'
import { IonPage, IonContent, IonImg } from '@ionic/react'
import { editVoteDetail } from '../redux/vote-update/vote-update-actions'
import { useHistory } from 'react-router-dom'
import {
  changeStep,
  setVoteInsertPlace,
  deleteVoteInsertPlaceAll
} from '../redux/vote-insert/vote-insert-actions'
import _ from 'lodash'
import { IPlace } from '../models/place'
interface IOwnProps {}
interface IStateProps {
  voteInsertForm: IVoteForm
  voteUpdateForm: IVote
}
interface IDispatchProps {
  editVoteDetail: typeof editVoteDetail
  changeStep: typeof changeStep
  setVoteInsertPlace: typeof setVoteInsertPlace
  deleteVoteInsertPlaceAll: typeof deleteVoteInsertPlaceAll
}

const voteUpdate: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  editVoteDetail,
  voteInsertForm,
  setVoteInsertPlace,
  deleteVoteInsertPlaceAll,
  voteUpdateForm
}) => {
  const datepickerRef = useRef<HTMLInputElement>()
  const history = useHistory()
  return (
    <IonPage>
      <IonContent>
        <div>
          <div className='px-container flex text-center'>
            <div className='dummy'></div>
            <div className='HeaderTitle text-xxl'>투표편집</div>
            <IonImg
              className='HeaderIcon'
              src='/assets/icon/close.svg'
              alt=''
              onClick={() => {
                history.goBack()
              }}
            />
          </div>
          <div className='mt-2'>
            <IonImg className='w-50 m-auto' src='/assets/img/vote-update.svg' alt='' />
          </div>
          <div className='x-container'>
            <InputUi
              value={voteUpdateForm.voteName}
              maxlength={24}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                // setVoteInsertForm({ voteName: target.value })
                {}
              }
            ></InputUi>
            <div className='x-divider'></div>
            <div className='text-right text-xs gray mt-1'>{voteUpdateForm.voteName.length || 0}/24</div>
          </div>
          <div className='spaceMaker'></div>
          <div className='x-divider'></div>
          <div className='py-4 px-container flex items-center justify-between'>
            <div className='flex items-center'>
              <IconUi className='pr-3' iconName='check'></IconUi>
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
              <IconUi className='pr-3' iconName='clock'></IconUi>
              <div className='deadlineStr text-xl text-medium mb-1'>마감시한 설정</div>
            </div>
            <div className='purple flex items-center'>
              <DateTime
                ref={datepickerRef}
                value={voteUpdateForm.voteEndDtm}
                //  onChange={(voteEndDtm: string) => setVoteInsertForm({ voteEndDtm })}
              />
              <IconUi
                iconName='arrow'
                className='ml-2'
                onClick={() => {
                  datepickerRef.current && datepickerRef.current.click()
                }}
              ></IconUi>
            </div>
          </div>
          <div className='x-divider' />
          <div className='py-4 px-container flex items-center justify-between'>
            <div className='flex items-center'>
              <IconUi className='pr-3' iconName='add'></IconUi>
              <div className='multiStr1 text-xl text-medium'>투표지 추가하기</div>
            </div>
            <div className='purple flex items-center'>
              <div className='text-base'>+{voteUpdateForm.votePlaces.length}개</div>
              <IconUi
                className='ml-2'
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
              editVoteDetail({
                voteName: 'test',
                isMultiVote: true,
                voteEndDtm: 'testtest',
                votePlaces: []
              } as IVote)
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteInsert, voteUpdateDetail }) => ({
    voteUpdateForm: voteUpdateDetail.vote,
    voteInsertForm: voteInsert.voteForm
  }),
  mapDispatchToProps: {
    editVoteDetail,
    changeStep,
    setVoteInsertPlace,
    deleteVoteInsertPlaceAll
  },
  component: voteUpdate
})
