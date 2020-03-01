import { SET_UI_ALERT, SET_UI_TOAST, SET_UI_IS_LOADER } from './ui-constants'
import { IUiState } from './ui-state'
import { TUiActions } from './ui-actions'

export default function uiReducer(state: IUiState, action: TUiActions): IUiState {
  switch (action.type) {
    case SET_UI_IS_LOADER:
      return { ...state, isLoader: action.isLoader }
    case SET_UI_ALERT:
      return { ...state, alert: { ...state.alert, ...action.alert } }
    case SET_UI_TOAST:
      return { ...state, toast: { ...state.toast, ...action.toast } }
  }
}
