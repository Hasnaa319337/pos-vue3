<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title" v-text="trans('product card')"></h4>
          <div class="dropdown">
            <b-button @click="$router.go(-1)" class="btn btn-warning">
              <font-awesome-icon icon="fa-solid fa-reply-all " />
            </b-button>
          </div>
        </div>
        <div class="card-body">
          <div class="row align-items-center justify-content-between mb-4">
            <template v-if="stock.id">
              <div class="col-sm-12">
                <div class="row mb-4 d-flex justify-content-center">
                  <div class="col-auto card-intro ml-3 mt-3">
                    <h5 class="mb-0">
                      <b>{{ trans('Product Id') }}:</b> {{ stock.product.id }}
                    </h5>
                  </div>
                  <div class="col-auto card-intro ml-3 mt-3">
                    <h5 class="mb-0">
                      <b>{{ trans('Product serial') }} :</b>
                      {{ stock.product.serial }}
                    </h5>
                  </div>
                  <div class="col-auto card-intro ml-3 mt-3">
                    <h5 class="mb-0">
                      <b>{{ trans('Product Name') }} :</b>
                      {{ spliceText(stock.product.title, '15') }}
                    </h5>
                  </div>
                  <div class="col-auto card-intro ml-3 mt-3">
                    <h5 class="mb-0">
                      <b>{{ trans('inventory') }} :</b>
                      {{ stock.inventory.title }}
                    </h5>
                  </div>
                  <div class="col-auto card-intro ml-3 mt-3">
                    <h5 class="mb-0">
                      <b>{{ trans('Initial amount') }} :</b>
                      {{ Number(stock.initial_amount).toFormat() }}
                    </h5>
                  </div>

                  <div class="col-auto card-intro ml-3 mt-3">
                    <h5 class="mb-0">
                      <b>{{ trans('initial cost balance') }} : </b>
                      {{ Number(stock.initial_cost_balance).toFormat() }}
                      {{ getSetting('currency', settings) }}
                    </h5>
                  </div>
                </div>
                <div
                  class="row d-flex justify-content-center bg-light my-3 pb-3"
                >
                  <div
                    class="col-auto card-intro bg-behance ml-3 mt-3 bd-highlight"
                  >
                    <h5 class="mb-0">
                      <b>{{ trans('initial cost') }} : </b>
                      {{ Number(stock.initial_cost).toNegativeFormat() }}
                      {{ getSetting('currency', settings) }}
                    </h5>
                  </div>
                  <div class="col-auto card-intro ml-3 mt-3 bd-highlight">
                    <h5 class="mb-0">
                      <b> {{ trans('average cost') }} : </b>
                      <b v-if="stock.average_cost">
                        {{ Number(stock.average_cost).toNegativeFormat() }}
                        {{ getSetting('currency', settings) }}
                      </b>
                      <b v-else class="text-danger">
                        {{ trans('not purchase this product yet') }}
                      </b>
                    </h5>
                  </div>
                  <div class="col-auto card-intro ml-3 mt-3 bd-highlight">
                    <h5 class="mb-0">
                      <b>{{ trans('last cost') }} : </b>
                      <b v-if="stock.last_cost">
                        {{ stock.last_cost }}
                        {{ getSetting('currency', settings) }}</b
                      >
                      <b v-else class="text-danger">
                        {{ trans('not purchase this product yet') }}
                      </b>
                    </h5>
                  </div>
                </div>
              </div>

              <div class="col-sm-12">
                <div class="table-responsive">
                  <b-table-simple
                    sticky-header
                    striped
                    bordered
                    responsive
                    style="min-height: 50px"
                  >
                    <b-thead>
                      <b-tr class="rounded" variant="dark">
                        <th>{{ trans('date') }}</th>
                        <th>{{ trans('invoice number') }}</th>
                        <th>{{ trans('quantity') }}</th>
                        <th>{{ trans('type') }}</th>
                        <th>{{ trans('balance') }}</th>
                      </b-tr>
                    </b-thead>
                    <b-tbody v-if="stock.history.length > 0">
                      <b-tr
                        v-for="(record, index) in stock.history"
                        :key="index"
                      >
                        <b-td>{{ record.created_at }}</b-td>
                        <b-td>
                          <!-- رصيد افتتاحي -->
                          <router-link
                            :to="
                              '/accounting_initial_balance/edit/' +
                              record.reference_id
                            "
                            v-if="
                              record.reference_type ===
                              'accounting_initial_balances'
                            "
                          >
                            {{ record.reference_id }}
                          </router-link>

                          <!-- فاتوره مشتريات -->
                          <router-link
                            :to="'/purchases/edit/' + record.reference_id"
                            v-else-if="record.reference_type === 'purchases'"
                          >
                            {{ record.reference_id }}
                          </router-link>

                          <!-- مرتجع مشتريات -->
                          <router-link
                            :to="'/refund-purchase/view/' + record.reference_id"
                            v-else-if="
                              record.reference_type === 'purchase_refunds'
                            "
                          >
                            {{ record.reference_id }}
                          </router-link>

                          <!-- مرتجع مبيعات -->
                          <router-link
                            :to="'/refund-sale/view/' + record.reference_id"
                            v-else-if="record.reference_type === 'sale_refunds'"
                          >
                            {{ record.reference_id }}
                          </router-link>

                          <!-- سند صرف  -->
                          <router-link
                            :to="'/receipt-voucher/' + record.reference_id"
                            v-else-if="record.reference_type === 'vouchers'"
                          >
                            {{ record.reference_id }}
                          </router-link>

                          <!-- فاتوره مبيعات -->
                          <router-link
                            :to="'/sales/view/' + record.reference_id"
                            v-else-if="record.reference_type === 'sales'"
                          >
                            {{ record.reference_id }}
                          </router-link>

                          <!-- AccountingRestrictionItem  -->
                          <router-link
                            :to="
                              '/accounting_initial_balance/show/' +
                              record.reference_id
                            "
                            v-else-if="
                              record.reference_type ===
                              'accounting_initial_balance_items'
                            "
                          >
                            {{ record.reference_id }}
                          </router-link>

                          <!-- accounting_restrictions  -->
                          <router-link
                            :to="
                              '/accounting-restrictions/edit/' +
                              record.reference_id
                            "
                            v-else-if="
                              record.reference_type ===
                              'accounting_restrictions'
                            "
                          >
                            {{ record.reference_id }}
                          </router-link>

                          <span v-else>
                            {{ record.reference_id }}
                          </span>
                        </b-td>

                        <b-td
                          :class="
                            Number(record.steps).isNegative(
                              'negative_number_color'
                            )
                          "
                        >
                          {{ Number(record.steps).toNegativeFormat(0) }}
                        </b-td>
                        <b-td>{{ record.transaction_type }}</b-td>
                        <b-td
                          :class="
                            Number(record.quantity).isNegative(
                              'negative_number_color'
                            )
                          "
                        >
                          {{ Number(record.quantity).toNegativeFormat(0) }}
                        </b-td>
                      </b-tr>
                    </b-tbody>
                    <b-tbody v-else class="text-center">
                      <b-tr>
                        <b-td colspan="5">
                          <h5 class="no_results_found">
                            {{ trans('no_results_found') }}
                          </h5>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="col-12">
                <div class="no_stock">
                  <h4>{{ trans('there is no stock for this product') }}</h4>
                </div>
              </div>
            </template>
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
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'

export default {
  name: 'AppProductCard',
  components: { SkeletonLoader },
  props: ['section', 'sections', 'user', 'langs', 'settings'],
  data() {
    return {
      message: '',
      alertType: 'success',
      stock: [],
      strings: [],
      loaded: false,
      main_inventory: null,
      main_inventory_title: '',
    }
  },
  mounted() {
    window.scrollTo(0, 0)

    this.getQuery()
  },
  methods: {
    spliceText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength)
      } else {
        return text
      }
    },
    getQuery() {
      this.main_inventory = localStorage.getItem('ProductCardInventory')
      console.log(this.main_inventory)

      return this.refresh()
    },
    refresh() {
      axios
        .get(
          `/api/products-card/${this.$route.params.serial}?inventory_id=${this.main_inventory}&with_history=1`
        )
        .then(res => {
          if (res.data.status) {
            this.stock = res.data.body.stock

            this.loaded = true
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
<style scoped>
.card-intro {
  background: #fff;
  box-shadow: 0px 1px 4px #0000001a;
  border-radius: 10px;
  padding: 10px 29px;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  text-decoration: none;
}

.no_stock {
  background: #f6f6f6;
  margin-top: 10px;
  text-align: center;
  padding: 12px;
  color: #c41111;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>
