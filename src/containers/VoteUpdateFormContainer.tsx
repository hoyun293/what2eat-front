import React, { useRef } from 'react'
import { IVoteForm, IVote } from '../models/vote'
import './VoteUpdateFormContainer.scss'
import InputUi from '../components/ui/InputUi'
import IconUi from '../components/ui/IconUi'
import DateTime from '../components/DateTime'
import ButtonUi from '../components/ui/ButtonUi'
import { connect } from '../redux/redux-connect'
import { IonPage, IonContent } from '@ionic/react'
import { editVoteDetail } from '../redux/vote-update/vote-update-actions'
interface IOwnProps {}
interface IStateProps {
  voteForm: IVote
}
interface IDispatchProps {
  editVoteDetail: typeof editVoteDetail
}

const VoteUpdateFormContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteForm,
  editVoteDetail
}) => {
  const datepickerRef = useRef<HTMLInputElement>()

  return (
    <IonPage>
      <IonContent>
        <div>
          <div className='px-container flex text-center'>
            <div className='dummy'></div>
            <div className='HeaderTitle text-xxl pt-2'>투표편집</div>
            <img className='HeaderIcon' src='/assets/icon/close.svg' alt='' />
          </div>
          <div className='text-center mt-2'>
            <img src='/assets/img/vote-update.svg' alt='' />
          </div>
          <div className='x-container'>
            <InputUi
              placeholder={voteForm.voteName}
              maxlength={24}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                // setVoteInsertForm({ voteName: target.value })
                {}
              }
            ></InputUi>
            <div className='x-divider'></div>
            <div className='text-right text-xs gray mt-1'>{voteForm.voteName.length || 0}/24</div>
          </div>
          <div className='spaceMaker'>
            <div className='x-divider'></div>
          </div>
          <div className='py-4 px-container flex items-center justify-between'>
            <div className='flex items-center'>
              <IconUi className='pr-3' iconName='check'></IconUi>
              <div className='multiStr1 text-xl text-medium'>복수투표 가능</div>
            </div>
            <div className='multiStr2 text-base'>가능 (편집 불가능)</div>
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
                value={voteForm.voteEndDtm}
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
              <div className='text-base'>가능 (편집 불가능)</div>
              <IconUi className='ml-2' iconName='arrow-horizontal'></IconUi>
            </div>
          </div>
          <div className='x-divider' />
          <ButtonUi
            color='yellow'
            text='저장'
            onClick={() => {
              console.log('click!')
              editVoteDetail({
                voteName: 'test',
                isMultiVote: true,
                voteEndDtm: 'testtest',
                votePlaces: []
              } as IVote)
              console.log('click done!')
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteDetail }) => ({
    voteForm: voteDetail.vote
  }),
  mapDispatchToProps: {
    editVoteDetail
  },
  component: VoteUpdateFormContainer
})
