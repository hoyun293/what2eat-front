export interface IDispatch {
  [key: string]: any
  type: string
}

type TPromiseResolveValue<T> = T extends Promise<infer R> ? R : T
type TEffect<T extends (...args: any) => any> = ReturnType<ReturnType<T>>
type TEffectReturnValue<T extends (...args: any) => any> = TPromiseResolveValue<TEffect<T>>
export type TAction<T extends (...args: any) => any> = ReturnType<T> extends IDispatch
  ? ReturnType<T>
  : TEffectReturnValue<T>
