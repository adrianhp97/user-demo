import config from '../config'

export function buildQuery (params = {}) {
  const parameters = {}
  const queries = params || {}
  const esc = encodeURIComponent
  const obj = Object.assign({}, parameters, queries)
  return '?' + Object.keys(obj)
    .map(k => esc(k) + '=' + esc(obj[k]))
    .join('&')
}

export default {
  baseUrl: config.apiUrl,
  user: {
    login () {
      return 'login/'
    },
    logout () {
      return 'logout/'
    },
    detail (id) {
      return 'users/' + id
    },
    create () {
      return 'users/'
    },
    update (id) {
      return 'users/' + id
    },
    delete (id) {
      return 'users/' + id
    },
    forgot () {
      return 'forgot/'
    }
  }
}
