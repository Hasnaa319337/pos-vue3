<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card pt-3" v-if="permissions.includes('view_sale')">
      <div
        class="card-header header-sm d-flex justify-content-between align-items-center"
        style="margin: 20px 0; padding: 10px 25px !important"
      >
        <h4 class="card-title">
          <div class="row m-0 align-items-center">
            <div class="col p-0">
              <img
                style="width: 20px"
                src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/null/external-left-arrow-arrows-inkubators-detailed-outline-inkubators-3.png"
              />

              {{ trans('invoice number') }} #{{ sale.id }}
            </div>
            <b-badge
              class="mx-2"
              variant="success"
              style="padding: 9px !important"
              >{{ trans(sale.payment_type) }}</b-badge
            >
          </div>
        </h4>
      </div>
      <div
        class="card-header header-sm d-flex justify-content-between align-items-center"
        style="
          padding: 10px 25px !important;
          border: 1px solid #cfcfcf;
          border-bottom: 1px solid #cfcfcf !important;
          background: none;
          margin-bottom: 20px;
        "
      >
        <p>
          <b>{{ trans('invoice date') }}</b> {{ sale.updated_at }}
        </p>
        <div class="dropdown">
          <button @click="$router.go(-1)" class="btn btn-warning">
            <font-awesome-icon icon="fa-solid fa-reply-all" />
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="row mx-0 align-items-center justify-content-between mb-4">
          <div class="col-sm-12 mb-4 mt-4">
            <b-row class="mb-3 mx-0">
              <b-col cols="12" md="4">
                <div
                  style="
                    background: #f7f7f7;
                    padding: 20px 10px;
                    color: #161616;
                    font-size: 18px;
                    text-align: start;
                  "
                >
                  <img
                    class="icon_div"
                    src="https://img.icons8.com/external-solidglyph-m-oki-orlando/32/FFFFFF/external-inventory-accounting-solid-solidglyph-m-oki-orlando.png"
                  />

                  <b>{{ trans('inventory') }} : </b>
                  <span>{{ sale.inventory.title }}</span>
                </div>
              </b-col>
              <b-col cols="12" md="4">
                <div
                  style="
                    background: #f7f7f7;
                    padding: 20px 10px;
                    color: #161616;
                    font-size: 18px;
                    text-align: start;
                  "
                >
                  <img
                    class="icon_div"
                    src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/FFFFFF/external-user-advertisement-tanah-basah-basic-outline-tanah-basah.png"
                  />
                  <b>{{ trans('cashier') }} : </b>
                  <span v-text="_.get(sale, 'user.name')"></span>
                </div>
              </b-col>
              <b-col cols="12" md="4">
                <div
                  style="
                    background: #f7f7f7;
                    padding: 20px 10px;
                    color: #161616;
                    font-size: 18px;
                    text-align: start;
                  "
                >
                  <img
                    class="icon_div"
                    src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/FFFFFF/external-money-business-kiranshastry-lineal-kiranshastry.png"
                  />
                  <b>{{ trans('payment method') }} : </b>
                  <span v-if="sale.payment_type === 'installment'">{{
                    trans('installment')
                  }}</span>
                  <span v-else>{{ trans(sale.payment_method) }}</span>
                </div>
              </b-col>
            </b-row>
            <b-row class="mx-0" v-if="sale.customer">
              <b-col cols="12" md="4">
                <div
                  style="
                    background: #f7f7f7;
                    padding: 20px 10px;
                    color: #161616;
                    font-size: 18px;
                    text-align: start;
                  "
                >
                  <img
                    class="icon_div"
                    src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/FFFFFF/external-user-advertisement-tanah-basah-basic-outline-tanah-basah.png"
                  />
                  <b>{{ trans('customer name') }} : </b>
                  <span v-text="_.get(sale, 'customer.name')"></span>
                </div>
              </b-col>
              <b-col cols="12" md="4">
                <div
                  style="
                    background: #f7f7f7;
                    padding: 20px 10px;
                    color: #161616;
                    font-size: 18px;
                    text-align: start;
                  "
                >
                  <img
                    class="icon_div"
                    src="https://img.icons8.com/sf-black/64/FFFFFF/phone.png"
                  />

                  <b>{{ trans('customer phone') }} : </b>
                  <span v-text="_.get(sale, 'customer.phone')"></span>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="col-sm-6 mb-4 map" v-if="latitude && longitude">
            <GoogleMap :lng="longitude" :lat="latitude" :user="user" />
          </div>
          <div class="col-sm-12 mb-4">
            <b-row class="mx-0">
              <div class="col-sm-12 text-center" v-if="message.length">
                <div
                  class="alert"
                  :class="'alert-' + alertType"
                  v-html="this.message"
                ></div>
              </div>
            </b-row>
            <b-row class="mx-0">
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
                    <b-th>{{ trans('id') }}</b-th>
                    <b-th>{{ trans('barcode') }}</b-th>
                    <b-th>{{ trans('item') }}</b-th>
                    <b-th>{{ trans('unit') }}</b-th>

                    <b-th style="">{{ trans('quantity') }}</b-th>
                    <b-th>{{ trans('price') }}</b-th>
                    <b-th>{{ trans('discount percentage') }}</b-th>
                    <b-th>{{ trans('discount fixed') }}</b-th>
                    <b-th>{{ trans('taxable amount') }}</b-th>
                    <b-th>{{ trans('added tax') }}</b-th>

                    <b-th>{{ trans('tax amount') }}</b-th>
                    <b-th>{{ trans('total') }}</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-for="(item, index) in sale.items" :key="item.id">
                  <b-tr>
                    <b-td>
                      {{ index + 1 }}
                    </b-td>
                    <b-td>
                      {{ item.serial }}
                    </b-td>
                    <b-td>
                      {{ item.title }}
                    </b-td>
                    <b-td>
                      {{ item.unit_key }}
                    </b-td>
                    <b-td>
                      {{ item.quantity }}
                    </b-td>
                    <b-td>
                      {{
                        item.price
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-td>
                    <b-td> {{ item.discount_percentage }} % </b-td>
                    <b-td>
                      {{ item.discount_amount }}
                    </b-td>
                    <b-td>
                      {{
                        ((item.price - item.discount_amount) * item.quantity)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-td>
                    <b-td> {{ item.tax_percentage }} % </b-td>
                    <b-td>
                      {{
                        (
                          (item.tax_percentage / 100) *
                          ((item.price - item.discount_amount) * item.quantity)
                        )
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-td>
                    <b-td v-if="sale.payment_type == 'installment'">
                      {{
                        (
                          item.subtotal +
                          (item.tax_percentage / 100) *
                            ((item.price - item.discount_amount) *
                              item.quantity)
                        )
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-td>
                    <b-td v-else>
                      {{
                        item.subtotal
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tr
                  v-for="(disc, index) in sale.discounts"
                  :key="'disc' + index"
                >
                  <!-- <b-td colspan="2"></b-td>
                    <b-td>
                      <b>
                        {{  disc.title }}
                        <span v-if="disc.type == 'percentage'">{{
                          parseFloat(disc.value)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,') + '%'
                        }}</span>
                      </b>
                    </b-td>
                    <b-td>{{ sale.discount_amount }}</b-td> -->
                </b-tr>
                <b-tbody>
                  <b-tr>
                    <b-td colspan="3" class="text-center">{{
                      trans('total value before discount')
                    }}</b-td>
                    <b-td colspan="4" class="text-center">
                      <b style="margin: 0 5px">{{
                        sale.subtotal
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}</b
                      ><span>{{ getSetting('currency', settings) }}</span>
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td colspan="3" class="text-center">{{
                      trans('total discount')
                    }}</b-td>
                    <b-td colspan="4" class="text-center">
                      <b style="margin: 0 5px">{{
                        sale.discount_amount
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}</b
                      ><span>{{ getSetting('currency', settings) }}</span>
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td colspan="3" class="text-center">
                      {{ trans('total value after discount') }}</b-td
                    >
                    <b-td colspan="4" class="text-center">
                      <b style="margin: 0 5px">{{
                        (sale.subtotal - sale.discount_amount)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}</b
                      ><span>{{ getSetting('currency', settings) }}</span>
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <!-- v-for="item in invoice.data" :key="item"  ({{ item.tax}} %)  -->

                    <b-td colspan="3" class="text-center"
                      >{{ trans('adding_added_tax') }} ({{
                        sale.items[0].tax_percentage
                      }}
                      %)
                    </b-td>
                    <b-td colspan="4" class="text-center">
                      <b style="margin: 0 5px"
                        >{{
                          addedTax
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        }} </b
                      ><span>{{ getSetting('currency', settings) }}</span>
                    </b-td>
                  </b-tr>

                  <b-tr>
                    <b-td colspan="3" class="text-center">{{
                      trans('total')
                    }}</b-td>
                    <b-td colspan="4" class="text-center">
                      <b style="margin: 0 5px">{{
                        sale.total
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}</b
                      ><span>{{ getSetting('currency', settings) }}</span>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-thead v-if="has_refund">
                  <b-tr class="rounded" variant="dark">
                    <b-th>{{ trans('id') }}</b-th>
                    <b-th>{{ trans('barcode') }}</b-th>
                    <b-th>{{ trans('item') }}</b-th>

                    <b-th>{{ trans('quantity') }}</b-th>
                    <b-th>{{ user.language == 'en' ? 'Price' : 'السعر' }}</b-th>
                    <b-th>{{
                      user.language == 'en' ? 'Added tax ' : 'ض القيمة المضافة'
                    }}</b-th>
                    <b-th>{{
                      user.language == 'en' ? 'Value total' : 'اجمالي القيمة'
                    }}</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-if="has_refund">
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
                      {{ user.language == 'en' ? item.title : item.title_ar }}
                    </b-td>
                    <b-td>
                      <b>{{ item.quantity }}</b>
                    </b-td>
                    <b-td>{{ item.price }}</b-td>
                    <b-td> {{ item.tax_percentage }} % </b-td>
                    <b-td>
                      <b
                        >{{
                          parseFloat(
                            parseFloat(parseFloat(item.price)) *
                              parseInt(item.quantity)
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
                      {{ trans('total value') }}
                    </b-td>
                    <b-td colspan="4" class="text-center">
                      <b
                        >{{
                          refund.subtotal_refunded
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        }}
                        {{ getSetting('currency', settings) }}</b
                      >
                    </b-td>
                  </b-tr>
                  <b-tr v-if="has_refund" class="bg-danger text-white">
                    <b-td colspan="3" class="text-center">
                      {{
                        user.language == 'en'
                          ? 'Added Tax'
                          : ' يضاف ضريبة القيمة المضافة'
                      }}
                    </b-td>
                    <b-td colspan="4" class="text-center">
                      <b
                        >{{
                          (
                            parseFloat(refund.total_refunded) +
                            parseFloat(refundTotalDiscounts) -
                            parseFloat(refund.subtotal_refunded)
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
                      {{
                        user.language == 'en'
                          ? 'Refund Total'
                          : 'اجمالي المرتجع'
                      }}
                    </b-td>
                    <b-td colspan="4" class="text-center">
                      <b
                        >{{
                          refund.total_refunded
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        }}
                        {{ getSetting('currency', settings) }}</b
                      >
                    </b-td>
                  </b-tr>
                </b-tbody>

                <template v-if="sale.discounts && sale.discounts.length > 0">
                  <b-tr
                    v-if="has_refund"
                    :key="disc.id"
                    v-for="disc in sale.discounts.filter(x => {
                      return x.type != 'fixed'
                    })"
                    class="text-white bg-danger"
                  >
                    <b-td colspan="2"></b-td>
                    <b-td>
                      <b>
                        {{ user.language == 'en' ? disc.title : disc.title_ar }}
                        <span v-if="disc.type == 'percentage'">{{
                          disc.value + '%'
                        }}</span>
                      </b>
                    </b-td>
                    <td>
                      {{
                        parseFloat((disc.value / 100) * refundSubtotal)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                    </td>
                  </b-tr>
                </template>

                <b-tr v-if="has_refund">
                  <b-td colspan="3" class="text-center">
                    <b>{{
                      user.language == 'en'
                        ? 'Invoice Total after Refund'
                        : ' اجمالي الفاتوره بعد المرتجع '
                    }}</b>
                  </b-td>
                  <b-td colspan="4" class="text-center">
                    <b
                      >{{
                        (
                          parseFloat(sale.total) -
                          parseFloat(refund.total_refunded)
                        )
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      }}
                      {{ getSetting('currency', settings) }}</b
                    >
                  </b-td>
                </b-tr>
              </b-table-simple>
            </b-row>
          </div>
          <div class="col-sm-12 mb-4" v-if="has_refund">
            <b-row class="mx-0">
              <b-col cols="12" md="4">
                <b>{{ trans('refunded on') }}:</b>
                <span>{{ refund.created_at }}</span>
              </b-col>
              <b-col cols="12" md="4">
                <b>{{ trans('refunded by') }}:</b>
                <span>{{ refund.user.name }}</span>
              </b-col>
              <b-col cols="12" md="4">
                <b>{{ trans('refund method') }}</b>
                <span>{{ trans(refund.method) }}</span>
              </b-col>
            </b-row>
          </div>
          <div class="col-sm-12 mb-4">
            <b-row class="justify-content-center mx-0">
              <b-col cols="12" md="6">
                <b-row class="mb-3 mx-0">
                  <b-col class="text-center">
                    <b-button
                      class="mr-2"
                      @click="openSaleReceipt"
                      variant="primary"
                    >
                      {{ trans('the invoice') }}
                    </b-button>
                    <b-button
                      class="m-2"
                      variant="success"
                      v-if="sale.arrears && !sale.paid"
                      :to="
                        '/receipt-voucher/add?type=arrears&reference_id=' +
                        sale.id +
                        '&amount=' +
                        sale.total
                      "
                    >
                      {{ trans('clear sale') }}
                    </b-button>
                    <!--                                        <b-button class="m-2" variant="danger"-->
                    <!--                                            @click="openRefundModal(sale.id)"-->
                    <!--                                            >{{ trans('refund') }}-->
                    <!--                                        </b-button>-->
                  </b-col>
                </b-row>
                <b-row class="mx-0">
                  <b-col>
                    <b-list-group>
                      <b-list-group-item v-for="vc in vouchers" :key="vc.id">
                        <b-button
                          variant="link"
                          :to="'/receipt-voucher/' + vc.id"
                        >
                          {{ trans('receipt voucher') }} #{{ vc.id }}
                        </b-button>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <div class="card-body text-center">
        <!-- <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
                 -->
        <div v-if="user.language == 'en'">
          <h3>Invoice Number not Correct</h3>
          <button @click="$router.go(-1)" class="btn btn-warning">
            Go Back
          </button>
        </div>
        <div v-else>
          <h3>رقم الفاتوره غير صحيح</h3>
          <button @click="$router.go(-1)" class="btn btn-warning">
            العوده للصفحه السابقه
          </button>
        </div>
      </div>
    </div>
    <Refund :invoice_id="refundId" :settings="settings" :user="user"></Refund>
    <cashierSaleReceipt></cashierSaleReceipt>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import cashierSaleReceipt from '@/components/sections/modals/cashierSaleReceipt.vue'
import Refund from '@/components/sections/modals/Refund.vue'
import GoogleMap from '@/components/global/GoogleMap.vue'

// import 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDieZ7uAY4DPdT3Z4fp4KtykHl6dWryYdw&callback=initMap';
Vue.use(VuejsDialog)
export default {
  name: 'AppSale',
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'permissions'],
  components: { cashierSaleReceipt, Refund, GoogleMap },
  data() {
    return {
      message: '',
      alertType: 'success',
      sale: {},
      strings: [],
      loaded: true,
      showReceipt: false,
      language: 'en',
      refund: {},
      has_refund: 0,
      addedTax: '',
      vouchers: [],
      qr: '',
      refundId: '',
      longitude: '',
      latitude: '',
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },

  computed: {
    refundTotalDiscounts() {
      if (this.has_refund) {
        let total = 0
        for (let i = 0; i < this.sale.discounts.length; i++) {
          total =
            parseFloat(total) +
            parseFloat(this.sale.discounts[i].value / 100) * this.refundSubtotal
          // total = parseFloat(total).toFixed(2);
        }
        return parseFloat(total)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
      return 0
    },
    refundSubtotal() {
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
    refundTotal() {
      if (this.has_refund) {
        let total = 0

        let discs = this.sale.discounts.filter(x => {
          return x.type != 'fixed'
        })

        for (let i = 0; i < discs.length; i++) {
          let q = (parseFloat(discs[i].value) / 100) * this.refundSubtotal
          total = parseFloat(total) + q
        }
        return parseFloat(total + parseFloat(this.refundSubtotal))
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
      return 0
    },
  },
  methods: {
    refresh() {
      let url = '/api/cashier/sales/' + this.$route.params.id
      // this.loaded = false;
      axios
        .get(url)
        .then(res => {
          if (res.data.status) {
            this.sale = res.data.body.sale

            if (!this.sale.customer) {
              this.sale.customer = {}
            }
            this.latitude =
              parseFloat(this.sale.customer.longitude) ||
              parseFloat(this.sale.longitude)
            this.longitude =
              parseFloat(this.sale.customer.latitude) ||
              parseFloat(this.sale.latitude)
            this.addedTax = res.data.body.sale.tax_amount
            this.strings = res.data.strings
            this.language = res.data.language
            this.refund = this.sale.refund
            this.has_refund = res.data.body.has_refund
            this.vouchers = res.data.body.vouchers
            this.loaded = true
            this.qr = res.data.qr
            if (this.sale.longitude) {
              this.initMap(this.sale.longitude, this.sale.latitude)
            }
          }
        })
        .catch(error => {
          if (error.request) {
            this.loaded = false
          }
        })
    },
    openSaleReceipt() {
      let data = {
        sale: this.sale,
        settings: this.settings,
        user: this.user,
        strings: this.strings,
        has_refund: this.has_refund,
        refund: this.refund,
        refundSubtotal: this.refundSubtotal,
        refundTotal: this.refundTotal,
        qr: this.qr,
      }
      console.log(data)
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-sale-receipt-modal', data)
    },
    print_page() {
      window.print()
    },
    closeReceiptAndResetLanguage() {
      this.user.language = this.language
      this.showReceipt = false
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
table tr.text-white,
.text-white,
.text-white td,
table .text-white td {
  color: white !important;
}
.table-container {
  max-height: unset !important;
}
.bg-danger td {
  background: #dc3545 !important;
}
.btn {
  border-radius: 8px !important;
}
.side-border > div:not(:last-of-type)::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: rgba(222, 226, 230, 0.5);
  border-radius: 5px;
}
</style>
<style>
.map .locate-map {
  display: none;
}
.vue-map-container {
  height: 150px !important;
  border-radius: 15px;
  overflow: hidden;
}
</style>
