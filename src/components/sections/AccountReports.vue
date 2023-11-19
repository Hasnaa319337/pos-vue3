<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card" v-if="permissions.includes('view_reports')">
      <div class="card" v-if="loaded">
        <div class="card-header header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title" v-if="user.language" v-text="trans('accounts_reports')"></h4>
          <div class="dropdown"></div>
        </div>
        <div class="card-body header-sm d-flex justify-content-between align-items-center">
          <div class="col-sm-12">
            <ValidationObserver v-slot="{ handleSubmit }" ref="form">
              <b-form @submit.prevent="handleSubmit(filterResults)" @reset.prevent="reset">
                <b-form-row>
                  <b-col cols="12" md="3">
                    <ValidationProvider
                      name="report_type"
                      rules="required"
                      v-slot="{ valid, errors }"
                    >
                      <b-form-group :label="trans('report_type')">
                        <b-form-select
                          v-model="filter.type"
                          :state="errors[0] ? false : valid ? true : null"
                          @change="resetResults"
                        >
                          <b-form-select-option
                            v-for="(type, index) in types"
                            :value="type"
                            :key="`${type + index}`"
                          >
                            {{ trans(type) }}
                          </b-form-select-option>
                        </b-form-select>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col cols="12" md="3" v-if="filter.type != 'liability-fund'">
                    <b-form-group :label="trans('Inventory')">
                      <b-form-select v-model="filter.inventory">
                        <b-form-select-option
                          v-for="inv in inventories"
                          :value="inv.id"
                          :key="inv.id"
                        >
                          {{ trans(inv.title) }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="3" v-if="filter.type == 'liability-fund'">
                    <ValidationProvider name="tax_type" rules="required" v-slot="{ valid, errors }">
                      <b-form-group :label="trans('tax_type')">
                        <b-form-select
                          v-model="filter.tax_type"
                          :state="errors[0] ? false : valid ? true : null"
                        >
                          <b-form-select-option value="all">
                            {{ trans('all_taxes') }}
                          </b-form-select-option>
                          <b-form-select-option value="tax">
                            {{ trans('sale_taxes') }}
                          </b-form-select-option>
                          <b-form-select-option value="product">
                            {{ trans('product_taxes') }}
                          </b-form-select-option>
                        </b-form-select>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col cols="12" md="3" v-if="filter.type != 'stock-report'">
                    <ValidationProvider
                      name="date_from"
                      :rules="filter.type == 'liability-fund' ? 'required' : ''"
                      v-slot="{ valid, errors }"
                    >
                      <b-form-group :label="trans('date from')">
                        <b-input
                          type="date"
                          class="form-control"
                          v-model="filter.date_from"
                          :state="
                            errors[0]
                              ? false
                              : valid && filter.hasOwnProperty('date_from')
                              ? true
                              : null
                          "
                        ></b-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col cols="12" md="3" v-if="filter.type != 'stock-report'">
                    <ValidationProvider
                      name="date_to"
                      :rules="filter.type == 'liability-fund' ? 'required' : ''"
                      v-slot="{ valid, errors }"
                    >
                      <b-form-group :label="trans('date to')">
                        <b-input
                          type="date"
                          class="form-control"
                          v-model="filter.date_to"
                          :state="
                            errors[0]
                              ? false
                              : valid && filter.hasOwnProperty('date_to')
                              ? true
                              : null
                          "
                        ></b-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col cols="12" md="3" v-else>
                    <b-form-group :label="trans('stock threshold')">
                      <b-input
                        type="number"
                        class="form-control"
                        v-model="filter.threshold"
                      ></b-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row class="justify-content-center">
                  <b-form-group :label="trans('items per page')">
                    <b-form-input
                      type="number"
                      v-model="filter.per_page"
                      @keypress="isNumber($event)"
                    ></b-form-input>
                  </b-form-group>
                </b-form-row>
                <b-form-row class="justify-content-center">
                  <b-button variant="success" type="submit" class="mr-2"
                    ><i class="fa fa-filter"></i>
                    {{ trans('filter') }}
                  </b-button>
                  <b-button variant="warning" type="reset" class="mr-2"
                    ><i class="fa fa-refresh"></i>
                    {{ trans('reset_search') }}
                  </b-button>
                </b-form-row>
              </b-form>
            </ValidationObserver>
          </div>
        </div>
        <div class="align-items-center justify-content-between mb-4">
          <div class="col-sm-12 text-center" v-if="message.length">
            <div class="alert" :class="'alert-' + alertType" v-html="message"></div>
          </div>
          <div class="clear clearfix"></div>
        </div>
        <div class="card-body" v-if="loadTable">
          <div
            class="align-items-center justify-content-between mb-4"
            v-if="filter.type == 'sales-costs-report'"
          >
            <div class="col-sm-12">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <b-tbody v-if="itemsLoaded">
                  <b-tr v-if="reports.length">
                    <b-td>
                      <b>{{ trans('sales') }}</b>
                    </b-td>
                    <b-td
                      >{{ parseFloat(reports[0].sum_total).toFixed(2) }}
                      {{ trans(settings.currency_en) }}
                    </b-td>
                  </b-tr>
                  <b-tr v-if="reports.length">
                    <b-td>
                      <b>{{ trans('cost') }}</b>
                    </b-td>
                    <b-td
                      >{{ parseFloat(reports[0].sum_cost).toFixed(2) }}
                      {{ trans(settings.currency_en) }}
                    </b-td>
                  </b-tr>
                  <b-tr v-else>
                    <b-td colspan="2">
                      <h5 class="no_results_found">
                        {{ trans('no_results_found') }}
                      </h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-else class="text-center">
                  <b-tr>
                    <b-td colspan="2">
                      <i class="fa fa-spin fa-spinner"></i>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </div>
          <div
            class="align-items-center justify-content-between mb-4"
            v-else-if="filter.type == 'withdrawals-report'"
          >
            <div class="col-sm-12">
              <p>
                <b>{{ trans('overall_total') }}</b
                >: {{ overAllWithdrawalsTotal }}
              </p>
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <b-th>{{ trans('created_at') }}</b-th>
                    <b-th>{{ trans('comment') }}</b-th>
                    <b-th>{{ trans('amount') }}</b-th>
                    <b-th>{{ trans('by') }}</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-if="itemsLoaded && reports.length">
                  <b-tr v-for="(report, idx) in reports" :key="idx">
                    <b-td>{{ report.created_at }}</b-td>
                    <b-td>{{ report.title }}</b-td>
                    <b-td
                      >{{ report.amount }}
                      {{ trans(settings.currency_en) }}
                    </b-td>
                    <b-td>{{ report.user_name }}</b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-else-if="itemsLoaded && !reports.length">
                  <b-tr class="text-center">
                    <b-td colspan="4">
                      <h5>{{ trans('no_results_found') }}</h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-else class="text-center">
                  <b-tr>
                    <b-td colspan="4">
                      <i class="fa fa-spin fa-spinner"></i>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
            <div class="col-sm-12 text-center" v-if="total > filter.per_page">
              <nav
                aria-label="Page navigation center-block"
                style="margin-top: 20px; direction: ltr"
              >
                <ul class="pagination justify-content-center">
                  <li class="page-item" v-if="prev_page_url">
                    <a
                      class="page-link"
                      @click.prevent="goTo(first_page_url)"
                      href="#"
                      tabindex="-1"
                      ><i class="fa fa-angle-double-left"></i
                    ></a>
                  </li>
                  <li class="page-item" v-if="prev_page_url">
                    <a class="page-link" @click.prevent="goTo(prev_page_url)" href="#" tabindex="-1"
                      ><i class="fa fa-angle-left"></i
                    ></a>
                  </li>
                  <li class="page-item active disabled">
                    <a class="page-link" @click.prevent="javascript" href="#">{{ current_page }}</a>
                  </li>
                  <li class="page-item" v-if="next_page_url">
                    <a class="page-link" @click.prevent="goTo(next_page_url)" href="#"
                      ><i class="fa fa-angle-right"></i
                    ></a>
                  </li>
                  <li class="page-item" v-if="next_page_url">
                    <a class="page-link" @click.prevent="goTo(last_page_url)" href="#"
                      ><i class="fa fa-angle-double-right"></i
                    ></a>
                  </li>
                </ul>
              </nav>
              <span>{{ trans('total_search_results') }}: {{ total }}</span>
            </div>
          </div>
          <div
            class="align-items-center justify-content-between mb-4"
            v-else-if="filter.type == 'stock-report'"
          >
            <div class="col-sm-12">
              <div class="">
                <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                  <b-thead>
                    <b-tr class="rounded" variant="dark">
                      <th>{{ trans('product') }}</th>
                      <th>{{ trans('is_variation') }}</th>
                      <th>{{ trans('stock') }}</th>
                    </b-tr>
                  </b-thead>
                  <b-tbody v-if="itemsLoaded && reports.length">
                    <b-tr v-for="report in reports" :key="report.p_id">
                      <td>
                        <router-link
                          :to="
                            report.variation_id != 0
                              ? '/variations/' + report.p_id
                              : '/products/edit/' + report.p_id
                          "
                          target="_blank"
                        >
                          {{ trans(report.p_title) }}
                        </router-link>
                      </td>
                      <td>
                        {{ report.variation_id != 0 ? trans('variable_product') : '' }}
                      </td>
                      <td>{{ report.stock }}</td>
                    </b-tr>
                  </b-tbody>
                  <b-tbody v-else-if="itemsLoaded && !reports.length">
                    <b-tr class="text-center">
                      <b-td colspan="4">
                        <h5>{{ trans('no_results_found') }}</h5>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                  <b-tbody v-else class="text-center">
                    <b-tr>
                      <b-td colspan="4">
                        <i class="fa fa-spin fa-spinner"></i>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </div>
              <div class="col-sm-12 text-center" v-if="total > filter.per_page">
                <nav
                  aria-label="Page navigation center-block"
                  style="margin-top: 20px; direction: ltr"
                >
                  <ul class="pagination justify-content-center">
                    <li class="page-item" v-if="prev_page_url">
                      <a
                        class="page-link"
                        @click.prevent="goTo(first_page_url)"
                        href="#"
                        tabindex="-1"
                        ><i class="fa fa-angle-double-left"></i
                      ></a>
                    </li>
                    <li class="page-item" v-if="prev_page_url">
                      <a
                        class="page-link"
                        @click.prevent="goTo(prev_page_url)"
                        href="#"
                        tabindex="-1"
                        ><i class="fa fa-angle-left"></i
                      ></a>
                    </li>
                    <li class="page-item active disabled">
                      <a class="page-link" @click.prevent="javascript" href="#">{{
                        current_page
                      }}</a>
                    </li>
                    <li class="page-item" v-if="next_page_url">
                      <a class="page-link" @click.prevent="goTo(next_page_url)" href="#"
                        ><i class="fa fa-angle-right"></i
                      ></a>
                    </li>
                    <li class="page-item" v-if="next_page_url">
                      <a class="page-link" @click.prevent="goTo(last_page_url)" href="#"
                        ><i class="fa fa-angle-double-right"></i
                      ></a>
                    </li>
                  </ul>
                </nav>
                <span>{{ trans('total_search_results') }}: {{ total }}</span>
              </div>
            </div>
          </div>
          <div
            class="align-items-center justify-content-between mb-4"
            v-else-if="filter.type == 'liability-fund'"
          >
            <div class="col-sm-4" v-if="reports.length">
              <p>
                <b>{{ trans('total_taxes_for_the_selected_period') }}:</b>
                {{ data['total'] }}
              </p>
            </div>
            <div class="col-sm-8" v-if="reports.length">
              <router-link
                class="btn btn-success"
                :to="
                  '/payment-voucher/add?type=taxes&filter=' +
                  JSON.stringify(filter) +
                  '&amount=' +
                  data['total']
                "
              >
                {{ trans('clear_this_amount') }}
              </router-link>
            </div>
            <div class="col-sm-12">
              <div class="">
                <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                  <b-thead>
                    <b-tr class="rounded" variant="dark">
                      <b-th>{{ trans('sale_id') }}</b-th>
                      <b-th>{{ trans('amount') }}</b-th>
                      <b-th>{{ trans('tax_type') }}</b-th>
                      <b-th>{{ trans('created_at') }}</b-th>
                      <b-th>{{ trans('cleared') }}</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody v-if="itemsLoaded && reports.length">
                    <b-tr v-for="report in reports" :key="report.sale_id">
                      <b-td>
                        <router-link :to="'sales/view/' + report.sale_id" target="_blank">
                          #{{ report.sale_id }}
                        </router-link>
                      </b-td>
                      <b-td>{{ report.amount }}</b-td>
                      <b-td>
                        <p>
                          {{
                            report.type == 'product' ? trans('product_taxes') : trans('sale_taxes')
                          }}
                        </p>
                        <p v-if="report.type == 'tax'">
                          {{ user.language == 'en' ? report.title : report.title_ar }}
                        </p>
                      </b-td>
                      <b-td>{{ report.created_at }}</b-td>
                      <b-td>
                        <span v-if="report.cleared">
                          <span class="badge badge-success"
                            ><i class="fa fa-check"></i> {{ report.cleared_at }}</span
                          >
                        </span>
                        <span class="badge badge-danger" v-else>{{ trans('no') }}</span>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                  <b-tbody v-else-if="itemsLoaded && !reports.length">
                    <b-tr class="text-center">
                      <b-td colspan="5">
                        <h5>{{ trans('no_results_found') }}</h5>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                  <b-tbody v-else class="text-center">
                    <b-tr>
                      <b-td colspan="5">
                        <i class="fa fa-spin fa-spinner"></i>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </div>
            </div>
            <div class="col-sm-12 text-center" v-if="total > filter.per_page">
              <nav
                aria-label="Page navigation center-block"
                style="margin-top: 20px; direction: ltr"
              >
                <ul class="pagination justify-content-center">
                  <li class="page-item" v-if="prev_page_url">
                    <a
                      class="page-link"
                      @click.prevent="goTo(first_page_url)"
                      href="#"
                      tabindex="-1"
                      ><i class="fa fa-angle-double-left"></i
                    ></a>
                  </li>
                  <li class="page-item" v-if="prev_page_url">
                    <a class="page-link" @click.prevent="goTo(prev_page_url)" href="#" tabindex="-1"
                      ><i class="fa fa-angle-left"></i
                    ></a>
                  </li>
                  <li class="page-item active disabled">
                    <a class="page-link" @click.prevent="javascript" href="#">{{ current_page }}</a>
                  </li>
                  <li class="page-item" v-if="next_page_url">
                    <a class="page-link" @click.prevent="goTo(next_page_url)" href="#"
                      ><i class="fa fa-angle-right"></i
                    ></a>
                  </li>
                  <li class="page-item" v-if="next_page_url">
                    <a class="page-link" @click.prevent="goTo(last_page_url)" href="#"
                      ><i class="fa fa-angle-double-right"></i
                    ></a>
                  </li>
                </ul>
              </nav>
              <span>{{ trans('total_search_results') }}: {{ total }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="card-body text-center">
          <i class="fa fa-spin fa-spinner" style="font-size: 30px; margin: 50px"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['permissions', 'section', 'user', 'langs', 'settings'],
  data() {
    return {
      message: '',
      alertType: 'success',
      reports: [],
      inventories: [],
      types: ['sales-costs-report', 'withdrawals-report', 'stock-report', 'liability-fund'],
      filter: {
        per_page: 30
      },
      loaded: false,
      usingFilters: 0,
      itemsLoaded: false,
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,
      export_fields: {
        'invoice id': 'id',
        at: 'created_at',
        inventory: 'inventory_title',
        user: 'user_name',
        total: 'total'
      },
      overAllWithdrawalsTotal: 0,
      data: [],
      loadTable: false
    }
  },
  computed: {},
  mounted() {
    window.scrollTo(0, 0)
    this.load()
  },
  methods: {
    load() {
      this.axios
        .get('/api/reports')
        .then((res) => {
          this.inventories = res.data.inventories
          this.filter.type = this.types[0]
          this.filter.inventory = this.user.inventory
          this.loaded = true
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    filterResults() {
      this.usingFilters = 1
      this.refresh()
    },
    refresh() {
      this.clearData()
      let url = '/api/reports/get'
      if (this.usingFilters) {
        let str = ''
        for (var key in this.filter) {
          if (this.filter[key] == '') {
            continue
          }
          if (str != '') {
            str += '&'
          }
          str += key + '=' + this.filter[key]
        }
        url = url + '?' + str
      }
      this.itemsLoaded = false
      this.axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.message = ''
            this.alertType = 'info'
            this.reports = res.data.reports.data
            this.overAllWithdrawalsTotal = res.data.withdrawalsTotal
            this.total = res.data.reports.total
            this.data = res.data.data
            this.current_page = res.data.reports.current_page
            this.prev_page = this.current_page - 1
            this.next_page = this.current_page + 1
            this.next_page_url = res.data.reports.next_page_url
            this.prev_page_url = res.data.reports.prev_page_url
            this.first_page_url = res.data.reports.first_page_url
            this.last_page_url = res.data.reports.last_page_url
          } else {
            this.message = res.data.message
            this.alertType = 'danger'
          }
          if (!this.loadTable) {
            this.loadTable = true
          }
          this.loaded = true
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    goTo(url) {
      this.reports = []
      if (this.usingFilters) {
        let str = ''
        for (var key in this.filter) {
          if (this.filter[key] == '') {
            continue
          }
          if (str != '') {
            str += '&'
          }
          str += key + '=' + this.filter[key]
        }
        url = url.includes('?') ? url + '&' + str : url + '?' + str
      }
      this.itemsLoaded = false
      this.axios
        .get(url)
        .then((res) => {
          this.reports = res.data.reports.data
          this.total = res.data.reports.total
          this.current_page = res.data.reports.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.reports.next_page_url
          this.prev_page_url = res.data.reports.prev_page_url
          this.first_page_url = res.data.reports.first_page_url
          this.last_page_url = res.data.reports.last_page_url
          this.itemsLoaded = true
          this.overAllWithdrawalsTotal = res.data.withdrawalsTotal
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    delete(id) {
      this.$dialog
        .confirm(this.trans('deleting_a_report'))
        .then((dialog) => {
          this.message = "<i class='fa fa-spin fa-spinner'></i>"
          this.alertType = 'info'
          this.axios
            .post('/api/reports/delete', { id: id })
            .then(
              (res) => {
                if (res.data.success) {
                  this.message = res.data.message
                  this.alertType = 'success'
                  this.reports = this.reports.filter((x) => {
                    return x.id != id
                  })
                } else {
                  this.message = res.data.message
                  this.alertType = 'danger'
                }
              },
              (error) => {
                this.message = error.response.data.message
                this.alertType = 'danger'
              }
            )
            .catch((error) => {
              this.message = error.response.data.message
              this.alertType = 'danger'
            })
        })
        .catch(function () {})
    },
    reset() {
      this.filter = {
        per_page: 30,
        inventory: this.user.inventory
      }
      this.$refs.form.reset()
    },
    clearData() {
      this.overAllWithdrawalsTotal = ''
      this.total = ''
      this.data = []
      this.current_page = ''
      this.prev_page = ''
      this.next_page = ''
      this.next_page_url = ''
      this.prev_page_url = ''
      this.first_page_url = ''
      this.last_page_url = ''
      this.reports = []
    },
    resetResults() {
      this.$refs.form.reset()
      if (this.filter.type == 'liability-fund') {
        this.filter.tax_type = 'all'
      }
      this.loadTable = false
    }
  }
}
</script>
