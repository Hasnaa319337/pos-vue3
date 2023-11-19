<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title" v-text="trans('AddPaymentVouchers')"></h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body vouchers">
          <div class="row align-items-center justify-content-between mb-4">
            <div class="col-sm-12 text-center mt-3">
              <ValidationObserver v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(store)">
                  <b-form-row>
                    <div
                      class="col-lg col-12"
                      v-if="$route.query.type == 'purchases'"
                    >
                      <h5>
                        {{ trans('payment_for_purchase_invoice') }}
                        <router-link
                          v-if="data.purchase"
                          :to="'/purchases/edit/' + data.purchase.id"
                        >
                          {{ data.purchase.id }}
                        </router-link>
                      </h5>
                      <h6 v-if="$route.query.type == 'purchases'">
                        <span v-if="data.purchase"
                          >{{ trans('with_for') }}:
                          {{ data.purchase.provider_name }} ({{
                            data.purchase.provider_phone
                          }})</span
                        >
                      </h6>
                    </div>
                    <div
                      class="col-lg col-12"
                      v-else-if="$route.query.type == 'taxes'"
                    >
                      <h5>
                        {{ trans('taxes_clearance_of') }}
                        <b v-if="taxes.tax_type == 'tax'"
                          >{{ trans('sale_taxes') }}
                        </b>
                        <b v-else-if="taxes.tax_type == 'product'"
                          >{{ trans('product_taxes') }}
                        </b>
                        <b v-else
                          >{{ trans('sale_taxes') }} &
                          {{ trans('product_taxes') }}
                        </b>
                        <b>{{ trans('for_the_period_between') }}</b>
                        <span
                          >{{ taxes.date_from }} {{ trans('and') }}
                          {{ taxes.date_to }}</span
                        >
                      </h5>
                    </div>
                    <div class="col-lg-4 col-12" v-else>
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        name="bayan"
                      >
                        <b-form-group :label="trans('statement')">
                          <b-form-input
                            type="text"
                            v-model="vtr.statement"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-lg-4 col-12" cols="12" md="4">
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        name="payment_method"
                      >
                        <b-form-group :label="trans('payment method')">
                          <b-form-select
                            @change="AllAccounts(vtr.payment_method)"
                            v-model="vtr.payment_method"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option value="bank"
                              >{{ trans('credit card') }}
                            </b-form-select-option>
                            <b-form-select-option value="cash"
                              >{{ trans('cash') }}
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-4">
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        name="payment_account"
                      >
                        <b-form-group :label="trans('account_number')">
                          <b-form-select
                            v-model="vtr.payment_account"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option
                              v-for="(accounty, index) in accountLinks"
                              :key="index"
                              :value="accounty.account"
                              >{{ accounty.full_title_from_parent }}
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                  </b-form-row>
                  <b-form-row>
                    <div class="col-lg col-sm-6 col-12">
                      <ValidationProvider
                        rules="required"
                        name="beneficiary"
                        v-slot="{ valid, errors }"
                      >
                        <b-form-group :label="trans('beneficiary_type')">
                          <b-form-select
                            v-model="vtr.beneficiary_type"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option value="provider">
                              {{ trans('provider') }}
                            </b-form-select-option>
                            <b-form-select-option value="customer">
                              {{ trans('customer') }}
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div
                      class="col-lg col-sm-6 col-12"
                      v-if="vtr.beneficiary_type == 'provider'"
                    >
                      <ValidationProvider rules="required" name="with_for">
                        <label>{{ trans('beneficiary') }}</label>
                        <v-select
                          :options="providers"
                          label="name"
                          v-model="vtr.beneficiary_id"
                          :reduce="option => option.id"
                          :dir="language === 'ar' ? 'rtl' : 'ltr'"
                        />
                      </ValidationProvider>
                    </div>
                    <div
                      class="col-lg col-sm-6 col-12"
                      v-if="vtr.beneficiary_type == 'customer'"
                    >
                      <ValidationProvider rules="required" name="with_for">
                        <label>{{ trans('beneficiary') }}</label>
                        <v-select
                          :options="customers"
                          label="name"
                          v-model="vtr.beneficiary_id"
                          :reduce="option => option.id"
                          :dir="language === 'ar' ? 'rtl' : 'ltr'"
                        />
                      </ValidationProvider>
                    </div>
                    <div class="col-lg col-sm-6 col-12">
                      <ValidationProvider
                        :rules="`${
                          $route.query.type == 'purchases'
                            ? 'required|max_value:' + vtr.remaining + '|decimal'
                            : 'required|decimal'
                        }`"
                        v-slot="{ valid, errors }"
                        name="amount"
                      >
                        <b-form-group :label="trans('with_amount')">
                          <b-form-input
                            v-model="vtr.amount"
                            type="number"
                            :state="errors[0] ? false : valid ? true : null"
                            :readonly="
                              $route.query.type == 'taxes' ? true : false
                            "
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>

                    <div class="col-3">
                      <ValidationProvider
                        name="date"
                        rules="required"
                        v-slot="{ valid, errors }"
                      >
                        <div class="row mx-0 mb-3">
                          <div class="col-12" style="padding: 10px 0">
                            {{ trans('date') }}
                          </div>

                          <b-form-input
                            class="col"
                            id="example-input"
                            v-model="vtr.date"
                            :state="errors[0] ? false : valid ? true : null"
                            type="date"
                            placeholder="YYYY-MM-DD"
                            autocomplete="off"
                          >
                            ></b-form-input
                          >
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </div>
                      </ValidationProvider>
                    </div>
                  </b-form-row>
                  <b-form-row class="justify-content-center">
                    <b-button variant="success" type="submit"
                      ><font-awesome-icon icon="fa-solid fa-check "
                    /></b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="card-body row text-center">
          <font-awesome-icon
            class="fa-spin-pulse"
            icon="fa-solid fa-spinner "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import axios from 'axios'

Vue.use(VuejsDialog)
export default {
  name: 'AddPaymentVouchers',
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'language'],
  data() {
    return {
      vtr: {
        payment_method: '',
        payment_account: '',
        type: 'withdraw',
        beneficiary_type: '',
      },
      strings: [],
      loaded: false,
      showReceipt: false,
      language: 'en',

      refund: {},
      has_refund: 0,
      data: {},
      taxes: {},
      inventories: [],
      customers: [],
      providers: [],
      date_input: '',
      time_input: '',
      accountLinks: [],
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  computed: {},
  methods: {
    AllAccounts(input = 'sales_invoice_account') {
      if (input == 'cash') {
        input = 'treasury'
      }
      axios
        .get('api/account/from/link?link_name=' + input)
        .then(res => {
          this.accountLinks = res.data.body.accounts
        })
        .catch(error => {
          console.log(error)
        })
    },
    setDate() {
      // + ' ' + this.time_input
      this.vtr.date = this.date_input + ' ' + this.time_input
    },
    refresh() {
      let url = '/api/vouchers/create'
      let str = ''
      for (var key in this.$route.query) {
        if (this.$route.query[key] == '') continue
        if (str != '') {
          str += '&'
        }
        str += key + '=' + this.$route.query[key]
      }
      url = str != '' ? url + '?' + str : url
      this.loaded = false
      axios
        .get(url)
        .then(res => {
          this.loaded = true
          this.customers = res.data.body.customers
          this.providers = res.data.body.providers
          this.inventories = res.data.body.treasuries
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    store() {
      let url = '/api/vouchers'
      let str = ''
      for (var key in this.$route.query) {
        if (this.$route.query[key] == '') continue
        if (str != '') {
          str += '&'
        }
        str += key + '=' + this.$route.query[key]
      }
      url = str != '' ? url + '?' + str : url
      axios
        .post(url, this.vtr)
        .then(res => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            setTimeout(() => {
              this.$router.push({
                path: `/payment-voucher/${res.data.body.voucher.id}`,
              })
              this.vtr = {}
            }, 2000)

            // this.$router.push('/vouchers')
          } else {
            this.showToastError(res.data.message, response.data.custom_code)
          }
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
.vouchers .vs__dropdown-menu {
  overflow-y: scroll !important;
  height: 255px !important;
  z-index: 1000 !important;
  position: absolute;
}
.vouchers .vs__dropdown-toggle {
  border-radius: 17px !important;
  height: 38px !important;
}
</style>
