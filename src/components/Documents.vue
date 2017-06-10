<template>
  <div class="documents-wrapper">
    <error-alert :errors="errors"></error-alert>

    <transition name="fade">
      <div v-if="!documents.length && ready" class="alert alert-info">
        <p>No PDF documents yet! Please, upload some.</p>
      </div>
    </transition>

    <transition-group class="documents-list" name="list-complete" tag="ul">
      <li class="document list-complete-item" v-for="document in documents" v-bind:key="document">
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
    </transition-group>

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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.list-complete-item {
  transition: all .5s;
}
.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>

<script>
// Get rid of trailing slash in URL
const trimUrl = url => url.replace(/\/$/, '')

export default {
  created () {
    this.getDocumentsList()
    this.$eventBus.$on('getDocumentsList', this.getDocumentsList)
    this.$eventBus.$on('addDocument', this.addDocument)
  },
  props: [ 'api' ],
  data () {
    return {
      documents: [],
      errors: [],
      ready: false
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
        const index = this.documents.findIndex(
          function (e) {
            return e._id === documentId
          }
        )
        this.documents.splice(index, 1)
      })
      .catch(e => {
        this.errors.push(e.response.data)
      })
    },
    addDocument (document) {
      this.documents.push(document)
    },
    getDocumentsList () {
      this.axios.get(this.api)
      .then(response => {
        this.ready = true
        this.documents = response.data
      })
      .catch(e => {
        this.errors.push(e.response.data)
      })
    }
  }
}
</script>
