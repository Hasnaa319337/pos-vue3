<template>
  <!-- orginal invoice -->
  <div
    id="generalInvoice"
    style="
      padding: 0 10px;
      margin: 10px;
      color: #353f4d;
      font: normal normal 14px Tahoma;
    "
  >
    <div
      class="d-none"
      :style="{
        direction: language == 'en' ? 'ltr !important' : 'rtl !important',
        'text-align': language == 'en' ? 'left !important' : 'right !important',
      }"
    >
      <div>
        <!-- company info -->
        <b-row
          style="
            font-family: BahijTheSansArabic-Light !important;
            border: 1px solid #86cbe4 !important;
            border-radius: 8px !important;
            padding: 8px !important;
          "
          class="mx-0 mb-3 justify-content-between row_box"
        >
          <div class="col p-0" style="text-align: right !important">
            <div class="col-auto p-0">
              <div class="right_header_parent">
                <h1
                  class="title"
                  style="color: #353f4d; margin-bottom: 10px; font-size: 23px"
                >
                  <strong>
                    {{ getSetting('company_name') }}
                  </strong>
                </h1>
                <!-- <div style="display: flex; column-gap: 5px"></div> -->

                <p
                  class="paragraph_header_bottom"
                  style="color: #353f4d; margin-bottom: 10px"
                >
                  <span>{{ trans('tax_num') }} : </span>
                  <span>{{ getSetting('tax_number') }}</span>
                </p>
                <p
                  class="paragraph_header_bottom"
                  style="color: #353f4d; margin-bottom: 10px"
                >
                  <span>{{ trans('address') }} : </span>
                  <span>
                    {{ getSetting('company_address') }}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="col p-0" style="text-align: center !important">
            <div style="width: 60px; height: 60px; margin: auto">
              <img
                :src="getSetting('logo')"
                style="width: 100%; height: 100%; object-fit: cover"
              />
            </div>
            <p
              style="
                text-align: center !important;
                color: #353f4d;
                font-size: 18px;

                margin: 10px 0;
                font-weight: 900;
              "
            >
              {{ purchaseInvoiceType }} {{ trans('Tax') }}
            </p>
          </div>
          <div class="col p-0" style="text-align: left !important">
            <div class="right_header_parent">
              <h1
                class="title"
                style="color: #353f4d; margin-bottom: 10px; font-size: 20px"
              >
                <strong>
                  {{ getSettingLang('company_name') }}
                </strong>
              </h1>
            </div>

            <p
              class="paragraph_header_bottom"
              style="color: #353f4d; margin-bottom: 10px"
            >
              <span> TِAX NUMBER : </span>
              <span>{{ getSetting('tax_number') }}</span>
            </p>
            <p
              class="paragraph_header_bottom"
              style="color: #353f4d; margin-bottom: 10px"
            >
              <span> ADDRESS :</span>
              <span>
                {{ getSettingLang('company_address') }}
              </span>
            </p>
          </div>
        </b-row>

        <!-- customer info -->

        <b-row
          style="
            border: 1px solid #86cbe4 !important;
            border-radius: 8px !important;
            padding: 8px !important;
          "
          :style="{
            direction: language == 'en' ? 'ltr' : 'rtl',
            textAlign: language == 'en' ? 'left' : 'right',
          }"
          class="mx-0 mb-3 justify-content-between row_box"
        >
          <div class="col">
            <div class="row justify-content-between">
              <div class="col-auto p-0">
                <div class="right_header_parent">
                  <p style="margin: 5px 0; font-size: 16px !important">
                    <span
                      style="
                        color: #828282;
                        font-family: 'BahijTheSansArabic-Light';
                      "
                      >{{ trans('provider name') }} :
                    </span>
                    <span
                      style="
                        color: #353f4d;
                        font-weight: 900;
                        font-family: 'BahijTheSansArabic-Bold';
                      "
                    >
                      {{ invoice.provider.name }}
                    </span>
                  </p>
                  <p style="margin: 5px 0; font-size: 16px !important">
                    <span
                      style="
                        color: #828282;
                        font-family: 'BahijTheSansArabic-Light';
                      "
                    >
                      {{ trans('provider phone') }} :
                    </span>
                    <span
                      style="
                        color: #353f4d;
                        font-weight: 900;
                        font-family: 'BahijTheSansArabic-Bold';
                      "
                    >
                      {{ invoice.provider.phone }}
                    </span>
                  </p>
                  <p style="margin: 5px 0">
                    <span
                      style="
                        color: #828282;
                        font-size: 16px !important;
                        font-family: 'BahijTheSansArabic-Light';
                      "
                      >{{ trans('provider tax number') }} :
                    </span>
                    <span
                      style="
                        font-size: 16px !important;
                        color: #353f4d;
                        font-weight: 900;
                        font-family: 'BahijTheSansArabic-Bold';
                      "
                      >{{ _.get(invoice, 'provider.tax_num') }}</span
                    >
                  </p>

                  <p style="margin: 5px 0; font-size: 16px !important">
                    <span
                      style="
                        color: #828282;
                        font-family: 'BahijTheSansArabic-Light';
                      "
                      >{{ trans('provider address') }} :
                    </span>
                    <span
                      style="
                        color: #353f4d;
                        font-weight: 900;
                        font-family: 'BahijTheSansArabic-Bold';
                      "
                    >
                      {{ invoice.provider.address }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-auto p-0">
            <img
              class="qr-image-orginal"
              :src="this.invoice.qr"
              style="width: 150px !important"
            />
          </div>
          <div class="col p-0">
            <p style="margin: 5px 0; font-size: 16px !important">
              <span
                style="color: #828282; font-family: 'BahijTheSansArabic-Light'"
                >{{ trans('invoice number') }} :
              </span>
              <span
                style="
                  color: #353f4d;
                  font-weight: 900;
                  font-family: 'BahijTheSansArabic-Bold';
                "
              >
                {{ invoice.id }}</span
              >
            </p>
            <p style="margin: 5px 0; font-size: 16px !important">
              <span
                style="color: #828282; font-family: 'BahijTheSansArabic-Light'"
                >{{ trans('provider invoice number') }} :
              </span>
              <span
                style="
                  color: #353f4d;
                  font-weight: 900;
                  font-family: 'BahijTheSansArabic-Bold';
                "
              >
                {{ invoice.provider_inv_number }}</span
              >
            </p>

            <p
              style="margin: 5px 0; font-size: 16px !important"
              class="paragraph_left_header"
            >
              <span
                style="color: #828282; font-family: 'BahijTheSansArabic-Light'"
                >{{ trans('invoice date') }} :
              </span>
              <span
                style="
                  color: #353f4d;
                  font-weight: 900;
                  font-family: 'BahijTheSansArabic-Bold';
                "
                >{{ invoice.invoice_date }}</span
              >
            </p>

            <p style="margin: 5px 0; font-size: 16px !important">
              <span
                style="color: #828282; font-family: 'BahijTheSansArabic-Light'"
                >{{ trans('invoice type') }} :
              </span>
              <span
                style="
                  color: #353f4d;
                  font-weight: 900;
                  font-family: 'BahijTheSansArabic-Bold';
                "
              >
                {{ trans(invoice.payment_type) }}</span
              >
            </p>
            <p style="margin: 5px 0; font-size: 16px !important">
              <span
                style="color: #828282; font-family: 'BahijTheSansArabic-Light'"
                >{{ trans('payment method') }} :
              </span>
              <span
                style="
                  color: #353f4d;
                  font-weight: 900;
                  font-family: 'BahijTheSansArabic-Bold';
                "
                v-if="invoice.payment_type != 'full'"
              >
                {{ trans('installment') }}</span
              >
              <span
                style="
                  color: #353f4d;
                  font-weight: 900;
                  font-family: 'BahijTheSansArabic-Bold';
                "
                v-else
              >
                {{ trans(invoice.payment_method) }}</span
              >
            </p>
          </div>
        </b-row>

        <div
          class="row justify-content-end m-0"
          style="
            border: 1px solid #f2f2f2;
            border-top-left-radius: 9px !important;
            border-top-right-radius: 9px !important;
          "
        >
          <div
            class="col-12"
            style="
              background: #f2f2f2;
              border-top-left-radius: 9px !important;
              border-top-right-radius: 9px !important;
              align-items: center;
              justify-content: center;
            "
          >
            <div
              class="row table_div_body"
              style="
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 5px 0;
              "
            >
              <div
                class="col table_header_div_chlid"
                style="padding: 0 5px; max-width: 20px"
              >
                <span
                  style="writing-mode: vertical-rl; transform: rotate(180deg)"
                >
                  {{ trans('number') }}</span
                >
              </div>
              <div class="col" style="padding: 0 5px; min-width: 150px">
                {{ trans('product') }}
              </div>
              <div class="col table_header_div_chlid" style="padding: 0 5px">
                {{ trans('unit') }}
              </div>
              <div
                class="col table_header_div_chlid"
                style="min-width: 67px !important; padding: 0 5px"
              >
                {{ trans('quantity') }}
              </div>
              <div
                class="col table_header_div_chlid"
                style="max-width: 67px !important; padding: 0 5px"
              >
                {{ trans('price') }}
              </div>

              <div class="col table_header_div_chlid" style="padding: 0 5px">
                {{ trans('Discount value') }}
              </div>

              <div class="col table_header_div_chlid" style="padding: 0 5px">
                {{ trans('taxable amount') }}
              </div>
              <div class="col table_header_div_chlid" style="padding: 0 5px">
                {{ trans('added tax') }}
              </div>

              <div class="col table_header_div_chlid" style="padding: 0 5px">
                {{ trans('added_tax_value') }}
              </div>

              <div class="col" style="background: #f2f2f2">
                {{ trans('total value') }}
              </div>
            </div>
          </div>

          <div class="col-12 m-0 p-0">
            <div
              style="
                align-items: center;
                justify-content: center;
                text-align: center !important;
                height: 80px;
              "
              :style="
                index % 2 !== 0
                  ? 'background: #F2F2F2'
                  : 'background: transparent'
              "
              v-for="(item, index) in invoice.items"
              :key="index"
              class="row table_div_body"
            >
              <div class="" style="padding: 0 5px; width: 20px">
                {{ index + 1 }}
              </div>
              <div style="height: 80px; width: 2px; background: #f2f2f2"></div>
              <div
                class="col table_header_div_chlid"
                style="padding: 0 10px; min-width: 150px; text-align: start"
              >
                <span> {{ item.title }}</span>

                <span style="margin: 7px 0 2px; display: block">
                  {{ item.serial }}</span
                >
              </div>
              <div style="height: 80px; width: 2px; background: #f2f2f2"></div>

              <div class="col table_header_div_chlid" style="padding: 5px">
                {{ item.unit_key }}
              </div>
              <div style="height: 80px; width: 2px; background: #f2f2f2"></div>
              <div class="col" style="padding: 15px 5px">
                {{ item.quantity }}
              </div>
              <div style="height: 80px; width: 2px; background: #f2f2f2"></div>
              <div class="col table_header_div_chlid" style="padding: 0 5px">
                {{ item.cost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}
              </div>
              <div style="height: 80px; width: 2px; background: #f2f2f2"></div>
              <div class="col table_header_div_chlid" style="padding: 0 5px">
                {{
                  parseFloat(item.discount_amount)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}
              </div>
              <div style="height: 80px; width: 2px; background: #f2f2f2"></div>
              <div class="col table_header_div_chlid" style="padding: 0 5px">
                {{
                  parseFloat(item.subtotal)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}
              </div>
              <div style="height: 80px; width: 2px; background: #f2f2f2"></div>
              <div class="col" style="padding: 0 5px">
                {{ item.tax_percentage }} %
              </div>
              <div style="height: 80px; width: 2px; background: #f2f2f2"></div>
              <div class="col table_header_div_chlid">
                {{
                  parseFloat(item.total - item.subtotal)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}
              </div>
              <div style="height: 80px; width: 2px; background: #f2f2f2"></div>
              <!-- style="background: #f2f2f2;" -->
              <div
                class="col table_header_div_chlid"
                style="
                  height: 80px;
                  background: #f2f2f2;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                {{
                  parseFloat(item.total)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-between align-items-start m-0" style="">
          <div
            style="
              padding: 0 !important;
              margin: 0 !important;
              width: 408px !important;
            "
          >
            <p
              style="
                color: #353f4d;
                font-weight: 900;
                font: normal normal bold 15px Tahoma;
                border: 1px solid #f3f3f3;
                padding: 10px 5px;
                border-left: none !important;
              "
            >
              <span>{{ trans('total amount') }} : </span>
              <span>{{ calcQty }} {{ trans('Unit') }}</span>
            </p>

            <div
              class="text"
              style="
                margin: 10px 0;
                font: normal normal 13px/20px Tahoma;
                width: 90%;
              "
            >
              <h3 style="margin: 0 0 5px 0">امكانية :</h3>
              <p style="margin: 0 0 5px 0">
                - اضافة الحساب البنكي للشركة لتحويل العملاء
              </p>
              <p>
                اقر انا الموقع على هذه الفاتورة اننى استلمت كافة البضاعة المدونة
                بها بحالة سليمة واننى سأقوم بسداد قيمتها و في حالة عدم السداد
                تتغير هذه الفاتورة بمثابة سند لأمر يحق للشركة المطالبة بقيمتها
                لدى محاكم التنفيذ
              </p>
            </div>
            <!-- <div class="row m-0" v-if="!has_refund == 1">
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
          </div> -->
          </div>
          <div
            style="
              margin: 0 !important;
              padding: 15px;
              max-width: 45%;
              background-color: #f2f2f2;
              color: #514d4d;
              border-bottom-left-radius: 9px !important;
              border-bottom-right-radius: 9px !important;
              margin-bottom: 20px !important;
            "
          >
            <div
              class="row justify-content-between mb-1"
              style="
                font: normal normal bold 13px/20px Tahoma;
                letter-spacing: 0px;
                padding: 5px 0;
              "
            >
              <b
                class="px-3"
                style="
                  font: normal normal bold 13px/20px Tahoma;
                  letter-spacing: 0px;
                "
                >{{ trans('total_value_with_no_added_tax') }}</b
              >
              <b class="px-3" style="letter-spacing: 0px"
                >{{
                  parseFloat(invoice.subtotal)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}&nbsp;
              </b>
            </div>

            <div
              class="row justify-content-between mb-1"
              style="
                font: normal normal bold 13px/20px Tahoma;
                letter-spacing: 0px;
                padding: 5px 0;
              "
            >
              <b
                class="px-3"
                style="
                  font: normal normal bold 13px/20px Tahoma;
                  letter-spacing: 0px;
                "
                >{{ trans('total discount') }}</b
              >
              <b class="px-3" style="letter-spacing: 0px">
                {{
                  parseFloat(invoice.discount_amount)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}&nbsp;
              </b>
            </div>

            <div
              class="row justify-content-between mb-1"
              style="
                font: normal normal bold 13px/20px Tahoma;
                letter-spacing: 0px;
                padding: 5px 0;
              "
            >
              <b
                class="px-3"
                style="
                  font: normal normal bold 13px/20px Tahoma;
                  letter-spacing: 0px;
                "
                >{{ trans('total value after discount') }}</b
              >
              <b class="px-3" style="letter-spacing: 0px">
                {{
                  parseFloat(invoice.subtotal - invoice.discount_amount)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}&nbsp;
              </b>
            </div>

            <div
              class="row justify-content-between mb-1"
              style="
                font: normal normal bold 13px/20px Tahoma;
                letter-spacing: 0px;
                padding: 5px 0;
              "
            >
              <b
                class="px-3"
                style="
                  font: normal normal bold 13px/20px Tahoma;
                  letter-spacing: 0px;
                "
                >{{ trans('added_tax_value') }} ({{
                  invoice.items[0].tax_percentage
                }}
                %)</b
              >
              <b class="px-3" style="letter-spacing: 0px">
                {{
                  parseFloat(invoice.tax_amount)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}&nbsp;
              </b>
            </div>

            <div
              class="row justify-content-between"
              style="
                display: flex;
                justify-content: space-between;
                border-radius: 9px;
                font: bold 13px / 20px Tahoma;
                background-color: rgb(255, 255, 255);
                padding: 10px 0;
                margin: 0 0px 5px 0;
              "
            >
              <b class="px-3">{{ trans('total') }}</b>

              <b class="px-3" style="font: normal normal bold 13px/20px Tahoma">
                {{
                  parseFloat(invoice.total)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}
                {{ getSetting('currency', settings) }}
              </b>
            </div>
            <div
              class="row justify-content-between"
              style="
                border-radius: 9px;
                font: bold 13px / 20px Tahoma;

                padding: 5px 0;

                justify-content: center !important;
              "
            >
              <b class="px-3">
                {{ invoice.total_string }}
              </b>
            </div>
          </div>
        </div>
        <!-- <h2
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
                {{ trans('product') }}
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
                {{ user.language == 'en' ? 'Added tax ' : 'ض القيمة المضافة' }}
              </div>
              <div class="col" style="max-width: 90px; padding: 0 5px">
                {{ user.language == 'en' ? 'Added tax ' : 'قيمة الضريبه' }}
              </div>
              <div class="col" style="padding: 0 5px">
                {{
                  user.language == 'en'
                    ? 'Price after tax'
                    : 'التكلفة قبل الضريبة'
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
                >{{ trans('adding_added_tax') }}</b
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
              <b class="px-3" style="font: normal normal bold 13px/20px Tahoma">
                {{ refund.total_refunded }}
                {{
                 trans('SAR)
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
        </div> -->

        <b-row
          :style="{
            direction: language == 'en' ? 'ltr' : 'rtl',
            textAlign: language == 'en' ? 'left' : 'right',
          }"
          class="justify-content-around invoice-footer"
          style="
            margin-top: 0px;
            justify-content: center;
            font: normal normal 17px Tahoma;
            color: #353f4d;
          "
        >
          <b-col v-if="!purchaseInvoiceType">
            <p>
              {{ trans('vendor name') }}
            </p>
            <p>................</p>
          </b-col>
          <b-col v-if="!purchaseInvoiceType">
            <p>
              {{ trans('vendor signature') }}
            </p>
            <p>................</p>
          </b-col>
          <b-col>
            <p>
              {{ trans('Warehouse signature') }}
            </p>
            <p>......................</p>
          </b-col>
          <b-col>
            <p>
              {{ trans('Recipient name') }}
            </p>
            <p>..................</p>
          </b-col>
          <b-col>
            <p>
              {{ trans('Recipient signature') }}
            </p>
            <p>....................</p>
          </b-col>
        </b-row>
        <!-- <div style="height: 10px; width: 100%; background: transparent"></div> -->

        <b-row
          style="
            margin-top: 10px;
            border: 1px solid #f3f3f3;
            border-left: none !important;
            border-right: none !important;
            align-items: center;
            justify-content: center;
            align-items: end;
          "
        >
          <div class="col-auto">
            <p
              style="
                color: #394e85;
                margin: 15px 0;
                font-size: 17px !important;

                align-items: center;
              "
            >
              <span> {{ getSetting('website') }}</span>
            </p>
          </div>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['invoice', 'refund', 'settings', 'purchaseInvoiceType', 'language'],
  data() {
    return {
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

  computed: {
    calcQty() {
      let totalQuantity = 0
      this.invoice.items.map(el => {
        totalQuantity += el['quantity']
      })
      return totalQuantity
    },
  },
  methods: {
    // getSetting(key, lang) {
    //   const result = this.settings.find(el => {
    //     if (el.key === key) {
    //       if (el.translated_value !== null) {
    //         return el.translation.translated_value[lang]
    //       } else {
    //         return el.value
    //       }
    //     }
    //   })

    //   return result.translation.translated_value[lang] ? result.translation.translated_value[lang] : result.value
    // },
    getSetting(key) {
      const result = this.settings.find(el => {
        if (el.key === key) {
          return el.value
        }
      })

      return result.value
    },
    getSettingLang(key) {
      const result = this.settings.find(el => {
        if (el.key === key) {
          return el.translation.translated_value['en']
        }
      })

      return result.translation.translated_value['en']
    },
  },
}
</script>

<style></style>
