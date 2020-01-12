import React, { Suspense, lazy, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { connect } from './redux/redux-connect'
import { signIn } from './redux/user/user-actions'

import SpinnerUi from './components/ui/SpinnerUi'

import './global.scss'

const Home = lazy(() => import('./pages/Home'))
const VoteSave = lazy(() => import('./pages/VoteSave'))
const Example = lazy(() => import('./pages/Example'))

interface IStateProps {}
interface IDispatchProps {
  signIn: typeof signIn
}
interface IAppProps extends IStateProps, IDispatchProps {}

const App: React.FC<IAppProps> = ({ signIn }) => {
  useEffect(() => {
    signIn()
  }, []) // eslint-disable-line

  return (
    <IonApp>
      <Suspense fallback={<SpinnerUi isFull={true} color='tertiary' />}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path='/home' component={Home} exact={true} />
            <Route path='/example' component={Example} exact={true} />
            <Route path='/vote-save' component={VoteSave} exact={true} />
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
