<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link :to="'/'" class="navbar-brand">
        Home
      </router-link>
      <span class="btn btn-primary" @click="logout">Logout</span>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
        .then(data => {
          console.log(data)
        })
    }
  }
}
</script>
