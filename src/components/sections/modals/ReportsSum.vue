<template>
  <section>
    <b-modal
      id="reports-sum-modal"
      class="purchase-receipt-modal"
      ref="reports-sum-modal"
      centered
      scrollable
      size="xl"
      @hidden="closeReportsSumModal"
    >
      <template v-slot:modal-title class="text-center">
        <div class="row justify-content-between px-5">
          <div class="col-4 text-left">
            <p>{{ settings.company_name_ar }}</p>
            <p>{{ settings.company_address_ar }}</p>
            <p>{{ settings.site }}</p>
            <p>الرقم الضريبي : {{ settings.tax_number }}</p>
          </div>
          <div class="col-4 text-center">
            <img
              :src="store_data.logo"
              style="max-width: 100%"
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="col-4 text-right">
            <p>{{ settings.company_name_en }}</p>
            <p>{{ settings.company_address_en }}</p>
            <p>{{ settings.site }}</p>
            <p>Tax Number : {{ settings.tax_number }}</p>
          </div>
          <div class="col-12 text-center">
            <h4 class="py-3 text-center" style="width: 100%">
              ملخص الاقرار الضريبي - Summary Report in Tax
            </h4>
            <p class="date text-center" style="width: 100%">
              {{ user.language == 'en' ? 'From' : 'من' }} : {{ date.from }} -
              {{ user.language == 'en' ? 'From' : 'الي' }} : {{ date.to }}
            </p>
          </div>
        </div>
      </template>
      <div>
        <div
          class="row justify-content-between m-0 px-3 py-3"
          v-for="(item, index) in sum"
          :key="item.index"
        >
          <div class="col-5 text-right">
            <h5
              :style="
                index < 4
                  ? 'color: #1f8fcc'
                  : index < 8
                  ? 'color: rgb(255, 0, 0)'
                  : 'color: #000'
              "
            >
              {{ item.name_ar }}
            </h5>
          </div>
          <div class="col-2 text-center" v-if="index < 8">
            <p>
              {{ item.subtotal }}
              {{
                user.language == 'en'
                  ? settings.currency_en
                  : settings.currency_ar
              }}
            </p>
          </div>

          <div class="col-2 text-center" v-else>
            <p>
              {{ item.value }}
              {{
                user.language == 'en'
                  ? settings.currency_en
                  : settings.currency_ar
              }}
            </p>
          </div>

          <div class="col-5 text-left">
            <h5
              :style="
                index < 4
                  ? 'color: #1f8fcc'
                  : index < 8
                  ? 'color: rgb(255, 0, 0)'
                  : 'color: #000'
              "
            >
              {{ item.name_en }}
            </h5>
          </div>
        </div>
      </div>

      <section slot="modal-footer" class="modal-btns">
        <b-button
          size="md"
          variant="success"
          type="submit"
          @click="printReceipt"
        >
          {{ user.language == 'en' ? 'Print' : 'طباعه' }}
        </b-button>
        <b-button size="md" variant="danger" @click="closeReportsSumModal">
          {{ user.language == 'en' ? 'close' : 'الغاء' }}
        </b-button>
      </section>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['user'],
  data() {
    return {
      customEvents: [
        {
          eventName: 'open-reports-sum-modal',
          callback: this.openReportsSumModal,
        },
      ],
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
                                    direction: rtl
                                }
                                .modal-dialog-centered.modal-dialog-scrollable .modal-content {
                                    max-height: none;
                                }
                                .modal-body {
                                    position: relative;
                                    flex: 1 1 auto;
                                    padding: 1rem;
                                }
                                .row {
                                    display: -webkit-box;
                                    display: flex;
                                    flex-wrap: wrap;
                                    margin-right: -15px;
                                    margin-left: -15px;
                                }
                                .justify-content-between {
                                    justify-content: space-between !important;
                                }
                                .col-12 {
                                    flex: 0 0 100%;
                                    max-width: 100%;
                                }
                                .col-4 {
                                    flex: 0 0 33.333333%;
                                    max-width: 33.333333%;
                                }
                                .col-2 {
                                    flex: 0 0 16.666667%;
                                    max-width: 16.666667%;
                                }
                                .col-5 {
                                    flex: 0 0 41.666667%;
                                    max-width: 41.666667%;
                                }
                                h3 {
                                    font-size: 20px;
                                    font-weight: bold;
                                }
                                .px-5 {
                                    padding-right: 3rem;
                                    padding-left: 3rem;
                                }
                                .py-3 {
                                    padding-top: 1rem;
                                    padding-bottom: 1rem;
                                }
                                .modal-btns,
                                .close {
                                    display: none;
                                }
                                .text-center {
                                    text-align: center !important;
                                }
                                .text-right {
                                    text-align: left !important;
                                }
                                .date {
                                    border: 1px dashed #000;
                                    color: #1f8fcc;
                                }
                            }
                        `,
      sum: '',
      data: '',
      store_data: '',
      settings: '',
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
    openReportsSumModal(data) {
      this.sum = data[0]
      this.date = data[1]
      this.settings = this.sum[11]
      this.store_data = this.sum[12]
      this.sum.splice(11, 2)
      this.$refs['reports-sum-modal'].show()
    },
    closeReportsSumModal() {
      // eslint-disable-next-line no-undef
      SharedEvent.fire('close-purchase-receipt-modal')
      this.$bvModal.hide('reports-sum-modal')
    },
    printReceipt() {
      //invoke Print me From Mixin //
      this.printMe('#reports-sum-modal', this.cssText)
    },
  },
}
</script>

<style>
h5 {
  width: 100% !important;
}
.qr-code img {
  max-width: 100%;
}

h3 {
  font-size: 20px;
  font-weight: bold;
}

.bill-info {
}

.total {
  color: #707070;
  font-weight: bold;
  font-size: 16px;
}

.date {
  border: 1px dashed #000;
  color: #1f8fcc;
}
</style>
