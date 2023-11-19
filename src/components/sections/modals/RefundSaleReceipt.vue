<template>
  <section>
    <b-modal
      id="refund-sale-receipt-modal"
      hide-footer
      class="refund-sale-receipt-modal"
      ref="refund-sale-receipt-modal"
      centered
      scrollable
      size="xl"
      @hidden="closeRefundReceiptModal"
    >
      <div
        id="refund-invoice"
        :style="{
          direction: language == 'en' ? 'ltr !important' : 'rtl !important',
          'text-align':
            language == 'en' ? 'left !important' : 'right !important',
        }"
      >
        <div v-if="invoiceID > 0">
          <b-row
            :style="{
              direction: language == 'en' ? 'ltr' : 'rtl',
              textAlign: language == 'en' ? 'left' : 'right',
            }"
            class="mx-0 mb-3 justify-content-between"
          >
            <div class="col">
              <div class="row justify-content-between">
                <div class="col-auto p-0">
                  <div class="right_header_parent">
                    <h1 class="title">
                      <strong>
                        {{
                          user.language == 'en'
                            ? settings.company_name_en
                            : settings.company_name_ar
                        }}
                      </strong>
                    </h1>
                    <!-- <div style="display: flex; column-gap: 5px">
                        <span>
                          <b-badge
                            class="header_badge"
                            style="background-color: #59e0ac !important"
                            variant="success"
                          >
                            {{ trans(_.get(refund, 'payment_type')) }}
                          </b-badge>
                        </span>
                        <span>
                          <b-badge
                            class="header_badge"
                            style="background-color: #59e0ac !important"
                            variant="success"
                          >
                            {{ trans(_.get(refund, 'payment_method')) }}
                          </b-badge>
                        </span>
                      </div> -->
                  </div>
                  <h3 class="header_bottom" style="font-size:26px !important">
                    <!-- {{ refund.mainTitle }} -->
                    {{ trans('refund sale invoice') }}
                    {{ trans(_.get(refund, 'payment_type')) }} # {{ invoiceID }}
                  </h3>
                  <p class="paragraph_header_bottom">
                    <span>{{ trans('company tax number') }}</span>
                    <span>{{ settings.tax_number }}</span>
                  </p>
                  <p class="paragraph_header_bottom">
                    <span>{{ trans('invoice number') }}</span>
                    <span>{{ invoiceID }}</span>
                  </p>
                </div>
              </div>
            </div>

            <div class="col-auto p-0">
              <h2 class="left_header">
                <!-- {{ refund.customer.name ? refund.customer.name : '' }} -->
                {{ invoice.customer.name }}
              </h2>
              <p class="paragraph_left_header">
                <span>{{ trans('customer address') }} : </span>
                <span>
                  {{
                    _.get(invoice, 'customer.info.billing_address.city_name')
                  }}
                  -
                  {{
                    _.get(invoice, 'customer.info.billing_address.region_name')
                  }}
                  -
                  {{
                    _.get(invoice, 'customer.info.billing_address.street_name')
                  }}
                </span>
              </p>

              <!-- Phone -->
              <p class="paragraph_left_header">
                <span>{{ trans('customer phone') }} : </span>
                <span>{{ invoice.customer.phone }}</span>
              </p>

              <!-- tax number -->
              <p class="paragraph_left_header">
                <span>{{ trans('customer tax number') }} : </span>
                <span>{{ invoice.customer.tax_num }}</span>
              </p>
              <p class="paragraph_left_header">
                <span>{{ trans('invoice date') }} : </span>
                <span>{{ refund.created_at }}</span>
              </p>
            </div>
          </b-row>

          <div class="row justify-content-end m-0 products">
            <div class="col-12 header table_header_div">
              <div class="row align-items-center m-0">
                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('barcode') }}
                </div>
                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('product name') }}
                </div>
                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('unit') }}
                </div>
                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('quantity') }}
                </div>
                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('price') }}
                </div>

                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('discount precentage') }}
                </div>

                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('taxable amount') }}
                </div>
                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('added tax') }}
                </div>

                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('tax amount') }}
                </div>

                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('total value') }}
                </div>
              </div>
            </div>
            <div class="col-12 p-0">
              <div
                :style="
                  index % 2 !== 0
                    ? 'background: #F2F2F2'
                    : 'background: transparent'
                "
                v-for="(item, index) in items"
                :key="index"
                class="row align-items-center m-0 table_div_body"
              >
                <div class="col" style="padding: 0 5px">
                  {{ item.serial }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{ item.title }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{ item.unit_key }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{ item.quantity }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{ item.cost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}
                </div>

                <div class="col" style="padding: 0 5px">
                  % {{ item.discount_percentage }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{
                    parseFloat(item.discount_amount)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                  }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{
                    parseFloat(item.subtotal)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                  }}
                </div>
                <div class="col" style="padding: 0 5px">
                  % {{ item.tax_percentage }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{
                    parseFloat(item.tax_amount)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                  }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{
                    parseFloat(item.total)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                  }}
                </div>
              </div>
            </div>
          </div>

          <!--     Old Refund Invoice Totals-->
          <!--                    <div class="row  justify-content-between align-items-start mx-0"-->
          <!--                        style="margin-top: 30px; padding: 0 20px">-->
          <!--                        <div class="col-6">-->
          <!--                            <div class="row m-0">-->

          <!--                                <div style="margin-bottom: 15px" class="qr-code p-0">-->
          <!--                                    <img class="qr-image" style="max-width: 130px" :src="this.qr">-->
          <!--                                </div>-->
          <!--                            </div>-->
          <!--                        </div>-->
          <!--                        <div class="col-sm-auto col-12 totals mb-3" style="max-width: 50%">-->
          <!--                            <div class="row justify-content-between"-->
          <!--                                style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">-->
          <!--                                <b class="px-3"-->
          <!--                                    style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">{{trans('value')}}</b>-->
          <!--                                <b class="px-3" style="letter-spacing: 0px; color: #394E85;">{{ refundSubTotal }}&nbsp;-->
          <!--                                    {{ user.language == 'en' ? settings.currency_en : settings.currency_ar }}-->
          <!--                                </b>-->
          <!--                            </div>-->
          <!--                            <div class="row justify-content-between"-->
          <!--                                style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">-->
          <!--                                <b class="px-3"-->
          <!--                                    style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">{{trans('added tax')}}</b>-->
          <!--                                <b class="px-3" style="letter-spacing: 0px; color: #394E85;">-->
          <!--                                    {{ parseFloat(parseFloat(total_refunded) - parseFloat(subtotal_refunded)).toFixed(2)-->
          <!--                                    }}&nbsp; {{ user.language == 'en' ? settings.currency_en : settings.currency_ar }}-->
          <!--                                </b>-->
          <!--                            </div>-->

          <!--                            <div class="row justify-content-between"-->
          <!--                                 style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">-->
          <!--                                <b class="px-3"-->
          <!--                                   style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">{{trans('discount amount')}}</b>-->
          <!--                                <b class="px-3" style="letter-spacing: 0px; color: #394E85;">-->
          <!--                                    {{ parseFloat(discount_amount).toFixed(2)-->
          <!--                                    }}&nbsp; {{ user.language == 'en' ? settings.currency_en : settings.currency_ar }}-->
          <!--                                </b>-->
          <!--                            </div>-->

          <!--                            <div class="row justify-content-between"-->
          <!--                                style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">-->
          <!--                                <b class="px-3"-->
          <!--                                    style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">{{trans('price after tax')}}</b>-->
          <!--                                <b class="px-3" style="letter-spacing: 0px; color: #394E85;">-->
          <!--                                    {{ parseFloat(total_refunded).toFixed(2)-->
          <!--                                    }}&nbsp; {{ user.language == 'en' ? settings.currency_en : settings.currency_ar }}-->
          <!--                                </b>-->
          <!--                            </div>-->

          <!--                            <div class="row justify-content-between"-->
          <!--                                style="background: #137B97 0% 0% no-repeat padding-box; border-radius: 59px;font: normal normal bold 13px/20px Tahoma; letter-spacing: 0px; color: #FFFFFF;">-->
          <!--                                <b class="px-3">{{ trans('total') }}</b>-->
          <!--                                <b class="px-3" style="font: normal normal bold 13px/20px Tahoma;">-->
          <!--                                    {{ total_refunded }}&nbsp;-->
          <!--                                    {{ user.language == 'en' ? settings.currency_en : settings.currency_ar }}-->
          <!--                                </b>-->
          <!--                            </div>-->

          <!--                        </div>-->
          <!--                    </div>-->

          <div
            class="row justify-content-between align-items-start mx-0"
            style="margin-top: 30px; padding: 0 20px"
          >
            <div class="col-6">
              <div class="row m-0">
                <p
                  v-if="refund.note"
                  style="
                    font: normal normal bold 13px/20px Tahoma;
                    letter-spacing: 0px;
                    color: #137b97;
                  "
                >
                  {{ trans('invoice notes') }}
                </p>
                <p
                  v-if="refund.note"
                  style="
                    font: normal normal 300 13px/26px Tahoma;
                    letter-spacing: 0px;
                    color: #394e85;
                    padding-bottom: 0;
                    border-bottom: 1px solid 1px solid rgb(176, 190, 227);
                  "
                >
                  {{ refund.note }}
                </p>
                <div style="margin-bottom: 15px" class="qr-code p-0">
                  <img class="qr-image" :src="refund.qr" />
                </div>
              </div>
            </div>
            <div class="col-sm-auto col-12 totals mb-3" style="max-width: 50%">
              <div
                class="row justify-content-between mb-1"
                style="
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
                  >{{ language == 'en' ? 'Total Value' : 'اجمالي القيمة' }}</b
                >
                <b class="px-3" style="letter-spacing: 0px; color: #394e85"
                  >{{ parseFloat(refund.subtotal).toFixed(2) }}&nbsp;{{
                    language == 'en'
                      ? settings.currency_en
                      : settings.currency_ar
                  }}
                </b>
              </div>

              <div
                class="row justify-content-between mb-1"
                style="
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
                  >{{
                    language == 'en' ? 'Total discount' : ' إجمالي الخصم'
                  }}</b
                >
                <b class="px-3" style="letter-spacing: 0px; color: #394e85">
                  {{ parseFloat(refund.discount_amount).toFixed(2) }}&nbsp;
                  {{
                    language == 'en'
                      ? settings.currency_en
                      : settings.currency_ar
                  }}
                </b>
              </div>

              <div
                class="row justify-content-between mb-1"
                style="
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
                  >{{
                    language == 'en' ? 'Added Tax' : ' اجمالي القيمة بعد الخصم'
                  }}</b
                >
                <b class="px-3" style="letter-spacing: 0px; color: #394e85">
                  {{
                    parseFloat(
                      parseFloat(refund.subtotal).toFixed(2) -
                        parseFloat(refund.discount_amount).toFixed(2)
                    ).toFixed(2)
                  }}&nbsp;
                  {{
                    language == 'en'
                      ? settings.currency_en
                      : settings.currency_ar
                  }}
                </b>
              </div>

              <div
                class="row justify-content-between mb-1"
                style="
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
                  >{{
                    language == 'en'
                      ? 'Added Tax'
                      : ' يضاف ضريبة القيمة المضافة'
                  }}
                  ({{ refund.items[0].tax_percentage }} %)
                </b>
                <b class="px-3" style="letter-spacing: 0px; color: #394e85">
                  {{ parseFloat(refund.tax_amount).toFixed(2) }}&nbsp;
                  {{
                    language == 'en'
                      ? settings.currency_en
                      : settings.currency_ar
                  }}
                </b>
              </div>

              <!--                            <div class="row justify-content-between mb-1"-->
              <!--                                 style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">-->
              <!--                                <b class="px-3 "-->
              <!--                                   style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">{{trans('remaining amount')}}</b>-->
              <!--                                <b class="px-3 " style="letter-spacing: 0px; color: #394E85;">-->
              <!--                                    {{-->
              <!--                                        parseFloat(refund.remaining_amount).toFixed(-->
              <!--                                            2-->
              <!--                                        )-->
              <!--                                    }}&nbsp;-->
              <!--                                    {{-->
              <!--                                        language == "en"-->
              <!--                                            ? settings.currency_en-->
              <!--                                            : settings.currency_ar-->
              <!--                                    }}-->
              <!--                                </b>-->

              <!--                            </div>-->

              <!--                            <div class="row justify-content-between mb-1"-->
              <!--                                 style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">-->
              <!--                                <b class="px-3 "-->
              <!--                                   style="font: normal normal bold 13px/20px Tahoma;letter-spacing: 0px;color: #137B97;">{{trans('paid amount')}}</b>-->
              <!--                                <b class="px-3 " style="letter-spacing: 0px; color: #394E85;">-->
              <!--                                    {{-->
              <!--                                        parseFloat(refund.paid_amount).toFixed(-->
              <!--                                            2-->
              <!--                                        )-->
              <!--                                    }}&nbsp;-->
              <!--                                    {{-->
              <!--                                        language == "en"-->
              <!--                                            ? settings.currency_en-->
              <!--                                            : settings.currency_ar-->
              <!--                                    }}-->
              <!--                                </b>-->

              <!--                            </div>-->

              <div
                class="row justify-content-between"
                style="
                  background: 0% 0% no-repeat padding-box padding-box         #137b97;           border-radius: 9px;
                  font: bold 13px / 20px Tahoma;
                  color: rgb(255, 255, 255);
                  padding: 14px 0;
                  margin-top: 10px;
                "
              >
                <b class="px-3">{{ trans('total') }}</b>
                <b
                  class="px-3"
                  style="font: normal normal bold 13px/20px Tahoma"
                >
                  {{ parseFloat(refund.total).toFixed(2) }}
                  {{
                    language == 'en'
                      ? settings.currency_en
                      : settings.currency_ar
                  }}
                </b>
              </div>

              <div
                class="row justify-content-between"
                style="
                  background: 0% 0% no-repeat padding-box padding-box                     rgb(242 242 242);
                  border-radius: 9px;
                  font: bold 13px / 20px Tahoma;
                  color: #000;
                  padding: 14px;
                  justify-content: center !important;
                  margin-top: 10px;
                "
              >
                <b class="px-3">
                  {{ refund.total_string }}
                </b>
              </div>

              <div
                class="row justify-content-between mb-1"
                style="
                  font: normal normal bold 13px/20px Tahoma;
                  letter-spacing: 0px;
                  color: #137b97;
                  margin-top: 15px;
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
                  {{ trans('payment method') }}
                </b>
                <b
                  class="px-3"
                  style="letter-spacing: 0px; color: #394e85"
                  v-if="refund.payment_type != 'installment'"
                >
                  {{ trans(refund.payment_method) }}
                </b>
                <b
                  class="px-3"
                  style="letter-spacing: 0px; color: #394e85"
                  v-else
                >
                  {{ trans('installment') }}
                </b>
              </div>
            </div>
          </div>

          <b-row
            :style="{
              direction: language == 'en' ? 'ltr' : 'rtl',
              textAlign: language == 'en' ? 'left' : 'right',
            }"
            class="justify-content-around invoice-footer m-0"
          >
            <div class="col-auto">
              <p
                style="
                  color: rgb(19, 123, 151);
                  font-size: 21px !important;
                  font-weight: 700;
                "
              >
                جميع الحقوق محفوظة لشركة حل سوفت © 2023
              </p>
            </div>
            <div class="col-auto">
              <p
                style="
                  color: #394e85;
                  margin-bottom: 30px;
                  font-size: 19px !important;
                  display: flex;
                  gap: 20px;
                  align-items: center;
                "
              >
                <font-awesome-icon
                  style="
                    border: 1px solid #f2f2f2;
                    color: #f2f2f2;
                    padding: 5px;
                    border-radius: 50%;
                  "
                  icon="fa-solid fa-globe"
                />
                <span> {{ settings.website }}</span>
              </p>
            </div>
          </b-row>
        </div>
        <div v-else>
          <i
            class="fa fa-spinner fa-spin"
            style="font-size: 80px; margin-top: 50px"
          ></i>
        </div>
      </div>

      <div class="col-12 text-center invoice-btns">
        <b-button
          class="m-2"
          style="
            background: #137b97 0% 0% no-repeat padding-box;
            border-radius: 50px !important;
            font: normal normal 300 14px/11px Tahoma;
            letter-spacing: 0px;
            color: #ffffff;
            padding: 15px 50px;
          "
          @click="printReceipt"
        >
          {{ trans('print') }}
        </b-button>
        <b-button
          class="m-2"
          style="
            background: #cf1212 0% 0% no-repeat padding-box;
            border-radius: 50px !important;
            font: normal normal 300 14px/11px Tahoma;
            letter-spacing: 0px;
            color: #ffffff;
            border: none;
            padding: 15px 50px;
          "
          @click="closeRefundReceiptModal"
        >
          {{ trans('close') }}
        </b-button>
      </div>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['settings', 'user', 'invoice'],
  data() {
    return {
      customEvents: [
        {
          eventName: 'open-refund-sale-receipt-modal',
          callback: this.openRefundSaleReceiptModal,
        },
      ],
      message: '',
      alertType: '',
      // settings: {},
      language: '',
      refund: {},
      cssText: `
                              @media print {
  * {
              overflow: visible !important;
              margin: 0;
              padding: 0;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              outline: none;
              text-transform: none;
              text-decoration: none;
          }
              @page {
          margin:5px;
      }
      body {
          padding-top: 10px;
          padding-bottom: 10px ;
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
          .col-4 {
              flex: 0 0 33.333333%;
              max-width: 33.333333%;
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
  
  
          .mb-3, .my-3 {
              margin-bottom: 1rem !important;
          }
          .mx-0 {
              margin: 0;
          }
                              }
                          `,
      invoiceID: '',
      items: {},
      total_refunded: '',
      subtotal_refunded: '',
      discount_amount: '',
      created_at: '',
      qr: '',
      provider: {
        name: '',
        phone: '',
        address: '',
        tax_num: '',
      },
      customer: { name: '', phone: '', address: '', tax_num: '' },
    }
  },
  computed: {
    refundSubTotal() {
      if (this.items.length) {
        let total = 0
        for (let i = 0; i < this.items.length; i++) {
          total = parseFloat(total) + parseFloat(this.items[i].subtotal)
          // total = parseFloat(total).toFixed(2);
        }
        return total.toFixed(2)
      }
      return 0
    },
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
  mounted() {
    this.initPrintMe()
    console.log(this.provider)
  },
  methods: {
    openRefundSaleReceiptModal(data) {
      this.refund = data

      this.qr = data.qr
      this.settings = data.settings
      this.items = data.items
      this.invoiceID = data.invoiceID
      this.language = data.language
      this.total_refunded = data.total
      this.subtotal_refunded = data.subtotal
      this.discount_amount = data.discount_amount
      this.created_at = data.created_at
      //   this.provider = this.invoice.provider
      this.customer = data.customer

      this.$refs['refund-sale-receipt-modal'].show()
    },
    closeRefundReceiptModal() {
      this.$bvModal.hide('refund-sale-receipt-modal')

      this.$router.push('/refund-sales')
    },
    printReceipt() {
      //invoke Print me From Mixin //
      this.printMe('#refund-invoice', this.cssText)
    },
  },
}
</script>

<style scoped>
.products {
  background-color: transparent !important;
}

.products .header {
  font-weight: bold !important;
}

.products div {
  font-size: 16px !important;
  line-height: 16px !important;
}

h1 {
  font-size: 28px !important;
  line-height: 34px !important;
}

h2 {
  font-size: 26px !important;
  line-height: 30px !important;
}

h4 {
  font-size: 20px !important;
  font-weight: bold !important;
  line-height: 34px !important;
}

.totals div {
  font-size: 18px !important;
  line-height: 30px !important;
}

.totals b {
  font-size: 18px !important;
  line-height: 30px !important;
}

.table-responsive {
  min-height: 50px;
  border-radius: 10px;
  border: 1px solid #dee2e6;
}

.qr-code img {
  max-width: 100%;
}

h3 {
  font-size: 26px !important;
  font-weight: bold !important;
  line-height: 26px !important;
}

p {
  font-size: 16px !important;
  line-height: 25px !important;
}

@media screen and (max-width: 767px) {
  h3 {
    font-size: 20px !important;
  }

  .badge {
    font-size: 16px !important;
  }

  p {
    font-size: 16px !important;
  }

  th,
  td {
    font-size: 16px !important;
  }
}

.badge {
  font-size: 20px;
  padding: 10px;
  border-radius: 14px;
}

.bill-info {
  box-shadow: 0px 1px 4px #0000001a;
  border-radius: 11px;
  padding: 10px 30px !important;
  margin-bottom: 16px;
}

.bill-info p {
  font-size: 18px;
  padding-bottom: 0 !important;
}

.total {
  color: #707070;
  font-weight: bold;
  font-size: 16px;
}

.refund tr:not(:last-of-type) {
  background-color: rgb(220, 53, 69);
  color: #fff;
}

.refund tr:not(:last-of-type) td {
  background-color: rgb(220, 53, 69);
  color: #fff;
}

.refund tr:not(:last-of-type) td .total {
  color: #fff;
}

th {
  font-weight: bold !important;
  background-color: #eeeeee;
}

th,
td {
  border-bottom: 1px solid #dee2e6 !important;
  font-size: 20px;
  white-space: inherit;
  text-align: center !important;
  vertical-align: middle !important;
  /* border-right: 1px solid #dee2e6;
          border-left: 1px solid #dee2e6; */
}

.invoice-btns .btn-success {
  background: #62c83f;
  border-color: #62c83f;
}

.invoice-btns .btn-danger {
  background: #cf1212;
  border-color: #cf1212;
}

h1 {
  font-size: 36px;
}

p {
  font-size: 20px;
}

.invoice-footer {
  background: transparent;
}

.invoice-footer p {
  font-size: 16px;
}

/* New Design */

.right_header_parent .header_badge {
  padding: 19px 24px 19px 24px !important;
  border-radius: 10px !important;
}

.right_header_parent {
  display: flex;
  gap: 20px;
  align-items: baseline;
}
.right_header_parent > .title {
  color: #137b97;
  font-size: 29px !important;
  font-weight: 700 !important;
}

.header_bottom {
  color: rgb(57, 78, 133);
  margin-top: 20px;
  font-size: 30px !important;
  font-weight: 600 !important;
}
.paragraph_header_bottom {
  color: rgb(57, 78, 133);
  display: flex;
  gap: 20px;
  font-size: 20px !important;
  margin-top: 15px;
  font-weight: 500;
}
.left_header {
  color: rgb(19 123 151);
  font-weight: 600;
  margin-bottom: 20px;
}
.paragraph_left_header {
  color: rgb(57, 78, 133);
  margin: 0;
  font-size: 19px !important;
  font-weight: 400;
}
.table_header_div {
  background: 0% 0% no-repeat padding-box padding-box rgb(19, 123, 151);
  border-radius: 9px;
  text-align: center;
  letter-spacing: 0px;
  color: rgb(255, 255, 255);
  padding: 30px 0px;
}
.table_header_div_chlid {
  font-size: 21px !important;
  font-weight: 500;
}
.table_div_body {
  border-radius: 10px;
  padding: 35px 0px;
  text-align: center;
  letter-spacing: 0px;
  color: rgb(57, 78, 133);
}
.table_div_body div {
  font-size: 20px !important;
}

div.modal.my-modal .modal-dialog {
  width: 1700px !important;
}
.qr-image {
  width: 297px !important;
  border: 6px solid #f2f2f2 !important;
  border-radius: 7px !important;
}
/*@media (min-width: 1200px) {*/
/*    #purchase-receipt-modal .modal-xl {*/
/*        max-width: 1700px !important;*/
/*    }*/
/*}*/

/*@media (min-width: 992px) {*/
/*    #purchase-receipt-modal .modal-lg, #purchase-receipt-modal .modal-xl {*/
/*        max-width: 800px !important;*/
/*    }*/
/*}*/

.table_header_div_chlid,
.table_div_body div {
  width: 10%;
}
</style>
