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
import React from 'react'
import { informationCircle } from 'ionicons/icons'

import { connect } from 'react-redux'
import { INews } from '../models/news'
import { increaseExampleCount } from '../redux/example/example-actions'
import { IState } from '../redux/root-state'

interface IOwnProps {}
interface IStateProps {
  readonly news: INews[]
  readonly count: number
}
interface IDispatchProps {
  readonly increaseExampleCount: typeof increaseExampleCount
}

const Example: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({ count, increaseExampleCount }) => {
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

const mapStateToProps = ({ example }: IState) => ({
  news: example.news,
  count: example.count
})

// TODO : dispatch any고칠것!!
const mapDispatchToProps = (dispatch: any) => ({
  increaseExampleCount: (payload: number) => dispatch(increaseExampleCount(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Example)
