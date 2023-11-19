<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title" v-if="language">{{ trans('languages') }}</h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>
      <div class="card-body">
        <div class="row mx-0 align-items-start justify-content-between mb-4">
          <!-- <b-col cols="12" md="4">
            <ValidationObserver v-slot="{ handleSubmit }" ref="form" v-if="permissions.includes('create_language')">
              <b-form @submit.prevent="handleSubmit(store)">
                <ValidationProvider
                  rules="required"
                  v-slot="{ valid, errors }"
                  :name="trans('language_title')"
                >
                  <b-form-group :label="trans('language_title')">
                    <b-form-input
                      type="text"
                      v-model="language.title"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  rules="required|englishLettersOnly|max:2"
                  v-slot="{ valid, errors }"
                  :name="trans('language_locale')"
                >
                  <b-form-group :label="trans('language_locale')">
                    <b-form-input
                      type="text"
                      v-model="language.locale"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <b-form-row class="justify-content-center mb-4">
                  <b-button variant="success" type="submit">
                    <font-awesome-icon icon="fa-solid fa-check" />
                  </b-button>
                </b-form-row>
              </b-form>
            </ValidationObserver>
          </b-col> -->
          <b-col cols="12" md="12" v-if="permissions.includes('view_language')">
            <b-table-simple sticky-header bordered responsive style="min-height: 50px">
              <global-tabel :columns="columns" />
              <TableSkeletonLoader :length="columns.length" :items="2" v-if="skeletonLoading" />
              <b-tbody v-else class="text-center">
                <b-tr v-for="lang in languages" :key="lang.id">
                  <b-td>{{ lang.title }}</b-td>
                  <b-td>{{ lang.locale }}</b-td>
                </b-tr>
              </b-tbody>
              <b-tbody v-if="!skeletonLoading && !languages.length" class="text-center">
                <b-tr>
                  <b-td colspan="12">
                    <h5>{{ trans('no_results_found') }}</h5>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>

            <pagination-component
              v-if="!skeletonLoading"
              :items="languages"
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
          </b-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import GlobalTabel from '@/components/global/GlobalTabel.vue'
export default {
  components: { TableSkeletonLoader, PaginationComponent, GlobalTabel },
  name: 'AppLanguages',
  props: ['section', 'sections', 'user', 'user_language', 'permissions'],
  data() {
    return {
      columns: ['language_title', 'language_locale'],
      total: '',
      current_page: '',
      prev_page: '',
      next_page: '',
      last_page: '',
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      alertType: 'success',
      language: {},
      languages: [],

      skeletonLoading: true
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    refresh() {
      this.axios
        .get('/api/languages')
        .then((res) => {
          this.skeletonLoading = false
          this.languages = res.data.body.languages.data

          this.total = res.data.body.languages.paginate.total
          this.current_page = res.data.body.languages.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.languages.paginate.next_page_url
          this.prev_page_url = res.data.body.languages.paginate.prev_page_url
          this.first_page_url = res.data.body.languages.paginate.first_page_url
          this.last_page_url = res.data.body.languages.paginate.last_page_url
          this.last_page = res.data.body.languages.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    goTo(url) {
      this.languages = []
      if (this.usingFilters) {
        let str = ''
        for (var key in this.filter) {
          if (this.filter[key] == '') continue
          if (str != '') {
            str += '&'
          }
          str += key + '=' + this.filter[key]
        }
        url = url.includes('?') ? url + '&' + str : url + '?' + str
      }
      this.itemsLoaded = false
      this.axios
        .get(url)
        .then((res) => {
          this.languages = res.data.body.languages.data

          this.total = res.data.body.languages.paginate.total
          this.current_page = res.data.body.languages.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.languages.paginate.next_page_url
          this.prev_page_url = res.data.body.languages.paginate.prev_page_url
          this.first_page_url = res.data.body.languages.paginate.first_page_url
          this.last_page_url = res.data.body.languages.paginate.last_page_url
          this.last_page = res.data.body.languages.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    store() {
      this.axios
        .post('/api/languages', this.language)
        .then(
          (res) => {
            if (res.data.status) {
              this.showToastError(res.data.message, res.data.custom_code)
              this.languages.push(this.language)
              this.language = {}
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
    }
  }
}
</script>
