import Api from '@/api/Api'
import CONSTANTS from '@/store/constants'

export default {
  namespaced: true,
  state: {
    authenticated: false,
    authenticating: false,
    user: null
  },
  mutations: {
    [CONSTANTS.LOGIN] (state) {
      state.authenticating = true
    },
    [CONSTANTS.LOGIN_SUCCESS] (state) {
      state.authenticated = true
      state.authenticating = false
    },
    [CONSTANTS.LOGIN_FAILED] (state) {
      state.authenticated = false
      state.authenticating = false
    },
    [CONSTANTS.LOGOUT] (state) {
      state.authenticated = false
      state.user = null
      localStorage.removeItem('user')
    },
    [CONSTANTS.STORE_USER] (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
  actions: {
    login ({commit}, credentials) {
      commit(CONSTANTS.LOGIN)
      return Api.user.login(credentials).then(data => {
        return data
      })
    },
    logout ({commit}) {
      return new Promise(resolve => {
        commit(CONSTANTS.LOGOUT)
        resolve()
      })
    },
    profile ({commit}, id) {
      return Api.user.detail(id)
        .then((res) => {
          commit(CONSTANTS.STORE_USER, res.data)
          commit(CONSTANTS.LOGIN_SUCCESS)
          return res
        })
    },
    checkAuth ({commit}, next) {
      return Api.user.profile().then(res => {
        commit(CONSTANTS.STORE_USER, res.data.result.profile)
        commit(CONSTANTS.LOGIN_SUCCESS)
      }).then(res => {
        next()
      }).catch(err => {
        commit(CONSTANTS.LOGIN_FAILED, err)
        next('/?token=failed')
      })
    }
  },
  getters: {
    isLoggedIn: state => state.authenticated,
    getUser: state => {
      if (localStorage.user) {
        try {
          return JSON.parse(localStorage.user)
        } catch (e) {
          return null
        }
      } else {
        return null
      }
    }
  }
}
