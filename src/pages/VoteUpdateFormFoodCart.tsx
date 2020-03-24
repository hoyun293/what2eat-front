import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonFooter } from '@ionic/react'
import IconUi from '../components/ui/IconUi'
import { useHistory } from 'react-router'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import { connect } from '../redux/redux-connect'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'
import { IVote, IVoteForm } from '../models/vote'
import {
  addVoteDetailUpdatePlaceId,
  deleteVoteDetailUpdateVote
} from '../redux/vote-update/vote-update-actions'
import { IVoteDetailPlace } from '../models/place'
import _ from 'lodash'
import './VoteUpdateFormFoodCart.scss'
interface IOwnProps {}

interface IStateProps {
  voteUpdateForm: IVote
  voteInsertForm: IVoteForm
}

interface IDispatchProps {
  addVoteDetailUpdatePlaceId: typeof addVoteDetailUpdatePlaceId
  deleteVoteDetailUpdateVote: typeof deleteVoteDetailUpdateVote
}
const VoteUpdateFormFoodCart: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  voteUpdateForm,
  addVoteDetailUpdatePlaceId,
  voteInsertForm,
  deleteVoteDetailUpdateVote
}) => {
  const history = useHistory()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='flex justify-between items-center px-container'>
            <div>
              <IconUi className='iconArrow' iconName='left-arrow' onClick={() => history.goBack()} />
            </div>
            <div>
              <IonTitle>
                <div className='text-xl text-medium black'>투표지 담기</div>
              </IonTitle>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <VoteSaveFormFoodCartContainer />
      <IonFooter>
        <ButtonShadowUi
          disabled={Object.keys(voteUpdateForm.votePlaces).length === 0}
          onClick={() => {
            deleteVoteDetailUpdateVote()
            _.map(voteInsertForm.votePlaces, (v, i) => {
              addVoteDetailUpdatePlaceId({
                placeId: v.placeId,
                photoUrl: v.photoUrl,
                name: v.name
              } as IVoteDetailPlace)
            })
            history.goBack()
          }}
          text='다음'
          color='yellow'
        />
      </IonFooter>
    </IonPage>
  )
}
export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ voteUpdateDetail, voteInsert }) => ({
    voteUpdateForm: voteUpdateDetail.vote,
    voteInsertForm: voteInsert.voteForm
  }),
  mapDispatchToProps: {
    addVoteDetailUpdatePlaceId,
    deleteVoteDetailUpdateVote
  },
  component: VoteUpdateFormFoodCart
})
