<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title" v-if="language">{{ trans('products') }}</h4>
        <div class="dropdown btns_header" style="text-align: end">
          <router-link
            class="btn btn-success btn-md"
            v-if="permissions.includes('create_product')"
            to="/products/add"
          >
            <i class="bi bi-plus-lg"></i>
          </router-link>
          <b-button @click="openImportProductsModal" variant="primary">
            <font-awesome-icon icon="fa-solid fa-upload" />
          </b-button>
          <b-button @click="searchOn = !searchOn" variant="primary">
            <i class="bi bi-search"></i>
          </b-button>
          <button class="btn btn-primary" @click="exportFile('xlsx')">
            <font-awesome-icon icon="fa-solid fa-download" />
          </button>
          <button class="btn btn-primary" @click="exportFile('pdf')">
            <font-awesome-icon icon="fa-solid fa-file-pdf" />
          </button>
          <GoBackButton />
        </div>
      </div>

      <div class="card-body" v-if="permissions.includes('view_any_product')">
        <div v-if="searchOn" class="row m-0 align-items-center justify-content-between mb-4">
          <ValidationObserver v-slot="{ handleSubmit }" class="w-100" ref="form">
            <b-form @submit.prevent="handleSubmit(filter)" @reset.prevent="reset">
              <b-form-row>
                <b-col cols="12" md="2">
                  <b-form-group :label="trans('serial')">
                    <b-form-input
                      style="border-radius: 4px !important; height: 34px; border-color: #ccc"
                      type="text"
                      v-model="filters.serial"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="2">
                  <b-form-group :label="trans('name')">
                    <b-form-input
                      style="border-radius: 4px !important; height: 34px; border-color: #ccc"
                      type="text"
                      v-model="filters.title"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="2">
                  <b-form-group :label="trans('category')">
                    <v-select
                      v-model="filters.category_id"
                      :dir="language == 'ar' ? rtl : ltr"
                      :value="index"
                      label="title"
                      :options="categories"
                      :reduce="(option) => option.id"
                    >
                    </v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="2">
                  <b-form-group :label="trans('inventory')">
                    <v-select
                      :options="inventories"
                      label="title"
                      v-model="filters.inventory_id"
                      :reduce="(option) => option.id"
                      :dir="language === 'ar' ? 'rtl' : 'ltr'"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="2">
                  <b-form-group :label="trans('expired')">
                    <input
                      style="
                        border-radius: 4px !important;
                        height: 34px;
                        border-color: #ccc;
                        width: 23px;
                        height: 20px;
                        margin-top: 6px;
                      "
                      type="checkbox"
                      v-model="filters.expired"
                    />
                  </b-form-group>
                </b-col>
              </b-form-row>
              <b-row style="justify-content: center">
                <b-col cols="12" md="1" style="margin-top: 30px">
                  <b-button variant="success" type="submit" class="mr-2">
                    {{ trans('filter') }}
                  </b-button>
                </b-col>
                <b-col cols="12" md="2" style="margin-top: 30px">
                  <b-button variant="warning" type="reset" class="mr-2">
                    <font-awesome-icon icon="fa-solid fa-arrows-rotate" />
                    {{ trans('reset_search') }}
                  </b-button>
                </b-col>
              </b-row>
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
                  <b-tr v-for="(product, index) in products" :key="index">
                    <b-td>
                      <b-img
                        :src="product.image ? product.image : getSetting('default_image')"
                        width="100"
                        class="img-responsive thumb-image mx-auto"
                        alt=""
                      ></b-img>
                    </b-td>
                    <b-td style="max-width: 180px !important">
                      {{ spliceText(product.serial, '10') }}</b-td
                    >
                    <!-- v-if="language == 'en'" -->
                    <b-td class="name">{{ spliceText(product.title, '10') }} </b-td>
                    <b-td class="name" style="max-width: 100px !important"
                      ><span v-if="product.category">
                        {{ product.category.title }}
                      </span>
                    </b-td>

                    <b-td :class="Number(product.cost).isNegative('negative_number_color')">
                      {{ Number(product.cost).toNegativeFormat(0) }}
                    </b-td>

                    <b-td :class="Number(product.avg_cost).isNegative('negative_number_color')">
                      {{ Number(product.avg_cost).toNegativeFormat(0) }}
                    </b-td>

                    <b-td :class="Number(product.last_cost).isNegative('negative_number_color')">
                      {{ Number(product.last_cost).toNegativeFormat(0) }}
                    </b-td>

                    <b-td :class="Number(product.price).isNegative('negative_number_color')">
                      {{ Number(product.price).toNegativeFormat(0) }}
                    </b-td>

                    <b-td :class="Number(product.sale_price).isNegative('negative_number_color')">
                      {{ Number(product.sale_price).toNegativeFormat(0) }}
                    </b-td>

                    <b-td :class="Number(product.quantity).isNegative('negative_number_color')">
                      {{ Number(product.quantity).toNegativeFormat(0) }}
                    </b-td>

                    <b-td>{{ product.expiration_date }}</b-td>
                    <b-td class="btns">
                      <router-link
                        v-b-tooltip.hover
                        :title="trans('edit')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        v-if="permissions.includes('update_product')"
                        :to="'/products/edit/' + product.id"
                      >
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                      </router-link>
                      <router-link
                        v-b-tooltip.hover
                        :title="trans('Product_card')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        :to="{
                          path: '/products-card/' + product.serial
                        }"
                      >
                        <button @click="printInventory(product.inventory.id)">
                          <font-awesome-icon icon="fa-solid fa-info" />
                        </button>
                      </router-link>

                      <router-link
                        v-b-tooltip.hover
                        :title="trans('variations')"
                        style="cursor: pointer; color: #ffc107 !important"
                        class="mx-2"
                        v-if="product.has_attributes && permissions.includes('edit_attributes')"
                        :to="'/variations/' + product.id"
                      >
                        <font-awesome-icon icon="fa-solid fa-filter" />
                      </router-link>

                      <a
                        v-b-tooltip.hover
                        :title="trans('Print_Barcode')"
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2"
                        @click="openBarcodeModal(product)"
                      >
                        <font-awesome-icon icon="fa-solid fa-barcode" />
                      </a>
                      <ActionButton
                        v-if="permissions.includes('view_action_event_product')"
                        :id="product.id"
                        :resource_name="'product'"
                      />
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-if="products.length">
                  <b-tr>
                    <b-td
                      style="background: #f6f6f6 !important; font-size: 17px; font-weight: bold"
                      >{{ trans('total') }}</b-td
                    >
                    <b-td style="background: #f6f6f6 !important"></b-td>
                    <b-td style="background: #f6f6f6 !important"></b-td>
                    <b-td style="background: #f6f6f6 !important"></b-td>

                    <b-td
                      :class="Number(total_initial_cost).isNegative('negative_number_color')"
                      style="font-size: 17px; font-weight: bold; background: #f6f6f6 !important"
                    >
                      {{ Number(total_initial_cost).toNegativeFormat(0) }}<br />
                      {{ getSetting('currency', settings) }}
                    </b-td>

                    <b-td style="background: #f6f6f6 !important">
                      <!-- {{ total_average_cost }} <br />
                      {{
                       getSetting('currency', settings)
                      }} -->
                    </b-td>
                    <b-td style="background: #f6f6f6 !important"></b-td>

                    <b-td
                      style="font-size: 17px; font-weight: bold; background: #f6f6f6 !important"
                    ></b-td>
                    <b-td style="background: #f6f6f6 !important"></b-td>
                    <b-td
                      style="background: #f6f6f6 !important; font-size: 17px; font-weight: bold"
                      :class="Number(total_quantity).isNegative('negative_number_color')"
                    >
                      {{ Number(total_quantity).toNegativeFormat(0) }}
                    </b-td>
                    <b-td style="background: #f6f6f6 !important"></b-td>
                    <b-td style="background: #f6f6f6 !important"></b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody
                  v-if="!skeletonLoading && itemsLoaded && !products.length"
                  class="text-center"
                >
                  <b-tr>
                    <b-td colspan="12">
                      <h5 class="no_results_found">
                        {{ trans('no_results_found') }}
                      </h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>

            <div class="col-sm-12 text-center" v-if="!skeletonLoading">
              <pagination-component
                :items="products"
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
    <!-- <barcode></barcode> -->
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
// import Barcode from '@/components/sections/modals/Barcode.vue'
import ImportProducts from '../../components/sections/modals/ImportProducts.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'

export default {
  name: 'AppProducts',

  components: {
    // Barcode,
    ImportProducts,
    TableSkeletonLoader,
    PaginationComponent
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
        'image',
        'serial',
        'name',
        'category',
        'initial cost',
        'average cost',
        'last cost',
        'sell_price',
        'sale_price',
        'quantity',
        'expiration_date',
        'actions'
      ],
      skeletonLoading: true,

      products: [],
      paginate: {},
      categories: [],
      strings: [],
      filters: {
        per_page: 1,
        category_id: '',
        expired: ''
      },

      total_initial_cost: 0,
      total_avg_cost: 0,
      total_average_cost: 0,
      total_quantity: 0,

      inventories: [],
      total: 0,
      main_inventory: '',

      itemsLoaded: false,
      usingFilters: false,
      categoryObject: '',
      searchOn: false,
      errorValidationImport: []
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.getPtofile()
    this.refresh()

    this.getInventories()
    this.getCategories()
    // this.SharedEvent.listen('close-import-products-modal', (data) => {
    //   if (data) {
    //     this.errorValidationImport = data
    //   }
    //   this.refresh()
    // })
  },
  methods: {
    getSetting: function (key) {
      var result = this.settings.find((el) => {
        if (el.key === key) {
          return el.value
        }
      })

      return result.value
    },
    printInventory(id) {
      localStorage.setItem('ProductCardInventory', id)
    },

    exportFile(type) {
      let url = 'api/products-export/' + type
      this.axios
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
    reset() {
      this.usingFilters = false
      this.filters = {
        per_page: 1,
        category_id: ''
      }
      this.refresh()
    },

    getPtofile() {
      this.axios({
        method: 'get',
        url: '/api/profile'
      }).then((res) => {
        this.main_inventory = res.data.body.user.inventory.id
      })
    },
    getCategories() {
      this.axios
        .get('/api/product-categories')
        .then((res) => {
          this.categories = res.data.body.categories.data
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    refresh() {
      this.itemsLoaded = false

      this.axios({
        method: 'GET',
        url: '/api/products',
        params: {
          barcode: this.filters.serial,
          search: this.filters.title,
          category: this.filters.category_id ? this.filters.category_id : null,
          inventory_id: this.filters.inventory_id ? this.filters.inventory_id : null,
          per_page: this.filters.per_page,
          expired: this.filters.expired
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.products = res.data.body.products.data
          this.paginate = res.data.body.products.paginate
          this.total = res.data.body.products.paginate.total
          this.current_page = res.data.body.products.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.last_page = res.data.body.products.paginate.last_page
          this.next_page_url = res.data.body.products.paginate.next_page_url
          this.prev_page_url = res.data.body.products.paginate.prev_page_url
          this.first_page_url = res.data.body.products.paginate.first_page_url
          this.last_page_url = res.data.body.products.paginate.last_page_url

          if (this.products.length > 0) {
            this.products.forEach((product) => {
              product.main_cost = product.cost * product.quantity
            })
          }

          this.itemsLoaded = true
          this.categoryObject = ''

          return this.getTotals()
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    getTotals() {
      this.axios({
        method: 'GET',
        url: '/api/products-total'
      })
        .then((res) => {
          this.total_initial_cost = res.data.body.total_initial_cost
          this.total_avg_cost = res.data.body.total_avg_cost
          this.total_quantity = res.data.body.total_quantity
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
          this.products = res.data.body.products.data
          this.paginate = res.data.body.products.paginate
          this.total = res.data.body.products.paginate.total
          this.current_page = res.data.body.products.paginate.current_page
          this.last_page = res.data.body.products.paginate.last_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.products.paginate.next_page_url
          this.prev_page_url = res.data.body.products.paginate.prev_page_url
          this.first_page_url = res.data.body.products.paginate.first_page_url
          this.last_page_url = res.data.body.products.paginate.last_page_url
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    Delete(id) {
      this.$dialog
        .confirm(this.trans('Do you want to delete this product'))
        .then((dialog) => {
          this.axios
            .post('/api/products/delete', { id: id })
            .then(
              (res) => {
                if (res.data.status) {
                  this.showToastError(res.data.message, res.data.custom_code)
                  this.products = this.products.filter((x) => {
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
            .catch((error) => {
              this.showToastError(error.response.data.message, error.response.data.custom_code)
            })
        })
        .catch(function () {})
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

    getInventories() {
      this.axios
        .get('/api/inventories')
        .then((res) => {
          this.inventories = res.data.body.inventories.data

          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    openMoveStockModal(product) {
      // let productData = {
      //     product_id: product.id,
      //     from: product.inv_id,
      //     to: this.products[index].target_inv,
      //     quantity: this.products[index].quant,
      // };
      let settings = {
        inventories: this.inventories,
        user: this.user
      }
      // eslint-disable-next-line no-undef
      this.SharedEvent.fire('open-move-stock-modal', {
        product: product,
        settings: settings
      })
    },
    openBarcodeModal(product) {
      let settings = {
        strings: this.strings,
        inventories: this.inventories,
        user: this.user
      }
      this.SharedEvent.fire('open-barcode-modal', {
        product: product,
        settings: settings
      })
    },
    openImportProductsModal(product) {
      let settings = {
        strings: this.strings,
        inventories: this.inventories,
        user: this.user
      }
      this.SharedEvent.fire('open-import-products-modal')
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
