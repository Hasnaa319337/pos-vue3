<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-header header-sm mb-3 d-flex justify-content-between align-items-center">
          <h4 class="card-title" v-if="language">
            {{ trans('providers') }}
          </h4>

          <div class="btns_header">
            <b-button @click="searchOn = !searchOn" variant="primary">
              <i class="bi bi-search"></i>
            </b-button>
            <button class="btn btn-primary" @click="exportFile('xlsx')">
              <font-awesome-icon icon="fa-solid fa-download" />
            </button>
            <button class="btn btn-primary" @click="exportFile('pdf')">
              <font-awesome-icon icon="fa-solid fa-file-pdf" />
            </button>
            <router-link
              class="btn btn-success btn-md"
              v-if="permissions.includes('create_provider')"
              to="/providers/add"
            >
              <i class="bi bi-plus-lg"></i>
            </router-link>
            <go-back-button />
          </div>
        </div>
        <div class="card-body" v-if="permissions.includes('view_provider')">
          <b-row class="mx-0">
            <b-col cols="12" md="12">
              <b-row v-if="searchOn">
                <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                  <b-form @submit.prevent="handleSubmit(filter(EditMode))" @reset.prevent="reset">
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
                            type="number"
                            class="form-control"
                            v-model="filters.phone"
                            :placeholder="trans('phone')"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="12" md="4">
                        <b-form-group>
                          <b-form-input
                            type="number"
                            class="form-control"
                            v-model="filters.tax_num"
                            :placeholder="trans('tax_num')"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="12" class="text-center search-btns">
                        <b-button variant="success" type="submit" class="mr-2">
                          <font-awesome-icon icon="fa-solid fa-filter" />
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
                  class="white-nowrap"
                  sticky-header
                  striped
                  bordered
                  responsive
                  style="min-height: 50px"
                >
                  <GlobalTabel :columns="columns" />
                  <table-skeleton-loader
                    v-if="skeletonLoading"
                    :items="10"
                    :length="columns.length"
                  />
                  <b-tbody class="text-center" v-else>
                    <b-tr v-for="provider in providers" :key="provider.id">
                      <b-td>
                        {{ provider.name }}
                      </b-td>

                      <b-td>{{ provider.phone }}</b-td>
                      <b-td>{{ provider.tax_num }}</b-td>
                      <b-td>{{ provider.address }}</b-td>
                      <b-td>{{ provider.created_by.name }}</b-td>
                      <b-td>{{ Number(provider.debit_balance).toNegativeFormat() }}</b-td>
                      <b-td>{{ Number(provider.credit_balance).toNegativeFormat() }}</b-td>

                      <b-td>{{ provider.created_at }}</b-td>
                      <b-td>
                        <router-link
                          :to="'/providers/edit/' + provider.id"
                          v-if="permissions.includes('update_provider')"
                          v-b-tooltip.hover
                          :title="trans('edit')"
                          style="cursor: pointer; color: #007bff !important"
                          class="mx-2"
                          @click="edit(provider)"
                        >
                          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                        </router-link>
                        <a
                          v-if="permissions.includes('delete_provider')"
                          v-b-tooltip.hover
                          :title="trans('delete')"
                          style="cursor: pointer; color: #dc3545 !important"
                          class="mx-2"
                          @click="Delete(provider)"
                        >
                          <font-awesome-icon icon="fa-solid fa-trash" />
                        </a>
                        <ActionButton
                          v-if="permissions.includes('view_action_event_provider')"
                          :id="provider.id"
                          :resource_name="'provider'"
                        />
                      </b-td>
                    </b-tr>
                    <b-tr>
                      <b-td
                        style="font-size: 18px; font-weight: bold; background: #f6f6f6 !important"
                        colspan="5"
                        >{{ trans('total') }}
                      </b-td>
                      <b-td
                        style="font-size: 14px; font-weight: bold; background: #f6f6f6 !important"
                      >
                        {{ this.total_debit.toNegativeFormat() }}
                        <br />
                        {{ getSetting('currency', settings) }}
                      </b-td>
                      <b-td
                        style="font-size: 14px; font-weight: bold; background: #f6f6f6 !important"
                      >
                        {{ this.total_credit.toNegativeFormat() }}
                        <br />
                        {{ getSetting('currency', settings) }}
                      </b-td>
                      <b-td style="background: #f6f6f6 !important"></b-td>
                      <b-td style="background: #f6f6f6 !important"></b-td>
                    </b-tr>
                  </b-tbody>

                  <b-tbody class="text-center" v-if="tableLoaded && !providers.length">
                    <b-tr class="text-center">
                      <b-td colspan="8">
                        <h5 class="no_results_found">
                          {{ trans('no_results_found') }}
                        </h5>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-row>
            </b-col>
          </b-row>
          <div class="col-sm-12 text-center" v-if="!skeletonLoading">
            <pagination-component
              :items="providers"
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
</template>
<style>
tr.select-provider {
  border: 1px solid #000;
  background-color: #077b53 !important;
  height: 60px;
}

.search-btns button {
  margin-bottom: 16px;
}
</style>
<script>
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'

export default {
  name: 'AppProviders',
  props: ['section', 'sections', 'user', 'user_language', 'settings', 'permissions', 'language'],
  data() {
    return {
      columns: [
        'name',
        'phone',
        'tax_num',
        'address',
        'added_by',
        'debit',
        'credit',
        'created_at',
        'options'
      ],
      skeletonLoading: true,

      providers: [],
      total_debit: 0,
      total_credit: 0,
      total: '',
      current_page: '',
      prev_page: '',
      next_page: '',
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      last_page: '',
      strings: [],
      provider: {
        translation: {
          name: {
            en: '',
            ar: ''
          }
        },
        tax_num: '',
        address: '',
        phone: '',
        tax_num: ''
      },
      filters: {},
      EditMode: 0,
      tableLoaded: false,
      searchOn: false
    }
  },
  components: {
    PaginationComponent,
    SkeletonLoader,
    TableSkeletonLoader
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    exportFile(type) {
      let url = 'api/providers-export/' + type
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
    filter(editMode) {
      let str = ''
      for (var key in this.filters) {
        if (this.filters[key] == '') continue
        if (str != '') {
          str += '&'
        }
        str += 'search' + '=' + this.filters[key]
      }
      let url = '/api/providers?' + str
      this.refresh(url)
    },
    refresh(url = '/api/providers') {
      this.tableLoaded = false
      axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false
          this.providers = res.data.body.providers.data
          this.total_debit = res.data.body.total_debit_balance
          this.total_credit = res.data.body.total_credit_balance

          this.total = res.data.body.providers.paginate.total
          this.current_page = res.data.body.providers.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.providers.paginate.next_page_url
          this.prev_page_url = res.data.body.providers.paginate.prev_page_url
          this.first_page_url = res.data.body.providers.paginate.first_page_url
          this.last_page_url = res.data.body.providers.paginate.last_page_url
          this.last_page = res.data.body.providers.paginate.last_page

          this.tableLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    edit(provider) {
      console.log('edit modeeee')
      this.EditMode = 1
      this.provider = this.cloneItem(provider)
    },
    goTo(url) {
      this.skeletonLoading = true
      this.reports = []
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
      axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false
          this.providers = res.data.body.providers.data
          this.total_debit = res.data.body.total_debit_balance
          this.total_credit = res.data.body.total_credit_balance

          this.total = res.data.body.providers.paginate.total
          this.current_page = res.data.body.providers.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.providers.paginate.next_page_url
          this.prev_page_url = res.data.body.providers.paginate.prev_page_url
          this.first_page_url = res.data.body.providers.paginate.first_page_url
          this.last_page_url = res.data.body.providers.paginate.last_page_url
          this.last_page = res.data.body.providers.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    store() {
      let uri = this.EditMode ? '/api/providers/' + this.provider.id : '/api/providers'

      let method = this.EditMode ? 'put' : 'post'
      let data = {
        name: {
          ar: this.provider.translation.name.ar,
          en: this.provider.translation.name.en
        },
        tax_num: this.provider.tax_num,
        phone: this.provider.phone,
        address: this.provider.address
      }
      axios[method](uri, data)
        .then(
          (res) => {
            this.showToastError(res.data.message, res.data.custom_code)

            this.providers.push(res.data.body.provider)
            ;(this.provider = {
              translation: {
                name: {
                  en: '',
                  ar: ''
                }
              },
              tax_num: '',
              address: '',
              phone: '',
              tax_num: ''
            }),
              this.refresh()
            this.$nextTick(() => {
              this.$refs.form.reset()
            })
          },
          (error) => {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          }
        )
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    Delete(provider) {
      this.$bvModal
        .msgBoxConfirm(this.trans('Do you want to delete this provider'), {
          okTitle: this.language === 'en' ? 'Yes' : 'نعم',
          cancelTitle: this.language === 'en' ? 'No' : 'لا',
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal'
        })
        .then((value) => {
          if (value) {
            axios
              .delete('/api/providers/' + provider.id + '', { provider })
              .then((res) => {
                if (res.data.status) {
                  this.showToastError(res.data.message, res.data.custom_code)
                  this.providers = this.providers.filter((x) => {
                    return x.id != provider.id
                  })
                } else {
                  this.showToastError(res.data.message, res.data.custom_code)
                }
              })
              .catch((error) => {
                this.showToastError(error.response.data.message, error.response.data.custom_code)
              })
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    reset() {
      this.filters = {}
      this.$refs.form.reset()
      this.refresh()
    }
  }
}
</script>

<style>
.white-nowrap tr th {
  white-space: nowrap !important;
}
</style>
