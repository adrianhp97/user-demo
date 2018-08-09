<template>
  <div>
    <navigator></navigator>
    <slot v-bind="{transform}"></slot>
  </div>
</template>

<script>
import Navigator from './Navigator'

export default {
  components: {
    Navigator
  },
  methods: {
    transform (data) {
      return this.$refs.form.submit()
    }
  }
}
</script>
