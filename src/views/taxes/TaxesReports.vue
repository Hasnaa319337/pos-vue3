<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <!-- Header -->
      <div class="card-header header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ trans('Taxes_Reports') }}</h4>

        <div style="display: flex; gap: 5px" class="dropdown">
          <VueDatePicker
            v-model="dateStr"
            :placeholder="trans('select_date')"
            :button-validate="trans('save')"
            :button-cancel="trans('cancel')"
            range
            :range-header-text="`${trans('from')} %d ${trans('to')} %d`"
            :range-input-text="`${trans('from')} %d ${trans('to')} %d`"
            fullscreen-mobile
            validate
            rtl
            @onClose="showConsoleMessage('-- datepicker closed --')"
          />

          <router-link class="btn btn-primary btn-md mb-1" to="/summary-tax">
            {{ trans('summary_tax') }}
          </router-link>
          <go-back-button style="height: 38px; margin-top: 4px !important" />
        </div>
      </div>

      <div class="filter" style="margin: 10px 5px">
        <div class="d-flex" style="float: left">
          <b-form-checkbox
            v-for="(btn, key) in allEnums"
            :key="key"
            :value="key"
            v-model="selectItem"
            @change="getTables()"
            style="font-size: 15px"
          >
            {{ btn }}</b-form-checkbox
          >
        </div>
      </div>

      <!-- Body -->

      <div class="card-body" style="margin-top: 20px">
        <div class="row align-items-center justify-content-between mb-4">
          <div class="col-sm-12">
            <div class="table-responsive">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <th style="width: 100px; border: 2px solid #85c3ff">
                      {{ trans('id') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('name') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('tax_num') }}
                    </th>
                    <th
                      style="border: 2px solid #85c3ff"
                      v-if="selectItem === 'non_taxable_purchase_taxes'"
                    >
                      {{ trans('provider invoice number') }}
                    </th>
                    <th
                      style="border: 2px solid #85c3ff"
                      v-if="selectItem === 'non_taxable_purchase_refund_taxes'"
                    >
                      {{ trans('provider invoice number') }}
                    </th>
                    <th
                      style="border: 2px solid #85c3ff"
                      v-if="selectItem === 'taxable_purchase_refund_taxes'"
                    >
                      {{ trans('provider invoice number') }}
                    </th>
                    <th
                      style="border: 2px solid #85c3ff"
                      v-if="selectItem === 'taxable_purchase_taxes'"
                    >
                      {{ trans('provider invoice number') }}
                    </th>

                    <th style="border: 2px solid #85c3ff">
                      {{ trans('invoice_date') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('payment type') }}
                    </th>

                    <th style="border: 2px solid #85c3ff">
                      {{ trans('subtotal') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('discount amount') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('net') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('tax amount') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('total') }}
                    </th>
                  </b-tr>
                </b-thead>
                <TableSkeletonLoader :items="10" :length="10" v-if="skeletonLoading" />
                <b-tbody v-else>
                  <b-tr v-for="table in tables" :key="table.id">
                    <b-td>
                      {{ table.id }}
                    </b-td>
                    <b-td> {{ table.name }} </b-td>
                    <b-td>{{ table.tax_number }} </b-td>
                    <b-td v-if="table.reference_inv_number">{{ table.reference_inv_number }} </b-td>

                    <b-td>
                      {{ table.invoice_date }}
                    </b-td>
                    <b-td>
                      <b-badge
                        style="font-size: 13px; padding: 12px"
                        variant="success"
                        v-if="table.payment_type === 'full'"
                      >
                        {{ trans(table.payment_type) }}
                      </b-badge>

                      <b-badge v-else style="background: #e0a800; font-size: 13px; padding: 12px">
                        {{ trans(table.payment_type) }}</b-badge
                      >
                    </b-td>

                    <b-td :class="Number(table.subtotal).isNegative('negative_number_color')">
                      {{ Number(table.subtotal).toNegativeFormat() }}
                    </b-td>

                    <b-td
                      :class="Number(table.discount_amount).isNegative('negative_number_color')"
                    >
                      {{ Number(table.discount_amount).toNegativeFormat() }}
                    </b-td>

                    <b-td
                      :class="
                        Number(table.total - table.tax_amount).isNegative('negative_number_color')
                      "
                    >
                      {{ Number(table.total - table.tax_amount).toNegativeFormat() }}
                    </b-td>

                    <b-td :class="Number(table.tax_amount).isNegative('negative_number_color')">
                      {{ Number(table.tax_amount).toNegativeFormat() }}
                    </b-td>

                    <b-td :class="Number(table.total).isNegative('negative_number_color')">
                      {{ Number(table.total).toNegativeFormat() }}
                      {{ getSetting('currency', settings) }}</b-td
                    >
                  </b-tr>
                  <b-tr>
                    <b-td
                      style="font-weight: 900 !important"
                      colspan="6"
                      v-if="selectItem === 'non_taxable_purchase_taxes'"
                    >
                      {{ trans('total') }}</b-td
                    >
                    <b-td
                      style="font-weight: 900 !important"
                      colspan="6"
                      v-else-if="selectItem === 'taxable_purchase_taxes'"
                    >
                      {{ trans('total') }}</b-td
                    >
                    <b-td
                      style="font-weight: 900 !important"
                      colspan="6"
                      v-else-if="selectItem === 'taxable_purchase_refund_taxes'"
                    >
                      {{ trans('total') }}</b-td
                    >
                    <b-td
                      style="font-weight: 900 !important"
                      colspan="6"
                      v-else-if="selectItem === 'non_taxable_purchase_refund_taxes'"
                    >
                      {{ trans('total') }}</b-td
                    >
                    <b-td style="font-weight: 900 !important" colspan="5" v-else>
                      {{ trans('total') }}</b-td
                    >
                    <b-td style="font-weight: 900 !important">{{ sub_total_price }}</b-td>
                    <b-td style="font-weight: 900 !important">{{ total_discount }}</b-td>
                    <b-td style="font-weight: 900 !important">{{
                      total_price - total_discount
                    }}</b-td>

                    <b-td style="font-weight: 900 !important">{{ total_taxes }}</b-td>
                    <b-td style="font-weight: 900 !important"
                      >{{ total_price }} {{ getSetting('currency', settings) }}</b-td
                    >
                  </b-tr>
                </b-tbody>

                <b-tbody class="text-center" v-if="itemsLoaded && !tables.length">
                  <b-tr>
                    <b-td colspan="12">
                      <h5 class="no_results_found">
                        {{ trans('no_results_found') }}
                      </h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </div>
          <div class="col-sm-12 text-center" v-if="!skeletonLoading">
            <pagination-component
              :items="tables"
              :last_page="last_page"
              :next_page="next_page"
              :prev_page="prev_page"
              :current_page="current_page"
              :next_page_url="next_page_url"
              :prev_page_url="prev_page_url"
              :first_page_url="first_page_url"
              :last_page_url="last_page_url"
              :total="total"
              @goToNext="goTo(next_page_url)"
              @goToPrev="goTo(prev_page_url)"
              @goToFirst="goTo(first_page_url)"
              @goToLast="goTo(last_page_url)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'

export default {
  components: { TableSkeletonLoader, PaginationComponent },
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'language'],
  data() {
    return {
      last_page: 0,
      selectItem: 'taxable_sales_taxes',
      message: '',
      alertType: 'success',
      tables: [],

      paginate: {},
      filter: {
        per_page: 15
      },
      usingFilters: true,
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',

      total: 0,

      allEnums: [],
      globalStatus: '',
      itemsLoaded: false,
      skeletonLoading: true,

      total_taxes: 0,
      total_price: 0,
      total_discount: 0,
      sub_total_price: 0,

      dateStr: {}
    }
  },

  mounted() {
    this.getTables()
    this.getEnums()
  },
  methods: {
    showConsoleMessage() {
      localStorage.setItem('TaxDateEnd', this.dateStr.end)
      localStorage.setItem('TaxDateStart', this.dateStr.start)
      return this.getTables()
    },
    getEnums() {
      this.axios({
        method: 'GET',
        url: '/api/enums'
      }).then((res) => {
        this.allEnums = res.data.body.taxes_report_type
      })
    },

    getTables() {
      this.axios({
        method: 'GET',
        url: '/api/tax-report/tax-reports/' + this.selectItem,
        params: {
          to_date: this.dateStr.end,
          from_date: this.dateStr.start
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.itemsLoaded = true

          this.tables = res.data.body.table.data
          this.sub_total_price = res.data.body.sub_total_price
          this.total_discount = res.data.body.total_discount
          this.total_price = res.data.body.total_price
          this.total_taxes = res.data.body.total_taxes
          this.paginate = res.data.body.table.paginate
          this.total = res.data.body.table.paginate.total
          this.current_page = res.data.body.table.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.table.paginate.next_page_url
          this.prev_page_url = res.data.body.table.paginate.prev_page_url
          this.first_page_url = res.data.body.table.paginate.first_page_url
          this.last_page_url = res.data.body.table.paginate.last_page_url
          this.last_page = res.data.body.table.paginate.last_page
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goTo(url) {
      this.skeletonLoading = true
      this.tables = []

      this.axios({
        methods: 'GET',
        url: url,
        params: {
          type: this.selectItem
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.tables = res.data.body.table.data
          this.paginate = res.data.body.table.paginate
          this.total = res.data.body.table.paginate.total
          this.current_page = res.data.body.table.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.table.paginate.next_page_url
          this.prev_page_url = res.data.body.table.paginate.prev_page_url
          this.first_page_url = res.data.body.table.paginate.first_page_url
          this.last_page_url = res.data.body.table.paginate.last_page_url
          this.last_page = res.data.body.table.paginate.last_page
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    }
  }
}
</script>

<style scoped>
.status_span {
  width: 12.6px;
  height: 12.6px;
  border-radius: 50%;
  display: inline-block;
  margin: 5px 2px 0;
}
.statud_receved {
  background: rgba(52, 171, 198, 1);
}
.status_accept {
  background: rgba(94, 218, 35, 1);
}
.bg-sky-100 {
  background: rgba(199, 23, 23, 1);
}

.changebackground {
  background: green;
}

.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #007bff !important;
  background-color: #007bff !important;
}
.custom-control-label::before {
  margin-top: 5px;
  width: 21px;
  height: 20px;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
  top: 8px;
}

.custom-control {
  font-size: 20px;
}
</style>

<style>
#datepicker__azvju30dg {
  width: 300px !important;
}
.vd-picker__input input {
  width: 300px !important;
}

.vd-picker__input {
  border: 1px solid #ddd !important
  ;
  border-radius: 7px !important;
}
</style>
