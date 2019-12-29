import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { hammer } from 'ionicons/icons'
import React from 'react'

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        w2e 메인 페이지입니다.
        <IonItem button routerLink={'/example'} routerDirection='none'>
          <IonIcon slot='start' icon={hammer} />
          <IonLabel>예제 페이지</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  )
}

export default Home
