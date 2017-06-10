<template>
  <div class="upload-wrapper">
    <error-alert :errors="errors"></error-alert>

    <div v-if="uploadFieldVisible" class="form-group">
      <label :for="id">{{ label }}</label>
      <input
        class="form-control"
        type="file"
        @change="fieldChange"
        :id="id"
        :fileType="fileType"
      />
    </div>

    <button
      disabled
      class="btn btn-success"
      v-if="uploadFieldVisible"
      @click="uploadFile"
      :id="uploadBtnId"
    >Upload</button>

    <button
      class="btn"
      @click="toggleUploadField"
      :class="btnClass"
    >{{ btnLabel }}</button>
  </div>
</template>

<script>
export default {
  name: 'upload-file',
  props: ['id', 'label', 'fileType', 'api'],
  data () {
    return {
      uploadFieldVisible: false,
      btnLabel: 'New file',
      btnClass: 'btn-success',
      uploadBtnId: this.id + '_uploadBtn',
      errors: []
    }
  },
  methods: {
    toggleUploadField () {
      this.uploadFieldVisible = !this.uploadFieldVisible

      if (this.uploadFieldVisible) {
        this.showUploadField()
      } else {
        this.hideUploadField()
        this.errors = []
      }
    },
    hideUploadField () {
      this.uploadFieldVisible = false
      this.btnLabel = 'New file'
      this.btnClass = 'btn-success'
    },
    showUploadField () {
      this.uploadFieldVisible = true
      this.btnLabel = 'Cancel'
      this.btnClass = 'btn-danger'
    },
    fieldChange (event) {
      const fileInput = event.target
      const file = fileInput.files[0]
      const regex = new RegExp(this.fileType)

      this.errors = []

      if (file.type.match(regex)) {
        document.getElementById(this.uploadBtnId).disabled = false
      } else {
        this.errors.push({ message: 'File type not supported!' })
        document.getElementById(this.uploadBtnId).disabled = true
      }
    },
    uploadFile () {
      const fileInput = document.getElementById(this.id)
      const file = fileInput.files[0]
      const reader = new FileReader()

      this.errors = []

      reader.onload = (e) => {
        const content = reader.result
        const title = file.name.substr(0, file.name.lastIndexOf('.')) || file.name
        const description = ''

        // POST the file to the API
        this.axios.post(
          this.api,
          { title, document, description, content }
        )
        .then(response => {
          this.hideUploadField()
          this.$eventBus.$emit('addDocument', response.data)
        })
        .catch(e => {
          this.errors.push(e.response.data)
        })
      }

      // Get the file contents
      reader.readAsDataURL(file)
    }
  }
}
</script>
