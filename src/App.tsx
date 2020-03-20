import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { setupConfig, IonApp, IonRouterOutlet, IonPopover, IonToast } from '@ionic/react'
import { Plugins } from '@capacitor/core'
import { IonReactRouter } from '@ionic/react-router'
import { connect } from './redux/redux-connect'
import { signIn } from './redux/user/user-actions'
import SpinnerUi from './components/ui/SpinnerUi'
import './global.scss'
import { setUiAlert, setUiToast } from './redux/ui/ui-actions'
import { IAlert, IToast } from './models/ui'

import Main from './pages/Main'
import voteUpdate from './pages/VoteUpdate'
import VoteUpdateFormFoodCart from './pages/VoteUpdateFormFoodCart'
import RestaurantDetail from './pages/RestaurantDetail'
import VoteSave from './pages/VoteSave'
import VoteDetail from './pages/VoteDetail'

const { SplashScreen } = Plugins

setupConfig({
  hardwareBackButton: false,
  statusTap: true,
  swipeBackEnabled: true,
  mode: 'ios'
})

interface IStateProps {
  isLogin: boolean
  uiIsLoader: boolean
  uiAlert: IAlert
  uiToast: IToast
}
interface IDispatchProps {
  signIn: typeof signIn
  setUiAlert: typeof setUiAlert
  setUiToast: typeof setUiToast
}
interface IAppProps extends IStateProps, IDispatchProps {}

const App: React.FC<IAppProps> = ({
  signIn,
  uiAlert,
  uiToast,
  setUiToast,
  isLogin,
  setUiAlert,
  uiIsLoader
}) => {
  useEffect(() => {
    signIn()
  }, []) // eslint-disable-line

  useEffect(() => {
    SplashScreen.hide()
  }, [isLogin])

  return isLogin ? (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path='/' component={Main} exact={true} />
          <Route path='/vote-save' component={VoteSave} exact={true} />
          <Route path='/vote/:voteUrl' component={VoteDetail} exact={true} />
          <Route path='/restaurant-detail/:placeId' component={RestaurantDetail} exact={true} />
          <Route path='/vote-update' component={voteUpdate} exact={true} />
          <Route path='/vote-update-foodcart' component={VoteUpdateFormFoodCart} exact={true} />
          <Redirect to='/' />
        </IonRouterOutlet>
      </IonReactRouter>
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

      {uiIsLoader && <SpinnerUi isFull={true} />}

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
    uiIsLoader: ui.isLoader,
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
