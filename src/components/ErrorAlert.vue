<template>
  <div class="error alert alert-danger" v-if="errors && errors.length">
    <ul>
      <li v-for="error in errors">{{ error.message }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'error-alert',
  props: [ 'errors' ]
}
</script>
