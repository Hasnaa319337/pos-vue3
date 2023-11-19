<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">اضافة قيد حسابي</h4>
          <div class="dropdown">
            <b-button @click="$router.go(-1)" class="btn btn-warning"
              ><font-awesome-icon icon="fa-solid fa-reply-all " />
            </b-button>
          </div>
        </div>
        <div class="card-body">
          <div class="card-body">
            <div class="col-sm-12 text-center" v-if="message.length">
              <div
                class="alert"
                :class="'alert-' + alertType"
                v-html="message"
              ></div>
            </div>
            <div class="col-sm-12">
              <div class="mb-2 mt-2">
                <label>{{ trans('public_notes') }}</label>
                <b-input
                  style="width: 300px"
                  type="text"
                  class="form-control mb-2"
                  v-model="restrictionData.note"
                ></b-input>
              </div>
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
                    <b-th>{{ trans('from_account') }}</b-th>
                    <b-th>{{ trans('debit') }}</b-th>
                    <b-th>{{ trans('to_account') }}</b-th>
                    <b-th>{{ trans('credit') }}</b-th>
                    <b-th>{{ trans('note') }}</b-th>
                    <b-th></b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-if="true">
                  <b-tr
                    v-for="(item, index) in restrictionData.data"
                    :key="index"
                  >
                    <b-td>
                      <b-form-select v-model="item.debit_account">
                        <b-form-select-option
                          :value="account.account"
                          v-for="(account, index) in accounts"
                          :key="index"
                        >
                          {{ account.title }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-td>

                    <b-td>
                      <b-form-input
                        style="
                          border-radius: 20px !important;
                          height: 36px !important;
                        "
                        v-model="item.amount"
                        type="number"
                        @keyup="updateDebit(item.amount)"
                        @change="updateDebit(item.amount)"
                      >
                      </b-form-input>
                    </b-td>

                    <b-td>
                      <b-form-select v-model="item.credit_account">
                        <b-form-select-option
                          :value="account.account"
                          v-for="(account, index) in accounts"
                          :key="index"
                        >
                          {{ account.title }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-td>
                    <b-td>
                      <b-form-input
                        style="
                          border-radius: 20px !important;
                          height: 36px !important;
                        "
                        v-model="item.amount"
                        type="number"
                        @keyup="updateDebit(item.amount)"
                        @change="updateDebit(item.amount)"
                      >
                      </b-form-input>
                    </b-td>
                    <b-td>
                      <b-form-input
                        style="
                          border-radius: 20px !important;
                          height: 36px !important;
                        "
                        v-model="item.note"
                      ></b-form-input>
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
                      />
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
              <div
                class="mb-3"
                style="
                  display: flex;
                  justify-content: space-around;
                  background: #f6f6f6;
                "
              >
                <div style="display: flex; width: 300px; align-items: center">
                  <h5>{{ trans('debit_total') }}</h5>
                  <span style="width: 150px"
                    >{{ total_debit }}
                    {{
                      user.language == 'en'
                        ? settings.currency_en
                        : settings.currency_ar
                    }}</span
                  >
                </div>
                <div style="display: flex; width: 300px; align-items: center">
                  <h5>{{ trans('credit_total') }}</h5>
                  <span style="width: 150px"
                    >{{ total_credit }}
                    {{
                      user.language == 'en'
                        ? settings.currency_en
                        : settings.currency_ar
                    }}</span
                  >
                </div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <button
                  :disabled="total_debit == 0 || total_credit != total_debit"
                  class="btn styleContinue"
                  @click="store()"
                >
                  {{ trans('continue')
                  }}<font-awesome-icon
                    style="margin-right: 25px"
                    icon="fa-solid fa-arrow-left"
                  />
                </button>
                <button
                  class="btn btn-primary styleAddNewRow"
                  @click="addNewRow()"
                >
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
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.use(VuejsDialog)
export default {
  name: 'Bonds',
  props: ['permissions', 'section', 'user', 'langs', 'settings'],
  data() {
    return {
      message: '',
      alertType: 'success',
      accounts: [],
      strings: [],
      restrictionData: {
        data: [
          {
            debit_account: '',
            amount: '',
            credit_account: '',
            note: '',
          },
        ],
        note: '',
      },
      total_debit: 0,
      total_credit: 0,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  computed: {},
  methods: {
    addNewRow: function () {
      let item = {
        debit_account: '',
        amount: '',
        credit_account: '',
        note: '',
      }
      this.restrictionData.data.push(item)
    },
    deleteRow(index) {
      if (this.restrictionData.data.length == 1) {
        this.message = 'يجب أن يوجد علي الأقل قيد حسابي واحد'
        this.alertType = 'danger'
        setTimeout(() => {
          this.message = ''
          this.alertType = 'success'
        }, 3000)
        return false
      }
      if (index !== -1) {
        this.restrictionData.data.splice(index, 1)
      }
    },
    refresh() {
      let url = '/api/account/restrictions/create'
      axios
        .get(url)
        .then(res => {
          this.strings = res.data.strings
          this.accounts = res.data.body.accounts
          // this.data = res.data.data;
          // switch (this.$route.query.type) {
          //     case "purchases":
          //         this.vtr.inventory = this.data.purchase.inventory_id;
          //         this.vtr.for = this.data.purchase.provider_id;
          //         this.vtr.paid = this.data.purchase.paid;
          //         this.vtr.amount = this.data.purchase.total;
          //         this.vtr.remaining = parseFloat(this.vtr.amount ).toFixed(2) - parseFloat(this.vtr.paid).toFixed(2);
          //         break;
          //     case "taxes":
          //         if (this.$route.query.filter) {
          //             this.taxes = JSON.parse(this.$route.query.filter);
          //             for (var key in this.taxes) {
          //                 if (this.taxes[key] == '' || this.taxes[key] == 'undefined') {
          //                     this.taxes = this.taxes.filter(x => {
          //                         return x != this.taxes[key];
          //                     })
          //                 }
          //             }
          //             this.vtr.amount = this.$route.query.amount;
          //         }
          //         break;
          // }
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
    updateDebit(debit) {
      if (this.restrictionData.data) {
        this.total_debit = 0
        this.total_credit = 0
        let data = this.restrictionData.data
        data.map(item => {
          if (!item.amount) {
            item.amount = 0
          }
          this.total_debit = this.total_debit + parseFloat(item.amount)
          this.total_credit = this.total_credit + parseFloat(item.amount)
        })
      }
    },
    store() {
      this.message = '<i class="fa fa-spinner fa-spin"></i>'
      this.alertType = 'info'
      let url = '/api/account/restrictions'
      let data = {}
      data = this.restrictionData
      axios
        .post(url, data)
        .then(res => {
          if (res.data.status) {
            this.message = res.data.message
            this.alertType = 'success'
            this.restrictionData = {
              data: [
                {
                  debit_account: '',
                  amount: '',
                  credit_account: '',
                  note: '',
                },
              ],
              note: '',
            }
            this.total_credit = 0
            this.total_debit = 0
            setTimeout(() => {
              this.message = ''
              this.alertType = 'success'
            }, 5000)
          } else {
            this.message = res.data.message
            this.alertType = 'danger'
          }
          this.$router.go(-1)
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
  },
}
</script>
<style>
table tr.text-white,
.text-white,
.text-white td,
table .text-white td {
  color: white !important;
}

.validation-error {
  border: 1px solid red;
  border-radius: 5px;
}

.text-danger {
  color: red;
}

.styleAddNewRow {
  background: transparent linear-gradient(180deg, #137b97 0%, #5dc5e0 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 1px 8px #0000000d;
  border-radius: 27px !important;
  width: 199px;
  height: 54px;
  color: #ffffff;
  font-weight: bold !important;
  font-size: 17px !important;
  border: none !important;
}

.styleContinue {
  width: 199px;
  height: 54px;
  box-shadow: 0px 1px 8px #0000000d;
  border: 2px solid #379fbb !important;
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
table tbody tr td input {
  margin-top: 10px !important;
  margin-bottom: 10px !important;
}
</style>
