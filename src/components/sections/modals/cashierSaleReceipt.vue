<template>
    <section>
      <b-modal
        :no-close-on-backdrop="true"
        id="sale-receipt-modal"
        hide-footer
        class="sale-receipt-modal"
        ref="sale-receipt-modal"
        centered
        scrollable
        size="xl"
        @hidden="closeSaleReceiptModal"
      >
        <!-- small invoice -->
  
        <SmallInvoiceSale id="smallInvoice" class="row d-none" :sale="sale" :settings="settings" :language="language"/>
  
        <div
          class="row d-none"
          style="
            width: 274px;
            padding-right: 50px;
            text-align: center;
            margin: 0px auto;
            justify-content: center;
            direction: rtl;
          "
        >
          <div class="col-12" style="padding: 0px">
            <h3 class="" style="font-size: 24px; font-weight: bold; margin: 0px">
            
              {{
                getSetting('company_name')
              }}
            
            </h3>
            <h4 class="" style="font-size: 18px; font-weight: bold; margin: 0px">
              {{ trans('simplified tax invoice') }}
            </h4>
            <span>
              <b-badge class="header_badge" variant="success">
                {{ trans(_.get(sale, 'payment_type')) }}
              </b-badge>
            </span>
            <span>
              <b-badge
                class="header_badge"
                style="background-color: #59e0ac !important"
                variant="success"
              >
                {{ trans(_.get(sale, 'payment_method')) }}
              </b-badge>
            </span>
          </div>
          <div class="col-12" style="padding: 0px">
            <p style="font-size: 16px; margin: 0px; padding: 0px">
              <strong>{{ trans('tax_num') + ':' }}</strong>
              {{ getSetting('tax_number')}}
            </p>
          </div>
          <div class="col-12" style="padding: 0px">
            <p
              v-if="!_.isEmpty(_.get(sale, 'customer.name'))"
              style="font-size: 16px; margin: 0px; padding: 0px"
            >
              <strong>{{ trans('customer name') }}</strong>
              {{ _.get(sale, 'customer.name') }}
            </p>
            <p
              v-if="!_.isEmpty(_.get(sale, 'customer.phone'))"
              style="font-size: 16px"
            >
              <strong>{{ trans('customer phone') }}</strong>
              {{ _.get(sale, 'customer.phone') }}
            </p>
            <p
              v-if="!_.isEmpty(_.get(sale, 'customer.tax_num'))"
              style="font-size: 16px"
            >
              <strong>{{ trans('customer tax number') }}</strong>
              {{ _.get(sale, 'customer.tax_num') }}
            </p>
          </div>
          <!-- <div class="col-12" style="padding: 0px 0px 10px 0px; border-bottom: 2px dashed rgb(112, 112, 112);">
                    <p style="font-size: 16px; margin: 0px; padding: 0px; text-align: center;">
                        <strong>{{ settings.inv_header }}</strong>
                    </p>
                </div> -->
          <div class="col-12" style="padding: 0">
            <hr class="my-3" style="margin: 0" />
          </div>
          <div
            class="col-12"
            style="padding: 0px; border-bottom: 2px dashed rgb(112, 112, 112)"
          >
            <div class="row" style="margin: 0">
              <div class="col-12" style="padding: 0">
                <p style="font-size: 16px; margin: 0px; padding: 0px">
                  <strong>{{ trans('created at') + ':' }}</strong>
                  {{ sale.updated_at }}
                </p>
              </div>
              <div class="col-12" style="padding: 0">
                <p style="font-size: 16px; margin: 0px; padding: 0px">
                  <strong>{{ trans('invoice number') }}</strong>
                  : {{ sale.id }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-12"
            style="padding: 4px 0px 0px"
            v-for="(item, index) in sale.items"
            :key="'sale' + index"
          >
            <h2 style="font-size: 14px; margin: 0px">
              {{ item.title }}
            </h2>
            <div class="row" style="margin: 0px; justify-content: space-between">
              <div
                class="col-auto"
                style="padding: 0px; font-size: 12px; margin-bottom: 0"
              >
                <strong>{{ trans('quantity') }}</strong>
                : {{ item.quantity }}
              </div>
              <div
                class="col-auto"
                style="padding: 0px; font-size: 12px; margin-bottom: 0"
              >
                <strong>{{ trans('price') }}</strong>
                :
                {{
                  parseFloat(
                    parseFloat(item.price) +
                      parseFloat(item.tax_percentage / 100) *
                        parseFloat(item.price)
                  ).toFixed(2)
                }}
              </div>
              <div
                class="col-auto"
                style="padding: 0px; font-size: 12px; margin-bottom: 0"
              >
                <strong>{{ trans('total') }}</strong>
                :
                {{
                  parseFloat(
                    (parseFloat(item.price) +
                      parseFloat(item.tax_percentage / 100) *
                        parseFloat(item.price)) *
                      item.quantity
                  ).toFixed(2)
                }}
              </div>
              <div class="col-12" style="padding: 0">
                <hr class="my-3" style="margin: 0" />
              </div>
            </div>
          </div>
          <div v-if="sale.note !== null" class="col-12" style="padding: 0">
            <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
              {{ trans('invoice notes') }}
            </h1>
            <span style="margin: 0; font-size: 14px">
              <i class="fa fa-quote-right" aria-hidden="true"></i>
              {{ sale.note }}
              <i class="fa fa-quote-left" aria-hidden="true"></i>
            </span>
          </div>
  
          <div class="col-12">
            <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
              <div class="row">
                <div class="col-12">
                  <div class="total_css">
                    <span>{{ trans('total value before discount') }} : </span>
                    <span>
                      {{ parseFloat(sale.subtotal).toFixed(2) }}
                      {{ getSetting('currency', settings) }}
                    </span>
                  </div>
                </div>
              </div>
            </h1>
          </div>
          <div class="col-12">
            <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
              <div class="row">
                <div class="col-12">
                  <div class="total_css">
                    <span>{{ trans('total discount') }} : </span>
                    <span
                      >{{ parseFloat(sale.discount_amount).toFixed(2) }}&nbsp;
                      {{ getSetting('currency', settings) }}</span
                    >
                  </div>
                </div>
              </div>
            </h1>
          </div>
          <div class="col-12">
            <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
              <div class="row">
                <div class="col-12">
                  <div class="total_css">
                    <span>{{ trans('total value after discount') }} : </span>
                    <span
                      >{{
                        parseFloat(
                          parseFloat(sale.subtotal).toFixed(2) -
                            parseFloat(sale.discount_amount).toFixed(2)
                        ).toFixed(2)
                      }}
                      {{ getSetting('currency', settings) }}</span
                    >
                  </div>
                </div>
              </div>
            </h1>
          </div>
          <div class="col-12">
            <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
              <div class="row">
                <div class="col-12">
                  <div class="total_css">
                    <span>{{ trans('added tax') }} : </span>
                    <span
                      >{{ parseFloat(sale.tax_amount).toFixed(2) }}
                      {{ getSetting('currency', settings) }}</span
                    >
                  </div>
                </div>
              </div>
            </h1>
          </div>
          <div class="col-12">
            <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
              <div class="row">
                <div class="col-12">
                  <div class="total_css">
                    <span>{{ trans('total value') }} : </span>
                    <span
                      >{{ parseFloat(sale.total).toFixed(2) }}
                      {{ getSetting('currency', settings) }}</span
                    >
                  </div>
                </div>
              </div>
            </h1>
          </div>
  
          <hr v-if="has_refund" class="col-12" />
          <h4
            v-if="has_refund"
            class=""
            style="font-size: 18px; font-weight: bold; margin: 0px"
          >
            {{ trans('refund') }}
          </h4>
          <div v-if="has_refund" class="col-12">
            <div
              class="col-12"
              style="padding: 14px 0px 0px"
              v-for="(item, index) in refund.items"
              :key="'sale' + index"
            >
              <h2 style="font-size: 14px; margin: 0px">
                {{ language == 'en' ? item.title : item.title_ar }}
              </h2>
              <div
                class="row"
                style="margin: 0px; justify-content: space-between"
              >
                <div
                  class="col-auto"
                  style="padding: 0px; font-size: 12px; margin-bottom: 0"
                >
                  <strong>{{ trans('quantity') }}</strong>
                  : {{ item.quantity }}
                </div>
                <div
                  class="col-auto"
                  style="padding: 0px; font-size: 12px; margin-bottom: 0"
                >
                  <strong>{{ trans('price') }}</strong>
                  :
                  {{
                    parseFloat(
                      parseFloat(item.price) +
                        parseFloat(item.tax_percentage / 100) *
                          parseFloat(item.price)
                    ).toFixed(2)
                  }}
                </div>
                <div
                  class="col-auto"
                  style="padding: 0px; font-size: 12px; margin-bottom: 0"
                >
                  <strong>{{ trans('total') }}</strong>
                  :
                  {{
                    parseFloat(
                      (parseFloat(item.price) +
                        parseFloat(item.tax_percentage / 100) *
                          parseFloat(item.price)) *
                        item.quantity
                    ).toFixed(2)
                  }}
                </div>
                <div class="col-12" style="padding: 0">
                  <hr class="my-3" style="margin: 0" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="has_refund" class="col-12" style="padding: 0">
            <h1 style="font-size: 18px; font-weight: bold; margin-top: 0">
              <div
                class="row"
                style="margin: 0px; justify-content: space-between"
              >
                <div class="col-12" style="padding: 0px; text-align: center">
                  {{ trans('refund total') }}
                  {{ parseFloat(refund.total_refunded).toFixed(2) }}
                  {{
                   getSetting('currency', settings)
                  }}
                </div>
              </div>
            </h1>
          </div>
          <div v-if="has_refund" class="col-12" style="padding: 0">
            <h1 style="font-size: 18px; font-weight: bold; margin-top: 0">
              <div
                class="row"
                style="margin: 0px; justify-content: space-between"
              >
                <div class="col-12" style="padding: 0px; text-align: center">
                  {{ trans('added tax') }}
                  {{
                    (
                      parseFloat(refundTotal) -
                      parseFloat(refundSubtotal) +
                      parseFloat(refund.total_refunded) -
                      parseFloat(refund.subtotal_refunded)
                    ).toFixed(2)
                  }}
                  {{
                    getSetting('currency', settings)
                  }}
                </div>
              </div>
            </h1>
          </div>
          <div v-if="has_refund" class="col-12" style="padding: 0">
            <h1 style="font-size: 18px; font-weight: bold; margin-top: 0">
              <div
                class="row"
                style="margin: 0px; justify-content: space-between"
              >
                <div class="col-12" style="padding: 0px; text-align: center">
                  {{ trans('total after refund') }}
                  {{
                    (
                      parseFloat(sale.total) - parseFloat(refund.total_refunded)
                    ).toFixed(2)
                  }}
                  {{
                    getSetting('currency', settings)
                  }}
                </div>
              </div>
            </h1>
          </div>
          <!-- <div class="col-12" style="padding: 0;margin-top: 20px;margin-bottom: 20px;">
                    <div class="row" style="margin: 0px; justify-content: space-between;">
                        <div class="col-auto" style="padding: 0px; font-size: 14px; font-weight: bold;">
                            {{ settings.inv_footer_rtl }}
                        </div>
                        <div class="col-auto" style="padding: 0px; font-size: 14px; font-weight: bold;">
                            {{ settings.inv_footer_ltr }}
                        </div>
                    </div>
                </div> -->
          <div class="col-12" style="padding: 0">
            <h3
              style="
                font-size: 14px;
                text-align: center;
                padding: 0px;
                margin: 0px;
                border-bottom: 0px none;
              "
            >
              <strong>{{ trans('website') }}</strong> :
              {{ getSetting('website')}}
            </h3>
          </div>
          <div v-if="!has_refund" class="col-12" style="padding: 0">
            <img class="qr-image" :src="sale.qr" />
          </div>
          <div v-if="has_refund" class="col-12" style="padding: 0">
            <img class="qr-image" :src="refund.qr" />
          </div>
        </div>
  
        <!-- general invoice -->
  
        <general-sale-invoice
          :sale="sale"
          :refund="refund"
          :settings="settings"
          id="generalInvoice"
        />
  
        <!-- show invoice -->
  
        <div
          id="sale-invoice"
          :style="{
            direction: language == 'en' ? 'ltr !important' : 'rtl !important',
            'text-align':
              language == 'en' ? 'left !important' : 'right !important',
          }"
        >
          <div v-if="sale.id > 0">
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
                      <h1 class="title" style="    line-height: 2 !important;">
                        <strong>
                          {{
                            getSetting('company_name')
                          }}
                        </strong>
                      </h1>
                      <!-- <div style="display: flex;column-gap: 5px;">
                                        <span>
                                            <b-badge class="header_badge" style="background-color: #59E0AC !important;" variant="success">
                                                {{trans(_.get(sale,'payment_type'))}}
                                            </b-badge>
                                        </span>
                                        <span v-if="sale.payment_type != 'installment'">
                                            <b-badge class="header_badge" style="background-color: #59E0AC !important;" variant="success">
                                                {{trans(_.get(sale,'payment_method'))}}
                                            </b-badge>
                                        </span>
                                  
                                        </div> -->
                    </div>
                    <h3 class="header_bottom" style="font-size:26px !important">
                      {{ trans('sales_invoice') }}
                      {{ trans(_.get(sale, 'payment_type')) }} # {{ sale.id }}
                    </h3>
                    <p class="paragraph_header_bottom">
                      <span>{{ trans('company tax number') }} : </span>
                      <span>{{    getSetting('tax_number') }}</span>
                    </p>
                    <p class="paragraph_header_bottom">
                      <span>{{ trans('invoice number') }} : </span>
                      <span>{{ sale.id }}</span>
                    </p>
                  </div>
                </div>
              </div>
  
              <div class="col-auto p-0">
                <h2 class="left_header" style="    line-height: 2 !important;">{{ _.get(sale, 'customer.name') }}</h2>
                <p class="paragraph_left_header">
                  <span>{{ trans('customer address') }} : </span>
                  <span>
                    {{ _.get(sale, 'customer.info.billing_address.city_name') }} -
                    {{ _.get(sale, 'customer.info.billing_address.region_name') }}
                    -
                    {{ _.get(sale, 'customer.info.billing_address.street_name') }}
                  </span>
                </p>
                <p class="paragraph_left_header">
                  <span>{{ trans('customer phone') }} : </span>
                  <span>
                    {{ _.get(sale, 'customer.phone') }}
                  </span>
                </p>
                <!-- v-if="sale.provider_tax_number" -->
                <p class="paragraph_left_header">
                  <span>{{ trans('customer_tax_number') }} : </span>
                  <span>{{ sale.customer.tax_num }}</span>
                </p>
                <p class="paragraph_left_header">
                  <span>{{ trans('invoice date') }} : </span>
                  <span>{{ sale.updated_at }}</span>
                </p>
              </div>
            </b-row>
  
            <div class="row justify-content-end m-0 products">
              <div class="col-12 header table_header_div">
                <div class="row align-items-center m-0">
                  <div class="table_header_div_chlid" style="padding: 0 5px">
                    {{ trans('barcode') }}
                  </div>
                  <div class="table_header_div_chlid" style="padding: 0 5px">
                    {{ trans('product name') }}
                  </div>
                  <div class="table_header_div_chlid" style="padding: 0 5px">
                    {{ trans('unit') }}
                  </div>
                  <!-- <div class="col table_header_div_chlid" style="padding: 0 5px;">{{trans('item')}}</div> -->
                  <div class="col table_header_div_chlid" style="padding: 0 5px">
                    {{ trans('quantity') }}
                  </div>
                  <div class="col table_header_div_chlid" style="padding: 0 5px">
                    {{ trans('price') }}
                  </div>
  
                  <div class="col table_header_div_chlid" style="padding: 0 5px">
                    {{ trans('discount percentage') }}
                  </div>
  
                  <div class="col table_header_div_chlid" style="padding: 0 5px">
                    {{ trans('discount fixed') }}
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
                    {{ trans('total') }}
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
                  v-for="(item, index) in sale.items"
                  :key="index"
                  class="row align-items-center m-0 table_div_body"
                >
                  <div style="padding: 0 5px">
                    {{ item.serial }}
                  </div>
                  <div style="padding: 0 5px">
                    {{ item.title }}
                  </div>
                  <div style="padding: 0 5px">
                    {{ item.unit_key }}
                  </div>
                  <div class="col" style="padding: 0 5px">
                    {{ item.quantity }}
                  </div>
                  <div class="col" style="padding: 0 5px">
                    {{
                      parseFloat(item.price)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                  </div>
  
                  <div class="col" style="padding: 0 5px">
                    %{{ item.discount_percentage }}
                  </div>
  
                  <div class="col">
                    {{
                      parseFloat(item.discount_amount)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                  </div>
                  <div class="col" style="padding: 0 5px">
                    {{
                      parseFloat (  (item.price)- (item.discount_amount) * item.quantity)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                  </div>
                  <div class="col">% {{ item.tax_percentage }}</div>
                  <div class="col" style="padding: 0 5px">
                    {{
                          (     (item.tax_percentage / 100)* (  (item.price - item.discount_amount )*( item.quantity)))
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                          }}
                  </div>
                  <div class="col" style="padding: 0 5px" v-if="sale.payment_type == 'installment'">
                  {{   (item.subtotal +  (     (item.tax_percentage / 100)* (  (item.price - item.discount_amount )*( item.quantity))))
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        }}
                 
                  </div>
                  <div class="col" style="padding: 0 5px" v-else>
                    {{
                          (item.subtotal )
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        }}
                      </b-td>
                  </div>
                </div>
              </div>
            </div>
  
            <div
              class="row justify-content-between align-items-start mx-0"
              style="margin-top: 30px; padding: 0 20px"
            >
              <div class="col-6">
                <div class="row m-0">
                  <p
                    v-if="sale.note && !has_refund"
                    style="
                      font: normal normal bold 13px/20px Tahoma;
                      letter-spacing: 0px;
                      color: #137b97;
                    "
                  >
                    {{ trans('invoice notes') }}
                  </p>
                  <p
                    v-if="sale.note && !has_refund"
                    style="
                      font: normal normal 300 13px/26px Tahoma;
                      letter-spacing: 0px;
                      color: #394e85;
                      padding-bottom: 0;
                      border-bottom: 1px solid 1px solid rgb(176, 190, 227);
                    "
                  >
                    {{ sale.note }}
                  </p>
                  <div
                    style="margin-bottom: 15px"
                    class="qr-code p-0"
                    v-if="!has_refund"
                  >
                    <img class="qr-image" :src="sale.qr" />
                  </div>
  
                  <div
                    style="margin-bottom: 15px"
                    class="qr-code p-0"
                    v-if="has_refund"
                  >
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
                    >{{ trans('total_value') }}</b
                  >
                  <b class="px-3" style="letter-spacing: 0px; color: #394e85"
                    >{{
                      parseFloat(sale.subtotal)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}&nbsp;{{
                      getSetting('currency', settings)
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
                    >{{ trans('total discount') }}</b
                  >
                  <b class="px-3" style="letter-spacing: 0px; color: #394e85">
                    {{
                      parseFloat(sale.discount_amount)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}&nbsp;
                    {{
                      getSetting('currency', settings)
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
                    >{{ trans('total_after_discount') }}</b
                  >
                  <b class="px-3" style="letter-spacing: 0px; color: #394e85">
                    {{
                      parseFloat(
                        parseFloat(sale.subtotal).toFixed(2) -
                          parseFloat(sale.discount_amount).toFixed(2)
                      )
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}&nbsp;
                    {{
                     getSetting('currency', settings)
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
                  >
                    {{ trans('adding_added_tax') }} ({{
                      sale.items[0].tax_percentage
                    }}
                    %)
                  </b>
                  <b class="px-3" style="letter-spacing: 0px; color: #394e85">
                    {{
                      parseFloat(sale.tax_amount)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}&nbsp;
                    {{
                      getSetting('currency', settings)
                    }}
                  </b>
                </div>
  
                <div
                  class="row justify-content-between"
                  style="
                    background: 0% 0% no-repeat padding-box padding-box                    rgb(19, 123, 151);
                    border-radius: 9px;
                    font: bold 13px / 20px Tahoma;
                    color: rgb(255, 255, 255);
                    padding: 14px 0;
                    margin: 10px 0;
                  "
                >
                  <b class="px-3">{{ trans('total') }}</b>
                  <b
                    class="px-3"
                    style="font: normal normal bold 13px/20px Tahoma"
                  >
                    {{
                      parseFloat(sale.total)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                    {{
                      getSetting('currency', settings)
                    }}
                  </b>
                </div>
  
                <div
                  class="row justify-content-between"
                  style="
                    background: 0% 0% no-repeat padding-box padding-box                    rgb(242 242 242);
                    border-radius: 9px;
                    font: bold 13px / 20px Tahoma;
                    color: #000;
                    padding: 14px;
                    justify-content: center !important;
                    margin-top: 10px;
                  "
                >
                  <b class="px-3">
                    {{ sale.total_string }}
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
                    {{ trans('payment method') }}</b
                  >
                  <b
                    v-if="sale.payment_type != 'installment'"
                    class="px-3"
                    style="letter-spacing: 0px; color: #394e85"
                    >{{ trans(_.get(sale, 'payment_method')) }}</b
                  >
                  <b
                    v-else
                    class="px-3"
                    style="letter-spacing: 0px; color: #394e85"
                    >{{ trans('installment') }}</b
                  >
                </div>
              </div>
            </div>
  
            <h2
              style="
                font: normal normal bold 15px/20px Tahoma;
                letter-spacing: 0px;
                color: #394e85;
              "
              v-if="has_refund == 1"
              class="col-12"
            >
              {{ trans('refunds') }}
            </h2>
  
            <div
              class="row justify-content-end m-0 products"
              v-if="has_refund == 1"
            >
              <div
                class="col-12 header"
                style="
                  background: #137b97 0% 0% no-repeat padding-box;
                  border-radius: 83px;
                  text-align: center;
                  font: normal normal 12px/16px Tahoma;
                  font-family: Tahoma;
                  letter-spacing: 0px;
                  color: #fff;
                  padding: 14px 0;
                "
              >
                <div class="row align-items-center m-0">
                  <div style="width: 15%; padding: 0 5px">
                    {{ trans('barcode') }}
                  </div>
                  <div style="width: 30%; padding: 0 5px">
                    {{ trans('item') }}
                  </div>
  
                  <div class="col" style="padding: 0 5px">
                    {{ trans('quantity') }}
                  </div>
                  <div class="col" style="padding: 0 5px">
                    {{ trans('price before tax') }}
                  </div>
                  <div class="col" style="max-width: 90px; padding: 0 5px">
                    {{ trans('added tax') }}
                  </div>
                  <div class="col" style="max-width: 90px; padding: 0 5px">
                    {{ trans('tax amount') }}
                  </div>
                  <div class="col" style="padding: 0 5px">
                    {{ trans('price after tax') }}
                  </div>
                  <div class="col" style="padding: 0 5px">
                    {{ trans('total') }}
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
                  style="
                    border-radius: 97px;
                    padding: 14px 0;
                    text-align: center;
                    font: normal normal 300 12px/16px Tahoma;
                    font-family: Tahoma;
                    letter-spacing: 0px;
                    color: #394e85;
                  "
                  v-for="(item, index) in refund.items"
                  :key="'refund' + index"
                  class="row align-items-center m-0"
                >
                  <div style="width: 15%; padding: 0 5px">
                    {{ item.serial }}
                  </div>
                  <div style="width: 30%; padding: 0 5px">
                    {{ language == 'en' ? item.title : item.title_ar }}
                  </div>
  
                  <div class="col" style="padding: 0 5px">
                    {{ item.quantity }}
                  </div>
                  <div class="col" style="padding: 0 5px">
                    {{
                      parseFloat(item.price)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                  </div>
                  <div class="col" style="max-width: 90px; padding: 0 5px">
                    {{
                      item.tax_percentage == '0'
                        ? trans('not subject to tax')
                        : '%' + item.tax_percentage
                    }}
                  </div>
                  <div class="col" style="max-width: 90px; padding: 0 5px">
                    {{
                      item.tax_percentage == '0'
                        ? trans('not subject to tax')
                        : (
                            parseFloat(item.tax_percentage / 100) *
                            parseFloat(item.price)
                          )
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                  </div>
                  <div class="col" style="padding: 0 5px">
                    {{
                      parseFloat(
                        parseFloat(item.price) +
                          parseFloat(item.tax_percentage / 100) *
                            parseFloat(item.price)
                      )
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                  </div>
                  <div class="col" style="padding: 0 5px">
                    {{
                      parseFloat(
                        (parseFloat(item.price) +
                          parseFloat(item.tax_percentage / 100) *
                            parseFloat(item.price)) *
                          item.quantity
                      )
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                  </div>
                </div>
              </div>
            </div>
  
            <div
              class="row justify-content-between align-items-start m-0"
              style="margin-top: 30px"
            >
              <div class="col">
                <div class="row" v-if="has_refund == 1">
                  <p
                    v-if="sale.note"
                    style="
                      font: normal normal bold 19px/33px Tahoma;
                      letter-spacing: 0px;
                      color: #137b97;
                    "
                  >
                    {{ trans('invoice notes') }}
                  </p>
                  <p
                    v-if="sale.note"
                    style="
                      font: normal normal 300 13px/26px Tahoma;
                      letter-spacing: 0px;
                      color: #394e85;
                      padding-bottom: 25px;
                      border-bottom: 1px solid 1px solid rgb(176, 190, 227);
                    "
                  >
                    {{ sale.note }}
                  </p>
                </div>
              </div>
              <div
                class="col-sm-auto col-12 totals mb-3"
                v-if="has_refund == 1"
                style="max-width: 50%"
              >
                <div
                  class="row justify-content-between"
                  style="
                    font: normal normal bold 13px/20px Tahoma;
                    letter-spacing: 0px;
                    color: #137b97;
                  "
                >
                  <b
                    class="px-3 py-2"
                    style="
                      font: normal normal bold 13px/20px Tahoma;
                      letter-spacing: 0px;
                      color: #137b97;
                    "
                    >{{ trans('total') }}</b
                  >
                  <b class="px-3 py-2" style="letter-spacing: 0px; color: #394e85"
                    >{{
                      parseFloat(refund.subtotal_refunded)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                    {{
                   getSetting('currency', settings)
                    }}
                  </b>
                </div>
  
                <div
                  class="row justify-content-between"
                  style="
                    font: normal normal bold 13px/20px Tahoma;
                    letter-spacing: 0px;
                    color: #137b97;
                  "
                >
                  <b
                    class="px-3 py-2"
                    style="
                      font: normal normal bold 13px/20px Tahoma;
                      letter-spacing: 0px;
                      color: #137b97;
                    "
                    >{{ trans('total discount') }}</b
                  >
                  <b
                    class="px-3 py-2"
                    style="letter-spacing: 0px; color: #394e85"
                  >
                    {{
                      (parseFloat(refundTotal) - parseFloat(refundSubtotal))
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                    {{
                     getSetting('currency', settings)
                    }}
                  </b>
                </div>
  
                <div
                  class="row justify-content-between"
                  style="
                    font: normal normal bold 13px/20px Tahoma;
                    letter-spacing: 0px;
                    color: #137b97;
                  "
                >
                  <b
                    class="px-3 py-2"
                    style="
                      font: normal normal bold 13px/20px Tahoma;
                      letter-spacing: 0px;
                      color: #137b97;
                    "
                    >{{ trans('added tax') }}</b
                  >
                  <b
                    class="px-3 py-2"
                    style="letter-spacing: 0px; color: #394e85"
                  >
                    {{
                      (
                        parseFloat(refundTotal) -
                        parseFloat(refundSubtotal) +
                        parseFloat(refund.total_refunded) -
                        parseFloat(refund.subtotal_refunded)
                      )
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                    {{
                    getSetting('currency', settings)
                    }}
                  </b>
                </div>
  
                <div
                  class="row justify-content-between"
                  style="
                    font: normal normal bold 13px/20px Tahoma;
                    letter-spacing: 0px;
                    color: #137b97;
                  "
                >
                  <b
                    class="px-3 py-2"
                    style="
                      font: normal normal bold 13px/20px Tahoma;
                      letter-spacing: 0px;
                      color: #137b97;
                    "
                    >{{ trans('refund total') }}</b
                  >
                  <b
                    class="px-3 py-2"
                    style="letter-spacing: 0px; color: #394e85"
                  >
                    {{
                      parseFloat(refund.total_refunded)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                    {{
                    getSetting('currency', settings)
                    }}
                  </b>
                </div>
                <div
                  class="row justify-content-between"
                  style="
                    background: #137b97 0% 0% no-repeat padding-box;
                    border-radius: 59px;
                    font: normal normal bold 13px/20px Tahoma;
                    letter-spacing: 0px;
                    color: #ffffff;
                  "
                >
                  <b
                    class="px-3 py-2"
                    style="
                      font: normal normal bold 13px/20px Tahoma;
                      letter-spacing: 0px;
                    "
                    >{{ trans('invoice total') }}</b
                  >
                  <b class="px-3 py-2">
                    {{
                      (parseFloat(sale.total) - parseFloat(refund.total_refunded))
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    }}
                    {{
                   getSetting('currency', settings)
                    }}
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
                  <span> {{    getSetting('website') }}</span>
                </p>
              </div>
            </b-row>
          </div>
        </div>
  
        <div class="col-12 text-center invoice-btns">
          <b-button
            class="m-2"
            style="
              background: #137b97 0% 0% no-repeat padding-box;
              border-radius: 50px;
              font: normal normal 300 14px/11px Tahoma;
              letter-spacing: 0px;
              color: #ffffff;
              padding: 15px 50px;
            "
            type="submit"
            @click="printReceipt"
          >
            {{ trans('print') }}
          </b-button>
          <b-button
            class="m-2"
            style="
              background: #137b97 0% 0% no-repeat padding-box;
              border-radius: 50px;
              font: normal normal 300 14px/11px Tahoma;
              letter-spacing: 0px;
              color: #ffffff;
              padding: 15px 50px;
            "
            type="submit"
            @click="printSmallReceipt"
          >
            {{ trans('print small invoice') }}
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
            @click="closeSaleReceiptModal"
          >
            {{ trans('close') }}
          </b-button>
        </div>
      </b-modal>
    </section>
  </template>
  
  <script>
  import axios from 'axios'
  import GeneralSaleInvoice from '../../global/invoice/GeneralSaleInvoice.vue'
  import SmallInvoiceSale from '../../global/invoice/SmallInvoiceSale.vue'
  
  export default {
    props:['language'],
      components: { GeneralSaleInvoice, SmallInvoiceSale },
    data() {
      return {
        customEvents: [
          {
            eventName: 'open-sale-receipt-modal',
            callback: this.openSaleReceiptModal,
          },
        ],
        message: '',
        alertType: '',
        user: {},
        sale: {
          customer: {
            name: '',
            phone: '',
          },
        },
        qr: '',
        settings:{},
       
        refund: {},
        has_refund: '',
        currencySettings: {},
        refundTotal: '',
        refundSubtotal: '',
        cashierInvoice: false,
        addedTax: '',
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
          .total_css{
              display:flex;
              justify-content: space-between;
              text-align:center;
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
      }
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
      
    },
    mounted() {
      this.initPrintMe()
      this.getSettings()
    },
    methods: {
      getSetting(key, lang) {
        const result = this.settings.find(el => {
          if (el.key === key) {
            return el.value
          }
        })
  
        return result.value
      },
      getSettings() {
        axios
          .get('/api/settings')
          .then(res => {
            this.settings = res.data.body.settings
          })
          .catch(error => {})
      },
      openSaleReceiptModal(data) {
        this.sale = data.sale
        this.user = data.user
        this.qr = data.qr
        // this.settings = data.settings
        this.language = this.user.language
        this.has_refund = data.has_refund
        this.refund = data.refund
        this.refundSubtotal = data.refundSubtotal
        this.refundTotal = data.refundTotal
        this.cashierInvoice = data.cashierInvoice
        this.currencySettings = this.settings
        this.$refs['sale-receipt-modal'].show()
        this.addedTax =
          parseFloat(data.sale.total) -
          parseFloat(data.sale.subtotal) +
          parseFloat(data.sale.discount_amount)
      },
      closeSaleReceiptModal() {
        SharedEvent.fire('close-cashier-receipt-modal')
        this.$bvModal.hide('sale-receipt-modal')
      },
      printReceipt() {
        //invoke Print me From Mixin //
        this.printMe('#generalInvoice', this.cssText)
      },
      printSmallReceipt() {
        //invoke Print me From Mixin //
        this.printMe('#smallInvoice', this.cssText)
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
    font-size: 18px !important;
    line-height: 16px !important;
    text-align: center;
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
    direction: rtl;
    text-align: right;
    border-top: 3px dashed #f2f2f2;
    padding: 10px 0 10px 0;
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
  </style>
  