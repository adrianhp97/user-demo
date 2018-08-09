// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import * as uiv from 'uiv'
import Api from './api/Api'
import App from './App'
import Base from '@/components/Layouts/Base'
import config from './config'
import moment from 'moment'
import router from './router'
import store from './store'
import sweetAlert from 'sweetalert'
import VeeValidate from 'vee-validate'
import Vue from 'vue'

Vue.config.productionTip = false

window.swal = sweetAlert
window.moment = moment

Vue.prototype.$api = Api
Vue.prototype.$config = config

Vue.component('layout', Base)

Vue.use(uiv)
Vue.use(VeeValidate, {
  fieldsBagName: 'formFields'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
