<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <!-- Header -->
      <div class="card-header header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ trans('mytransfer-requests') }}</h4>

        <div class="dropdown">
          <router-link to="/single-transfer-request" class="request_btn">{{
            trans('transfer_request')
          }}</router-link>
          <GoBackButton />
        </div>
      </div>

      <!-- Filter -->
      <div class="filter" style="margin-top: 20px">
        <div class="d-flex" style="float: left">
          <b-form-checkbox
            v-for="btn in status"
            :key="btn.value"
            :value="btn.value"
            v-model="selectItem"
            @change="getMyTransferRequests"
          >
            {{ trans(btn.name) }}</b-form-checkbox
          >
        </div>
      </div>

      <!-- Body -->

      <div class="card-body" style="margin-top: 20px">
        <div class="row align-items-center justify-content-between mb-4">
          <div class="col-sm-12">
            <div class="table-responsive">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <GlobalTabel :columns="columns" />
                <table-skeleton-loader
                  :items="10"
                  :length="columns.length"
                  v-if="skeletonLoading"
                />
                <b-tbody v-else>
                  <b-tr v-for="request in myRequests" :key="request.id">
                    <b-td>
                      {{ request.id }}
                    </b-td>
                    <b-td> {{ request.from_inventory.title }}</b-td>
                    <b-td> {{ request.to_inventory.title }}</b-td>
                    <b-td :class="Number(request.quantity).isNegative('negative_number_color')">
                      {{ Number(request.quantity).toNegativeFormat(0) }}
                      {{ trans('piece') }}
                    </b-td>
                    <b-td style="text-align: start !important; padding: 0 16px !important">
                      <span
                        class="status_span"
                        :style="{
                          background: request.status.color.hexadecimal
                        }"
                      ></span>
                      {{ request.status.label }}
                    </b-td>
                    <b-td> {{ request.created_at }} </b-td>
                    <b-td> {{ request.note }} </b-td>
                    <b-td>
                      <router-link
                        style="font-size: 16px"
                        :to="/my-inventory-transfer-requests/ + request.id"
                      >
                        <font-awesome-icon icon="fa-solid fa-eye" />
                      </router-link>
                      <ActionButton
                        v-if="permissions.includes('view_action_event_inventory_transfer_request')"
                        :id="request.id"
                        :resource_name="'inventory_transfer_request'"
                      />
                    </b-td>
                  </b-tr>
                </b-tbody>

                <b-tbody class="text-center" v-if="itemsLoaded && !myRequests.length">
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
          <div class="col-sm-12 text-center" v-if="!skeletonLoading">
            <pagination-component
              :items="myRequests"
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

<script>
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
export default {
  components: { TableSkeletonLoader, PaginationComponent },
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'language'],
  data() {
    return {
      columns: [
        'id',
        'from_inventory',
        'to_inventory',
        'quantity',
        'request_status',
        'request_date',
        'note',
        'options'
      ],
      skeletonLoading: true,
      selectItem: '',

      alertType: 'success',
      status: [
        { id: 1, name: 'all', value: '', background: '#000' },
        {
          id: 2,
          name: 'accepted',
          value: 'accepted',
          background: 'rgb(25, 135, 84)'
        },
        {
          id: 3,
          name: 'rejected',
          value: 'rejected',
          background: 'rgb(220, 53, 69)'
        },
        {
          id: 4,
          name: 'under_review',
          value: 'under_review',
          background: 'rgb(89, 188, 215)'
        }
      ],
      globalStatus: '',
      filter: {
        per_page: 15
      },
      usingFilters: true,
      myRequests: [],

      last_page: 0,
      paginate: {},
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,
      itemsLoaded: false
    }
  },

  mounted() {
    this.getMyTransferRequests()
  },
  methods: {
    getMyTransferRequests() {
      if (this.selectItem == null) {
        this.selectItem = ''
      }
      this.axios
        .get('/api/inventory-transfer/my-requests?status=' + this.selectItem)
        .then((res) => {
          this.skeletonLoading = false

          this.itemsLoaded = true
          this.myRequests = res.data.body.inventory_transfer_requests.data
          this.paginate = res.data.body.inventory_transfer_requests.paginate
          this.total = res.data.body.inventory_transfer_requests.paginate.total
          this.current_page = res.data.body.inventory_transfer_requests.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.inventory_transfer_requests.paginate.next_page_url
          this.prev_page_url = res.data.body.inventory_transfer_requests.paginate.prev_page_url
          this.first_page_url = res.data.body.inventory_transfer_requests.paginate.first_page_url
          this.last_page_url = res.data.body.inventory_transfer_requests.paginate.last_page_url
          this.last_page = res.data.body.inventory_transfer_requests.paginate.last_page
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goTo(url) {
      this.skeletonLoading = true
      this.myRequests = []
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

      this.axios
        .get(url)
        .then((res) => {
          this.skeletonLoading = false

          this.myRequests = res.data.body.inventory_transfer_requests.data
          this.paginate = res.data.body.inventory_transfer_requests.paginate
          this.total = res.data.body.inventory_transfer_requests.paginate.total
          this.current_page = res.data.body.inventory_transfer_requests.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.inventory_transfer_requests.paginate.next_page_url
          this.prev_page_url = res.data.body.inventory_transfer_requests.paginate.prev_page_url
          this.first_page_url = res.data.body.inventory_transfer_requests.paginate.first_page_url
          this.last_page_url = res.data.body.inventory_transfer_requests.paginate.last_page_url

          this.last_page = res.data.body.inventory_transfer_requests.paginate.last_page
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    }
  }
}
</script>

<style>
.request_btn {
  background: rgb(89, 188, 215);
  border-radius: 10px;
  color: #fff;
  padding: 8px;
  border: 0;
  outline: 0;
  text-decoration: none;
}
.request_btn:hover {
  text-decoration: none;
  color: #fff;
}
</style>
