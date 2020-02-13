import React, { Suspense, lazy, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { connect } from './redux/redux-connect'
import { signIn } from './redux/user/user-actions'
import SpinnerUi from './components/ui/SpinnerUi'
import './global.scss'
import RestaurantDetail from './pages/RestaurantDetail'

const Home = lazy(() => import('./pages/Home'))
const VoteSave = lazy(() => import('./pages/VoteSave'))
const Example = lazy(() => import('./pages/Example'))
const Main = lazy(() => import('./pages/Main'))
const VoteDetail = lazy(() => import('./pages/VoteDetail'))

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
            <Route path='/main' component={Main} exact={true} />
            <Route path='/example' component={Example} exact={true} />
            <Route path='/vote-save' component={VoteSave} exact={true} />
            <Route path='/dev' component={Home} exact={true} />
            <Route path='/vote/:voteId' component={VoteDetail} exact={true} />
            <Route path='/restaurant-detail/:placeId' component={RestaurantDetail} exact={true} />
            <Route exact path='/' render={() => <Redirect to='/main' />} />
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
