<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card pt-3" v-if="loaded">
      <div
        class="card-header header-sm d-flex justify-content-between align-items-center"
      >
        <h4 class="card-title">
          <div class="row m-0 align-items-center">
            <div class="col p-0">
              {{ trans('the_invoice') }} #{{ refund.id }}
            </div>
            <!-- <b-badge class="mx-2" v-if="sale.arrears && sale.paid" variant="success">{{ strings['paid'] }}</b-badge>
                      <b-badge class="mx-2" v-else-if="!sale.arrears || sale.paid" variant="success">{{ strings['paid'] }}</b-badge>
                      <b-badge class="mx-2" v-else-if="sale.arrears && !sale.paid" variant="danger">{{ strings['non-paid'] }}</b-badge> -->
          </div>
        </h4>
        <p>
          <b>{{ trans('created at') }}</b> {{ refund.created_at }}
        </p>
        <div class="dropdown">
          <button @click="$router.go(-1)" class="btn btn-warning">
            <font-awesome-icon icon="fa-solid fa-reply-all" />
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="row mx-0 align-items-center justify-content-between mb-4">
          <div class="col-sm-6 mb-4">
            <b-row class="mb-3 mx-0 side-border">
              <b-col cols="12" md="4">
                <b>{{ trans('inventory') }}:</b>
                <em
                  v-text="
                    user.language == 'en'
                      ? refund.inventory_title
                      : refund.inventory_title_ar
                  "
                ></em>
              </b-col>
              <b-col cols="12" md="4">
                <b>{{ trans('cashier') }}:</b> <em v-text="refund.user"></em>
              </b-col>
              <b-col cols="12" md="4">
                <b>{{ trans('PaymentMethod') }}:</b>
                <em v-text="refund.method"></em>
              </b-col>
            </b-row>
          </div>
          <div class="col-sm-6 mb-4 map">
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
                    <b-th
                      style="
                        min-width: 50px !important;
                        max-width: 70px !important;
                      "
                      >{{ trans('id') }}</b-th
                    >
                    <b-th
                      style="
                        min-width: 50px !important;
                        max-width: 100px !important;
                        width: 50px !important;
                      "
                    >
                      {{ trans('barcode') }}</b-th
                    >
                    <b-th>{{ trans('item') }}</b-th>

                    <b-th
                      style="
                        min-width: 20px !important;
                        max-width: 20px !important;
                        width: 20px !important;
                      "
                    >
                      {{ trans('quantity') }}</b-th
                    >
                    <b-th>{{ trans('price') }} </b-th>
                    <b-th>{{ trans('added_tax') }}</b-th>
                    <b-th>{{ trans('value_total') }} </b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr
                    class="bg-danger text-white"
                    v-for="(item, index) in refund.items"
                    :key="'refund' + index"
                  >
                    <b-td
                      style="
                        min-width: 20px !important;
                        max-width: 20px !important;
                        width: 20px !important;
                      "
                    >
                      {{ index + 1 }}
                    </b-td>
                    <b-td>
                      {{ item.serial }}
                    </b-td>
                    <b-td>
                      {{ trans(item.title) }}
                    </b-td>
                    <b-td
                      style="
                        min-width: 20px !important;
                        max-width: 60px !important;
                        width: 60px !important;
                      "
                    >
                      <b>{{ item.quantity }}</b>
                    </b-td>
                    <b-td>{{ item.price }}</b-td>
                    <b-td> {{ item.tax_percentage }} % </b-td>
                    <b-td>
                      <b
                        >{{
                          parseFloat(
                            parseFloat(parseFloat(item.price)) * item.quantity
                          )
                        }}
                        {{
                          user.language == 'ar'
                            ? settings.currency_ar
                            : settings.currency_en
                        }}</b
                      >
                    </b-td>
                  </b-tr>
                  <b-tr class="bg-danger text-white">
                    <b-td colspan="3" class="text-center">
                      {{ trans('total_value') }}
                    </b-td>
                    <b-td colspan="4" class="text-center">
                      <b
                        >{{ refund.subtotal_refunded.toFixed(2) }}
                        {{
                          user.language == 'ar'
                            ? settings.currency_ar
                            : settings.currency_en
                        }}</b
                      >
                    </b-td>
                  </b-tr>
                  <b-tr class="bg-danger text-white">
                    <b-td colspan="3" class="text-center">
                      {{ trans('added_tax') }}
                    </b-td>
                    <b-td colspan="4" class="text-center">
                      <b
                        >{{
                          (
                            parseFloat(refund.total_refunded) -
                            parseFloat(refund.subtotal_refunded)
                          ).toFixed(2)
                        }}
                        {{
                          user.language == 'ar'
                            ? settings.currency_ar
                            : settings.currency_en
                        }}</b
                      >
                    </b-td>
                  </b-tr>
                  <b-tr class="bg-danger text-white">
                    <b-td colspan="3" class="text-center">
                      {{ trans('refund_total') }}
                    </b-td>
                    <b-td colspan="4" class="text-center">
                      <b
                        >{{ refund.total_refunded.toFixed(2) }}
                        {{
                          user.language == 'ar'
                            ? settings.currency_ar
                            : settings.currency_en
                        }}</b
                      >
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-row>
          </div>
          <div class="col-sm-12 mb-4">
            <b-row class="mx-0">
              <b-col cols="12" md="4">
                <b>{{ trans('refunded_on') }}:</b>
                <em>{{ refund.created_at }}</em>
              </b-col>
              <b-col cols="12" md="4">
                <b>{{ trans('refunded_by') }}:</b> <em>{{ refund.user }}</em>
              </b-col>
              <b-col cols="12" md="4">
                <b>{{ trans('refund_method') }}</b>
                <em>{{ trans(refund.method) }}</em>
              </b-col>
            </b-row>
          </div>
          <div class="col-sm-12 mb-4">
            <b-row class="justify-content-center mx-0">
              <b-col cols="12" md="6">
                <!-- <div id="map" style="height: 300px;" v-if="sale.longitude">
                                  <iframe :src="initMap(sale.longitude,sale.latitude)"
                                          style="width: 100%;height:100%"
                                          frameborder="0"></iframe>
                              </div> -->
                <GoogleMap :lat="sale.latitude" :lng="sale.longitude" />
              </b-col>
              <div
                ref="smallInvoice"
                id="smallInvoice"
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
                  <h3
                    class=""
                    style="font-size: 24px; font-weight: bold; margin: 0px"
                  >
                    {{
                      user.language == 'ar'
                        ? settings.company_name_ar
                        : settings.company_name_en
                    }}
                  </h3>
                  <h4
                    class=""
                    style="font-size: 18px; font-weight: bold; margin: 0px"
                  >
                    {{ trans('simplified_tax_invoice') }}
                  </h4>
                </div>
                <div class="col-12" style="padding: 0px">
                  <p style="font-size: 16px; margin: 0px; padding: 0px">
                    <strong>{{ trans('tax_num') + ':' }}</strong>
                    {{ settings.tax_number }}
                  </p>
                </div>
                <div
                  class="col-12"
                  v-if="refund.sale.customer"
                  style="padding: 0px"
                >
                  <p style="font-size: 16px; margin: 0px; padding: 0px">
                    <strong>{{ trans('customer_name') }}</strong>
                    {{ refund.sale.customer.name }}
                  </p>
                  <p style="font-size: 16px">
                    <strong>{{ trans('customer_phone') }}</strong>
                    {{ refund.sale.customer.phone }}
                  </p>
                  <p
                    v-if="refund.sale.customer.tax_num !== null"
                    style="font-size: 16px"
                  >
                    <strong>{{ trans('customer_tax_number') }}</strong>
                    {{ refund.sale.customer.tax_num }}
                  </p>
                </div>
                <div
                  class="col-12"
                  style="
                    padding: 0px;
                    border-bottom: 2px dashed rgb(112, 112, 112);
                  "
                >
                  <p
                    style="
                      font-size: 16px;
                      margin: 0px;
                      padding: 0px;
                      text-align: center;
                    "
                  >
                    <strong>{{ settings.inv_header }}</strong>
                  </p>
                </div>
                <div class="col-12" style="padding: 0">
                  <hr class="my-3" style="margin: 0" />
                </div>
                <div
                  class="col-12"
                  tyle="padding: 0px; border-bottom: 2px dashed rgb(112, 112, 112);"
                >
                  <div class="row" style="margin: 0">
                    <div class="col-6" style="padding: 0">
                      <p style="font-size: 16px; margin: 0px; padding: 0px">
                        <strong>{{ trans('created_at') + ':' }}</strong>
                        {{ refund.sale.created_at }}
                      </p>
                    </div>
                    <div class="col-6" style="padding: 0">
                      <p style="font-size: 16px; margin: 0px; padding: 0px">
                        <strong>{{ trans('invoice_number') }}</strong>
                        : {{ refund.sale.id }}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="col-12"
                  style="padding: 14px 0px 0px"
                  v-for="(item, index) in refund.sale.items"
                  :key="'sale' + index"
                >
                  <h2 style="font-size: 14px; margin: 0px">
                    {{ trans(item.title) }}
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
                <div
                  v-if="refund.sale.note !== null"
                  class="col-12"
                  style="padding: 0"
                >
                  <h1 style="font-size: 14px; font-weight: bold; margin-top: 0">
                    {{ trans('invoice_notes') }}
                  </h1>
                  <span style="margin: 0; font-size: 14px">
                    <i class="fa fa-quote-right" aria-hidden="true"></i>
                    {{ refund.sale.note }}
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                  </span>
                </div>
                <div class="col-12" style="padding: 0">
                  <h1 style="font-size: 18px; font-weight: bold; margin-top: 0">
                    <div
                      class="row"
                      style="margin: 0px; justify-content: space-between"
                    >
                      <div class="col-12" style="padding: 0px">
                        {{ trans('invoice_total') }}

                        {{ parseFloat(refund.total_refunded).toFixed(2) }}&nbsp;
                        {{
                          user.language == 'ar'
                            ? settings.currency_ar
                            : settings.currency_en
                        }}
                      </div>
                    </div>
                  </h1>
                </div>
                <div class="col-12" style="padding: 0">
                  <h1 style="font-size: 18px; font-weight: bold; margin-top: 0">
                    <div
                      class="row"
                      style="margin: 0px; justify-content: space-between"
                    >
                      <div
                        class="col-12"
                        style="padding: 0px; text-align: center"
                      >
                        {{ trans('added_tax') }}

                        {{
                          (
                            parseFloat(refund.total_refunded) -
                            parseFloat(refund.subtotal_refunded)
                          ).toFixed(2)
                        }}
                        {{
                          user.language == 'ar'
                            ? settings.currency_ar
                            : settings.currency_en
                        }}
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
                      {{ trans(item.title) }}
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
                      <div
                        class="col-12"
                        style="padding: 0px; text-align: center"
                      >
                        {{ trans('refund_total') }}
                        {{ parseFloat(refund.total_refunded).toFixed(2) }}
                        {{
                          user.language == 'ar'
                            ? settings.currency_ar
                            : settings.currency_en
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
                      <div
                        class="col-12"
                        style="padding: 0px; text-align: center"
                      >
                        {{ trans('added_tax') }}
                        {{
                          (
                            parseFloat(refund.total_refunded) -
                            parseFloat(refund.subtotal_refunded)
                          ).toFixed(2)
                        }}
                        {{
                          user.language == 'ar'
                            ? settings.currency_ar
                            : settings.currency_en
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
                      <div
                        class="col-12"
                        style="padding: 0px; text-align: center"
                      >
                        {{ trans('total_after_refund') }}
                        {{
                          (
                            parseFloat(sale.total) -
                            parseFloat(refund.total_refunded)
                          ).toFixed(2)
                        }}
                        {{
                          user.language == 'ar'
                            ? settings.currency_ar
                            : settings.currency_en
                        }}
                      </div>
                    </div>
                  </h1>
                </div>
                <div class="col-12" style="padding: 0">
                  <div
                    class="row"
                    style="margin: 0px; justify-content: space-between"
                  >
                    <div
                      class="col-auto"
                      style="padding: 0px; line-height: 13px"
                    >
                      <span
                        style="
                          font-size: 14px;
                          font-weight: bold;
                          color: rgba(0, 0, 0, 0.28);
                        "
                      >
                      </span>
                    </div>
                    <div
                      class="col-auto"
                      style="padding: 0px; font-size: 14px; font-weight: bold"
                    >
                      نهاية الفاتورة
                    </div>
                    <div
                      class="col-auto"
                      style="padding: 0px; line-height: 13px"
                    >
                      <span
                        style="
                          font-size: 14px;
                          font-weight: bold;
                          color: #00000047;
                        "
                      >
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-12" style="padding: 0">
                  <div
                    class="row"
                    style="margin: 0px; justify-content: space-between"
                  >
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
                </div>
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
                    {{ settings.website }}
                  </h3>
                </div>
                <div class="col-12" style="padding: 0">
                  <img class="qr-image" :src="refund.qr" />
                </div>
              </div>
              <b-col cols="12" md="6">
                <b-row class="mb-3 mx-0">
                  <b-col class="text-center">
                    <b-button
                      v-b-modal.sale-receipt-modal2
                      class="mr-2"
                      variant="primary"
                    >
                      {{ trans('the_invoice') }}
                    </b-button>

                    <b-modal
                      @click="closeSaleReceiptModal"
                      ref="sale-receipt-modal2"
                      id="sale-receipt-modal2"
                      hide-footer
                      class="sale-receipt-modal"
                      centered
                      scrollable
                      size="xl"
                    >
                      <div
                        id="sale-invoice-test"
                        :style="{
                          direction:
                            language == 'en'
                              ? 'ltr !important'
                              : 'rtl !important',
                          'text-align':
                            language == 'en'
                              ? 'left !important'
                              : 'right !important',
                        }"
                      >
                        <div>
                          <!--                                                <h2 style="font: normal  bold 25px/30px Tahoma; text-align:right; letter-spacing: 0px; color: #394E85;"-->
                          <!--                                                    class="col-12">-->
                          <!--                                                    {{ user.language == "en" ? "Refunds" : "المرتجعات" }}-->
                          <!--                                                </h2>-->
                          <div class="col">
                            <div class="row justify-content-between mb-3">
                              <div
                                class="col-auto p-0"
                                style="text-align: initial !important"
                              >
                                <h1
                                  class=""
                                  style="
                                    font: normal normal bold 15px/20px Tahoma;
                                    letter-spacing: 0px;
                                    color: #137b97;
                                    opacity: 1;
                                    margin: 0px !important;
                                  "
                                >
                                  <strong>{{
                                    trans(settings.company_name_en)
                                  }}</strong>
                                </h1>
                                <h3
                                  style="
                                    font: normal normal 300 13px/20px Tahoma;
                                    letter-spacing: 0px;
                                    color: #394e85;
                                  "
                                >
                                  {{ trans('invoice') }}
                                  # {{ refund.id }}
                                </h3>
                                <p
                                  class="mb-0"
                                  style="
                                    font: normal normal 300 10px/16px Tahoma;
                                    letter-spacing: 0px;
                                    color: #394e85;
                                    margin-top: 0;
                                  "
                                >
                                  <strong>
                                    عنوان الشركه
                                    {{ settings.company_address_ar }}
                                  </strong>
                                </p>
                                <p
                                  class="mb-0"
                                  style="
                                    font: normal normal 300 10px/16px Tahoma;
                                    letter-spacing: 0px;
                                    color: #394e85;
                                    margin-top: 0;
                                  "
                                >
                                  <strong>
                                    تليفون الشركة
                                    {{ settings.company_phone }}
                                  </strong>
                                </p>
                                <p
                                  class="mb-0"
                                  style="
                                    font: normal normal 300 10px/16px Tahoma;
                                    letter-spacing: 0px;
                                    color: #394e85;
                                    margin-top: 0;
                                  "
                                >
                                  <strong
                                    >{{ trans('tax_num') }}
                                    {{ settings.tax_number }}
                                  </strong>
                                </p>
                                <p
                                  class="mb-0"
                                  style="
                                    font: normal normal 300 10px/16px Tahoma;
                                    letter-spacing: 0px;
                                    color: #394e85;
                                  "
                                >
                                  <strong
                                    >{{ trans('invoice_number') }}
                                    {{ refund.id }}</strong
                                  >
                                </p>
                              </div>
                              <div class="col p-0" style="text-align: center">
                                <img
                                  :src="settings.logo"
                                  alt=""
                                  style="
                                    width: 80px !important;
                                    max-width: 100% !important;
                                    margin-top: 0 !important;
                                    max-height: 80px !important;
                                  "
                                />
                              </div>
                              <div
                                class="col-auto p-0"
                                style="text-align: left"
                              >
                                <h4
                                  style="
                                    text-align: right;
                                    font: normal normal 300 12px/16px Tahoma;
                                    letter-spacing: 0px;
                                    color: #137b97;
                                    margin-top: 0;
                                  "
                                >
                                  {{ trans('customer_name') }}
                                </h4>

                                <p
                                  class="mb-0"
                                  v-if="
                                    refund.sale.customer &&
                                    refund.sale.customer.name
                                  "
                                  style="
                                    text-align: right;
                                    font: normal normal 300 12px/16px Tahoma;
                                    letter-spacing: 0px;
                                    color: #394e85;
                                    margin-top: 10px;
                                  "
                                >
                                  {{ trans('customer_name') }} :
                                  {{ refund.sale.customer.name }}
                                </p>

                                <p
                                  class="mb-0"
                                  v-if="
                                    refund.sale.customer &&
                                    refund.sale.customer.phone
                                  "
                                  style="
                                    text-align: right;
                                    font: normal normal 300 12px/16px Tahoma;
                                    letter-spacing: 0px;
                                    color: #394e85;
                                    margin-top: 10px;
                                  "
                                >
                                  <span>هاتف العميل</span>
                                  {{ refund.sale.customer.phone }}
                                </p>

                                <p
                                  class="mb-0"
                                  v-if="
                                    refund.sale.customer &&
                                    refund.sale.customer.info &&
                                    refund.sale.customer.info.billing_address
                                  "
                                  style="
                                    text-align: right;
                                    font: normal normal 300 12px/16px Tahoma;
                                    letter-spacing: 0px;
                                    color: #394e85;
                                    margin-top: 10px;
                                  "
                                >
                                  <span> عنوان العميل</span> :
                                  {{
                                    refund.sale.customer.info.billing_address
                                      .city_name
                                  }}
                                  -
                                  {{
                                    refund.sale.customer.info.billing_address
                                      .region_name
                                  }}
                                  -
                                  {{
                                    refund.sale.customer.info.billing_address
                                      .street_name
                                  }}
                                </p>

                                <p
                                  class="mb-0"
                                  v-if="
                                    refund.sale.customer &&
                                    refund.sale.customer.tax_num !== null
                                  "
                                  style="
                                    text-align: right;
                                    font: normal normal 300 12px/16px Tahoma;
                                    letter-spacing: 0px;
                                    color: #394e85;
                                  "
                                >
                                  {{ trans('customer_tax_number') }}
                                  : {{ sale.customer.tax_num }}
                                </p>
                                <p
                                  class="mb-0"
                                  style="
                                    text-align: right;
                                    font: normal normal 300 12px/16px Tahoma;
                                    letter-spacing: 0px;
                                    color: #394e85;
                                  "
                                >
                                  {{ trans('created_at') + ':' }}
                                  {{ refund.sale.created_at }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="row justify-content-end m-0 products">
                            <div
                              class="col-12 header"
                              style="
                                background: #137b97 0% 0% no-repeat padding-box;
                                border-radius: 83px;
                                text-align: center;
                                font: bold 16px Tahoma;
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

                                <div class="col" s style="padding: 0 5px">
                                  {{ trans('quantity') }}
                                </div>
                                <div class="col" style="padding: 0 5px">
                                  {{ trans('price_before_tax') }}
                                </div>
                                <div
                                  class="col"
                                  style="max-width: 90px; padding: 0 5px"
                                >
                                  {{ trans('added_tax') }}
                                </div>
                                <div
                                  class="col"
                                  style="max-width: 90px; padding: 0 5px"
                                >
                                  {{ trans('added_tax') }}
                                </div>
                                <div class="col" style="padding: 0 5px">
                                  {{ trans('price_after_tax') }}
                                </div>
                                <div class="col" style="padding: 0 5px">
                                  {{ trans('value_total') }}
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
                                <div
                                  style="
                                    width: 15%;
                                    padding: 0 5px;
                                    font-size: 15px;
                                    font-weight: bold;
                                  "
                                >
                                  {{ item.serial }}
                                </div>
                                <div
                                  style="
                                    width: 30%;
                                    padding: 0 5px;
                                    font-size: 15px;
                                    font-weight: bold;
                                  "
                                >
                                  {{ trans(item.title) }}
                                </div>

                                <div
                                  class="col"
                                  style="
                                    padding: 0 5px;
                                    font-size: 15px;
                                    font-weight: bold;
                                  "
                                >
                                  {{ item.quantity }}
                                </div>
                                <div class="col" style="padding: 0 5px">
                                  {{ item.price }}
                                </div>
                                <div
                                  class="col"
                                  style="
                                    max-width: 90px;
                                    padding: 0 5px;
                                    font-size: 15px;
                                    font-weight: bold;
                                  "
                                >
                                  {{
                                    item.tax_percentage == '0'
                                      ? 'غير خاضع للضريبة'
                                      : '%' + item.tax_percentage
                                  }}
                                </div>
                                <div
                                  class="col"
                                  style="
                                    max-width: 90px;
                                    padding: 0 5px;
                                    font-size: 15px;
                                    font-weight: bold;
                                  "
                                >
                                  {{
                                    item.tax_percentage == '0'
                                      ? 'غير خاضع للضريبة'
                                      : (
                                          parseFloat(
                                            item.tax_percentage / 100
                                          ) * parseFloat(item.price)
                                        ).toFixed(2)
                                  }}
                                </div>
                                <div
                                  class="col"
                                  style="
                                    padding: 0 5px;
                                    font-size: 15px;
                                    font-weight: bold;
                                  "
                                >
                                  {{
                                    parseFloat(
                                      parseFloat(item.price) +
                                        parseFloat(item.tax_percentage / 100) *
                                          parseFloat(item.price)
                                    ).toFixed(2)
                                  }}
                                </div>
                                <div
                                  class="col"
                                  style="
                                    padding: 0 5px;
                                    font-size: 15px;
                                    font-weight: bold;
                                  "
                                >
                                  {{
                                    parseFloat(
                                      (parseFloat(item.price) +
                                        parseFloat(item.tax_percentage / 100) *
                                          parseFloat(item.price)) *
                                        item.quantity
                                    ).toFixed(2)
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
                              <div class="row">
                                <p
                                  v-if="refund.sale.note"
                                  style="
                                    font: normal normal bold 19px/33px Tahoma;
                                    letter-spacing: 0px;
                                    color: #137b97;
                                  "
                                >
                                  {{ trans('invoice_notes') }}
                                </p>
                                <p
                                  v-if="refund.sale.note"
                                  style="
                                    font: normal normal 300 13px/26px Tahoma;
                                    letter-spacing: 0px;
                                    color: #394e85;
                                    padding-bottom: 25px;
                                    border-bottom: 1px solid 1px solid
                                      rgb(176, 190, 227);
                                  "
                                >
                                  {{ refund.sale.note }}
                                </p>
                                <div
                                  style="margin-bottom: 15px"
                                  class="qr-code p-0"
                                >
                                  <img
                                    class="qr-image"
                                    style="
                                      height: 130px !important;
                                      max-width: 120px;
                                    "
                                    :src="refund.qr"
                                  />
                                </div>
                              </div>
                            </div>
                            <div
                              class="col-sm-auto col-12 totals mb-3"
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
                                  >{{ trans('total_value') }}</b
                                >
                                <b
                                  class="px-3 py-2"
                                  style="letter-spacing: 0px; color: #394e85"
                                  >{{
                                    parseFloat(
                                      refund.subtotal_refunded
                                    ).toFixed(2)
                                  }}
                                  {{
                                    user.language == 'ar'
                                      ? settings.currency_ar
                                      : settings.currency_en
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
                                  >{{ trans('added_tax') }}</b
                                >
                                <b
                                  class="px-3 py-2"
                                  style="letter-spacing: 0px; color: #394e85"
                                >
                                  {{
                                    (
                                      parseFloat(refund.total_refunded) -
                                      parseFloat(refund.subtotal_refunded)
                                    ).toFixed(2)
                                  }}
                                  {{
                                    user.language == 'ar'
                                      ? settings.currency_ar
                                      : settings.currency_en
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
                                  >{{ trans('refund_total') }}</b
                                >
                                <b
                                  class="px-3 py-2"
                                  style="letter-spacing: 0px; color: #394e85"
                                >
                                  {{
                                    parseFloat(refund.total_refunded).toFixed(2)
                                  }}
                                  {{
                                    user.language == 'ar'
                                      ? settings.currency_ar
                                      : settings.currency_en
                                  }}
                                </b>
                              </div>
                              <div
                                class="row justify-content-between"
                                style="
                                  background: #137b97 0% 0% no-repeat
                                    padding-box;
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
                                  >{{ trans('total') }}</b
                                >
                                <b class="px-3 py-2">
                                  {{
                                    parseFloat(refund.total_refunded).toFixed(2)
                                  }}
                                  {{
                                    user.language == 'ar'
                                      ? settings.currency_ar
                                      : settings.currency_en
                                  }}
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
                                  {{ refund.total_string }}
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
                                  font-size: 18px;
                                  letter-spacing: 0px;
                                  color: #394e85;
                                  margin-bottom: 30px;
                                "
                              >
                                <span>توقيع المستلم</span>
                              </p>
                            </div>
                            <div
                              class="col-auto"
                              style="
                                border-top: 1px dashed #eee;
                                text-align: center;
                              "
                            >
                              <p
                                style="
                                  font: normal normal bold 13px/20px Tahoma;
                                  letter-spacing: 0px;
                                  color: #137b97;
                                "
                              >
                                جميع الحقوق محفوظة لشركة حل سوفت © 2022
                              </p>
                              <p
                                class=""
                                style="
                                  font-size: 18px;
                                  letter-spacing: 0px;
                                  color: #394e85;
                                  margin-bottom: 30px;
                                "
                              >
                                <i class="fa fa-globe"></i
                                >{{ trans('website') + ':' }}
                                {{ settings.website }}
                              </p>
                            </div>
                            <div class="auto">
                              <p
                                style="
                                  font-size: 18px;
                                  letter-spacing: 0px;
                                  color: #394e85;
                                  margin-bottom: 30px;
                                  display: flex;
                                  flex-direction: column;
                                "
                              >
                                <span>توقيع البائع</span>
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
                            border-radius: 19px !important;
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
                            border-radius: 19px !important;
                            font: normal normal 300 14px/11px Tahoma;
                            letter-spacing: 0px;
                            color: #ffffff;
                            padding: 15px 50px;
                          "
                          type="submit"
                          @click="printSmallReceipt"
                        >
                          {{ trans('print_small_invoice') }}
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

                    <!-- <b-button class="m-2" variant="success"
                                                v-if="sale.arrears && !sale.paid"
                                                :to="'/receipt-voucher/add?type=arrears&reference_id='+sale.id+'&amount='+sale.total">
                                          {{ strings['clear sale'] }}
                                      </b-button> -->
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
    <SaleReceipt></SaleReceipt>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import SaleReceipt from './modals/SaleReceipt.vue'
import Refund from './modals/Refund.vue'
import GoogleMap from '../global/GoogleMap.vue'

// import 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDieZ7uAY4DPdT3Z4fp4KtykHl6dWryYdw&callback=initMap';
Vue.use(VuejsDialog)
export default {
  name: 'AppSale',
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'permissions'],
  components: { SaleReceipt, Refund, GoogleMap },
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
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.initPrintMe()

    this.refresh()
  },

  methods: {
    refresh() {
      let url = '/api/refund-sales/' + this.$route.params.id
      // this.loaded = false;
      axios
        .get(url)
        .then(res => {
          if (res.data.status) {
            this.sale = res.data.body.refund_sales.sale

            if (!this.sale.customer) {
              this.sale.customer = {}
            }
            // this.latitude  = parseFloat(res.data.body.sale.customer.longitude) || parseFloat(res.data.body.sale.longitude);
            // this.longitude = parseFloat(res.data.body.sale.customer.latitude) || parseFloat(res.data.body.sale.latitude) ;
            // this.addedTax = parseFloat((res.data.body.sale.total+res.data.body.sale.discount_amount) - res.data.body.sale.subtotal).toFixed(2);
            this.strings = res.data.strings
            this.language = res.data.language
            this.refund = res.data.body.refund_sales
            // this.has_refund = res.data.body.has_refund;
            // this.vouchers = res.data.body.vouchers;
            this.loaded = true
            // this.qr = res.data.qr;
            // if (this.sale.longitude) {
            //     this.initMap(this.sale.longitude, this.sale.latitude);
            // }
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

    closeSaleReceiptModal() {
      this.$bvModal.hide('sale-receipt-modal2')
    },
    printReceipt() {
      //invoke Print me From Mixin //
      this.printMe('#sale-invoice-test', this.cssText)
    },
    printSmallReceipt() {
      //invoke Print me From Mixin //
      this.printMe('#smallInvoice', this.cssText)
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
</style>
