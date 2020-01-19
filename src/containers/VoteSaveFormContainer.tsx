import React from 'react'
import * as _ from 'lodash'
import { IonInput } from '@ionic/react'

import { INews } from '../models/news.d'
import { connect } from '../redux/redux-connect'
import { getPlaceList } from '../api/google-api'
import InputUi from '../components/ui/InputUi'

interface IOwnProps {}
interface IStateProps {
  news: INews[]
}
interface IDispatchProps {}

const VoteSaveFormContainer: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ news }) => {
  React.useEffect(() => {
    googleFunction()
  }, [])
  const googleFunction = async () => {}

  return (
    <div>
      <InputUi placeholder='투표명을 입력해주세요'></InputUi>
    </div>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ example }) => ({
    news: example.news
  }),
  mapDispatchToProps: {},
  component: VoteSaveFormContainer
})
