<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ trans('Accounts Links') }}</h4>
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
      <div class="card-body" v-if="permissions.includes('view_any_account_type')">
        <div class="row mx-0 align-items-start justify-content-between mb-4">
          <b-col cols="12" md="4">
            <b-button variant="info" v-if="editMode == 1" @click="reset">
              <i class="bi bi-plus-lg"></i>
            </b-button>
            <ValidationObserver ref="form" v-if="permissions.includes('create_account_type')">
              <b-form @submit.prevent="store()">
                <b-form-row v-if="editMode != 1">
                  <b-col cols="12">
                    <ValidationProvider
                      rules="required|englishLettersOnlyNoSpace"
                      :name="trans('link_name')"
                    >
                      <b-form-group :label="trans('link_name')">
                        <b-form-input type="text" v-model="form.link_name"> </b-form-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ trans('This field accepts English words only') }}
                          {{ trans('without sapces') }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                </b-form-row>
                <b-form-row v-if="editMode != 1">
                  <b-col cols="12">
                    <ValidationProvider
                      rules="required|englishLettersOnlyNoSpace"
                      :name="trans('slug')"
                    >
                      <b-form-group :label="trans('slug')">
                        <b-form-input type="text" v-model="form.slug"> </b-form-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ trans('This field accepts English words only') }}
                          {{ trans('without sapces') }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols="12">
                    <ValidationProvider
                      rules="required|arabicLettersAndNumbersOnly"
                      :name="trans('name') + '(AR)'"
                    >
                      <b-form-group :label="trans('name') + '(AR)'">
                        <b-form-input type="text" v-model="form.translation.title.ar">
                        </b-form-input>
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
                      :name="trans('name') + '(EN)'"
                    >
                      <b-form-group :label="trans('Name') + '(EN)'">
                        <b-form-input type="text" v-model="form.translation.title.en">
                        </b-form-input>
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
                      :name="trans('description') + '(AR)'"
                    >
                      <b-form-group :label="trans('description') + '(AR)'">
                        <b-form-textarea
                          style="overflow-y: hidden !important"
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
                      :name="trans('description') + '(EN)'"
                    >
                      <b-form-group :label="trans('description') + '(EN)'">
                        <b-form-textarea
                          style="overflow-y: hidden !important"
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
                    <b-form-checkbox id="checkbox-1" v-model="form.active" name="active">
                      {{ trans('active') }}
                    </b-form-checkbox>
                  </b-col>
                </b-form-row>
                <b-form-row v-if="!editMode">
                  <b-col cols="12">
                    <b-form-checkbox id="checkbox-2" v-model="form.is_multiple" name="is_multiple">
                      {{ trans('is_multiple') }}
                    </b-form-checkbox>
                  </b-col>
                </b-form-row>
                <b-form-row v-if="!editMode">
                  <b-col cols="12">
                    <b-form-checkbox
                      id="checkbox-3"
                      v-model="form.allow_delete"
                      name="allow_delete"
                    >
                      {{ trans('deleteable') }}
                    </b-form-checkbox>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols="12">
                    <b-form-checkbox
                      id="checkbox-4"
                      v-model="form.appears_in_reports"
                      name="appears_in_reports"
                    >
                      {{ trans('appears_in_reports') }}
                    </b-form-checkbox>
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
                          v-model="filters.search"
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

            <b-table-simple
              v-if="skeletonLoading"
              bordered
              sticky-header
              striped
              responsive
              style="min-height: 50px"
            >
              <GlobalTabel :columns="columns" />
              <TableSkeletonLoader :items="10" :length="columns.length" />
            </b-table-simple>
            <b-table-simple
              v-else
              sticky-header
              striped
              bordered
              responsive
              style="min-height: 50px"
            >
              <GlobalTabel :columns="columns" />

              <b-tbody v-if="accountType.length" class="text-center">
                <b-tr v-for="(se, index) in accountType" :key="se.id">
                  <b-td>
                    {{ se.sort }}
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
                      v-if="permissions.includes('update_account_type')"
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
                      v-if="permissions.includes('delete_account_type') && se.allow_delete === true"
                      @click="destroy(se.id, index)"
                    >
                      <font-awesome-icon icon="fa-solid fa-trash "
                    /></a>
                    <ActionButton
                      v-if="permissions.includes('view_action_event_account_link')"
                      :id="se.id"
                      :resource_name="'account_link'"
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
          </b-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'

export default {
  name: 'AccountsTypes',
  components: { TableSkeletonLoader },
  props: ['section', 'sections', 'user', 'user_language', 'langs', 'language', 'permissions'],
  data() {
    return {
      columns: ['sort', 'name_ar', 'name_en', 'status', 'actions'],
      searchOn: false,
      skeletonLoading: true,
      filters: {
        search: ''
      },

      editMode: 0,
      ed_sec: {},
      form: {
        link_name: '',
        slug: null,

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
        is_multiple: 0,
        allow_delete: 0,
        appears_in_reports: 0,

        active: 0,
        sort: null,
        data: []
      },
      accountType: [],
      strings: [],
      loaded: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    setTimeout(() => {
      this.refresh()
    }, 3000)
  },
  methods: {
    refresh() {
      this.secs = []
      this.axios({
        method: 'GET',
        url: '/api/account-links',
        params: {
          page: 1,
          search: this.filters.search
        }
      })
        .then((res) => {
          this.loaded = true
          this.accountType = res.data.body.account_links
          this.skeletonLoading = false
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    changeActive(se) {
      let myData = {
        link_name: se.link_name,
        slug: se.slug,

        title: {
          ar: se.translation.title.ar,
          en: se.translation.title.en
        },
        description: {
          ar: se.translation.description.ar,
          en: se.translation.description.en
        },

        allow_delete: se.allow_delete,
        is_multiple: se.is_multiple,
        appears_in_reports: se.appears_in_reports,
        sort: se.sort,
        active: se.active,
        data: se.data || []
      }
      let uri = '/api/account-links/' + se.id
      let method = 'put'

      this.axios[method](uri, myData)
        .then((res) => {
          if (res.data.status == true) {
            this.showToastError(res.data.message, res.data.custom_code)

            this.editMode = 0

            this.form.link_name = ''
            this.form.slug = ''
            this.form.is_multiple = 0

            this.form.translation.title.ar = ''
            this.form.translation.title.en = ''

            this.form.translation.description.ar = ''
            this.form.translation.description.en = ''

            this.form.allow_delete = 0
            this.form.appears_in_reports = 0
            this.form.sort = null
            this.form.active = 0
            this.form.data = []
            this.alertType = 'success'
            setTimeout(() => {
              this.$nextTick(() => {
                this.$refs.form.reset()
              })
            }, 2000)
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
        link_name: this.form.link_name,
        slug: this.form.slug,

        title: {
          ar: this.form.translation.title.ar,
          en: this.form.translation.title.en
        },
        description: {
          ar: this.form.translation.description.ar,
          en: this.form.translation.description.en
        },

        allow_delete: this.form.allow_delete === true ? 1 : 0,
        is_multiple: this.form.is_multiple === true ? 1 : 0,
        appears_in_reports: this.form.appears_in_reports === true ? 1 : 0,
        active: this.form.active === true ? 1 : 0,
        sort: this.form.sort,
        data: this.form.data || []
      }
      let method = this.editMode ? 'put' : 'post'
      this.axios[method](
        this.editMode ? '/api/account-links/' + this.form.id : '/api/account-links',
        data
      )
        .then((res) => {
          if (res.data.status == true) {
            this.showToastError(res.data.message, res.data.custom_code)

            if (this.editMode) {
              this.editMode = 0
            }
            this.form.link_name = ''
            this.form.slug = ''
            this.form.is_multiple = 0

            this.form.translation.title.ar = ''
            this.form.translation.title.en = ''

            this.form.translation.description.ar = ''
            this.form.translation.description.en = ''

            this.form.allow_delete = 0
            this.form.appears_in_reports = 0
            this.form.sort = null
            this.form.active = 0
            this.form.data = []
            setTimeout(() => {
              this.$nextTick(() => {
                this.$refs.form.reset()
              })
            }, 3000)
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
      let route = `/api/account-links/${id}`
      this.$bvModal
        .msgBoxConfirm(this.trans('Do_you_want_to_delete_this_link'), {
          okTitle: this.trans('yes'),
          cancelTitle: this.trans('no'),
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal'
        })
        .then((willDelete) => {
          if (willDelete) {
            this.axios
              .delete(route)
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

    reset() {
      this.filters.search = null
      this.form.link_name = null
      this.form.slug = null
      this.form.is_multiple = 0

      this.form.translation.title.ar = null
      this.form.translation.title.en = null

      this.form.translation.description.ar = null
      this.form.translation.description.en = null

      this.form.allow_delete = 0
      this.form.appears_in_reports = 0
      this.form.sort = null
      this.form.active = 0
      this.form.data = []

      this.editMode = 0
    }
  }
}
</script>

<style>
textarea {
  overflow: hidden !important;
}

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
