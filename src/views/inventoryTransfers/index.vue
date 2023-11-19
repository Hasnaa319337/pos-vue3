<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title" v-if="language">
          {{ trans('direct_inventory_transfers') }}
        </h4>
        <div class="dropdown btns_header" style="text-align: end">
          <router-link
            class="btn btn-success btn-md"
            v-if="permissions.includes('create_inventory_transfer')"
            to="/inventory-transfers/add"
          >
            <i class="bi bi-plus-lg"></i>
          </router-link>
          <GoBackButton />
        </div>
      </div>

      <div class="card-body" v-if="permissions.includes('view_any_inventory_transfer')">
        <div v-if="searchOn" class="row m-0 align-items-center justify-content-between mb-4">
          <ValidationObserver v-slot="{ handleSubmit }" class="w-100" ref="form">
            <b-form @submit.prevent="handleSubmit(filter)" @reset.prevent="reset">
              <b-form-row>
                <b-col cols="12" md="3">
                  <b-form-group :label="trans('serial')">
                    <b-form-input type="text" v-model="filters.serial"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="3">
                  <b-form-group :label="trans('title')">
                    <b-form-input type="text" v-model="filters.title"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group :label="trans('category')">
                    <multiselect
                      v-model="categoryObject"
                      :placeholder="trans('choose category')"
                      label="title"
                      :multiple="true"
                      :close-on-select="false"
                      track-by="title"
                      :options="categories"
                    >
                      <template>
                        <span class="option__title">{{ props.option.title }}</span>
                      </template>
                      <template>
                        <span class="option__title">{{ props.option.title }}</span>
                      </template>
                    </multiselect>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="2">
                  <b-form-group :label="trans('per_page')">
                    <b-form-input
                      type="number"
                      v-model="filters.per_page"
                      @keypress="isNumber($event)"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-form-row class="justify-content-center">
                <b-button variant="success" type="submit" class="mr-2">
                  <font-awesome-icon icon="fa-solid fa-filter" />
                  {{ trans('filter') }}
                </b-button>
                <b-button variant="warning" type="reset" class="mr-2">
                  <font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                  {{ trans('reset_search') }}
                </b-button>
              </b-form-row>
            </b-form>
          </ValidationObserver>
        </div>

        <div class="" v-if="permissions.includes('view_product')">
          <div class="align-items-center justify-content-between mb-4">
            <div>
              <div
                v-if="errorValidationImport.length > 0"
                style="background: #cd0808; padding: 20px; border-radius: 4px; color: #fff"
              >
                <h4>{{ trans('there is error validation in import') }}</h4>
                <span class="d-block" v-for="err in errorValidationImport" :key="err">
                  {{ trans(err.attribute) }} - {{ trans('row') }} ({{ err.row }}) -
                  <span v-for="val in err.errors" :key="val">{{ val }}</span>
                </span>
              </div>
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
                  <b-tr v-for="(inv, index) in inventory_transfers" :key="index">
                    <b-td>
                      {{ inv.id }}
                    </b-td>
                    <b-td>{{ inv.from_inventory.title }}</b-td>
                    <b-td>{{ inv.to_inventory.title }}</b-td>
                    <b-td>{{ inv.quantity }}</b-td>
                    <b-td
                      style="
                        text-align: cevter !important;
                        padding: 11px !important;
                        display: block;
                      "
                    >
                      <span
                        class="status_span"
                        :style="{
                          background: inv.status.color.hexadecimal
                        }"
                      ></span>
                      {{ trans(inv.status.value) }}</b-td
                    >
                    <b-td>{{ inv.created_at }}</b-td>
                    <b-td>{{ inv.created_by.name }}</b-td>

                    <b-td :class="Number(inv.total_cost).isNegative('negative_number_color')">
                      {{ Number(inv.total_cost).toNegativeFormat(0) }}<br />
                      {{ getSetting('currency', settings) }}
                    </b-td>

                    <b-td>
                      <router-link
                        style="font-size: 16px"
                        :to="'/inventory-transfer/inventory-transfers/' + inv.id"
                      >
                        <font-awesome-icon icon="fa-solid fa-eye" />
                      </router-link>
                      <ActionButton
                        v-if="permissions.includes('view_action_event_inventory_transfer')"
                        :id="inv.id"
                        :resource_name="'inventory_transfer'"
                      />
                    </b-td>
                    <!-- 
                    <b-td class="btns">
                      <router-link
                        v-b-tooltip.hover
                        :title="trans('edit')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        v-if="permissions.includes('update_inventory_transfer')"
                        :to="'/inventory-transfers/edit/' + inv.id"
                      >
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                      </router-link>

                      <a
                        v-b-tooltip.hover
                        :title="trans('delete')"
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2"
                        v-if="permissions.includes('delete_inventory_transfer')"
                        @click="Delete(inv.id)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash " />
                      </a>
                    </b-td> -->
                  </b-tr>
                </b-tbody>
                <b-tbody v-if="itemsLoaded && !products.length" class="text-center">
                  <b-tr>
                    <b-td colspan="12">
                      <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
            <div class="col-sm-12 text-center" v-if="!skeletonLoading">
              <pagination-component
                :items="inventory_transfers"
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

    <move-stock></move-stock>
    <barcode></barcode>
    <import-products></import-products>
  </div>
</template>
<style scoped>
.table td img.thumb-image,
.table th img.thumb-image {
  width: 50px;
  max-height: 50px;
  /* border: 1px solid #dee2e6; */
}
</style>
<script>
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'

export default {
  name: 'AppProducts',
  components: {
    PaginationComponent,
    TableSkeletonLoader
  },
  props: [
    'section',
    'sections',
    'user',
    'user_language',
    'langs',
    'permissions',
    'settings',
    'language'
  ],
  data() {
    return {
      columns: [
        'id',
        'request_from_inventory',
        'to_inventory',
        'quantity',
        'request_status',
        'request_date',
        'request_responsible',
        'total',
        'options'
      ],
      inventory_transfers: [],
      paginate: {},
      categories: [],

      filters: {
        per_page: 10,
        category_id: []
      },

      total_initial_cost: 0,
      total_avg_cost: 0,
      total_average_cost: 0,
      total_quantity: 0,
      total: 0,
      inventories: [],

      last_page: 0,

      usingFilters: false,
      categoryObject: '',
      searchOn: false,
      errorValidationImport: [],
      skeletonLoading: true,
      itemsLoaded: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()

    this.getCategories()
  },
  methods: {
    reset() {
      this.usingFilters = false
      this.filters = {
        per_page: 10,
        category_id: []
      }
      this.refresh()
    },
    filter() {
      if (this.categoryObject.length > 0) {
        for (let i = 0; i < this.categoryObject.length; i++) {
          this.filters.category_id.push(this.categoryObject[i].id)
        }
      }
      this.usingFilters = true
      this.refresh()
    },
    getCategories() {
      this.axios
        .get('/api/product-categories')
        .then((res) => {
          this.categories = res.data.body.categories.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    refresh() {
      this.axios
        .get('api/inventory-transfer/inventory-transfers')
        .then((res) => {
          this.skeletonLoading = false
          this.itemsLoaded = false
          this.inventory_transfers = res.data.body.inventory_transfers.data
          this.paginate = res.data.body.inventory_transfers.paginate
          this.total = res.data.body.inventory_transfers.paginate.total
          this.current_page = res.data.body.inventory_transfers.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.inventory_transfers.paginate.next_page_url
          this.prev_page_url = res.data.body.inventory_transfers.paginate.prev_page_url
          this.first_page_url = res.data.body.inventory_transfers.paginate.first_page_url
          this.last_page_url = res.data.body.inventory_transfers.paginate.last_page_url
          this.last_page = res.data.body.inventory_transfers.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    goTo(url) {
      this.skeletonLoading = true
      this.products = []
      if (this.usingFilters) {
        let str = ''
        for (var key in this.filters) {
          if (this.filters[key] == '') continue
          if (str != '') {
            str += '&'
          }
          str += key + '=' + this.filters[key]
        }
        url = url.includes('?') ? url + '&' + str : url + '?' + str
      }

      this.axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false
          this.inventory_transfers = res.data.body.inventory_transfers.data
          this.paginate = res.data.body.inventory_transfers.paginate
          this.total = res.data.body.inventory_transfers.paginate.total
          this.current_page = res.data.body.inventory_transfers.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.inventory_transfers.paginate.next_page_url
          this.prev_page_url = res.data.body.inventory_transfers.paginate.prev_page_url
          this.first_page_url = res.data.body.inventory_transfers.paginate.first_page_url
          this.last_page_url = res.data.body.inventory_transfers.paginate.last_page_url
          this.last_page = res.data.body.inventory_transfers.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    Delete(id) {
      this.$bvModal
        // trans
        .msgBoxConfirm(this.trans('Do you want to delete this inventory transfer'), {
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
            this.axios.delete('/api/inventory-transfer/inventory-transfers/' + id).then((res) => {
              if (res.data.status) {
                this.showToastError(res.data.message, res.data.custom_code)
                this.inventory_transfers = this.inventory_transfers.filter((x) => {
                  return x.id != id
                })
              } else {
                this.showToastError(res.data.message, res.data.custom_code)
              }
            })
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    }
  }
}
</script>
<style scoped>
.table-container {
  max-height: unset !important;
}

td {
  text-align: center;
}
</style>
