<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">{{ trans('restrication_details') }}</h4>
          <div class="dropdown">
            <div style="display: flex; justify-content: space-between">
              <router-link
                :to="'/accounting-restrictions/edit/' + $route.params.id"
              >
                <button class="btn btn-primary styleAddNewRow">
                  {{ trans('edit')
                  }}<font-awesome-icon
                    style="margin-right: 25px"
                    icon="fa-solid fa-pen-to-square"
                  />
                </button>
              </router-link>

              <button @click="back()" class="btn styleContinue">
                {{ trans('back') }}
              </button>
              <!-- <button
                @click="exportData($route.params.id, 'pdf')"
                class="btn btn-primary styleAddNewRow"
              >
                {{ trans('download_pdf')
                }}<font-awesome-icon
                  style="margin-right: 25px"
                  icon="fa-solid fa-file-pdf"
                />
              </button> -->
            </div>
          </div>
        </div>
        <div class="card-body">
          <b-form-row class="justify-content-center">
            <b-col cols="12" md="12">
              <div class="first">
                <span
                  ><font-awesome-icon icon="fa-solid fa-angle-left" />{{
                    trans('restriction number')
                  }}
                </span>
                <span>|</span>
                <span>{{ daen.id }}</span>
              </div>
            </b-col>
            <b-col cols="12" md="12">
              <div class="first">
                <span
                  ><font-awesome-icon icon="fa-solid fa-angle-left" />{{
                    trans('note')
                  }}
                </span>
                <span>|</span>
                <span>{{ daen.description }}</span>
              </div>
            </b-col>
            <b-col cols="12" md="12">
              <div class="first">
                <span
                  ><font-awesome-icon icon="fa-solid fa-angle-left" />{{
                    trans('created_at')
                  }}
                </span>
                <span>|</span>
                <span>{{ daen.date }}</span>
              </div>
            </b-col>

            <b-col cols="12" md="12">
              <div class="first">
                <span
                  ><font-awesome-icon icon="fa-solid fa-angle-left" />{{
                    trans('created_by')
                  }}
                </span>
                <span>|</span>
                <span>{{ created_by.name }}</span>
              </div>
            </b-col>
          </b-form-row>
          <div class="col-sm-12">
            <b-table-simple
              id="pdfTabel"
              class="table-container"
              sticky-header
              striped
              bordered
              responsive
              style="min-height: 50px; margin-top: 30px"
            >
              <b-thead>
                <b-tr class="rounded" variant="dark">
                  <b-th>{{ trans('account_number') }}</b-th>
                  <b-th>{{ trans('account_name') }}</b-th>
                  <b-th>{{ trans('debit') }}</b-th>
                  <b-th>{{ trans('credit') }}</b-th>
                  <b-th>{{ trans('note') }}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody v-if="true">
                <b-tr v-for="(maddenSingle, index) in madeen" :key="index">
                  <b-td>{{ maddenSingle.account }}</b-td>
                  <b-td>{{ maddenSingle.account_name }}</b-td>
                  <b-td
                    >{{ Number(maddenSingle.debit).toNegativeFormat() }}
                    {{ getSetting('currency', settings) }}</b-td
                  >
                  <b-td
                    >{{ Number(maddenSingle.credit).toNegativeFormat() }}
                    {{ getSetting('currency', settings) }}</b-td
                  >
                  <b-td>{{ maddenSingle.note }}</b-td>
                </b-tr>
              </b-tbody>
              <b-tfoot>
                <b-tr style="background: red !important">
                  <b-td
                    style="
                      background-color: #f6f6f6 !important;
                      font-size: 18px;
                      font-weight: bold;
                    "
                    >{{ trans('total') }}</b-td
                  >
                  <b-td></b-td>
                  <b-td
                    style="
                      background-color: #f6f6f6 !important;
                      font-size: 18px;
                      font-weight: bold;
                    "
                    >{{ Number(totalMadeen).toNegativeFormat() }}
                    {{ getSetting('currency', settings) }}</b-td
                  >
                  <b-td
                    style="
                      background-color: #f6f6f6 !important;
                      font-size: 18px;
                      font-weight: bold;
                    "
                    >{{ Number(totalDaeen).toNegativeFormat() }}
                    {{ getSetting('currency', settings) }}</b-td
                  >
                  <b-td
                    style="
                      background-color: #f6f6f6 !important;
                      font-size: 18px;
                      font-weight: bold;
                    "
                  ></b-td>
                </b-tr>
              </b-tfoot>
            </b-table-simple>
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
import jsPDF from 'jspdf'
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'

Vue.use(VuejsDialog)
export default {
  name: 'openingBalance',
  components: { SkeletonLoader },
  props: ['permissions', 'section', 'user', 'langs', 'settings'],
  data() {
    return {
      created_by: {},
      loaded: false,
      totalMadeen: 0,
      totalDaeen: 0,
      daen: {
        date: '',
        description: '',
        account_balance: '',
        id: 0,
      },
      madeen: [],

      accounts: [],
      strings: [],
      restrictionData: {
        data: [
          {
            account: '',
            debit: '',
            credit: '',
            note: '',
          },
        ],
        note: '',
        is_equal: true,
      },
      total_debit: 0,
      total_credit: 0,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.getData()
  },
  computed: {},
  methods: {
    back() {
      this.$router.push('/accounting-restrictions')
    },
    downloadPDF() {
      var doc = new jsPDF('p', 'pt', 'a4')

      doc.html(document.querySelector('#pdfTabel'), {
        callback: function (doc) {
          doc.save()
        },
      })
    },
    exportData(id, type) {
      let url = '/api/account/restrictions/export/' + type + '/' + id
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
          link.href = url
          link.setAttribute('download', `account.${type}`)
          document.body.appendChild(link)
          link.click()
        })
        .catch(error => {})
    },
    getData() {
      axios
        .get(`api/account/restrictions/${this.$route.params.id}`)
        .then(res => {
          this.loaded = true
          this.created_by = res.data.body.restriction.created_by

          let items = res.data.body.restriction.items
          if (items.length > 0) {
            items.forEach(item => {
              this.madeen.push({
                account: item.account,
                debit: item.debit,
                credit: item.credit,
                id: item.id ?? null,
                account_name: item.account_name,
                note: item.note,
              })
              // if (item.credit){
              //     this.daen.account_balance = item.account
              //     this.daen.id = item.id
              // }
            })
          }
          this.totalMadeen = _.sumBy(this.madeen, 'debit')
          this.totalDaeen = _.sumBy(this.madeen, 'credit')
          this.strings = res.data.strings
          this.daen.date = res.data.body.restriction.date
          this.daen.description = res.data.body.restriction.note

          this.daen.id = res.data.body.restriction.id
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
  },
}
</script>
<style scoped>
.first {
  font-size: 20px;
  padding: 20px 10px 20px 10px;
  border-bottom: 2px solid #f6f6f6;
  margin-bottom: 10px;
}
.first span svg,
.first span {
  margin-left: 14px;
}
.first span:first-child {
  font-weight: bold;
}
.first span:nth-child(2) {
  color: #e5e5e5;
  font-weight: bold;
}
td:nth-of-type(2n + 1) {
  background-color: #fff !important;
}
td:nth-of-type(2n) {
  background-color: #f6f6f6 !important;
}

.styleAddNewRow {
  background: transparent linear-gradient(180deg, #137b97 0%, #5dc5e0 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 1px 8px #0000000d;
  border-radius: 27px !important;
  border: none;
  width: 170px;
  height: 45px;
  margin-right: 10px;
  color: #ffffff;
  font-weight: bold !important;
  font-size: 17px !important;
}

.styleContinue {
  width: 170px;
  height: 45px;
  margin-right: 10px;
  box-shadow: 0px 1px 8px #0000000d;
  border: 1px solid #137b97;
  border-radius: 27px !important;
  opacity: 1;
  color: #137b97 !important;
  font-weight: bold !important;
  font-size: 17px !important;
}
.card .card-header.header-sm {
  padding: 18px 25px !important;
  margin: 0;
}
</style>
