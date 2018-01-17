import mitt from 'mitt'
import Router from 'next/router'

const emitter = mitt()
export default emitter

Router.onRouteChangeStart = (...args) => {
  emitter.emit('routeChangeStart', ...args)
}

Router.onRouteChangeComplete = (...args) => {
  emitter.emit('routeChangeComplete', ...args)
}

Router.onRouteChangeError = (...args) => {
  emitter.emit('routeChangeError', ...args)
}
