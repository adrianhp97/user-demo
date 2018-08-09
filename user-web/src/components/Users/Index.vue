<template>
  <layout>
    <div class="profile-wrapper">
      <div class="card">
        <div class="card-body row">
          <div class="col-sm-12 col-md-3 text-center profile-left">
            <p><img class=" img-fluid" src="@/assets/img/people.png" alt="User Image"></p>
            <h4 class="card-title">{{ profile.name }}</h4>
            <router-link :to="'/edit'" class="btn btn-primary">
              Edit
            </router-link>
          </div>
          <div class="col-sm-12 col-md-9 profile-right">
            <h4 class="card-title">Profile</h4>
            <table>
              <tr>
                <td class="profile-icon"><i class="fa fa-envelope"></i></td>
                <td class="profile-key">Email</td>
                <td>:</td>
                <td class="profile-value">{{ profile.email }}</td>
              </tr>
              <tr>
                <td class="profile-icon"><i class="fa fa-phone"></i></td>
                <td class="profile-key">Phone</td>
                <td>:</td>
                <td class="profile-value">{{ profile.phone }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
export default {
  data () {
    return {
      profile: {
        name: '',
        email: '',
        phone: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  }
}
</script>
