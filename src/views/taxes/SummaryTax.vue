<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <!-- Header -->
      <div
        class="card-header header-sm d-flex justify-content-between align-items-center"
      >
        <h4 class="card-title">{{ trans('summary_tax') }}</h4>
        <div class="d-flex">
          <h4 class="text-center" style="font-size: 15px !important">
            {{ trans('from') }} {{ trans('date') }}
            <span style="padding: 3px 5px">{{ TaxDateStart }}</span>
            {{ trans('to') }} {{ trans('date') }}
            <span style="padding: 3px 5px">{{ TaxDateEnd }}</span>
          </h4>
          <go-back-button />
        </div>
      </div>

      <!-- Body -->

      <div class="card-body" style="margin-top: 20px">
        <!-- Printed report -->
        <div
          class="align-items-center justify-content-between mb-4 d-none"
          id="printedReport"
        >
          <div class="col-auto" style="padding-bottom: 0">
            <div class="table-responsive" style="margin-bottom: 0">
              <!--   sales_summary      -->
              <table
                style="
                  min-height: 50px;
                  text-align: center;
                  border: 1px solid #ccc;
                  padding: 0;
                "
              >
                <thead>
                  <tr>
                    <th
                      style="
                        width: 300px;
                        background: #86c2fd !important;
                        padding: 7px 0;
                        margin: 0;
                        font-family: BahijTheSansArabic-Bold !important;
                      "
                    >
                      {{ trans('clause') }}
                    </th>

                    <th
                      style="
                        background: #86c2fd !important;
                        width: 150px;
                        padding: 7px 0;
                        margin: 0;
                        font-family: BahijTheSansArabic-Bold !important;
                      "
                    >
                      {{ trans('value') }}
                    </th>
                    <th
                      style="
                        background: #86c2fd !important;
                        width: 150px;
                        padding: 7px 0;
                        margin: 0;
                        font-family: BahijTheSansArabic-Bold !important;
                      "
                    >
                      {{ trans('tax value') }}
                    </th>
                  </tr>
                </thead>

                <b-tbody>
                  <b-tr>
                    <b-td style="padding: 10px 0; border: 1px solid #ccc">{{
                      trans('sales_full_taxable')
                    }}</b-td>
                    <b-td>{{ sales_summary['total_non_taxable_full'] }}</b-td>
                    <b-td>0</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('non_sales_full_taxable') }}</b-td>
                    <b-td>{{
                      sales_summary['total_non_taxable_installment']
                    }}</b-td>
                    <b-td>0</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('sales_full_taxable') }}</b-td>
                    <b-td>{{ sales_summary['total_taxable_full'] }}</b-td>
                    <b-td>{{ sales_summary['taxes_taxable_full'] }}</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('total_taxable_installment') }}</b-td>
                    <b-td>{{
                      sales_summary['total_taxable_installment']
                    }}</b-td>
                    <b-td>{{
                      sales_summary['taxes_taxable_installment']
                    }}</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('total_non_taxable_full') }}</b-td>
                    <b-td>{{
                      sales_refund_summary['total_non_taxable_full']
                    }}</b-td>
                    <b-td>0</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('total_non_taxable_installment') }}</b-td>
                    <b-td>{{
                      sales_refund_summary['total_non_taxable_installment']
                    }}</b-td>
                    <b-td>0</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('total_taxable_full') }}</b-td>
                    <b-td>{{
                      sales_refund_summary['total_taxable_full']
                    }}</b-td>
                    <b-td>{{
                      sales_refund_summary['taxes_taxable_full']
                    }}</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('total_taxable_installment') }}</b-td>
                    <b-td>{{
                      sales_refund_summary['total_taxable_installment']
                    }}</b-td>
                    <b-td>{{
                      sales_refund_summary['total_taxable_installment']
                    }}</b-td>
                  </b-tr>
                </b-tbody>

                <b-tfoot>
                  <b-tr>
                    <b-td
                      style="background: #86c2fd !important; font-weight: 700"
                      >{{ trans('net') }}</b-td
                    >
                    <b-td
                      style="background: #86c2fd !important; font-weight: 700"
                      >{{ total_sales.total }}</b-td
                    >
                    <b-td
                      style="background: #86c2fd !important; font-weight: 700"
                      >{{ total_sales.taxes }}</b-td
                    >
                  </b-tr>
                </b-tfoot>
              </table>
            </div>
          </div>

          <!--    purchase_summary -->
          <div class="col-auto" style="padding-bottom: 0">
            <div class="table-responsive" style="margin-bottom: 0">
              <b-table-simple
                sticky-header
                striped
                bordered
                responsive
                style="min-height: 50px"
              >
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <th style="width: 200px; background: #86c2fd !important">
                      {{ trans('clause') }}
                    </th>

                    <th style="background: #86c2fd !important">
                      {{ trans('value') }}
                    </th>
                    <th style="background: #86c2fd !important">
                      {{ trans('tax value') }}
                    </th>
                  </b-tr>
                </b-thead>

                <b-tbody>
                  <b-tr>
                    <b-td>{{ trans('total_non_taxable_full') }}</b-td>
                    <b-td>{{
                      purchase_summary['total_non_taxable_full']
                    }}</b-td>
                    <b-td>0</b-td>
                  </b-tr>
                  <b-tr>
                    <b-td>{{ trans('total_non_taxable_installment') }}</b-td>
                    <b-td>{{
                      purchase_summary['total_non_taxable_installment']
                    }}</b-td>
                    <b-td>0</b-td>
                  </b-tr>
                  <b-tr>
                    <b-td>{{ trans('total_taxable_full') }}</b-td>
                    <b-td>{{ purchase_summary['total_taxable_full'] }}</b-td>
                    <b-td>{{ purchase_summary['taxes_taxable_full'] }}</b-td>
                  </b-tr>
                  <b-tr>
                    <b-td>{{ trans('total_taxable_installment') }}</b-td>
                    <b-td>{{
                      purchase_summary['total_taxable_installment']
                    }}</b-td>
                    <b-td>{{
                      purchase_summary['taxes_taxable_installment']
                    }}</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('total_non_taxable_full') }}</b-td>
                    <b-td>{{
                      purchase_refund_summary['total_non_taxable_full']
                    }}</b-td>
                    <b-td>0</b-td>
                  </b-tr>
                  <b-tr>
                    <b-td>{{ trans('total_non_taxable_installment') }}</b-td>
                    <b-td>{{
                      purchase_refund_summary['total_non_taxable_installment']
                    }}</b-td>
                    <b-td>0</b-td>
                  </b-tr>
                  <b-tr>
                    <b-td>{{ trans('total_taxable_full') }}</b-td>
                    <b-td>{{
                      purchase_refund_summary['total_taxable_full']
                    }}</b-td>
                    <b-td>{{
                      purchase_refund_summary['taxes_taxable_full']
                    }}</b-td>
                  </b-tr>
                  <b-tr>
                    <b-td>{{ trans('total_taxable_installment') }}</b-td>
                    <b-td>{{
                      purchase_refund_summary['total_taxable_installment']
                    }}</b-td>
                    <b-td>{{
                      purchase_refund_summary['taxes_taxable_installment']
                    }}</b-td>
                  </b-tr>
                </b-tbody>

                <b-tfoot style="font-weight: 700">
                  <b-tr>
                    <b-td
                      style="background: #86c2fd !important; font-weight: 700"
                      >{{ trans('net') }}</b-td
                    >
                    <b-td
                      style="background: #86c2fd !important; font-weight: 700"
                      >{{ total_purchase.total }}</b-td
                    >
                    <b-td
                      style="background: #86c2fd !important; font-weight: 700"
                      >{{ total_purchase.taxes }}</b-td
                    >
                  </b-tr>
                </b-tfoot>
              </b-table-simple>
            </div>
          </div>

          <div class="col-auto">
            <div
              style="
                background: rgb(224 168 0 / 80%);
                display: flex;
                font-weight: 700;

                align-items: center;
                padding: 15px 9px;

                border-radius: 6px;
                margin-bottom: 20px;
              "
            >
              <svg
                v-if="language === 'ar'"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <path
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <path
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>

              <span style="margin: 0 10px">{{ trans('tax') }}</span>
              <span style="margin: 0 10px"> {{ total.taxes }}</span>
            </div>
          </div>
        </div>

        <!-- Shown Report -->
        <div class="row align-items-center justify-content-around mb-4">
          <div class="col-sm-6" style="padding-bottom: 0">
            <div class="table-responsive" style="margin-bottom: 0">
              <!--   sales_summary      -->
              <b-table-simple
                sticky-header
                striped
                bordered
                responsive
                style="min-height: 50px"
              >
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <th style="width: 350px">
                      {{ trans('clause') }}
                    </th>

                    <th style="border: 1px solid #85c3ff">
                      {{ trans('value') }}
                    </th>
                    <th style="border: 1px solid #85c3ff">
                      {{ trans('Q_S_C') }}
                    </th>
                  </b-tr>
                </b-thead>

                <b-tbody>
                  <b-tr>
                    <b-td>{{ trans('sales_full_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(sales_summary['total_taxable_full']).isNegative(
                          'negative_number_color'
                        )
                      "
                      >{{
                        Number(
                          sales_summary['total_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td
                      :class="
                        Number(sales_summary['taxes_taxable_full']).isNegative(
                          'negative_number_color'
                        )
                      "
                      >{{
                        Number(
                          sales_summary['taxes_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('sales_full_non_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          sales_summary['total_non_taxable_full']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          sales_summary['total_non_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td>0</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('sales_installment_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          sales_summary['total_taxable_installment']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          sales_summary['total_taxable_installment']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td
                      :class="
                        Number(
                          sales_summary['taxes_taxable_installment']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          sales_summary['taxes_taxable_installment']
                        ).toNegativeFormat()
                      }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td>{{ trans('sales_installment_non_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          sales_summary['total_non_taxable_installment']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          sales_summary['total_non_taxable_installment']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td>0</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('sales_refund_full_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          sales_refund_summary['total_taxable_full']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          sales_refund_summary['total_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td
                      :class="
                        Number(
                          sales_refund_summary['taxes_taxable_full']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          sales_refund_summary['taxes_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td>{{ trans('sales_refund_full_non_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          sales_refund_summary['total_non_taxable_full']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          sales_refund_summary['total_non_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td>0</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('sales_refund_installment_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          sales_refund_summary['total_taxable_installment']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          sales_refund_summary['total_taxable_installment']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td
                      :class="
                        Number(
                          sales_refund_summary['taxes_taxable_installment']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          sales_refund_summary['taxes_taxable_installment']
                        ).toNegativeFormat()
                      }}
                    </b-td>
                  </b-tr>
                  <b-tr>
                    <b-td>{{
                      trans('sales_refund_installment_non_taxable')
                    }}</b-td>

                    <b-td
                      :class="
                        Number(
                          sales_refund_summary['total_non_taxable_installment']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          sales_refund_summary['total_non_taxable_installment']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td>0</b-td>
                  </b-tr>
                </b-tbody>

                <b-tfoot>
                  <b-tr>
                    <b-td style="font-weight: 700"
                      >{{ trans('sales_net') }}
                    </b-td>

                    <b-td
                      style="font-weight: 700"
                      :class="
                        Number(total_sales.total).isNegative(
                          'negative_number_color'
                        )
                      "
                      >{{ Number(total_sales.total).toNegativeFormat() }}
                    </b-td>

                    <b-td
                      style="font-weight: 700"
                      :class="
                        Number(total_sales.taxes).isNegative(
                          'negative_number_color'
                        )
                      "
                      >{{ Number(total_sales.taxes).toNegativeFormat() }}
                    </b-td>
                  </b-tr>
                </b-tfoot>
              </b-table-simple>
            </div>
          </div>

          <!--    purchase_summary -->
          <div class="col-sm-6" style="padding-bottom: 0">
            <div class="table-responsive" style="margin-bottom: 0">
              <b-table-simple
                sticky-header
                striped
                bordered
                responsive
                style="min-height: 50px"
              >
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <th style="width: 350px">
                      {{ trans('clause') }}
                    </th>

                    <th style="border: 1px solid #85c3ff">
                      {{ trans('value') }}
                    </th>
                    <th style="border: 1px solid #85c3ff">
                      {{ trans('Q_S_C') }}
                    </th>
                  </b-tr>
                </b-thead>

                <b-tbody>
                  <b-tr>
                    <b-td>{{ trans('purchase_full_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          purchase_summary['total_taxable_full']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_summary['total_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td
                      :class="
                        Number(
                          purchase_summary['taxes_taxable_full']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_summary['taxes_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('purchase_full_non_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          purchase_summary['total_non_taxable_full']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_summary['total_non_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td>0</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('purchase_installment_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          purchase_summary['total_taxable_installment']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_summary['total_taxable_installment']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td
                      :class="
                        Number(
                          purchase_summary['taxes_taxable_installment']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_summary['taxes_taxable_installment']
                        ).toNegativeFormat()
                      }}
                    </b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('purchase_installment_non_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          purchase_summary['total_non_taxable_installment']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_summary['total_non_taxable_installment']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td>0</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('purchase_refund_full_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          purchase_refund_summary['total_taxable_full']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_refund_summary['total_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>
                    <b-td
                      :class="
                        Number(
                          purchase_refund_summary['taxes_taxable_full']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_refund_summary['taxes_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{ trans('purchase_refund_full_non_taxable') }}</b-td>

                    <b-td
                      :class="
                        Number(
                          purchase_refund_summary['total_non_taxable_full']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_refund_summary['total_non_taxable_full']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td>0</b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{
                      trans('purchase_refund_installment_taxable')
                    }}</b-td>

                    <b-td
                      :class="
                        Number(
                          purchase_refund_summary['total_taxable_installment']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_refund_summary['total_taxable_installment']
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td
                      :class="
                        Number(
                          purchase_refund_summary['total_taxable_installment']
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_refund_summary['total_taxable_installment']
                        ).toNegativeFormat()
                      }}
                    </b-td>
                  </b-tr>

                  <b-tr>
                    <b-td>{{
                      trans('purchase_refund_installment_non_taxable')
                    }}</b-td>

                    <b-td
                      :class="
                        Number(
                          purchase_refund_summary[
                            'total_non_taxable_installment'
                          ]
                        ).isNegative('negative_number_color')
                      "
                      >{{
                        Number(
                          purchase_refund_summary[
                            'total_non_taxable_installment'
                          ]
                        ).toNegativeFormat()
                      }}
                    </b-td>

                    <b-td>0</b-td>
                  </b-tr>
                </b-tbody>

                <b-tfoot style="font-weight: 700">
                  <b-tr>
                    <b-td style="font-weight: 700">{{
                      trans('purchase_net')
                    }}</b-td>

                    <b-td
                      style="font-weight: 700"
                      :class="
                        Number(total_purchase.total).isNegative(
                          'negative_number_color'
                        )
                      "
                      >{{ Number(total_purchase.total).toNegativeFormat() }}
                    </b-td>
                    <b-td
                      style="font-weight: 700"
                      :class="
                        Number(total_purchase.taxes).isNegative(
                          'negative_number_color'
                        )
                      "
                      >{{ Number(total_purchase.taxes).toNegativeFormat() }}
                    </b-td>
                  </b-tr>
                </b-tfoot>
              </b-table-simple>
            </div>
          </div>

          <div class="col-sm-12">
            <div
              style="
                background: #86c2fd;
                display: flex;
                font-weight: 900;

                align-items: center;
                padding: 15px 9px;

                border-radius: 6px;
                margin-bottom: 20px;
              "
            >
              <svg
                v-if="language === 'ar'"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <path
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <path
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>

              <span style="margin: 0 10px">{{ trans('vat_report') }}</span>
              <span
                style="
                  margin: 0 10px;
                  padding: 5px;
                  background: transparent !important;
                  border: none !important;
                "
                :class="Number(total.taxes).isNegative('negative_number_color')"
              >
                {{ Number(total.taxes).toNegativeFormat() }}</span
              >
            </div>
          </div>
        </div>

        <div class="col-sm-12 text-center mb-3">
          <b-row class="justify-content-center" style="gap: 10px">
            <!--  @click="printReport" -->
            <b-button
              variant="success"
              style="
                border-radius: 50px !important;
                font: normal normal 300 14px/11px Tahoma;
                letter-spacing: 0px;
                color: #ffffff;
                border: none;
                padding: 15px 40px;
              "
              ><font-awesome-icon
                icon="fa-solid fa-print "
                style="margin: 0 3px"
              />
              {{ trans('print') }}
            </b-button>

            <b-button
              v-b-modal.modal-xl
              variant="info"
              style="
                border-radius: 50px !important;
                font: normal normal 300 14px/11px Tahoma;
                letter-spacing: 0px;
                color: #ffffff;
                border: none;
                padding: 15px 40px;
              "
              class="mr-2"
            >
              {{ trans('short report') }}
            </b-button>

            <b-button
              style="
                background: #cf1212 0% 0% no-repeat padding-box;
                border-radius: 50px !important;
                font: normal normal 300 14px/11px Tahoma;
                letter-spacing: 0px;
                color: #ffffff;
                border: none;
                padding: 15px 50px;
              "
              to="/taxes-reports"
              @click="closePage"
            >
              {{ trans('close') }}
            </b-button>
          </b-row>
        </div>

        <b-modal id="modal-xl" size="xl" style="margin: :auto; width:90%">
          <h3 class="text-center" style="margin-bottom: 20px">
            {{ trans('report_summary_for_tax_value') }}
          </h3>
          <h4 class="text-center" style="font-size: 15px !important">
            {{ trans('from') }} {{ trans('date') }}
            <span style="padding: 3px 5px">{{ TaxDateStart }}</span>
            {{ trans('to') }} {{ trans('date') }}
            <span style="padding: 3px 5px">{{ TaxDateEnd }}</span>
          </h4>

          <b-row>
            <div class="col-sm-6" style="padding-bottom: 0">
              <div class="table-responsive" style="margin-bottom: 0">
                <!--   sales_summary      -->
                <b-table-simple
                  sticky-header
                  striped
                  bordered
                  responsive
                  style="min-height: 50px"
                >
                  <b-thead>
                    <b-tr class="rounded" variant="dark">
                      <th style="width: 200px">
                        {{ trans('clause') }}
                      </th>

                      <th style="border: 1px solid #85c3ff">
                        {{ trans('value') }}
                      </th>
                      <th style="border: 1px solid #85c3ff">
                        {{ trans('Q_S_C') }}
                      </th>
                    </b-tr>
                  </b-thead>

                  <b-tbody>
                    <b-tr>
                      <b-td>{{ trans('sales_full') }}</b-td>

                      <b-td
                        :class="
                          Number(
                            sales_summary['total_taxable_full']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            sales_summary['total_taxable_full']
                          ).toNegativeFormat()
                        }}
                      </b-td>
                      <b-td
                        :class="
                          Number(
                            sales_summary['taxes_taxable_full']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            sales_summary['taxes_taxable_full']
                          ).toNegativeFormat()
                        }}
                      </b-td>
                    </b-tr>

                    <b-tr>
                      <b-td>{{ trans('sales_installment') }}</b-td>

                      <b-td
                        :class="
                          Number(
                            sales_summary['total_taxable_installment']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            sales_summary['total_taxable_installment']
                          ).toNegativeFormat()
                        }}
                      </b-td>

                      <b-td
                        :class="
                          Number(
                            sales_summary['taxes_taxable_installment']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            sales_summary['taxes_taxable_installment']
                          ).toNegativeFormat()
                        }}
                      </b-td>
                    </b-tr>

                    <b-tr>
                      <b-td>{{ trans('sales_refund_full') }}</b-td>

                      <b-td
                        :class="
                          Number(
                            sales_refund_summary['total_taxable_full']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            sales_refund_summary['total_taxable_full']
                          ).toNegativeFormat()
                        }}
                      </b-td>

                      <b-td
                        :class="
                          Number(
                            sales_refund_summary['taxes_taxable_full']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            sales_refund_summary['taxes_taxable_full']
                          ).toNegativeFormat()
                        }}
                      </b-td>
                    </b-tr>
                    <b-tr>
                      <b-td>{{ trans('sales_refund_installment') }}</b-td>

                      <b-td
                        :class="
                          Number(
                            sales_refund_summary['total_taxable_installment']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            sales_refund_summary['total_taxable_installment']
                          ).toNegativeFormat()
                        }}
                      </b-td>

                      <b-td
                        :class="
                          Number(
                            sales_refund_summary['taxes_taxable_installment']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            sales_refund_summary['taxes_taxable_installment']
                          ).toNegativeFormat()
                        }}
                      </b-td>
                    </b-tr>
                  </b-tbody>

                  <b-tfoot>
                    <b-tr>
                      <b-td style="font-weight: 700">{{
                        trans('sales_net')
                      }}</b-td>
                      <b-td
                        style="font-weight: 700"
                        :class="
                          Number(sales_net_totals).isNegative(
                            'negative_number_color'
                          )
                        "
                        >{{ Number(sales_net_totals).toNegativeFormat() }}
                      </b-td>

                      <b-td
                        style="font-weight: 700"
                        :class="
                          Number(sales_net_taxes).isNegative(
                            'negative_number_color'
                          )
                        "
                        >{{ Number(sales_net_taxes).toNegativeFormat() }}
                      </b-td>
                    </b-tr>
                  </b-tfoot>
                </b-table-simple>
              </div>
            </div>

            <div class="col-sm-6" style="padding-bottom: 0">
              <div class="table-responsive" style="margin-bottom: 0">
                <b-table-simple
                  sticky-header
                  striped
                  bordered
                  responsive
                  style="min-height: 50px"
                >
                  <b-thead>
                    <b-tr class="rounded" variant="dark">
                      <th style="width: 200px">
                        {{ trans('clause') }}
                      </th>

                      <th style="border: 1px solid #85c3ff">
                        {{ trans('value') }}
                      </th>
                      <th style="border: 1px solid #85c3ff">
                        {{ trans('Q_S_C') }}
                      </th>
                    </b-tr>
                  </b-thead>

                  <b-tbody>
                    <b-tr>
                      <b-td>{{ trans('purchase_full') }}</b-td>

                      <b-td
                        :class="
                          Number(
                            purchase_summary['total_taxable_full']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            purchase_summary['total_taxable_full']
                          ).toNegativeFormat()
                        }}
                      </b-td>
                      <b-td
                        :class="
                          Number(
                            purchase_summary['taxes_taxable_full']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            purchase_summary['taxes_taxable_full']
                          ).toNegativeFormat()
                        }}
                      </b-td>
                    </b-tr>

                    <b-tr>
                      <b-td>{{ trans('purchase_installment') }}</b-td>

                      <b-td
                        :class="
                          Number(
                            purchase_summary['total_taxable_installment']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            purchase_summary['total_taxable_installment']
                          ).toNegativeFormat()
                        }}
                      </b-td>

                      <b-td
                        :class="
                          Number(
                            purchase_summary['taxes_taxable_installment']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            purchase_summary['taxes_taxable_installment']
                          ).toNegativeFormat()
                        }}
                      </b-td>
                    </b-tr>

                    <b-tr>
                      <b-td>{{ trans('purchase_refund_full') }}</b-td>

                      <b-td
                        :class="
                          Number(
                            purchase_refund_summary['total_taxable_full']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            purchase_refund_summary['total_taxable_full']
                          ).toNegativeFormat()
                        }}
                      </b-td>
                      <b-td
                        :class="
                          Number(
                            purchase_refund_summary['taxes_taxable_full']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            purchase_refund_summary['taxes_taxable_full']
                          ).toNegativeFormat()
                        }}
                      </b-td>
                    </b-tr>

                    <b-tr>
                      <b-td>{{ trans('purchase_refund_installment') }}</b-td>

                      <b-td
                        :class="
                          Number(
                            purchase_refund_summary['total_taxable_installment']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            purchase_refund_summary['total_taxable_installment']
                          ).toNegativeFormat()
                        }}
                      </b-td>

                      <b-td
                        :class="
                          Number(
                            purchase_refund_summary['taxes_taxable_installment']
                          ).isNegative('negative_number_color')
                        "
                        >{{
                          Number(
                            purchase_refund_summary['taxes_taxable_installment']
                          ).toNegativeFormat()
                        }}
                      </b-td>
                    </b-tr>
                  </b-tbody>

                  <b-tfoot style="font-weight: 700">
                    <b-tr>
                      <b-td style="font-weight: 700">{{
                        trans('purchase_net')
                      }}</b-td>

                      <b-td
                        style="font-weight: 700"
                        :class="
                          Number(purchase_net_totals).isNegative(
                            'negative_number_color'
                          )
                        "
                        >{{ Number(purchase_net_totals).toNegativeFormat() }}
                      </b-td>
                      <b-td
                        style="font-weight: 700"
                        :class="
                          Number(purchase_net_taxes).isNegative(
                            'negative_number_color'
                          )
                        "
                        >{{ Number(purchase_net_taxes).toNegativeFormat() }}
                      </b-td>
                    </b-tr>
                  </b-tfoot>
                </b-table-simple>
              </div>
            </div>

            <div class="col-sm-12">
              <div
                style="
                  background: #86c2fd;
                  display: flex;
                  font-weight: 900;

                  align-items: center;
                  padding: 9px;

                  border-radius: 6px;
                  margin-bottom: 20px;
                "
              >
                <svg
                  v-if="language === 'ar'"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  />
                </svg>

                <span style="margin: 0 10px">{{ trans('vat_report') }}</span>
                <span
                  style="
                    margin: 0 10px;
                    padding: 5px;
                    background: transparent !important;
                    border: none !important;
                  "
                  :class="
                    Number(total_taxes).isNegative('negative_number_color')
                  "
                >
                  {{ Number(total_taxes).toNegativeFormat() }}</span
                >
              </div>
            </div>
          </b-row>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'

export default {
  components: { TableSkeletonLoader },
  props: ['permissions', 'language'],
  data() {
    return {
      sales_summary: [],
      sales_refund_summary: [],
      purchase_summary: [],
      purchase_refund_summary: [],
      total_sales: {},
      total_purchase: {},
      total: {},
      total_taxes: 0,
      sales_net_totals: 0,
      sales_net_taxes: 0,
      purchase_net_totals: 0,
      purchase_net_taxes: 0,
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

      TaxDateStart: '',
      TaxDateEnd: '',
    }
  },

  mounted() {
    this.getTaxs()
    this.TaxDateStart = localStorage.getItem('TaxDateStart')
    this.TaxDateEnd = localStorage.getItem('TaxDateEnd')
    setTimeout(() => {
      this.skeletonLoading = false

      localStorage.removeItem('TaxDateStart')
      localStorage.removeItem('TaxDateEnd')
    }, 3000)
  },
  methods: {
    closePage() {},
    getTaxs() {
      axios({
        method: 'GET',
        url: '/api/tax-report/tax-summary',
        params: {
          to_date: localStorage.getItem('TaxDateEnd')
            ? localStorage.getItem('TaxDateEnd')
            : null,

          from_date: localStorage.getItem('TaxDateStart')
            ? localStorage.getItem('TaxDateStart')
            : null,
        },
      })
        .then(res => {
          this.itemsLoaded = true
          this.loaded = true
          this.sales_summary = res.data.body.sales_summary
          this.sales_refund_summary = res.data.body.sales_refund_summary
          this.purchase_summary = res.data.body.purchase_summary
          this.purchase_refund_summary = res.data.body.purchase_refund_summary
          this.total_sales = res.data.body.total_sales
          this.total_purchase = res.data.body.total_purchase
          this.total = res.data.body.total

          this.total_taxes =
            this.sales_refund_summary['taxes_taxable_installment'] +
            this.sales_refund_summary['taxes_taxable_full'] +
            this.sales_summary['taxes_taxable_installment'] +
            this.sales_summary['taxes_taxable_full'] -
            (this.purchase_refund_summary['taxes_taxable_installment'] +
              this.purchase_refund_summary['taxes_taxable_full'] +
              this.purchase_summary['taxes_taxable_installment'] +
              this.purchase_summary['taxes_taxable_full'])

          this.sales_net_totals =
            this.sales_refund_summary['total_taxable_installment'] +
            this.sales_refund_summary['total_taxable_full'] +
            this.sales_summary['total_taxable_installment'] +
            this.sales_summary['total_taxable_full']

          this.sales_net_taxes =
            this.sales_refund_summary['taxes_taxable_installment'] +
            this.sales_refund_summary['taxes_taxable_full'] +
            this.sales_summary['taxes_taxable_installment'] +
            this.sales_summary['taxes_taxable_full']

          this.purchase_net_totals =
            this.purchase_refund_summary['total_taxable_installment'] +
            this.purchase_refund_summary['total_taxable_full'] +
            this.purchase_summary['total_taxable_installment'] +
            this.purchase_summary['total_taxable_full']

          this.purchase_net_taxes =
            this.purchase_refund_summary['taxes_taxable_installment'] +
            this.purchase_refund_summary['taxes_taxable_full'] +
            this.purchase_summary['taxes_taxable_installment'] +
            this.purchase_summary['taxes_taxable_full']
        })
        .catch(err => {
          console.log(err)
        })
    },

    printReport() {
      //invoke Print me From Mixin //
      this.printMe('#printedReport', this.cssText)
    },
  },
}
</script>

<style lang="scss" scoped></style>
