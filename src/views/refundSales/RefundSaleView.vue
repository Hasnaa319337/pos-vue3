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
            style="padding: 15px 0; font-size: 20px !important"
          >
            <img
              style="width: 15px"
              src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/null/external-left-arrow-arrows-inkubators-detailed-outline-inkubators-3.png"
            />

            {{ trans('sale refund invoice number') }}
            {{ '#' + invoice.id }}
            <span style="font-size: 14px">
              ( {{ trans('The invoice is linked to sale invoice number') }}
              <router-link
                v-if="permissions.includes('view_sales')"
                :to="'/sales/view/' + invoice.sale_id"
              >
                # {{ invoice.sale_id }}
              </router-link>
              )
            </span>
          </h4>
        </div>
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <p>
            <b>{{ trans('created_at') }}</b> {{ invoice.created_at }}
          </p>

          <div class="dropdown">
            <GoBackButton />
          </div>
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
                    <b>{{ trans('customer') }} : </b>
                    <span
                      >{{ _.get(invoice, 'sale.customer.tax_num') }}
                      {{ _.get(invoice, 'sale.customer.name') }}</span
                    >
                  </div>
                </b-col>

                <b-col cols="12" md="4">
                  <div class="item_style">
                    <img
                      class="icon_div"
                      src="https://img.icons8.com/ios/50/FFFFFF/google-sheets.png"
                    />
                    <b>{{ trans('payment type') }} : </b>
                    <span>{{ trans(invoice.payment_method) }}</span>
                  </div>
                </b-col>

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
              </b-row>
              <b-row class="side-border mx-0">
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
                      <b-thead>
                        <b-tr class="rounded" variant="dark">
                          <b-th style="max-width: 75px">{{ trans('id') }}</b-th>
                          <b-th>{{ trans('barcode') }}</b-th>
                          <b-th>{{ trans('item') }}</b-th>
                          <b-th>
                            {{ trans('quantity') }}
                          </b-th>
                          <b-th>
                            {{ trans('unit') }}
                          </b-th>
                          <b-th>{{ trans('price') }}</b-th>

                          <b-th>{{ trans('Discount value') }}</b-th>
                          <b-th> {{ trans('taxable amount') }} </b-th>
                          <b-th>{{ trans('added_tax') }} </b-th>
                          <b-th>{{ trans('added_tax_value') }} </b-th>
                          <b-th>{{ trans('total') }}</b-th>
                        </b-tr>
                      </b-thead>
                      <b-tbody
                        v-for="(item, index) in invoice.items"
                        :key="item.id"
                      >
                        <b-tr>
                          <b-td>
                            {{ index + 1 }}
                          </b-td>
                          <b-td>
                            {{ invoice.items[index].serial }}
                          </b-td>
                          <b-td>
                            {{ invoice.items[index].title }}
                          </b-td>
                          <b-td
                            style="
                              min-width: 65px !important;
                              max-width: 65px !important;
                              width: 65px;
                            "
                          >
                            {{ invoice.items[index].quantity }}
                          </b-td>
                          <b-td>{{ invoice.items[index].unit_key }}</b-td>
                          <b-td>
                            {{
                              invoice.items[index].price
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            }}
                          </b-td>

                          <b-td>
                            {{
                              invoice.items[index].discount_amount
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            }}
                          </b-td>
                          <b-td>{{ invoice.items[index].subtotal }}</b-td>
                          <b-td>
                            {{ invoice.items[index].tax_percentage }} %
                          </b-td>
                          <b-td>{{
                            (
                              invoice.items[index].total -
                              invoice.items[index].subtotal
                            )
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                          }}</b-td>
                          <b-td>
                            {{
                              invoice.items[index].total
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            }}
                          </b-td>
                        </b-tr>
                      </b-tbody>
                      <b-tbody>
                        <b-tr>
                          <b-td colspan="3" style="font-weight: 800">
                            <label>
                              {{ trans('invoice_date') }}
                            </label>
                            <div>
                              {{ invoice.created_at }}
                            </div>
                          </b-td>
                          <b-td colspan="9" style="font-weight: 800">
                            <label>
                              {{ trans('invoice_number') }}
                            </label>
                            <div>
                              {{ invoice.id }}
                            </div>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td
                            colspan="3"
                            class="text-center"
                            style="font-weight: 800"
                            >{{ trans('total value before discount') }}</b-td
                          >
                          <b-td
                            colspan="9"
                            class="text-center"
                            style="font-weight: 800"
                          >
                            <b>{{ invoice.subtotal }} </b
                            ><span>{{ getSetting('currency', settings) }}</span>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td
                            colspan="3"
                            class="text-center"
                            style="font-weight: 800"
                          >
                            {{ trans('Discount value') }}
                          </b-td>
                          <b-td
                            colspan="9"
                            class="text-center"
                            style="font-weight: 800"
                          >
                            <b
                              >{{
                                invoice.discount_amount
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }} </b
                            ><span>{{ getSetting('currency', settings) }}</span>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td
                            colspan="3"
                            class="text-center"
                            style="font-weight: 800"
                          >
                            {{ trans('total value after discount') }}
                          </b-td>
                          <b-td
                            colspan="9"
                            class="text-center"
                            style="font-weight: 800"
                          >
                            <b
                              >{{
                                (invoice.subtotal - invoice.discount_amount)
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }} </b
                            ><span>{{ getSetting('currency', settings) }}</span>
                          </b-td>
                        </b-tr>
                        <b-tr v-for="item in invoice.items" :key="item.id">
                          <b-td
                            colspan="3"
                            class="text-center"
                            style="font-weight: 800"
                            >{{ trans('added tax') }} ({{ item.tax_percentage }}
                            %)
                          </b-td>
                          <b-td
                            colspan="9"
                            class="text-center"
                            style="font-weight: 800"
                          >
                            <b>
                              <!-- {{ invoice.tax_amount }}  -->
                              {{ item.product_tax }} </b
                            ><span>{{ getSetting('currency', settings) }}</span>
                          </b-td>
                        </b-tr>

                        <b-tr>
                          <b-td
                            colspan="3"
                            class="text-center"
                            style="font-weight: 800"
                            >{{ trans('invoice total') }}
                          </b-td>
                          <b-td
                            colspan="9"
                            class="text-center"
                            style="font-weight: 800"
                          >
                            <b
                              >{{
                                invoice.total
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              }} </b
                            ><span>
                              {{ getSetting('currency', settings) }}</span
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
      <sale-receipt-from-add
        :user="user"
        :sale="invoice"
        :settings="settings"
      ></sale-receipt-from-add>
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

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import JsonExcel from 'vue-json-excel'
import SaleReceiptFromAdd from '@/components/sections/modals/SaleReceiptFromAddSale.vue'
import RefundPurchase from '@/components/sections/modals/RefundPurchase.vue'
import SkeletonLoader from '../../components/global/SkeletonLoader.vue'

Vue.component('downloadExcel', JsonExcel)

Vue.use(VuejsDialog)
export default {
  name: 'RefundSaleView',
  components: { SaleReceiptFromAdd, RefundPurchase, SkeletonLoader },
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'permissions'],
  data() {
    return {
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
  methods: {
    refresh() {
      let url = '/api/sale-refunds/' + this.$route.params.id

      axios
        .get(url)
        .then(res => {
          this.loaded = true
          this.itemsLoaded = true
          this.refund = res.data.body.refund_sales
          this.invoice = res.data.body.refund_sales
          this.addedTax = (
            res.data.body.invoice.total - res.data.body.invoice.cost
          ).toFixed(2)
          // this.vouchers = res.data.vouchers;
          this.inventories = res.data.inventories
          this.providers = res.data.providers
          this.products = res.data.products
        })
        .catch(error => {
          if (error.request) {
            this.loaded = false
          }
        })
    },
    openPurchaseReceipt() {
      let data = {
        sale: this.invoice,
        sale_totals: this.invoice,
        cashierInvoice: true,
        user: this.user,
        settings: this.settings,
        strings: this.strings,
        has_refund: this.has_refund,
        refund: this.refund,
        qr: this.invoice.qr,
        saleInvoiceType: this.trans('sale refund invoice'),
      }
      SharedEvent.fire('open-sale-receipt-from-add-modal', data)
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
</style>
