import React, { Suspense, lazy, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { connect } from './redux/redux-connect'
import { signIn } from './redux/user/user-actions'
import { setAuthoriation } from './utils/http-with-credential-util'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

import SpinnerUi from './components/ui/SpinnerUi'

const Home = lazy(() => import('./pages/Home'))
const Example = lazy(() => import('./pages/Example'))

interface IStateProps {}
interface IDispatchProps {
  signIn: typeof signIn
}
interface IAppProps extends IStateProps, IDispatchProps {}

const App: React.FC<IAppProps> = ({ signIn }) => {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      signIn()
    } else {
      setAuthoriation(token)
    }
  }, []) // eslint-disable-line

  return (
    <IonApp>
      <Suspense fallback={<SpinnerUi isFull={true} color='tertiary' />}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path='/home' component={Home} exact={true} />
            <Route path='/example' component={Example} exact={true} />
            <Route exact path='/' render={() => <Redirect to='/home' />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </Suspense>
    </IonApp>
  )
}

const AppWithConnect = connect<{}, IStateProps, IDispatchProps>({
  mapStateToProps: () => ({}),
  mapDispatchToProps: {
    signIn
  },
  component: App
})

export default AppWithConnect
