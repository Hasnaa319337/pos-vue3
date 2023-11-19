<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-header mb-3 header-sm d-flex">
        <div class="row m-0 w-100 justify-content-between align-items-center">
          <h4 class="card-title col-auto" v-if="language">
            {{ trans('refund purchase') }}
          </h4>
          <div class="dropdown">
            <b-button @click="searchOn = !searchOn" variant="primary" style="margin: 0 5px">
              <i class="bi bi-search"></i>
            </b-button>
            <button class="btn btn-primary" @click="openRefundModal()">
              {{ trans('refund') }}
            </button>
            <go-back-button />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="col-sm-12" v-if="searchOn">
          <ValidationObserver v-slot="{ handleSubmit }" ref="form">
            <b-form @submit.prevent="handleSubmit(filterResults)" @reset.prevent="reset">
              <b-form-row>
                <b-col cols="12" md="2">
                  <b-form-group :label="trans('invoiceID')">
                    <b-form-input v-model="filter.invoice_id"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="2">
                  <b-form-group :label="trans('inventory')">
                    <b-form-select v-model="filter.inventory">
                      <b-form-select-option v-for="inv in inventories" :value="inv.id" :key="inv.id"
                        >{{ inv.title }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="2">
                  <b-form-group :label="trans('provider')">
                    <b-form-select v-model="filter.provider">
                      <b-form-select-option
                        v-for="prov in providers"
                        :value="prov.id"
                        :key="prov.id"
                      >
                        {{ prov.name }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="2">
                  <b-form-group :label="trans('date_from')">
                    <b-input type="date" class="form-control" v-model="filter.date_from"></b-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="2">
                  <b-form-group :label="trans('date_to')">
                    <b-input type="date" class="form-control" v-model="filter.date_to"></b-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-row style="justify-content: center">
                <b-col cols="12" md="1" style="margin-top: 31px">
                  <b-button variant="success" type="submit" class="" style="font-size: 14px">
                    {{ trans('filter') }}
                  </b-button>
                </b-col>
                <b-col cols="12" md="2" style="margin-top: 30px">
                  <b-button variant="warning" type="reset" class="mr-2" @click="resetForm()"
                    ><font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                    {{ trans('reset_search') }}
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </ValidationObserver>
        </div>
        <div class="row align-items-center justify-content-between mb-4">
          <div class="col-sm-12">
            <b-table-simple
              class="table-container"
              sticky-header
              striped
              bordered
              responsive
              style="min-height: 50px"
              v-if="permissions.includes('view_purchase_refund')"
            >
              <GlobalTabel :columns="columns" />
              <table-skeleton-loader v-if="skeletonLoading" :items="10" :length="columns.length" />
              <b-tbody v-else>
                <b-tr v-for="purchase in sales" :key="purchase.id">
                  <b-td>#{{ purchase.id }}</b-td>
                  <b-td>
                    <p>{{ _.get(purchase, 'provider.name') }}</p>
                  </b-td>
                  <b-td>{{ purchase.created_at }}</b-td>
                  <b-td
                    >{{ purchase.total.toNegativeFormat() }}
                    {{ getSetting('currency', settings) }}
                  </b-td>
                  <b-td>
                    <!-- edit button -->
                    <b-badge
                      v-if="purchase.payment_type == 'full'"
                      style="font-size: 13px; padding: 12px"
                      variant="success"
                    >
                      {{ trans(purchase.payment_type) }}
                    </b-badge>
                    <b-badge
                      v-else
                      style="font-size: 13px; padding: 12px; background: rgb(224, 168, 0)"
                    >
                      {{ trans(purchase.payment_type) }}
                    </b-badge>
                  </b-td>

                  <b-td>
                    <router-link
                      v-b-tooltip.hover
                      :title="trans('show')"
                      style="border-radius: 8px !important"
                      class="mb-2"
                      :to="'/refund-purchase/view/' + purchase.id"
                    >
                      <font-awesome-icon icon="fa-solid fa-eye" />
                    </router-link>

                    <ActionButton
                      v-if="permissions.includes('view_action_event_purchase_refund')"
                      :id="purchase.id"
                      :resource_name="'purchase_refund'"
                    />
                  </b-td>
                </b-tr>
              </b-tbody>
              <b-tbody class="text-center" v-if="itemsLoaded && !sales.length">
                <b-tr class="text-center">
                  <b-td colspan="7">
                    <h5 class="no_results_found">
                      {{ trans('no_results_found') }}
                    </h5>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
          <div class="col-sm-12 text-center" v-if="sales.length">
            <pagination-component
              :items="sales"
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

    <refund-purchase :invoice_id="refundId" :user="user"></refund-purchase>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import JsonExcel from 'vue-json-excel'
import RefundPurchase from '../../components/sections/modals/RefundPurchase.vue'

import SkeletonLoader from '@/components/global/SkeletonLoader.vue'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import GoBackButton from '../../components/global/Buttons/GoBackButton.vue'

Vue.component('downloadExcel', JsonExcel)

Vue.use(VuejsDialog)
export default {
  name: 'AppRefundPurchase',
  components: {
    RefundPurchase,
    SkeletonLoader,
    PaginationComponent,
    TableSkeletonLoader,
    GoBackButton
  },
  props: [
    'permissions',
    'section',
    'user',
    'langs',
    'settings',
    'permissions',
    'language',
    'inventories',
    'providers'
  ],
  data() {
    return {
      columns: ['invoiceID', 'customer', 'invoice_date', 'total', 'invoice type', 'actions'],

      searchOn: false,

      sales: [],
      strings: [],

      filter: {
        per_page: 30
      },
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
      refundId: '',
      paymentMethods: [],
      export_fields: {
        'invoice id': 'id',
        'customer name': 'c_name',
        'customer phone': 'c_phone',
        at: 'created_at',
        inventory: 'inventory_title',
        user: 'user_name',
        total: 'total'
      },
      skeletonLoading: true
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    filterResults() {
      this.usingFilters = 1
      this.refresh()
    },
    refresh() {
      // this.loaded = false;
      console.log(this.current_page)
      this.clearResults()
      this.itemsLoaded = false
      axios({
        method: 'GET',
        url: '/api/purchase-refunds',
        params: {
          page: this.current_page,
          provider: this.filter.provider,
          inventory: this.filter.inventory,
          date_from: this.filter.date_from,
          date_to: this.filter.date_to,
          invoice_id: this.filter.invoice_id
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.users = res.data.body.users
          this.sales = res.data.body.purchase_refunds.data
          this.total = res.data.body.purchase_refunds.paginate.total
          this.current_page = res.data.body.purchase_refunds.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.purchase_refunds.paginate.next_page_url
          this.prev_page_url = res.data.body.purchase_refunds.paginate.prev_page_url
          this.first_page_url = res.data.body.purchase_refunds.paginate.first_page_url
          this.paymentMethods = res.data.body.payment_method
          this.last_page_url = res.data.body.purchase_refunds.paginate.last_page_url
          this.last_page = res.data.body.purchase_refunds.paginate.last_page

          this.loaded = true
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    goTo(url) {
      this.skeletonLoading = true
      this.sales = []
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
      axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false
          this.sales = res.data.body.purchase_refunds.data
          this.total = res.data.body.purchase_refunds.paginate.total
          this.current_page = res.data.body.purchase_refunds.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.purchase_refunds.paginate.next_page_url
          this.prev_page_url = res.data.body.purchase_refunds.paginate.prev_page_url
          this.first_page_url = res.data.body.purchase_refunds.paginate.first_page_url
          this.paymentMethods = res.data.body.payment_method
          this.last_page_url = res.data.body.purchase_refunds.paginate.last_page_url
          this.last_page = res.data.body.purchase_refunds.paginate.last_page
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    clearResults() {
      this.users = []
      this.sales = []
      this.total = ''
      this.current_page = ''
      this.prev_page = ''
      this.next_page = ''
      this.next_page_url = ''
      this.prev_page_url = ''
      this.first_page_url = ''
      this.last_page_url = ''
    },
    reset() {
      this.filter = {}
    },
    resetForm() {
      this.filter = {}
      return this.refresh()
    },
    openRefundModal(id) {
      this.refundId = id
      let data = {
        language: this.language,
        paymentMethods: this.paymentMethods,
        settings: this.settings
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-purchase-refund-modal', data)
    },

    exportFile() {
      let url = 'api/export-sales/'
      axios
        .get(url, {
          responseType: 'arraybuffer'
        })
        .then((response) => {
          console.log(response.data)

          const url = window.URL.createObjectURL(new Blob([response.data]))

          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'initial_stock.xlsx')
          document.body.appendChild(link)
          link.click()
        })
    },

    exportFilePdf() {
      let url = `/api/export-sales/pdf/${this.filter.payment_method}`
      axios
        .get(url, {
          responseType: 'arraybuffer'
        })
        .then((response) => {
          console.log(response.data)

          const url = window.URL.createObjectURL(new Blob([response.data]))

          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'sales.pdf')
          document.body.appendChild(link)
          link.click()
        })
    }
  }
}
</script>
<style scoped>
.table-container {
  max-height: unset !important;
}

@media screen and (max-width: 479px) {
  .search-btn {
    position: absolute;
    top: -45px;
  }
}
</style>
