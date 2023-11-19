<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title" v-if="language" v-text="trans('discounts')"></h4>

          <div class="dropdown btns_header" style="text-align: start">
            <router-link
              class="btn btn-success btn-md"
              v-if="permissions.includes('create_discount')"
              to="/discounts/add"
            >
              <i class="bi bi-plus-lg"></i>
            </router-link>
            <b-button
              :style="language == 'en' ? 'right: 0' : 'left: 0'"
              variant="primary"
              class="search-btn"
              @click="searchOn = !searchOn"
            >
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </b-button>
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="row mx-0 align-items-start justify-content-between">
            <b-col v-if="searchOn" cols="12">
              <ValidationObserver ref="searchForm" @submit="refresh()">
                <b-form>
                  <b-form-row>
                    <b-col cols="12" md="4">
                      <b-form-group>
                        <b-form-input
                          type="text"
                          class="form-control"
                          v-model="filters.title"
                          :placeholder="trans('title')"
                        />
                      </b-form-group>
                    </b-col>

                    <b-col cols="12" md="1">
                      <b-form-group style="display: flex">
                        <b-button type="submit"> {{ trans('search') }}</b-button>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="3">
                      <b-form-group>
                        <b-button type="reset" @click="resetForm()">
                          <font-awesome-icon icon="fa-solid fa-arrows-rotate " />
                          {{ trans('clear') }}</b-button
                        >
                      </b-form-group>
                    </b-col>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </b-col>
            <b-col cols="12" md="12" v-if="permissions.includes('view_any_discount')">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <b-th style="border: 2px solid #85c3ff">{{ trans('title') }} (EN)</b-th>
                    <b-th style="border: 2px solid #85c3ff">{{ trans('title') }} (AR)</b-th>
                    <b-th style="border: 2px solid #85c3ff">{{ trans('discount_value') }}</b-th>
                    <b-th style="border: 2px solid #85c3ff"
                      >{{ trans('date') }} {{ trans('discount') }}</b-th
                    >
                    <b-th style="border: 2px solid #85c3ff">{{ trans('options') }}</b-th>
                  </b-tr>
                </b-thead>
                <TableSkeletonLoader :length="5" :items="10" v-if="skeletonLoading" />
                <b-tbody v-else class="text-center">
                  <b-tr v-for="discount in discounts" :key="discount.id">
                    <b-td>{{ discount.translation.title.en }}</b-td>
                    <b-td>{{ discount.translation.title.ar }}</b-td>
                    <b-td
                      >{{
                        discount.type == 'percentage'
                          ? discount.value + ' % '
                          : `${discount.value} ${getSetting('currency', settings)}`
                      }}
                    </b-td>
                    <b-td
                      ><span class="text-center" v-if="discount.is_scheduled">
                        {{ trans('from') }}: {{ discount.date_from }} <br />
                        {{ trans('to') }}: {{ discount.date_to }}
                      </span></b-td
                    >
                    <b-td>
                      <router-link
                        :to="'/discounts/edit/' + discount.id"
                        v-b-tooltip.hover
                        :title="trans('edit')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        v-if="permissions.includes('update_discount')"
                      >
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                      </router-link>

                      <a
                        v-b-tooltip.hover
                        :title="trans('delete')"
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2"
                        v-if="permissions.includes('delete_discount')"
                        @click="Delete(discount.id)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash " />
                      </a>
                      <ActionButton
                        v-if="permissions.includes('view_action_event_discount')"
                        :id="discount.id"
                        :resource_name="'discount'"
                      />
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-if="!skeletonLoading && !discounts.length" class="text-center">
                  <b-tr>
                    <b-td colspan="5">
                      <h5>{{ trans('no_results_found') }}</h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>

              <pagination-component
                v-if="!skeletonLoading"
                :items="discounts"
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
            </b-col>
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
  name: 'AppDiscounts',
  props: [
    'section',
    'sections',
    'language',
    'user',
    'user_language',
    'langs',
    'permissions',
    'settings'
  ],
  components: {
    PaginationComponent,
    TableSkeletonLoader
  },
  data() {
    return {
      searchOn: false,
      skeletonLoading: true,
      dateStr: [],
      date: {},

      discounts: [],
      last_page: 0,
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,

      EditMode: 0,
      loaded: false,
      itemsLoaded: false,
      users: [],
      paginate: {},
      filters: {
        title: ''
      }
    }
  },

  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    refresh() {
      this.loaded = false
      this.itemsLoaded = false
      this.axios({
        method: 'GET',
        url: '/api/discounts',
        params: {
          search: this.filters.title
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.discounts = res.data.body.discounts.data
          this.paginate = res.data.body.discounts.paginate
          this.total = res.data.body.discounts.paginate.total
          this.current_page = res.data.body.discounts.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.discounts.paginate.next_page_url
          this.prev_page_url = res.data.body.discounts.paginate.prev_page_url
          this.first_page_url = res.data.body.discounts.paginate.first_page_url
          this.last_page_url = res.data.body.discounts.paginate.last_page_url
          this.last_page = res.data.body.discounts.paginate.last_page
          this.loaded = true
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    goTo(url) {
      this.skeletonLoading = true
      this.loaded = true
      this.itemsLoaded = true
      this.discounts = []
      this.axios({
        method: 'GET',
        url: url,
        params: {
          search: this.filters.title
        }
      })
        .then((res) => {
          this.skeletonLoading = false
          this.discounts = res.data.body.discounts.data
          this.paginate = res.data.body.discounts.paginate
          this.total = res.data.body.discounts.paginate.total
          this.current_page = res.data.body.discounts.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.discounts.paginate.next_page_url
          this.prev_page_url = res.data.body.discounts.paginate.prev_page_url
          this.first_page_url = res.data.body.discounts.paginate.first_page_url
          this.last_page_url = res.data.body.discounts.paginate.last_page_url
          this.last_page = res.data.body.discounts.paginate.last_page
          this.loaded = true
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    edit(discount) {
      this.EditMode = 1
      this.discount = this.cloneItem(discount)
    },

    Delete(id) {
      this.$bvModal

        .msgBoxConfirm(this.trans('Do you want to delete this discount'), {
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
            this.axios.delete('/api/discounts/' + id).then((res) => {
              if (res.data.status) {
                this.showToastError(res.data.message, res.data.custom_code)
                this.$refs.form.reset()
                ;(this.discount.translation.title.ar = ''),
                  (this.discount.translation.title.en = ''),
                  (this.discount.type = ''),
                  (this.discount.value = 0)
                this.refresh()
                this.discounts = this.discounts.filter((x) => {
                  return x.id != id
                })
              } else {
                this.showToastError(res.data.message, res.data.custom_code)
              }
            })
          }
        })
        .catch((err) => {
          // An error occurred
        })
    },
    resetDates() {
      if (!this.discount.is_scheduled) {
        this.discount.date_from = ''
        this.discount.date_to = ''
      }
    },
    resetForm() {
      this.filters.title = ''
      return this.refresh()
    }
  }
}
</script>

<style>
.v-calendar .input-field input {
  width: 378px !important;
  border-radius: 24px !important;
  height: 43px !important;
}
tr.select-discount {
  border: 1px solid #000;
  background-color: #077b53 !important;
  height: 60px;
}
</style>
