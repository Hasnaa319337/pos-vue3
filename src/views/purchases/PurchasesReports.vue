<template>
  <div>
    <div
      class="col-sm-12 grid-margin stretch-card"
      v-if="permissions.includes('view-report')"
    >
      <div class="card" v-if="loaded">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4
            class="card-title"
            v-if="user.language"
            v-text="
              user.language == 'en' ? 'Purchases Reports' : 'تقارير المشتريات'
            "
          ></h4>
          <div class="dropdown"></div>
        </div>
        <div
          class="card-body header-sm d-flex justify-content-between align-items-center"
        >
          <div class="col-sm-12">
            <ValidationObserver v-slot="{ handleSubmit }" ref="form">
              <b-form
                @submit.prevent="handleSubmit(filterResults)"
                @reset.prevent="reset"
              >
                <b-form-row>
                  <b-col cols="12" md="4">
                    <ValidationProvider
                      name="report_type"
                      rules="required"
                      v-slot="{ valid, errors }"
                    >
                      <b-form-group :label="strings['report type']">
                        <b-form-select
                          v-model="filter.type"
                          :state="errors[0] ? false : valid ? true : null"
                          @change="resetResults"
                        >
                          <b-form-select-option
                            v-for="(type, index) in types"
                            :value="type"
                            :key="`${type + index}`"
                          >
                            {{ strings[type] }}
                          </b-form-select-option>
                        </b-form-select>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col cols="12" md="4">
                    <ValidationProvider
                      name="product"
                      rules="required"
                      v-slot="{ valid, errors }"
                    >
                      <b-form-group :label="strings['product']">
                        <multiselect
                          v-model="filter.product"
                          :options="products"
                          :label="user.language == 'en' ? 'title' : 'title_ar'"
                          track-by="title"
                          :dir="user.language == 'en' ? 'ltr' : 'rtl'"
                          placeholder=""
                          :showLabels="false"
                          :allow-empty="false"
                          :state="errors[0] ? false : valid ? true : null"
                          :class="{ 'is-invalid': errors.length }"
                          class="style-chooser"
                          open-direction="bottom"
                        >
                        </multiselect>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col cols="12" md="4">
                    <ValidationProvider
                      name="inventory"
                      rules="required"
                      v-slot="{ valid, errors }"
                    >
                      <b-form-group :label="strings['Inventory']">
                        <b-form-select
                          v-model="filter.inventory"
                          :state="errors[0] ? false : valid ? true : null"
                        >
                          <b-form-select-option
                            v-for="inv in inventories"
                            :value="inv.id"
                            :key="inv.id"
                          >
                            {{
                              user.language == 'en' ? inv.title : inv.title_ar
                            }}
                          </b-form-select-option>
                        </b-form-select>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col cols="12" md="4">
                    <b-form-group :label="strings['number_of_purchases']">
                      <b-form-input
                        type="number"
                        v-model="filter.number_of_purchases"
                        @keypress="isNumber($event)"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="4">
                    <b-form-group :label="strings['date from']">
                      <b-input
                        type="date"
                        class="form-control"
                        v-model="filter.date_from"
                      ></b-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="4">
                    <b-form-group :label="strings['date to']">
                      <b-input
                        type="date"
                        class="form-control"
                        v-model="filter.date_to"
                      ></b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row class="justify-content-center">
                  <b-form-group :label="strings['items per page']">
                    <b-form-input
                      type="number"
                      v-model="filter.per_page"
                      @keypress="isNumber($event)"
                    ></b-form-input>
                  </b-form-group>
                </b-form-row>
                <b-form-row class="justify-content-center">
                  <b-button variant="success" type="submit" class="mr-2"
                    ><font-awesome-icon icon="fa-solid fa-filter" />
                    {{ strings['filter'] }}
                  </b-button>
                  <b-button variant="warning" type="reset" class="mr-2"
                    ><font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                    {{ strings['reset_search'] }}
                  </b-button>
                </b-form-row>
              </b-form>
            </ValidationObserver>
          </div>
        </div>
        <div class="align-items-center justify-content-between mb-4">
          <div class="col-sm-12 text-center" v-if="message.length">
            <div
              class="alert"
              :class="'alert-' + alertType"
              v-html="message"
            ></div>
          </div>
          <div class="clear clearfix"></div>
        </div>

        <div class="card-body" v-if="loadTable">
          <div
            class="align-items-center justify-content-between mb-4"
            v-if="filter.type == 'product-price-change-report'"
          >
            <h5 v-if="itemsLoaded && reports.length">
              {{ strings['average_cost'] + ': ' + this.average_cost }}
            </h5>
            <div class="col-sm-12">
              <b-table-simple
                sticky-header
                striped
                bordered
                responsive
                style="min-height: 50px"
              >
                <b-thead>
                  <b-th>
                    <b>{{ strings['invoice id'] }}</b>
                  </b-th>
                  <b-th>
                    <b>{{ strings['provider'] }}</b>
                  </b-th>
                  <b-th>
                    <b>{{ strings['cost'] }}</b>
                  </b-th>
                  <b-th>
                    <b>{{ strings['quantity'] }}</b>
                  </b-th>
                  <b-th>
                    <b>{{ strings['tax'] + ' %' }}</b>
                  </b-th>
                  <b-th>
                    <b>{{ strings['created at'] }}</b>
                  </b-th>
                </b-thead>
                <b-tbody v-if="itemsLoaded && reports.length">
                  <b-tr v-for="item in reports" :key="item.id">
                    <b-td>
                      {{ item.id }}
                    </b-td>
                    <b-td>
                      {{ item.provider.name + ' - ' + item.provider.phone }}
                    </b-td>
                    <b-td>
                      {{ item.cost }}
                    </b-td>
                    <b-td>
                      {{ item.quantity }}
                    </b-td>
                    <b-td>
                      {{ item.tax }}
                    </b-td>
                    <b-td>
                      {{ item.created_at }}
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-else-if="itemsLoaded && !reports.length">
                  <b-tr>
                    <b-td colspan="6">
                      <h5 class="no_results_found">
                        {{ strings['no_results_found'] }}
                      </h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-else class="text-center">
                  <b-tr>
                    <b-td colspan="6">
                      <font-awesome-icon
                        class="fa-spin-pulse"
                        icon="fa-solid fa-spinner "
                      />
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
                    <a
                      class="page-link"
                      @click.prevent="goTo(prev_page_url)"
                      href="#"
                      tabindex="-1"
                      ><font-awesome-icon icon="fa-solid fa-angle-left"
                    /></a>
                  </li>
                  <li class="page-item active disabled">
                    <a
                      class="page-link"
                      @click.prevent="javascript;"
                      href="#"
                      >{{ current_page }}</a
                    >
                  </li>
                  <li class="page-item" v-if="next_page_url">
                    <a
                      class="page-link"
                      @click.prevent="goTo(next_page_url)"
                      href="#"
                      ><font-awesome-icon icon="fa-solid fa-angle-right"
                    /></a>
                  </li>
                  <li class="page-item" v-if="next_page_url">
                    <a
                      class="page-link"
                      @click.prevent="goTo(last_page_url)"
                      href="#"
                      ><font-awesome-icon icon="fa-solid fa-angles-right"
                    /></a>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              class="col-sm-12 text-center"
              v-if="total > 0"
              :style="{ direction: user.language == 'en' ? 'ltr' : 'rtl' }"
            >
              <span> {{ strings['total_search_results'] }} : {{ total }} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="card-body text-center">
          <font-awesome-icon
            class="fa-spin-pulse"
            icon="fa-solid fa-spinner "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)

Vue.use(VuejsDialog)
export default {
  name: 'PurchasesReports',
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'permissions'],
  data() {
    return {
      message: '',
      alertType: 'success',
      reports: [],
      strings: [],
      inventories: [],
      products: [],
      types: ['product-price-change-report'],
      filter: {
        per_page: 30,
        inventory: this.user.inventory,
      },
      loaded: false,
      usingFilters: 0,
      itemsLoaded: false,
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,
      average_cost: 0,
      loadTable: false,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      axios
        .get('/api/reports')
        .then(res => {
          this.strings = res.data.strings
          this.inventories = res.data.inventories
          this.products = res.data.products
          this.filter.inventory = this.user.inventory
          this.filter.type = this.types[0]
          this.loaded = true
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    filterResults() {
      this.usingFilters = 1
      this.refresh()
    },
    refresh() {
      this.clearData()
      let url = '/api/reports/get'

      let product = this.filter.product
      if (Object.keys(product).includes('product_id')) {
        this.filter.product_id = this.filter.product.product_id
        this.filter.variation_id = this.filter.product.id
      } else {
        this.filter.product_id = this.filter.product.id
      }
      delete this.filter.product

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

      this.filter.product = product
      delete this.filter.product_id
      delete this.filter.variation_id

      this.itemsLoaded = false
      axios
        .get(url)
        .then(res => {
          if (res.data.success) {
            this.message = ''
            this.alertType = 'info'
            this.reports = res.data.reports.reports
            this.total = res.data.reports.total
            this.average_cost = res.data.reports.average_cost
            this.current_page = res.data.reports.current_page
            this.prev_page = this.current_page - 1
            this.next_page = this.current_page + 1
            this.next_page_url = res.data.reports.next_page_url
            this.prev_page_url = res.data.reports.prev_page_url
            this.first_page_url = res.data.reports.first_page_url
            this.last_page_url = res.data.reports.last_page_url
          } else {
            this.message = res.data.message
            this.alertType = 'danger'
          }

          if (!this.loadTable) {
            this.loadTable = true
          }

          this.loaded = true
          this.itemsLoaded = true
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    goTo(url) {
      this.reports = []
      let product = this.filter.product
      if (Object.keys(product).includes('product_id')) {
        this.filter.product_id = this.filter.product.product_id
        this.filter.variation_id = this.filter.product.id
      } else {
        this.filter.product_id = this.filter.product.id
      }
      delete this.filter.product

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

      this.filter.product = product

      this.itemsLoaded = false
      axios
        .get(url)
        .then(res => {
          this.reports = res.data.reports.reports
          this.total = res.data.reports.total
          this.average_cost = res.data.reports.average_cost
          this.current_page = res.data.reports.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.reports.next_page_url
          this.prev_page_url = res.data.reports.prev_page_url
          this.first_page_url = res.data.reports.first_page_url
          this.last_page_url = res.data.reports.last_page_url

          if (!this.loadTable) {
            this.loadTable = true
          }

          this.itemsLoaded = true
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    reset() {
      this.filter = {
        per_page: 30,
        inventory: this.user.inventory,
        product: {},
      }
      this.$refs.form.reset()
    },
    clearData() {
      this.total = ''
      this.average_cost = 0
      this.current_page = ''
      this.prev_page = ''
      this.next_page = ''
      this.next_page_url = ''
      this.prev_page_url = ''
      this.first_page_url = ''
      this.last_page_url = ''
      this.reports = []
    },
    resetResults() {
      this.$refs.form.reset()
      this.loadTable = false
    },
  },
}
</script>
