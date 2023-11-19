<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title" v-if="language">
          {{ trans('AccountsLinkTypes') }}
        </h4>
        <div class="dropdown">
          <b-button
            variant="primary"
            @click="searchOn = !searchOn"
            class="search-btn my-1"
            :style="language == 'en' ? 'right: 0' : 'left: 0'"
          >
            <i class="bi bi-search"></i>
          </b-button>
          <GoBackButton />
        </div>
      </div>
      <div class="card-body">
        <div class="row mx-0 align-items-start justify-content-between mb-4">
          <b-col cols="12" md="4">
            <ValidationObserver ref="form" v-if="permissions.includes('view_account_type')">
              <b-form @submit.prevent="store()" @reset.prevent="reset">
                <b-form-row v-if="editMode != 1"> </b-form-row>
                <b-form-row>
                  <b-col cols="12">
                    <ValidationProvider
                      rules="required|arabicLettersAndNumbersOnly"
                      :name="trans('name') + '(Ar)'"
                    >
                      <b-form-group :label="trans('name') + '(Ar)'">
                        <b-input type="text" v-model="form.translation.title.ar"> </b-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ trans('This field accepts arabic words only') }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols="12">
                    <ValidationProvider
                      rules="englishLettersAndNumbersOnly|required"
                      :name="trans('name') + '(EN)'"
                    >
                      <b-form-group :label="trans('name') + '(EN)'">
                        <b-input type="text" v-model="form.translation.title.en"> </b-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ trans('This field accepts English words only') }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols="12">
                    <ValidationProvider
                      rules="required|arabicLettersAndNumbersOnly"
                      :name="trans('required_field')"
                    >
                      <b-form-group :label="trans('description') + '(AR)'">
                        <b-form-textarea
                          rows="3"
                          max-rows="6"
                          v-model="form.translation.description.ar"
                        >
                        </b-form-textarea>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ trans('This field accepts arabic words only') }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols="12">
                    <ValidationProvider
                      rules="required|englishLettersAndNumbersOnly"
                      :name="trans('required_field')"
                    >
                      <b-form-group :label="trans('description') + '(EN)'">
                        <b-form-textarea
                          rows="3"
                          max-rows="6"
                          v-model="form.translation.description.en"
                        >
                        </b-form-textarea>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ trans('This field accepts English words only') }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols="12">
                    <ValidationProvider rules="required" :name="trans('sort')">
                      <b-form-group :label="trans('sort')">
                        <b-form-input type="number" v-model="form.sort"> </b-form-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ trans('This field accepts numbers only') }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols="12">
                    <v-row style="justify-content: space-between; padding: 0 11px; margin: 11px 0">
                      <span> {{ trans('status') }}</span>
                      <label class="switch">
                        <input type="checkbox" v-model="form.active" />
                        <span class="slider round"></span>
                      </label>
                    </v-row>
                  </b-col>
                </b-form-row>

                <b-form-row class="justify-content-center mb-4" style="column-gap: 11px">
                  <b-button variant="success" type="submit" style="border-radius: 50px !important"
                    >{{ trans('save') }}
                  </b-button>
                  <b-button
                    style="
                      background: #cf1212 0% 0% no-repeat padding-box;
                      border-radius: 50px !important;
                      font: normal normal 300 14px/11px Tahoma;
                      letter-spacing: 0px;
                      color: #ffffff;
                      border: none;
                    "
                    variant="info"
                    @click="reset"
                  >
                    {{ trans('cancel') }}
                  </b-button>
                </b-form-row>
              </b-form>
            </ValidationObserver>
          </b-col>
          <b-col cols="12" md="8">
            <b-row style="margin-right: 0px !important" v-if="searchOn">
              <ValidationObserver>
                <b-form>
                  <b-form-row>
                    <b-col cols="6" md="6">
                      <b-form-group>
                        <b-form-input
                          type="text"
                          class="form-control"
                          v-model="filters.serach"
                          :placeholder="trans('name')"
                        />
                      </b-form-group>
                    </b-col>

                    <b-col cols="2" md="2">
                      <b-form-group style="display: flex">
                        <b-button type="submit" @click.prevent="refresh">
                          {{ trans('search') }}</b-button
                        >
                      </b-form-group>
                    </b-col>
                    <b-col cols="4" md="4">
                      <b-form-group style="width: 200px">
                        <b-button type="reset" @click="reset">
                          <font-awesome-icon icon="fa-solid fa-arrows-rotate " />
                          {{ trans('clear') }}</b-button
                        >
                      </b-form-group>
                    </b-col>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </b-row>
            <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
              <GlobalTabel :columns="columns" />
              <TableSkeletonLoader :length="columns.length" :items="10" v-if="skeletonLoading" />
              <b-tbody v-else class="text-center">
                <b-tr v-for="(se, index) in accountType" :key="se.id">
                  <b-td>
                    {{ se.id }}
                  </b-td>
                  <b-td>
                    {{ se.translation.title.ar }}
                  </b-td>
                  <b-td>
                    {{ se.translation.title.en }}
                  </b-td>
                  <b-td>
                    <label class="switch" style="margin: auto">
                      <input type="checkbox" v-model="se.active" @change="changeActive(se)" />
                      <span class="slider round"></span>
                    </label>
                  </b-td>

                  <b-td>
                    <a
                      v-b-tooltip.hover
                      :title="trans('edit')"
                      style="cursor: pointer; color: #007bff !important"
                      class="mx-2"
                      @click="edit(se)"
                      ><font-awesome-icon icon="fa-solid fa-pen-to-square"
                    /></a>

                    <a
                      v-b-tooltip.hover
                      :title="trans('delete')"
                      style="cursor: pointer; color: #dc3545 !important"
                      class="mx-2"
                      @click="destroy(se.id, index)"
                    >
                      <font-awesome-icon icon="fa-solid fa-trash "
                    /></a>
                    <ActionButton
                      v-if="permissions.includes('view_action_event_account_type')"
                      :id="se.id"
                      :resource_name="'account_type'"
                    />
                  </b-td>
                </b-tr>
              </b-tbody>
              <b-tbody v-if="loaded && !accountType.length" class="text-center">
                <b-tr>
                  <b-td colspan="4">
                    <h5>{{ trans('no_results_found') }}</h5>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
            <div class="col-sm-12 text-center" v-if="accountType.length">
              <pagination-component
                :items="accountType"
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
          </b-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'
export default {
  components: { TableSkeletonLoader, PaginationComponent },
  name: 'AccountsLinkTypes',
  props: ['section', 'sections', 'user', 'user_language', 'langs', 'language', 'permissions'],
  data() {
    return {
      columns: ['id', 'name_ar', 'name_en', 'status', 'actions'],
      searchOn: false,
      filters: {
        serach: ''
      },
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      last_page: 0,
      total: 0,
      paginate: {},

      editMode: 0,
      ed_sec: {},
      form: {
        link_number: '',
        translation: {
          title: {
            ar: '',
            en: ''
          },
          description: {
            ar: '',
            en: ''
          },
          sort: 1,
          active: 0,
          data: []
        }
      },
      accountType: [],
      strings: [],
      loaded: false,
      skeletonLoading: true
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    goTo(url) {
      this.skeletonLoading = true
      this.loaded = false
      this.secs = []
      this.axios({
        method: 'get',
        url: url,
        params: {
          search: this.filters.serach
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.accountType = res.data.body.account_type.data
          this.paginte = res.data.body.account_type.paginate
          this.total = res.data.body.account_type.paginate.total
          this.current_page = res.data.body.account_type.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.account_type.paginate.next_page_url
          this.prev_page_url = res.data.body.account_type.paginate.prev_page_url
          this.first_page_url = res.data.body.account_type.paginate.first_page_url
          this.last_page_url = res.data.body.account_type.paginate.last_page_url
          this.last_page = res.data.body.account_type.paginate.last_page

          this.loaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    refresh() {
      this.loaded = false
      this.secs = []
      this.axios({
        method: 'get',
        url: '/api/account-types',
        params: {
          page: this.current_page,
          search: this.filters.serach
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.accountType = res.data.body.account_type.data
          this.paginte = res.data.body.account_type.paginate
          this.total = res.data.body.account_type.paginate.total
          this.current_page = res.data.body.account_type.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.account_type.paginate.next_page_url
          this.prev_page_url = res.data.body.account_type.paginate.prev_page_url
          this.first_page_url = res.data.body.account_type.paginate.first_page_url
          this.last_page_url = res.data.body.account_type.paginate.last_page_url
          this.last_page = res.data.body.account_type.paginate.last_page

          this.loaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    changeActive(se) {
      let data = {
        title: {
          ar: se.translation.title.ar,
          en: se.translation.title.en
        },
        description: {
          ar: se.translation.description === null ? 'ا' : se.translation.description.ar,
          en: se.translation.description === null ? 'a' : se.translation.description.en
        },

        sort: se.sort === null ? 1 : se.sort,
        active: se.active,
        data: []
      }
      let method = 'put'
      this.axios[method](
        '/api/account-types/' + se.id,

        data
      )
        .then((res) => {
          if (res.data.status == true) {
            this.showToastError(res.data.message, res.data.custom_code)

            if (this.editMode) {
              this.editMode = 0
            }

            this.form = {
              link_number: '',
              translation: {
                title: {
                  ar: '',
                  en: ''
                },
                description: {
                  ar: '',
                  en: ''
                }
              },

              sort: 1,
              active: 0,
              data: []
            }
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    store() {
      let data = {
        title: {
          ar: this.form.translation.title.ar,
          en: this.form.translation.title.en
        },
        description: {
          ar:
            this.form.translation.description === null ? 'ا' : this.form.translation.description.ar,
          en:
            this.form.translation.description === null ? 'a' : this.form.translation.description.en
        },

        sort: this.form.sort === null ? 1 : this.form.sort,
        active: this.form.active === true ? 1 : 0,
        data: this.form.data ? this.form.data : []
      }
      let method = this.editMode ? 'put' : 'post'
      this.axios[method](
        this.editMode ? '/api/account-types/' + this.form.id : '/api/account-types',
        data
      )
        .then((res) => {
          if (res.data.status == true) {
            this.showToastError(res.data.message, res.data.custom_code)

            if (this.editMode) {
              this.editMode = 0
            }

            ;(this.form = {
              link_number: '',
              translation: {
                title: {
                  ar: '',
                  en: ''
                },
                description: {
                  ar: '',
                  en: ''
                }
              },

              sort: 1,
              active: 0,
              data: []
            }),
              this.$nextTick(() => {
                this.$refs.form.reset()
              })
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
          }
          return this.refresh()
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    edit(section) {
      this.editMode = 1
      this.form = this.cloneItem(section)
    },
    destroy(id, index) {
      this.$bvModal
        .msgBoxConfirm(this.trans('Do you want to delete this account'), {
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
            this.axios
              .delete('/api/account-types/' + id)
              .then((res) => {
                this.accountType.splice(index, 1)
                this.showToastError(res.data.message, res.data.custom_code)
                this.reset()
              })
              .catch((error) => {
                this.showToastError(error.response.data.message, error.response.data.custom_code)
              })
          }
        })
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },

    reset() {
      this.form = {
        link_number: '',
        translation: {
          title: {
            ar: '',
            en: ''
          },
          description: {
            ar: '',
            en: ''
          }
        },

        sort: 1,
        active: 0
      }
      this.editMode = 0
    }
  }
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 59px;
  height: 27px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 8px;

  bottom: 5px;
  background-color: white;

  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #46cb65;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}
</style>
