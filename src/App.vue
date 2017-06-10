<template>
  <div id="app" class="container">
    <header class="row">
      <div class="title col-md-12">
        <div class="brand">
          <img src="../static/images/logo.png" />
          <h1 class="title hidden">Prestamos Prima</h1>
        </div>
        <h2 class="subtitle text-center">PDF Uploader</h2>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="row">
        <upload-file
          class="col-md-6"
          id="uploadField"
          fileType="pdf.*"
          label="Select a file to upload (PDF)"
          api="http://pprima-back.dev/api/documents/"
        ></upload-file>
      </div>

      <div class="row">
        <documents
          class="col-md-12"
          api="http://pprima-back.dev/api/documents/"
        ></documents>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
html {
  font-size: 16px;
}

header {
  border-bottom: 1px lightgray solid;
  margin-bottom: 2rem;
  padding-bottom: 2rem;

  .brand {
    margin-top: 1rem;
    text-align: center;
  }

  .subtitle {
    color: gray;
  }
}

.upload-wrapper {
  margin-bottom: 2rem;
}

.documents-wrapper {
  border-top: 1px lightgray solid;
  padding-top: 2rem;
}
</style>

<script>
import Documents from './components/Documents'
import UploadFile from './components/UploadFile'

export default {
  name: 'app',
  components: {
    Documents,
    'upload-file': UploadFile
  }
}
</script>
