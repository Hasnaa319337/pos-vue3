<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">تعديل القيد المحاسبي</h4>
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
            <b-col cols="12" md="4">
              <label>{{ trans('date') }}</label>
              <b-form-group>
                <b-form-input
                  class="form-control"
                  type="datetime-local"
                  v-model="daen.date"
                  :placeholder="trans('select_date')"
                ></b-form-input>
              </b-form-group>
              <!--                            <el-date-picker type="datetime" placeholder="Select date and time" v-model="daen.date"></el-date-picker>-->
            </b-col>
            <b-col cols="12" md="4">
              <label>{{ trans('description') }}</label>
              <b-form-group>
                <b-input
                  type="text"
                  class="form-control"
                  v-model="daen.description"
                >
                </b-input>
              </b-form-group>
            </b-col>
            <!--                        <div class="col-md-4 col-sm-12">-->
            <!--                            <label>{{strings['account_balance']}}</label>-->
            <!--                            <b-form-group>-->
            <!--                                <b-form-select v-model="daen.account_balance">-->
            <!--                                    <b-form-select-option :value="account.account" v-for="(account,index) in accounts" :key="index">-->
            <!--                                        {{account.title }}-->
            <!--                                    </b-form-select-option>-->
            <!--                                </b-form-select>-->
            <!--                            </b-form-group>-->
            <!--                        </div>-->
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
                  <b-th>{{ trans('debit') }}</b-th>
                  <b-th>{{ trans('credit') }}</b-th>
                  <b-th>{{ trans('note') }}</b-th>
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
                          :value="account.account"
                          v-for="(account, index) in accounts"
                          :key="index"
                        >
                          {{ account.title }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  </b-td>
                  <b-td style="padding: 26px 10px 10px 10px !important">
                    <b-form-group>
                      <b-input
                        @change="callBalance()"
                        @keyup="callBalance()"
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
                  <b-td style="padding: 26px 10px 10px 10px !important">
                    <b-form-group>
                      <b-input
                        @change="callBalance()"
                        @keyup="callBalance()"
                        style="
                          border: 1px solid #cccccc !important;
                          border-radius: 33px !important;
                          height: 50px !important;
                        "
                        type="number"
                        class="form-control"
                        v-model="maddenSingle.credit"
                      ></b-input>
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
                        type="text"
                        class="form-control"
                        v-model="maddenSingle.note"
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
                <b-tr>
                  <b-td
                    style="
                      padding: 26px 10px 10px 10px !important;
                      font-weight: bold;
                    "
                  >
                    {{ trans('total') }}
                  </b-td>
                  <b-td
                    style="
                      padding: 26px 10px 10px 10px !important;
                      font-weight: bold;
                    "
                    >{{ Number(debitTotal).toNegativeFormat() }}
                    {{ getSetting('currency', settings) }}</b-td
                  >
                  <b-td
                    style="
                      padding: 26px 10px 10px 10px !important;
                      font-weight: bold;
                    "
                    >{{ Number(creditTotal).toNegativeFormat() }}
                    {{ getSetting('currency', settings) }}</b-td
                  >
                  <b-td style="padding: 26px 10px 10px 10px !important"></b-td>
                  <b-td style="padding: 26px 10px 10px 10px !important"></b-td>
                </b-tr>
                <b-tr v-if="requiredBalancedValue > 0">
                  <b-td
                    class="text-danger"
                    style="
                      padding: 26px 10px 10px 10px !important;
                      font-weight: bold;
                      background: red !important;
                      color: #fff !important;
                    "
                  >
                    {{ trans('must_be_balanced') }}
                  </b-td>
                  <b-td
                    style="
                      padding: 26px 10px 10px 10px !important;
                      font-weight: bold;
                      background: red !important;
                      color: #fff !important;
                    "
                    >{{ debitMoreBlanace ? requiredBalancedValue : '--' }}</b-td
                  >
                  <b-td
                    style="
                      padding: 26px 10px 10px 10px !important;
                      font-weight: bold;
                      color: #fff !important;
                      background-color: red !important;
                    "
                    >{{
                      creditMoreBlanace ? requiredBalancedValue : '--'
                    }}</b-td
                  >
                  <b-td
                    colspan="2"
                    style="
                      padding: 26px 10px 10px 10px !important;
                      font-weight: bold;
                      color: #fff !important;
                      background-color: red !important;
                    "
                  ></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>

          <div style="display: flex; justify-content: space-between">
            <button
              :disabled="requiredBalancedValue > 0"
              class="btn styleContinue"
              @click="update()"
            >
              متابعة<font-awesome-icon
                style="margin-right: 25px"
                icon="fa-solid fa-arrow-left"
              />
            </button>
            <button class="btn btn-primary styleAddNewRow" @click="addNewRow()">
              إضافة المزيد
              <font-awesome-icon
                style="margin-right: 25px"
                icon="fa-solid fa-plus"
              />
            </button>
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
import Datepicker from 'vuejs-datepicker'
import SkeletonLoader from '../../components/global/SkeletonLoader.vue'

Vue.use(VuejsDialog)
export default {
  name: 'openingBalance',
  components: {
    Datepicker,
    SkeletonLoader,
  },
  props: ['permissions', 'section', 'user', 'langs', 'settings'],
  data() {
    return {
      loaded: false,
      creditTotal: 0,
      debitTotal: 0,
      requiredBalancedValue: 0,
      daen: {
        date: '',
        description: '',
        account_balance: '',
        id: '',
      },
      madeen: [],
      message: '',
      alertType: 'sucess',
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

      items: [],
      note_all: '',
      is_equal: 1,
      creditMoreBlanace: false,
      debitMoreBlanace: false,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    this.getData()
  },
  computed: {},
  methods: {
    callBalance() {
      if (this.madeen.length > 0) {
        this.creditTotal = 0
        this.debitTotal = 0
        this.madeen.map(item => {
          if (item.credit) {
            this.creditTotal += parseFloat(item.credit)
          }
          if (item.debit) {
            this.debitTotal += parseFloat(item.debit)
          }
        })
        let max = Math.max(this.debitTotal, this.creditTotal)
        let min = Math.min(this.debitTotal, this.creditTotal)
        this.debitMoreBlanace = false
        this.creditMoreBlanace = false
        if (this.debitTotal == min) {
          this.debitMoreBlanace = true
          this.creditMoreBlanace = false
        } else {
          this.debitMoreBlanace = false
          this.creditMoreBlanace = true
        }
        this.requiredBalancedValue = max - min
      }
    },
    addNewRow: function () {
      this.madeen.push({ account: null, debit: 0, credit: 0, note: '' })
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
      let url = '/api/account-tree-mobile'
      axios
        .get(url)
        .then(res => {
          this.strings = res.data.strings
          this.accounts = res.data.body.tree

          console.log(this.madeen)
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    getData() {
      axios
        .get(`api/account/restrictions/${this.$route.params.id}`)
        .then(res => {
          this.loaded = true
          this.madeen = res.data.body.restriction.items
          if (this.madeen.length > 0) {
            this.madeen.map(item => {
              this.creditTotal += parseFloat(item.credit)
              this.debitTotal += parseFloat(item.debit)
            })
          }
          this.daen.date = res.data.body.restriction.date
          this.daen.description = res.data.body.restriction.note
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    update() {
      let data = {}
      data['data'] = this.madeen
      data['note'] = this.daen.description
      data['date'] = this.daen.date
      axios
        .put(`api/account/restrictions/${this.$route.params.id}`, data)
        .then(response => {
          this.showToastError(response.data.message, response.data.custom_code)

          setTimeout(() => {
            this.$router.go(-1)
          }, 3000)
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
  border: none;
  background: transparent;
}
</style>
