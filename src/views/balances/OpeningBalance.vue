<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">{{ trans('add_opening_balances') }}</h4>
          <div class="dropdown">
            <b-button @click="$router.go(-1)" class="btn btn-warning">
              <font-awesome-icon icon="fa-solid fa-reply-all " />
            </b-button>
          </div>
        </div>
        <div class="card-body">
          <div class="col-sm-12 text-center" v-if="message.length">
            <div
              class="alert"
              :class="'alert-' + alertType"
              v-html="message"
            ></div>
          </div>
          <b-form-row class="justify-content-center">
            <b-col cols="12" md="4" class="date_div">
              <label>{{ trans('date') }}</label>
              <b-form-group>
                <b-form-input
                  class="form-control"
                  type="datetime-local"
                  v-model="daen.date"
                  :placeholder="trans('select_date')"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="4">
              <label>{{ trans('note') }}</label>
              <b-form-group>
                <b-input
                  type="text"
                  class="form-control"
                  v-model="daen.description"
                >
                </b-input>
              </b-form-group>
            </b-col>
            <div class="col-md-4 col-sm-12">
              <label>{{ trans('account_initial_balance_name') }}</label>
              <b-form-group>
                <b-form-select v-model="daen.account_balance">
                  <b-form-select-option
                    :value="account.account"
                    v-for="(account, index) in initial_balance_accounts"
                    :key="index"
                  >
                    {{ account.title }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>
            </div>
          </b-form-row>
          <div class="col-sm-12">
            <b-table-simple
              class="table-container"
              sticky-header
              striped
              bordered
              responsive
              style="min-height: 50px"
            >
              <b-thead>
                <b-tr class="rounded" variant="dark">
                  <b-th>{{ trans('account_name') }}</b-th>
                  <b-th>{{ trans('account_balance') }}</b-th>
                  <b-th></b-th>
                </b-tr>
              </b-thead>
              <b-tbody v-if="true">
                <b-tr v-for="(maddenSingle, index) in madeen" :key="index">
                  <b-td style="padding: 26px 10px 10px 10px !important">
                    <b-form-group>
                      <b-form-select
                        style="height: 50px !important"
                        v-model="maddenSingle.account"
                      >
                        <b-form-select-option
                          :value="account"
                          v-for="(account, index) in accounts"
                          :key="index"
                        >
                          {{ account.account }} - {{ account.title }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  </b-td>
                  <b-td style="padding: 26px 10px 10px 10px !important">
                    <b-form-group>
                      <b-input
                        style="
                          border: 1px solid #cccccc !important;
                          border-radius: 33px !important;
                          height: 50px !important;
                        "
                        type="number"
                        class="form-control"
                        v-model="maddenSingle.debit"
                      ></b-input>
                    </b-form-group>
                  </b-td>
                  <b-td
                    style="
                      color: #e22929;
                      cursor: pointer;
                      font-size: 20px !important;
                    "
                    ><font-awesome-icon
                      icon="fa-solid fa-trash"
                      @click="deleteRow(index)"
                  /></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>

          <div style="display: flex; justify-content: space-between">
            <button class="btn styleContinue" @click="store()">
              {{ trans('continue')
              }}<font-awesome-icon
                style="margin-right: 25px"
                icon="fa-solid fa-arrow-left"
              />
            </button>
            <button class="btn btn-primary styleAddNewRow" @click="addNewRow()">
              {{ trans('add_more') }}
              <font-awesome-icon
                style="margin-right: 25px"
                icon="fa-solid fa-plus"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import Datepicker from 'vuejs-datepicker'

Vue.use(VuejsDialog)
export default {
  name: 'openingBalance',
  props: ['permissions', 'section', 'user', 'langs', 'settings'],
  components: {
    Datepicker,
  },
  data() {
    return {
      daen: {
        date: null,
        description: '',
        account_balance: '',
      },
      madeen: [{ account: null, debit: 0, note: '' }],
      message: '',
      alertType: 'success',
      accounts: [],
      strings: [],
      restrictionData: {
        data: [
          {
            account: '',
            debit: 0,
            credit: '',
            note: '',
          },
        ],
        note: '',
        is_equal: true,
      },
      total_debit: 0,
      total_credit: 0,

      initial_balance_accounts: [],
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  computed: {},
  methods: {
    addNewRow: function () {
      this.madeen.push({ account: null, debit: 0, note: '' })
    },
    deleteRow(index) {
      if (this.madeen.length == 1) {
        this.message = 'يجب أن يوجد علي الأقل رصيد إفتتاحي واحد'
        this.alertType = 'danger'
        setTimeout(() => {
          this.message = ''
          this.alertType = 'success'
        }, 3000)
        return false
      }
      if (index !== -1) {
        this.madeen.splice(index, 1)
      }
    },
    refresh() {
      let url = '/api/account/initial-balance/create'
      axios
        .get(url)
        .then(res => {
          this.strings = res.data.strings
          this.accounts = res.data.body.accounts
          this.initial_balance_accounts = res.data.body.initial_balance_accounts
          this.loaded = true
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
    store() {
      this.message = '<i class="fa fa-spinner fa-spin"></i>'
      this.alertType = 'info'
      let url = '/api/account/initial-balance'
      let data = {}
      let total = 0
      this.madeen.map(item => {
        total = total + parseFloat(item.debit)
      })
      if (this.madeen.length > 0) {
        this.madeen.map(item => {
          item.note = this.daen.description
          // _.findIndex(this.initial_balance_accounts, (o) => { return o.account == item.account }) > -1 ?
          //     item.type = 'credit' : item.type = 'debit'
        })
      }
      data['data'] = this.madeen
      data['main_account'] = {
        date: this.daen.date,
        note: this.daen.description,
        credit: total,
        account: this.daen.account_balance,
      }
      axios
        .post(url, data)
        .then(res => {
          if (res.data.status) {
            this.message = res.data.message
            this.alertType = 'success'
            this.restrictionData = {
              data: [
                {
                  account: '',
                  debit: '',
                  credit: '',
                  note: '',
                },
              ],
              note: '',
              is_equal: false,
            }
            setTimeout(() => {
              this.message = ''
              this.alertType = 'success'
            }, 5000)
            this.$router.push({
              name: 'accounting_initial_balance',
              params: {
                id: res.data.body.initial_balance.initial_balance_code,
              },
            })
          } else {
            this.message = res.data.message
            this.alertType = 'danger'
          }
        })
        .catch(error => {
          console.log(error)
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
  },
}
</script>
<style scoped>
.styleAddNewRow {
  background: transparent linear-gradient(180deg, #137b97 0%, #5dc5e0 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 1px 8px #0000000d;
  border-radius: 27px !important;
  border: none;
  width: 199px;
  height: 54px;
  color: #ffffff;
  font-weight: bold !important;
  font-size: 17px !important;
}

.styleContinue {
  width: 199px;
  height: 54px;
  box-shadow: 0px 1px 8px #0000000d;
  border: 1px solid #137b97;
  border-radius: 27px !important;
  opacity: 1;
  color: #137b97 !important;
  font-weight: bold !important;
  font-size: 17px !important;
}

table tbody tr td {
  background: #fff !important;
  border: 1px solid #d9d6d6 !important;
  padding: 26px 10px 10px 10px !important;
}
.datebicker input {
  width: 100%;
  /* border: none; */
  background: transparent;
}
.vdp-datepicker {
  text-align: start !important;
  /* border:none; */
}
</style>
