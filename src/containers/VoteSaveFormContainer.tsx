import React, { useEffect, useState, useRef } from 'react'
import { IonToggle, IonContent, IonImg } from '@ionic/react'

import { IVote, IVoteForm } from '../models/vote.d'
import { connect } from '../redux/redux-connect'
import { getPlaceList } from '../api/google-api'
import { setVoteInsertForm } from '../redux/vote-insert/vote-insert-actions'
import InputUi from '../components/ui/InputUi'
import IconUi from '../components/ui/IconUi'
import DateTime from '../components/DateTime'

import './VoteSaveFormContainer.scss'

interface IOwnProps {}
interface IStateProps {
  voteForm: IVoteForm
}
interface IDispatchProps {
  setVoteInsertForm: typeof setVoteInsertForm
}

const VoteSaveFormContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteForm,
  setVoteInsertForm
}) => {
  const datepickerRef = useRef<HTMLInputElement>()

  return (
    <IonContent fullscreen>
      <div className='px-container pt-12'>
        <div className='text-xxxl text-bold mb-7'>
          새로운 투표를
          <br />
          생성합니다.
        </div>
        <InputUi
          placeholder='투표명을 입력해주세요'
          value={voteForm.voteName}
          maxlength={24}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setVoteInsertForm({ voteName: target.value })
          }
        ></InputUi>
        <div className='x-divider' />
        <div className='text-right text-xs gray mt-1'>{voteForm.voteName.length || 0}/24</div>
      </div>

      <div className='x-divider mt-8' />

      <div className='py-3 px-container flex items-center justify-between'>
        <div className='flex items-center'>
          <IconUi className='iconCheck pr-2' iconName='check'></IconUi>
          <div className='text-xl text-medium'>복수투표 가능</div>
        </div>
        <IonToggle
          mode='ios'
          checked={voteForm.isMultiVote}
          onIonChange={({ detail }) => setVoteInsertForm({ isMultiVote: detail.checked })}
        ></IonToggle>
      </div>

      <div className='x-divider' />

      <div className='py-3 px-container flex items-center justify-between'>
        <div className='flex items-center'>
          <IconUi className='iconClock pr-2 mt-1' iconName='clock'></IconUi>
          <div className='text-xl text-medium'>마감시한 설정</div>
        </div>
        <div className='purple flex items-center'>
          <DateTime
            ref={datepickerRef}
            value={voteForm.voteEndDtm}
            onChange={(voteEndDtm: string) => setVoteInsertForm({ voteEndDtm })}
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

      <div className='text-center mt-8'>
        <IonImg src='/assets/img/vote-save.svg'></IonImg>
      </div>
    </IonContent>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteInsert }) => ({
    voteForm: voteInsert.voteForm
  }),
  mapDispatchToProps: {
    setVoteInsertForm
  },
  component: VoteSaveFormContainer
})
