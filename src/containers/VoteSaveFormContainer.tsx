import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'
import { IonInput } from '@ionic/react'

import { IVote } from '../models/vote.d'
import { connect } from '../redux/redux-connect'
import { getPlaceList } from '../api/google-api'
import { setVoteForm } from '../redux/vote/vote-actions'
import InputUi from '../components/ui/InputUi'

interface IOwnProps {}
interface IStateProps {
  voteForm: IVote
}
interface IDispatchProps {
  setVoteForm: typeof setVoteForm
}

const VoteSaveFormContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteForm,
  setVoteForm
}) => {
  // useEffect(() => {
  //   googleFunction()
  // }, [])
  // const googleFunction = async () => {}
  // const [voteName, setVoteName] = useState('')

  return (
    <div>
      <div className='text-xxxl font-bold mb-7'>
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
      <div className='h-divider' />
      <div className='text-right text-xs text-gray mt-1'>{voteForm.voteName.length}/24</div>
      <div className='text-center'>
        <img src='/assets/img/vote-save.svg' alt='' />
      </div>
    </div>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ vote }) => ({
    voteForm: vote.voteForm
  }),
  mapDispatchToProps: {
    setVoteForm
  },
  component: VoteSaveFormContainer
})
