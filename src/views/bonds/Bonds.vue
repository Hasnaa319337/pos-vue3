<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card pt-3">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title">{{ trans('Bonds') }}</h4>
          <div class="dropdown" style="text-align: end">
            <router-link
              v-if="permissions.includes('create_accounting_restriction')"
              class="btn btn-success btn-md mb-1"
              to="/accounting-restrictions/add"
            >
              <i class="bi bi-plus-lg"></i>
            </router-link>
            <GoBackButton />
            <!--                        <b-button @click="searchOn = !searchOn" variant="primary" class=" mb-1">-->
            <!--                            <i class="bi bi-search"></i>-->
            <!--                        </b-button>-->
          </div>
        </div>
        <!--                <div class="card-body header-sm d-flex justify-content-between align-items-center">-->
        <!--                    <div class="col-sm-12"></div>-->
        <!--                </div>-->
        <div class="card-body">
          <div class="align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <b-row>
                <b-table-simple
                  sticky-header
                  striped
                  bordered
                  responsive
                  style="min-height: 50px"
                  v-if="permissions.includes('view_any_accounting_restriction')"
                >
                  <GlobalTabel :columns="columns" />
                  <table-skeleton-loader
                    v-if="SkeletonLoading"
                    :items="10"
                    :length="columns.length"
                  />
                  <template v-else>
                    <b-tbody class="text-center" v-for="(report, index) in reports" :key="index">
                      <b-tr>
                        <b-td>{{ report.id }}</b-td>
                        <b-td>{{ report.note }}</b-td>
                        <b-td>{{ report.date }}</b-td>

                        <b-td>
                          {{ report.number_rows }}
                        </b-td>
                        <b-td>
                          {{ report.total }}
                          {{ getSetting('currency', settings) }}
                        </b-td>

                        <b-td>
                          <div class="icons" style="display: flex; justify-content: center">
                            <b-td style="border: none !important; background: none">
                              <router-link
                                v-if="permissions.includes('view_accounting_restriction')"
                                :to="'/accounting_restriction/show/' + report.restriction_code"
                              >
                                <a
                                  v-b-tooltip.hover
                                  title="عرض"
                                  style="cursor: pointer; color: #007bff !important"
                                  class="mx-2"
                                >
                                  <font-awesome-icon icon="fa-solid fa-eye" />
                                </a>
                              </router-link>
                              <router-link
                                v-if="permissions.includes('update_accounting_restriction')"
                                :to="'/accounting-restrictions/edit/' + report.restriction_code"
                              >
                                <a
                                  v-b-tooltip.hover
                                  title="تعديل"
                                  style="cursor: pointer; color: #007bff !important"
                                  class="mx-2"
                                >
                                  <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                </a>
                              </router-link>
                              <span
                                v-b-tooltip.hover
                                :title="trans('export_excel')"
                                @click="exportData(report.restriction_code, 'xlsx')"
                                style="cursor: pointer; color: #007bff !important"
                                class="mx-2"
                              >
                                <font-awesome-icon icon="fa-solid fa-download" />
                              </span>
                              <span
                                v-b-tooltip.hover
                                :title="trans('export_pdf')"
                                @click="downloadPDF(report.restriction_code)"
                                style="cursor: pointer; color: #007bff !important"
                                class="mx-2"
                              >
                                <font-awesome-icon icon="fa-solid fa-file-pdf" />
                              </span>

                              <a
                                v-if="permissions.includes('delete_accounting_restriction')"
                                v-b-tooltip.hover
                                title="حذف"
                                style="cursor: pointer; color: #dc3545 !important"
                                class="mx-2"
                                @click="delItem(report.restriction_code)"
                              >
                                <font-awesome-icon icon="fa-solid fa-trash" />
                              </a>
                              <ActionButton
                                v-if="
                                  permissions.includes(
                                    'view_action_event_accounting_restriction_item'
                                  )
                                "
                                :id="report.id"
                                :resource_name="'accounting_restriction'"
                              />
                            </b-td>
                          </div>
                        </b-td>
                      </b-tr>
                      <b-table-simple id="pdfTabel" class="d-none" style="font-size: 16px">
                        <b-thead>
                          <b-tr>
                            <b-th>{{ trans('id') }}</b-th>
                            <b-th>{{ trans('date') }}</b-th>
                            <b-th>{{ trans('note') }}</b-th>
                            <b-th>{{ trans('debit') }}</b-th>
                            <b-th>{{ trans('credit') }}</b-th>
                            <b-th>{{ trans('account_name') }}</b-th>
                            <b-th>{{ trans('account_number') }}</b-th>
                          </b-tr>
                        </b-thead>
                        <b-tbody>
                          <b-tr v-for="item in report.items" :key="item.id">
                            <b-td>{{ item.id }}</b-td>
                            <b-td>{{ item.date }}</b-td>
                            <b-td>{{ item.note }}</b-td>
                            <b-td>{{ item.account_name }}</b-td>
                            <b-td>{{ item.account_type }}</b-td>
                            <b-td>{{ item.credit }}</b-td>
                            <b-td>{{ item.debit }}</b-td>
                          </b-tr>
                        </b-tbody>
                      </b-table-simple>
                    </b-tbody>
                  </template>
                </b-table-simple>
              </b-row>
            </div>
            <div class="col-sm-12 text-center" v-if="!SkeletonLoading">
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
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'
export default {
  name: 'OpeningInventoryBalance',
  components: { TableSkeletonLoader, PaginationComponent },
  props: ['permissions', 'section', 'user', 'langs', 'settings'],
  data() {
    return {
      columns: [
        'reg_num',
        'description',
        'date',
        'restriction_rows_count',
        'registration_total',
        'actions'
      ],
      message: '',
      alertType: 'success',
      filter: {
        per_page: 30
      },
      usingFilters: false,
      strings: [],
      reports: [],
      loaded: false,
      last_page: 0,
      total: '',
      current_page: '',
      prev_page: '',
      next_page: '',
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total_debit: '',
      total_credit: '',
      searchOn: false,
      SkeletonLoading: true,
      update: {
        transaction_id: '',
        debit: '',
        credit: '',
        account: ''
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  computed: {
    users() {
      return this.data?.profile?.users
    }
  },
  methods: {
    // continue tomorrow
    downloadPDF() {
      var doc = new jsPDF('p', 'pt', 'a4')

      doc.html(document.querySelector('#pdfTabel'), {
        callback: function (doc) {
          doc.save()
        }
      })
    },
    exportData(id, type) {
      let url = '/api/account/restrictions-export/' + type + '/' + id
      this.axios
        .get(url, {
          responseType: 'arraybuffer'
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `account.${type}`)
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {})
    },
    filtering() {
      this.usingFilters = true
      this.refresh()
    },
    refresh() {
      this.loaded = false
      let url = '/api/account/restrictions'
      if (this.usingFilters) {
        let str = ''
        for (var key in this.filter) {
          if (this.filter[key] == '') continue
          if (str != '') {
            str += '&'
          }
          str += key + '=' + this.filter[key]
        }
        url = url + '?' + str
      }
      this.axios
        .get(url)
        .then((res) => {
          this.SkeletonLoading = false
          this.loaded = true
          this.total_debit = res.data.body.total_debit
          this.total_credit = res.data.body.total_credit

          this.strings = res.data.body.strings
          this.reports = res.data.body.restrictions.data

          this.total = res.data.body.restrictions.paginate.total
          this.current_page = res.data.body.restrictions.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.restrictions.paginate.next_page_url
          this.prev_page_url = res.data.body.restrictions.paginate.prev_page_url
          this.first_page_url = res.data.body.restrictions.paginate.first_page_url
          this.last_page_url = res.data.body.restrictions.paginate.last_page_url
        })
        .catch((error) => {
          // this.message = error.response.data.message;
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
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
      this.axios
        .get(url)
        .then((res) => {
          this.loaded = true
          this.reports = res.data.body.restrictions.data

          this.total = res.data.body.restrictions.paginate.total
          this.current_page = res.data.body.restrictions.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.restrictions.paginate.next_page_url
          this.prev_page_url = res.data.body.restrictions.paginate.prev_page_url
          this.first_page_url = res.data.body.restrictions.paginate.first_page_url
          this.last_page_url = res.data.body.restrictions.paginate.last_page_url
        })
        .catch((error) => {
          // this.message = error.response.data.message;
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    delItem(id) {
      this.$bvModal
        .msgBoxConfirm(trans('delete restriction'), {
          okTitle: this.user.language === 'en' ? 'Yes' : 'نعم',
          cancelTitle: this.user.language === 'en' ? 'No' : 'لا',
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal'
        })
        .then((value) => {
          if (value) {
            this.message = "<i class='fa fa-spin fa-spinner'></i>"
            this.alertType = 'info'
            setTimeout(() => {
              this.message = ''
              this.alertType = 'success'
            }, 5000)

            this.axios
              .delete(`api/account/restrictions/${id}`)
              .then((res) => {
                this.message = res.data.message
                this.alertType = 'success'

                this.refresh()

                setTimeout(() => {
                  this.message = ''
                  this.alertType = 'success'
                }, 3000)
              })
              .catch((error) => {
                this.message = error.response.data.message
                this.alertType = 'danger'
                setTimeout(() => {
                  this.message = ''
                  this.alertType = 'success'
                }, 3000)
              })
          }
        })
    }
  }
}
</script>
