export default {
  auth ({store, next, to}) {
    if (!store.getters['auth/isLoggedIn']) {
      next(`/?next=${to.fullPath}`)
    }
    next()
  },
  guest ({store, next}) {
    if (store.getters['auth/isLoggedIn']) {
      next('/')
    }
  },
  checkMiddleware ({to, store, next}) {
    switch (to.meta.middleware) {
      case 'auth':
        this.auth({store, next, to})
        break
      case 'guest':
        this.guest({store, next})
        break
    }
  }
}
