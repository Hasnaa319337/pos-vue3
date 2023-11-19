<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-header header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ trans('stock_history') }}</h4>
        <div class="dropdown">
          <b-button @click="searchOn = !searchOn" variant="primary" style="margin: 0 5px">
            <i class="bi bi-search"></i>
          </b-button>
          <GoBackButton />
        </div>
      </div>
      <div class="card-body">
        <div class="row justify-content-between align-items-center mb-4">
          <div class="col-sm-12" v-if="searchOn">
            <ValidationObserver v-slot="{ handleSubmit }" ref="form">
              <b-form @submit.prevent="handleSubmit(filterResults)" @reset.prevent="reset">
                <b-form-row>
                  <b-col cols="12" md="3">
                    <b-form-group :label="trans('product')">
                      <v-select
                        v-model="filter.product_serial"
                        :dir="language == 'ar' ? 'rtl' : 'rtl'"
                        :value="serial"
                        label="title"
                        :options="products"
                        :reduce="(option) => option.serial"
                      >
                      </v-select>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="3">
                    <b-form-group :label="trans('Inventory')">
                      <v-select
                        v-model="filter.inventory_id"
                        :dir="language == 'ar' ? 'rtl' : 'rtl'"
                        :value="id"
                        label="title"
                        :options="inventories"
                        :reduce="(option) => option.id"
                      >
                      </v-select>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="3">
                    <b-form-group :label="trans('date from')">
                      <b-input
                        style="
                          border-radius: 5px !important;
                          height: 33px;
                          border: 1px solid #c8c4c4;
                        "
                        type="date"
                        class="form-control"
                        v-model="filter.date_from"
                      ></b-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="3">
                    <b-form-group :label="trans('date to')">
                      <b-input
                        style="
                          border-radius: 5px !important;
                          height: 33px;
                          border: 1px solid #c8c4c4;
                        "
                        type="date"
                        class="form-control"
                        v-model="filter.date_to"
                      ></b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row class="justify-content-center">
                  <b-button variant="success" type="submit" class="mr-2">
                    <font-awesome-icon icon="fa-solid fa-filter" />
                    {{ trans('filter') }}
                  </b-button>
                  <b-button variant="warning" type="reset" @click="resetData" class="mr-2">
                    <font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                    {{ trans('reset_search') }}
                  </b-button>
                </b-form-row>
              </b-form>
            </ValidationObserver>
          </div>
        </div>
        <div class="row align-items-center justify-content-between mb-4">
          <div class="col-sm-12">
            <div class="table-responsive">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <th style="width: 100px; border: 2px solid #85c3ff">
                      {{ trans('id') }}
                    </th>

                    <th style="border: 2px solid #85c3ff">
                      {{ trans('item_code') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('product') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('inventory') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('initial_quantity') }}
                    </th>
                    <th style="border: 2px solid #85c3ff" colspan="3">
                      {{ trans('incoming') }}
                      <br />
                      <div
                        style="
                          display: flex;
                          justify-content: space-between;
                          border-top: 2px solid #85c3ff;
                          padding-top: 3px;
                        "
                      >
                        <span>
                          {{ trans('purchases') }}
                        </span>
                        <span> {{ trans('sales refund') }} </span>
                        <span> {{ trans('store_transfer') }} </span>
                      </div>
                    </th>
                    <th style="border: 2px solid #85c3ff" colspan="3">
                      {{ trans('outstanding') }}
                      <br />
                      <div
                        style="
                          display: flex;
                          justify-content: space-between;
                          border-top: 2px solid #85c3ff;
                          padding-top: 3px;
                        "
                      >
                        <span> {{ trans('sales') }} </span>
                        <span> {{ trans('purchases refund') }} </span>
                        <span> {{ trans('store_transfer') }} </span>
                      </div>
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('balance') }}
                    </th>
                  </b-tr>
                </b-thead>
                <TableSkeletonLoader :items="12" :length="12" v-if="skeletonLoading" />
                <b-tbody v-else>
                  <b-tr v-for="report in reports" :key="report.id">
                    <b-td>{{ report.id }}</b-td>

                    <b-td>
                      <router-link
                        :to="{
                          path: '/products-card/' + report.product.serial
                        }"
                      >
                        <button @click="printInventory(report.inventory.id)">
                          {{ spliceText(report.product.serial, '10') }}
                        </button>
                      </router-link>
                    </b-td>
                    <b-td>
                      {{ spliceText(report.product.title, '20') }}
                    </b-td>
                    <b-td>
                      {{ report.inventory.title }}
                    </b-td>

                    <b-td
                      :class="Number(report.initial_amount).isNegative('negative_number_color')"
                    >
                      {{ Number(report.initial_amount).toNegativeFormat(0) }}
                    </b-td>

                    <b-td
                      :class="Number(report.purchase_amount).isNegative('negative_number_color')"
                    >
                      {{ Number(report.purchase_amount).toNegativeFormat(0) }}
                    </b-td>

                    <b-td
                      :class="
                        Number(report.refund_sales_amount).isNegative('negative_number_color')
                      "
                    >
                      {{ Number(report.refund_sales_amount).toNegativeFormat(0) }}
                    </b-td>

                    <b-td
                      :class="
                        Number(report.inventory_transfer_incremented).isNegative(
                          'negative_number_color'
                        )
                      "
                    >
                      {{ Number(report.inventory_transfer_incremented).toNegativeFormat(0) }}
                    </b-td>

                    <b-td :class="Number(report.sales_amount).isNegative('negative_number_color')">
                      {{ Number(report.sales_amount).toNegativeFormat(0) }}
                    </b-td>

                    <b-td
                      :class="
                        Number(report.refund_purchase_amount).isNegative('negative_number_color')
                      "
                    >
                      {{ Number(report.refund_purchase_amount).toNegativeFormat(0) }}
                    </b-td>
                    <b-td
                      :class="
                        Number(report.inventory_transfer_decremented).isNegative(
                          'negative_number_color'
                        )
                      "
                    >
                      {{ Number(report.inventory_transfer_decremented).toNegativeFormat(0) }}
                    </b-td>

                    <b-td :class="Number(report.quantity).isNegative('negative_number_color')">
                      {{ Number(report.quantity).toNegativeFormat(0) }}
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-if="!reports.length" class="text-center">
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
          </div>
          <div class="col-sm-12 text-center" v-if="reports.length">
            <pagination-component
              :items="reports"
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
</template>
<script>
import PaginationComponent from '@/components/global/PaginationComponent.vue'

import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'

export default {
  components: { PaginationComponent, TableSkeletonLoader },
  name: 'AppStockHistory',
  props: ['permissions', 'section', 'user', 'settings', 'language'],
  data() {
    return {
      reports: [],
      inventories: [],
      filter: {},
      users: [],
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
      last_page: 0,
      total: 0,
      products: [],
      variations: [],
      searchOn: false,
      skeletonLoading: true
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    this.getProducts()
    this.getInventories()
  },
  methods: {
    printInventory(id) {
      localStorage.setItem('ProductCardInventory', id)
    },
    spliceText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength)
      } else {
        return text
      }
    },
    getInventories() {
      this.axios({
        method: 'GET',
        url: '/api/inventories'
      })
        .then((res) => {
          this.inventories = res.data.body.inventories.data
        })
        .catch((error) => {
          console.log('Error:', error)
        })
    },
    getProducts() {
      this.axios({
        method: 'GET',
        url: '/api/products'
      })
        .then((res) => {
          this.products = res.data.body.products.data
        })
        .catch((error) => {
          console.log('Error:', error)
        })
    },
    changeProd() {
      let item_id = this.filter.product
      if (!item_id) return
      var prod = this.products.filter((x) => {
        return x.id == item_id
      })[0]
      if (prod.has_attributes) {
        let url = '/api/cashier/variations/' + prod.id
        this.axios
          .get(url)
          .then((res) => {
            this.variations = res.data.variations
          })
          .catch((error) => {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          })
      } else {
        this.filter.var = 0
        this.variations = []
      }
    },
    filterResults() {
      this.usingFilters = 1
      this.refresh()
    },
    refresh() {
      let url = '/api/stock/histories'
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
      this.loaded = false
      this.itemsLoaded = false
      this.axios
        .get(url)
        .then((res) => {
          if (res.data.status) {
            this.skeletonLoading = false
            this.reports = res.data.body.report.data
            this.paginate = res.data.body.report.paginate
            this.total = res.data.body.report.paginate.total
            this.current_page = res.data.body.report.paginate.current_page
            this.prev_page = this.current_page - 1
            this.next_page = this.current_page + 1
            this.next_page_url = res.data.body.report.paginate.next_page_url
            this.prev_page_url = res.data.body.report.paginate.prev_page_url
            this.first_page_url = res.data.body.report.paginate.first_page_url
            this.last_page_url = res.data.body.report.paginate.last_page_url
            this.last_page = res.data.body.report.paginate.last_page
            this.users = res.data.body.users
          }

          this.loaded = true
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    goTo(url) {
      this.skeletonLoading = true
      this.reports = []
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
          this.skeletonLoading = false
          this.reports = res.data.body.report.data
          this.paginate = res.data.body.report.paginate
          this.total = res.data.body.report.paginate.total
          this.current_page = res.data.body.report.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.report.paginate.next_page_url
          this.prev_page_url = res.data.body.report.paginate.prev_page_url
          this.first_page_url = res.data.body.report.paginate.first_page_url
          this.last_page_url = res.data.body.report.paginate.last_page_url
          this.last_page = res.data.body.report.paginate.last_page

          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    reset() {
      this.filter = {}
      this.$refs.form.reset()
    },
    resetData() {
      ;(this.filter.product_serial = ''),
        (this.filter.inventory_id = ''),
        (this.filter.date_from = ''),
        (this.filter.date_to = '')
      return this.refresh()
    }
  }
}
</script>
