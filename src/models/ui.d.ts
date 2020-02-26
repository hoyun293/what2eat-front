export interface IAlert {
  isOpen: boolean
  message: string
  title: string
}

export interface IToast {
  isOpen: boolean
  message: string
  duration: number
}
