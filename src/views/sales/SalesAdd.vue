<template>
  <div class="saleAdd">
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card pt-3" v-if="loaded">
        <div class="card-header header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title">{{ trans('add sale invoice') }}</h4>

          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(store)">
                  <b-form-row>
                    <b-col>
                      <div class="row my-3">
                        <div class="col"></div>
                        <div
                          style="background: #f6f6f6; padding: 10px; border-radius: 7px"
                          class="col"
                          v-if="customer && customer.id"
                        >
                          <p>{{ trans('customer_name') }} : {{ customer.name }}</p>
                          <p>{{ trans('customer phone') }} : {{ customer.phone }}</p>
                          <p v-if="customer.tax_num">
                            {{ trans('tax_number') }} : {{ customer.tax_num }}
                          </p>
                        </div>
                      </div>
                      <div class="row">
                        <!--                                                <div class="col">-->
                        <!--                                                    <b-form-group :label="trans('invoice type')">-->
                        <!--                                                        <b-form-select v-model="invoice.payment_type">-->
                        <!--                                                            <b-form-select-option v-for="(val,key) in payment_types"-->
                        <!--                                                                                  :key="key" :value="key">{{ val }}-->
                        <!--                                                            </b-form-select-option>-->
                        <!--                                                        </b-form-select>-->
                        <!--                                                    </b-form-group>-->
                        <!--                                                </div>-->

                        <div class="col">
                          <b-form-group :label="trans('invoice type')">
                            <div
                              style="
                                font-weight: 500;
                                padding: 7px 5px;
                                background: #fcfcfc;
                                border-radius: 3px;
                                display: flex;
                                justify-content: space-around;
                              "
                            >
                              <span v-for="(key, val) in payment_types" :key="val">
                                <input
                                  v-model="invoice.payment_type"
                                  type="radio"
                                  name="invoice_type"
                                  :value="val"
                                />
                                {{ trans(val) }}
                              </span>
                            </div>
                          </b-form-group>
                        </div>

                        <!-- <div class="col" v-if="invoice.payment_type != 'full'">
                          <b-form-group :label="trans('paid amount')">
                            <b-form-input v-model="paid_amount" type="text">
                            </b-form-input>
                          </b-form-group>
                        </div> -->

                        <div class="col" v-if="invoice.payment_type == 'full'">
                          <b-form-group :label="trans('payment method')">
                            <b-form-select
                              @change="AllAccounts(invoice.payment_method)"
                              v-model="invoice.payment_method"
                            >
                              <b-form-select-option
                                v-for="(key, val) in payment_methods"
                                :key="val"
                                :value="val"
                              >
                                {{ trans(val) }}
                              </b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                        </div>

                        <div class="col" v-if="invoice.payment_type == 'full'">
                          <b-form-group :label="trans('account')">
                            <b-form-select v-model="invoice.treasury_account">
                              <b-form-select-option
                                v-for="(accounty, index) in accountLinks"
                                :key="index"
                                :value="accounty.account.toString()"
                                >{{ accounty.title }}
                              </b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                        </div>
                        <div class="col" style="padding-bottom: 0">
                          <label>{{ trans('inventory') }}</label>
                          <v-select
                            :options="inventories"
                            label="title"
                            v-model="invoice.inventory_id"
                            :reduce="(option) => option.id"
                            :dir="language === 'ar' ? 'rtl' : 'ltr'"
                          />
                        </div>

                        <div class="col" style="padding-bottom: 0">
                          <label>{{ trans('add discount') }}</label>
                          <v-select
                            v-model="discount_selected"
                            @input="addDiscount(discount_selected.id)"
                            dir="rtl"
                            :value="id"
                            :label="'title'"
                            :options="discounts"
                          >
                          </v-select>
                        </div>
                      </div>
                      <v-row
                        style="
                          justify-content: space-between;
                          align-items: center;
                          margin-bottom: 5px;
                        "
                      >
                        <h2 class="col-sm-6">
                          {{ trans('items') }}

                          <b-button
                            style="height: 42px"
                            @click="addItem"
                            class="float-end"
                            variant="primary"
                          >
                            <i class="bi bi-plus-lg"></i>
                          </b-button>
                        </h2>
                        <b-button
                          @click="openCustomersModal"
                          class="float-end"
                          variant="primary"
                          style="margin: 0 10px"
                        >
                          <i class="bi bi-plus-lg"></i>
                          {{ trans('add_customer') }}
                        </b-button>
                      </v-row>
                      <div class="col-sm-12 p-0" style="overflow: none; min-height: 370px">
                        <b-table-simple striped bordered style="min-height: 50px">
                          <GlobalTabel :columns="columns" />
                          <b-tbody v-for="(item, index) in invoice.items" :key="item.id">
                            <b-tr>
                              <b-td style="min-width: 20px !important; max-width: 20px !important">
                                {{ index + 1 }}
                              </b-td>

                              <b-td>
                                <ValidationProvider
                                  name="product"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <b-form-group>
                                    <v-select
                                      v-model="invoice.items[index].serial"
                                      @input="setProduct(index)"
                                      dir="rtl"
                                      :value="index"
                                      :label="'serial'"
                                      :options="products"
                                      :reduce="(product) => product.serial"
                                    >
                                    </v-select>

                                    <b-form-invalid-feedback id="inputLiveFeedback">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                                </ValidationProvider>
                                <!-- <span v-if="item.is_variant">{{item.title}}</span> -->
                              </b-td>

                              <b-td>
                                <ValidationProvider
                                  name="product"
                                  rules="required"
                                  v-slot="{ errors }"
                                >
                                  <b-form-group>
                                    <v-select
                                      style="max-width: 200px"
                                      v-model="invoice.items[index].item"
                                      @input="setCost(index) & setProduct(index)"
                                      dir="rtl"
                                      :value="index"
                                      :placeholder="trans('search product')"
                                      :options="products"
                                      label="title"
                                    ></v-select>

                                    <b-form-invalid-feedback id="inputLiveFeedback">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                                </ValidationProvider>
                                <span v-if="item.is_variant">{{ item.title }}</span>
                              </b-td>

                              <b-td style="width: 70px">
                                <ValidationProvider
                                  rules="required|min_value:1"
                                  v-slot="{ valid, errors }"
                                  name="quantity"
                                >
                                  <b-form-group>
                                    <b-form-input
                                      style="min-width: 100px"
                                      type="number"
                                      disabled
                                      v-model="invoice.items[index].item.quantity"
                                      :state="errors[0] ? false : valid ? true : null"
                                    ></b-form-input>
                                    <b-form-invalid-feedback id="inputLiveFeedback">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                                </ValidationProvider>
                              </b-td>

                              <b-td>
                                <ValidationProvider
                                  rules="required|min_value:1"
                                  v-slot="{ valid, errors }"
                                  name="quantity"
                                >
                                  <b-form-group>
                                    <b-form-input
                                      style="max-width: 100px"
                                      type="number"
                                      v-model="invoice.items[index].quantity"
                                      :state="errors[0] ? false : valid ? true : null"
                                      @change="updateSubtotal(index)"
                                      @keypress="isNumber($event)"
                                      @keyup="getTotal(index)"
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
                                  name="price"
                                >
                                  <b-form-group>
                                    <b-form-input
                                      style="max-width: 130px"
                                      type="text"
                                      v-model="invoice.items[index].price"
                                      :state="errors[0] ? false : valid ? true : null"
                                      @change="updateSubtotal(index)"
                                      @blur="showMessage(index)"
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
                                  rules=""
                                  v-slot="{ valid, errors }"
                                  name="product_tax"
                                >
                                  <b-form-group>
                                    <b-form-input
                                      placeholder="نسبة الخصم"
                                      style="max-width: 130px"
                                      type="text"
                                      min="0"
                                      :disabled="extraDiscounts.length > 0"
                                      v-model="invoice.items[index].item.discount_percentage"
                                      @keyup="
                                        updateDiscountValues(index, 'percentage')
                                        getTotal(index)
                                      "
                                      :state="errors[0] ? false : valid ? true : null"
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
                                  rules=""
                                  v-slot="{ valid, errors }"
                                  name="discount_fixed"
                                >
                                  <b-form-group>
                                    <b-form-input
                                      placeholder="قيمة الخصم"
                                      style="max-width: 150px"
                                      type="text"
                                      min="0"
                                      :disabled="extraDiscounts.length > 0"
                                      v-model="invoice.items[index].item.discount_fixed"
                                      @keyup="
                                        updateDiscountValues(index, 'fixed')
                                        getTotal(index)
                                      "
                                      :state="errors[0] ? false : valid ? true : null"
                                    >
                                    </b-form-input>
                                    <b-form-invalid-feedback id="inputLiveFeedback">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                                </ValidationProvider>
                              </b-td>

                              <!-- <b-td>
                                                              <ValidationProvider rules="positive|decimal"
                                                                                  v-slot="{ valid, errors }"

                                                                                  name='product_tax'>
                                                                  <b-form-group>
                                                                      <b-form-input
                                                                          readonly
                                                                          placeholder="السعر بعد الخصم"
                                                                          style="min-width: 100px;"
                                                                          type="text"
                                                                          v-model="invoice.items[index].item.price_after_discount"
                                                                          :state="errors[0] ? false : (valid ? true : null)"
                                                                      >
                                                                      </b-form-input>
                                                                      <b-form-invalid-feedback id="inputLiveFeedback">
                                                                          {{ errors[0] }}
                                                                      </b-form-invalid-feedback>
                                                                  </b-form-group>
                                                              </ValidationProvider>
                                                          </b-td> -->

                              <b-td>
                                <ValidationProvider
                                  rules="required|positive|decimal"
                                  v-slot="{ valid, errors }"
                                  name="cost"
                                >
                                  <b-form-group>
                                    <b-form-input
                                      style="max-width: 150px"
                                      type="number"
                                      v-model="invoice.items[index].item.tax"
                                      readonly
                                      :state="errors[0] ? false : valid ? true : null"
                                      @keyup="getTotal(index)"
                                    >
                                    </b-form-input>
                                    <b-form-invalid-feedback id="inputLiveFeedback">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                                </ValidationProvider>
                                <!-- <span v-if="invoice.items[index].price_after_tax >= invoice.items[index].item.discount_percentage">price greater than cost</span> -->
                              </b-td>
                              <!-- 
                                                          <b-td>
                                                              <ValidationProvider rules="required|positive|decimal"
                                                                                  v-slot="{ valid, errors }"

                                                                                  name='cost'>
                                                                  <b-form-group>
                                                                      <b-form-input
                                                                          style="min-width: 100px;"
                                                                          type="text"
                                                                          readonly
                                                                          v-model="invoice.items[index].item.tax_after_price"
                                                                          :state="errors[0] ? false : (valid ? true : null)"
                                                                      >
                                                                          <span v-if="invoice.items[index].price >= invoice.items[index].item.cost">pricegreater than cost</span>
                                                                      </b-form-input>
                                                                      <b-form-invalid-feedback id="inputLiveFeedback">
                                                                          {{ errors[0] }}
                                                                      </b-form-invalid-feedback>
                                                                  </b-form-group>
                                                              </ValidationProvider>
                                                          </b-td> -->

                              <!-- <b-td>
                                <span
                                  v-if="
                                    invoice.items[index].price &&
                                    invoice.items[index].item &&
                                    invoice.items[index].quantity
                                  "
                                >
                                  <b>{{
                                    parseFloat(invoice.items[index].subtotal)
                                      .toFixed(2)
                                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                  }}</b>
                                  <span>{{
                                        getSetting('currency')
                                  }}</span>
                                </span>
                              </b-td> -->
                              <b-td>
                                <span
                                  v-if="
                                    invoice.items[index].price &&
                                    invoice.items[index].item &&
                                    invoice.items[index].quantity
                                  "
                                >
                                  <b>{{
                                    parseFloat(invoice.items[index].total)
                                      .toFixed(2)
                                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                  }}</b>
                                </span>
                              </b-td>

                              <b-td>
                                <b-button variant="danger" @click="removeItem(index)">
                                  <font-awesome-icon icon="fa-solid fa-minus " />
                                </b-button>
                              </b-td>
                            </b-tr>
                          </b-tbody>
                          <b-tbody>
                            <!-- <b-tr v-for="(tax,index) in allItemData" :key="'one_'+index">
                                                          <template>
                                                              <b-td v-if="parseInt(tax.tax) > 0" colspan="3"
                                                                    class="text-center">
                                                                  {{user.language == 'en' ? 'Total Value with added tax' : 'اجمالي القيمة الخاضع للضريبة' }} - ({{ tax.tax }}%)
                                                              </b-td>
                                                              <b-td v-else colspan="3" class="text-center">
                                                                  {{user.language == 'en' ? 'Total Value with no added tax' : 'اجمالي القيمة الغير الخاضع للضريبة' }}
                                                              </b-td>
                                                              <b-td>
                                <span> {{ parseFloat(tax.totalValuesAfterDiscount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
                                  {{ user.language == 'en' ? settings.currency_en : settings.currency_ar }}</span>
                                                              </b-td>
                                                          </template>
                                                      </b-tr> -->
                            <b-tr>
                              <b-td colspan="3" class="text-center font-weight-bold">
                                {{ trans('total value before discount') }}
                              </b-td>
                              <b-td class="font-weight-bold" colspan="9">
                                <b>{{
                                  parseFloat(costNewBeforeDiscount)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                }}</b>
                                <span> {{ getSetting('currency') }}</span>
                              </b-td>
                            </b-tr>
                            <b-tr
                              v-for="(disc, index) in extraDiscounts"
                              :key="index"
                              class="disc-row"
                            >
                              <b-td colspan="3">
                                <span style="font-size: 19px">
                                  {{ disc.title }}
                                  {{ disc.value }}
                                  <span v-if="disc.type === 'fixed'">{{
                                    getSetting('currency')
                                  }}</span>
                                </span>
                                <button
                                  style="margin: 0 7px; height: 30px"
                                  class="btn btn-danger btn-sm btn-rounded"
                                  @click="removeDiscount(disc.id)"
                                >
                                  <font-awesome-icon icon="fa-solid fa-xmark" />
                                </button>
                              </b-td>
                              <td class="text-center" colspan="2">
                                <span
                                  v-text="language == 'en' ? disc.title.en : disc.title.ar"
                                ></span>
                                <span v-if="disc.type == 'percentage'">{{ disc.value + '%' }}</span>
                                <span v-else>{{ disc.value }} {{ getSetting('currency') }}</span>
                              </td>
                            </b-tr>
                            <b-tr>
                              <b-td colspan="3" class="text-center font-weight-bold text-danger">
                                {{ trans('total discount') }}
                              </b-td>
                              <b-td colspan="9" class="font-weight-bold text-danger">
                                <b>{{
                                  parseFloat(totalDiscounts)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                }}</b>
                                <span> {{ getSetting('currency') }}</span>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td colspan="3" class="text-center font-weight-bold">
                                {{ trans('total value after discount') }}
                              </b-td>
                              <b-td class="font-weight-bold" colspan="9">
                                <b>{{
                                  parseFloat(costNewBeforeDiscount - totalDiscounts)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                }}</b>
                                <span> {{ getSetting('currency') }}</span>
                              </b-td>
                            </b-tr>
                          </b-tbody>
                          <b-tbody>
                            <!-- <b-tr v-for="(tax,index) in allItemData" :key="'two_'+index">
                                                          <template v-if="parseInt(tax.tax) > 0">
                                                              <b-td colspan="3" class="text-center">
                                                                  {{user.language == 'en' ? 'Added Tax' : 'ضريبة القيمة المضافة' }} - ({{ tax.tax }}%)
                                                              </b-td>
                                                              <b-td>
                                                                  <span>
                                                                      {{parseFloat(tax.taxValue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }} {{user.language == 'en' ? settings.currency_en : settings.currency_ar }}
                                                                  </span>
                                                              </b-td>
                                                          </template>
                                                      </b-tr> -->
                            <b-tr>
                              <b-td colspan="3" class="text-center font-weight-bold">
                                {{ trans('adding_added_tax') }}
                                <!-- ({{invoice.items[0].tax_precentage}} %) -->
                              </b-td>
                              <b-td class="font-weight-bold" colspan="9">
                                <b
                                  >{{
                                    parseFloat(totalTax)
                                      .toFixed(2)
                                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                  }} </b
                                ><span> {{ getSetting('currency') }}</span>
                              </b-td>
                            </b-tr>
                            <b-tr>
                              <b-td class="text-center font-weight-bold" colspan="3"
                                >{{ trans('total') }}
                              </b-td>
                              <b-td class="font-weight-bold" colspan="9">
                                <b>{{
                                  parseFloat(total)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                }}</b>
                                <span> {{ getSetting('currency') }}</span>
                              </b-td>
                            </b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </div>
                    </b-col>
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
        <skeleton-loader />
      </div>
      <sale-receipt-from-add
        :user="user"
        :sale="invoice"
        :settings="settings"
      ></sale-receipt-from-add>
      <Customer></Customer>
      <NewVariations :settings="settings" :user="user"></NewVariations>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import JsonExcel from 'vue-json-excel'
import SaleReceiptFromAdd from '@/components/sections/modals/SaleReceiptFromAddSale.vue'
import Customer from '@/components/sections/modals/Customer.vue'
import GoogleMap from '@/components/global/GoogleMap.vue'
import NewVariations from '@/components/sections/modals/NewVariations.vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { date } from '@/support/mixins'
// register globally
Vue.component('multiselect', Multiselect)
Vue.component('downloadExcel', JsonExcel)
Vue.use(VuejsDialog)
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'
export default {
  name: 'AppSalesAdd',
  components: {
    Customer,
    GoogleMap,
    NewVariations,
    SaleReceiptFromAdd,
    SkeletonLoader
  },
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'permissions', 'language'],
  data() {
    return {
      columns: [
        'id',
        'barcode',
        'item',
        'avaliable quantity',
        'quantity',
        'product price',
        'discount percentage',
        'discount fixed',
        //'price after discount',
        'added tax',
        // 'price after tax',
        'total value',
        'actions'
      ],
      payment_methods: [],
      payment_types: [],
      accountLinks: [],
      totalTax: 0,
      summ: 0,
      totalDiscounts: 0,
      total: 0,
      test: '',

      sales: [],
      strings: [],
      products: [],
      inventories: [],
      filter: {
        per_page: 30
      },
      paid_amount: 0,
      discounts: [],
      discount: 0,
      invoice: {
        items: [],
        paid: 0,
        qr: '',
        tax: 0,
        payment_type: 'full',
        inventory_id: ''
      },
      discount_selected: '',
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
      user_treasury_account: '',
      customEvents: [
        {
          eventName: 'close-cashier-receipt-modal',
          callback: this.closeReceipt
        },
        { eventName: 'cashier-set-customer', callback: this.setCustomer },
        { eventName: 'open-customers-modal', callback: this.setCustomer },
        { eventName: 'update-order', callback: this.updateOrder }
      ],
      extraDiscounts: [],
      discountsId: [],
      customer: {
        name: '',
        latitude: '',
        longitude: ''
      },
      latitude: '',
      longitude: '',
      searchObject: {},
      variant: '',

      Allcost: '',
      cost: 0,
      costNew: 0,
      costNewBeforeDiscount: 0,
      allItemData: []
    }
  },
  mounted() {
    this.AllAccounts('cash')
    window.scrollTo(0, 0)
    this.refresh()
    this.getProducts()
    this.create()
    this.getInventories()
    this.getProfile()
    this.latitude = parseFloat(localStorage.getItem('latitude'))
    this.longitude = parseFloat(localStorage.getItem('longitude'))
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
    dynamicLabel() {
      if (this.invoice.items[index].item) {
        return `${this.invoice.items[index].item.title} (${this.invoice.items[index].quantity})`
      } else {
        return trans('search product')
      }
    }
  },
  watch: {
    'invoice.items'() {
      let total = 0
      if (this.invoice.items) {
      }
    }
  },
  methods: {
    getProfile() {
      axios({
        method: 'GET',
        url: '/api/profile'
      })
        .then((res) => {
          this.user_treasury_account = res.data.body.user.inventory.treasury.account
        })
        .catch((error) => {})
    },
    addGlobalDiscount() {
      if (this.invoice.items.length) {
        for (let x = 0; x < this.invoice.items.length; x++) {
          if (this.extraDiscounts.length) {
            for (let i = 0; i < this.extraDiscounts.length; i++) {
              let q = parseFloat(this.extraDiscounts[i].value)
              if (this.extraDiscounts[i].type === 'percentage') {
                this.invoice.items[x].item.discount_percentage = q
                this.invoice.items[x].item.discount_fixed =
                  parseFloat(this.invoice.items[x].price) *
                  parseFloat(this.invoice.items[x].item.discount_percentage / 100).toFixed(2)
              }
              if (this.extraDiscounts[i].type === 'fixed') {
                this.invoice.items[x].item.discount_percentage = (
                  (q / this.costNewBeforeDiscount) *
                  100
                ).toFixed(2)

                this.invoice.items[x].item.discount_fixed =
                  parseFloat(this.invoice.items[x].item.price) *
                  (this.invoice.items[x].item.discount_percentage / 100)
              }
            }
          } else {
            this.invoice.items[x].item.discount_percentage =
              this.invoice.items[x].item.discount_percentage ?? 0
            this.invoice.items[x].item.discount_fixed =
              this.invoice.items[x].item.discount_fixed ?? 0
          }
          if (this.extraDiscounts.length > 1) {
            this.extraDiscounts.shift()
          }

          this.getTotal(x)
        }
      }
    },
    updateDiscountValues(index, type) {
      if (type === 'percentage') {
        if (this.invoice.items[index].item.discount_percentage <= 0) {
          this.invoice.items[index].item.discount_fixed = 0
          this.invoice.items[index].item.discount_percentage = 0
        } else {
          this.invoice.items[index].item.discount_fixed = parseFloat(
            parseFloat(this.invoice.items[index].price) *
              parseFloat(this.invoice.items[index].item.discount_percentage / 100)
          ).toFixed(2)
        }
      }
      if (type === 'fixed') {
        if (this.invoice.items[index].item.discount_fixed <= 0) {
          this.invoice.items[index].item.discount_fixed = 0
          this.invoice.items[index].item.discount_percentage = 0
        } else {
          this.invoice.items[index].item.discount_percentage = parseFloat(
            (parseFloat(this.invoice.items[index].item.discount_fixed) /
              parseFloat(this.invoice.items[index].price)) *
              100
          ).toFixed(2)
        }
      }
    },
    getTotal(index, remove = false) {
      if (!remove) {
        //السعر بعد الخصم Done
        if (this.invoice.items[index].item.discount_percentage) {
          this.invoice.items[index].item.price_after_discount = parseFloat(
            parseFloat(this.invoice.items[index].price) -
              parseFloat(
                parseFloat(this.invoice.items[index].price) *
                  parseFloat(this.invoice.items[index].item.discount_percentage / 100)
              )
          ).toFixed(2)
        } else {
          this.invoice.items[index].item.price_after_discount = this.invoice.items[index].price
        }

        //السعر بعد الضريبه Done
        this.invoice.items[index].item.tax_after_price = parseFloat(
          parseFloat(this.invoice.items[index].item.price_after_discount) *
            parseFloat(parseInt(this.invoice.items[index].item.tax) / 100) +
            parseFloat(this.invoice.items[index].item.price_after_discount)
        ).toFixed(2)

        //اجمالي الصف subtotal Done

        this.invoice.items[index].subtotal = parseFloat(
          (parseFloat(this.invoice.items[index].item.price) -
            parseFloat(this.invoice.items[index].item.discount_fixed)) *
            parseInt(this.invoice.items[index].quantity)
        ).toFixed(2)

        // Total Done
        this.invoice.items[index].total =
          // parseFloat(parseFloat(this.invoice.items[index].item.tax_after_price) * parseInt(this.invoice.items[index].quantity)).toFixed(2)

          parseFloat(
            parseFloat(this.invoice.items[index].subtotal) +
              parseFloat(this.invoice.items[index].subtotal) *
                (this.invoice.items[index].tax_percentage / 100)
          ).toFixed(2)

        //يضاف ضريبة القيمة المضافة Done
        this.invoice.items[index].product_tax = parseFloat(
          parseFloat(this.invoice.items[index].tax_percentage / 100) *
            parseFloat(this.invoice.items[index].item.price_after_discount) *
            parseInt(this.invoice.items[index].quantity)
        ).toFixed(2)
      }
      this.calculateTotals()
    },
    calculateTotals() {
      let totalValue = 0
      let totalValueBeforeDiscount = 0
      let totalTax = 0
      let totalTaxValue = 0
      let totalFinal = 0

      //grouping tax
      let itemsData = _.chain(this.invoice.items)

        .groupBy('tax_percentage')
        .map((value, key) => ({ tax: key, grouped: value }))
        .value()

      if (itemsData) {
        itemsData.map((item) => {
          let s = 0
          let sumBefore = 0
          item.grouped.map((subItem) => {
            // Price Before Discount
            subItem['valueBeforeDiscount'] = parseInt(subItem.quantity) * parseFloat(subItem.price)
            sumBefore = sumBefore + subItem['valueBeforeDiscount']
            item['totalValuesBeforeDiscount'] = sumBefore

            // Price After Discount
            subItem['valueAfterDiscount'] =
              parseInt(subItem.quantity) * parseFloat(subItem.item.price_after_discount)
            s = s + subItem['valueAfterDiscount']
            item['totalValuesAfterDiscount'] = s
          })
        })
      }

      // Without Global Discount
      if (itemsData) {
        itemsData.map((item, key) => {
          totalValue = parseFloat(totalValue) + item['totalValuesAfterDiscount']

          totalTaxValue =
            parseFloat(totalTaxValue) + (item['tax'] / 100) * item['totalValuesAfterDiscount']
          totalFinal = parseFloat(totalFinal) + item['totalValuesAfterDiscount']

          item.grouped.map((subItem) => {
            totalValueBeforeDiscount = parseFloat(
              parseFloat(totalValueBeforeDiscount) +
                parseFloat(parseInt(subItem.quantity) * parseFloat(subItem.price))
            ).toFixed(2)

            // item['totalValuesBeforeDiscount']

            if (subItem.item.discount_fixed) {
              totalTax = parseFloat(
                parseFloat(totalTax) +
                  parseInt(subItem.quantity) * parseFloat(subItem.item.discount_fixed)
              ).toFixed(2)
            }
            item['taxValue'] = (item.tax / 100) * item['totalValuesAfterDiscount']
          })
        })
      }
      totalFinal = totalFinal + totalTaxValue

      if (this.extraDiscounts.length) {
        // totalValue =0;
        // totalTax =0;
        // totalTaxValue =0;
        // totalFinal =0;
        for (let i = 0; i < this.extraDiscounts.length; i++) {
          let testSingleDiscount = 0
          let q = parseFloat(this.extraDiscounts[i].value)
          if (this.extraDiscounts[i].type === 'percentage') {
            itemsData.map((item) => {
              q =
                (parseFloat(this.extraDiscounts[i].value) / 100) * item['totalValuesAfterDiscount']
              // item['globalDiscount'] = parseFloat(q)
              // item['totalValuesAfterGlobalDiscount'] = item['totalValuesAfterDiscount'] - item['globalDiscount']
              // totalValue =  parseFloat(totalValue) + item['totalValuesAfterGlobalDiscount'];
              // totalTaxValue =  parseFloat(totalTaxValue) + ((item['tax']/100) * item['totalValuesAfterGlobalDiscount']);
              // totalFinal =  parseFloat(totalFinal) + item['totalValuesAfterGlobalDiscount'];
              // item.grouped.map((subItem) => {
              //     if (subItem.item.discount_fixed){
              //         totalTax = parseFloat(totalTax) + (parseInt(subItem.quantity) * parseFloat(subItem.item.discount_fixed).toFixed(2))
              //     }
              // })
              // totalTax = parseFloat(totalTax) + item['globalDiscount']
              // testSingleDiscount = parseFloat(testSingleDiscount) + item['globalDiscount'];
              // extraDiscs = parseFloat(extraDiscs) + q;
              // item['taxValue'] = q;
            })
            this.extraDiscounts[i].subtotal = q
          }
        }
      }

      this.costNew = this.costNewBeforeDiscount - this.totalDiscounts
      // this.costNew = totalValue
      this.costNewBeforeDiscount = totalValueBeforeDiscount
      this.totalDiscounts = totalTax
      this.totalTax = totalTaxValue
      this.total = totalFinal

      //الاجمالي الكلي
      let items = this.invoice.items
      this.allItemData = itemsData
      this.invoice.discount_amount = parseFloat(totalTax).toFixed(2)
    },
    showMessage(index) {
      if (this.invoice.items[index].price_after_tax < this.invoice.items[index].item.cost) {
        alert('cost is greater than price')
      }
    },

    AllAccounts(input = 'sales_invoice_account') {
      if (input == 'cash') {
        input = 'treasury'
      }
      axios
        .get('api/account/from/link?link_name=' + input)
        .then((res) => {
          this.accountLinks = res.data.body.accounts
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setPlace(place) {
      this.customer.latitude = place.lat
      this.customer.longitude = place.lng
    },
    openCustomersModal() {
      let data = {
        settings: this.settings,
        permissions: this.permissions
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-customers-modal', data)
    },
    updateOrder(variant) {
      let duplicated = 1
      for (let i in this.invoice.items) {
        if (this.invoice.items[i].variation_id === variant.id) {
          duplicated += 1
        }
      }
      if (duplicated >= 2) {
        this.showToastError('لا يمكن اختيار نفس المنتج مرتين', '4001')
        this.removeItem(variant.index)
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
    setCustomer(data) {
      this.customer = data.customer
      if (this.customer.latitude.length > 0) {
        this.latitude = parseFloat(this.customer.latitude)
        this.longitude = parseFloat(this.customer.longitude)
      }
    },

    create() {
      let url = '/api/sales/create'

      axios
        .get(url)
        .then((res) => {
          this.discounts = res.data.body.discounts
        })
        .catch((error) => {
          console.log(error.toJSON())
          this.noAccountLinks = true
          this.noAccountLinksMessage = error.response.data.message
        })
    },

    refresh() {
      let url = '/api/sales'
      this.loaded = false
      this.itemsLoaded = false
      axios
        .get(url)
        .then((res) => {
          this.payment_methods = res.data.body.payment_method
          this.payment_types = res.data.body.payment_type
          // this.addItem();
          this.loaded = true
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
      axios
        .get(url)
        .then((res) => {
          // this.addItem();
          this.loaded = true
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    getProducts() {
      this.loaded = false
      axios
        .get('/api/product/general-list')
        .then((res) => {
          this.products = res.data.body.products.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getInventories() {
      this.loaded = false
      axios
        .get('/api/inventories')
        .then((res) => {
          this.inventories = res.data.body.inventories.data
        })
        .catch((error) => {
          console.log(error)
        })
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
      }
      this.addGlobalDiscount()
      this.calculateTotals()
    },
    removeDiscount(id) {
      this.invoice.items.map((el) => {
        el['item']['discount_fixed'] = 0
        el['item']['discount_percentage'] = 0
      })
      this.extraDiscounts = this.extraDiscounts.filter((x) => {
        return x.id != id
      })
      this.discountsId = this.discountsId.filter((x) => {
        return x != id
      })
      this.addGlobalDiscount()
      this.calculateTotals()
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
    setCost(index) {
      this.invoice.items[index].has_attributes = 'false'
      let item = this.invoice.items[index].item
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
          if (this.invoice.items[i].item_id === prod.id) {
            duplicated += 1
          }
        }
      }
      if (duplicated >= 3) {
        // this.invoice.items.splice(0,index);
        this.message = 'لا يمكن اختيار نفس المنتج مرتين'
        this.alertType = 'danger'
        this.removeItem(index)
        setTimeout(() => {
          this.message = ''
          this.alertType = 'success'
        }, 120000)
      } else {
        this.invoice.items[index].price_after_tax = prod.price_after_tax
        this.invoice.items[index].price = prod.price
        this.invoice.items[index].serial = item.serial
        this.invoice.items[index].stock = item.quantity
        this.invoice.items[index].product_tax = this.invoice.items[index].item.tax
        this.invoice.items[index].total = prod.price_after_tax * this.invoice.items[index].quantity

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
      console.log(this.invoice.items)
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
    updateTax(index) {},
    updatePrice(index) {},
    updateSubtotal(index, calc = false) {
      if (this.invoice.items[index].item_id) {
        if (this.invoice.items[index].product_tax) {
          //  this.invoice.items[index].subtotal = parseFloat(parseFloat(this.invoice.items[index].price_after_tax) * parseInt(this.invoice.items[index].quantity)).toFixed(2);
          this.invoice.items[index].tax_percentage = this.invoice.items[index].item.tax
          // this.invoice.items[index].product_tax = ((parseFloat(this.invoice.items[index].tax_percentage/100) * parseFloat(this.invoice.items[index].item.price_after_discount)) * parseInt(this.invoice.items[index].quantity)).toFixed(2);
          this.invoice.items[index].price_after_tax = parseFloat(
            parseFloat(this.invoice.items[index].tax_percentage / 100) *
              parseFloat(this.invoice.items[index].price) +
              parseFloat(this.invoice.items[index].price)
          ).toFixed(2)
        } else {
          //  this.invoice.items[index].subtotal = parseFloat(parseFloat(this.invoice.items[index].price_after_tax) * parseInt(this.invoice.items[index].quantity)).toFixed(2);
        }
        this.addItem()
        this.invoice.items.length = this.invoice.items.length - 1
        this.getTotal(index)
      }
    },
    removeItem(idx) {
      this.invoice.items.splice(idx, 1)
      if (this.invoice.items.length == 0) {
        this.extraDiscounts = []
      }
      this.getTotal(idx, true)
    },
    store() {
      this.invoice.treasury_account =
        this.invoice.payment_type === 'installment'
          ? this.user_treasury_account
          : this.invoice.treasury_account

      this.invoice.tax = this.totalTax

      this.invoice.price = this.price
      this.invoice.total = this.total
      this.invoice.discounts = this.discountsId
      this.invoice.customer = this.customer
      this.invoice.customer_id = this.customer ? this.customer.id : null
      this.invoice.subtotal = this.total - this.totalTax + parseFloat(this.invoice.discount_amount)
      this.invoice.tax_amount = this.totalTax
      this.invoice.data = this.allItemData
      this.invoice.invoice_date = date()
      this.invoice.tax_percentage =
        // (parseFloat(this.totalTax) / parseFloat(this.invoice.subtotal)) * 100
        this.invoice.items[0].tax_percentage

      // نقدي
      if (this.invoice.payment_type == 'full') {
        this.invoice.paid_amount = this.invoice.total
        this.invoice.remaining_amount = 0

        // اجل
      } else {
        this.invoice.paid_amount = 0
        this.invoice.payment_method = 'cash'
        this.invoice.remaining_amount = this.total - this.paid_amount
      }
      if (this.invoice.items.length > 0) {
        this.invoice.items.forEach((item) => {
          item.tax_amount = item.product_tax
          item.discount_percentage = item.item.discount_percentage
          item.discount_amount = item.item.discount_fixed
          item.title = item.item.title
          item.unit_key = item.item.unit_key
          item.serial = item.item.serial
          item.has_attributes = item.item.has_attributes
          item.sale_price =
            item.item.sale_price && item.item.sale_price != 0
              ? item.item.sale_price
              : item.item.price
        })
      }
      axios
        .post('/api/sales', this.invoice)
        .then(
          (res) => {
            if (res.data.status) {
              let data = {}
              this.alertType = 'success'
              this.invoiceID = res.data.body.invoice.id
              this.qr = res.data.body.invoice.qr
              this.loadingInvoice = false
              this.showToastError(res.data.message, res.data.custom_code)
              data.id = this.invoiceID
              data.created_at = res.data.body.invoice.created_at
              data.qr = res.data.body.invoice.qr
              data.total_string = res.data.body.invoice.total_string
              data.customer = res.data.body.customer
              data.items = res.data.body.invoice.items
              data.sale = res.data.body.invoice
              let invoiceData = {
                sale: data,
                sale_totals: data.sale,
                settings: this.settings,
                user: this.user,
                strings: this.strings,
                cashierInvoice: true,
                qr: this.qr,

                saleInvoiceType: this.trans('sale invoice')
              }

              // this.showReceipt = true
              // SharedEvent.fire('open-sale-receipt-from-add-modal', invoiceData)

              this.$router.push(`/sales/view/${data.id}`)
            } else {
              this.showToastError(res.data.message, res.data.custom_code)
              this.loadingInvoice = false
              this.showReceipt = true
            }
          },
          (error) => {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
            this.showReceipt = true
          }
        )
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
          this.showReceipt = true
          SharedEvent.fire('open-sale-receipt-from-add-modal', invoiceData)
        })
    },
    closeReceipt() {
      this.invoice = {
        items: [],
        paid: 0,
        inventory_id: this.user.inventory,
        tax: 0,
        totalDiscounts: 0
      }
      // this.addItem();

      this.total = 0
      this.totalTax = 0
      this.costNew = 0
      this.costNewBeforeDiscount = 0
      this.extraDiscounts = []
      this.showReceipt = false
      this.$router.push({ path: '/sales' })
    },
    setProduct(index) {
      this.invoice.items[index].price = ''
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
      this.invoice.items[index].price = prod.price
      this.invoice.items[index].product_tax = this.invoice.items[index].item.tax
      this.updateSubtotal(index, true)
      this.addGlobalDiscount()
      this.setCost(index)
    },
    getSetting: function (key) {
      var result = this.settings.find((el) => {
        if (el.key === key) {
          return el.value
        }
      })

      return result.value
    }
  }
}
</script>

<style>
.saleAdd .btn-group {
  width: 100%;

  border-radius: 50px !important;
  height: 36px;
  outline: 0;
}
.saleAdd .btn-group > .btn:hover {
  width: 100%;

  border-radius: 50px !important;
  height: 36px;
  outline: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}

.vs--searchable .vs__dropdown-toggle {
  min-width: 120px !important;
}

.style-chooser.is-invalid {
  border: 1px solid #dc3545 !important;
}

tr:not(.enable-border) th {
  /* max-width: 125px !important;
  min-width: 125px !important; */
}

.table.table-bordered td {
  /* max-width: 125px !important;
  width: 125px !important; */
}

.multiselect__tags {
  min-height: calc(1.5em + 0.75rem + 2px) !important;
  padding: 5px 40px 0 8px !important;
  border: 1px solid #ced4da !important;
  font-size: 1rem !important;
  border-radius: 0.25rem !important;
  color: rgb(73, 80, 87) !important;
  overflow: auto;
}

.custom-select .dropdown-toggle,
.custom-select .dropdown-toggle:hover,
.custom-select .dropdown-toggle:focus,
.custom-select.show .dropdown-toggle {
  background-color: transparent !important;
  color: #000 !important;
  border: none !important;
  border-radius: 0 !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
}

.dropdown.custom-select {
  border-radius: 30px;
  padding: 0 !important;
}

table .form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + -1px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: transparent;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  border-radius: 6px !important;
  background-image: none;
}
</style>
