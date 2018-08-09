<template>
  <div class="card card-comment">
    <div class="card-body mt-4">
      <button class="btn btn btn-primary btn-sm delete-button" @click="deleteUser()">Delete</button>
    </div>
    <div class="card-body mt-4">
      <form @submit.prevent="submit">

        <div class="form-row">
          <div class="col">
            <div :class="['form-group', {'has-error': errors.has('name')}]">
              <label for="name">Name</label>
              <input
                data-vv-as="name"
                type="text"
                name="name"
                class="form-control"
                v-validate="'required'"
                v-model="formData.name">
              <div class="text-danger" v-if="errors.has('name')">
                {{errors.first('name')}}
              </div>
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <input
              type="hidden"
              name="id"
              class="form-control"
              v-validate="'required'"
              v-model="formData.id">
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <div :class="['form-group', {'has-error': errors.has('email')}]">
              <label for="email">Email</label>
              <input
                data-vv-as="email"
                type="email"
                name="email"
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
            <div :class="['form-group', {'has-error': errors.has('phone')}]">
              <label for="phone">Phone</label>
              <input
                data-vv-as="phone"
                type="phone"
                name="phone"
                class="form-control"
                v-validate="'required|numeric'"
                v-model="formData.phone">
              <div class="text-danger" v-if="errors.has('phone')">
                {{errors.first('phone')}}
              </div>
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <div :class="['form-group', {'has-error': errors.has('password')}]">
              <label for="password">Password</label>
              <input
                data-vv-as="password"
                type="password"
                name="password"
                class="form-control"
                v-validate="'required|alpha_num'"
                v-model="formData.password">
              <div class="text-danger" v-if="errors.has('password')">
                {{errors.first('password')}}
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 mt-3">
          <div class="row form-actions">
            <div>
              <button :disabled="loading" type="submit" class="btn btn-primary">Update</button>
            </div>
          </div>
        </div>
      </form>
      <div>
        <button @click="cancel()" class="btn btn-default">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  data () {
    return {
      loading: false,
      formData: {
        id: '',
        name: '',
        email: '',
        phone: '',
        password: ''
      }
    }
  },
  mounted () {
    this.$store.dispatch('user/detail', this.id)
      .then(data => {
        console.log(data)
      })
  },
  methods: {
    cancel () {
      this.isEdit = false
    },
    submit () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.loading = true
          this.save()
        } else {
          swal('Validation Failed', '', 'error')
        }
      })
    },
    deleteUser () {
      swal({
        title: 'Do you want to delete this user?',
        text: 'Once deleted, you will not be able to recover this data!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.loading = true
            this.$store.dispatch('user/delete', this.formData.id).then(data => {
              this.loading = false
              swal('Poof! Your account has been deleted!', {
                icon: 'success'
              })
            }).catch(err => {
              swal('Failed', err.message, 'error')
              this.loading = false
            })
          }
        })
    },
    save () {
      this.$store.dispatch('user/update', this.formData)
        .then(data => {
          this.formData = data.data
          swal('Great!', 'User update successfully!', 'success')
          this.loading = false
        }).catch(error => {
          swal('Failed to update user', error.message, 'error')
        })
    }
  }
}
</script>
