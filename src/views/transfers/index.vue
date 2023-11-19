<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <!-- Header -->
      <div class="card-header header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ trans('transfer-requests') }}</h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>
      <div class="filter">
        <div class="d-flex" style="float: left">
          <b-form-checkbox
            v-for="btn in status"
            :key="btn.value"
            :value="btn.value"
            v-model="selectItem"
            @change="getAllTransferRequests"
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
                <TableSkeletonLoader :items="10" :length="columns.length" v-if="skeletonLoading" />
                <b-tbody v-else>
                  <b-tr v-for="request in requests" :key="request.id">
                    <b-td>
                      {{ request.id }}
                    </b-td>
                    <b-td> {{ request.from_inventory.title }} </b-td>
                    <b-td>{{ request.to_inventory.title }} </b-td>

                    <b-td :class="Number(request.quantity).isNegative('negative_number_color')">
                      {{ Number(request.quantity).toNegativeFormat(0) }}
                      {{ trans('piece') }}
                    </b-td>

                    <b-td style="text-align: start !important; padding: 11px !important">
                      <span
                        class="status_span"
                        :style="{
                          background: request.status.color.hexadecimal
                        }"
                      >
                      </span>

                      {{ request.status.label }}
                    </b-td>
                    <b-td> {{ request.created_at }} </b-td>
                    <b-td> {{ request.created_by.name }} </b-td>
                    <b-td :class="Number(request.total_cost).isNegative('negative_number_color')">
                      {{ Number(request.total_cost).toNegativeFormat(0) }}<br />
                      {{ getSetting('currency', settings) }}
                    </b-td>

                    <b-td>
                      <router-link
                        style="font-size: 16px"
                        :to="
                          request.status.value === 'under_review'
                            ? `/inventory-transfer-requests/${request.id}`
                            : `/my-inventory-transfer-requests/${request.id}`
                        "
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
              </b-table-simple>
            </div>
          </div>
          <div class="col-sm-12 text-center" v-if="!skeletonLoading">
            <pagination-component
              :items="requests"
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
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'
export default {
  components: { PaginationComponent, TableSkeletonLoader },
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'language'],
  data() {
    return {
      columns: [
        'id',
        'request_from_inventory',
        'to inventory',
        'quantity',
        'request_status',
        'request_date',
        'request_responsible',
        'total',
        'options'
      ],
      skeletonLoading: true,

      last_page: 0,
      selectItem: '',

      alertType: 'success',
      requests: [],

      paginate: {},
      filter: {
        per_page: 15
      },
      usingFilters: true,
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,

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
      itemsLoaded: false
    }
  },

  mounted() {
    this.getAllTransferRequests()
  },
  methods: {
    getAllTransferRequests(value, background) {
      if (this.selectItem == null) {
        this.selectItem = ''
      }

      this.axios
        .get('/api/inventory-transfer/inventory-transfer-requests?status=' + this.selectItem)
        .then((res) => {
          this.skeletonLoading = false

          this.requests = res.data.body.inventory_transfer_requests.data
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
      this.requests = []
      if (this.usingFilters) {
        let str = ''
        for (var key in this.filter) {
          if (this.filter[key] == '') continue
          if (str != '') {
            str += '&'
          }
          str += key + '=' + this.filter[key]
        }
        // url = url.includes('?') ? url + '&' + str : url + '?' + str
      }
      this.itemsLoaded = false
      this.axios({
        methods: 'GET',
        url: '/api/inventory-transfer/inventory-transfer-requests?status=',
        params: {
          status: this.selectItem
        }
      })
        .then((res) => {
          this.skeletonLoading = false

          this.requests = res.data.body.inventory_transfer_requests.data
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

<style scoped>
.status_span {
  width: 12.6px;
  height: 12.6px;
  border-radius: 50%;
  display: inline-block;
  margin: 5px 2px 0;
}
.statud_receved {
  background: rgba(52, 171, 198, 1);
}
.status_accept {
  background: rgba(94, 218, 35, 1);
}
.bg-sky-100 {
  background: rgba(199, 23, 23, 1);
}

.changebackground {
  background: green;
}

.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #007bff !important;
  background-color: #007bff !important;
}
.custom-control-label::before {
  margin-top: 5px;
  width: 21px;
  height: 20px;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
  top: 8px;
}

.custom-control {
  font-size: 20px;
}
</style>
