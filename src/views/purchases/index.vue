<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <div
            class="row justify-content-between align-items-center w-100"
            style="position: relative; padding: 9px 4px"
          >
            <h4 class="card-title mb-2">
              {{ trans('purchases_invoices') }}
            </h4>
            <div class="dropdown">
              <router-link to="/purchases/add" class="btn btn-primary my-1" style="margin: 0 2px">
                {{ trans('add_purchases_invoice') }}
              </router-link>
              <b-button
                variant="primary"
                @click="searchOn = !searchOn"
                class="search-btn my-1"
                :style="language == 'en' ? 'right: 0' : 'left: 0'"
              >
                <i class="bi bi-search"></i>
              </b-button>
              <go-back-button />
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row justify-content-between align-items-center mb-4">
            <div class="col-sm-12" v-if="searchOn">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(filterResults)" @reset.prevent="reset">
                  <b-form-row>
                    <b-col cols="12" md="2">
                      <b-form-group :label="trans('invoice id')">
                        <b-form-input v-model="filter.invoice_id"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2">
                      <b-form-group :label="trans('inventory')">
                        <b-form-select v-model="filter.inventory">
                          <b-form-select-option
                            v-for="inv in inventories"
                            :value="inv.id"
                            :key="inv.id"
                            >{{ inv.title }}
                          </b-form-select-option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2">
                      <b-form-group :label="trans('provider')">
                        <b-form-select v-model="filter.provider">
                          <b-form-select-option
                            v-for="prov in providers"
                            :value="prov.id"
                            :key="prov.id"
                          >
                            {{ prov.name }}
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
                  <b-row style="justify-content: center">
                    <b-col cols="12" md="1" style="margin-top: 31px">
                      <b-button variant="success" type="submit" class="" style="font-size: 14px">
                        {{ trans('filter') }}
                      </b-button>
                    </b-col>
                    <b-col cols="12" md="2" style="margin-top: 30px">
                      <b-button variant="warning" type="reset" class="mr-2" @click="resetForm()"
                        ><font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                        {{ trans('reset_search') }}
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </ValidationObserver>
            </div>
          </div>
          <div
            class="row align-items-center justify-content-between mb-4"
            v-if="permissions.includes('view_purchase')"
          >
            <div class="col-sm-12">
              <b-table-simple
                class="table-container"
                sticky-header
                striped
                bordered
                responsive
                style="min-height: 50px"
              >
                <GlobalTabel :columns="columns" />

                <TableSkeletonLoader :items="10" :length="columns.length" v-if="skeletonLoading" />

                <b-tbody v-else>
                  <b-tr v-for="purchase in purchases" :key="purchase.id">
                    <b-td>#{{ purchase.id }}</b-td>
                    <b-td>{{ purchase.provider_inv_number }}</b-td>
                    <b-td
                      ><p>
                        {{ purchase.provider ? purchase.provider.name : '' }}
                      </p>
                      <p>
                        {{ purchase.provider ? purchase.provider.phone : '' }}
                      </p></b-td
                    >
                    <b-td>{{ purchase.inventory ? purchase.inventory.title : '---' }} </b-td>

                    <b-td>
                      <!-- edit button -->
                      <b-badge
                        v-if="purchase.payment_type == 'full'"
                        style="font-size: 13px; padding: 12px"
                        variant="success"
                      >
                        {{ trans(purchase.payment_type) }}
                      </b-badge>
                      <b-badge
                        v-else
                        style="font-size: 13px; padding: 12px; background: rgb(224, 168, 0)"
                      >
                        {{ trans(purchase.payment_type) }}
                      </b-badge>
                    </b-td>
                    <b-td
                      >{{ purchase.total.toNegativeFormat() }}
                      {{ getSetting('currency', settings) }}
                    </b-td>
                    <b-td>{{ purchase.invoice_date }}</b-td>
                    <b-td class="btns">
                      <router-link
                        v-b-tooltip.hover
                        title="عرض"
                        style="border-radius: 8px !important; margin: 0 2px"
                        class="mb-2"
                        v-if="permissions.includes('view_purchase')"
                        :to="'/purchases/edit/' + purchase.id"
                      >
                        <font-awesome-icon icon="fa-solid fa-eye" />
                      </router-link>

                      <button
                        @click="checkRefund(purchase)"
                        style="
                          cursor: pointer;
                          border-radius: 8px !important;
                          color: #dc3545 !important;
                          margin: 0 5px;
                        "
                      >
                        <font-awesome-icon icon="fa-solid fa-arrow-right-arrow-left" />
                      </button>

                      <ActionButton
                        v-if="permissions.includes('view_action_event_purchase')"
                        :id="purchase.id"
                        :resource_name="'purchase'"
                      />
                    </b-td>
                  </b-tr>
                </b-tbody>
                <tbody v-if="itemsLoaded && !purchases.length" class="text-center">
                  <b-tr>
                    <b-td colspan="7">
                      <h5 class="no_results_found">
                        {{ trans('no_results_found') }}
                      </h5>
                    </b-td>
                  </b-tr>
                </tbody>
              </b-table-simple>
            </div>

            <div class="col-sm-12 text-center" v-if="purchases.length">
              <pagination-component
                :items="purchases"
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
          <div class="row align-items-center justify-content-between" v-else>
            <div class="col">
              <h2 class="text-center" v-if="language == 'en'">You Not Allowed to Open This Page</h2>
              <h2 class="text-center" v-else>هذه الصفحه غير مسموح لك الدخول عليها</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <refund-purchase :settings="settings" :user="user" :invoice_id="refundId"></refund-purchase>
    <files-purchase></files-purchase>
  </div>
</template>
<script>
import PaginationComponent from '@/components/global/PaginationComponent.vue'

import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'

import RefundPurchase from '@/components/sections/modals/RefundPurchase.vue'
import FilesPurchase from '@/components/sections/modals/AddFilesPurchase.vue'

export default {
  components: {
    RefundPurchase,
    FilesPurchase,
    PaginationComponent,

    TableSkeletonLoader
  },
  name: 'AppPurchases',
  props: [
    'permissions',
    'section',
    'user',
    'langs',
    'settings',
    'permissions',
    'language',
    'inventories',
    'providers'
  ],
  data() {
    return {
      columns: [
        'invoiceID',
        'provider invoice number',
        'provider',
        'inventory',

        'invoice type',
        'total',
        // 'user',
        'purchase_time',
        'actions'
      ],
      skeletonLoading: true,

      purchases: [],
      strings: [],

      filter: {
        page: 1
      },
      paginate: {},
      users: [],

      usingFilters: 0,
      itemsLoaded: false,
      next_page: 0,
      prev_page: 0,
      current_page: 1,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,
      refundId: '',
      export_fields: {
        'invoice id': 'id',
        'customer name': 'c_name',
        'customer phone': 'c_phone',
        at: 'created_at',
        inventory: 'inventory_title',
        user: 'user_name',
        total: 'total'
      },
      searchOn: false,
      loading: true
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    SharedEvent.listen('close-files-purchase-modal', (data) => {
      this.refresh()
    })
  },
  methods: {
    openFilesPurchaseModal(PurchaseId) {
      let settings = {
        strings: this.strings,
        user: this.user,
        purchaseId: PurchaseId
      }
      SharedEvent.fire('open-files-purchase-modal', settings)
    },
    filterResults() {
      this.usingFilters = 1
      this.refresh()
    },
    refresh() {
      this.itemsLoaded = false
      axios({
        method: 'GET',
        url: '/api/purchases',
        params: {
          page: this.current_page,
          provider: this.filter.provider,
          inventory: this.filter.inventory || null,
          date_from: this.filter.date_from,
          date_to: this.filter.date_to,
          invoice_id: this.filter.invoice_id
        }
      })
        .then((res) => {
          this.skeletonLoading = false

          this.users = res.data.body.users ?? []
          this.purchases = res.data.body.purchases.data
          this.paginate = res.data.body.purchases.paginate

          this.total = res.data.body.purchases.paginate.total
          this.current_page = res.data.body.purchases.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.purchases.paginate.next_page_url
          this.prev_page_url = res.data.body.purchases.paginate.prev_page_url
          this.first_page_url = res.data.body.purchases.paginate.first_page_url
          this.last_page_url = res.data.body.purchases.paginate.last_page_url
          this.last_page = res.data.body.purchases.paginate.last_page
          if (!this.usingFilters) {
            this.filter.inventory = this.user.inventory
          }

          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    openRefundModal(id) {
      this.refundId = id
      let data = {
        strings: this.strings,
        language: this.language,
        paymentMethods: this.paymentMethods,
        settings: this.settings
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('open-purchase-refund-modal', data)
    },

    goTo(url) {
      this.skeletonLoading = true
      console.log(url)
      axios({
        method: 'GET',
        url: url,
        params: {
          provider: this.filter.provider,
          inventory: this.filter.inventory || null,
          date_from: this.filter.date_from,
          date_to: this.filter.date_to,
          invoice_id: this.filter.invoice_id
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.purchases = res.data.body.purchases.data

          this.total = res.data.body.purchases.paginate.total
          this.current_page = res.data.body.purchases.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.purchases.paginate.next_page_url
          this.prev_page_url = res.data.body.purchases.paginate.prev_page_url
          this.first_page_url = res.data.body.purchases.paginate.current_page
          this.last_page_url = res.data.body.purchases.paginate.last_page_url
          this.last_page = res.data.body.purchases.paginate.last_page

          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    Delete(id) {
      this.$dialog
        .confirm(this.strings['deleting_a_purchase'])
        .then((dialog) => {
          axios
            .post('/api/purchases/delete', { id: id })
            .then(
              (res) => {
                if (res.data.status) {
                  this.showToastError(res.data.message, res.data.custom_code)
                  this.purchases = this.purchases.filter((x) => {
                    return x.id != id
                  })
                } else {
                  this.showToastError(res.data.message, res.data.custom_code)
                }
              },
              (error) => {
                this.showToastError(error.response.data.message, error.response.data.custom_code)
              }
            )
            .catch((error) => {
              this.showToastError(error.response.data.message, error.response.data.custom_code)
            })
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    reset() {
      this.filter = {
        per_page: 30
      }
      this.$refs.form.reset()
      return this.refresh()
    },
    clearResults() {
      this.users = []
      this.purchases = []

      this.total = ''
      this.current_page = ''
      this.prev_page = ''
      this.next_page = ''
      this.next_page_url = ''
      this.prev_page_url = ''
      this.first_page_url = ''
      this.last_page_url = ''
    },
    resetForm() {
      this.filter = {}
      return this.refresh()
    },
    checkRefund(item) {
      if (item.has_refund) {
        this.showToastError(this.trans('the invoice has refunded before'), '4000')
      } else {
        this.$router.push('/purchase/refund/' + item.id)
      }
    }
  }
}
</script>
<style scoped>
.table-container {
  max-height: unset !important;
}
@media screen and (max-width: 430px) {
  .search-btn {
    position: absolute;
    top: -9px !important;
  }
}
@media screen and (min-width: 431px) {
  .search-btn {
    position: relative;
    top: 0 !important;
  }
}
</style>
