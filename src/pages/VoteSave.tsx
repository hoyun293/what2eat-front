import {
  IonContent,
  IonHeader,
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
          <div className='flex'>
            <div className='w-1/6'>
              {step > 1 && <IonButton onClick={() => setStep(step - 1)}>back</IonButton>}
            </div>
            <div className='w-4/6'>{step === 2 && <IonTitle>투표지 담기</IonTitle>}</div>
            <div className='w-1/6'>
              <IonButton href='/home'>X</IonButton>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <h1>
          어떤 식사를 위한
          <br />
          투표인가요?
        </h1>
        {step === 1 && (
          <Fragment>
            <VoteSaveFormContainer />
            <IonButton onClick={() => setStep(2)}>다음 1/3</IonButton>
          </Fragment>
        )}
        {step === 2 && (
          <Fragment>
            <VoteSaveFormFoodCartContainer />
            <IonButton onClick={() => setStep(3)}>다음 2/3</IonButton>
          </Fragment>
        )}
        {step === 3 && (
          <Fragment>
            <VoteSaveFormOptionContainer />
            <IonButton>투표 만들기 3/3</IonButton>
          </Fragment>
        )}

        {/* <IonButton onClick={()=>setStep()}>다음</IonButton> */}
      </IonContent>
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
