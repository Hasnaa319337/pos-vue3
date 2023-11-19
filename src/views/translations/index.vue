<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card" v-if="permissions.includes('view_translation')">
      <div class="card">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title" v-if="language">
            {{ trans('Translations') }}
          </h4>
          <div class="dropdown" v-if="permissions.includes('create_translation')">
            <a
              v-b-tooltip.hover
              class="mx-2 btn btn-primary text-white"
              @click="addTranslationModal"
            >
              <font-awesome-icon icon="fa-solid fa-add" />
            </a>
            <b-button variant="success" @click="generateFile()">
              <font-awesome-icon icon="fa-solid fa-upload" />
              {{ trans('generate_translation_file') }}
            </b-button>
            <b-button
              v-b-modal.modal-1
              type="button"
              variant="primary"
              class="mb-1 mx-2 btn btn-primary text-white"
              @click="hiddenFunction()"
            >
              {{ trans('import') }}</b-button
            >

            <b-button
              class="btn btn-primary text-white"
              variant="primary"
              @click="translationExport()"
            >
              {{ trans('export_excel') }}
            </b-button>
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="row mx-0 align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <b-form>
                <b-form-row>
                  <b-col class="d-flex">
                    <b-form-group class="col-md-5" label-for="input-2">
                      <b-form-input
                        label="search here"
                        v-model="filters.word"
                        id="input-2"
                        type="text"
                        class="form-control"
                        :placeholder="trans('search_here')"
                      />
                    </b-form-group>

                    <b-form-group class="col-md-3" label-for="input-2">
                      <b-button @click="refresh()">{{ trans('search') }}</b-button>
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </b-form>

              <b-table-simple
                sticky-header
                striped
                bordered
                responsive
                style="height: 100% !important"
              >
                <GlobalTabel :columns="columns" />
                <TableSkeletonLoader :items="10" :length="columns.length" v-if="skeletonLoading" />
                <b-tbody v-else class="text-center">
                  <b-tr v-for="trans in translations" :key="trans.id">
                    <b-td>
                      <input
                        type="text"
                        class="form-control en text-center"
                        readonly
                        @keyup.enter="update(trans)"
                        :value="trans.key"
                      />
                    </b-td>
                    <b-td v-for="lang in langs" :key="lang.id">
                      <input
                        type="text"
                        class="form-control"
                        :class="lang.locale"
                        @keyup.enter="update(trans)"
                        v-model="trans.t_[lang.locale]"
                        style="text-align: center"
                      />
                    </b-td>
                    <b-td>
                      <a
                        v-if="permissions.includes('update_translation')"
                        v-b-tooltip.hover
                        title="حفظ"
                        style="cursor: pointer; color: #007bff !important"
                        class="m-2"
                        @click="update(trans)"
                      >
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                      </a>
                      <a
                        v-if="permissions.includes('delete_translation')"
                        v-b-tooltip.hover
                        title="حذف"
                        style="cursor: pointer; color: red !important"
                        class="m-2"
                        @click="deleteTranslation(trans)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash" />
                      </a>
                      <ActionButton
                        v-if="permissions.includes('view_action_event_translation')"
                        :id="trans.id"
                        :resource_name="'translation'"
                      />
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-if="!translations.length && !skeletonLoading" class="text-center">
                  <b-tr>
                    <b-td colspan="12">
                      <h5 class="no_results_found">
                        {{ trans('no_results_found') }}
                      </h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
            <div class="col-sm-12 text-center">
              <pagination-component
                :items="translations"
                :last_page="last_page"
                :next_page="next_page"
                :prev_page="prev_page"
                :current_page="current_page"
                :next_page_url="next_page_url"
                :prev_page_url="prev_page_url"
                :first_page_url="first_page_url"
                :last_page_url="last_page_url"
                :total="total"
                @goToNext="goTo(next_page_url)"
                @goToPrev="goTo(prev_page_url)"
                @goToFirst="goTo(first_page_url)"
                @goToLast="goTo(last_page_url)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-col cols="12" v-else>
      <h2 class="text-center" v-if="language === 'en'">You Not Allowed to Open This Page</h2>
      <h2 class="text-center" v-else>هذه الصفحه غير مسموح لك الدخول عليها</h2>
    </b-col>
    <add-translation-modal></add-translation-modal>
    <div v-if="hidden">
      <b-modal id="modal-1">
        <input type="file" @change="onFileChange" />

        <b-button
          type="button"
          class="mb-1 mx-2 btn btn-primary text-white"
          variant="primary"
          @click="translationImport()"
        >
          {{ trans('import') }}</b-button
        >
      </b-modal>
    </div>
  </div>
</template>
<script>
import AddTranslationModal from '@/components/sections/modals/addTranslation.vue'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'

export default {
  name: 'AppTranslations',
  props: ['section', 'sections', 'user', 'user_language', 'permissions', 'language'],
  components: { PaginationComponent, AddTranslationModal, TableSkeletonLoader },
  data() {
    return {
      columns: ['key', 'english', 'arabic', 'actions'],
      filter: {
        per_page: 10
      },
      usingFilters: true,
      filters: {
        word: ''
      },
      hidden: false,

      translations: [],
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      last_page: 0,
      total: 0,

      itemsLoaded: false,
      word: '',
      number: 1,
      jumpTo: '',
      file: '',
      skeletonLoading: true
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    this.getTranslation()
  },
  watch: {
    jumpTo(val) {
      this.jumpToMethod(val)
    }
  },
  methods: {
    hiddenFunction() {
      this.hidden = !this.hidden
      console.log(this.hidden)
    },
    translationExport() {
      let url = 'api/translation-export'
      this.axios
        .get(url, {
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          },
          responseType: 'arraybuffer'
        })
        .then((response) => {
          console.log(response.data)

          const url = window.URL.createObjectURL(new Blob([response.data]))

          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'translation-list.xlsx')
          document.body.appendChild(link)
          link.click()
          this.showToastError(response.data.message, response.data.custom_code)
        })
        .catch((error) => {
          if (error?.response) {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          }
        })
    },
    onFileChange(event) {
      this.file = event.target.files[0]
    },
    translationImport() {
      this.formData = new FormData()
      this.formData.append('import', this.file)
      let url = 'api/translation-import'
      this.axios
        .post(url, this.formData, {
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          },
          responseType: 'arraybuffer'
        })
        .then((response) => {
          console.log(response.data)
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'translation-list.xlsx')
          document.body.appendChild(link)
          link.click()
          this.showToastError(response.data.message, response.data.custom_code)
        })
        .catch((error) => {
          if (error?.response) {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          }
        })
    },

    filter() {
      let str = ''
      for (var key in this.filters) {
        if (this.filters[key] == '') continue
        if (str != '') {
          str += '&'
        }
        str += key + '=' + this.filters[key]
      }
      let url = '/api/translations?' + str
      this.refresh(url)
    },
    getTranslation() {
      this.axios
        .get('/api/languages')
        .then((res) => {
          this.langs = res.data.body.languages.data
        })
        .catch(() => {})
    },
    addTranslationModal() {
      let settings = {
        inventories: this.inventories,
        user: this.user
      }
      this.SharedEvent.fire('open-barcode-modal', {
        langs: this.langs,
        settings: settings
      })
    },

    goTo(url) {
      this.translations = []
      this.skeletonLoading = true
      let str = 'search=' + this.filters.word
      url = url.includes('?') ? url + '&' + str : url + '?' + str

      this.axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false
          this.translations = res.data.body.translations.data
          this.total = res.data.body.translations.paginate.total
          this.current_page = res.data.body.translations.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1

          this.next_page_url = res.data.body.translations.paginate.next_page_url
          this.prev_page_url = res.data.body.translations.paginate.prev_page_url
          this.first_page_url = res.data.body.translations.paginate.first_page_url

          this.last_page_url = res.data.body.translations.paginate.last_page_url
          this.last_page = res.data.body.translations.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    refresh() {
      this.itemsLoaded = false
      this.axios({
        method: 'GET',
        url: '/api/translations',
        params: {
          page: this.current_page,
          search: this.filters.word // 👈 use "params" here
        }
      })
        .then((res) => {
          if (res.data.status) {
            this.skeletonLoading = false
            this.translations = res.data.body.translations.data
            this.total = res.data.body.translations.paginate.total
            this.current_page = res.data.body.translations.paginate.current_page
            this.prev_page = this.current_page - 1
            this.next_page = this.current_page + 1

            this.next_page_url = res.data.body.translations.paginate.next_page_url
            this.prev_page_url = res.data.body.translations.paginate.prev_page_url
            this.first_page_url = res.data.body.translations.paginate.first_page_url
            this.last_page_url = res.data.body.translations.paginate.last_page_url
            this.last_page = res.data.body.translations.paginate.last_page

            this.itemsLoaded = true
          }
        })
        .catch((error) => {
          if (error?.response) {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          }
        })
    },

    deleteTranslation(trans) {
      this.$bvModal
        // trans
        .msgBoxConfirm(this.trans('Do you want to delete this word'), {
          okTitle: this.trans('yes'),
          cancelTitle: this.trans('no'),
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal'
        })
        .then((res) => {
          if (res) {
            this.axios
              .delete('/api/translations/' + trans.id)
              .then(
                (res) => {
                  this.showToastError(res.data.message, res.data.custom_code)
                  this.refresh()
                },
                (error) => {
                  this.showToastError(error.response.data.message, error.response.data.custom_code)
                }
              )
              .catch((error) => {
                this.showToastError(error.response.data.message, error.response.data.custom_code)
              })
          }
        })
    },
    update(trans) {
      this.axios
        .patch('/api/translations/' + trans.id, trans)
        .then(
          (res) => {
            this.showToastError(res.data.message, res.data.custom_code)
          },
          (error) => {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          }
        )
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    generateFile() {
      this.axios
        .post('/api/translations/generate-files/', {})
        .then(
          (res) => {
            if (res.data.status) {
              this.showToastError(res.data.message, res.data.custom_code)
              if (window.localStorage.hasOwnProperty('stringsData')) {
                window.localStorage.removeItem('stringsData')
              }
              window.localStorage.setItem('stringsData', JSON.stringify(res.data.body.strings))
            } else {
              this.showToastError(res.data.message, res.data.custom_code)
            }
          },
          (error) => {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          }
        )
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    openImportTranslationModal() {
      this.SharedEvent.fire('open-import-translation-modal')
    }
  }
}
</script>
<style>
.b-table-sticky-header > .table.b-table > thead > tr > th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}

@media screen and (max-width: 390px) {
  .dropdown {
    position: relative;
    width: 100%;
    text-align: center;
  }
}

/* 
.modal-body{
  text-align: center !important;
    margin-top: 7px !important;
    font-weight: 600 !important;
    font-size: 19px !important;
} */
</style>
