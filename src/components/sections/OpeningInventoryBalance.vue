<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card pt-3">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title">{{ trans('opining_inventory_balance') }}</h4>
          <div class="dropdown">
            <!-- هنرجعله -->
            <!-- <b-button class="btn btn-primary" v-b-modal.modal-1>
              {{ trans('import_excel_file') }}
            </b-button> -->

            <!-- <download-excel class="btn btn-success print-hidden" :name="'initial-balance.xls'"
                            :data="items">
                            تصدير ملف اكسل
                            <font-awesome-icon icon="fa-solid fa-download" />
                        </download-excel> -->

            <button class="btn btn-primary" @click="exportFile">
              {{ trans('DownLoad_Sample') }}
            </button>
            <GoBackButton />
          </div>
        </div>

        <b-modal id="modal-1" :title="trans('import_files')">
          <b-form class="mt-5 mb-5">
            <b-form-file class="mb-5" ref="file" name="file" accept=".xlsx" required></b-form-file>

            <b-button type="submit" class="sub" @click="submitForm"
              >{{ trans('file_upload') }}
            </b-button>
            <a class="download" href="https://api-dev.7lpos.com/template/excel/initial_stock.xlsx">
              {{ trans('download_excel_file') }}
              <font-awesome-icon icon="fa-solid fa-download" />
            </a>
          </b-form>
        </b-modal>

        <div class="card-body">
          <div class="align-items-center row mx-0 justify-content-between mb-4">
            <div class="col-sm-12">
              <b-row v-if="searchOn">
                <h3>{{ trans('search') }}</h3>
                <ValidationObserver v-slot="{ handleSubmit }" ref="searchForm">
                  <b-form @submit.prevent="handleSubmit(filter(editMode))" @reset.prevent="reset">
                    <b-form-row>
                      <b-col cols="12" md="4">
                        <b-form-group>
                          <b-form-input
                            type="text"
                            class="form-control"
                            v-model="filters.name"
                            :placeholder="trans('name')"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="12" md="4">
                        <b-form-group>
                          <b-form-input
                            type="text"
                            class="form-control"
                            v-model="filters.phone"
                            :placeholder="trans('phone')"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="12" md="4">
                        <b-form-group>
                          <b-form-input
                            type="text"
                            class="form-control"
                            v-model="filters.tax_num"
                            :placeholder="trans('tax_num')"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="12" class="text-center mb-3">
                        <b-button variant="success" type="submit" class="mr-2">
                          <font-awesome-icon icon="fa-solid fa-filter " />
                          {{ trans('search') }}
                        </b-button>
                        <b-button variant="warning" type="reset" class="mr-2">
                          <font-awesome-icon icon="fa-solid fa-arrows-rotate " />
                          {{ trans('reset_search') }}
                        </b-button>
                      </b-col>
                    </b-form-row>
                  </b-form>
                </ValidationObserver>
              </b-row>
              <b-row>
                <b-table-simple
                  id="my-table2"
                  :items="items"
                  :per-page="per_page"
                  :current-page="current_page"
                  sticky-header
                  striped
                  bordered
                  responsive
                  style="min-height: 50px"
                >
                  <GlobalTabel :columns="columns" />
                  <TableSkeletonLoader
                    :items="10"
                    :length="columns.length"
                    v-if="skeletonLoading"
                  />
                  <b-tbody class="text-center" v-else>
                    <b-tr v-for="(balance, index) in balances" :key="index">
                      <b-td>{{ balance.inventory.title }} </b-td>
                      <b-td
                        ><span>{{ balance.product.serial }}</span>
                      </b-td>
                      <b-td>{{ balance.product.title }} </b-td>
                      <b-td
                        :class="Number(balance.initial_cost).isNegative('negative_number_color')"
                        >{{ Number(balance.initial_cost).toNegativeFormat() }}
                      </b-td>

                      <b-td
                        :class="Number(balance.initial_amount).isNegative('negative_number_color')"
                        >{{ Number(balance.initial_amount).toNegativeFormat() }}
                      </b-td>

                      <b-td
                        :class="
                          Number(balance.initial_cost_balance).isNegative('negative_number_color')
                        "
                        >{{ Number(balance.initial_cost_balance).toNegativeFormat() }}
                      </b-td>

                      <!-- <b-td
                        :class="
                          Number(balance.total_cost_balance).isNegative(
                            'negative_number_color'
                          )
                        "
                      >
                        {{
                          Number(balance.total_cost_balance).toNegativeFormat()
                        }}
                        
                      </b-td> -->
                    </b-tr>
                    <b-tr variant="dark" style="padding: 20px 0 !important">
                      <b-td style="border: 1px solid #ddd">{{ trans('total') }}</b-td>
                      <b-td></b-td>

                      <b-td
                        style="border: 1px solid #ddd"
                        :class="Number(total_products).isNegative('negative_number_color')"
                        >{{ Number(total_products).toNegativeFormat() }}
                        {{ trans('item') }}
                      </b-td>

                      <b-td
                        style="border: 1px solid #ddd"
                        :class="Number(total_initial_cost).isNegative('negative_number_color')"
                        >{{ Number(total_initial_cost).toNegativeFormat() }}
                        {{ getSetting('currency', settings) }}
                      </b-td>

                      <b-td
                        style="border: 1px solid #ddd"
                        :class="Number(total_initial_amount).isNegative('negative_number_color')"
                        >{{ Number(total_initial_amount).toNegativeFormat() }}
                        {{ trans('item') }}
                      </b-td>

                      <b-td
                        style="border: 1px solid #ddd"
                        :class="
                          Number(total_initial_cost_balance).isNegative('negative_number_color')
                        "
                        >{{ Number(total_initial_cost_balance).toNegativeFormat() }}
                        {{ getSetting('currency', settings) }}
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-row>
              <div class="row mt-5 justify-content-center"></div>

              <div class="row mt-5 justify-content-center">
                <div class="col-sm-12 text-center">
                  <pagination-component
                    v-if="!skeletonLoading"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableSkeletonLoader from '../global/TableSkeletonLoader.vue'
import PaginationComponent from '../global/PaginationComponent.vue'

export default {
  name: 'OpeningInventoryBalance',
  components: { PaginationComponent, TableSkeletonLoader },
  props: ['permissions', 'section', 'user', 'langs', 'settings'],
  data() {
    return {
      columns: [
        'inventory',
        'item_no',
        'item_name',
        'initial cost',
        'initial_amount',
        'initial balance total'
      ],

      last_page: '',

      filter: {
        per_page: 10
      },
      strings: '',
      balances: '',
      total_product: '',
      total_initial_balance: '',
      total: '',
      current_page: '',
      last_page_url: '',
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      next_page: '',
      prev_page: '',

      items: [],

      per_page: '',
      messageFile: '',
      eventFile: null,
      selectedFile: null,
      msg: null,
      base64: null,
      export_fields: {
        'stock id': 'id',
        balance: 'c_name'
      },
      exFile: '',
      total_products: '',
      total_initial_cost_balance: '',
      total_initial_cost: '',
      total_initial_amount: '',
      skeletonLoading: true
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    this.getTotals()
  },
  methods: {
    getTotals() {
      this.axios.get('/api/stock/initial-stock-total ').then((res) => {
        this.total_initial_amount = res.data.body.total_initial_amount
        this.total_initial_cost = res.data.body.total_initial_cost
        this.total_initial_cost_balance = res.data.body.total_initial_cost_balance
        this.total_products = res.data.body.total_product
      })
    },
    refresh() {
      let url = 'api/stock/initial-stock'
      this.axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false

          this.total = res.data.body.initial.paginate.total
          this.current_page = res.data.body.initial.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.initial.paginate.next_page_url
          this.prev_page_url = res.data.body.initial.paginate.prev_page_url
          this.first_page_url = res.data.body.initial.paginate.first_page_url
          this.last_page_url = res.data.body.initial.paginate.last_page_url
          this.last_page = res.data.body.initial.paginate.last_page
          this.items = res.data.body.initial
          this.balances = res.data.body.initial.data
          this.total_product = res.data.body.total_product
          this.total_initial_balance = res.data.body.total_initial_balance
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    goTo(url) {
      this.balances = []
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
      this.itemsLoaded = false
      this.axios
        .get(url)
        .then((res) => {
          this.balances = res.data.body.initial.data
          this.total = res.data.body.initial.paginate.total
          this.current_page = res.data.body.initial.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.initial.paginate.next_page_url
          this.prev_page_url = res.data.body.initial.paginate.prev_page_url
          this.first_page_url = res.data.body.initial.paginate.first_page_url
          this.last_page = res.data.body.initial.paginate.last_page
          this.last_page_url = res.data.body.initial.paginate.last_page_url
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    exportFile() {
      let url = 'api/stock/export-initial-stock'
      this.axios
        .get(url, {
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          },
          responseType: 'arraybuffer'
        })
        .then((response) => {
          console.log(response.data)

          const url = window.URL.createObjectURL(new Blob([response.data]))

          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'initial_stock.xlsx')
          document.body.appendChild(link)
          link.click()
        })
    }
  },

  submitForm() {
    this.formData = new FormData()
    this.formData.append('name', this.fileName)
    this.formData.append('excel_file', this.$refs.file.files[0])

    this.axios
      .post('api/stock/import-initial-stock', this.formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
      .then((response) => {
        console.log('handle success response', response)
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style>
.btns {
  gap: 5px;
}

.download {
  border-radius: 8px !important;
  background: #fff;
  font-weight: 600;
  padding: 5px 10px;
  text-decoration: none !important;
  transition: 0.5s;
  border: 1px solid #007bff;
}

.download:hover {
  color: #fff;
  background: linear-gradient(0deg, rgb(93, 197, 224) 0%, rgb(19, 123, 151) 100%) 0% 0% no-repeat
    padding-box padding-box transparent;
}

.sub {
  color: #fff;
  background: linear-gradient(0deg, rgb(93, 197, 224) 0%, rgb(19, 123, 151) 100%) 0% 0% no-repeat
    padding-box padding-box transparent;
}
</style>
