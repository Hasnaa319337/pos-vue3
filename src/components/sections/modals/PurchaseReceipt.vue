<template>
  <section>
    <!-- Small invoice  id="smallInvoice" -->
    <div
      class="row d-none"
      style="
        width: 274px;
        padding-right: 50px;
        width: 274px;
        padding-right: 50px;
        text-align: center;
        margin: 0px auto;
        justify-content: center;
        direction: rtl;
      "
    >
      <div class="col-12" style="padding: 0px">
        <h3 class="" style="font-size: 24px; font-weight: bold; margin: 5px 0">
          company_name
        </h3>
        <h4 class="" style="font-size: 18px; font-weight: bold; margin: 5px 0">
          {{ trans('simplified tax invoice') }}
        </h4>
        <span style="margin: 5px 0; display: block">
          <b-badge class="header_badge" variant="success">
            {{ purchaseInvoiceType }}
            {{ trans(_.get(invoice, 'payment_type')) }}
          </b-badge>
        </span>
      </div>

      <div class="col-12" style="padding: 0px">
        <p style="font-size: 16px; margin: 5px 0; padding: 0px">
          <strong>{{ trans('payment method') + ' : ' }}</strong>
          <b v-if="invoice.payment_type != 'installment'">{{
            trans(_.get(invoice, 'payment_method'))
          }}</b>
          <b v-else>{{ trans('installment') }}</b>
        </p>
      </div>

      <!-- <div class="col-12" style="padding: 0px">
        <p style="font-size: 16px; margin: 5px 0; padding: 0px">
          <strong>{{ trans('tax_num') + ' : ' }} </strong>
          {{ settings.tax_number }}
        </p>
      </div> -->
      <div class="col-12" style="padding: 0px">
        <p
          v-if="!_.isEmpty(_.get(invoice, 'provider.name'))"
          style="font-size: 16px; margin: 5px 0; padding: 0px"
        >
          <strong>{{ trans('provider name') }} : </strong>
          {{ _.get(invoice, 'provider.name') }}
        </p>
        <p
          v-if="!_.isEmpty(_.get(invoice, 'provider.phone'))"
          style="font-size: 16px; margin: 5px 0"
        >
          <strong>{{ trans('provider phone') }} : </strong>
          {{ _.get(invoice, 'provider.phone') }}
        </p>
        <p
          v-if="!_.isEmpty(_.get(invoice, 'provider.tax_num'))"
          style="font-size: 16px margin: 5px 0"
        >
          <strong>{{ trans('provider tax number') }} :</strong>
          {{ _.get(invoice, 'provider.tax_num') }}
        </p>
      </div>
      <div class="col-12" style="padding: 0">
        <hr class="my-3" style="margin: 5px 0" />
      </div>

      <!-- <div
        class="col-12"
        style="padding: 0px; border-bottom: 2px dashed rgb(112, 112, 112)"
      >
        <div class="row" style="margin: 0">
          <div class="col-12" style="padding: 0">
            <p style="font-size: 16px; margin: 5px 0; padding: 0px">
              <strong>{{ trans('created at') + ' : ' }}</strong>
              {{ invoice.provider.created_at }}
            </p>
          </div>
          <div class="col-12" style="padding: 0">
            <p style="font-size: 16px; margin: 5px 0; padding: 0px">
              <strong>{{ trans('invoice number') }}</strong>
              : {{ invoice.id }}
            </p>
          </div>
        </div>
      </div> -->

      <div
        class="col-12"
        style="padding: 4px 0px 0px"
        v-for="(item, index) in invoice.items"
        :key="'sale' + index"
      >
        <h2 style="font-size: 14px; margin: 10px 0">
          {{ item.title }}
        </h2>
        <div class="row" style="margin: 5px 0; justify-content: space-between">
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

            <!-- 
                 parseFloat(
                  parseFloat(item.cost) +
                    parseFloat(item.tax_percentage / 100) *
                      parseFloat(item.cost)
                ).toFixed(2)
               -->
            {{ parseFloat(item.cost).toFixed(2) }}
          </div>
          <div
            class="col-auto"
            style="padding: 0px; font-size: 12px; margin-bottom: 0"
          >
            <strong>{{ trans('total') }}</strong>
            :
            <!-- 
                 parseFloat(
                  (parseFloat(item.cost) +
                    parseFloat(item.tax_percentage / 100) *
                      parseFloat(item.cost)) *
                    item.quantity
                ).toFixed(2)
               -->
            {{ parseFloat(item.total).toFixed(2) }}
          </div>
          <div class="col-12" style="padding: 0">
            <hr class="my-3" style="margin: 0" />
          </div>
        </div>
      </div>

      <div
        v-if="invoice.note !== null"
        class="col-12"
        style="padding: 0; margin: 5px 0"
      >
        <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
          <!-- {{ trans('invoice notes') }} -->
        </h1>
        <span style="margin: 0; font-size: 14px">
          <i class="fa fa-quote-right" aria-hidden="true"></i>
          {{ invoice.note }}
          <i class="fa fa-quote-left" aria-hidden="true"></i>
        </span>
      </div>

      <div class="col-12" style="margin: 5px 0">
        <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
          <div class="row">
            <div class="col-12">
              <div class="total_css">
                <span>{{ trans('total value before discount') }} : </span>
                <span>
                  {{ parseFloat(invoice.subtotal).toFixed(2) }}
                  {{ getSetting('currency', settings) }}
                </span>
              </div>
            </div>
          </div>
        </h1>
      </div>
      <div class="col-12" style="margin: 5px 0">
        <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
          <div class="row">
            <div class="col-12">
              <div class="total_css">
                <span>{{ trans('total discount') }} : </span>
                <span
                  >{{ parseFloat(invoice.discount_amount).toFixed(2) }}&nbsp;
                  {{ getSetting('currency', settings) }}</span
                >
              </div>
            </div>
          </div>
        </h1>
      </div>
      <div class="col-12" style="margin: 5px 0">
        <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
          <div class="row">
            <div class="col-12">
              <div class="total_css">
                <span>{{ trans('total value after discount') }} : </span>
                <span
                  >{{
                    parseFloat(
                      parseFloat(invoice.subtotal).toFixed(2) -
                        parseFloat(invoice.discount_amount).toFixed(2)
                    ).toFixed(2)
                  }}
                  {{ getSetting('currency', settings) }}</span
                >
              </div>
            </div>
          </div>
        </h1>
      </div>
      <div class="col-12" style="margin: 5px 0">
        <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
          <div class="row">
            <div class="col-12">
              <div class="total_css">
                <span>{{ trans('added tax') }} : </span>
                <span
                  >{{ parseFloat(invoice.tax_amount).toFixed(2) }}
                  {{ getSetting('currency', settings) }}</span
                >
              </div>
            </div>
          </div>
        </h1>
      </div>
      <div class="col-12" style="margin: 5px 0">
        <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
          <div class="row">
            <div class="col-12">
              <div class="total_css">
                <span>{{ trans('total value') }} : </span>
                <span
                  >{{ parseFloat(invoice.total).toFixed(2) }}
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
                  parseFloat(item.cost) +
                    parseFloat(item.tax_percentage / 100) *
                      parseFloat(item.cost)
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
          <div class="row" style="margin: 0px; justify-content: space-between">
            <div class="col-12" style="padding: 0px; text-align: center">
              {{ trans('refund total') }}
              {{ parseFloat(refund.total_refunded).toFixed(2) }}
              {{ getSetting('currency', settings) }}
            </div>
          </div>
        </h1>
      </div>
      <div v-if="has_refund" class="col-12" style="padding: 0">
        <h1 style="font-size: 18px; font-weight: bold; margin-top: 0">
          <div class="row" style="margin: 0px; justify-content: space-between">
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
              {{ getSetting('currency', settings) }}
            </div>
          </div>
        </h1>
      </div>
      <div v-if="has_refund" class="col-12" style="padding: 0">
        <h1 style="font-size: 18px; font-weight: bold; margin-top: 0">
          <div class="row" style="margin: 0px; justify-content: space-between">
            <div class="col-12" style="padding: 0px; text-align: center">
              {{ trans('total after refund') }} :
              {{
                (
                  parseFloat(invoice.total) - parseFloat(refund.total_refunded)
                ).toFixed(2)
              }}
              {{ getSetting('currency', settings) }}
            </div>
          </div>
        </h1>
      </div>

      <!-- <div class="col-12" style="padding: 0">
        <div class="row" style="margin: 0px; justify-content: space-between">
          <div
            class="col-auto"
            style="padding: 0px; font-size: 14px; font-weight: bold"
          >
            {{ settings.inv_footer_rtl }}
          </div>
          <div
            class="col-auto"
            style="padding: 0px; font-size: 14px; font-weight: bold"
          >
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
          {{ getSetting('website', settings) }}
        </h3>
      </div>
      <div v-if="!has_refund" class="col-12" style="padding: 0">
        <img class="qr-image" :src="this.invoice.qr" />
      </div>
      <div v-if="has_refund" class="col-12" style="padding: 0">
        <img class="qr-image" :src="this.refund.qr" />
      </div>
    </div>
    <SmallInvoice
      id="smallInvoice"
      class="d-none"
      :invoice="invoice"
      :settings="settings"
      :purchaseInvoiceType="purchaseInvoiceType"
      :has_refund="has_refund"
      :refund="refund"
    />
    <!-- orginal invoice -->

    <general-invoice
      :invoice="invoice"
      :refund="refund"
      :settings="settings"
      :purchaseInvoiceType="purchaseInvoiceType"
      id="generalInvoice"
    />

    <!-- show invoice -->
    <b-modal
      :no-close-on-backdrop="true"
      size="xl"
      id="purchase-receipt-modal"
      hide-footer
      class="purchase-receipt-modal my-modal"
      ref="purchase-receipt-modal"
      centered
      scrollable
      @hidden="closePurchaseReceiptModal"
    >
      <div
        id="purchase-invoice"
        :style="{
          direction: language == 'en' ? 'ltr !important' : 'rtl !important',
          'text-align':
            language == 'en' ? 'left !important' : 'right !important',
        }"
      >
        <div v-if="invoice.id > 0">
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
                    <h1 class="title" style="line-height: 1.7 !important">
                      <strong>
                        {{ getSetting('company_name', settings) }}
                      </strong>
                    </h1>
                    <div style="display: flex; column-gap: 5px"></div>
                  </div>
                  <h3 class="header_bottom" style="font-size: 26px !important">
                    {{ purchaseInvoiceType }}
                    {{ trans(invoice.payment_type) }} #{{ invoice.id }}
                  </h3>
                  <p class="paragraph_header_bottom">
                    <span>{{ trans('company tax number') }} : </span>
                    <span>{{ getSetting('tax_number', settings) }}</span>
                  </p>
                  <p class="paragraph_header_bottom">
                    <span>{{ trans('company address') }} : </span>
                    <span>
                      {{ getSetting('company_address', settings) }}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="col-auto p-0">
              <!-- <h2 class="left_header">{{invoice.provider.name }}</h2> -->
              <h2 class="left_header" style="line-height: 2 !important">
                {{ invoice.provider ? invoice.provider.name : '' }}
              </h2>
              <p class="paragraph_left_header">
                <span>{{ trans('provider invoice number') }} : </span>
                <span>{{ invoice.provider_inv_number }}</span>
              </p>
              <p class="paragraph_left_header">
                <span>{{ trans('provider tax number') }} : </span>
                <span>{{ _.get(invoice, 'provider.tax_num') }}</span>
              </p>
              <p class="paragraph_left_header">
                <span>{{ trans('provider address') }} : </span>
                <!-- <span>{{invoice.provider.address}}</span> -->
                <span>{{
                  invoice.provider ? invoice.provider.address : ''
                }}</span>
              </p>
              <p class="paragraph_left_header">
                <span>{{ trans('provider phone') }} : </span>
                <span>{{
                  invoice.provider ? invoice.provider.phone : ''
                }}</span>
              </p>
              <p
                v-if="invoice.provider_tax_number"
                class="paragraph_left_header"
              >
                <span>{{ trans('provider tax number') }} : </span>
                <span>{{ invoice.provider_tax_number }}</span>
              </p>
              <p class="paragraph_left_header">
                <span>{{ trans('invoice date') }} : </span>
                <span>{{ invoice.invoice_date }}</span>
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
                  {{ trans('product') }}
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

                <!-- <div
                  class="col table_header_div_chlid"
                  style="max-width: 90px; padding: 0 5px"
                >
                  {{ trans('discount precentage') }}
                </div> -->
                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('Discount value') }}
                </div>

                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('taxable amount') }}
                </div>
                <div
                  class="col table_header_div_chlid"
                  style="max-width: 90px; padding: 0 5px"
                >
                  {{ trans('added tax') }}
                </div>

                <div class="col table_header_div_chlid" style="padding: 0 5px">
                  {{ trans('added_tax_value') }}
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
                v-for="(item, index) in invoice.items"
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

                <!-- <div class="col" style="padding: 0 5px">
                  % {{ item.discount_percentage }}
                </div> -->
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
                    parseFloat(item.total - item.subtotal)
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

          <div
            class="row justify-content-between align-items-start mx-0"
            style="margin-top: 30px; padding: 0 20px"
          >
            <div class="col-6">
              <div class="row m-0" v-if="!has_refund == 1">
                <div
                  style="margin-bottom: 15px"
                  class="qr-code p-0"
                  v-if="!has_refund"
                >
                  <img class="qr-image" :src="this.invoice.qr" />
                </div>
                <div
                  style="margin-bottom: 15px"
                  class="qr-code p-0"
                  v-if="has_refund"
                >
                  <img class="qr-image" :src="this.refund.qr" />
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
                  >{{ trans('total value') }}</b
                >
                <b class="px-3" style="letter-spacing: 0px; color: #394e85"
                  >{{
                    parseFloat(invoice.subtotal)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                  }}&nbsp;
                  {{ getSetting('currency', settings) }}
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
                  {{
                    parseFloat(invoice.discount_amount)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                  }}&nbsp;
                  {{ getSetting('currency', settings) }}
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
                    parseFloat(invoice.subtotal - invoice.discount_amount)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                  }}&nbsp;
                  {{ getSetting('currency', settings) }}
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
                  ({{ invoice.items[0].tax_percentage }} %)</b
                >
                <b class="px-3" style="letter-spacing: 0px; color: #394e85">
                  {{
                    parseFloat(invoice.tax_amount)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                  }}&nbsp;
                  {{ getSetting('currency', settings) }}
                </b>
              </div>

              <div class="row justify-content-between totalBackground">
                <b class="px-3">{{ trans('total') }}</b>

                <b
                  class="px-3"
                  style="font: normal normal bold 13px/20px Tahoma"
                >
                  {{
                    parseFloat(invoice.total)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                  }}
                  {{ getSetting('currency', settings) }}
                </b>
              </div>
              <div class="row justify-content-between totalStringBackground">
                <b class="px-3">
                  {{ invoice.total_string }}
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
                  v-if="invoice.payment_type != 'installment'"
                >
                  {{ trans(invoice.payment_method) }}
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
          <h2
            style="
              font: normal normal bold 15px/20px Tahoma;
              letter-spacing: 0px;
              color: #394e85;
            "
            v-if="has_refund == 1"
            class="col-12"
          >
            {{ user.language == 'en' ? 'Refunds' : 'المرتجعات' }}
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
                <div style="width: 30%; padding: 0 5px">
                  {{ strings['item'] }}
                </div>
                <div style="padding: 0 5px">
                  {{ trans('barcode') }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{ trans('quantity') }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{
                    user.language == 'en'
                      ? 'Price before tax'
                      : 'التكلفة قبل الضريبة'
                  }}
                </div>
                <div class="col" style="max-width: 90px; padding: 0 5px">
                  {{
                    user.language == 'en' ? 'Added tax ' : 'ض القيمة المضافة'
                  }}
                </div>
                <div class="col" style="max-width: 90px; padding: 0 5px">
                  {{ language == 'en' ? 'Added tax ' : 'قيمة الضريبه' }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{
                    language == 'en' ? 'Price after tax' : 'التكلفة قبل الضريبة'
                  }}
                </div>
                <div class="col" style="padding: 0 5px">
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
                :key="index"
                class="row align-items-center m-0"
              >
                <div style="width: 30%; padding: 0 5px">
                  {{ user.language == 'en' ? item.title : item.title_ar }}
                </div>
                <div style="padding: 0 5px">
                  {{ item.serial }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{ item.quantity }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{ item.cost }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{
                    item.tax_percentage == '0'
                      ? 'غير خاضع للضريبة'
                      : '%' + item.tax_percentage
                  }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{
                    item.tax_percentage == '0'
                      ? 'غير خاضع للضريبة'
                      : (item.tax_percentage / 100) * item.cost
                  }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{ item.cost + (item.tax_percentage / 100) * item.cost }}
                </div>
                <div class="col" style="padding: 0 5px">
                  {{
                    (item.cost + (item.tax_percentage / 100) * item.cost) *
                    item.quantity
                  }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="row justify-content-between align-items-start mx-0"
            v-if="has_refund == 1"
            style="margin-top: 30px; padding: 0 20px"
          >
            <div class="col-6">
              <div class="row m-0">
                <div
                  style="margin-bottom: 15px"
                  class="qr-code p-0"
                  v-if="!has_refund"
                >
                  <img class="qr-image" :src="this.invoice.qr" />
                </div>
                <div
                  style="margin-bottom: 15px"
                  class="qr-code p-0"
                  v-if="has_refund"
                >
                  <img class="qr-image" :src="this.refund.qr" />
                </div>
              </div>
            </div>
            <div class="col-sm-auto col-12 totals mb-3" style="max-width: 50%">
              <div
                class="row justify-content-between"
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
                  >{{ trans('total value') }}</b
                >
                <b class="px-3" style="letter-spacing: 0px; color: #394e85"
                  >{{ refund.subtotal_refunded }}
                  {{ getSetting('currency', settings) }}
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
                  }}</b
                >
                <b class="px-3" style="letter-spacing: 0px; color: #394e85">
                  {{ refund.total_refunded - refund.subtotal_refunded }}
                  {{ getSetting('currency', settings) }}
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
                <b class="px-3">{{
                  user.language == 'en' ? 'Refund Total' : 'اجمالي المرتجع'
                }}</b>
                <b
                  class="px-3"
                  style="font: normal normal bold 13px/20px Tahoma"
                >
                  {{ refund.total_refunded }}
                  {{ getSetting('currency', settings) }}
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
                  class="px-3"
                  style="
                    font: normal normal bold 13px/20px Tahoma;
                    letter-spacing: 0px;
                    color: #137b97;
                  "
                  >{{
                    language == 'en'
                      ? 'Total After Refund'
                      : ' المجموع بعد المرتجع'
                  }}</b
                >
                <b class="px-3" style="letter-spacing: 0px; color: #394e85">
                  {{ invoice.total - refund.total_refunded }}
                  {{ getSetting('currency', settings) }}
                </b>
              </div>
              <div class="row justify-content-between">
                <b
                  class="px-3"
                  style="
                    font: normal normal bold 13px/33px Tahoma;
                    text-align: center;
                    letter-spacing: 0px;
                    color: #394e85;
                    background: #f2f2f2;
                    border-radius: 50px;
                    padding: 10px 0;
                    margin-top: 5px;
                  "
                >
                  {{ invoice.total_string }}
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
                <span> {{ getSetting('website', settings) }}</span>
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
        <!-- <b-button
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
          {{ trans('print_small_invoice') }}
        </b-button> -->
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
          @click="closePurchaseReceiptModal"
        >
          {{ trans('close') }}
        </b-button>
      </div>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'

import GeneralInvoice from '@/components/global/invoice/GeneralInvoice.vue'
import SmallInvoice from '@/components/global/invoice/SmallInvoice.vue'
export default {
  components: { GeneralInvoice, SmallInvoice },
  props: ['settings'],
  data() {
    return {
      customEvents: [
        {
          eventName: 'open-purchase-receipt-modal',
          callback: this.openPurchaseReceiptModal,
        },
      ],
      message: '',
      alertType: '',
      invoice: [],

      language: '',
      purchaseInvoiceType: '',
      currencySettings: {},
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

      addedTax: '',
      user: {},

      refund: {},
      has_refund: '',
      refundTotal: '',
      qr: '',
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
  mounted() {
    this.initPrintMe()
  },
  methods: {
    openPurchaseReceiptModal(data) {
      this.invoice = data.invoice
      this.purchaseInvoiceType = data.purchaseInvoiceType
      this.user = data.user

      this.language = this.user.language
      this.currencySettings = data.settings
      this.has_refund = data.has_refund || 0
      this.refund = data.refund || ''
      this.refundTotal = data.refundTotal
      this.qr = data.invoice.qr
      this.$refs['purchase-receipt-modal'].show()
      this.addedTax = parseFloat(data.invoice.total - data.invoice.cost)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    closePurchaseReceiptModal() {
      // eslint-disable-next-line no-undef
      SharedEvent.fire('close-purchase-receipt-modal')
      this.$bvModal.hide('purchase-receipt-modal')
    },
    printReceipt() {
      //invoke Print me From Mixin //
      this.printMe('#generalInvoice', this.cssText)
      this.$bvModal.hide('purchase-receipt-modal')
    },
    printSmallReceipt() {
      //invoke Print me From Mixin //
      this.printMe('#smallInvoice', this.cssText)
      this.$bvModal.hide('purchase-receipt-modal')
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
  font-size: 16px;
  line-height: 25px !important;
  /* text-align: center; */
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
  font-size: 35px !important;
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
  background: 0% 0% no-repeat padding-box padding-box rgb(19, 123, 151) !important;
  border-radius: 9px !important;
  text-align: center !important;
  letter-spacing: 0px !important;
  color: rgb(255, 255, 255) !important;

  padding: 30px 0px;
}

.table_header_div_chlid {
  font-size: 21px !important;
  font-weight: 500;
}

.table_div_body {
  border-radius: 10px;
  padding: 35px 0px !important;
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
.qr-image-orginal {
  width: 200px !important;
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

/* Start:: orginal receipt */
.row_box {
  border: 1px solid #129acc !important;
  border-radius: 8px !important;
  padding: 8px !important;
}
/* End:: orginal receipt */

.totalBackground {
  background: 0% 0% no-repeat padding-box padding-box rgb(19, 123, 151);
  display: flex;
  justify-content: space-between;
  border-radius: 9px;
  font: bold 13px / 20px Tahoma;
  color: rgb(255, 255, 255);
  padding: 14px 0;
  margin: 10px 0;
}
.totalStringBackground {
  background: 0% 0% no-repeat padding-box padding-box rgb(242 242 242);
  border-radius: 9px;
  font: bold 13px / 20px Tahoma;
  color: #000;
  padding: 14px;
  margin-top: 10px;
  justify-content: center !important;
}
</style>
