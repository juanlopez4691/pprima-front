<template>
  <transition name="fade">
    <div class="error alert alert-danger" v-if="errors && errors.length">
      <ul>
        <li v-for="error in errors">{{ error.message }}</li>
      </ul>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  name: 'error-alert',
  props: [ 'errors' ]
}
</script>
