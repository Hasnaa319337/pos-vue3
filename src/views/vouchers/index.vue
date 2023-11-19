<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-header header-sm justify-content-between align-items-center">
          <b-row class="justify-content-between align-items-center">
            <b-col cols="auto">
              <h4 class="card-title" v-text="trans('vouchers')"></h4>
            </b-col>
            <b-col class="col-sm-auto col-12">
              <div class="row justify-content-end m-0">
                <b-button variant="primary" to="/payment-voucher/add" class="ml-2">
                  {{ trans('add payment voucher') }}
                </b-button>
                <div class="dropdown">
                  <b-button variant="success" to="/receipt-voucher/add" class="ml-2">
                    {{ trans('add receipt voucher') }}
                  </b-button>
                  <b-button variant="primary" class="ml-2 search-btn">
                    <i class="bi bi-search" @click="searchOn = !searchOn"></i>
                  </b-button>
                  <GoBackButton class="ml-1" />
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="card-body">
          <div class="row justify-content-between align-items-center mb-4">
            <div class="col-sm-12">
              <ValidationObserver v-if="searchOn" v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(filterResults)" @reset.prevent="reset">
                  <b-form-row>
                    <b-col cols="12" md="2">
                      <ValidationProvider name="voucher_type" v-slot="{ valid, errors }">
                        <b-form-group :label="trans('statement')">
                          <b-form-input
                            v-model="filter.name"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                          </b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>

                    <b-col cols="12" md="2">
                      <ValidationProvider name="voucher_type" v-slot="{ valid, errors }">
                        <b-form-group :label="trans('voucher_type')">
                          <b-form-select
                            v-model="filter.type"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option value="withdraw">
                              {{ trans('payment vouchers') }}
                            </b-form-select-option>
                            <b-form-select-option value="deposit">
                              {{ trans('receipt vouchers') }}
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>

                    <b-col cols="12" md="2">
                      <b-form-group :label="trans('user')">
                        <b-form-select v-model="filter.cashier">
                          <b-form-select-option v-for="usr in users" :value="usr.id" :key="usr.id">
                            {{ usr.name }}
                          </b-form-select-option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2">
                      <b-form-group :label="trans('date_from')">
                        <b-input
                          type="date"
                          class="form-control"
                          v-model="filter.date_from"
                        ></b-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2">
                      <b-form-group :label="trans('date_to')">
                        <b-input
                          type="date"
                          class="form-control"
                          v-model="filter.date_to"
                        ></b-input>
                      </b-form-group>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col class="text-center">
                      <b-button variant="success" type="submit" class="mr-2"
                        ><font-awesome-icon icon="fa-solid fa-filter" />
                        {{ trans('filter') }}
                      </b-button>
                      <b-button variant="warning" type="reset" class="mr-2"
                        ><font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                        {{ trans('reset search') }}
                      </b-button>
                    </b-col>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </div>
          </div>
          <div class="row align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <!--        v-if="permissions.includes('view_any_voucher')" -->
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <GlobalTabel :columns="columns" />
                <TableSkeletonLoader :items="10" :length="columns.length" v-if="skeletonLoading" />
                <b-tbody v-else>
                  <b-tr v-for="voucher in vouchers" :key="voucher.id">
                    <b-td>#{{ voucher.id }}</b-td>
                    <b-td style="width: 190px !important">{{ voucher.statement }}</b-td>
                    <b-td
                      >{{ voucher.amount.number }}
                      {{ getSetting('currency', settings) }}
                    </b-td>
                    <b-td> {{ voucher.beneficiary.name }} ({{ voucher.beneficiary.type }}) </b-td>
                    <b-td>
                      {{ voucher.type }}
                    </b-td>
                    <b-td>{{ voucher.created_at }}</b-td>
                    <b-td>{{ voucher.created_by.name }}</b-td>
                    <b-td>
                      <!--     filter.data == 'withdrawals' -->
                      <!--  v-if="permissions.includes('view_voucher')" -->
                      <router-link
                        v-b-tooltip.hover
                        :title="trans('show')"
                        style="border-radius: 8px !important"
                        class="mb-2"
                        :to="
                          voucher.type === 'صرف'
                            ? '/payment-voucher/' + voucher.id
                            : '/receipt-voucher/' + voucher.id
                        "
                        ><font-awesome-icon icon="fa-solid fa-eye"
                      /></router-link>
                      <!--    v-if="permissions.includes('view_action_event_voucher')" -->
                      <ActionButton :id="voucher.id" :resource_name="'voucher'" />
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody class="text-center" v-if="itemsLoaded && !vouchers.length">
                  <b-tr class="text-center">
                    <b-td colspan="7">
                      <h5>{{ trans('no results found') }}</h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
            <div class="col-sm-12 text-center">
              <pagination-component
                v-if="vouchers.length"
                :items="vouchers"
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
  components: {
    TableSkeletonLoader,
    PaginationComponent
  },
  name: 'AppVouchers',
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'language'],
  data() {
    return {
      columns: ['id', 'statement', 'amount', 'customer', 'type', 'created_at', 'by', 'options'],
      skeletonLoading: true,

      vouchers: [],

      treasuries: [],
      filter: {
        per_page: 30,
        treasury: []
      },
      users: [],

      usingFilters: 1,
      itemsLoaded: false,
      last_page: 0,
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
        'customer name': 'c_name',
        'customer phone': 'c_phone',
        at: 'created_at',
        inventory: 'inventory_title',
        user: 'user_name',
        total: 'total'
      },
      inventoryObject: '',
      searchOn: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    filterResults() {
      this.usingFilters = 1
      this.refresh()
    },
    refresh() {
      this.clearData()
      this.itemsLoaded = false
      this.axios({
        method: 'GET',
        url: '/api/vouchers',
        params: {
          search: this.filter.name,
          type: this.filter.type,
          cashier: this.filter.cashier,
          date_from: this.filter.date_from,
          date_to: this.filter.date_to
        }
      })
        .then((res) => {
          if (res.data.status) {
            this.skeletonLoading = false
            this.vouchers = res.data.body.vouchers.data
            this.total = res.data.body.vouchers.paginate.total
            this.current_page = res.data.body.vouchers.paginate.current_page
            this.prev_page = this.current_page - 1
            this.next_page = this.current_page + 1
            this.next_page_url = res.data.body.vouchers.paginate.next_page_url
            this.prev_page_url = res.data.body.vouchers.paginate.prev_page_url
            this.first_page_url = res.data.body.vouchers.paginate.first_page_url
            this.last_page_url = res.data.body.vouchers.paginate.last_page_url
            this.last_page = res.data.body.vouchers.paginate.last_page

            this.treasuries = res.data.body.treasuries

            this.itemsLoaded = true
            this.inventoryObject = ''
          }
        })
        .catch((error) => {
          this.ToastErrorMixin(error.response.data.message, error.response.data.custom_code)
        })
      this.axios
        .get('/api/users')
        .then((res) => {
          this.users = res.data.body.users.data
        })
        .catch((error) => {
          this.ToastErrorMixin(error.response.data.message, error.response.data.custom_code)
        })
    },
    goTo(url) {
      this.skeletonLoading = true
      this.vouchers = []

      this.itemsLoaded = false

      this.axios({
        method: 'GET',
        url: url,
        params: {
          search: this.filter.name,
          type: this.filter.type,
          cashier: this.filter.cashier,
          date_from: this.filter.date_from,
          date_to: this.filter.date_to
        }
      })

        .then((res) => {
          this.skeletonLoading = false
          this.vouchers = res.data.body.vouchers.data
          this.total = res.data.body.vouchers.paginate.total
          this.current_page = res.data.body.vouchers.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.vouchers.paginate.next_page_url
          this.prev_page_url = res.data.body.vouchers.paginate.prev_page_url
          this.first_page_url = res.data.body.vouchers.paginate.first_page_url
          this.last_page_url = res.data.body.vouchers.paginate.last_page_url
          this.last_page = res.data.body.vouchers.paginate.last_page
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.ToastErrorMixin(error.response.data.message, error.response.data.custom_code)
        })
    },
    delete(id) {
      this.$dialog.confirm(this.trans('Do you want to delete this voucher')).then((dialog) => {
        axios
          .post('/api/vouchers/delete', { id: id })
          .then(
            (res) => {
              if (res.data.success) {
                this.vouchers = this.vouchers.filter((x) => {
                  return x.id != id
                })
              } else {
                this.ToastErrorMixin(error.response.data.message, error.response.data.custom_code)
              }
            },
            (error) => {
              this.ToastErrorMixin(error.response.data.message, error.response.data.custom_code)
            }
          )
          .catch((error) => {
            this.ToastErrorMixin(error.response.data.message, error.response.data.custom_code)
          })
      })
    },
    reset() {
      this.filter = {
        per_page: 30
      }
      this.$refs.form.reset()
    },
    clearData() {
      this.vouchers = []
      this.total = ''
      this.data = []
      this.current_page = ''
      this.prev_page = ''
      this.next_page = ''
      this.next_page_url = ''
      this.prev_page_url = ''
      this.first_page_url = ''
      this.last_page_url = ''
    },
    setDefaultType() {
      this.filter.type = ''
      if (this.filter.data == 'withdrawals') {
        this.filter.type = 'purchases'
      } else if (this.filter.data == 'deposits') {
        this.filter.type = 'sales'
      }
    }
  }
}
</script>
<style>
@media screen and (max-width: 575px) {
  .header-sm {
    height: auto !important;
  }
}
.multiselect__tags {
  min-height: 33px !important;
  padding: 5px 40px 0 8px !important;
  border: 1px solid #ced4da !important;
  font-size: 1rem !important;
  border-radius: 0.25rem !important;
  color: rgb(73, 80, 87) !important;
}

@media screen and (max-width: 479px) {
  .search-btn {
    position: absolute;
    top: -45px;
  }
}
</style>
