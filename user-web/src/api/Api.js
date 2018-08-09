import axios from 'axios'
import Endpoint from './Endpoint'

axios.defaults.baseURL = Endpoint.baseUrl
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default {
  user: {
    login (data) {
      return axios.post(Endpoint.user.login(), data, {withCredentials: true})
    },
    logout () {
      return axios.get(Endpoint.user.logout())
    },
    detail (id) {
      return axios.get(Endpoint.user.detail(id))
    },
    create (data) {
      return axios.post(Endpoint.user.create(), data)
    },
    update (id, data) {
      return axios.patch(Endpoint.user.update(id), data)
    },
    delete (id) {
      return axios.delete(Endpoint.user.delete(id))
    },
    forgot (email) {
      return axios.post(Endpoint.user.forgot(), email)
    }
  }
}
