import {
  IonContent,
  IonHeader,
  IonFooter,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonLabel
} from '@ionic/react'
import VoteSaveFormContainer from '../containers/VoteSaveFormContainer'
import VoteSaveFormFoodCartContainer from '../containers/VoteSaveFormFoodCartContainer'
import VoteSaveFormOptionContainer from '../containers/VoteSaveFormOptionContainer'
import React, { useEffect, useState, Fragment } from 'react'
import { informationCircle } from 'ionicons/icons'

import { connect } from '../redux/redux-connect'
import { INews } from '../models/news'
import { increaseExampleCount, setExampleNews, selectExampleNews } from '../redux/example/example-actions'
import ButtonShadowUi from '../components/ui/ButtonShadowUi'
import ButtonUi from '../components/ui/ButtonUi'
import IconUi from '../components/ui/IconUi'

interface IOwnProps {}
interface IStateProps {
  news: INews[]
  count: number
}
interface IDispatchProps {
  increaseExampleCount: typeof increaseExampleCount
  setExampleNews: typeof setExampleNews
  selectExampleNews: typeof selectExampleNews
}

const Example: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  news,
  count,
  increaseExampleCount,
  setExampleNews,
  selectExampleNews
}) => {
  const [step, setStep] = useState(1)

  useEffect(() => {
    selectExampleNews()
  }, []) // eslint-disable-line

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='flex-center px-container'>
            <div className='w-1/6'>
              {step > 1 && <IconUi iconName='icon-left-arrow' onClick={() => setStep(step - 1)} />}
            </div>
            <div className='w-4/6'>{step === 2 && <IonTitle>투표지 담기</IonTitle>}</div>
            <div className='w-1/6'>
              <IonButton href='/home'>X</IonButton>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding' fullscreen>
        <h1>
          새로운 투표를
          <br />
          생성합니다.
        </h1>
        {step === 1 && (
          <Fragment>
            <VoteSaveFormContainer />
          </Fragment>
        )}
        {step === 2 && (
          <Fragment>
            <VoteSaveFormFoodCartContainer />
          </Fragment>
        )}
        {step === 3 && (
          <Fragment>
            <VoteSaveFormOptionContainer />
          </Fragment>
        )}
      </IonContent>
      <IonFooter>
        {(step === 1 || step === 2) && (
          <ButtonShadowUi onClick={() => setStep(step + 1)} text='다음' color='yellow' />
        )}
        {step === 3 && <ButtonShadowUi onClick={() => {}} color='yellow' text='저장' />}
      </IonFooter>
    </IonPage>
  )
}

export default connect<IOwnProps, IStateProps, IDispatchProps>({
  mapStateToProps: ({ example }) => ({
    news: example.news,
    count: example.count
  }),
  mapDispatchToProps: {
    selectExampleNews,
    increaseExampleCount,
    setExampleNews
  },
  component: React.memo(Example)
})
