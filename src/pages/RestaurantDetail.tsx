import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import VoteSaveFormContainer from '../containers/VoteSaveFormContainer'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'
import VoteSaveFormOptionContainer from '../containers/VoteSaveFormOptionContainer'
import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { connect } from '../redux/redux-connect'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import ButtonUi from '../components/ui/ButtonUi'
import IconUi from '../components/ui/IconUi'
import { IVoteForm } from '../models/vote'
import './RestaurantDetail.scss'
import ReviewStar from '../components/ReviewStar'

interface IOwnProps {}
interface IStateProps {
  voteForm: IVoteForm
}
interface IDispatchProps {}

const VoteSave: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ voteForm }) => {
  const [step, setStep] = useState(1)
  const history = useHistory()

  useEffect(() => {}, []) // eslint-disable-line

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='thumbnail w-full'></div>
        <div className='restaurantInfo flex-col'>
          <div className='title w-full text-center text-xxl'>식당이름</div>
          <div className='rating w-full flex'>
            <ReviewStar className='ratingCenter' rating={3.6} ratingCount={23}></ReviewStar>
          </div>
          <div className='address flex text-left'>
            <img className='ml-3' src='/assets/icon/location2.svg' alt='' />
            <div className='flex-col'>
              <div className='addressInBlack ml-3 mr-2'>
                서울 서초구 사평대로 205 센트럴시티 반포천복개비 주차장
              </div>
              <div className='addressInPurple ml-3 '>현재위치에서 265m</div>
            </div>
          </div>
          <div className='operatingTime ml-3 flex'>
            <img src='/assets/icon/clock2.svg' alt='' />
            <div className='timeInPurple ml-3'>영업중</div>
            <div className='timeInBlack ml-3'>종료시간 : 오후 10시</div>
          </div>
          <div className='phoneNumber mt-2 ml-3 flex'>
            <img src='/assets/icon/phone.svg' alt='' />
            <div className='numberInBlack ml-3'>02-394-2931</div>
          </div>
        </div>
      </IonContent>
      <IonFooter>
        {step === 1 && (
          <ButtonShadowUi
            disabled={!voteForm.voteName && !voteForm.endDate}
            onClick={() => setStep(step + 1)}
            text='다음'
            color='yellow'
          />
        )}
        {step === 2 && (
          <ButtonShadowUi
            disabled={voteForm.votePlaceIds.length === 0}
            onClick={() => setStep(step + 1)}
            text='다음'
            color='yellow'
          />
        )}
        {step === 3 && <ButtonShadowUi onClick={() => {}} color='yellow' text='저장' />}
      </IonFooter>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ vote }) => ({
    voteForm: vote.voteForm
  }),
  mapDispatchToProps: {},
  component: VoteSave
})
