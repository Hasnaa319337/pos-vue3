<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div
          class="card-header header-sm d-none justify-content-between align-items-center"
        >
          <b-row class="justify-content-between">
            <b-col cols="auto">
              <h4
                class="card-title"
                v-if="user.language"
                v-text="trans('accounts_reports')"
              ></h4>
            </b-col>
          </b-row>
        </div>
        <div class="card-body mt-5">
          <div
            class="row mx-0 mb-4"
            style="display: flex; justify-content: end"
          >
            <div>
              <b-button
                v-if="getReport"
                variant="success"
                type="submit"
                @click="printReport"
                >طباعه
                <font-awesome-icon icon="fa-solid fa-print" />
              </b-button>
              <b-button @click="$router.go(-1)" class="btn btn-warning">
                <font-awesome-icon icon="fa-solid fa-reply-all " />
              </b-button>
            </div>

            <h4 class="col-12 p-0">
              <span class="title">
                كشف حساب : {{ selected_account.account }} -
                {{ selected_account.text }}
              </span>
            </h4>
          </div>
          <div id="report" class="row mx-0">
            <!-- <h4 class="col-12 text-center">رصيد ما قبل الفترة : {{report.balance_previous_period}} </h4> -->
            <b-table-simple
              sticky-header
              class="report-table"
              bordered
              responsive
              style="
                max-height: 400px;
                margin-bottom: 0;
                position: relative;
                width: 100%;
              "
            >
            <b-thead class="main-header">
                <b-tr class="rounded">
                  <b-th class="th_style" colspan="2">
                    {{ trans('balance') }}
                  </b-th>
                  <b-th class="th_style" colspan="2">
                    {{ trans('account_movement') }}
                  </b-th>
                  <b-th class="th_style" colspan="3">
                    {{ trans('previous_balance') }} :

                    {{
                      report.balance_previous_period.number.toNegativeFormat()
                    }}
                  </b-th>
                  <b-th class="th_style" colspan="2">
                    {{ trans('next_balance') }} :
                    {{ report.balance_next_period.number.toNegativeFormat() }}
                  </b-th>

                  <b-th
                    colspan="2"
                    :id="
                      report.balance_period.number.isNegative('negative_number')
                    "
                    >{{ trans('balance') }} :
                    {{ report.balance_period.number.toNegativeFormat() }}
                  </b-th>
                </b-tr>
                <b-tr class="rounded">
                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                  >
                    {{ trans('debit') }}
                  </b-th>
                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                  >
                    {{ trans('credit') }}
                  </b-th>
                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                  >
                    {{ trans('debit') }}
                  </b-th>
                  <b-th style="">{{ trans('credit') }} </b-th>
                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                    colspan="3"
                  >
                    {{ trans('Statement') }}
                  </b-th>
                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                    colspan="3"
                    >{{ trans('date') }}
                  </b-th>

                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                  >
                    {{ trans('document_number') }}
                  </b-th>
                </b-tr>
              </b-thead>
              <template v-for="(transaction, index) in report.transaction.data">
                <b-tbody :key="index">
                  <tr>
                    <td style="border: 1px solid #c8c8c8 !important">
                      {{ transaction.balance_debit }}
                    </td>
                    <td style="border: 1px solid #c8c8c8 !important">
                      {{ transaction.balance_credit }}
                    </td>
                    <td style="border: 1px solid #c8c8c8 !important">
                      {{ transaction.debit }}
                    </td>
                    <td style="border: 1px solid #c8c8c8 !important">
                      {{ transaction.credit }}
                    </td>
                    <td
                      style="border: 1px solid #c8c8c8 !important"
                      colspan="3"
                    >
                      {{ transaction.description }}
                    </td>
                    <td style="border: 1px solid #c8c8c8 !important"   colspan="3">
                      {{ transaction.date }}
                    </td>
                    <td style="border: 1px solid #c8c8c8 !important">
                      <!-- :to="transaction.reference_type + '/' + transaction.reference_id" -->

                      <!-- رصيد افتتاحي -->
                      <router-link
                        :to="
                          '/accounting_initial_balance/edit/' +
                          transaction.reference_id
                        "
                        v-if="
                          transaction.reference_type ===
                          'accounting_initial_balances'
                        "
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- فاتوره مشتريات -->
                      <router-link
                        :to="'/purchases/edit/' + transaction.reference_id"
                        v-else-if="transaction.reference_type === 'purchases'"
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- مرتجع مشتريات -->
                      <router-link
                        :to="'/refund-purchase/view/' + transaction.reference_id"
                        v-else-if="
                          transaction.reference_type === 'purchase_refunds'
                        "
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- مرتجع مبيعات -->
                      <router-link
                        :to="'/refund-sale/view/' + transaction.reference_id"
                        v-else-if="
                          transaction.reference_type === 'sale_refunds'
                        "
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- سند صرف  -->
                      <router-link
                        :to="'/receipt-voucher/' + transaction.reference_id"
                        v-else-if="transaction.reference_type === 'vouchers'"
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- فاتوره مبيعات -->
                      <router-link
                        :to="'/sales/view/' + transaction.reference_id"
                        v-else-if="transaction.reference_type === 'sales'"
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- AccountingRestrictionItem  -->
                      <router-link
                        :to="
                          '/accounting_initial_balance/show/' +
                          transaction.reference_id
                        "
                        v-else-if="
                          transaction.reference_type ===
                          'accounting_initial_balance_items'
                        "
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- accounting_restrictions  -->
                      <router-link
                        :to="
                          '/accounting-restrictions/edit/' +
                          transaction.reference_id
                        "
                        v-else-if="
                          transaction.reference_type ===
                          'accounting_restrictions'
                        "
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <span v-else>
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </span>
                    </td>
                  </tr>
                </b-tbody>
              </template>
              <tr>
                <td colspan="9">
                  الرصيد الحالي: {{ report.balance_period.string }}
                </td>
              </tr>
            </b-table-simple>
          </div>
        </div>
      </div>
      <div v-else class="card-body text-center">
        <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import JsonExcel from 'vue-json-excel'
import Multiselect from 'vue-multiselect'
import Customer from './modals/Customer.vue'

Vue.component('downloadExcel', JsonExcel)

Vue.use(VuejsDialog)
export default {
  components: {
    Multiselect,
    Customer,
  },
  name: 'AppAccountsReports',
  props: ['permissions', 'section', 'user', 'langs', 'settings'],
  data() {
    return {
      message: '',
      alertType: 'success',
      getReport: false,
      // strings: [],
      filter: {
        per_page: 30,
        account_in_link: '',
        account_link: '',
      },
      accounts: [],
      links: [],
      users: [],
      loaded: false,
      report: {},
      short_version: true,
      selected_account: {},
      cssText: `
                            @media print {
                                 @page {
        margin:5px;
    }
* {
            direction: rtl;
                                    overflow: visible !important;
                                    margin: 0;
                                    padding: 0;
                                    -webkit-box-sizing: border-box;
                                    box-sizing: border-box;
                                    outline: none;
                                    text-transform: none;
                                    text-decoration: none;
        }
        .container {
            width: auto;
            min-width: unset !important;
        }

        .w-100 {
            width: 100% !important;
        }
        .m-0 {
            margin: 0 !important;
        }
        .pl-3, .px-3 {
            padding-left: 1rem !important;
        }
        .pr-3, .px-3 {
            padding-right: 1rem !important;
        }
        .pb-2, .py-2 {
            padding-bottom: 0.5rem !important;
        }
        .pt-2, .py-2 {
            padding-top: 0.5rem !important;
        }
        .align-items-center {
            align-items: center;
        }
        .justify-content-between {
            justify-content: space-between !important;
        }
        .justify-content-around {
            justify-content: space-around !important;
        }
        .justify-content-end {
            justify-content: flex-end !important;
        }
        .row {
            display: -webkit-box;
            display: flex;
            flex-wrap: wrap;
            margin-left: -15px;
            margin-right: -15px;
        }
        .col {
            flex-basis: 0;
            -webkit-box-flex: 1;
            flex-grow: 1;
            max-width: 100%;
            padding: 0 15px;
        }
        h3 {
            font-size: 20px;
            font-weight: bold;
            padding-bottom: 0;
        }
        .col-sm-12 {
            -webkit-box-flex: 0;
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 15px;
        }
        .col-12 {
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 15px;
        }
        .col-6 {
            flex: 0 0 50%;
            max-width: 50%;
            padding: 0 15px;
        }
        .col-auto {
            flex: 0 0 auto;
            width: auto;
            max-width: 100%;
            padding: 0 15px;
        }

        .qr-code img {
            max-width: 100%;
        }

        h3 {
            font-size: 25px;
            color: #161616;
            font-weight: bold;
        }
        .badge {
            font-size: 20px;
            padding: 10px;
            border-radius: 14px;
        }

        .bill-info {
            box-shadow: 0px 1px 4px #0000001A;
            border-radius: 11px;
            padding: 10px 30px !important;
            margin-bottom: 16px;
        }
        .bill-info p {
            font-size: 18px;
            padding-bottom: 0 !important;
        }
        th {
            font-weight: bold !important;
        }
        th,td {
            border-bottom: 1px solid #dee2e6 !important;
            margin: 10px;
            font-size: 20px;
            white-space: inherit;
            text-align: center !important;
            vertical-align: middle !important;

        }

        .invoice-btns .btn-success {
            background: #62C83F;
            border-color: #62C83F;
        }
        .invoice-btns .btn-danger {
            background: #CF1212;
            border-color: #CF1212;
        }

        h1 {
            font-size: 36px;
        }
        p {
            font-size: 20px;
        }

        .totals b {
            font-size: 16px;
            position: relative;
        }
        .totals .row:first-of-type {
            background: #dee2e6;
        }

        .invoice-footer {
            background: transparent;
        }
        .invoice-footer p {
            font-size: 16px;
        }
        table {
            width : 100% !important
        }
        .mb-3, .my-3 {
            margin-bottom: 1rem !important;
        }
        .mx-0 {
            margin: 0;
        }
                            }
                        `,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.initPrintMe()
    this.refresh()
  },
  methods: {
    filterResults(short) {
      // if (short == 'short') {
      //   this.short_version = false;
      // } else {
      //   this.short_version = true;
      // }
      // let url;
      // if (this.filter.date_from && this.filter.date_to) {
      //   url = '/api/account/get/report?account=' + this.filter.account_in_link + '&from_date=' + this.filter.date_from + '&to_date=' + this.filter.date_to + '';
      // } else {
      //   url = '/api/account/get/report?account=' + this.filter.account_in_link + '';
      // }
      let url = '/api/account/get/report?account=' + this.$route.params.id

      axios
        .get(url)
        .then(res => {
          this.report = res.data.body.report
          this.loaded = true
          this.itemsLoaded = true
          this.getReport = true
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
    refresh() {
      let url = '/api/account/get/report?account=' + this.$route.params.id
      axios
        .get(url)
        .then(res => {
          if (res.data.status) {
            this.links = res.data.body.account_link
            this.report = res.data.body.report
            
            this.selected_account = res.data.body.report.account
            this.loaded = true
            this.itemsLoaded = true
            this.getReport = true
          }
          if (res.data.message) {
            this.message = res.data.message
            this.alertType = res.data.status ? 'success' : 'danger'
            setTimeout(() => {
              this.message = ''
              this.alertType = 'success'
            }, 5000)
          } else {
            this.message = ''
          }
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
    setDefaultType() {
      let url =
        '/api/account/from/link?link_name=' + this.filter.account_link + ''
      axios
        .get(url)
        .then(res => {
          if (res.data.status) {
            this.accounts = res.data.body.accounts
            this.loaded = true
            this.itemsLoaded = true
          }
          if (res.data.message) {
            this.message = res.data.message
            this.alertType = res.data.status ? 'success' : 'danger'
            setTimeout(() => {
              this.message = ''
              this.alertType = 'success'
            }, 5000)
          } else {
            this.message = ''
          }
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
      }
      this.$refs.form.reset()
    },
    // grapAccount(account) {
    //   this.selected_account = this.accounts.find(obj => {
    //     return obj.account == account
    //   })

    // },
    printReport() {
      //invoke Print me From Mixin //
      this.printMe('#report', this.cssText)
    },
  },
}
</script>
<style scoped>
.stretch-card > .card {
  background: transparent;
  border: none;
  box-shadow: none;
}

h4 {
  font-size: 16px;
  font-weight: 500;
}

h4 .title {
  background: #2349ef;
  border-radius: 48px;
  color: #fff;
  padding: 6px 30px;
  margin: 15px 0 15px 30px;
}

.report-table table {
  border-radius: 10px 10px 0 0 !important;
}

table thead.main-header th {
  background: #323eb6 !important;
  color: #fff !important;
  border: 1px solid #c8c8c8 !important;
}

th {
  text-align: center !important;
}

thead tr th,
tr td {
  font-size: 16px !important;
  font-weight: 500 !important;
  min-width: unset !important;
  max-width: unset !important;
  height: auto !important;
}

td table td {
  font-weight: 300 !important;
  color: #0d0d0d !important;
}

.table.table-bordered td {
  max-width: unset !important;
  width: auto !important;
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

select {
  width: 30px;
}

select,
input {
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

.report-table {
  background-color: #fff;
  padding: 16px 24px;
  border-radius: 38px;
}

.b-table-sticky-header > .table.b-table > thead > tr > th {
  position: sticky;
  top: -16px;
  z-index: 2;
}

.b-table-sticky-header > .table.b-table > thead > tr:last-of-type > th {
  position: sticky;
  top: 21px;
  z-index: 2;
}
</style>
