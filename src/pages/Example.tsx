import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import ExampleListContainer from '../containers/ExampleListContainer'
import React from 'react'

const Example: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Example</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <ExampleListContainer />
      </IonContent>
    </IonPage>
  )
}

export default Example
