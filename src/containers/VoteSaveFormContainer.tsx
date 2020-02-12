import React, { useEffect, useState, useRef } from 'react'
import { IonInput, IonToggle, IonDatetime } from '@ionic/react'

import { IVote, IVoteForm } from '../models/vote.d'
import { connect } from '../redux/redux-connect'
import { getPlaceList } from '../api/google-api'
import { setVoteForm } from '../redux/vote-insert/vote-insert-actions'
import InputUi from '../components/ui/InputUi'
import IconUi from '../components/ui/IconUi'
import DateTime from '../components/DateTime'

interface IOwnProps {}
interface IStateProps {
  voteForm: IVoteForm
}
interface IDispatchProps {
  setVoteForm: typeof setVoteForm
}

const VoteSaveFormContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteForm,
  setVoteForm
}) => {
  const datepickerRef = useRef<HTMLInputElement>()

  return (
    <div>
      <div className='px-container'>
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
            setVoteForm({ voteName: target.value })
          }
        ></InputUi>
        <div className='x-divider' />
        <div className='text-right text-xs gray mt-1'>{voteForm.voteName.length || 0}/24</div>
      </div>

      <div className='x-divider mt-8' />

      <div className='py-4 px-container flex items-center justify-between'>
        <div className='flex items-center'>
          <IconUi className='pr-3' iconName='check'></IconUi>
          <div className='text-xl text-medium'>복수투표 가능</div>
        </div>
        <IonToggle
          checked={voteForm.isMultiVote}
          onIonChange={({ detail }) => setVoteForm({ isMultiVote: detail.checked })}
        ></IonToggle>
      </div>

      <div className='x-divider' />

      <div className='py-4 px-container flex items-center justify-between'>
        <div className='flex items-center'>
          <IconUi className='pr-3' iconName='clock'></IconUi>
          <div className='text-xl text-medium mb-1'>마감시한 설정</div>
        </div>
        <div className='purple flex items-center'>
          <DateTime
            ref={datepickerRef}
            value={voteForm.voteEndDtm}
            onChange={(voteEndDtm: string) => setVoteForm({ voteEndDtm })}
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
        <img src='/assets/img/vote-save.svg' alt='' />
      </div>
    </div>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteInsert }) => ({
    voteForm: voteInsert.voteForm
  }),
  mapDispatchToProps: {
    setVoteForm
  },
  component: VoteSaveFormContainer
})
