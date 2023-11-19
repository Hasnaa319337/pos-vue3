<template>
  <section>
    <b-modal
      id="move-stock-report-modal"
      class="move-stock-report-modal"
      ref="move-stock-report-modal"
      centered
      scrollable
      size="lg"
      @hidden="closeMoveStockReportModal"
    >
      <div
        id="move-stock-report"
        :style="{
          direction: language == 'en' ? 'ltr !important' : 'rtl !important',
          'text-align':
            language == 'en' ? 'left !important' : 'right !important',
        }"
      >
        <div v-if="product">
          <div class="col-sm-12">
            <b-row
              :style="{
                direction: language == 'en' ? 'ltr' : 'rtl',
                textAlign: language == 'en' ? 'left' : 'right',
              }"
            >
              <b-col cols="12">
                <h3 style="text-align: center">
                  {{
                    language == 'en' ? 'Move Stock Report' : 'تقرير نقل مخزون'
                  }}
                </h3>
              </b-col>
              <b-col cols="12">
                <h6 style="text-align: center">
                  {{ created_at }}
                </h6>
              </b-col>
            </b-row>
          </div>
          <div class="col-sm-12">
            <b-table-simple
              sticky-header
              striped
              bordered
              responsive
              style="min-height: 50px"
            >
              <b-thead>
                <b-th class="text-center" colspan="3"
                  ><h4 style="text-align: center">
                    {{ product.title }}
                  </h4></b-th
                >
              </b-thead>
              <b-tbody>
                <b-tr class="text-center">
                  <b-td style="text-align: center"
                    ><b>{{
                      user.language == 'en' ? 'Quantitiy' : 'الكميات'
                    }}</b></b-td
                  >
                  <b-td style="text-align: center"
                    ><b
                      >{{ strings['from'] }} {{ product.from.inventory }}</b
                    ></b-td
                  >
                  <b-td style="text-align: center"
                    ><b>{{ strings['to'] }} {{ product.to.inventory }}</b></b-td
                  >
                </b-tr>
                <b-tr class="text-center">
                  <b-td style="text-align: center">{{
                    user.language == 'en'
                      ? 'Quantitiy before transfare'
                      : 'الكميات قبل النقل'
                  }}</b-td>
                  <b-td style="text-align: center">{{
                    product.from.old_quantity
                  }}</b-td>
                  <b-td style="text-align: center">{{
                    product.to.old_quantity
                  }}</b-td>
                </b-tr>
                <b-tr class="text-center">
                  <b-td style="text-align: center">{{
                    user.language == 'en'
                      ? 'Quantitiy after transfare'
                      : 'الكميات بعد النقل'
                  }}</b-td>
                  <b-td style="text-align: center">{{
                    product.from.new_quantity
                  }}</b-td>
                  <b-td style="text-align: center">{{
                    product.to.new_quantity
                  }}</b-td>
                </b-tr>
                <b-tr class="text-center">
                  <td style="text-align: center">
                    {{
                      user.language == 'en'
                        ? 'Transfared quantity'
                        : 'الكمية المنقولة'
                    }}
                  </td>
                  <td colspan="2" style="text-align: center">
                    {{ product.steps }}
                  </td>
                </b-tr>
              </b-tbody>
              <b-tbody v-if="has_variation">
                <b-tr class="text-center">
                  <td colspan="3">
                    <h5>{{ variation.title }}</h5>
                  </td>
                </b-tr>
                <b-tr class="text-center">
                  <b-td></b-td>
                  <b-td
                    ><b
                      >{{ strings['from'] }} : {{ variation.from.inventory }}</b
                    ></b-td
                  >
                  <b-td
                    ><b
                      >{{ strings['to'] }} : {{ variation.to.inventory }}</b
                    ></b-td
                  >
                </b-tr>
                <b-tr class="text-center">
                  <b-td>{{ strings['previous_quantity'] }}</b-td>
                  <b-td>{{ variation.from.old_quantity }}</b-td>
                  <b-td>{{ variation.to.old_quantity }}</b-td>
                </b-tr>
                <b-tr class="text-center">
                  <b-td>{{ strings['current_quantity'] }}</b-td>
                  <b-td>{{ variation.from.new_quantity }}</b-td>
                  <b-td>{{ variation.to.new_quantity }}</b-td>
                </b-tr>
                <b-tr class="text-center">
                  <td>{{ strings['moved_quantity'] }}</td>
                  <td colspan="2">{{ variation.steps }}</td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </div>
        <div v-else>
          <i
            class="fa fa-spinner fa-spin"
            style="font-size: 80px; margin-top: 50px"
          ></i>
        </div>
      </div>

      <section slot="modal-footer">
        <b-button
          size="md"
          variant="success"
          type="submit"
          @click="printReceipt"
        >
          {{ language == 'en' ? 'Print' : 'طباعة' }}
        </b-button>
        <b-button size="md" variant="danger" @click="closeMoveStockReportModal">
          {{ language == 'en' ? 'Close' : 'اغلاق' }}
        </b-button>
      </section>
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
          eventName: 'open-move-stock-report-modal',
          callback: this.openMoveStockReportModal,
        },
      ],
      message: '',
      has_variation: false,
      alertType: '',
      product: {
        to: {},
        from: {},
      },
      variation: {
        to: {},
        from: {},
      },
      settings: {},
      strings: [],
      user: {},
      language: '',
      created_at: '',
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


                                #purchase-invoice {
                                height: auto;
                                max-height: unset;
                                overflow-y: scroll;
                                width: auto;
                                background: #fff;
                                visibility: visible;
                                padding: 15px;
                                margin: 0 auto !important;
                                }


                                .qr-image {
                                    max-width: 100%
                                }

                                .col-sm-7 {
                                    -webkit-box-flex: 0;
                                    flex: 0 0 58.333333%;
                                    max-width: 58.333333%;
                                }
                                .col-sm-4 {
                                    -webkit-box-flex: 0;
                                    flex: 0 0 33.333333%;
                                    max-width: 33.333333%;
                                }
                                .col-sm-6 {
                                    flex: 0 0 50%;
                                    max-width: 50%;
                                }
                                .row {
                                    display: -webkit-box;
                                    display: flex;
                                    flex-wrap: wrap;
                                    margin-right: 0;
                                    margin-left: 0;
                                }
                                .col {
                                    flex-basis: 0;
                                    -webkit-box-flex: 1;
                                    flex-grow: 1;
                                    max-width: 100%;
                                }
                                h3 {
                                    font-size: 20px;
                                    font-weight: bold;
                                }
                                .col-sm-12 {
                                    -webkit-box-flex: 0;
                                    flex: 0 0 100%;
                                    max-width: 100%;
                                }
                                .col-12 {
                                    flex: 0 0 100%;
                                    max-width: 100%;
                                }
                                .col-6 {
                                    flex: 0 0 50%;
                                    max-width: 50%;
                                }
                                .col-auto {
                                    flex: 0 0 auto;
                                    width: auto;
                                    max-width: 100%;
                                }
                                .table-responsive {
                                    display: block;
                                    width: 100%;
                                    overflow-x: auto;
                                }
                                .b-table-sticky-header {
                                    overflow-y: auto;
                                    max-height: 300px;
                                }
                                .table {
                                    width: 100%;
                                    margin-bottom: 1rem;
                                    color: #212529;
                                    // border-collapse: collapse;
                                }
                                .table-bordered {
                                    border: 1px solid #dee2e6;
                                }
                                .table td, .table th {
                                    vertical-align: middle;
                                    font-size: 0.875rem;
                                    line-height: 1;
                                    white-space: nowrap;
                                    height: 35px;
                                    padding: 12px 15px;
                                }
                                .table th, .table td {
                                    padding: 0.75rem;
                                    vertical-align: top;
                                    border: 1px solid #dee2e6;
                                }

                                .table.table-bordered td {
                                    border-color: #dee2e6;
                                }
                                .table th, .table td {
                                    border: 1px solid #dee2e6 !important;
                                }
                                td {
                                    border: 1px solid #dee2e6 !important;
                                }
                                .total {
                                    color: #707070;
                                    font-weight: bold;
                                    font-size: 16px;
                                }
                                tr {
                                    height: auto !important;
                                }
                                .long {
                                    width: auto;
                                    min-width: 0;
                                    max-width: 200px;
                                    display: inline-block;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                                td ,
                                th {
                                    max-width: 200px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    line-height: 1.5;
                                    vertical-align: middle;
                                    word-break:break-all;
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
  mounted() {
    this.initPrintMe()
  },
  methods: {
    openMoveStockReportModal(data) {
      this.product = data.report.product
      if (data.report.variation) {
        this.has_variation = true
        this.variation = data.report.variation
      }
      this.user = data.user
      this.strings = data.strings
      // this.settings = data.settings;
      this.language = this.user.language
      this.created_at = data.report.created_at
      this.$refs['move-stock-report-modal'].show()
    },
    closeMoveStockReportModal() {
      this.$bvModal.hide('move-stock-report-modal')
      this.$router.go()
      window.location.reload()
    },
    printReceipt() {
      //invoke Print me From Mixin //
      this.printMe('#move-stock-report', this.cssText)
    },
  },
}
</script>

<style lang="scss"></style>
