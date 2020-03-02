import { IAlert, IToast } from '../../models/ui'

export interface IUiState {
  alert: IAlert
  toast: IToast
  isLoader: boolean
}
