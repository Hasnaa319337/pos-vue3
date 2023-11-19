<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card paymentVouchers">
      <div
        class="card"
        v-if="loaded"
        id="voucher"
        :style="{
          direction:
            user.language == 'en' ? 'ltr !important' : 'rtl !important',
          'text-align':
            user.language == 'en' ? 'left !important' : 'right !important',
        }"
      >
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4
            class="card-title"
            v-text="trans('payment_voucher') + ' #' + vtr.id"
          ></h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="align-items-center justify-content-between mb-4">
            <div class="col-sm-12 text-center" v-if="message.length">
              <div
                class="alert"
                :class="'alert-' + alertType"
                v-html="message"
              ></div>
            </div>
            <div class="clear clearfix"></div>
            <div class="col-sm-12 text-center mt-3">
              <b-row class="justify-content-center">
                <b-button variant="success" type="submit" @click="printVoucher"
                  ><font-awesome-icon icon="fa-solid fa-print "
                /></b-button>
              </b-row>
            </div>
          </div>
          <div id="printedVoucher" class="printed-voucher">
            <div
              class="flex_div"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                justify-items: center;
              "
            >
              <div>
                <p
                  class="m-0 flex_p"
                  style="
                    display: flex;
                    column-gap: 15px;
                    justify-content: space-between;
                    align-items: center;
                    justify-items: center;
                  "
                >
                  <span>{{ trans('company_tax_num') }}</span>
                  <span>({{ getSetting('tax_number') }})</span>
                </p>
                <p
                  class="m-0 flex_p"
                  style="
                    display: flex;
                    column-gap: 15px;
                    justify-content: space-between;
                    align-items: center;
                    justify-items: center;
                  "
                >
                  <span>{{ trans('tax_num_beneficiary') }}</span>
                  <span>({{ vtr.beneficiary.tax_num }})</span>
                </p>
              </div>
              <div>
                <!--  :src="getSetting('logo')" -->
                <img
                  src="@/assets/images/logo-min.png"
                  style="width: 113px; height: 100px"
                />
              </div>
            </div>
            <div
              class="row mx-0 mt-3 mb-4 justify-content-between align-items-center"
            >
              <div
                class="col mr-5 flex_box"
                style="display: flex; column-gap: 20px; justify-content: start"
              >
                <div
                  class="flex_span"
                  style="
                    display: flex;
                    column-gap: 15px;
                    align-items: center;
                    justify-items: center;
                    flex-direction: column;
                  "
                >
                  <p
                    class="m-0"
                    style="font-size: 18px; margin-bottom: 20px !important"
                  >
                    <b>H . هـ </b>
                  </p>
                  <p
                    class="m-0 box_p"
                    style="
                      border: 1px solid #8f8f8f;
                      border-radius: 10px;
                      padding: 4px 10px;
                    "
                  >
                    {{ new Date(vtr.created_at).toLocaleDateString('ar-SA') }}
                  </p>
                </div>
                <div
                  class="flex_span"
                  style="
                    display: flex;
                    column-gap: 15px;
                    align-items: center;
                    justify-items: center;
                    flex-direction: column;
                  "
                >
                  <p
                    class="m-0"
                    style="font-size: 18px; margin-bottom: 20px !important"
                  >
                    <b> R.S ريـــــال</b>
                  </p>
                  <p
                    class="m-0 box_p"
                    style="
                      border: 1px solid #8f8f8f;
                      border-radius: 10px;
                      padding: 4px 10px;
                    "
                  >
                    {{ vtr.amount.number }}
                  </p>
                </div>
              </div>
              <div class="col mx-5 text-center">
                <h2 class="text-center" style="font-size: 39px !important">
                  <b> {{ trans('voucher') }}</b>
                  <b> {{ vtr.type }}</b>
                </h2>
                <!-- font-family:BahijTheSansArabic-Light !important;  -->
                <h5
                  class="text-center"
                  style="font-size: 16px; margin: 13px 0; color: #353535"
                >
                  Payment voucher
                </h5>
                <div
                  class="line"
                  style="
                    height: 6px;
                    width: 155px;
                    margin: auto;
                    background: #5dc5e0 0% 0% no-repeat padding-box;
                    border-radius: 70px;
                  "
                ></div>
              </div>
              <div class="col text-right">
                <h2>
                  <b>{{ vtr.id }}</b>
                </h2>
              </div>
            </div>
            <div
              class="row mx-0 mt-3 justify-content-between align-items-center"
            >
              <div class="col-auto">التاريخ / {{ vtr.created_at }}</div>
              <div class="col-auto text-right">Date / {{ vtr.created_at }}</div>
            </div>
            <div
              class="row mx-0 mt-3 justify-content-between align-items-center"
            >
              <div class="col-auto">استلمنا من</div>
              <div class="col text-center">
                {{ vtr.beneficiary.name }}
              </div>
              <div class="col-auto text-right">Pay To</div>
            </div>
            <div
              class="row mx-0 mt-3 justify-content-between align-items-center"
            >
              <div class="col-auto">المبلغ</div>
              <div class="col text-center">
                {{ vtr.amount.string }}
              </div>
              <div class="col-auto text-right">The Amount</div>
            </div>

            <div
              class="row mx-0 mt-3 flex_div"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                justify-items: center;
              "
            >
              <div
                class="flex_div col-4"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  justify-items: center;
                "
              >
                <div class="col-auto">نقداً / شيك رقم</div>
                <div class="col text-center">
                  <!-- {{ vtr.amount.string }} -->
                  .............
                </div>
                <div class="text-right">Cash / Cheque No</div>
              </div>
              <div
                class="flex_div col-4"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  justify-items: center;
                "
              >
                <div class="col-auto" style="padding-right: 8px">بنك</div>
                <div class="col text-center">
                  ..........................................
                  <!-- {{ vtr.amount.string }} -->
                </div>
                <div class="text-right">Bank</div>
              </div>
              <div
                class="flex_div col-4 text-right"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  justify-items: center;
                "
              >
                <div class="col-auto" style="padding-right: 8px">تاريخ</div>
                <div class="col text-center">
                  <!-- {{ vtr.amount.string }} -->
                  .........................
                </div>
                <div class="text-right">Date</div>
              </div>
            </div>

            <div
              class="row mx-0 mt-3 mb-5 justify-content-between align-items-center"
            >
              <div class="col-auto">وذلك عن</div>
              <div class="col text-center">
                {{ vtr.statement }}
              </div>
              <div class="col-auto text-right">For</div>
            </div>
            <div
              class="row mx-0 mt-3 justify-content-around align-items-center"
            >
              <div class="col-auto text-center">
                <p style="font-size: 18px">Received By توقيع المستلم</p>
                <p style="font-size: 18px">
                  ..................................................
                </p>
              </div>
              <div class="col-auto text-center">
                <p style="font-size: 18px">Accountant Sig توقيع المحاسب</p>
                <p style="font-size: 18px">
                  ...................................................
                </p>
              </div>
              <div class="col-auto text-center">
                <p style="font-size: 18px">Manager المدير</p>
                <p style="font-size: 18px">
                  ..............................................
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <skeleton-loader />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'

Vue.use(VuejsDialog)
export default {
  components: { SkeletonLoader },
  name: 'EditPaymentVouchers',
  props: ['permissions', 'section', 'user', 'langs', 'settings'],
  data() {
    return {
      message: '',
      alertType: 'success',
      vtr: {},
      strings: [],
      loaded: false,
      showReceipt: false,
      language: 'en',
      inventories: [],
      refund: {},
      has_refund: 0,
      data: {},
      taxes: {},
      query: {},
      window: window,
      cssText: `
                            * {
                                overflow: visible !important;
                                margin: 0;
                                padding: 0;
                                -webkit-box-sizing: border-box;
                                box-sizing: border-box;
                                outline: none;
                                text-transform: none;
                                text-decoration: none;
                                direction: rtl
                            }
                            @page {
                                margin-top: 0;
                                margin-bottom: 0;
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

                            body {
                                font-family: "nunito", "Open Sans";
                                line-height: 1.5 !important;
                            }
                            .row {
                                display: flex;
                                flex-wrap: wrap;
                                margin-right: -15px;
                                margin-left: -15px;
                            }
                            .justify-content-between {
                                justify-content: space-between !important;
                            }
                            .col-auto {
                                flex: 0 0 auto;
                                width: auto;
                                max-width: 100%;
                            }
                            .align-items-center {
                                align-items: center !important;
                            }
                            .m-0 {
                                margin: 0 !important;
                            }
                            .text-right {
                                text-align: left !important;
                            }
                            .mx-2 {
                                margin-left: 0.5rem !important;
                            }
                            .mt-3{
                                margin-top: 1rem !important;
                            }    
                            .mr-5 {
                                margin-right: 0 !important;
                                margin-left: 3rem !important;
                            }
                            .mx-5 {
                                margin-left: 3rem !important;
                            }
                            .m-0 {
                                margin: 0 !important;
                            }
                            .text-center {
                                text-align: center !important;
                            }    
                            .mx-0 {
                                margin-left: 0 !important;
                                margin-right: 0 !important;
                            }   
                            .px-3 {
                                padding-left: 1rem !important;
                            }
                            .pr-3, .px-3 {
                                padding-right: 1rem !important;
                            }
                            .justify-content-around {
                                justify-content: space-around !important;
                            }
                            .col {
                                flex-basis: 0;
                                flex-grow: 1;
                                max-width: 100%;
                            }
             `,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.initPrintMe()
    this.refresh()
  },
  computed: {},
  methods: {
    getSetting(key) {
      const result = this.settings.find(el => {
        if (el.key === key) {
          return el.value
        }
      })
      return result.value
    },
    refresh() {
      let url = '/api/vouchers/' + this.$route.params.id
      let str = ''
      for (var key in this.query) {
        if (this.query[key] == '') continue
        if (str != '') {
          str += '&'
        }
        str += key + '=' + this.query[key]
      }
      url = str != '' ? url + '?' + str : url
      this.loaded = false
      axios
        .get(url)
        .then(res => {
          this.loaded = true
          this.vtr = res.data.body.vouchers
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    printVoucher() {
      //invoke Print me From Mixin //
      this.printMe('#printedVoucher', this.cssText)
    },
  },
}
</script>
<style>
table tr.text-white,
.text-white,
.text-white td,
table .text-white td {
  color: white !important;
}

@media print {
  nav#sidebar,
  .navbar.default-layout,
  button {
    display: none !important;
  }

  .fixed-top {
    position: static;
  }

  .main-panel {
    width: 100%;
  }
}

.paymentVouchers .row {
  margin: 15px 0;
}
</style>
