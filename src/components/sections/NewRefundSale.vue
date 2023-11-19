<template>
  <section style="overflow-y: scroll" class="container-fluid" v-if="pageLoaded">
    <template v-if="loaded">
      <b-row>
        <b-col sm="12">
          <div id="invoice_title" class="col-sm-12">
            <b-row>
              <b-col>
                <h3 class="mb-3">
                  <!-- purchase -->
                  {{ trans('refund sale invoice') }} # {{ invoice.id }}
                </h3>
                <h5 class="mb-3">
                  {{ trans('The invoice is linked to sale invoice number') }}
                  # {{ invoice.id }}
                </h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <p class="bill-info">
                  <strong>{{ trans('created at') + ':' }}</strong>
                  {{ invoice.updated_at }}
                </p>
              </b-col>
              <b-col sm="4">
                <p class="bill-info">
                  <strong>{{ trans('customer name') }} : </strong>

                  <!-- provider -->
                  {{ invoice.customer ? invoice.customer.name : '' }}
                </p>
              </b-col>
              <b-col sm="4">
                <p class="bill-info">
                  <strong>{{ trans('invoice type') }} : </strong>

                  {{ trans(invoice.payment_type) }}
                </p>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col class="12">
          <div class="row">
            <!-- <div class="col">
                         <b-form-group :label="trans('invoice type')">
                             <b-form-select v-model="invoice.payment_type">
                                 <b-form-select-option v-for="(val,key) in payment_types"
                                                       :key="key" :value="key">{{ val }}
                                 </b-form-select-option>
                             </b-form-select>
                         </b-form-group>
                     </div>

                     <div class="col">
                         <b-form-group :label="trans('invoice type')">
                             <div style="font-weight: 500;
                                     padding: 7px 5px;
                                     background: #fcfcfc;
                                     border-radius: 3px;
                                     display: flex;
                                     justify-content: space-around;">
                                 <span v-for="(val,key) in payment_types" :key="key">
                                   <input v-model="invoice.payment_type" type="radio" name="invoice_type" :value="key"> {{val}}
                             </span>
                             </div>
                         </b-form-group>
                     </div>  -->

            <div hidden class="col" v-if="invoice.payment_type != 'full'">
              <b-form-group :label="trans('paid amount')">
                <b-form-input v-model="paid_amount" type="text"> </b-form-input>
              </b-form-group>
            </div>

            <div class="col">
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

            <div class="col">
              <ValidationProvider
                rules="required"
                v-slot="{ valid, errors }"
                name="name"
              >
                <b-form-group :label="trans('all accounts')">
                  <b-form-select v-model="invoice.treasury_account">
                    <b-form-select-option
                      v-for="(accounty, index) in accountLinks"
                      :state="errors[0] ? false : valid ? true : null"
                      :key="index"
                      :value="accounty.account.toString()"
                      required
                      >{{ accounty.title }}
                    </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </ValidationProvider>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-table-simple
        v-if="invoice.id && invoice.items.length > 0"
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
            <b-th>{{ trans('quantity') }}</b-th>
            <b-th>{{ trans('price') }}</b-th>
            <b-th>{{ trans('discount percentage') }} %</b-th>
            <b-th>{{ trans('discount fixed') }}</b-th>
            <b-th>{{ trans('price after discount') }}</b-th>
            <b-th>{{ trans('added tax') }}</b-th>
            <b-th>{{ trans('total') }}</b-th>
            <b-th>{{ trans('refund') }}</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <tr
            v-for="(item, index) in invoice.items"
            :key="index"
            class="order-row"
          >
            <td>{{ parseInt(index) + 1 }}</td>
            <td>{{ item.serial }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.quantity }}</td>
            <!-- cost -->
            <td>{{ item.price }}</td>
            <b-td>{{ item.discount_percentage }}</b-td>
            <b-td>{{ item.discount_amount }}</b-td>
            <b-td>{{ item.price - item.discount_amount }}</b-td>
            <b-td>{{ item.tax_percentage }}</b-td>
            <td>
              {{
                parseFloat(item.total - total)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
              }}
            </td>
            <td>
              <b-form-row class="justify-content-center">
                <b-input
                  type="text"
                  v-model="invoice.items[index].quantity"
                  readonly
                  class="quantity-field"
                  :class="'order-item-' + index"
                ></b-input>
                <b-button
                  variant="danger"
                  v-b-tooltip.hover
                  :title="trans('return_piece')"
                  size="sm"
                  @click="refundOneItem(item.item_id, item.quantity)"
                >
                  <font-awesome-icon icon="fa-solid fa-angle-down" />
                </b-button>
                <b-button
                  variant="danger"
                  class="m-1"
                  size="sm"
                  @click="refundAll(item.item_id, item.quantity)"
                >
                  {{ trans('refund_all_qty') }}
                </b-button>
              </b-form-row>
            </td>
          </tr>
        </b-tbody>
      </b-table-simple>

      <h5 class="text-center" v-if="invoice.id && invoice.items.length < 1">
        {{ trans('all_product_return') }}
      </h5>

      <h4 v-if="refund.length > 0">{{ trans('refunds') }}</h4>
      <b-table-simple
        v-if="refund.length > 0"
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
            <b-th>{{ trans('quantity') }}</b-th>
            <b-th>{{ trans('price') }}</b-th>
            <b-th>{{ trans('discount percentage') }} %</b-th>
            <b-th>{{ trans('discount fixed') }}</b-th>
            <b-th>{{ trans('price after discount') }}</b-th>
            <b-th>{{ trans('added tax') }}</b-th>
            <b-th>{{ trans('total') }}</b-th>
            <b-th style="width: 300px">{{ trans('refund') }}</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <tr
            v-for="(item, index) in refund"
            :key="item.index"
            class="order-row"
          >
            <td>{{ parseInt(index) + 1 }}</td>
            <td>{{ item.serial }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <b-td>{{ item.discount_percentage }}</b-td>
            <b-td>{{ item.discount_amount }}</b-td>
            <b-td>{{ item.price - item.discount_amount }}</b-td>
            <b-td>{{ item.tax_percentage }}</b-td>
            <!-- <td>{{ parseFloat(total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}</td> -->
            <!-- <td>{{ parseFloat(item.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}</td> -->
            <td>{{ itemsTotal.toFixed(2) }}</td>
            <td>
              <b-form-row class="justify-content-center">
                <b-input
                  type="text"
                  v-model="refund[index].quantity"
                  readonly
                  class="quantity-field"
                  :class="'order-item-' + index"
                ></b-input>
                <b-button
                  variant="success"
                  v-b-tooltip.hover
                  :title="trans('undo_render_piece')"
                  size="sm"
                  @click="buyOneItem(item.item_id, item.quantity)"
                >
                  <font-awesome-icon icon="fa-solid fa-angle-up" />
                </b-button>
              </b-form-row>
            </td>
          </tr>
        </b-tbody>
      </b-table-simple>

      <h5 class="text-center" v-if="invoice.id && refund.length < 1">
        {{ trans('no_product_returned') }}
      </h5>

      <div
        class="row justify-content-between align-items-start mx-0"
        style="margin-top: 30px; padding: 0 20px"
      >
        <div class="col-5">
          <div class="row m-0">
            <div style="margin-bottom: 15px" class="qr-code p-0">
              <img class="qr-image" :src="_.get(invoice, 'qr')" />
            </div>
          </div>
        </div>

        <div
          class="col-sm-5 col-12 totals mb-3"
          style="
            max-width: 50%;
            border: 1px solid #eeeeee;
            padding: 22px 22px 16px 22px;
            border-radius: 17px;
          "
        >
          <!-- invoice type -->

          <!-- <div
            class="row justify-content-between mb-1"
            style="
              margin-top: 8px;
              border-bottom: 1px solid rgb(238 238 238);
              padding-bottom: 12px;
              font: normal normal bold 13px/20px Tahoma;
              letter-spacing: 0px;
              color: #137b97;
            "
          >
            <b
              class="px-3"
              style="
                font: normal normal bold 13px/20px Tahoma;
                letter-spacing: 0px;
                color: #137b97;
              "
            >
              {{ trans('invoice type') }}
            </b>
            <b class="px-3" style="letter-spacing: 0px; color: #394e85">
              {{ trans(invoice.payment_type) }}
            </b>
          </div> -->
          <div
            class="row justify-content-between"
            style="
              border-bottom: 1px solid rgb(238 238 238);
              padding-bottom: 12px;
              font: normal normal bold 13px/20px Tahoma;
              letter-spacing: 0px;
              color: #137b97;
            "
          >
            <b
              class="px-3"
              style="
                font: normal normal bold 13px/20px Tahoma;
                letter-spacing: 0px;
                color: #137b97;
              "
              >{{ trans('total value before discount') }}</b
            >
            <b class="px-3" style="letter-spacing: 0px; color: #394e85"
              >{{ costNewBeforeDiscount }}
              {{ getSetting('currency', settings) }}
            </b>
          </div>
          <div
            class="row justify-content-between"
            style="
              margin-top: 8px;
              border-bottom: 1px solid rgb(238 238 238);
              padding-bottom: 12px;
              font: normal normal bold 13px/20px Tahoma;
              letter-spacing: 0px;
              color: #137b97;
            "
          >
            <b
              class="px-3"
              style="
                margin-top: 8px;
                font: normal normal bold 13px/20px Tahoma;
                letter-spacing: 0px;
                color: #137b97;
              "
              >{{ trans('discount_total') }}</b
            >
            <b class="px-3" style="letter-spacing: 0px; color: #394e85"
              >{{
                totalDiscounts.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
              }}
              {{ getSetting('currency', settings) }}
            </b>
          </div>

          <!-- <div style="margin-top:8px;border-bottom:1px solid rgb(238 238 238);padding-bottom: 12px;font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">
                  <div class="row justify-content-between" v-for="(tax,index) in allItemData" :key="'tax_'+index">
                      <template>
                          <b  v-if="parseInt(tax.tax) > 0" class="px-3" style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">
                              {{user.language == 'en' ? 'Total Value with added tax' : 'اجمالي القيمة الخاضع للضريبة' }} - ({{ tax.tax }}%)
                          </b>
                          <b  v-else class="px-3" style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">
                              {{user.language == 'en' ? 'Total Value with no added tax' : 'اجمالي القيمة الغير الخاضع للضريبة' }}
                          </b>
                          <b class="px-3" style="letter-spacing: 0px; color: #394E85;">
                              &nbsp; {{tax.totalValuesAfterDiscount }} {{user.language == 'en' ? settings.currency_en : settings.currency_ar }}
                          </b>
                      </template>
                  </div>
              </div> -->

          <div
            class="row justify-content-between"
            style="
              margin-top: 15px;
              border-bottom: 1px solid rgb(238 238 238);
              padding-bottom: 12px;
              font: normal normal bold 13px/20px Tahoma;
              letter-spacing: 0px;
              color: #137b97;
            "
          >
            <b
              class="px-3"
              style="
                font: normal normal bold 13px/20px Tahoma;
                letter-spacing: 0px;
                color: #137b97;
              "
              >{{ trans('total value after discount') }}</b
            >
            <b class="px-3" style="letter-spacing: 0px; color: #394e85"
              >{{ costNew.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}
              {{ getSetting('currency', settings) }}
            </b>
          </div>

          <!-- اجمالي القيمه الخاضع للضريبه -->
          <div
            class="row justify-content-between"
            style="
              margin-top: 15px;
              border-bottom: 1px solid rgb(238 238 238);
              padding-bottom: 12px;
              font: normal normal bold 13px/20px Tahoma;
              letter-spacing: 0px;
              color: #137b97;
            "
          >
            <b
              class="px-3"
              style="
                font: normal normal bold 13px/20px Tahoma;
                letter-spacing: 0px;
                color: #137b97;
              "
            >
              {{ trans('total_taxable') }}
              ({{ invoice.tax_percentage }} %)
            </b>

            <b class="px-3" style="letter-spacing: 0px; color: #394e85"
              >{{ totalTax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}

              {{ getSetting('currency', settings) }}
            </b>
          </div>

          <!-- <div style="margin-top:8px;border-bottom:1px solid rgb(238 238 238);padding-bottom: 12px;font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">
                  <div class="row justify-content-between" v-for="(tax,index) in allItemData" :key="'tax_'+index">
                      <template v-if="parseInt(tax.tax) > 0">
                          <b class="px-3" style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">
                              {{user.language == 'en' ? 'Added Tax' : 'ضريبة القيمة المضافة' }} - ({{ tax.tax }}%)
                          </b>
                          <b class="px-3" style="letter-spacing: 0px; color: #394E85;">
                              &nbsp; {{totalTax }} {{user.language == 'en' ? settings.currency_en : settings.currency_ar }}
                          </b>
                      </template>
                  </div>
              </div> -->

          <!-- ضريبه القيمه المضافه -->

          <!-- <div
            class="row justify-content-between"
            style="
              margin-top: 8px;
              border-bottom: 1px solid rgb(238 238 238);
              padding-bottom: 12px;
              font: normal normal bold 13px/20px Tahoma;
              letter-spacing: 0px;
              color: #137b97;
            "
          >
            <b
              class="px-3"
              style="                font: normal normal bold 13px/20px Tahoma;
                letter-spacing: 0px;
                color: #137b97;
              "
            >
              {{ trans('added_tax')  }}
         
            </b>
            <b class="px-3" style="letter-spacing: 0px; color: #394e85"
              >{{ _.get(invoice, 'tax_amount') }}
              {{
                user.language == 'en'
                  ? settings.currency_en
                  : settings.currency_ar
              }}
            </b>
          </div> -->

          <div
            class="row justify-content-between"
            style="
              padding: 10px 5px;
              margin-top: 23px;
              background: #137b97 0% 0% no-repeat padding-box;
              border-radius: 59px;
              font: normal normal bold 13px/20px Tahoma;
              letter-spacing: 0px;
              color: #ffffff;
            "
          >
            <b class="px-3">{{ trans('invoice total') }}</b>
            <b class="px-3" style="font: normal normal bold 13px/20px Tahoma">
              {{ total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}
              {{ getSetting('currency', settings) }}
            </b>
          </div>
        </div>
      </div>

      <div
        class="text-center"
        style="
          display: flex;
          gap: 5px;
          justify-content: center;
          justify-items: center;
          align-items: center;
        "
      >
        <button
          style="
            border-radius: 18px !important;
            background: #3397b2;
            border: #3397b2;
          "
          class="btn btn-primary"
          :disabled="!invoice.payment_method"
          @click="submitRefund"
        >
          {{ trans('submit refund') }}
        </button>
        <button class="btn btn-danger" @click="$router.back()">
          {{ trans('cancel') }}
        </button>
      </div>

      <RefundSaleReceipt
        :settings="settings"
        :user="user"
        :invoice="invoice"
      ></RefundSaleReceipt>
    </template>
    <template v-else>
      <div>
        <div
          style="
            background: #fcfcfc 0% 0% no-repeat padding-box;
            border-radius: 11px;
            opacity: 1;
            padding: 18px;
          "
        >
          <h1 class="first_header">
            {{ trans('the invoice has refunded before') }}
          </h1>
        </div>

        <div class="text-center">
          <img
            width="500"
            height="500"
            class="mt-4"
            src="@/assets/images/Invoice_refunded.gif"
            alt="Invoice_refunded"
          />
        </div>

        <div
          class="mt-4 text-center"
          style="
            background: #f9f9f9 0% 0% no-repeat padding-box;
            border-radius: 16px;
            width: 877px;
            padding: 34px;
            margin: auto;
            display: flex;
            justify-content: center;
            gap: 10px;
          "
        >
          <font-awesome-icon
            style="color: #e21818; font-size: 36px"
            icon="fa-sharp fa-solid fa-circle-exclamation"
          />
          <h1 class="last_header">
            {{ trans('the invoice you searched is refunded before') }}
          </h1>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import axios from 'axios'

import RefundSaleReceipt from './modals/RefundSaleReceipt.vue'
import Vue from 'vue'

export default {
  props: ['settings', 'user'],
  data() {
    return {
      pageLoaded: false,
      status: false,
      loaded: false,

      payment_types: [],
      payment_methods: [],
      accountLinks: [],
      alertType: '',
      refund: [],
      invoice: {},
      language: '',
      paid_amount: '',
      paymentMethods: [],
      // settings: [],
      x: '',
      cost: 0,
      costNew: 0,
      totalDiscounts: 0,
      costNewBeforeDiscount: 0,
      total_discount: 0,
      allItemData: [],
      total: 0,
      totalTax: 0,
    }
  },
  components: { RefundSaleReceipt },
  computed: {
    // refundSubTotal() {
    //   if (this.refund.length) {
    //     let total = 0
    //     for (let i = 0; i < this.refund.length; i++) {
    //       this.refund[i].cost = parseFloat(this.refund[i].cost).toFixed(2)
    //       this.refund[i].discount_amount = parseFloat(this.refund[i].discount_amount).toFixed(2)

    //       this.refund[i].subtotal =
    //         (parseFloat(this.refund[i].cost)- parseFloat(this.refund[i].discount_amount)) * parseInt(this.refund[i].quantity)
    //         total = total + this.refund[i].subtotal;
    //     }
    //     return total.toFixed(2)
    //   }
    //   return 0

    // },

    // refundTotal() {
    //   if (this.refund.length) {
    //     let total = 0
    //     for (let i = 0; i < this.refund.length; i++) {
    //       this.refund[i].cost = parseFloat(this.refund[i].cost).toFixed(2)
    //       this.refund[i].total =
    //         (parseFloat(this.refund[i].cost) +
    //           parseFloat(
    //             parseFloat(this.refund[i].tax_percentage / 100) *
    //               parseFloat(this.refund[i].cost)
    //           )) *
    //         parseInt(this.refund[i].quantity)
    //       total = total + this.refund[i].total
    //       // total = parseFloat(total).toFixed(2);
    //     }
    //     return total.toFixed(2)

    //   }
    //   return 0
    // },
    itemsSubtotal() {
      if (this.refund.length) {
        let subtotal = 0
        for (let i = 0; i < this.refund.length; i++) {
          this.refund[i].subtotal =
            parseFloat(this.refund[i].price - this.refund[i].discount_amount) *
            parseInt(this.refund[i].quantity)

          subtotal = subtotal + this.refund[i].subtotal
          return subtotal
        }
        return subtotal
      }
    },
    itemsTotal() {
      if (this.refund.length) {
        let total = 0
        for (let i = 0; i < this.refund.length; i++) {
          this.refund[i].total =
            this.itemsSubtotal +
            this.itemsSubtotal * (this.refund[i].tax_percentage / 100)

          total = total + this.refund[i].total
          return total
        }
        return total
      }
    },
    dic_pre() {
      let dicount_pre = parseFloat(this.refund[0].tax_percentage)
      return dicount_pre
    },
  },
  mounted() {
    setTimeout(() => {
      this.pageLoaded = true
    }, 3000)
    this.getInvoiceData(this.$route.params.id)
    this.refresh()
  },
  methods: {
    calculateTotals() {
      let totalValue = 0
      let totalValueBeforeDiscount = 0
      let totalTax = 0
      let totalTaxValue = 0
      let totalFinal = 0
      let totalValuebeforDiscount = 0

      //grouping tax
      let itemsData = _.chain(this.refund)
        .groupBy('tax_percentage')
        .map((value, key) => ({ tax: key, grouped: value }))
        .value()

      if (itemsData) {
        itemsData.map(item => {
          let s = 0
          let sumBefore = 0
          item.grouped.map(subItem => {
            // Price Before Discount
            subItem['valueBeforeDiscount'] =
              parseInt(subItem.quantity) * parseFloat(subItem.price).toFixed(2)
            sumBefore = sumBefore + subItem['valueBeforeDiscount']
            item['totalValuesBeforeDiscount'] = sumBefore

            subItem['valueAfterDiscount'] =
              parseInt(subItem.quantity) *
              parseFloat(subItem.price - subItem.discount_amount).toFixed(2)
            s = s + subItem['valueAfterDiscount']
            item['totalValuesAfterDiscount'] = s
          })
        })
      }

      let test = 0
      //without global discount
      if (itemsData) {
        itemsData.map((item, key) => {
          test = 0
          totalValue = parseFloat(totalValue) + item['totalValuesAfterDiscount']
          totalValueBeforeDiscount =
            parseFloat(totalValueBeforeDiscount) +
            item['totalValuesBeforeDiscount']
          totalTaxValue =
            parseFloat(totalTaxValue) +
            (item['tax'] / 100) * item['totalValuesAfterDiscount']
          totalFinal = parseFloat(totalFinal) + item['totalValuesAfterDiscount']
          item.grouped.map(subItem => {
            // Calculate All Total Before Discount
            totalValuebeforDiscount =
              parseFloat(totalValuebeforDiscount) +
              parseInt(subItem.quantity) * parseFloat(subItem.price).toFixed(2)
            if (subItem.discount_amount) {
              totalTax =
                parseFloat(totalTax) +
                parseInt(subItem.quantity) *
                  parseFloat(subItem.discount_amount).toFixed(2)
            }
            item['taxValue'] =
              (item.tax / 100) * item['totalValuesAfterDiscount']
          })
        })
      }
      totalFinal = totalFinal + totalTaxValue

      this.costNew = totalValue
      this.costNewBeforeDiscount = totalValueBeforeDiscount
      this.totalDiscounts = totalTax
      this.totalTax = totalTaxValue
      this.total = totalFinal

      console.log('this.costNew')
      console.log(this.costNew)

      console.log('costNewBeforeDiscount')
      console.log(this.costNewBeforeDiscount)

      //الاجمالي الكلي
      this.allItemData = itemsData
      this.invoice.discount_amount = parseFloat(totalTax).toFixed(2)
      this.total_discount = parseFloat(totalTax).toFixed(2)
    },

    AllAccounts(input = 'sales_invoice_account') {
      if (input == 'cash') {
        input = 'treasury'
      }
      axios
        .get('api/account/from/link?link_name=' + input)
        .then(res => {
          this.accountLinks = res.data.body.accounts
        })
        .catch(error => {
          console.log(error)
        })
    },
    refresh() {
      let url = '/api/cashier'

      this.itemsLoaded = false
      axios
        .get(url)
        .then(res => {
          this.products = res.data.body.products

          if (this.payment_types.length) {
            this.payment_types = this.payment_types.filter(item => {
              return item == this.invoice.payment_type
            })
          }

          this.itemsLoaded = true
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
      axios
        .get('/api/products')
        .then(res => {
          this.products = res.data.body.products.data

          this.itemsLoaded = true
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    getInvoiceData(id) {
      axios
        .get('api/sale-refund/load-invoice/' + id)
        .then(res => {
          if (res.data.status) {
            this.loaded = true

            this.status = res.data.status
            this.invoice = res.data.body.invoice
            this.payment_methods = res.data.body.payment_method
            this.payment_types = res.data.body.payment_type
            this.AllAccounts(this.invoice.payment_method)
          }
        })
        .catch(error => {
          console.log(error)
          this.loaded = false
        })
    },
    clearForm() {
      this.refund = []
      this.invoice = {}
    },

    refundAll(index, quantity) {
      if (quantity > 0) {
        let _this = this
        for (let i = 0; i < _this.invoice.items.length; i++) {
          if (_this.invoice.items[i].item_id == index) {
            _this.invoice.items[i].quantity = 0
            _this.x = Object.assign({}, _this.invoice.items[i])
            _this.invoice.items.splice(i, 1)
          }
        }
        if (_this.refund.length === 0) {
          _this.x.quantity = parseInt(quantity)
          _this.refund.push(_this.x)
        } else {
          if (
            _this.refund.filter(function (e) {
              return e.item_id === _this.x.item_id
            }).length > 0
          ) {
            _this.refund.filter(a => {
              if (a.item_id === _this.x.item_id) {
                return (a.quantity = parseInt(quantity) + parseInt(a.quantity))
              }
            })
          } else {
            _this.x.quantity = parseInt(quantity) + parseInt(_this.x.quantity)
            _this.refund.push(_this.x)
          }
        }
      }
      this.calculateTotals()
    },
    refundOneItem(index, quantity) {
      if (quantity > 0) {
        let _this = this
        for (let i = 0; i < _this.invoice.items.length; i++) {
          if (_this.invoice.items[i].item_id == index) {
            _this.invoice.items[i].quantity--
            _this.x = Object.assign({}, _this.invoice.items[i])
            if (_this.invoice.items[i].quantity === 0) {
              _this.invoice.items.splice(i, 1)
            }
          }
        }
        if (_this.refund.length === 0) {
          _this.x.quantity = 1
          _this.refund.push(_this.x)
        } else {
          if (
            _this.refund.filter(function (e) {
              return e.item_id === _this.x.item_id
            }).length > 0
          ) {
            _this.refund.filter(a => {
              if (a.item_id === _this.x.item_id) {
                return (a.quantity += 1)
              }
            })
          } else {
            _this.x.quantity = 1
            _this.refund.push(_this.x)
          }
        }
      }
      this.calculateTotals()
    },
    buyOneItem(index, quantity) {
      if (quantity > 0) {
        let _this = this
        for (let i = 0; i < _this.refund.length; i++) {
          if (_this.refund[i].item_id == index) {
            _this.refund[i].quantity--
            _this.x = Object.assign({}, _this.refund[i])
            if (_this.refund[i].quantity === 0) {
              _this.refund.splice(i, 1)
            }
          }
        }
        if (_this.invoice.items.length === 0) {
          _this.x.quantity = 1
          _this.invoice.items.push(_this.x)
        } else {
          if (
            _this.invoice.items.filter(function (e) {
              return e.item_id === _this.x.item_id
            }).length > 0
          ) {
            _this.invoice.items.filter(a => {
              if (a.item_id === _this.x.item_id) {
                return (a.quantity += 1)
              }
            })
          } else {
            _this.x.quantity = 1
            _this.invoice.items.push(_this.x)
          }
        }
      }
      this.calculateTotals()
    },
    submitRefund() {
      this.calculateTotals()

      if (this.refund.length > 0) {
        this.refund.forEach(item => {
          // item.tax_amount = item.tax_percentage > 0 ?
          //     (parseFloat(item.tax_percentage) / parseFloat(item.subtotal)) * 100 : 0
          // item.sale_price = item.sale_price ?? item.price
          // item.discount_amount = item.discount_amount ?? 0
          // item.discount_percentage = item.discount_percentage ?? 0
          item.has_attributes = 0
        })
      }

      if (this.invoice.payment_type == 'full') {
        this.invoice.paid_amount = this.total
        this.invoice.remaining_amount = 0
      } else {
        this.invoice.paid_amount = 0
        this.invoice.remaining_amount = this.total
      }
      // for (let i = 0; i < this.refund.length; i++) {
      //     this.refund[i].subtotal = this.refund[i].price;
      // }

      let data = {
        items: this.refund,
        purchase_id: this.invoice.id,
        provider_inv_number: this.invoice.provider_inv_number,
        invoice_date: this.invoice.created_at,
        remaining_amount: this.invoice.remaining_amount,
        paid_amount: this.invoice.paid_amount,
        payment_type: this.invoice.payment_type ?? 'installment', // will be reviewed

        discount_amount: this.invoice.discount_amount,
        discount_percentage:
          (this.invoice.discount_amount / this.total) * 100 ??
          this.invoice.discount_amount,
        subtotal:
          this.total - this.totalTax + parseFloat(this.invoice.discount_amount),
        total: this.total,
        sale_id: this.invoice.id,
        payment_method: this.invoice.payment_method,
        tax_amount: this.totalTax,
        tax_percentage: (this.totalTax / this.total) * 100,
        treasury_account: this.invoice.treasury_account,
      }
      if (this.invoice.treasury_account && this.refund.length) {
        axios
          .post('/api/sale-refunds', data)

          .then(res => {
            this.showToastError(res.data.message, res.data.custom_code)
            data.invoiceID = this.invoice.id
            data.qr = res.data.body.refund.qr
            data.settings = this.settings
            data.language = this.language
            data.total_string = res.data.body.refund.total_string
            data.created_at = res.data.body.refund.created_at
            data.receipType = 'MainPurchase'
            data.mainTitle = this.trans('purchase refund invoice')
            this.$router.push(`/refund-sale/view/${res.data.body.refund.id}`)

            SharedEvent.fire('open-refund-sale-receipt-modal', data)
          })
          .catch(error => {
            this.showToastError(
              error.response.data.message,
              error.response.data.custom_code
            )
          })
      } else if (!this.invoice.treasury_account) {
        this.showToastError(
          this.trans('pleaset_select_treasury_account'),
          '4000'
        )
      } else {
        this.showToastError(this.trans('please_select_product'), '4000')
      }
    },
  },
}
</script>

<style scoped>
table tr th {
  font-size: 16px;
}
table tr th,
table tr td {
  background-color: #fcfcfc !important;
}
table {
  margin-top: 32px !important;
}

.last_header {
  font: normal normal bold 29px/19px Bahij TheSansArabic;
}
.first_header {
  font: normal normal bold 24px/19px Bahij TheSansArabic;
}

@media (max-width: 768px) {
  .last_header {
    font: normal normal bold 18px/19px Bahij TheSansArabic;
    font-size: 20px !important;
  }

  .first_header {
    font: normal normal bold 20px/19px Bahij TheSansArabic;
    font-size: 22px !important;
  }
}
</style>
