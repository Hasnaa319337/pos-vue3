<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card pt-3">
        <div
          class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">{{ trans('entering_opening_balances') }}</h4>
          <div class="dropdown btns_header" style="text-align: end">
            <router-link
              v-b-tooltip.hover
              :title="trans('add constraint')"
              class="btn btn-success btn-md"
              to="/accounting-restrictions/addBalanceAdditional"
            >
              <font-awesome-icon icon="fa-solid fa-circle-plus " />
            </router-link>

            <b-button @click="searchOn = !searchOn" variant="primary">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </b-button>
            <GoBackButton />
          </div>
        </div>
        <!--                <div class="card-body header-sm d-flex justify-content-between align-items-center">-->
        <!--                    <div class="col-sm-12"></div>-->
        <!--                </div>-->
        <div class="card-body">
          <div class="align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <b-row v-if="searchOn">
                <ValidationObserver v-slot="{ handleSubmit }" ref="searchForm">
                  <b-form
                    @submit.prevent="handleSubmit(filtering())"
                    @reset.prevent="reset"
                  >
                    <b-row style="justify-content: center">
                      <div cols="12" md="3">
                        <b-form-group :label="trans('account_code')">
                          <b-form-input
                            type="text"
                            class="form-control"
                            v-model="filter.account"
                          />
                        </b-form-group>
                      </div>
                      <div cols="12" md="3" style="margin: 0 10px">
                        <b-form-group :label="trans('account_name')">
                          <b-form-input
                            type="text"
                            class="form-control"
                            v-model="filter.account_name"
                          />
                        </b-form-group>
                      </div>

                      <div cols="12" md="3" style="margin: 30px 10px">
                        <b-button variant="success" type="submit">
                          <font-awesome-icon icon="fa-solid fa-filter " />
                          {{ trans('search') }}
                        </b-button>
                      </div>
                      <div cols="12" md="3" style="margin: 30px 10px">
                        <b-button variant="warning" type="reset">
                          <font-awesome-icon
                            icon="fa-solid fa-arrows-rotate "
                          />
                          {{ trans('reset_search') }}
                        </b-button>
                      </div>
                    </b-row>
                  </b-form>
                </ValidationObserver>
              </b-row>
              <b-row>
                <b-table-simple
                  sticky-header
                  striped
                  bordered
                  responsive
                  style="min-height: 50px"
                >
                  <GlobalTabel :columns="columns" />
                  <TableSkeletonLoader
                    v-if="skeletonLoading"
                    :items="10"
                    :length="columns.length"
                  />
                  <template v-else>
                    <b-tbody
                      class="text-center"
                      v-for="(report, index) in reports"
                      :key="index"
                    >
                      <b-tr>
                        <b-td>{{ report.id }}</b-td>
                        <b-td>{{ report.note }}</b-td>

                        <b-td>
                          {{ report.number_rows }}
                        </b-td>
                        <b-td>
                          {{ report.total }}
                          {{ getSetting('currency', settings) }}
                        </b-td>
                        <b-td>{{ report.created_at }}</b-td>
                        <b-td>{{ report.created_by.name }}</b-td>
                        <b-td>
                          <div class="icons">
                            <b-td
                              style="border: none !important ; background: none"
                            >
                              <router-link
                                v-if="
                                  permissions.includes(
                                    'view_accounting_initial_balance'
                                  )
                                "
                                :to="
                                  '/accounting_initial_balance/show/' +
                                  report.initial_balance_code
                                "
                              >
                                <a
                                  v-b-tooltip.hover
                                  :title="trans('show')"
                                  style="
                                    cursor: pointer;
                                    color: #007bff !important;
                                  "
                                  class="mx-2"
                                >
                                  <font-awesome-icon icon="fa-solid fa-eye" />
                                </a>
                              </router-link>
                              <router-link
                                v-if="
                                  permissions.includes(
                                    'update_accounting_initial_balance'
                                  )
                                "
                                :to="
                                  '/accounting_initial_balance/edit/' +
                                  report.initial_balance_code
                                "
                              >
                                <a
                                  v-b-tooltip.hover
                                  :title="trans('edit')"
                                  style="
                                    cursor: pointer;
                                    color: #007bff !important;
                                  "
                                  class="mx-2"
                                >
                                  <font-awesome-icon
                                    icon="fa-solid fa-pen-to-square"
                                  />
                                </a>
                              </router-link>
                              <span
                                v-b-tooltip.hover
                                :title="trans('export_excel')"
                                @click="
                                  exportData(
                                    report.initial_balance_code,
                                    'xlsx'
                                  )
                                "
                                style="
                                  cursor: pointer;
                                  color: #007bff !important;
                                "
                                class="mx-2"
                              >
                                <font-awesome-icon
                                  icon="fa-solid fa-download"
                                />
                              </span>
                              <span
                                v-b-tooltip.hover
                                :title="trans('export_pdf')"
                                @click="
                                  exportPdf(report.initial_balance_code, 'pdf')
                                "
                                style="
                                  cursor: pointer;
                                  color: #007bff !important;
                                "
                                class="mx-2"
                              >
                                <font-awesome-icon
                                  icon="fa-solid fa-file-pdf"
                                />
                              </span>

                              <a
                                v-if="
                                  permissions.includes(
                                    'delete_accounting_initial_balance'
                                  )
                                "
                                v-b-tooltip.hover
                                :title="trans('delete')"
                                style="
                                  cursor: pointer;
                                  color: #dc3545 !important;
                                "
                                class="mx-2"
                                @click="delItem(report.initial_balance_code)"
                              >
                                <font-awesome-icon icon="fa-solid fa-trash" />
                              </a>
                              <ActionButton
                                v-if="
                                  permissions.includes(
                                    'view_action_event_accounting_initial_balance'
                                  )
                                "
                                :id="report.id"
                                :resource_name="'accounting_initial_balance'"
                              />
                            </b-td>
                          </div>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </template>
                </b-table-simple>
              </b-row>
            </div>
            <div class="col-sm-12 text-center" v-if="!skeletonLoading">
              <pagination-component
                :items="reports"
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
  </div>
</template>
<script>
import Vue from 'vue'
import JsonExcel from 'vue-json-excel'

import { trans } from '@/support/mixins'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'

// register globally

Vue.component('downloadExcel', JsonExcel)

export default {
  components: { TableSkeletonLoader, PaginationComponent },
  name: 'OpeningInventoryBalance',
  props: ['permissions', 'section', 'user', 'langs', 'settings'],
  data() {
    return {
      columns: [
        'reg_num',
        'description',
        'restriction_rows_count',
        'registration_total',
        'created_at',
        'created_by',
        'actions',
      ],
      filter: {
        per_page: 30,
      },
      usingFilters: false,
      strings: [],
      reports: [],
      total: '',
      current_page: '',
      prev_page: '',
      next_page: '',
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      last_page: 0,
      total_debit: '',
      total_credit: '',
      searchOn: false,
      loaded: false,
      skeletonLoading: true,
      update: {
        transaction_id: '',
        debit: '',
        credit: '',
        account: '',
      },
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  computed: {
    users() {
      return this.data?.profile?.users
    },
  },
  methods: {
    exportData(id, type) {
      let url = `/api/account/initial-balance-export/${type}/${id}`
      console.log('res')
      axios
        .get(url, {
          headers: {
            'Content-Type':
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
          responseType: 'arraybuffer',
        })
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          const fileName = `IntialBalance.${type}`
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
        })
        .catch(error => {
          console.log(error)
        })
    },

    exportPdf(id, type) {
      let url = `/api/account/initial-balance-export/${type}/${id}`

      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=document.pdf',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },

          responseType: 'blob',
          responseType: 'arraybuffer',
        })
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          const fileName = `IntialBalance.${type}`
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()

          console.log('res')
        })
        .catch(error => {
          console.log(error)
        })
    },

    filtering() {
      this.usingFilters = true
      this.refresh()
    },
    refresh() {
      this.loaded = false
      if (this.usingFilters) {
        let str = ''
        for (var key in this.filter) {
          if (this.filter[key] == '') continue
          if (str != '') {
            str += '&'
          }
          str += 'search' + '=' + this.filter[key]
        }
        let url = '/api/account/initial-balance?' + str
        this.refresh(url)
      }
      axios({
        method: 'GET',
        url: '/api/account/initial-balance',
        // params: {
        //   account: this.filters.account,
        //   keyword: this.filters.title,
        //   category: this.filters.category_id,
        //   per_page: this.filters.per_page,
        // },
      })
        .then(res => {
          this.skeletonLoading = false
          this.loaded = true
          this.total_debit = res.data.body.total_debit
          this.total_credit = res.data.body.total_credit

          this.strings = res.data.body.strings
          this.reports = res.data.body.initial_balance.data

          this.total = res.data.body.initial_balance.paginate.total
          this.current_page =
            res.data.body.initial_balance.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url =
            res.data.body.initial_balance.paginate.next_page_url
          this.prev_page_url =
            res.data.body.initial_balance.paginate.prev_page_url
          this.first_page_url =
            res.data.body.initial_balance.paginate.first_page_url
          this.last_page_url =
            res.data.body.initial_balance.paginate.last_page_url

          this.last_page = res.data.body.initial_balance.paginate.last_page
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    goTo(url) {
      this.loaded = false
      this.reports = []
      if (this.usingFilters) {
        let str = ''
        for (var key in this.filter) {
          if (this.filter[key] == '') continue
          if (str != '') {
            str += '&'
          }
          str += key + '=' + this.filter[key]
        }
        url = url.includes('?') ? url + '&' + str : url + '?' + str
      }
      axios
        .get(url)
        .then(res => {
          this.loaded = true
          this.reports = res.data.body.initial_balance.data

          this.total = res.data.body.initial_balance.paginate.total
          this.current_page =
            res.data.body.initial_balance.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url =
            res.data.body.initial_balance.paginate.next_page_url
          this.prev_page_url =
            res.data.body.initial_balance.paginate.prev_page_url
          this.first_page_url =
            res.data.body.initial_balance.paginate.first_page_url
          this.last_page_url =
            res.data.body.initial_balance.paginate.last_page_url
          this.last_page = res.data.body.initial_balance.paginate.last_page
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    store(account, id, credit, debit) {
      this.update.transaction_id = id
      this.update.credit = credit
      this.update.debit = debit
      this.update.account = account

      axios
        .post('/api/account/initial/set-initial-balance', this.update)
        .then(
          res => {
            if (res.data.status) {
              this.showToastError(res.data.message, res.data.custom_code)
            } else {
              this.showToastError(res.data.message, res.data.custom_code)
            }
          },
          error => {
            this.showToastError(
              error.response.data.message,
              error.response.data.custom_code
            )
          }
        )
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    delItem(id) {
      this.$bvModal
        .msgBoxConfirm(trans('Are you sure you want to delete this balance'), {
          okTitle: this.user.language === 'en' ? 'Yes' : 'نعم',
          cancelTitle: this.user.language === 'en' ? 'No' : 'لا',
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal',
        })
        .then(value => {
          if (value) {
            axios
              .delete(`api/account/initial-balance/${id}`)
              .then(res => {
                this.showToastError(res.data.message, res.data.custom_code)

                this.refresh()
              })

              .catch(error => {
                this.showToastError(
                  error.response.data.message,
                  error.response.data.custom_code
                )
              })
          }
        })
    },
  },
}
</script>
<style scoped>
.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
}
</style>
