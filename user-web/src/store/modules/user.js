import Api from '@/api/Api'

export default {
  namespaced: true,
  actions: {
    create ({commit}, data) {
      return Api.user.create(data)
        .then((data) => {
          return data
        })
    },
    remove ({commit, dispatch}, id) {
      return Api.user.delete(id)
        .then((data) => {
          return data
        })
    },
    update ({commit}, data) {
      return Api.user.update(data.id, data)
        .then((data) => {
          return data
        })
    },
    detail ({commit}, id) {
      return Api.user.detail(id)
        .then((data) => {
          return data
        })
    }
  }
}
