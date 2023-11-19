<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-header mb-3 header-sm d-flex" style="padding: 0 !important">
        <div class="row m-0 w-100 justify-content-between align-items-center">
          <h4 class="card-title col-auto" v-if="language">
            {{ trans('sales_invoices') }}
          </h4>
          <div class="col-sm-auto col-12 text-center mt-sm-0 mt-2">
            <router-link to="/sales/add" class="btn btn-primary my-1" style="margin: 0 2px">
              {{ trans('add sale invoice') }}
            </router-link>
            <!-- <download-excel v-if="permissions.includes('export_sales')" class="btn btn-success print-hidden"
                          :name="'sales.xls'" :data="sales" :fields="export_fields">
                          {{ strings['export excel'] }}
                          <font-awesome-icon icon="fa-solid fa-download" />
                      </download-excel> -->

            <button class="btn btn-primary" @click="exportFile" style="margin: 0 2px">
              {{ trans('download excel') }}
            </button>

            <button class="btn btn-primary" @click="exportFilePdf" style="margin: 0 2px">
              {{ trans('download pdf') }}
            </button>

            <b-button
              :style="user.language == 'en' ? 'right: 0' : 'left: 0'"
              variant="primary"
              class="search-btn"
              @click="searchOn = !searchOn"
            >
              <i class="bi bi-search"></i>
            </b-button>
            <go-back-button />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div
          class="row justify-content-between align-items-center mb-4"
          v-if="permissions.includes('view_sale')"
        >
          <div class="col-sm-12" v-if="searchOn">
            <ValidationObserver v-slot="{ handleSubmit }" ref="form">
              <b-form @submit.prevent="handleSubmit(filterResults)" @reset.prevent="reset">
                <b-form-row>
                  <b-col cols="12" md="2">
                    <b-form-group :label="trans('inventory')">
                      <b-form-select v-model="filter.inventory">
                        <b-form-select-option
                          v-for="inv in inventories"
                          :value="inv.id"
                          :key="inv.id"
                          >{{ inv.title }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="2">
                    <b-form-group :label="trans('cashier')">
                      <b-form-select v-model="filter.cashier">
                        <b-form-select-option v-for="usr in users" :value="usr.id" :key="usr.id"
                          >{{ usr.name }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="2">
                    <b-form-group :label="trans('customer')">
                      <b-form-select v-model="filter.customer">
                        <b-form-select-option
                          v-for="customer in customers"
                          :value="customer.id"
                          :key="customer.id"
                          >{{ customer.name }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  </b-col>

                  <b-col cols="12" md="2">
                    <b-form-group :label="trans('date from')">
                      <b-input type="date" class="form-control" v-model="filter.date_from">
                      </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="2">
                    <b-form-group :label="trans('date to')">
                      <b-input type="date" class="form-control" v-model="filter.date_to"> </b-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="2">
                    <b-form-group label="رقم الفاتوره">
                      <b-form-input
                        type="number"
                        v-model="filter.invoice_id"
                        @keypress="isNumber($event)"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row class="justify-content-center">
                  <b-button variant="success" type="submit" class="mr-2">
                    <font-awesome-icon icon="fa-solid fa-filter" />
                    {{ trans('filter') }}
                  </b-button>
                  <b-button variant="warning" type="reset" class="mr-2" @click="resetForm()">
                    <font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                    {{ trans('reset search') }}
                  </b-button>
                </b-form-row>
              </b-form>
            </ValidationObserver>
          </div>
        </div>
        <div
          class="row align-items-center justify-content-between mb-4"
          v-if="permissions.includes('view_sale')"
        >
          <div class="col-sm-12">
            <b-table-simple
              class="table-container"
              sticky-header
              striped
              bordered
              responsive
              style="min-height: 50px"
              v-if="permissions.includes('view_sale')"
            >
              <GlobalTabel :columns="columns" />
              <TableSkeletonLoader :items="10" :length="columns.length" v-if="skeletonLoading" />
              <b-tbody v-for="(sale, index) in sales" :key="sale.id" v-else>
                <b-tr>
                  <b-td>#{{ sale.id }}</b-td>
                  <b-td>
                    <p>{{ _.get(sale, 'customer.name') }}</p>
                    <p>{{ _.get(sale, 'customer.phone') }}</p>
                  </b-td>
                  <b-td>{{ sale.updated_at }}</b-td>
                  <b-td
                    >{{ sale.total.toNegativeFormat() }}
                    {{ getSetting('currency', settings) }}
                  </b-td>
                  <b-td>{{ trans(sale.payment_type) }}</b-td>
                  <b-td v-if="sale.payment_type == 'installment'">
                    {{ trans('installment') }}
                  </b-td>
                  <b-td v-else>
                    {{ trans(sale.payment_method) }}
                  </b-td>

                  <b-td>{{ _.get(sale, 'user.name') }}</b-td>
                  <b-td>
                    <button
                      @click="checkRefund(sale)"
                      style="
                        cursor: pointer;
                        border-radius: 8px !important;
                        color: #dc3545 !important;
                        margin: 0 5px;
                      "
                    >
                      <font-awesome-icon icon="fa-solid fa-arrow-right-arrow-left" />
                    </button>

                    <b-button v-b-toggle="'collapse-' + index" class="btn btn-primary more">
                      <i class="bi bi-plus-lg"></i>
                    </b-button>
                  </b-td>
                </b-tr>

                <b-tr>
                  <b-td colspan="10">
                    <b-collapse :id="'collapse-' + index" class="mt-2">
                      <div class="item_box">
                        <div class="options">
                          <span style="font-weight: 700">{{ trans('options') }}</span>
                          <div class="btns">
                            <router-link :to="'/sales/view/' + sale.id">
                              <button>
                                <font-awesome-icon icon="fa-solid fa-eye" />
                                <span>{{ trans('show') }}</span>
                              </button>
                            </router-link>
                            <button>
                              <font-awesome-icon class="icon" icon="fa-solid fa-print" />
                              <span>{{ trans('print') }}</span>
                            </button>
                            <button>
                              <font-awesome-icon class="icon" icon="fa-solid fa-file-pdf" />
                              <span>{{ trans('download pdf') }} </span>
                            </button>

                            <button>
                              <ActionButton
                                v-if="permissions.includes('view_action_event_sale')"
                                :id="sale.id"
                                :resource_name="'sale'"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </b-collapse>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
          <div v-if="itemsLoaded && !sales.length" class="col-sm-12 text-center">
            <h5 class="no_results_found">
              {{ trans('no_results_found') }}
            </h5>
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
        <div class="row align-items-center justify-content-between" v-else>
          <div class="col">
            <h2 class="text-center" v-if="language == 'en'">You Not Allowed to Open This Page</h2>
            <h2 class="text-center" v-else>
              {{ trans('page_not_found') }}
            </h2>
          </div>
        </div>
      </div>
    </div>

    <Refund :invoice_id="refundId" :settings="settings" :user="user"></Refund>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import JsonExcel from 'vue-json-excel'
import Refund from '@/components/sections/modals/Refund.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'

Vue.component('downloadExcel', JsonExcel)

Vue.use(VuejsDialog)
export default {
  name: 'AppSales',
  components: {
    Refund,
    SkeletonLoader,
    PaginationComponent,
    TableSkeletonLoader
  },
  props: [
    'permissions',
    'section',
    'user',
    'langs',
    'settings',
    'permissions',
    'language',
    'inventories'
  ],
  data() {
    return {
      columns: [
        'invoiceID',
        'customer',
        'invoice_date',
        'total',
        'payment type',
        'payment method',
        'created_by',
        'actions'
      ],
      searchOn: false,

      sales: [],
      customers: [],
      paginate: {},
      filter: {
        per_page: 15
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
      last_page: '',
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
      this.clearResults()
      this.itemsLoaded = false
      this.loaded = false
      axios({
        method: 'GET',
        url: '/api/sales',
        params: {
          page: this.current_page,
          inventory: this.filter.inventory,
          cashier: this.filter.cashier,
          customer_id: this.filter.customer,
          date_from: this.filter.date_from,
          date_to: this.filter.date_to,
          invoice_id: this.filter.invoice_id
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.users = res.data.body.users
          this.customers = res.data.body.customers
          this.sales = res.data.body.sales.data
          this.paginate = res.data.body.sales.paginate
          this.paymentMethods = res.data.body.payment_methods
          this.last_page = res.data.body.sales.paginate.last_page
          this.total = res.data.body.sales.paginate.total
          this.current_page = res.data.body.sales.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.sales.paginate.next_page_url
          this.prev_page_url = res.data.body.sales.paginate.prev_page_url
          this.first_page_url = res.data.body.sales.paginate.first_page_url

          this.last_page_url = res.data.body.sales.paginate.last_page_url
          // if (!this.usingFilters) {
          this.filter.inventory = this.user.inventory
          // }

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
          this.sales = res.data.body.sales.data
          this.total = res.data.body.sales.paginate.total
          this.current_page = res.data.body.sales.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.last_page = res.data.body.sales.paginate.last_page
          this.next_page_url = res.data.body.sales.paginate.next_page_url
          this.prev_page_url = res.data.body.sales.paginate.prev_page_url
          this.first_page_url = res.data.body.sales.paginate.first_page_url
          this.last_page_url = res.data.body.sales.paginate.last_page_url
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    Delete(id) {
      this.$dialog
        .confirm(this.trans('deleting sale'))
        .then((dialog) => {
          axios
            .post('/api/sales/delete', { id: id })
            .then(
              (res) => {
                if (res.data.status) {
                  this.showToastError(res.data.message, res.data.custom_code)
                  this.sales = this.sales.filter((x) => {
                    return x.id != id
                  })
                } else {
                  this.showToastError(res.data.message, res.data.custom_code)
                }
              },
              (error) => {
                this.message = error.response.data.message
                this.alertType = 'danger'
              }
            )
            .catch((error) => {
              this.showToastError(error.response.data.message, error.response.data.custom_code)
            })
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
      this.$refs.form.reset()
    },

    openRefundModal(id) {
      this.refundId = id
      let data = {
        language: this.user.language,
        paymentMethods: this.paymentMethods,
        settings: this.settings
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-refund-modal', data)
    },

    exportFile() {
      let url = 'api/export-sales/'
      axios
        .get(url, {
          responseType: 'arraybuffer'
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'sales-invoice.xlsx')
          document.body.appendChild(link)
          link.click()
        })
    },

    exportFilePdf() {
      if (!this.filter.invoice_type) {
        let text =
          this.user.language == 'en' ? 'Please select sales type' : 'من فضلك اختر نوع المبيعات'
        this.showToastError(text, '2000')
        return
      }
      let url = `/api/export-sales/pdf/${this.filter.invoice_type}`
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
    },

    resetForm() {
      this.filter = {}
      return this.refresh()
    },
    checkRefund(item) {
      if (item.has_refund) {
        this.showToastError(this.trans('the invoice has refunded before'), '4000')
      } else {
        this.$router.push('/sales/refund/' + item.id)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.table-container {
  max-height: unset !important;
}

table {
  tbody {
    border: none !important;

    tr {
      border: none !important;

      td {
        border: none !important;
      }
    }
  }
}

.more {
  width: 30px;
  height: 30px;
  background: linear-gradient(180deg, #137b97 0%, #5dc5e0 100%) 0% 0%;
  border: none;
  box-shadow: none;
  display: inline-grid;
  justify-content: center;
}

.item_box {
  width: 100% !important;
  background: #f6f6f6;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin: 10px auto;

  .status {
    padding: 15px 10px;
    background-color: #fff;

    .title {
      color: #000000;
      font-size: 15px;
      font-weight: bold;
    }
  }

  .options {
    display: flex;
    align-items: center;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 8px;
    padding: 8px 10px;
    gap: 21px;

    .btns {
      display: flex;
      justify-content: center;
      align-items: center;

      gap: 13px;

      span {
        font-size: 15px;
        font-weight: normal;
      }

      .icon {
        font-size: 13px;
      }

      button {
        outline: none;
        border: none;
        width: auto;
        min-width: 80px;
        height: 35px;
        background: #f6f6f6 0% 0% no-repeat padding-box;
        border-radius: 7px;
        color: #000000;
        display: flex;
        gap: 5px;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

@media screen and (max-width: 479px) {
  .search-btn {
    position: absolute;
    top: -45px;
  }
}
</style>
