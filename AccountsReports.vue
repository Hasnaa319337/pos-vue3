<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card accounts_reports">
      <div class="card" v-if="loaded">
        <div
          class="card-header header-sm justify-content-between align-items-center"
          style="margin-bottom: 30px"
        >
          <b-row class="justify-content-between align-items-center">
            <b-col cols="auto">
              <h4 class="card-title" v-if="language">
                {{ trans('accounts_reports') }}
              </h4>
            </b-col>
            <div class="dropdown">
              <go-back-button />
            </div>
          </b-row>
        </div>
        <div
          style="
            background: #f6f6f6;
            border-radius: 8px;
            padding: 5px 13px;
            min-height: 80vh;
          "
        >
          <div class="row mx-0 justify-content-between align-items-center mb-4">
            <div class="col-sm-12">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form
                  @submit.prevent="handleSubmit(filterResults)"
                  @reset.prevent="reset"
                >
                  <b-form-row>
                    <b-col cols="12">
                      <b-row class="align-items-center">
                        <div class="col-md col-12 px-1">
                          <ValidationProvider
                            name="account_link"
                            rules="required"
                            v-slot="{ valid, errors }"
                          >
                            <b-form-group>
                              <div class="row m-0 align-items-center">
                                <label
                                  class="col-auto p-0"
                                  for=""
                                  style="font-size: 16px; color: #000"
                                  >{{ trans('accounts_links') }}
                                </label>
                                <b-form-select
                                  style="
                                    font-size: 16px;
                                    color: #000;
                                    font-weight: 600;
                                    border: 0 !important;
                                    outline: 0 !important;
                                  "
                                  class="col p-0"
                                  v-model="filter.account_link"
                                  :state="
                                    errors[0] ? false : valid ? true : null
                                  "
                                  @change="setDefaultType"
                                >
                                  <b-form-select-option
                                    v-for="(link, index) in links"
                                    :key="index"
                                    :value="link.slug"
                                  >
                                    {{ link.title }}
                                  </b-form-select-option>
                                </b-form-select>
                              </div>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ errors[0] }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                        <div class="col-md col-12 px-1">
                          <ValidationProvider
                            name="account_in_link"
                            rules="required"
                            v-slot="{ valid, errors }"
                          >
                            <b-form-group>
                              <div class="row m-0 align-items-center">
                                <label
                                  for=""
                                  class="col-auto p-0"
                                  style="font-size: 16px; color: #000"
                                >
                                  {{ trans('account') }}
                                </label>
                                <b-form-select
                                  style="
                                    font-size: 16px;
                                    color: #000;
                                    font-weight: 600;
                                  "
                                  class="col p-0"
                                  v-model="filter.account_in_link"
                                  :state="
                                    errors[0] ? false : valid ? true : null
                                  "
                                >
                                  <!--                                    @change="grapAccount(filter.account_in_link)"-->

                                  <b-form-select-option
                                    v-for="(link, index) in accounts"
                                    :key="index"
                                    :value="link.account"
                                  >
                                    {{ link.full_title_from_parent }}
                                  </b-form-select-option>
                                </b-form-select>
                              </div>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ errors[0] }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>

                        <div class="col-md col-12 px-1">
                          <VueDatePicker
                            style="background: #fff"
                            v-model="date"
                            :placeholder="trans('select_date')"
                            :button-validate="trans('save')"
                            :button-cancel="trans('cancel')"
                            range
                            :range-header-text="`${trans('from')} %d ${trans(
                              'to'
                            )} %d`"
                            :range-input-text="`${trans('from')} %d ${trans(
                              'to'
                            )} %d`"
                            fullscreen-mobile
                            validate
                            rtl
                            @onClose="
                              showConsoleMessage('-- datepicker closed --')
                            "
                          />
                        </div>

                        <div class="col-12 text-center px-1">
                          <b-button
                            style="font-size: 11px"
                            variant="success"
                            type="submit"
                            class="mr-2"
                          >
                            {{ trans('detailed report') }}
                          </b-button>

                          <b-button
                            style="font-size: 11px"
                            variant="success"
                            @click="filterResults('short')"
                            class="mr-2"
                          >
                            <font-awesome-icon icon="fa-solid fa-filter " />
                            {{ trans('short report') }}
                          </b-button>
                          <b-button
                            style="font-size: 11px"
                            variant="warning"
                            type="reset"
                            class="mr-2"
                            @click="resetForm()"
                          >
                            <font-awesome-icon
                              icon="fa-solid fa-arrows-rotate "
                            />
                            {{ trans('reset search') }}
                          </b-button>
                        </div>
                      </b-row>
                    </b-col>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </div>
            <b-button
              v-if="getReport"
              class="float-left"
              variant="success"
              type="submit"
              @click="printReport"
              >{{ trans('print') }}
              <font-awesome-icon icon="fa-solid fa-print" />
            </b-button>
          </div>
          <div id="report" class="row mx-0" v-if="getReport">
            <h4 class="col-12 p-0">
              <span class="title">
                {{ trans('account_statement') }} :
                {{ selected_account.account }} -
                {{ selected_account.text }}
              </span>
            </h4>
            <b-table-simple
              sticky-header
              class="report-table"
              bordered
              responsive
              style="
                max-height: 400px;
                margin-bottom: 0;
                position: relative;
                width: 100%;
              "
            >
              <b-thead class="main-header">
                <b-tr class="rounded">
                  <b-th class="th_style" colspan="2">
                    {{ trans('balance') }}
                  </b-th>
                  <b-th class="th_style" colspan="2">
                    {{ trans('account_movement') }}
                  </b-th>
                  <b-th class="th_style" colspan="3">
                    {{ trans('previous_balance') }} :

                    {{
                      report.balance_previous_period.number.toNegativeFormat()
                    }}
                  </b-th>
                  <b-th class="th_style" colspan="2">
                    {{ trans('next_balance') }} :
                    {{ report.balance_next_period.number.toNegativeFormat() }}
                  </b-th>

                  <b-th
                    colspan="2"
                    :id="
                      report.balance_period.number.isNegative('negative_number')
                    "
                    >{{ trans('balance') }} :
                    {{ report.balance_period.number.toNegativeFormat() }}
                  </b-th>
                </b-tr>
                <b-tr class="rounded">
                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                  >
                    {{ trans('debit') }}
                  </b-th>
                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                  >
                    {{ trans('credit') }}
                  </b-th>
                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                  >
                    {{ trans('debit') }}
                  </b-th>
                  <b-th style="">{{ trans('credit') }} </b-th>
                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                    colspan="3"
                  >
                    {{ trans('Statement') }}
                  </b-th>
                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                    colspan="3"
                    >{{ trans('date') }}
                  </b-th>

                  <b-th
                    style="
                      background: #323eb6 !important;
                      color: #fff !important;
                      border: 1px solid #c8c8c8 !important;
                    "
                  >
                    {{ trans('document_number') }}
                  </b-th>
                </b-tr>
              </b-thead>
              <template>
                <b-tbody
                  v-for="(transaction, index) in report.transaction.data"
                  :key="index"
                >
                  <tr>
                    <td style="border: 1px solid #c8c8c8 !important">
                      {{ transaction.balance_debit }}
                    </td>
                    <td style="border: 1px solid #c8c8c8 !important">
                      {{ transaction.balance_credit }}
                    </td>
                    <td style="border: 1px solid #c8c8c8 !important">
                      {{ transaction.debit }}
                    </td>
                    <td style="border: 1px solid #c8c8c8 !important">
                      {{ transaction.credit }}
                    </td>
                    <td
                      style="border: 1px solid #c8c8c8 !important"
                      colspan="3"
                    >
                      {{ transaction.description }}
                    </td>
                    <td
                      style="border: 1px solid #c8c8c8 !important"
                      colspan="3"
                    >
                      {{ transaction.created_at }}
                    </td>
                    <td style="border: 1px solid #c8c8c8 !important">
                      <!-- :to="transaction.reference_type + '/' + transaction.reference_id" -->

                      <!-- رصيد افتتاحي -->
                      <router-link
                        :to="
                          '/accounting_initial_balance/edit/' +
                          transaction.reference_id
                        "
                        v-if="
                          transaction.reference_type ===
                          'accounting_initial_balances'
                        "
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- فاتوره مشتريات -->
                      <router-link
                        :to="'purchases/edit/' + transaction.reference_id"
                        v-else-if="transaction.reference_type === 'purchases'"
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- مرتجع مشتريات -->
                      <router-link
                        :to="'refund-purchase/view/' + transaction.reference_id"
                        v-else-if="
                          transaction.reference_type === 'purchase_refunds'
                        "
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- مرتجع مبيعات -->
                      <router-link
                        :to="'refund-sale/view/' + transaction.reference_id"
                        v-else-if="
                          transaction.reference_type === 'sale_refunds'
                        "
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- سند صرف  -->
                      <router-link
                        :to="'receipt-voucher/' + transaction.reference_id"
                        v-else-if="transaction.reference_type === 'vouchers'"
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- فاتوره مبيعات -->
                      <router-link
                        :to="'/sales/view/' + transaction.reference_id"
                        v-else-if="transaction.reference_type === 'sales'"
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- AccountingRestrictionItem  -->
                      <router-link
                        :to="
                          '/accounting_initial_balance/show/' +
                          transaction.reference_id
                        "
                        v-else-if="
                          transaction.reference_type ===
                          'accounting_initial_balance_items'
                        "
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <!-- accounting_restrictions  -->
                      <router-link
                        :to="
                          '/accounting-restrictions/edit/' +
                          transaction.reference_id
                        "
                        v-else-if="
                          transaction.reference_type ===
                          'accounting_restrictions'
                        "
                      >
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </router-link>

                      <span v-else>
                        {{ transaction.transaction_type }} {{ trans('number') }}
                        {{ transaction.reference_id }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="transaction.show_reference == 1 && short_version">
                    <td
                      style="border: 1px solid #c8c8c8 !important"
                      colspan="4"
                    ></td>
                    <td
                      style="
                        border: 1px solid #c8c8c8 !important;
                        padding: 0px 0px 20px !important;
                      "
                      colspan="5"
                    >
                      <table
                        v-if="transaction.reference.items.length !== 0"
                        style="
                          width: 100%;
                          min-height: auto;
                          border: 1px solid #c8c8c8;
                        "
                      >
                        <thead>
                          <tr>
                            <th class="th_style">
                              {{ trans('barcode') }}
                            </th>
                            <th class="th_style" colspan="2">
                              {{ trans('item') }}
                            </th>
                            <th class="th_style">
                              {{ trans('quantity') }}
                            </th>
                            <th class="th_style">
                              {{ trans('price') }}
                            </th>
                            <th class="th_style">{{ trans('Q_S_C') }}</th>
                            <th class="th_style">{{ trans('value') }}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in transaction.reference.items"
                            :key="item.id"
                            style="
                              text-align: center;
                              font-weight: 300 !important;
                            "
                          >
                            <td style="border: 1px solid #c8c8c8 !important">
                              {{ item.serial }}
                            </td>
                            <td
                              style="border: 1px solid #c8c8c8 !important"
                              colspan="2"
                            >
                              {{ item.title }}
                            </td>
                            <td style="border: 1px solid #c8c8c8 !important">
                              {{ item.quantity }}
                            </td>
                            <td
                              style="border: 1px solid #c8c8c8 !important"
                              v-if="item.price"
                            >
                              {{ item.price }}
                            </td>
                            <td
                              style="border: 1px solid #c8c8c8 !important"
                              v-if="item.cost"
                            >
                              {{ item.cost }}
                            </td>
                            <td style="border: 1px solid #c8c8c8 !important">
                              {{ item.tax_percentage }} %
                            </td>
                            <td style="border: 1px solid #c8c8c8 !important">
                              {{ item.subtotal }}
                            </td>
                          </tr>
                          <tr style="">
                            <td
                              style="
                                border: 1px solid #c8c8c8 !important;
                                font-weight: 500 !important;
                                text-align: right;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                              colspan="4"
                            >
                              {{ trans('total value') }}
                            </td>
                            <td
                              style="
                                border: 1px solid #c8c8c8 !important;
                                font-weight: 500 !important;
                                text-align: center;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                            >
                              {{ transaction.reference.subtotal }}
                            </td>
                          </tr>
                          <tr style="">
                            <td
                              style="
                                border: 1px solid #c8c8c8 !important;
                                font-weight: 500 !important;
                                text-align: right;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                              colspan="4"
                            >
                              {{ trans('adding_added_tax') }}
                            </td>
                            <td
                              style="
                                border: 1px solid #c8c8c8 !important;
                                font-weight: 500 !important;
                                text-align: center;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                            >
                              {{ transaction.reference.total_tax }}
                              {{ settings.currency_ar }}
                            </td>
                          </tr>
                          <tr style="">
                            <td
                              style="
                                border: 1px solid #c8c8c8 !important;
                                font-weight: 500 !important;
                                text-align: right;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                              colspan="4"
                            >
                              {{ trans('invoice total') }}
                            </td>
                            <td
                              style="
                                font-weight: 500 !important;
                                text-align: center;
                                border: none;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                            >
                              {{ transaction.reference.total }}
                              {{ getSetting('currency', settings) }}
                            </td>
                          </tr>
                          <tr style="">
                            <td
                              style="
                                border: 1px solid #c8c8c8 !important;
                                font-weight: 500 !important;
                                text-align: right;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                              colspan="4"
                            >
                              {{ trans('paid_amount') }}
                            </td>
                            <td
                              style="
                                border: 1px solid #c8c8c8 !important;
                                font-weight: 500 !important;
                                text-align: center;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                            >
                              {{ transaction.reference.paid_amount }}
                              {{ settings.currency_ar }}
                            </td>
                          </tr>
                          <tr style="">
                            <td
                              style="
                                border: 1px solid #c8c8c8 !important;
                                font-weight: 500 !important;
                                text-align: right;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                              colspan="4"
                            >
                              {{ trans('remain_amount') }}
                            </td>
                            <td
                              style="
                                border: 1px solid #c8c8c8 !important;
                                font-weight: 500 !important;
                                text-align: center;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                            >
                              {{ transaction.reference.remaining_amount }}
                              {{ settings.currency_ar }}
                            </td>
                          </tr>
                          <tr style="">
                            <td
                              style="
                                border: 1px solid #c8c8c8 !important;
                                font-weight: 500 !important;
                                text-align: right;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                              colspan="4"
                            >
                              {{ trans('date') }}
                            </td>
                            <td
                              style="
                                border: 1px solid #c8c8c8 !important;
                                font-weight: 500 !important;
                                text-align: center;
                                font-family: 'BahijTheSansArabic-Plain' !important;
                              "
                            >
                              {{ transaction.created_at }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </b-tbody>
              </template>
              <tr>
                <td colspan="9" style="text-align: center">
                  {{ trans('current_balance') }}:
                  {{ report.balance_period.string }}
                </td>
              </tr>
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
                    ><font-awesome-icon icon="fa-solid fa-angles-left"
                  /></a>
                </li>
                <li class="page-item" v-if="prev_page_url">
                  <a
                    class="page-link"
                    @click.prevent="goTo(prev_page_url)"
                    href="#"
                    tabindex="-1"
                    ><font-awesome-icon icon="fa-solid fa-angle-left "
                  /></a>
                </li>
                <li class="page-item active disabled">
                  <a class="page-link" @click.prevent="javascript" href="#">{{
                    current_page
                  }}</a>
                </li>
                <li class="page-item" v-if="next_page_url">
                  <a
                    class="page-link"
                    @click.prevent="goTo(next_page_url)"
                    href="#"
                    ><font-awesome-icon icon="fa-solid fa-angle-right"
                  /></a>
                </li>
                <li class="page-item" v-if="next_page_url">
                  <a
                    class="page-link"
                    @click.prevent="goTo(last_page_url)"
                    href="#"
                    ><font-awesome-icon icon="fa-solid fa-angles-right"
                  /></a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div v-else class="card-body text-center">
        <skeleton-loader />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import JsonExcel from 'vue-json-excel'
import Multiselect from 'vue-multiselect'
import Customer from './modals/Customer.vue'
import axios from 'axios'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'
Vue.component('downloadExcel', JsonExcel)

Vue.use(VuejsDialog)
export default {
  components: {
    Multiselect,
    Customer,
    SkeletonLoader,
  },
  name: 'AppAccountsReports',
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'language'],
  data() {
    return {
      message: '',
      alertType: 'success',
      getReport: false,
      // strings: [],
      filter: {
        per_page: 30,
        account_in_link: '',
        account_link: '',
      },
      accounts: [],
      links: [],
      users: [],
      date: {},
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,
      loaded: false,
      report: {},
      transctions: [],
      short_version: true,
      selected_account: {},
      cssText: `
                            @media print {
                                 @page {
        margin:5px;
    }
* {
            direction: rtl;
                                    overflow: visible !important;
                                    margin: 0;
                                    padding: 0;
                                    -webkit-box-sizing: border-box;
                                    box-sizing: border-box;
                                    outline: none;
                                    text-transform: none;
                                    text-decoration: none;
        }
        .container {
            width: auto;
            min-width: unset !important;
        }

        .w-100 {
            width: 100% !important;
        }
        .m-0 {
            margin: 0 !important;
        }
        .pl-3, .px-3 {
            padding-left: 1rem !important;
        }
        .pr-3, .px-3 {
            padding-right: 1rem !important;
        }
        .pb-2, .py-2 {
            padding-bottom: 0.5rem !important;
        }
        .pt-2, .py-2 {
            padding-top: 0.5rem !important;
        }
        .align-items-center {
            align-items: center;
        }
        .justify-content-between {
            justify-content: space-between !important;
        }
        .justify-content-around {
            justify-content: space-around !important;
        }
        .justify-content-end {
            justify-content: flex-end !important;
        }
        .row {
            display: -webkit-box;
            display: flex;
            flex-wrap: wrap;
            margin-left: -15px;
            margin-right: -15px;
        }
        .col {
            flex-basis: 0;
            -webkit-box-flex: 1;
            flex-grow: 1;
            max-width: 100%;
            padding: 0 15px;
        }
        h3 {
            font-size: 20px;
            font-weight: bold;
            padding-bottom: 0;
        }
        .col-sm-12 {
            -webkit-box-flex: 0;
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 15px;
        }
        .col-12 {
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 15px;
        }
        .col-6 {
            flex: 0 0 50%;
            max-width: 50%;
            padding: 0 15px;
        }
        .col-auto {
            flex: 0 0 auto;
            width: auto;
            max-width: 100%;
            padding: 0 15px;
        }

        .qr-code img {
            max-width: 100%;
        }

        h3 {
            font-size: 25px;
            color: #161616;
            font-weight: bold;
        }
        .badge {
            font-size: 20px;
            padding: 10px;
            border-radius: 14px;
        }

        .bill-info {
            box-shadow: 0px 1px 4px #0000001A;
            border-radius: 11px;
            padding: 10px 30px !important;
            margin-bottom: 16px;
        }
        .bill-info p {
            font-size: 18px;
            padding-bottom: 0 !important;
        }
        th {
            font-weight: bold !important;
        }
        th,td {
            border-bottom: 1px solid #dee2e6 !important;
            margin: 10px;
            font-size: 20px;
            white-space: inherit;
            text-align: center !important;
            vertical-align: middle !important;

        }

        .invoice-btns .btn-success {
            background: #62C83F;
            border-color: #62C83F;
        }
        .invoice-btns .btn-danger {
            background: #CF1212;
            border-color: #CF1212;
        }

        h1 {
            font-size: 36px;
        }
        p {
            font-size: 20px;
        }

        .totals b {
            font-size: 16px;
            position: relative;
        }
        .totals .row:first-of-type {
            background: #dee2e6;
        }

        .invoice-footer {
            background: transparent;
        }
        .invoice-footer p {
            font-size: 16px;
        }
        table {
            width : 100% !important
        }
        .mb-3, .my-3 {
            margin-bottom: 1rem !important;
        }
        .mx-0 {
            margin: 0;
        }
                            }
                        `,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.initPrintMe()
    this.refresh()
  },
  methods: {
    filterResults(short) {
      if (short == 'short') {
        this.short_version = false
      } else {
        this.short_version = true
      }
      let url
      if (this.date.start && this.date.end) {
        url =
          '/api/account/get/report?account=' +
          this.filter.account_in_link +
          '&from_date=' +
          this.date.start +
          '&to_date=' +
          this.date.end +
          ''
      } else {
        url =
          '/api/account/get/report?account=' + this.filter.account_in_link + ''
      }
      axios
        .get(url)
        .then(res => {
          this.report = res.data.body.report
          this.transactions = res.data.body.report.transaction.data
          this.total = res.data.body.report.transaction.paginate.total
          this.current_page =
            res.data.body.report.transaction.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url =
            res.data.body.report.transaction.paginate.next_page_url
          this.prev_page_url =
            res.data.body.report.transaction.paginate.prev_page_url
          this.first_page_url =
            res.data.body.report.transaction.paginate.current_page
          this.last_page_url =
            res.data.body.report.transaction.paginate.last_page
          this.selected_account = res.data.body.report.account
          this.loaded = true
          this.itemsLoaded = true
          this.getReport = true
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    refresh() {
      let url = '/api/account/reports'
      axios
        .get(url)
        .then(res => {
          if (res.data.status) {
            this.links = res.data.body.account_link

            this.loaded = true
            this.itemsLoaded = true
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
          }
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    setDefaultType() {
      let url = '/api/account/from/link?slug=' + this.filter.account_link
      axios
        .get(url)
        .then(res => {
          if (res.data.status) {
            this.accounts = res.data.body.accounts
            this.loaded = true
            this.itemsLoaded = true
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
          }
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    printReport() {
      //invoke Print me From Mixin //
      this.printMe('#report', this.cssText)
    },

    goTo(url) {
      this.transctions = []
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
    },

    resetForm() {
      ;(this.filter = {}), (this.date = {})
    },
  },
}
</script>
<style scoped>
.th_style {
  background: #323eb6 !important;
  color: #000 !important;
  border: 1px solid #c8c8c8 !important;
  font-family: 'BahijTheSansArabic-Plain' !important;
}
.stretch-card > .card {
  background: transparent;
  border: none;
  box-shadow: none;
}

h4 {
  font-size: 16px;
  font-weight: 500;
}

h4 .title {
  background: #2349ef;
  border-radius: 48px;
  color: #fff;
  padding: 6px 30px;
  margin: 15px 0 15px 30px;
}

.report-table table {
  border-radius: 10px 10px 0 0 !important;
}

table thead.main-header th {
  background: #323eb6 !important;
  color: #fff !important;
  border: 1px solid #c8c8c8 !important;
}

th {
  text-align: center !important;
}

thead tr th,
tr td {
  font-size: 16px !important;
  font-weight: 500 !important;
  min-width: unset !important;
  max-width: unset !important;
  height: auto !important;
}

td table td {
  font-weight: 300 !important;
  color: #0d0d0d !important;
}

.table.table-bordered td {
  max-width: unset !important;
  width: auto !important;
}

label,
select,
input {
  font-size: 11px;
  display: inline !important;
  font-weight: 300;
  color: #5e5e5e;
  border-radius: 0;
  border: none;
  background-color: transparent;
  margin: 0;
}

label {
  border-left: 1px solid #707070;
  margin-left: 16px;
  padding-left: 8px !important;
}

select {
  width: 30px;
}

select,
input {
  padding: 0 !important;
  height: 20px;
  line-height: 1;
}

.accounts_reports .form-group {
  padding: 10px 16px;
  border: 1px solid #ced4da;
  border-radius: 7px;
  background-color: #fff;
}

.accounts_reports .custom-select.is-valid:focus {
  box-shadow: 0 0 0 0.2rem #fff !important;
}
.accounts_reports .custom-select:focus {
  box-shadow: 0 0 0 0.2rem #fff !important;
}

.report-table {
  background-color: #fff;
  padding: 16px 24px;
  border-radius: 38px;
}

.b-table-sticky-header > .table.b-table > thead > tr > th {
  position: sticky;
  top: -16px;
  z-index: 2;
}

.b-table-sticky-header > .table.b-table > thead > tr:last-of-type > th {
  position: sticky;
  top: 21px;
  z-index: 2;
}
</style>

<style>
.accounts_reports .vd-picker__input {
  padding: 4px 0 !important;
}
.accounts_reports .vd-wrapper {
  margin-bottom: 17px !important;
}
</style>
