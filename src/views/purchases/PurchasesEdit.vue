<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card pt-3" v-if="loaded">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
          style="margin: 20px 0"
        >
          <h4
            class="card-title"
            style="padding: 15px 0; font-size: 29px !important"
          >
            <img
              style="width: 20px"
              src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/null/external-left-arrow-arrows-inkubators-detailed-outline-inkubators-3.png"
            />

            {{ trans('invoice number') }}
            {{ '#' + invoice.id }}
          </h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
          style="
            padding: 14px 25px !important;
            border: 1px solid #cfcfcf;
            border-bottom: 1px solid #cfcfcf !important;
            background: none;
          "
        >
          <p>
            <b>{{ trans('created_at') }}</b> {{ invoice.created_at }}
          </p>
        </div>
        <div class="card-body">
          <div class="align-items-center justify-content-between mb-4">
            <div class="col-sm-12 mb-4 mt-4 text-center">
              <b-row class="mb-3 mx-0 side-border">
                <b-col cols="12" md="4">
                  <div class="item_style">
                    <img
                      class="icon_div"
                      src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/FFFFFF/external-user-advertisement-tanah-basah-basic-outline-tanah-basah.png"
                    />

                    <b>{{ trans('provider') }} : </b>
                    <span
                      >({{ _.get(invoice, 'provider.tax_num') }})
                      {{ _.get(invoice, 'provider.name') }}</span
                    >
                  </div>
                </b-col>
                <b-col cols="12" md="4">
                  <div class="item_style">
                    <img
                      class="icon_div"
                      src="https://img.icons8.com/ios/50/FFFFFF/google-sheets.png"
                    />
                    <b>{{ trans('provider invoice number') }} : </b>
                    <span v-text="invoice.provider_inv_number"></span>
                  </div>
                </b-col>
                <b-col cols="12" md="4">
                  <div class="item_style">
                    <img
                      class="icon_div"
                      src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/FFFFFF/external-money-business-kiranshastry-lineal-kiranshastry.png"
                    />

                    <b>{{ trans('payment method') }} : </b>
                    <!-- <span v-if="invoice.payment_method === 'full'">{{ trans(invoice.payment_method) }}</span>
                    <span v-else>{{ trans('installment') }}</span> -->
                    <span>{{ trans(invoice.payment_method) }}</span>
                  </div>
                </b-col>
              </b-row>
              <b-row class="side-border mx-0">
                <b-col cols="12" md="4">
                  <div class="item_style">
                    <img
                      class="icon_div"
                      src="https://img.icons8.com/ios/50/FFFFFF/google-sheets.png"
                    />
                    <b>{{ trans('invoice type') }} : </b>
                    <span>{{ trans(invoice.payment_type) }}</span>
                  </div>
                </b-col>
                <!-- <b-col cols="12" md="4">
                  <div class="item_style">
                    <img
                      class="icon_div"
                      src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/FFFFFF/external-money-business-kiranshastry-lineal-kiranshastry.png"
                    />

                    <b>{{ trans('paid_amount') }} : </b>
                    <span v-text="invoice.paid_amount"></span>
                  </div>
                </b-col>
                <b-col cols="12" md="4">
                  <div class="item_style">
                    <img
                      class="icon_div"
                      src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/FFFFFF/external-money-business-kiranshastry-lineal-kiranshastry.png"
                    />

                    <b>{{ trans('remain_amount') }} : </b>
                    <span v-text="invoice.remaining_amount"></span>
                  </div>
                </b-col> -->
              </b-row>
            </div>
            <div class="col-sm-12">
              <b-row>
                <b-col>
                  <h2 class="col-sm-12">{{ trans('items') }}</h2>
                  <div class="col-sm-12">
                    <b-table-simple
                      sticky-header
                      striped
                      bordered
                      responsive
                      style="min-height: 50px"
                    >
                      <GlobalTabel :columns="columns" />
                      <b-tbody
                        v-for="(item, index) in invoice.items"
                        :key="item.id"
                      >
                        <b-tr>
                          <b-td>
                            {{ index + 1 }}
                          </b-td>
                          <b-td>
                            {{ spliceText(invoice.items[index].serial, '10') }}
                          </b-td>
                          <b-td>
                            {{ spliceText(invoice.items[index].title, '10') }}
                          </b-td>
                          <b-td>
                            {{ invoice.items[index].unit_key }}
                          </b-td>
                          <b-td>
                            {{ invoice.items[index].quantity }}
                          </b-td>
                          <b-td>
                            {{
                              parseFloat(invoice.items[index].cost)
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            }}
                          </b-td>
                          <b-td>
                            {{ invoice.items[index].discount_percentage }}
                          </b-td>
                          <b-td>
                            {{
                              parseFloat(invoice.items[index].discount_amount)
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            }}
                          </b-td>
                          <b-td>
                            {{
                              parseFloat(invoice.items[index].subtotal)
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            }}
                          </b-td>
                          <b-td>
                            {{ invoice.items[index].tax_percentage }} %
                          </b-td>

                          <b-td>
                            {{
                              parseFloat(invoice.items[index].tax_amount)
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            }}
                          </b-td>

                          <b-td>
                            {{
                              parseFloat(invoice.items[index].total)
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            }}

                            <!-- {{ ((invoice.items[index].cost - invoice.items[index].discount_amount) * invoice.items[index].quantity 
                            +
                            ((invoice.items[index].cost - invoice.items[index].discount_amount) * invoice.items[index].quantity * (
                              invoice.items[index].tax_percentage /100
                            ))
                            ).toFixed(2) }} -->
                          </b-td>
                        </b-tr>
                      </b-tbody>
                      <b-tbody>
                        <b-tr>
                          <b-td colspan="3">
                            <label
                              style="display: inline !important; margin: 0 5px"
                            >
                              {{ trans('invoice_date') }}
                            </label>
                            <div style="display: inline !important">
                              {{ invoice.invoice_date }}
                            </div>
                          </b-td>
                          <b-td colspan="4">
                            <label
                              style="display: inline !important; margin: 0 5px"
                            >
                              {{ trans('invoice_number') }}
                            </label>
                            <div style="display: inline !important">
                              {{ invoice.id }}
                            </div>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td colspan="3" class="text-center"
                            >{{ trans('total_value_with_no_added_tax') }}
                          </b-td>
                          <b-td colspan="4" class="text-center">
                            <b
                              >{{
                                parseFloat(invoice.subtotal)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }} </b
                            ><span>{{ getSetting('currency', settings) }}</span>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td colspan="3" class="text-center">
                            {{ trans('discount_total') }}
                          </b-td>
                          <b-td colspan="4" class="text-center">
                            <b
                              >{{
                                parseFloat(invoice.discount_amount)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }} </b
                            ><span>{{ getSetting('currency', settings) }}</span>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td colspan="3" class="text-center">
                            {{ trans('total value after discount') }}
                          </b-td>
                          <b-td colspan="4" class="text-center">
                            <b>
                              {{
                                parseFloat(
                                  invoice.subtotal - invoice.discount_amount
                                )
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }}
                            </b>
                            <span>{{ getSetting('currency', settings) }}</span>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <!-- v-for="item in invoice.data" :key="item"  ({{ item.tax}} %)  -->
                          <b-td colspan="3" class="text-center"
                            >{{ trans('added tax') }} ({{
                              invoice.items[0].tax_percentage
                            }}
                            %)
                          </b-td>
                          <!--   -->
                          <b-td colspan="4" class="text-center">
                            <b
                              >{{
                                parseFloat(addedTax)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }} </b
                            ><span>{{ getSetting('currency', settings) }}</span>
                          </b-td>
                        </b-tr>

                        <b-tr>
                          <b-td colspan="3" class="text-center"
                            >{{ trans('invoice total') }}
                          </b-td>
                          <b-td colspan="4" class="text-center">
                            <b
                              >{{
                                parseFloat(invoice.total)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }} </b
                            ><span>
                              {{ getSetting('currency', settings) }}</span
                            >
                          </b-td>
                        </b-tr>
                      </b-tbody>
                      <b-thead v-if="has_refund">
                        <b-tr class="rounded" variant="dark">
                          <b-th>{{ trans('id') }}</b-th>
                          <b-th>{{ trans('barcode') }}</b-th>
                          <b-th>{{ trans('item') }}</b-th>

                          <b-th>
                            {{ trans('quantity') }}
                          </b-th>
                          <b-th>{{ trans('Cost') }}</b-th>
                          <b-th>{{ trans('added_tax') }} </b-th>
                          <b-th> {{ trans('total') }}</b-th>
                        </b-tr>
                      </b-thead>
                      <b-tbody>
                        <div v-if="has_refund">
                          <b-tr
                            class="bg-danger text-white"
                            v-for="(item, index) in refund.items"
                            :key="'refund' + index"
                          >
                            <b-td>
                              {{ index + 1 }}
                            </b-td>
                            <b-td>
                              {{ item.serial }}
                            </b-td>
                            <b-td>
                              {{ item.title }}
                            </b-td>
                            <b-td
                              style="
                                min-width: 65px !important;
                                max-width: 65px !important;
                                width: 65px !important;
                              "
                            >
                              <b>{{ item.quantity }}</b>
                            </b-td>
                            <b-td>{{ item.cost }}</b-td>
                            <b-td> {{ item.tax_percentage }} % </b-td>
                            <b-td>
                              <b
                                >{{
                                  parseFloat(
                                    parseFloat(parseFloat(item.cost)) *
                                      parseInt(item.quantity)
                                  )
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                }}
                                {{ getSetting('currency', settings) }}</b
                              >
                            </b-td>
                          </b-tr>
                        </div>
                        <b-tr v-if="has_refund" class="bg-danger text-white">
                          <b-td colspan="3" class="text-center">
                            {{ trans('total') }}
                          </b-td>
                          <b-td colspan="4" class="text-center">
                            <b
                              >{{
                                parseFloat(refund.subtotal_refunded)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }}
                              {{ getSetting('currency', settings) }}</b
                            >
                          </b-td>
                        </b-tr>
                        <b-tr v-if="has_refund" class="bg-danger text-white">
                          <b-td colspan="3" class="text-center">
                            {{ trans('tax') }}
                          </b-td>
                          <b-td colspan="4" class="text-center">
                            <b
                              >{{
                                parseFloat(
                                  refund.total_refunded -
                                    refund.subtotal_refunded
                                )
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }}
                              {{ getSetting('currency', settings) }}</b
                            >
                          </b-td>
                        </b-tr>
                        <b-tr v-if="has_refund" class="bg-danger text-white">
                          <b-td colspan="3" class="text-center">
                            {{ trans('total refund') }}
                          </b-td>
                          <b-td colspan="4" class="text-center">
                            <b
                              >{{
                                parseFloat(refund.total_refunded)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }}
                              {{ getSetting('currency', settings) }}</b
                            >
                          </b-td>
                        </b-tr>
                        <b-tr v-if="has_refund">
                          <b-td colspan="3" class="text-center">
                            {{ trans('total after refund') }}
                          </b-td>
                          <b-td colspan="4" class="text-center">
                            <b
                              >{{
                                parseFloat(
                                  invoice.total - refund.total_refunded
                                )
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }}
                              {{ getSetting('currency', settings) }}</b
                            >
                          </b-td>
                        </b-tr>
                      </b-tbody>
                    </b-table-simple>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="col-sm-12">
              <b-row class="justify-content-center">
                <b-col cols="12" md="6" class="text-center">
                  <b-button
                    class="btn m-2"
                    @click="openPurchaseReceipt"
                    variant="primary"
                  >
                    {{ trans('receipt') }}
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <skeleton-loader />
      </div>
      <PurchaseReceipt
        :user="user"
        :strings="strings"
        :sale="invoice"
        :settings="settings"
      ></PurchaseReceipt>
      <refund-purchase
        :settings="settings"
        :user="user"
        :invoice_id="refundId"
      ></refund-purchase>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import spliceText from '@/support/mixins/spliceText.js'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import JsonExcel from 'vue-json-excel'
import PurchaseReceipt from '@/components/sections/modals/PurchaseReceipt.vue'
import RefundPurchase from '@/components/sections/modals/RefundPurchase.vue'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'

Vue.component('downloadExcel', JsonExcel)

Vue.use(VuejsDialog)
export default {
  name: 'AppPurchasesEdit',
  mixins: [spliceText],
  components: { PurchaseReceipt, RefundPurchase, SkeletonLoader },
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'permissions'],
  data() {
    return {
      columns: [
        'id',
        'barcode',
        'item',
        'unit',
        'quantity',
        'price',
        'discount percentage',
        'discount amount',
        'taxable amount',
        'added tax',
        'tax amount',
        'total',
      ],
      purchases: [],

      sales: [],
      strings: [],
      inventories: [],
      products: [],
      refundId: '',
      filter: {
        per_page: 30,
      },
      invoice: {
        items: [],
        paid: 0,
        qr: '',
      },
      addedTax: '',
      providers: [],
      vouchers: [],
      loaded: false,
      usingFilters: 0,
      itemsLoaded: false,
      refund: {},
      has_refund: 0,
      export_fields: {
        'invoice id': 'id',
        'customer name': 'c_name',
        'customer phone': 'c_phone',
        at: 'created_at',
        inventory: 'inventory_title',
        user: 'user_name',
        total: 'total',
      },
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  computed: {
    Total() {
      let total = 0
      if (this.invoice.items.length) {
        for (let x = 0; x < this.invoice.items.length; x++) {
          if (this.invoice.items[x].item_id) {
            // this.invoice.items[x].subtotal = this.invoice.items[x].quantity * parseFloat(this.invoice.items[x].cost);
            total =
              parseFloat(total) + parseFloat(this.invoice.items[x].subtotal)
          }
        }
      }
      return parseFloat(total)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    refundTotal() {
      if (this.has_refund) {
        let total = 0
        for (let i = 0; i < this.refund.items.length; i++) {
          let subtotal = parseFloat(this.refund.items[i].subtotal)
          total = parseFloat(total) + subtotal
          // total = parseFloat(total).toFixed(2);
        }
        return parseFloat(total)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
      return 0
    },
  },
  methods: {
    refresh() {
      let url = '/api/purchases/' + this.$route.params.id

      axios
        .get(url)
        .then(res => {
          this.strings = res.data.strings
          this.refund = res.data.refund
          this.has_refund = res.data.has_refund
          this.invoice = res.data.body.invoice
          this.addedTax = res.data.body.invoice.tax_amount
          // this.vouchers = res.data.vouchers;
          this.inventories = res.data.inventories
          this.providers = res.data.providers
          this.products = res.data.products
          this.loaded = true
          this.itemsLoaded = true

          console.log(this.settings)
        })
        .catch(error => {
          if (error.request) {
            this.loaded = false
          }
        })
    },
    openPurchaseReceipt() {
      let data = {
        invoice: this.invoice,
        user: this.user,
        settings: this.settings,
        strings: this.strings,
        has_refund: this.has_refund,
        refund: this.refund,
        refundTotal: this.refundTotal,
        qr: this.invoice.qr,
        purchaseInvoiceType: this.trans('purchase invoice'),
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-purchase-receipt-modal', data)
    },
    openRefundModal(id) {
      this.refundId = id
      let data = {
        strings: this.strings,
        language: this.user.language,
        paymentMethods: this.paymentMethods,
        settings: this.settings,
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-refund-modal', data)
    },
  },
}
</script>
<style scoped>
.form-control {
  display: block;
}

.table-responsive {
  overflow-y: auto;
  max-height: unset;
}

.bg-danger td {
  background: #dc3545 !important;
}

.btn {
  border-radius: 8px !important;
}
.font_icon {
  width: 16px;
  height: 21px;
  /* UI Properties */
  text-align: right;
  font: normal normal normal 21px/16px Font Awesome 6 Free;
  letter-spacing: 0px;
  color: #ffffff;
  content: '';
}
.table.table-bordered td {
  padding: 12px 5px !important;
  font-size: 17px;
  font-weight: 400;
}
.table tr {
  border-bottom: 1px solid #dee2e6 !important;
}
</style>
