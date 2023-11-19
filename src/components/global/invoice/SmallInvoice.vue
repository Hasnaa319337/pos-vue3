<template>
  <!-- Small invoice -->

  <div>
    <div
      id="smallInvoice"
      class="main_div"
      style="
        box-shadow: 3px 3px 4px 4px #c9c6c699;
        width: 450px;
        padding: 10px 5px;
        font-family: 'BahijTheSansArabic-Light';
        text-align: center;
        margin: 0px auto;
        justify-content: center;
        direction: rtl;
        margin: 10px auto;
      "
    >
      <div
        class="child_div"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          justify-items: center;
          flex-direction: column;
          margin: 12px 0;
        "
      >
        <h2
          style="
            font-size: 25px !important;
            font-family: sans-serif !important;
            font-weight: 600;
            font-style: normal;
          "
        >
          <!-- {{
            language == 'en'
              ? settings.company_name_en
              : settings.company_name_ar
          }} -->

          شركة حل كارت للخدمات البرمجية
        </h2>
        <div class="row" style="margin: 3px 0">
          <span>{{ trans('tax_number') }} : </span>
          <span>{{ settings.tax_number }}</span>
        </div>
        <div class="row" style="margin: 3px 0">
          <span>{{ trans('commercial register') }} : </span>
          <span></span>
        </div>
        <div class="row" style="margin: 3px 0">
          <span>{{ trans('phone number') }} : </span>
          <span>0153698750</span>
        </div>
        <div class="row" style="margin: 3px 0">
          <span>{{ trans('address') }} : </span>
          <span>
            <!-- {{
              language == 'en'
                ? settings.company_address_en
                : settings.company_address_ar
            }} -->
          </span>
        </div>
        <div class="row" style="margin: 3px 0">
          <span> {{ trans('date') }} : </span>
          <span>{{ invoice.invoice_date }} </span>
        </div>
      </div>

      <div
        class="dashed"
        style="
          width: 100%;
          border-bottom: 2px #00000070 dashed;
          margin-top: 5px;
        "
      ></div>

      <div
        class="child_div"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          justify-items: center;
          flex-direction: column;
          margin: 12px 0;
        "
      >
        <h2
          style="
            font-size: 25px !important;
            font-family: sans-serif !important;
            font-weight: 600;
            font-style: normal;
          "
        >
          {{ purchaseInvoiceType }} {{ trans('simplified') }}
        </h2>
        <div class="row" style="margin: 3px 0">
          <span>{{ trans('invoice number') }} : </span>
          <span class="bold_span" style="font-weight: 600">
            # {{ invoice.id }}</span
          >
        </div>
        <div class="row" style="margin: 3px 0">
          <span>{{ trans('by') }} : </span>
          <span class="bold_span" style="font-weight: 600">
            {{ _.get(invoice, 'provider.name') }}</span
          >
        </div>
      </div>
      <div
        class="dashed"
        style="
          width: 100%;
          border-bottom: 2px #00000070 dashed;
          margin-top: 5px;
        "
      ></div>

      <div
        class="child_div"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          justify-items: center;
          flex-direction: column;
          margin: 12px 0;
        "
      >
        <div class="row" style="margin: 3px 0">
          <span>{{ trans('customer name') }} : </span>
          <span class="bold_span" style="font-weight: 600">admin</span>
        </div>
      </div>
      <div
        class="dashed"
        style="
          margin-bottom: 15px;
          width: 100%;
          border-bottom: 2px #00000070 dashed;
          margin-top: 5px;
        "
      ></div>

      <!-- Start:: items -->
      <div class="row justify-content-end m-0">
        <div class="col-12" style="padding: 0">
          <div class="row align-items-center m-0">
            <div
              class=""
              style="padding: 0 5px; width: 35px; text-align: start !important"
            >
              {{ trans('number') }}
            </div>
            <div
              class=""
              style="padding: 0 5px; !important;text-align:start !important"
            >
              {{ trans('item') }}
            </div>

            <!-- <div class="col table_header_div_chlid" style="padding: 0 5px;">{{trans('item')}}</div> -->
            <div class="col" style="padding: 0 5px">
              {{ trans('quantity') }}
            </div>
            <div class="col" style="padding: 0 5px">
              {{ trans('unit price') }}
            </div>

            <div class="col" style="padding: 0 5px">ق.ض.م</div>
            <div class="col" style="padding: 0 5px">
              {{ trans('total') }}
            </div>
          </div>
        </div>

        <div class="dashed" style="margin: 10px 0"></div>
        <div
          class="col-12"
          style="font-size: 16px !important; font-weight: 500; padding: 0"
        >
          <div
            v-for="(item, index) in invoice.items"
            :key="'sale' + index"
            class="m-0"
            style="padding: 0"
          >
            <div
              class="row m-0"
              style="
                font-size: 16px !important;

                font-weight: 500;
                padding: 0;
                text-align: start !important;
              "
            >
              <div
                style="
                  width: 35px;
                  padding: 0 5px;
                  margin: 5px 0 !important;
                  text-align: start !important;
                "
              >
                {{ index + 1 }}
              </div>
              <div style="padding: 0 5px; text-align: center !important">
                {{ item.title }}
              </div>
            </div>

            <div
              class="row align-items-center m-0"
              style="
                font-size: 16px !important;
                text-align: center;
                font-weight: 500;
                padding: 0;
              "
            >
              <div
                class=""
                style="margin-bottom: 5px !important; width: 30px !important"
              ></div>
              <div
                class=""
                style="padding: 0 5px; text-align: start !important"
              >
                {{ item.serial }}
              </div>
              <div class="col" style="padding: 0 5px">
                {{ item.quantity }}
              </div>
              <div class="col" style="padding: 0 5px">
                {{
                  parseFloat(item.cost)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}
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
                <!-- {{parseFloat((parseFloat(item.price) + parseFloat(item.tax_percentage / 100) * parseFloat(item.price)) * item.quantity).toFixed(2) }} -->
              </div>
            </div>

            <div
              class="m-0"
              style="
                font-size: 16px !important;

                font-weight: 500;
                padding: 0;
              "
            >
              <!--  v-if="invoice.note" -->
              <div
                style="
                  text-align: start;
                  padding: 10px 5px;
                  width: 100%;
                  margin: 12px 0 !important;
                  background: #f2f2f2;
                  border-radius: 5px;
                "
              >
                {{ trans('note') }} : {{ invoice.note }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End:: items -->

      <div
        class="dashed"
        style="
          margin: 5px 0;
          width: 100%;
          border-bottom: 2px #00000070 dashed;
          margin-top: 5px;
        "
      ></div>

      <!-- Start::Totals -->
      <div class="col-12">
        <h1>
          <div class="row">
            <div class="col-12">
              <div
                class="total_css"
                style="
                  display: flex;
                  justify-content: space-between;
                  font-size: 18px;
                  font-family: sans-serif !important;
                  font-weight: 600;
                  font-style: normal;
                  padding: 5px 0;
                "
              >
                <span>{{ trans('total value before discount') }} </span>
                <span>
                  {{ parseFloat(invoice.subtotal).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
        </h1>
      </div>
      <div class="col-12">
        <h1>
          <div class="row">
            <div class="col-12">
              <div
                class="total_css"
                style="
                  display: flex;
                  justify-content: space-between;
                  font-size: 18px;
                  font-family: sans-serif !important;
                  font-weight: 600;
                  font-style: normal;
                  padding: 5px 0;
                "
              >
                <span>{{ trans('total discount') }} </span>
                <span
                  >{{ parseFloat(invoice.discount_amount).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
        </h1>
      </div>
      <div class="col-12">
        <h1>
          <div class="row">
            <div class="col-12">
              <div
                class="total_css"
                style="
                  display: flex;
                  justify-content: space-between;
                  font-size: 18px;
                  font-family: sans-serif !important;
                  font-weight: 600;
                  font-style: normal;
                  padding: 5px 0;
                "
              >
                <span>{{ trans('total value after discount') }} </span>
                <span
                  >{{
                    parseFloat(
                      parseFloat(invoice.subtotal).toFixed(2) -
                        parseFloat(invoice.discount_amount).toFixed(2)
                    ).toFixed(2)
                  }}
                </span>
              </div>
            </div>
          </div>
        </h1>
      </div>
      <div class="col-12">
        <h1>
          <div class="row">
            <div class="col-12">
              <div
                class="total_css"
                style="
                  display: flex;
                  justify-content: space-between;
                  font-size: 18px;
                  font-family: sans-serif !important;
                  font-weight: 600;
                  font-style: normal;
                  padding: 5px 0;
                "
              >
                <span
                  >{{ trans('adding_added_tax') }}
                  {{ invoice.tax_percentage }} %
                </span>
                <span>{{ parseFloat(invoice.tax_amount).toFixed(2) }} </span>
              </div>
            </div>
          </div>
        </h1>
      </div>
      <div
        class="col-12 last_col"
        style="background: #f2f2f2; border-radius: 5px"
      >
        <h1 style="">
          <div class="row">
            <div class="col-12">
              <div
                class="total_css"
                style="
                  display: flex;
                  justify-content: space-between;
                  font-size: 18px;
                  font-family: sans-serif !important;
                  font-weight: 600;
                  font-style: normal;
                  padding: 10px 0;
                "
              >
                <span>{{ trans('invoice total') }} </span>
                <span
                  >{{ parseFloat(invoice.total).toFixed(2) }}
                  {{ getSetting('currency', settings) }}</span
                >
              </div>
            </div>
          </div>
        </h1>
      </div>
      <div
        class="string"
        style="
          margin: 15px 0;
          font-size: 20px;
          font-family: sans-serif !important;
          font-weight: 600;
          font-style: normal;
        "
      >
        {{ invoice.total_string }}
      </div>

      <!-- End::Totals -->
      <div
        class="dashed"
        style="
          margin-top: 15px;
          width: 100%;
          border-bottom: 2px #00000070 dashed;
          margin-top: 5px;
        "
      ></div>
      <div
        class="child_div"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          justify-items: center;
          flex-direction: column;
          margin: 12px 0;
        "
      >
        <div class="row bold_span" style="font-size: 23px; font-weight: 600">
          <span>{{ trans('total amount') }} : </span>
          <span class="bold_span" style="font-weight: 600"
            >{{ calcQty }} {{ trans('Unit') }}</span
          >
        </div>
      </div>
      <div
        class="dashed"
        style="
          width: 100%;
          border-bottom: 2px #00000070 dashed;
          margin-top: 5px;
        "
      ></div>
      <div class="col-12" style="padding: 0">
        <img class="qr-image" :src="this.invoice.qr" />
      </div>
      <!-- <div v-if="has_refund" class="col-12" style="padding: 0">
        <img class="qr-image" :src="this.refund.qr" />
      </div> -->
      <div
        class="row"
        style="margin: 3px 0; justify-content: center !important"
      >
        <span> الفاتورة الالكترونية qr </span>
      </div>

      <div
        class="row"
        style="margin: 3px 0; justify-content: center !important"
      >
        <span>{{ trans('website') }} : </span>
        <span> {{ settings.website }}</span>
      </div>
      <div
        class="dashed"
        style="
          width: 100%;
          border-bottom: 2px #00000070 dashed;
          margin-top: 5px;
        "
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'language',
    'invoice',
    'settings',
    'purchaseInvoiceType',
    'refund',
    'has_refund',
  ],

  data() {
    return {}
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
}
</script>

<style scoped lang="scss">
#smallInvoice {
  box-shadow: 3px 3px 4px 4px #c9c6c699;
  margin: 10px auto;
}
.main_div {
  width: 450px;
  padding: 10px 5px;

  text-align: center;
  margin: 0px auto;
  justify-content: center;
  direction: rtl;
}
.child_div {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  margin: 12px 0;

  div {
    margin: 3px 0;
  }

  h2 {
    font-size: 25px !important;
    font-family: sans-serif !important;
    font-weight: 600;
    font-style: normal;
  }

  .bold_span {
    font-weight: 600;
  }
}
.dashed {
  width: 100%;
  border-bottom: 2px #00000070 dashed;
  margin-top: 5px;
}
.last_col {
  background: #f2f2f2;
  border-radius: 5px;
}
.total_css {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-family: sans-serif !important;
  font-weight: 600;
  font-style: normal;
}
.string {
  margin: 5px 0;
  font-size: 20px;
  font-family: sans-serif !important;
  font-weight: 600;
  font-style: normal;
}

.products {
  div,
  .table_div_body {
    font-size: 16px !important;

    font-weight: 500;
  }

  .table_div_body {
    div:first-of-type {
      margin: 14px 0 !important;
    }
  }
}
</style>
