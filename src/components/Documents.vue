<template>
  <div class="documents-wrapper">
    <error-alert :errors="errors"></error-alert>

    <ul class="documents-list">
      <li class="document" v-for="document in documents">
        <a
          href="#"
          :data-id="document._id"
          @click="displayDocument"
          class="document-title"
        >
        {{ document.title }}
        </a>
        <a
          href="#"
          :data-id="document._id"
          class="glyphicon glyphicon-remove-sign delete"
          title="delete document"
          @click="deleteDocument"
        >
        </a>
        <br />
        <span>{{ document.description }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .documents-list {
    list-style: none;
    padding: 0;
    margin-left: 0;
  }

  .document {
    margin-bottom: 1em;
  }

  .document-title {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: .5em;

    &:hover,
    &:active,
    &:focus,
    &:visited {
      text-decoration: none;
    }
  }

  .delete {
    font-size: 1.5em;
    color: darkred;
    vertical-align: text-bottom;

    &:active,
    &:focus,
    &:visited {
      color: darkred;
      text-decoration: none;
    }

    &:hover {
      text-decoration: none;
      color: red;
    }
  }
</style>

<script>
// Get rid of trailing slash in URL
const trimUrl = url => url.replace(/\/$/, '')

export default {
  created () {
    this.getDocumentsList()
    this.$eventBus.$on('getDocumentsList', this.getDocumentsList)
  },
  props: [ 'api' ],
  data () {
    return {
      documents: [
      ],
      errors: []
    }
  },
  methods: {
    displayDocument (event) {
      const documentId = event.target.getAttribute('data-id')
      // Safari blocks window.open inside async calls, so we'll open it before
      const win = window.open()

      this.errors = []

      this.axios.get(trimUrl(this.api) + '/' + documentId)
      .then(response => {
        win.location = response.data.content
      })
      .catch(e => {
        win.close()
        this.errors.push(e.response.data)
      })
    },
    deleteDocument () {
      const documentId = event.target.getAttribute('data-id')

      this.axios.delete(trimUrl(this.api) + '/' + documentId)
      .then(response => {
        this.getDocumentsList()
      })
      .catch(e => {
        this.errors.push(e.response.data)
      })
    },
    getDocumentsList () {
      this.axios.get(this.api)
      .then(response => {
        this.documents = response.data
      })
      .catch(e => {
        this.errors.push(e.response.data)
      })
    }
  }
}
</script>
