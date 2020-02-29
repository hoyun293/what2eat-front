import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonFooter } from '@ionic/react'
import IconUi from '../components/ui/IconUi'
import { useHistory } from 'react-router'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import { connect } from 'react-redux'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'

interface IOwnProps {}

interface IStateProps {}

interface IDispatchProps {}
const VoteUpdateFormFoodCart: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({}) => {
  const history = useHistory()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='flex justify-between items-center px-container'>
            <div>
              <IconUi iconName='left-arrow' onClick={() => history.goBack()} />
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
          /*disabled={Object.keys(voteForm.votePlaces).length === 0}
          onClick={async () => {
            const { isMultiVote, voteName, votePlaces, voteEndDtm } = voteForm

            insertVote({
              voteName: voteName,
              placeIds: Object.keys(votePlaces),
              isMultiVote,
              voteEndDtm
            })
          }}
          */
          text='확인'
          color='yellow'
        />
      </IonFooter>
    </IonPage>
  )
}

export default VoteUpdateFormFoodCart
/*
export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({  }) => ({

  }),
  mapDispatchToProps: {},
  component: VoteUpdateFormFoodCart
})
*/
