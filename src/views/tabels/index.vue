<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title" v-if="language">
            {{ trans('tables') }}
          </h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="row mx-0 align-items-center justify-content-between mb-4">
            <div class="col-sm-4" v-if="permissions.includes('create_table')">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(store)">
                  <b-form-row>
                    <b-col cols="8">
                      <ValidationProvider
                        rules="required|arabicLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('title') + '(Ar)'"
                      >
                        <b-form-group :label="trans('title') + '(Ar)'">
                          <b-input
                            id="title_ar"
                            v-model="table.translation.title.ar"
                            type="text"
                            :state="errors[0] ? false : valid ? true : null"
                            class="mb-2 mr-sm-2 mb-sm-0"
                          ></b-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts arabic words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>

                      <ValidationProvider
                        rules="englishLettersAndNumbersOnly|required"
                        v-slot="{ valid, errors }"
                        :name="trans('title') + '(En)'"
                      >
                        <b-form-group :label="trans('title') + '(En)'">
                          <b-input
                            id="title_en"
                            v-model="table.translation.title.en"
                            type="text"
                            :state="errors[0] ? false : valid ? true : null"
                            class="mb-2 mr-sm-2 mb-sm-0"
                          ></b-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts English words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col cols="12" class="justify-content-center row" style="gap: 5px">
                      <b-button :variant="EditMode ? 'primary' : 'success'" type="submit">
                        {{ trans('save') }}
                      </b-button>
                      <b-button
                        style="margin: 0px 5px; background: #efbe1c; color: #fff; border: none"
                        variant="danger"
                        type="reset"
                      >
                        <span style="display: block">{{ trans('reset') }}</span>
                      </b-button>
                    </b-col>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </div>
            <div class="col-sm-8" v-if="permissions.includes('view_table')">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <b-th class="text-center">{{ trans('title') }} (En)</b-th>
                    <b-th class="text-center" style="border: 2px solid #85c3ff"
                      >{{ trans('title') }}(Ar)</b-th
                    >
                    <b-th>{{ trans('options') }}</b-th>
                  </b-tr>
                </b-thead>

                <b-tbody v-if="tables.length" class="text-center">
                  <b-tr v-for="(attr, idx) in tables" :key="attr.id">
                    <b-td>{{ attr.translation.title.en }}</b-td>
                    <b-td>{{ attr.translation.title.ar }}</b-td>

                    <b-td>
                      <a
                        v-b-tooltip.hover
                        :title="trans('edit')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        v-if="permissions.includes('update_table')"
                        @click="edit(idx, attr)"
                        ><font-awesome-icon icon="fa-solid fa-pen-to-square"
                      /></a>

                      <a
                        v-b-tooltip.hover
                        :title="trans('delete')"
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2"
                        v-if="permissions.includes('delete_table')"
                        @click="Delete(attr.id)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash "
                      /></a>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-else-if="!tables.length" class="text-center">
                  <b-tr>
                    <b-td colspan="2">
                      <h5 class="no_results_found">
                        {{ strings['no_results_found'] }}
                      </h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-else class="text-center">
                  <b-tr>
                    <b-td colspan="2">
                      <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
              <pagination-component
                :items="tables"
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
            <b-col cols="12" v-else>
              <h2 class="text-center" v-if="language == 'en'">You Not Allowed to Open This Page</h2>
              <h2 class="text-center" v-else>هذه الصفحه غير مسموح لك الدخول عليها</h2>
            </b-col>
          </div>
        </div>
      </div>
      <div style="height: 100%; width: 100%" v-else>
        <skeleton-loader />
      </div>
    </div>
  </div>
</template>
<style>
tr.select-table {
  border: 1px solid #000;
  background-color: #077b53 !important;
  height: 60px;
}
</style>

<script>
import Vue from 'vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'

Vue.use(VuejsDialog)
export default {
  name: 'AppTables',
  props: ['section', 'sections', 'user', 'user_language', 'langs', 'permissions', 'language'],
  components: { PaginationComponent, SkeletonLoader },
  data() {
    return {
      tables: [],
      paginate: {},
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,
      last_page: 0,
      loaded: false,

      table: {
        translation: {
          title: {
            en: '',
            ar: ''
          }
        }
      },
      EditMode: 0,
      editIndex: ''
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    refresh() {
      this.axios
        .get('/api/tables')
        .then((res) => {
          this.tables = res.data.body.tables.data
          this.paginate = res.data.body.tables.paginate
          this.total = res.data.body.tables.paginate.total
          this.current_page = res.data.body.tables.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.tables.paginate.next_page_url
          this.prev_page_url = res.data.body.tables.paginate.prev_page_url
          this.first_page_url = res.data.body.tables.paginate.first_page_url
          this.last_page_url = res.data.body.tables.paginate.last_page_url
          this.last_page = res.data.body.tables.paginate.last_page

          this.loaded = true
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    goTo(url) {
      this.tables = []

      this.axios
        .get(url)
        .then((res) => {
          this.tables = res.data.body.tables.data
          this.paginate = res.data.body.tables.paginate
          this.total = res.data.body.tables.paginate.total
          this.current_page = res.data.body.tables.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.tables.paginate.next_page_url
          this.prev_page_url = res.data.body.tables.paginate.prev_page_url
          this.first_page_url = res.data.body.tables.paginate.first_page_url
          this.last_page_url = res.data.body.tables.paginate.last_page_url
          this.last_page = res.data.body.tables.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    edit(idx, attr) {
      this.EditMode = 1
      this.table = this.cloneItem(attr)
      this.editIndex = idx
    },
    store() {
      let data = {
        title: {
          en: this.table.translation.title.en,
          ar: this.table.translation.title.ar
        }
      }
      // console.log(this.table);
      let uri = this.EditMode ? '/api/tables/' + this.table.id : '/api/tables'

      let method = this.EditMode ? 'put' : 'post'
      this.axios[method](uri, data)
        .then(
          (res) => {
            if (res.data.status) {
              this.showToastError(res.data.message, res.data.custom_code)
              this.table.translation.title.ar = ' '
              this.table.translation.title.en = ' '

              this.$nextTick(() => {
                this.$refs.form.reset()
                this.refresh()
              })

              if (this.EditMode) {
                this.EditMode = 0
                this.tables[this.editIndex] = this.table
                this.refresh()
              } else {
                this.tables.push(res.data.table)
              }
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

    Delete(id) {
      this.$bvModal
        .msgBoxConfirm(this.trans('Do you want to delete this table'), {
          okTitle: this.trans('yes'),
          cancelTitle: this.trans('no'),
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal'
        })
        .then((value) => {
          if (value) {
            this.table.translation.title.ar = ' '
            this.table.translation.title.en = ' '
            this.axios
              .delete('/api/tables/' + id)
              .then((res) => {
                if (res.data.status) {
                  this.showToastError(res.data.message, res.data.custom_code)
                  this.refresh()
                } else {
                  this.showToastError(res.data.message, res.data.custom_code)
                }
              })
              .catch((error) => {
                this.showToastError(error.response.data.message, error.response.data.custom_code)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    resetForm() {
      this.table.translation.title.ar = ''
      this.table.translation.title.en = ''
    }
  }
}
</script>
