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
import ExampleListContainer from '../containers/ExampleListContainer'
import React, { useEffect } from 'react'
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
  useEffect(() => {
    selectExampleNews()
  }, []) // eslint-disable-line

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Example</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonButton onClick={() => increaseExampleCount(count + 1)}>
          <IonIcon icon={informationCircle} />
          <IonLabel>카운트 증가 {count}</IonLabel>
        </IonButton>
        <ExampleListContainer />
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
