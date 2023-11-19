<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title">
            {{ trans("Product's Units") }}
          </h4>
          <div class="dropdown btns_header">
            <b-button @click="searchOn = !searchOn" variant="primary">
              <i class="bi bi-search"></i>
            </b-button>
            <GoBackButton />
          </div>
        </div>
        <!-- v-if="permissions.includes('view_product_unit')" -->
        <div class="card-body">
          <b-row class="mx-0">
            <!-- v-if="permissions.includes('create_product_unit')" -->
            <b-col cols="12" md="4">
              <h3 class="col-sm-12" style="text-align: center; margin: 10px 0; color: #228aa5">
                {{ trans('add unit') }}
              </h3>

              <ValidationObserver ref="form">
                <b-form @submit.prevent="store">
                  <ValidationProvider
                    rules="required|englishLettersAndNumbersOnly"
                    :name="trans('unit')"
                  >
                    <b-form-group :label="trans('unit')">
                      <b-form-input type="text" v-model="unit.key"></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts English words only') }}
                        {{ trans('without sapces') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required|arabicLettersAndNumbersOnly"
                    name="trans('name') + '(AR)"
                  >
                    <b-form-group :label="trans('name') + '(AR)'">
                      <b-form-input type="text" v-model="unit.translation.title.ar"></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts arabic words only') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required|englishLettersAndNumbersOnly"
                    :name="trans('name') + '(EN)'"
                  >
                    <b-form-group :label="trans('name') + '(EN)'">
                      <b-form-input type="text" v-model="unit.translation.title.en"></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts English words only') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <ValidationProvider rules="" :name="trans('sort')">
                    <b-form-group :label="trans('sort')">
                      <b-form-input type="number" v-model="unit.sort"></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ trans('This field accepts numbers only') }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <b-form-row>
                    <b-col cols="12" style="display: flex; justify-content: space-between">
                      <span>{{ trans('status') }}</span>
                      <label class="switch">
                        <input type="checkbox" v-model="unit.active" />
                        <span class="slider round"></span>
                      </label>
                    </b-col>
                  </b-form-row>

                  <b-form-row
                    class="justify-content-center mb-4"
                    style="gap: 23px; margin-top: 25px"
                  >
                    <b-button :variant="EditMode ? 'primary' : 'success'" type="submit">
                      <span v-if="EditMode" style="display: block">{{ trans('edit') }}</span>
                      <span v-else style="display: block">{{ trans('save') }}</span>
                    </b-button>

                    <b-button variant="danger" @click="resetForm()">
                      <span style="display: block">{{ trans('cancel') }}</span>
                    </b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </b-col>
            <b-col cols="12" md="8">
              <b-row v-if="searchOn">
                <ValidationObserver ref="searchForm">
                  <b-form @submit.prevent="filter(editMode)" @reset.prevent="reset">
                    <b-form-row>
                      <b-col cols="12" md="5">
                        <b-form-group>
                          <b-form-input
                            type="text"
                            class="form-control"
                            v-model="filters.title"
                            :placeholder="trans('name')"
                          />
                        </b-form-group>
                      </b-col>

                      <b-col cols="12" md="2">
                        <b-form-group style="display: flex">
                          <b-button type="submit"> {{ trans('search') }}</b-button>
                        </b-form-group>
                      </b-col>
                      <b-col cols="12" md="5">
                        <b-form-group>
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
              <!-- v-if="permissions.includes('view_product_unit')" -->
              <b-row class="mx-0">
                <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                  <GlobalTabel :columns="columns" />
                  <TableSkeletonLoader
                    :items="10"
                    :length="columns.length"
                    v-if="skeletonLoading"
                  />
                  <b-tbody class="text-center" v-else>
                    <b-tr v-for="(unit, index) in units" :key="index">
                      <b-td>{{ unit.sort }} </b-td>
                      <b-td>{{ unit.title }}</b-td>

                      <b-td>
                        <label class="switch" style="margin: auto">
                          <input
                            type="checkbox"
                            v-model="unit.active"
                            @change="changeActive(unit)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </b-td>

                      <b-td>
                        <EditButton
                          @edit="edit(unit)"
                          v-if="permissions.includes('update_product_unit')"
                        />

                        <DeleteButton
                          @delete="Delete(unit)"
                          v-if="permissions.includes('delete_product_unit')"
                        />

                        <!--  v-if="permissions.includes('view_action_event_product_unit')" -->
                        <ActionButton :id="unit.id" :resource_name="'ProductUnit'" />
                      </b-td>
                    </b-tr>
                  </b-tbody>
                  <b-tbody class="text-center" v-if="!tableLoaded && !skeletonLoading">
                    <b-tr class="text-center">
                      <b-td colspan="8">
                        <h5 class="no_results_found">
                          {{ trans('no_results_found') }}
                        </h5>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-row>

              <div class="col-sm-12 text-center" v-if="units.length">
                <pagination-component
                  :items="units"
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
          </b-row>
        </div>
      </div>

      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" width="450" height="" transition="dialog-bottom-transition">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
            </template>
            <v-card>
              <v-divider></v-divider>
              <v-card-text
                style="
                  height: 94px;
                  text-align: center;
                  font-weight: 700;
                  font-size: 20px;
                  border-bottom: 1px solid #dad9d9;
                "
              >
                {{ trans('Do you want to delete this unit') }}
              </v-card-text>

              <v-card-actions
                style="
                  align-items: center;
                  display: flex;
                  flex: none;
                  min-height: 62px;
                  padding: 0.5rem;
                  justify-content: center;
                "
              >
                <v-btn
                  style="background: #b61a1ad1; color: #fff !important"
                  variant="text"
                  @click="(dialog = false), (allow_del = true)"
                >
                  {{ trans('no') }}
                </v-btn>
                <v-btn
                  style="background: #1ab61ad1; color: #fff !important"
                  variant="text"
                  @click="dialog = false"
                >
                  {{ trans('yes') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </div>
  </div>
</template>
<style>
tr.select-unit {
  border: 1px solid #000;
  background-color: #077b53 !important;
  height: 60px;
}

.search-btns button {
  margin-bottom: 16px;
}
</style>
<script>
// import { date } from '@/support/mixins'

import PaginationComponent from '@/components/global/PaginationComponent.vue'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'

export default {
  name: 'AppUnits',

  props: ['section', 'sections', 'user', 'user_language', 'langs', 'permissions', 'language'],

  components: {
    PaginationComponent,
    TableSkeletonLoader
  },
  data() {
    return {
      columns: ['sort', 'name', 'status', 'options'],
      skeletonLoading: true,
      dialog: false,
      allow_del: false,
      units: [],
      paginate: {},
      usingFilters: true,
      filters: {
        title: null
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
      unit: {
        translation: {
          title: {
            ar: '',
            en: ''
          }
        },
        key: '',
        active: false,
        sort: ''
      },

      EditMode: 0,
      loaded: false,
      tableLoaded: false,
      searchOn: false
    }
  },

  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    filter(editMode) {
      if (!editMode) {
      }
      let str = ''
      for (var key in this.filters) {
        if (this.filters[key] == '') continue
        if (str != '') {
          str += '&'
        }
        str += key + '=' + this.filters[key]
      }
      let url = '/api/product-units?' + str
      this.refresh(url)
    },
    refresh() {
      this.tableLoaded = true

      this.axios({
        method: 'GET',
        url: '/api/product-units',
        params: {
          title: this.filters.title // 👈 use "params" here
        }
      })
        .then((res) => {
          this.skeletonLoading = false

          this.loaded = true
          this.units = res.data.body.units.data
          this.paginate = res.data.body.units.paginate
          this.total = res.data.body.units.paginate.total
          this.current_page = res.data.body.units.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.units.paginate.next_page_url
          this.prev_page_url = res.data.body.units.paginate.prev_page_url
          this.first_page_url = res.data.body.units.paginate.first_page_url
          this.last_page_url = res.data.body.units.paginate.last_page_url
          this.last_page = res.data.body.units.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    goTo(url) {
      this.skeletonLoading = true

      this.units = []
      this.axios({
        method: 'GET',
        url: url,
        params: {
          title: this.filters.title // 👈 use "params" here
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.units = res.data.body.units.data
          this.paginate = res.data.body.units.paginate
          this.total = res.data.body.units.paginate.total
          this.current_page = res.data.body.units.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.units.paginate.next_page_url
          this.prev_page_url = res.data.body.units.paginate.prev_page_url
          this.first_page_url = res.data.body.units.paginate.first_page_url
          this.last_page_url = res.data.body.units.paginate.last_page_url
          this.last_page = res.data.body.units.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    edit(unit) {
      this.EditMode = 1
      this.unit = this.cloneItem(unit)
    },

    changeActive(unit) {
      let uri = '/api/product-units/' + unit.id

      let method = 'put'

      let data = {
        active: unit.active,
        key: unit.key,
        sort: unit.sort,

        title: {
          ar: unit.translation.title.ar,
          en: unit.translation.title.en
        }
      }
      axios[method](uri, data)
        .then(
          (res) => {
            if (res.data.status) {
              this.showToastError(res.data.message, res.data.custom_code)

              this.EditMode = false

              this.$nextTick(() => {
                this.$refs.form.reset()
                this.refresh()
              })
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

    store() {
      let uri = this.EditMode ? '/api/product-units/' + this.unit.id : '/api/product-units'

      let method = this.EditMode ? 'put' : 'post'

      let data = {
        active: this.unit.active,
        key: this.unit.key,
        sort: this.unit.sort,

        title: {
          ar: this.unit.translation.title.ar,
          en: this.unit.translation.title.en
        }
      }
      this.axios[method](uri, data)
        .then(
          (res) => {
            if (res.data.status) {
              this.showToastError(res.data.message, res.data.custom_code)
              this.unit.active = '0'
              this.unit.key = ''
              this.unit.sort = ''
              this.unit.translation.title.ar = ''
              this.unit.translation.title.en = ''

              this.$nextTick(() => {
                this.$refs.form.reset()
                this.refresh()
              })
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
    Delete(unit) {
      this.dialog = true

      if (this.allow_del) {
        this.axios
          .delete('/api/product-units/' + unit.id + '')
          .then((res) => {
            if (res.data.status) {
              this.showToastError(res.data.message, res.data.custom_code)
              this.unit.active = '0'
              this.unit.key = ''
              this.unit.sort = ''
              this.unit.translation.title.ar = ''
              this.unit.translation.title.en = ''
              this.$refs.form.reset()
              this.$nextTick(() => {
                this.$refs.form.reset()
                this.refresh()
              })
              this.units = this.units.filter((x) => {
                return x.id != unit.id
              })
            } else {
              this.showToastError(res.data.message, res.data.custom_code)
            }
          })
          .catch((error) => {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          })
      }
    },
    reset() {
      this.filters = {}
      this.$refs.form.reset()
    },

    resetForm() {
      this.EditMode = 0
      this.unit.active = '0'
      this.unit.key = ''
      this.unit.sort = ''
      this.unit.translation.title.ar = ''
      this.unit.translation.title.en = ''
    }
  }
}
</script>

<style scoped>
/* The switch - the box around the slider */
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
