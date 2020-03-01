import React, { Suspense, lazy, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonPopover, IonToast } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { connect } from './redux/redux-connect'
import { signIn } from './redux/user/user-actions'
import SpinnerUi from './components/ui/SpinnerUi'
import './global.scss'
import RestaurantDetail from './pages/RestaurantDetail'
import voteUpdate from './pages/VoteUpdate'
import { setUiAlert, setUiToast } from './redux/ui/ui-actions'
import { IAlert, IToast } from './models/ui'
import VoteUpdateFormFoodCart from './pages/VoteUpdateFormFoodCart'

const VoteSave = lazy(() => import('./pages/VoteSave'))
const Main = lazy(() => import('./pages/Main'))
const VoteDetail = lazy(() => import('./pages/VoteDetail'))
// import Main from './pages/Main'
// import VoteSave from './pages/VoteSave'
// import VoteDetail from './pages/VoteDetail'

interface IStateProps {
  isLogin: boolean
  uiAlert: IAlert
  uiToast: IToast
}
interface IDispatchProps {
  signIn: typeof signIn
  setUiAlert: typeof setUiAlert
  setUiToast: typeof setUiToast
}
interface IAppProps extends IStateProps, IDispatchProps {}

const App: React.FC<IAppProps> = ({ signIn, uiAlert, uiToast, setUiToast, isLogin, setUiAlert }) => {
  useEffect(() => {
    signIn()
  }, []) // eslint-disable-line

  return isLogin ? (
    <IonApp>
      <Suspense fallback={<SpinnerUi isFull={true} />}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path='/main' component={Main} exact={true} />
            <Route path='/vote-save' component={VoteSave} exact={true} />
            <Route path='/vote/:voteUrl' component={VoteDetail} exact={true} />
            <Route path='/restaurant-detail/:placeId' component={RestaurantDetail} exact={true} />
            <Route path='/vote-update' component={voteUpdate} exact={true} />
            <Route path='/vote-update-foodcart' component={VoteUpdateFormFoodCart} exact={true} />
            <Route exact path='/' render={() => <Redirect to='/main' />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </Suspense>
      <IonPopover isOpen={uiAlert.isOpen} cssClass='cart-list-modal'>
        <div>
          {uiAlert.title && <div className='flex-center text-xl text-medium pt-5 pb-2'>{uiAlert.title}</div>}
          <div className='flex flex-center'>{uiAlert.message}</div>
          <div className='x-divider mt-2'></div>
          <div onClick={() => setUiAlert({ isOpen: false })} className='purple text-sm flex-center h-11'>
            닫기
          </div>
        </div>
      </IonPopover>

      <IonToast
        isOpen={uiToast.isOpen}
        onDidDismiss={() => setUiToast({ isOpen: false })}
        message={uiToast.message}
        duration={uiToast.duration}
      />
    </IonApp>
  ) : (
    <SpinnerUi isFull={true} />
  )
}

const AppWithConnect = connect<{}, IStateProps, IDispatchProps>({
  mapStateToProps: ({ ui, user }) => ({
    isLogin: user.isLogin,
    uiAlert: ui.alert,
    uiToast: ui.toast
  }),
  mapDispatchToProps: {
    signIn,
    setUiAlert,
    setUiToast
  },
  component: App
})

export default AppWithConnect
