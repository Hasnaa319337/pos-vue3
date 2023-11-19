<template>
  <div style="height: 100%; margin: 0 10px">
    <div class="card">
      <div class="all_customers">
        <div class="">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="card">
                <div
                  class="card-header header-sm mb-3 d-flex justify-content-between align-items-center"
                >
                  <h4 class="card-title">{{ trans('add_customers') }}</h4>
                  <div class="dropdown btns_header" style="text-align: end">
                    <b-button @click="openImportCustomersModal" variant="primary">
                      <font-awesome-icon icon="fa-solid fa-upload" />
                    </b-button>
                    <router-link
                      style="line-height: 2"
                      class="btn btn-success btn-md"
                      to="/customers/add"
                    >
                      <i class="bi bi-plus-lg"></i>
                    </router-link>
                    <button class="btn btn-primary" @click="exportFile('xlsx')">
                      <font-awesome-icon icon="fa-solid fa-download" />
                    </button>
                    <button class="btn btn-primary" @click="exportFile('pdf')">
                      <font-awesome-icon icon="fa-solid fa-file-pdf" />
                    </button>
                    <b-button
                      variant="primary"
                      @click="searchOn = !searchOn"
                      class="search-btn btn btn-primary"
                      :style="language == 'en' ? 'right: 0' : 'left: 0'"
                    >
                      <i class="bi bi-search"></i>
                    </b-button>
                    <go-back-button />
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="errorValidationImport.length > 0"
              class="col-10 mb-4"
              style="background: #cd0808; padding: 20px; border-radius: 4px; color: #fff"
            >
              <h4>{{ trans('there is error validation in import') }}</h4>
              <span class="d-block" v-for="err in errorValidationImport" :key="err">
                {{ trans(err.attribute) }} - {{ trans('row') }} ({{ err.row }}) -
                <span v-for="val in err.errors" :key="val">{{ val }}</span>
              </span>
            </div>
          </div>

          <b-row class="mx-0 align-items-start">
            <b-col cols="12" class="mb-3" v-if="searchOn">
              <ValidationObserver>
                <b-form>
                  <b-form-row>
                    <b-col>
                      <b-form-group :label="trans('customer name')" label-for="input-2">
                        <b-form-input
                          v-model="filters.name"
                          id="input-2"
                          type="text"
                          class="form-control"
                          :placeholder="trans('name')"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group :label="trans('email')" label-for="input-2">
                        <b-form-input
                          v-model="filters.email"
                          id="input-2"
                          type="email"
                          class="form-control"
                          placeholder="admin@domainame.com"
                        />
                      </b-form-group>
                    </b-col>

                    <b-col>
                      <b-form-group :label="trans('phone')" label-for="input-">
                        <b-form-input
                          v-model="filters.phone"
                          id="input-2"
                          type="text"
                          class="form-control"
                          placeholder="+9665485232541"
                        />
                      </b-form-group>
                    </b-col>

                    <b-col>
                      <b-form-group :label="trans('status')" label-for="input-">
                        <b-form-select v-model="filters.status">
                          <b-form-select-option value="">{{ trans('all') }}</b-form-select-option>
                          <b-form-select-option :value="1">{{
                            trans('active')
                          }}</b-form-select-option>
                          <b-form-select-option :value="0">{{
                            trans('not_active')
                          }}</b-form-select-option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-form-row>

                  <b-form-row class="mt-3 btns_form">
                    <button class="search" @click.prevent="submitForm">
                      {{ trans('search') }}
                    </button>
                    <button class="reset" @click="resetForm">
                      {{ trans('reset') }}
                    </button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </b-col>
            <b-col cols="12">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <GlobalTabel :columns="columns" />
                <TableSkeletonLoader v-if="skeletonLoading" :items="10" :length="columns.length" />
                <template v-else>
                  <b-tbody class="text-center">
                    <template v-for="(item, index) in items" :key="index">
                      <b-tr>
                        <b-td>
                          {{ item.name }}
                        </b-td>
                        <b-td>{{ item.phone }}</b-td>
                        <b-td
                          ><span class="log-type">{{ item.email }}</span></b-td
                        >
                        <b-td
                          ><div class="all">
                            <span class="name">{{ item.arrears_max_amount }}</span>
                          </div></b-td
                        >
                        <b-td
                          ><span>{{ item.arrears_max_time }}</span></b-td
                        >
                        <b-td :class="item.balance.isNegative('negative_number_color')">{{
                          item.balance.toNegativeFormat()
                        }}</b-td>
                        <b-td>
                          <font-awesome-icon
                            :class="
                              item.active ? 'text-success' : 'text-danger' + ' font-weight-bolder'
                            "
                            :icon="item.active ? 'fa-solid fa-check' : 'fa-solid fa-xmark'"
                          />
                        </b-td>
                        <!-- <b-td>{{ item.debit }}</b-td> -->
                        <b-td>
                          <b-button
                            v-b-toggle="'collapse-' + index"
                            class="btn btn-primary more m-auto"
                          >
                            <i class="bi bi-plus-lg"></i>
                          </b-button>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td colspan="10">
                          <b-collapse :id="'collapse-' + index" class="mt-2">
                            <div class="item_box">
                              <div class="options">
                                <span>{{ trans('options') }}</span>
                                <div class="btns">
                                  <router-link :to="'/customers/view/' + item.id">
                                    <button>
                                      <font-awesome-icon class="icon" icon="fa-solid fa-eye" />
                                      <span>{{ trans('show') }}</span>
                                    </button>
                                  </router-link>
                                  <button @click="activeAndDeactive(item)">
                                    <font-awesome-icon class="icon" icon="fa-solid fa-reply-all " />
                                    <span>{{ trans('Activate_or_deactivate') }}</span>
                                  </button>
                                  <template v-if="item.id != 1">
                                    <router-link :to="'/customers/edit/' + item.id">
                                      <button>
                                        <font-awesome-icon
                                          class="icon"
                                          icon="fa-solid fa-pen-to-square"
                                        />
                                        <span>{{ trans('edit') }}</span>
                                      </button>
                                    </router-link>
                                    <button @click="delItem(item.id)">
                                      <font-awesome-icon class="icon" icon="fa-solid fa-trash" />
                                      <span>{{ trans('delete') }}</span>
                                    </button>
                                    <button style="padding: 2px 5px">
                                      <ActionButton
                                        v-if="permissions.includes('view_action_event_customer')"
                                        :id="item.id"
                                        :resource_name="'customer'"
                                      />
                                      <span>{{ trans('record_procedures') }}</span>
                                    </button>
                                  </template>
                                </div>
                              </div>
                            </div>
                          </b-collapse>
                        </b-td>
                      </b-tr>
                    </template>
                    <b-tr>
                      <b-td
                        style="
                          font-size: 18px;
                          font-weight: bold;
                          background: #f6f6f6 !important;
                          margin: 10px 0;
                        "
                        colspan="5"
                        >{{ trans('total') }}</b-td
                      >
                      <b-td
                        :class="total_balance.isNegative('negative_number_color')"
                        style="font-size: 18px; font-weight: bold; background: #f6f6f6 !important"
                      >
                        {{ total_balance.toNegativeFormat() }}
                      </b-td>

                      <b-td style="background: #f6f6f6 !important"></b-td>
                      <b-td style="background: #f6f6f6 !important"></b-td>
                      <b-td style="background: #f6f6f6 !important"></b-td>
                    </b-tr>
                  </b-tbody>
                </template>
                <b-tbody class="text-center" v-if="itemsLoaded && !items.length">
                  <b-tr class="text-center">
                    <b-td colspan="10">
                      <h5>
                        {{ trans('no results found') }}
                      </h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </div>
        <div class="col-sm-12 text-center" v-if="!skeletonLoading">
          <pagination-component
            :items="items"
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

        <import-customers></import-customers>
      </div>
    </div>
  </div>
</template>

<script>
import ImportCustomers from '@/components/sections/modals/ImportCustomers.vue'
import axios from 'axios'

import PaginationComponent from '@/components/global/PaginationComponent.vue'

import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'

export default {
  props: [
    'section',
    'sections',
    'user',
    'user_language',
    'langs',
    'permissions',
    'language',
    'settings'
  ],
  components: {
    PaginationComponent,
    ImportCustomers,

    TableSkeletonLoader
  },
  data() {
    return {
      columns: [
        'customer_name',
        'phone',
        'email',
        'the maximum amount for a deferred sale',
        'the maximum term for the sale on credit',
        'balance',
        'status',
        'actions'
      ],
      loaded: false,

      items: [],
      filters: {
        name: null,
        email: null,
        phone: null,
        status: null
      },
      errorValidationImport: [],
      total_debit_balance: '',
      total_credit_balance: '',
      total_balance: 0,
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      last_page: '',
      total: 0,
      paginate: {},
      skeletonLoading: true,
      searchOn: false,
      itemsLoaded: false
    }
  },

  mounted() {
    this.submitForm()
    // this.SharedEvent.listen('close-import-customers-modal', (data) => {
    //   if (data) {
    //     this.errorValidationImport = data
    //   }

    //   this.getCustomers()
    // })
  },
  methods: {
    getCustomers() {
      axios({
        method: 'GET',
        url: '/api/customers'
      })
        .then((res) => {
          this.skeletonLoading = false
          this.itemsLoaded = true
          this.items = res.data.body.customers.data
          this.paginate = res.data.body.customers.paginate
          this.total = res.data.body.customers.paginate.total

          this.current_page = res.data.body.customers.paginate.current_page
          this.last_page = res.data.body.customers.paginate.last_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.customers.paginate.next_page_url
          this.prev_page_url = res.data.body.customers.paginate.prev_page_url
          this.first_page_url = res.data.body.customers.paginate.first_page_url
          this.last_page_url = res.data.body.customers.paginate.last_page_url
          this.total_credit_balance = res.data.body.total_credit_balance
          ;(this.total_debit_balance = res.data.body.total_debit_balance),
            (this.total_balance = res.data.body.total_balance)
        })
        .catch((err) => {
          console.log('Error', err)
        })
    },

    openImportCustomersModal() {
      this.SharedEvent.fire('open-import-customers-modal')
    },
    exportFile(type) {
      let url = 'api/customers-export/' + type
      axios
        .get(url, {
          responseType: 'arraybuffer'
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'products_demo.' + type)
          document.body.appendChild(link)
          link.click()
        })
    },
    goTo(url) {
      this.items = []
      this.skeletonLoading = true
      let str = ''

      url = url.includes('?') ? url + str : url + '?' + str

      axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false
          this.items = res.data.body.customers.data
          this.paginate = res.data.body.customers.paginate
          this.total = res.data.body.customers.paginate.total
          this.last_page = res.data.body.customers.paginate.last_page
          this.current_page = res.data.body.customers.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.customers.paginate.next_page_url
          this.prev_page_url = res.data.body.customers.paginate.prev_page_url
          this.first_page_url = res.data.body.customers.paginate.first_page_url
          this.last_page_url = res.data.body.customers.paginate.last_page_url
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    submitForm() {
      axios({
        method: 'get',
        url: 'api/customers',
        params: {
          search:
            this.filters.name || this.filters.email || this.filters.phone || this.filters.status
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.loaded = true
          this.items = res.data.body.customers.data
          this.paginate = res.data.body.customers.paginate
          this.total = res.data.body.customers.paginate.total

          this.current_page = res.data.body.customers.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.customers.paginate.next_page_url
          this.prev_page_url = res.data.body.customers.paginate.prev_page_url
          this.first_page_url = res.data.body.customers.paginate.first_page_url
          this.last_page_url = res.data.body.customers.paginate.last_page_url
          this.total_credit_balance = res.data.body.total_credit_balance
          ;(this.total_debit_balance = res.data.body.total_debit_balance),
            (this.total_balance = res.data.body.total_balance)
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    delItem(id) {
      this.$bvModal
        .msgBoxConfirm('Do you want to delete this customer', {
          okTitle: this.trans('yes'),
          cancelTitle: this.trans('no'),
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal'
        })
        .then((value) => {
          if (value) {
            axios.delete(`api/customers/${id}`).then((res) => {
              this.showToastError(res.data.message, res.data.custom_code)

              this.submitForm()
            })
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    activeAndDeactive(item) {
      axios
        .post(`api/customers/${item.id}/active`, { active: item.active })
        .then((res) => {
          this.showToastError(res.data.message, res.data.custom_code)
          this.submitForm()
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    resetForm() {
      ;(this.filters.email = ''),
        (this.filters.name = ''),
        (this.filters.phone = ''),
        (this.filters.status = null)

      return this.submitForm()
    }
  }
}
</script>

<style lang="scss" scoped>
.all_customers {
  height: 100%;

  .btns_form {
    justify-content: center;
    gap: 20px;
    margin-bottom: 60px;

    .search {
      width: 112px;
      height: 33px;
      background: transparent linear-gradient(180deg, #137b97 0%, #5dc5e0 100%) 0% 0% no-repeat
        padding-box;
      box-shadow: 0px 1px 8px #0000000d;
      border-radius: 19px;
      border: none;
      outline: none;
      color: #fff;
    }

    .reset {
      width: 127px;
      height: 33px;
      border: 1px solid #707070;
      border-radius: 19px;
      background: transparent;
    }
  }

  button.more {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    background: transparent linear-gradient(180deg, #5cc4df 0%, #147c98 100%) 0% 0% no-repeat
      padding-box;
  }

  .table.table-bordered td {
    // width: 100% !important;
    padding: 5px 0 !important;
  }

  .item_box {
    width: 100% !important;
    background: #f6f6f6;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    margin: 10px auto;

    .status {
      padding: 15px 10px;
      background-color: #fff;

      .title {
        color: #000000;
        font-size: 15px;
        font-weight: bold;
      }
    }

    .options {
      display: flex;
      align-items: center;
      background: #ffffff 0% 0% no-repeat padding-box;
      border-radius: 8px;
      padding: 8px 10px;
      gap: 21px;

      .btns {
        display: flex;
        justify-content: center;
        align-items: center;

        gap: 13px;

        span {
          font-size: 15px;
          font-weight: normal;
        }

        .icon {
          font-size: 13px;
        }

        button {
          outline: none;
          border: none;
          width: auto;
          height: 35px;
          background: #f6f6f6 0% 0% no-repeat padding-box;
          border-radius: 7px;
          color: #000000;
          display: flex;
          gap: 5px;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
