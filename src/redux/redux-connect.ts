import React, { useContext, useMemo } from 'react'
import { RootContext } from '../Root'
import { IDispatch } from './redux-type'
import { IState } from './root-state'

interface ConnectParams<TOwnProps, TStateProps, TDispatchProps> {
  mapStateToProps?: (state: IState, props: TOwnProps) => TStateProps
  mapDispatchToProps?: TDispatchProps
  component: React.ComponentType<any>
}

export function connect<TOwnProps = any, TStateProps = any, TDispatchProps = any>({
  mapStateToProps = () => ({} as TStateProps),
  mapDispatchToProps = {} as TDispatchProps,
  component
}: ConnectParams<TOwnProps, TStateProps, TDispatchProps>): React.FunctionComponent<TOwnProps> {
  const Connect = (ownProps: TOwnProps) => {
    const context = useContext(RootContext)

    const dispatchFuncs = useMemo(() => {
      const dispatchFuncs: { [key: string]: any } = {}
      Object.keys(mapDispatchToProps).forEach(key => {
        const oldFunc = (mapDispatchToProps as any)[key]
        const newFunc = (...args: any) => {
          const dispatchFunc = oldFunc(...args)
          if (typeof dispatchFunc === 'object') {
            context.dispatch(dispatchFunc)
          } else {
            const result = dispatchFunc(context.dispatch)
            if (typeof result === 'object' && result.then) {
              result.then((dispatchObject?: IDispatch) => {
                if (dispatchObject && dispatchObject.type) {
                  context.dispatch(dispatchObject)
                }
              })
            }
          }
        }
        dispatchFuncs[key] = newFunc
      })
      return dispatchFuncs
    }, [context])

    const props = useMemo(() => {
      return Object.assign({}, ownProps, mapStateToProps(context.state, ownProps), dispatchFuncs)
    }, [ownProps, context.state, dispatchFuncs])

    return React.createElement<TOwnProps>(component, props)
  }
  return React.memo(Connect as any)
}
