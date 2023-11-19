<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card" v-if="loaded">
      <div class="card-header header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title" v-if="language">{{ trans('asset') }}</h4>
        <div class="dropdown btns_header">
          <router-link
            v-if="permissions.includes('create_asset')"
            class="btn btn-success btn-md"
            to="/add-asset"
          >
            <i class="bi bi-plus-lg"></i>
          </router-link>
          <b-button @click="searchOn = !searchOn" variant="primary">
            <i class="bi bi-search"></i>
          </b-button>
        </div>
      </div>
      <div class="card-body">
        <div class="row justify-content-between align-items-center mb-4">
          <div class="col-sm-12">
            <div class="col-sm-12 text-center" v-if="message.length">
              <div class="alert" :class="'alert-' + alertType" v-html="message"></div>
            </div>
            <div class="clear clearfix"></div>
            <ValidationObserver v-if="searchOn" v-slot="{ handleSubmit }" ref="form">
              <b-form @submit.prevent="handleSubmit(filterResults)" @reset.prevent="reset">
                <b-form-row>
                  <b-col cols="12">
                    <b-row class="align-items-center m-0">
                      <div class="col-md col-12 px-1">
                        <ValidationProvider
                          name="account_in_link"
                          rules=""
                          v-slot="{ valid, errors }"
                        >
                          <b-form-group>
                            <div class="row m-0 align-items-center">
                              <label for="" class="col-auto p-0">
                                {{ trans('account') }}
                              </label>
                              <b-form-select
                                class="col p-0"
                                v-model="filter.main_account"
                                :state="errors[0] ? false : valid ? true : null"
                              >
                                <b-form-select-option
                                  v-for="account in accounts"
                                  :value="account.account"
                                  :key="account.account"
                                >
                                  <span>{{ account.title }}</span>
                                </b-form-select-option>
                              </b-form-select>
                            </div>
                            <b-form-invalid-feedback id="inputLiveFeedback">
                              {{ errors[0] }}
                            </b-form-invalid-feedback>
                          </b-form-group>
                        </ValidationProvider>
                      </div>

                      <div class="col-md col-12 px-1">
                        <b-form-group>
                          <div class="row m-0 align-items-center">
                            <label for="" class="col-auto p-0">
                              {{ trans('from_date') }}
                            </label>
                            <b-input
                              type="date"
                              class="form-control col p-0"
                              v-model="filter.from_date"
                            ></b-input>
                          </div>
                        </b-form-group>
                      </div>
                      <div class="col-md col-12 px-1">
                        <b-form-group>
                          <div class="row m-0 align-items-center">
                            <label for="" class="col-auto p-0">
                              {{ trans('to_date') }}
                            </label>
                            <b-input
                              type="date"
                              class="form-control col p-0"
                              v-model="filter.to_date"
                            ></b-input>
                          </div>
                        </b-form-group>
                      </div>
                      <div class="col-md col-12 px-1">
                        <b-form-group>
                          <div class="row m-0 align-items-center">
                            <label for="" class="col-auto p-0">
                              {{ trans('per_page') }}
                            </label>
                            <b-input
                              type="number"
                              style="width: 30px"
                              class="form-control col p-0"
                              v-model="filter.per_page"
                            ></b-input>
                          </div>
                        </b-form-group>
                      </div>
                      <div class="col-12 text-center px-1">
                        <b-button
                          style="font-size: 11px"
                          variant="success"
                          type="submit"
                          class="mr-2"
                          ><font-awesome-icon icon="fa-solid fa-filter" />
                          {{ trans('filter') }}
                        </b-button>
                        <b-button
                          style="font-size: 11px"
                          variant="warning"
                          type="reset"
                          class="mr-2"
                          ><font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                          {{ trans('reset_search') }}
                        </b-button>
                      </div>
                    </b-row>
                  </b-col>
                </b-form-row>
              </b-form>
            </ValidationObserver>
          </div>
        </div>

        <div class="">
          <div class="align-items-center justify-content-between mb-4">
            <div class="text-center" v-if="this.message.length">
              <div class="alert" :class="'alert-' + alertType" v-html="this.message"></div>
            </div>
            <div class="clear clearfix"></div>
            <div class="">
              <b-table-simple
                class="table-container"
                sticky-header
                striped
                bordered
                responsive
                style="min-height: 50px"
              >
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <b-th>{{ trans('asset_account') }}</b-th>
                    <b-th>{{ trans('asset_name') }}</b-th>
                    <b-th>{{ trans('asset_price') }}</b-th>
                    <b-th>{{ trans('depreciation_period_type') }}</b-th>
                    <b-th>{{ trans('depreciation_period') }}</b-th>
                    <b-th>{{ trans('depreciation_value') }}</b-th>
                    <b-th>{{ trans('depreciation_value_type') }}</b-th>
                    <b-th>{{ trans('options') }}</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-if="itemsLoaded && permissions.includes('view_asset')">
                  <b-tr v-for="(asset, index) in assets" :key="index">
                    <b-td>{{ asset.main_account }}</b-td>
                    <b-td class="name">{{ asset.title }}</b-td>

                    <b-td>
                      {{ asset.purchases_price }}
                    </b-td>
                    <b-td>{{ asset.depreciation_period_type }}</b-td>
                    <b-td>{{ asset.depreciation_period }}</b-td>
                    <b-td>{{ asset.depreciation_value }}</b-td>
                    <b-td>{{ asset.depreciation_value_type }}</b-td>
                    <b-td class="btns">
                      <router-link
                        v-if="permissions.includes('update_asset')"
                        v-b-tooltip.hover
                        :title="trans('edit')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        :to="'/asset/edit/' + asset.id"
                        ><font-awesome-icon icon="fa-solid fa-pen-to-square"
                      /></router-link>

                      <a
                        v-if="permissions.includes('delete_asset')"
                        v-b-tooltip.hover
                        :title="trans('delete')"
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2"
                        @click="Delete(asset.id)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash "
                      /></a>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-else-if="itemsLoaded && !assets.length" class="text-center">
                  <b-tr>
                    <b-td colspan="9">
                      <h5>{{ trans('no results found') }}</h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-else class="text-center">
                  <b-tr>
                    <b-td colspan="9">
                      <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
            <div class="col-sm-12 text-center" v-if="total > filter.per_page">
              <nav
                aria-label="Page navigation center-block"
                style="margin-top: 20px; direction: ltr"
              >
                <ul class="pagination justify-content-center">
                  <li class="page-item" v-if="prev_page_url">
                    <a
                      class="page-link"
                      @click.prevent="goTo(first_page_url)"
                      href="#"
                      tabindex="-1"
                      ><font-awesome-icon icon="fa-solid fa-angles-left"
                    /></a>
                  </li>
                  <li class="page-item" v-if="prev_page_url">
                    <a class="page-link" @click.prevent="goTo(prev_page_url)" href="#" tabindex="-1"
                      ><font-awesome-icon icon="fa-solid fa-angle-left "
                    /></a>
                  </li>
                  <li class="page-item active disabled">
                    <a class="page-link" @click.prevent="javascript" href="#">{{ current_page }}</a>
                  </li>
                  <li class="page-item" v-if="next_page_url">
                    <a class="page-link" @click.prevent="goTo(next_page_url)" href="#"
                      ><font-awesome-icon icon="fa-solid fa-angle-right"
                    /></a>
                  </li>
                  <li class="page-item" v-if="next_page_url">
                    <a class="page-link" @click.prevent="goTo(last_page_url)" href="#"
                      ><font-awesome-icon icon="fa-solid fa-angles-right"
                    /></a>
                  </li>
                </ul>
              </nav>
              <div v-if="total > 0" class="col-sm-12 text-center">
                <span>{{ trans('total_search_results') }} : {{ total }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <div class="card-body text-center">
        <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.use(VuejsDialog)
export default {
  name: 'AppAssets',
  props: ['section', 'sections', 'user', 'user_language', 'langs', 'permissions', 'language'],
  data() {
    return {
      message: '',
      alertType: 'success',
      assets: [],
      filter: {
        per_page: 20,
        main_account: '',
        from_date: '',
        to_date: ''
      },
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,
      accounts: [],
      loaded: false,
      itemsLoaded: false,
      categoryObject: '',
      usingFilters: false,
      searchOn: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    axios.get('/api/assets').then((res) => {
      this.accounts = res.data.body.assets.data
    })
    this.refresh()
  },
  methods: {
    filterResults() {
      this.usingFilters = true
      this.refresh()
    },
    refresh() {
      this.itemsLoaded = false
      let url = '/api/assets'
      if (this.usingFilters) {
        let str = ''
        for (var key in this.filter) {
          if (this.filter[key] == '') continue
          if (str != '') {
            str += '&'
          }
          str += key + '=' + this.filter[key]
        }
        url = url + '?' + str
      }
      this.itemsLoaded = false
      this.usingFilters = true
      axios({
        method: 'GET',
        url: '/api/assets'
      })
        .then((res) => {
          this.assets = res.data.body.assets.data
          this.loaded = true
          this.itemsLoaded = true
          this.current_page = res.data.body.assets.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.assets.paginate.next_page_url
          this.prev_page_url = res.data.body.assets.paginate.prev_page_url
          this.first_page_url = res.data.body.assets.paginate.first_page_url
          this.last_page_url = res.data.body.assets.paginate.last_page_url
          this.total = res.data.body.assets.paginate.total
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    goTo(url) {
      this.products = []
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
      this.loaded = false
      axios
        .get(url)
        .then((res) => {
          this.assets = res.data.body.assets.data
          this.loaded = true
          this.itemsLoaded = true
          this.current_page = res.data.body.assets.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.assets.paginate.next_page_url
          this.prev_page_url = res.data.body.assets.paginate.prev_page_url
          this.first_page_url = res.data.body.assets.paginate.first_page_url
          this.last_page_url = res.data.body.assets.paginate.last_page_url
          this.total = res.data.body.assets.paginate.total
          this.loaded = true
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    Delete(id) {
      let _this = this
      let msg = 'Do you want to delete this asset'
      this.$bvModal

        .msgBoxConfirm(this.trans(msg), {
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
            this.message = "<i class='fa fa-spin fa-spinner'></i>"
            this.alertType = 'info'
            setTimeout(() => {
              this.message = ''
              this.alertType = 'success'
            }, 5000)
            axios
              .delete('/api/assets/' + id + '')
              .then((res) => {
                if (res.data.message) {
                  _this.message = res.data.message
                  _this.alertType = res.data.status == true ? 'success' : 'danger'
                  _this.refresh()
                  setTimeout(() => {
                    _this.message = ''
                    _this.alertType = 'success'
                  }, 5000)
                } else {
                  _this.message = ''
                }
              })
              .catch((error) => {
                this.message = error.response.data.message
                this.alertType = 'danger'
                setTimeout(() => {
                  this.message = ''
                  this.alertType = 'success'
                }, 120000)
              })
          }
        })
    }
  }
}
</script>
<style scoped>
.table-container {
  max-height: unset !important;
}
tr th,
tr td {
  min-width: unset !important;
}
label,
select,
input {
  font-size: 11px;
  display: inline !important;
  font-weight: 300;
  color: #5e5e5e;
  border-radius: 0;
  border: none;
  background-color: transparent;
  margin: 0;
}
label {
  border-left: 1px solid #707070;
  margin-left: 16px;
  padding-left: 8px !important;
}
select,
input {
  width: auto;
  padding: 0 !important;
  height: 20px;
  line-height: 1;
}
.form-group {
  padding: 10px 16px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  background-color: #fff;
}
</style>
