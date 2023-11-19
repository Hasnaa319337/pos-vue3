<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card pt-3" v-if="loaded">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title">{{ trans('add_purchases_invoice') }}</h4>
          <div class="dropdown">
            <b-button @click="$router.go(-1)" class="btn btn-warning">
              <font-awesome-icon icon="fa-solid fa-reply-all" />
            </b-button>
          </div>
        </div>
        <div class="card-body">
          <div class="row mx-0 align-items-center justify-content-between mb-4">
            <div class="col-sm-12 text-center" v-if="message.length">
              <div :class="['alert', 'alert-' + alertType]" v-html="message"></div>
            </div>
            <!-- <div class="clear clearfix"></div> -->
            <div class="col-sm-12">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(store)">
                  <b-form-row>
                    <b-col cols="12" md="4">
                      <ValidationProvider
                        name="provider"
                        rules="required|integer"
                        v-slot="{ valid, errors }"
                      >
                        <b-form-group
                          :label="trans('select_provider')"
                          :invalid-feedback="errors[0]"
                        >
                          <b-form-select
                            v-model="invoice.provider_id"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option
                              v-for="prov in providers"
                              :value="prov.id"
                              :key="prov.id"
                            >
                              {{ prov.name }} ({{ prov.phone }})
                            </b-form-select-option>
                          </b-form-select>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>

                    <b-col cols="12" md="4">
                      <ValidationProvider
                        name="inventory"
                        rules="required|integer"
                        v-slot="{ valid, errors }"
                      >
                        <b-form-group :label="trans('inventory')" :invalid-feedback="errors[0]">
                          <b-form-select
                            v-model="invoice.inventory_id"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option
                              v-for="inv in inventories"
                              :value="inv.id"
                              :key="inv.id"
                            >
                              {{ trans(inv.title) }}
                            </b-form-select-option>
                          </b-form-select>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col cols="12" md="4">
                      <b-form-group :label="trans('add_discount')">
                        <b-form-select v-model="invoice.discount">
                          <b-form-select-option
                            v-for="disc in discounts"
                            :key="disc.id"
                            @click="addDiscount(disc.id)"
                          >
                            {{ trans(disc.title) }}
                            <strong
                              v-if="disc.type == 'fixed'"
                              v-text="disc.value + trans(settings.currency_en)"
                            >
                            </strong>
                            <strong v-else v-text="disc.value + '%'"></strong>
                          </b-form-select-option>
                        </b-form-select>
                      </b-form-group>
                      <!-- <legend
                        tabindex="1"
                        class="bv-no-focus-ring col-form-label pt-0"
                        id="__BVID__59__BV_label_"
                      >
                        {{
                          trans("add_discount")
                        }} -->
                      <!-- </legend> -->
                      <!-- <b-dropdown
                        id="dropdown-1"
                        class="custom-select"
                        :text="
                          user.language == 'en' ? 'Add Discount' : 'اضافة خصم'
                        "
                        size="sm"
                      > -->
                      <!-- <b-dropdown-item
                          v-for="(disc, index) in discounts"
                          :key="index"
                          @click="addDiscount(disc.id)"
                        >
                          <span v-text="trans(disc.title)"></span>
                          <em
                            v-if="disc.type == 'fixed'"
                            v-text="disc.value + trans(settings.currency_en)"
                          ></em>
                          <em v-else v-text="disc.value + '%'"></em>
                        </b-dropdown-item>
                      </b-dropdown> -->
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col cols="12" md="4">
                      <b-form-group label="نوع الفاتوره">
                        <b-form-select v-model="invoice.invoice_type">
                          <b-form-select-option value="full">دفع </b-form-select-option>
                          <b-form-select-option value="installment">اجل </b-form-select-option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="8" class="" v-if="invoice.invoice_type == 'installment'">
                      <div class="all d-flex">
                        <b-form-group class="w-50" :label="trans('paid_amount')">
                          <b-form-input
                            @change="
                              invoice.remaining_amount = parseFloat(total) - invoice.paid_amount
                            "
                            :min="0"
                            :max="total"
                            step="0.01"
                            :placeholder="user.language == 'en' ? 'Paid amount' : 'المبلغ المدفوع'"
                            type="number"
                            v-model="invoice.paid_amount"
                          >
                          </b-form-input>
                        </b-form-group>

                        <b-form-group class="w-50" :label="trans('remain_amount')">
                          <b-form-input
                            readonly
                            disabled
                            :min="0"
                            type="number"
                            :max="total"
                            :placeholder="trans('remain_amount')"
                            v-model="invoice.remaining_amount"
                          >
                          </b-form-input>
                        </b-form-group>
                      </div>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col>
                      <h2 class="col-sm-12">
                        <b-button @click="addItem" class="float-end" variant="primary">
                          <i class="bi bi-plus-lg"></i>
                        </b-button>
                      </h2>
                      <div class="col-sm-12 p-0" style="overflow: scroll; min-height: 370px">
                        <b-table-simple striped bordered style="min-height: 50px">
                          <b-thead>
                            <b-tr class="rounded" variant="dark">
                              <b-th style="min-width: 20px !important; max-width: 35px !important">
                                {{ trans('id') }}
                              </b-th>
                              <b-th>{{ trans('barcode') }}</b-th>
                              <b-th>{{ trans('item') }}</b-th>
                              <b-th>{{ trans('quantity') }}</b-th>
                              <b-th>{{ trans('price') }}</b-th>
                              <b-th>{{ trans('tax_percentage') }}%</b-th>
                              <b-th>{{ trans('tax_fixed') }}</b-th>
                              <b-th>{{ trans('price_after_tax') }}</b-th>
                              <b-th>{{ trans('added_tax') }}%</b-th>
                              <b-th>{{ trans('price_after_tax') }}</b-th>
                              <b-th>{{ trans('value_total') }}</b-th>
                              <b-th></b-th>
                            </b-tr>
                          </b-thead>
                          <b-tbody v-for="(item, index) in invoice.items" :key="item.id">
                            <b-tr>
                              <b-td style="min-width: 20px !important; max-width: 20px !important">
                                {{ index + 1 }}
                              </b-td>
                              <td>
                                <!--                                                                <ValidationProvider rules="required|min_value:1"-->
                                <!--                                                                                    v-slot="{ valid, errors }"-->
                                <!--                                                                                    name='barcode'-->
                                <!--                                                                                    :vid="strings['barcode']+index">-->
                                <b-form-group>
                                  <b-form-input
                                    style="min-width: 100px"
                                    type="text"
                                    v-model="invoice.items[index].serial"
                                    @input="setProduct(index)"
                                  ></b-form-input>
                                  <!--                                                                        <b-form-invalid-feedback id="inputLiveFeedback">-->
                                  <!--                                                                            {{ errors[0] }}-->
                                  <!--                                                                        </b-form-invalid-feedback>-->
                                </b-form-group>
                                <!--                                                                </ValidationProvider>-->
                              </td>
                              <b-td>
                                <ValidationProvider
                                  name="product"
                                  rules="required"
                                  v-slot="{ errors }"
                                  :vid="trans('item') + index"
                                >
                                  <b-form-group>
                                    <v-select
                                      v-model="invoice.items[index].item"
                                      @input="setCost(index)"
                                      dir="rtl"
                                      :value="index"
                                      :placeholder="trans('search_a_product')"
                                      :label="user.language == 'en' ? 'title_en' : 'title_ar'"
                                      :options="products"
                                    ></v-select>
                                    <!-- <multiselect :dir="
                                                                            user.language ==
                                                                            'en'
                                                                                ? 'ltr'
                                                                                : 'rtl'
                                                                        " v-model="
                                                                            invoice
                                                                                .items[
                                                                                index
                                                                            ]
                                                                                .item
                                                                        " :options="
                                                                            products
                                                                        " :label="
                                                                            user.language ==
                                                                            'en'
                                                                                ? 'title'
                                                                                : 'title_ar'
                                                                        " track-by="title_ar" placeholder=""
                                                                            :showLabels="
                                                                                false
                                                                            " :allow-empty="
                                                                                false
                                                                            " @input="
                                                                                setCost(
                                                                                    index
                                                                                )
                                                                            " :state="
                                                                                errors[0]
                                                                                    ? false
                                                                                    : valid
                                                                                    ? true
                                                                                    : null
                                                                            " :class="{
                                                                                'is-invalid':
                                                                                    errors.length
                                                                            }" class="style-chooser"
                                                                            open-direction="bottom">
                                                                        </multiselect> -->
                                    <b-form-invalid-feedback id="inputLiveFeedback">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                                </ValidationProvider>
                                <span v-if="item.is_variant">{{ item.title }}</span>
                              </b-td>

                              <b-td>
                                <ValidationProvider
                                  rules="required|min_value:1"
                                  v-slot="{ valid, errors }"
                                  name="quantity"
                                  :vid="trans('quantity') + index"
                                >
                                  <b-form-group>
                                    <b-form-input
                                      style="min-width: 100px"
                                      type="number"
                                      v-model="invoice.items[index].quantity"
                                      :state="errors[0] ? false : valid ? true : null"
                                      @change="updateSubtotal(index)"
                                      @keypress="isNumber($event)"
                                    ></b-form-input>
                                    <b-form-invalid-feedback id="inputLiveFeedback">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                                </ValidationProvider>
                              </b-td>
                              <b-td>
                                <ValidationProvider
                                  rules="required|positive|decimal"
                                  v-slot="{ valid, errors }"
                                  :vid="trans('cost') + index"
                                  name="cost"
                                >
                                  <b-form-group>
                                    <b-form-input
                                      style="min-width: 100px"
                                      type="text"
                                      v-model="invoice.items[index].cost"
                                      :state="errors[0] ? false : valid ? true : null"
                                      @change="updateSubtotal(index)"
                                    >
                                    </b-form-input>
                                    <b-form-invalid-feedback id="inputLiveFeedback">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                                </ValidationProvider>
                              </b-td>
                              <b-td>
                                <ValidationProvider
                                  rules="positive|decimal"
                                  v-slot="{ valid, errors }"
                                  name="product_tax"
                                >
                                  <b-form-group>
                                    <b-form-input
                                      v-if="invoice.items[index].item"
                                      style="min-width: 100px"
                                      type="text"
                                      v-model="invoice.items[index].item.tax"
                                      :state="errors[0] ? false : valid ? true : null"
                                      @change="updateTax(index)"
                                    >
                                    </b-form-input>
                                    <b-form-invalid-feedback id="inputLiveFeedback">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                                </ValidationProvider>
                              </b-td>
                              <b-td>
                                <span
                                  v-if="
                                    invoice.items[index].cost &&
                                    invoice.items[index].item &&
                                    invoice.items[index].quantity
                                  "
                                >
                                  <b>{{ invoice.items[index].subtotal }}</b>
                                  <span>{{ trans(settings.currency_en) }}</span>
                                </span>
                              </b-td>
                              <b-td>
                                <b-button
                                  variant="danger"
                                  @click="removeItem(index)"
                                  :disabled="invoice.items.length == 1 ? true : false"
                                >
                                  <font-awesome-icon icon="fa-solid fa-minus " />
                                </b-button>
                              </b-td>
                            </b-tr>
                          </b-tbody>
                          <b-tbody>
                            <b-tr>
                              <b-td colspan="2" class="font-weight-bold">
                                {{ user.language == 'eng' ? 'Invoice Date' : 'تاريخ الفاتورة' }}
                              </b-td>
                              <b-td colspan="2">
                                <div>
                                  <b-input-group>
                                    <b-form-input
                                      required
                                      id="invoice_date"
                                      v-model="invoice.invoice_date"
                                      type="datetime"
                                    ></b-form-input>
                                    <b-input-group-append>
                                      <b-form-datepicker
                                        v-model="date_input"
                                        button-only
                                        right
                                        locale="en-US"
                                        @input="setDate"
                                      ></b-form-datepicker>
                                      <b-form-timepicker
                                        v-model="time_input"
                                        button-only
                                        right
                                        show-seconds
                                        locale="en-US"
                                        @input="setDate"
                                      ></b-form-timepicker>
                                    </b-input-group-append>
                                  </b-input-group>
                                </div>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td colspan="2" class="font-weight-bold">
                                {{ user.language == 'en' ? 'Invoice Number' : 'رقم الفاتوره' }}
                              </b-td>
                              <b-td colspan="2">
                                <ValidationProvider
                                  rules="required|min_value:1"
                                  v-slot="{ valid, errors }"
                                  name="invoice_number"
                                >
                                  <b-form-input
                                    type="number"
                                    min="1"
                                    @keypress="isNumber($event)"
                                    v-model="invoice.provider_inv_number"
                                    :state="errors[0] ? false : valid ? true : null"
                                  >
                                  </b-form-input>
                                  <b-form-invalid-feedback id="inputLiveFeedback">
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                </ValidationProvider>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td colspan="2" class="font-weight-bold text-danger">
                                {{ trans('discount_total') }}
                              </b-td>
                              <b-td colspan="2" class="font-weight-bold text-danger">
                                <!-- {{ totalDiscounts }} -->
                                <span>{{ trans(settings.currency_en) }}</span>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td colspan="2" class="font-weight-bold">
                                {{ user.language == 'en' ? 'Value total' : 'اجمالي القيمة' }}
                              </b-td>
                              <b-td colspan="2" class="font-weight-bold">
                                {{ cost }}
                                <span>{{ trans(settings.currency_en) }}</span>
                              </b-td>
                            </b-tr>
                            <b-tr
                              v-for="(disc, index) in extraDiscounts"
                              :key="index"
                              class="disc-row"
                            >
                              <b-td>
                                <button
                                  class="btn btn-danger btn-sm btn-rounded"
                                  @click="removeDiscount(disc.id)"
                                >
                                  <font-awesome-icon icon="fa-solid fa-xmark" />
                                </button>
                                <em v-text="trans(disc.title)"></em>
                              </b-td>
                              <td class="text-center" colspan="2">
                                <span
                                  class="d-block"
                                  v-text="user.language == 'en' ? 'discount amount' : 'قيمه الخصم'"
                                ></span>
                                <span v-if="disc.type == 'percentage'">{{ disc.value + '%' }}</span>
                              </td>
                              <b-td colspan="2">
                                <span
                                  class="d-block"
                                  v-text="user.language == 'en' ? 'discount total' : 'اجمالي الخصم'"
                                ></span>
                                <em v-if="disc.type == 'fixed'">{{ disc.value }}</em>
                                <em v-else>{{
                                  parseFloat(
                                    (parseFloat(disc.value) / 100) * parseFloat(cost)
                                  ).toFixed(2)
                                }}</em>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td colspan="2" class="font-weight-bold">
                                {{
                                  user.language == 'en' ? 'Added Tax' : ' يضاف ضريبة القيمة المضافة'
                                }}
                              </b-td>
                              <b-td colspan="2" class="font-weight-bold">
                                {{ totalTax }}
                                <span>{{ trans(settings.currency_en) }}</span>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td colspan="2"></b-td>
                              <b-td class="font-weight-bold"
                                >{{ user.language == 'en' ? 'Invoice total' : 'اجمالي الفاتورة' }}
                              </b-td>
                              <b-td class="font-weight-bold">
                                {{ total }}
                                <span>{{ trans(settings.currency_en) }}</span>
                              </b-td>
                            </b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </div>
                    </b-col>
                  </b-form-row>
                  <b-form-row class="justify-content-center">
                    <b-form-checkbox
                      v-model="invoice.paid"
                      name="scheduled"
                      :value="1"
                      :unchecked-value="0"
                    >
                      {{ trans('create_a_payment_voucher') }}
                    </b-form-checkbox>
                  </b-form-row>
                  <b-form-row class="justify-content-center">
                    <b-button variant="success" type="submit"
                      >{{ trans('submit') }}
                      <font-awesome-icon icon="fa-solid fa-check " />
                    </b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="card-body text-center">
          <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
        </div>
      </div>
      <PurchaseReceipt
        :user="user"
        :strings="strings"
        :sale="invoice"
        :settings="settings"
      ></PurchaseReceipt>
      <NewVariations :settings="settings" :user="user"></NewVariations>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import JsonExcel from 'vue-json-excel'
// import Receipt from './Receipt.vue';
import Receipt from '@/components/sections/modals/PurchaseReceipt'
import PurchaseReceipt from '@/components/sections/modals/PurchaseReceipt'
import NewVariations from '@/components/sections/modals/NewVariations'

import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

// register globally
Vue.component('multiselect', Multiselect)
Vue.component('downloadExcel', JsonExcel)

Vue.use(VuejsDialog)

export default {
  name: 'AppPurchasesAdd',
  components: { PurchaseReceipt, Receipt, NewVariations },
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'permissions'],
  data() {
    var today = new Date()
    var dd = today.getDate()

    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd
    return {
      isHidden: false,
      test: '',
      message: '',
      alertType: 'success',
      sales: [],
      strings: [],
      inventories: [],
      products: [],
      date_input: '',
      time_input: '',
      filter: {
        per_page: 30
      },

      invoice: {
        items: [],
        paid: 0,
        qr: '',
        tax: 0,
        provider_inv_number: '',
        invoice_date: today,
        invoice_type: '',
        paid_amount: '',
        remaining_amount: ''
      },
      providers: [],
      loaded: false,
      usingFilters: 0,
      itemsLoaded: false,
      export_fields: {
        'invoice id': 'id',
        'customer name': 'c_name',
        'customer phone': 'c_phone',
        at: 'created_at',
        inventory: 'inventory_title',
        user: 'user_name',
        total: 'total'
      },
      showReceipt: false,
      customEvents: [
        {
          eventName: 'close-purchase-receipt-modal',
          callback: this.closeReceipt
        },
        { eventName: 'update-order', callback: this.updateOrder }
      ],
      variant: '',
      discounts: [],
      extraDiscounts: [],
      discountsId: [],
      discount: 0
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  created() {
    ////////////////////////////////////////////////////
    //**          Custom Event Listener           ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      SharedEvent.listen(customEvent.eventName, customEvent.callback)
    })
  },
  destroyed() {
    ////////////////////////////////////////////////////
    //**      Remove Custom Event Listener        ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      SharedEvent.off(customEvent.eventName, customEvent.callback)
    })
  },
  computed: {
    total() {
      let total = 0
      let extraDiscs = 0
      if (this.extraDiscounts.length) {
        for (let i = 0; i < this.extraDiscounts.length; i++) {
          let q = parseFloat(this.extraDiscounts[i].value)

          if (this.extraDiscounts[i].type == 'percentage') {
            q = (parseFloat(this.extraDiscounts[i].value) / 100) * this.cost
          }
          this.extraDiscounts[i].subtotal = q
          extraDiscs = parseFloat(extraDiscs) + q
        }
      }
      if (this.invoice.items.length) {
        for (let x = 0; x < this.invoice.items.length; x++) {
          if (this.invoice.items[x].item_id) {
            // this.invoice.items[x].subtotal = this.invoice.items[x].quantity * parseFloat(this.invoice.items[x].cost);
            total =
              parseFloat(total) +
              parseFloat(this.invoice.items[x].subtotal) +
              parseFloat(this.invoice.items[x].product_tax)
          }
        }
      }
      console.log(extraDiscs)
      this.invoice.discount_amount = parseFloat(extraDiscs).toFixed(2)
      total = total + (total * parseInt(this.invoice.tax)) / 100 - extraDiscs
      return parseFloat(total || 0).toFixed(2)
    },
    totalTax() {
      let totalTax = 0
      if (this.invoice.items.length) {
        for (let x = 0; x < this.invoice.items.length; x++) {
          if (this.invoice.items[x].item_id) {
            // this.invoice.items[x].subtotal = this.invoice.items[x].quantity * parseFloat(this.invoice.items[x].cost);
            totalTax = parseFloat(totalTax) + parseFloat(this.invoice.items[x].product_tax)
          }
        }
      }
      return parseFloat(totalTax || 0).toFixed(2)
    },
    cost() {
      let total = 0
      if (this.invoice.items.length) {
        for (let x = 0; x < this.invoice.items.length; x++) {
          if (this.invoice.items[x].item_id) {
            // this.invoice.items[x].subtotal = this.invoice.items[x].quantity * parseFloat(this.invoice.items[x].cost);
            total = parseFloat(total) + parseFloat(this.invoice.items[x].subtotal)
          }
        }
      }
      return parseFloat(total || 0).toFixed(2)
    }
  },
  methods: {
    setDate() {
      this.invoice.invoice_date = this.date_input + ' ' + this.time_input
    },
    refresh() {
      let url = '/api/purchases/create'
      axios
        .get(url)
        .then((res) => {
          this.discounts = res.data.discounts
          // this.strings = res.data.strings;
          this.inventories = res.data.inventories
          this.providers = res.data.providers
          this.products = res.data.products.data
          // this.addItem();
          // this.invoice.inventory_id = this.user.inventory;
          this.loaded = true
          this.itemsLoaded = true
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
    openVariationsModal(item, index) {
      let data = {
        product: item,
        index: index,
        strings: this.strings,
        language: this.user.language,
        // "settings": this.settings,
        permissions: this.permissions,
        lockOrder: this.lockOrder
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-new-variation-modal', data)
    },
    updateOrder(variant) {
      let duplicated = 1
      for (let i in this.invoice.items) {
        // console.log(prod.id);
        // console.log(this.invoice.items[i].item_id);
        if (this.invoice.items[i].variation_id === variant.id) {
          duplicated += 1
        }
      }
      if (duplicated >= 2) {
        // this.invoice.items.splice(0,index);
        this.message = 'لا يمكن اختيار نفس المنتج مرتين'
        ;(this.alertType = 'danger'), this.removeItem(variant.index)
        setTimeout(() => {
          this.message = ''
          this.alertType = 'success'
        }, 120000)
      } else {
        this.variant = variant
        this.invoice.items[this.invoice.items.length - 1].variation_id = this.variant.id
        this.invoice.items[this.invoice.items.length - 1].price = this.variant.price
        this.invoice.items[this.invoice.items.length - 1].serial = this.variant.serial
        this.invoice.items[this.invoice.items.length - 1].serial = this.variant.serial
        this.invoice.items[this.invoice.items.length - 1].stock = this.variant.quantity
        this.invoice.items[this.invoice.items.length - 1].title = this.variant.title_trans
        this.invoice.items[this.invoice.items.length - 1].is_variant = true
        this.invoice.items[this.invoice.items.length - 1].has_attributes = 'true'
        this.addItem2()
      }
    },
    setCost(index) {
      this.invoice.items[index].has_attributes = 'false'
      let item = this.invoice.items[index].item
      this.invoice.items[index].title = this.invoice.items[index].item.title
      if (!item) return
      if (item.variation) {
        this.openVariationsModal(item, index)
      }
      if (!this.invoice.items[index].tax_percentage) {
        this.invoice.items[index].tax_percentage = 0
      }

      if (Object.keys(item).includes('product_id')) {
        this.invoice.items[index].item_id = item.product_id
        this.invoice.items[index].has_attributes = 'true'
        this.invoice.items[index].variation_id = this.invoice.items[index].item.id
      } else {
        this.invoice.items[index].item_id = item.id
      }

      let prod = this.products.filter((x) => {
        return x.serial == item.serial
      })[0]
      let duplicated = 1
      if (!prod.variation) {
        for (let i in this.invoice.items) {
          // console.log(prod.id);
          // console.log(this.invoice.items[i].item_id);
          if (this.invoice.items[i].item_id === prod.id) {
            duplicated += 1
          }
        }
      }
      if (duplicated >= 3) {
        // this.invoice.items.splice(0,index);
        this.message = 'لا يمكن اختيار نفس المنتج مرتين'
        ;(this.alertType = 'danger'), this.removeItem(index)
        setTimeout(() => {
          this.message = ''
          this.alertType = 'success'
        }, 120000)
      } else {
        this.invoice.items[index].cost = prod.cost
        this.invoice.items[index].serial = item.serial
        this.invoice.items[index].product_tax = this.invoice.items[index].item.tax

        this.updateSubtotal(index, true)
      }
    },
    addItem() {
      let item = {
        quantity: 1,
        item_id: null,
        has_attributes: 'false',
        item: {
          tax: ''
        }
      }
      this.invoice.items.push(item)
    },
    addItem2() {
      let item = {
        quantity: 1,
        item_id: null,
        has_attributes: 'false',
        item: {
          tax: ''
        }
      }
      this.invoice.items.push(item)
      this.invoice.items.pop()
    },
    updateTax(index) {
      if (this.invoice.items[index].item_id) {
        if (this.invoice.items[index].item.tax) {
          this.invoice.items[index].product_tax =
            (parseFloat(this.invoice.items[index].item.tax) / 100) *
            parseFloat(this.invoice.items[index].cost)
          console.log(
            (parseFloat(this.invoice.items[index].item.tax) / 100) *
              parseFloat(this.invoice.items[index].cost)
          )
          this.updateSubtotal(index)
        }
      }
    },
    updateSubtotal(index, calc = false) {
      if (this.invoice.items[index].item_id) {
        if (this.invoice.items[index].product_tax) {
          this.invoice.items[index].subtotal = parseFloat(
            parseFloat(parseFloat(this.invoice.items[index].cost)) *
              parseInt(this.invoice.items[index].quantity)
          ).toFixed(2)
          this.invoice.items[index].tax_percentage = this.invoice.items[index].item.tax
          this.invoice.items[index].product_tax = (
            parseFloat(this.invoice.items[index].tax_percentage / 100) *
            parseFloat(this.invoice.items[index].cost) *
            parseInt(this.invoice.items[index].quantity)
          ).toFixed(2)
          this.invoice.items[index].cost_after_tax =
            parseFloat(this.invoice.items[index].product_tax) +
            parseFloat(this.invoice.items[index].cost)
          this.invoice.items[index].total =
            parseFloat(this.invoice.items[index].subtotal) +
            parseFloat(this.invoice.items[index].product_tax)
          this.invoice.items[index].tax_amount =
            parseFloat(this.invoice.items[index].product_tax) *
            parseInt(this.invoice.items[index].quantity)
        } else {
          this.invoice.items[index].subtotal = parseFloat(
            parseFloat(this.invoice.items[index].cost) *
              parseInt(this.invoice.items[index].quantity)
          ).toFixed(2)
          this.invoice.items[index].total =
            parseFloat(this.invoice.items[index].subtotal) +
            parseFloat(this.invoice.items[index].product_tax)
        }
        this.addItem()
        this.invoice.items.length = this.invoice.items.length - 1
      }
    },
    removeItem(idx) {
      this.invoice.items.splice(idx, 1)
    },
    store() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'
      this.invoice.tax_amount = this.totalTax
      this.message = ''
      this.invoice.cost = this.cost
      this.invoice.subtotal = this.cost
      this.invoice.paid_amount = this.total
      this.invoice.remaining_amount = 0
      this.invoice.total =
        parseFloat(this.cost) + parseFloat(this.totalTax) - parseFloat(this.invoice.discount_amount)
      this.invoice.discounts = this.discountsId
      let data = this.invoice
      this.test = data.items

      this.invoice.tax_percentage =
        (parseFloat(this.invoice.tax_amount) / parseFloat(this.invoice.cost)) * 100

      axios
        .post('/api/purchases/store', data)
        .then((res) => {
          if (res.data.status == true) {
            this.message = res.data.message
            this.alertType = 'success'
            this.invoice.items = res.data.body.invoice.items
            this.invoice.provider_name = res.data.body.invoice.provider_name
            this.invoice.id = res.data.body.invoice.id
            this.invoice.provider_tax_number = res.data.body.invoice.provider_tax_number
            this.invoice.cost = res.data.body.invoice.cost
            this.invoice.total = res.data.body.invoice.total

            this.invoice.subtotal = res.data.body.invoice.subtotal
            this.invoice.tax = res.data.body.invoice.tax_amount
            this.showReceipt = true
            this.invoice.created_at = res.data.body.invoice.created_at
            this.invoice.qr = res.data.body.invoice.qr
            this.invoice.total_string = res.data.body.invoice.total_string

            let data = {
              invoice: this.invoice,
              user: this.user,
              settings: this.settings,
              strings: this.strings,
              qr: this.invoice.qr
            }
            // eslint-disable-next-line no-undef
            SharedEvent.fire('open-purchase-receipt-modal', data)
          }
        })
        .catch((error) => {
          console.log(error.response.data.message)
          this.message = error.response.data.message
          this.alertType = 'danger'
        })
    },
    // findDuplicate() {
    //     if (this.invoice.items.indexOf(this.invoice.provider_inv_number) != -1) {
    //         this.message = "لا يمكن اختيار نفس المنتج مرتين";
    //         this.alertType = "danger";
    //         setTimeout(() => {
    //             this.message = "";
    //             this.alertType = "success";
    //         }, 120000);
    //     }
    // },
    closeReceipt() {
      this.invoice = {
        items: [],
        paid: 0,
        inventory_id: this.user.inventory,
        tax: 0
      }
      // this.addItem();
      this.message = ''
      this.showReceipt = false
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    setProduct(index) {
      this.invoice.items[index].cost = ''
      this.invoice.items[index].item = ''
      let prod = this.products.filter((x) => {
        return x.serial == this.invoice.items[index].serial
      })[0]
      if (!prod) return

      if (Object.keys(prod).includes('product_id')) {
        this.invoice.items[index].item_id = prod.product_id
      } else {
        this.invoice.items[index].item_id = prod.id
      }

      this.invoice.items[index].item = prod
      this.invoice.items[index].cost = prod.cost
      this.invoice.items[index].product_tax = this.invoice.items[index].item.tax
      this.updateSubtotal(index, true)
      this.setCost(index)
    },
    addDiscount(id) {
      this.discountsId.push(id)
      let disc = this.discounts.filter((x) => {
        return x.id == id
      })[0]

      if (
        !this.extraDiscounts.filter((x) => {
          return x.id == id
        }).length &&
        this.invoice.items.length
      ) {
        this.extraDiscounts.push(disc)
        for (let index = 0; index < disc.length; index++) {}
      }
    }
    // titleWithSerial({ title,title_ar, serial }){
    //     if (this.user.language == 'en'){
    //         return `[${serial}] - ${title}`
    //     }
    //     return `[${serial}] - ${title_ar}`
    // }
  }
}
</script>
<style>
.style-chooser.is-invalid {
  border: 1px solid #dc3545 !important;
}

/* tr:not(.enable-border) th {
    max-width: 125px !important;
    min-width: 125px !important;
}
.table.table-bordered td {
    max-width: 125px !important;
    width: 125px !important;
} */
.multiselect__tags {
  min-height: calc(1.5em + 0.75rem + 2px) !important;
  padding: 5px 40px 0 8px !important;
  border: 1px solid #ced4da !important;
  font-size: 1rem !important;
  border-radius: 0.25rem !important;
  color: rgb(73, 80, 87) !important;
  overflow: auto;
}
</style>
