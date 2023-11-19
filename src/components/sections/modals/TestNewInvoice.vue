<template>
  <section>
    <b-modal
      :no-close-on-backdrop="true"
      id="test-modal"
      hide-footer
      class="test-modal"
      ref="test-modal"
      centered
      scrollable
      size="xl"
    >
      <div
        id="smallTest"
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
        test small
      </div>

      <div
        id="largeTest"
        :style="{
          direction: language == 'en' ? 'ltr !important' : 'rtl !important',
          'text-align':
            language == 'en' ? 'left !important' : 'right !important',
        }"
      >
        <div class="head">
          <div class="row">
            <div class="col-sm-9">
              <h2 class="main_head">فاتورة ضريبة</h2>
              <div class="d-flex head_flexed">
                <div>
                  <span class="first_span">الرقم التسلسلي</span>
                  <span>784525647874</span>
                </div>
                <div>
                  <span class="first_span">التاريخ</span>
                  <span>22-10-2023 - 08:10</span>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="qr_div">
                <img
                  class="qr_image"
                  src="@/assets/images/qr.png"
                  alt="qr image"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="second_div">
          <h1 class="second_div_header">معلومات البائع</h1>
          <div class="second_div_data d-flex">
            <div>
              <span class="second_div_first_span">اسم البائع</span>
              <span>يوسف طه</span>
            </div>
            <div>
              <span class="second_div_first_span">عنوان البائع</span>
              <span>الرياض,حي الملز</span>
            </div>
            <div>
              <span class="second_div_first_span"
                >رقم تسجيل ضريبة القمية المضافة للبائع</span
              >
              <span>25252545422002020252525</span>
            </div>
            <div>
              <span class="second_div_first_span">رقم السجل التجاري</span>
              <span>20025445422</span>
            </div>
          </div>
        </div>

        <hr />

        <div class="second_div">
          <h1 class="second_div_header">معلومات المشتري</h1>
          <div class="second_div_data d-flex">
            <div>
              <span class="second_div_first_span">اسم المشتري</span>
              <span>يوسف طه</span>
            </div>
            <div>
              <span class="second_div_first_span">عنوان المشتري</span>
              <span>الرياض,حي الملز</span>
            </div>
            <div>
              <span class="second_div_first_span"
                >رقم تسجيل ضريبة القمية المضافة للمشتري</span
              >
              <span>25252545422002020252525</span>
            </div>
            <div>
              <span class="second_div_first_span">رقم السجل التجاري</span>
              <span>20025445422</span>
            </div>
          </div>
        </div>

        <hr />

        <div class="third_div">
          <table>
            <thead>
              <tr>
                <th>المنتج</th>
                <th>سعر الوحدة</th>
                <th>الكمية</th>
                <th>المجموع الفرعي بدون ضريبة</th>
                <th>نسبة الضريبة</th>
                <th>قيمة الضريبة</th>
                <th>المجموع شامل ضريبة القيمة المضافة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>منتج 1</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
              </tr>
              <tr>
                <td>منتج 2</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
              </tr>
              <tr>
                <td>منتج 3</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
              </tr>
              <tr>
                <td>منتج 4</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
                <td>150.00</td>
              </tr>
            </tbody>
          </table>
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
          ype="submit"
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
          @click="closeTestModal"
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
  data() {
    return {
      customEvents: [
        {
          eventName: 'open-test-modal',
          callback: this.openPurchaseReceiptModal,
        },
      ],
      message: '',
      alertType: '',
      invoice: [],
      language: '',
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
      strings: {},
      addedTax: '',
      user: {},
      settings: {},
      refund: {},
      has_refund: '',
      refundTotal: '',
      qr: '',
    }
  },
  created() {
    this.customEvents.forEach(function (customEvent) {
      SharedEvent.listen(customEvent.eventName, customEvent.callback)
    })
  },
  destroyed() {
    this.customEvents.forEach(function (customEvent) {
      SharedEvent.off(customEvent.eventName, customEvent.callback)
    })
  },
  mounted() {
    this.initPrintMe()
  },
  methods: {
    openPurchaseReceiptModal(data) {
      this.$refs['test-modal'].show()
    },
    closeTestModal() {
      SharedEvent.fire('close-test-modal')
      this.$bvModal.hide('test-modal')
    },
    printReceipt() {
      this.printMe('#largeTest', this.cssText)
    },
    printSmallReceipt() {
      this.printMe('#smallTest', this.cssText)
    },
  },
}
</script>

<style scoped>
.head {
  background: #eaeaea;
  padding: 23px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.head .main_head {
  color: #137b97;
  font-size: 38px !important;
  margin-bottom: 45px;
  font-weight: 600;
}
.head .head_flexed {
  gap: 100px;
}
.head .head_flexed div span {
  display: block;
  margin-bottom: 7px;
}
.head .head_flexed div .first_span {
  color: #137b97;
  font-size: 19px;
  font-weight: 500;
}
.head .qr_div .qr_image {
  width: 150px;
  height: 150px;
}
.head .qr_div {
  display: flex;
  justify-content: flex-end;
}
@media (min-width: 641px) {
  .head .head_flexed {
    gap: 50px;
  }
}
@media (min-width: 961px) {
  .head .head_flexed {
    gap: 100px;
  }
}

.second_div {
  margin-bottom: 40px;
}
.second_div .second_div_header {
  margin-bottom: 15px;
  color: #137b97;
}
.second_div_data div span {
  display: block;
  margin-bottom: 7px;
  font-size: 17px;
}
.second_div_data div .second_div_first_span {
  font-weight: 600;
}
.second_div_data {
  justify-content: space-between;
}
.second_div_data div {
  border-right: 4px solid #eaeaea;
  padding: 0 10px 0 10px;
}
hr {
  border: none;
  height: 3px;
  background-color: #eaeaea;
}

.third_div {
  margin-top: 40px;
}
.third_div table {
  width: 100%;
}
.third_div table thead tr th {
  background-color: #fff;
  border: 1px dashed #eaeaea;
  padding: 20px !important;
  color: #137b97 !important;
  font-size: 17px !important;
}
.third_div table tbody tr td {
  background-color: #fff;
  border: 1px dashed #eaeaea;
  padding: 20px;
  font-size: 16px;
  font-weight: 500;
}
.third_div table thead tr {
  background-color: #fff;
  border: 1px dashed #eaeaea;
  padding: 20px !important;
}
.third_div table tbody tr {
  background-color: #fff;
  border: 1px dashed #eaeaea;
  padding: 20px !important;
}
</style>
