<template>
  <div class="container">
    <form @submit.prevent="login" class="col-12">
      <div class="row">
        <div class="col-12 mb-2">
          <div class="card">
            <div class="card-body">

              <div class="form-row">
                <div class="col">
                  <div :class="['form-group', {'has-error': errors.has('email')}]">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                      v-validate="'required|email'"
                      v-model="formData.email">
                    <div class="text-danger" v-if="errors.has('email')">
                      {{errors.first('email')}}
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="col">
                  <div :class="['form-group', {'has-error': errors.has('password')}]">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="form-control"
                      v-validate="'required'"
                      v-model="formData.password">
                    <div class="text-danger" v-if="errors.has('password')">
                      {{errors.first('password')}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 mb-2">
          <div class="card bg-secondary text-white">
            <div class="card-footer">
              <div class="row form-actions">
                <div class="col-md-8 text-right">
                  <button :disabled="loading || isFormInvalid" type="submit" class="btn btn-primary">
                    <span>Login</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert'
import CONSTANTS from '@/store/constants'

export default {
  data: () => ({
    loading: false,
    isFormInvalid: false,
    error: null,
    formData: {
      email: '',
      password: ''
    }
  }),
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    submitting () {
      return this.$store.state.auth.authenticating
    },
    nextPath () {
      return this.$route.query.next || '/'
    }
  },
  methods: {
    login () {
      this.$store.dispatch('auth/login', this.formData)
        .then(data => {
          console.log(data)
          if (data.status === 200) {
            return this.$store.dispatch('auth/profile', 1)
          }
        }).then(data => {
          this.$router.push(this.nextPath)
        }).catch(err => {
          swal('Login Failed', err.message, 'error')
          this.$store.commit(`auth/${CONSTANTS.LOGIN_FAILED}`)
        })
    }
  }
}
</script>
