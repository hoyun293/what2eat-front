import { SET_UI_ALERT, SET_UI_TOAST, SET_UI_IS_LOADER } from './ui-constants'
import { TAction } from '../redux-type'
import { IAlert, IToast } from '../../models/ui'

export const setUiIsLoader = (isLoader: boolean) =>
  ({
    type: SET_UI_IS_LOADER,
    isLoader
  } as const)

export const setUiAlert = (alert: Partial<IAlert>) =>
  ({
    type: SET_UI_ALERT,
    alert
  } as const)

export const setUiToast = (toast: Partial<IToast>) =>
  ({
    type: SET_UI_TOAST,
    toast
  } as const)

export type TUiActions =
  | TAction<typeof setUiAlert>
  | TAction<typeof setUiToast>
  | TAction<typeof setUiIsLoader>
