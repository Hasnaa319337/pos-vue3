<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card" v-if="loaded">
      <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ trans('Action_Events') }}</h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-center mx-0 justify-content-between mb-4">
          <div class="col-sm-12" style="padding: 10px 0 !important">
            <div class="table-responsive">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <global-tabel :columns="columns" :items="action_events" />
                <TableSkeletonLoader :items="10" :length="columns.length" v-if="skeletonLoading" />
                <b-tbody v-else>
                  <b-tr v-for="(action, index) in action_events" :key="index">
                    <b-td>
                      {{ action.id }}
                    </b-td>
                    <b-td>{{ action.authenticatable.name }}</b-td>

                    <b-td>{{ action.actionable.resource }}</b-td>
                    <b-td>{{ action.name }}</b-td>
                    <b-td>
                      <span
                        v-if="action.status === 'finished'"
                        style="
                          background: #16cb3ddb;
                          color: #fff;
                          padding: 6px 9px;
                          border-radius: 25px;
                          font-size: 14px !important;
                          font-weight: 700;
                        "
                      >
                        {{ action.status }}
                      </span>
                      <span
                        v-else
                        style="
                          background: rgb(224, 168, 0);
                          color: #fff;
                          padding: 6px 9px;
                          border-radius: 25px;
                          font-size: 14px !important;
                          font-weight: 700;
                        "
                      >
                        {{ action.status }}
                      </span>
                    </b-td>

                    <b-td>{{ getDate(action.updated_at) }}</b-td>
                    <b-td>
                      <router-link
                        v-b-tooltip.hover
                        :title="trans('show')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        :to="'/action-event/actions/' + action.id"
                      >
                        <font-awesome-icon icon="fa-solid fa-eye" />
                      </router-link>
                    </b-td>
                  </b-tr>
                </b-tbody>

                <TableSkeletonLoader
                  :items="action_events"
                  :length="columns.length"
                  v-if="!action_events.length"
                />
              </b-table-simple>
            </div>
          </div>
          <div class="col-sm-12 text-center" v-if="!skeletonLoading">
            <pagination-component
              :items="action_events"
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
    <div class="card" v-else>
      <b-skeleton
        animation="wave"
        width="100%"
        height="100%"
        style="background: #f6f6f6; border-raduis: 15px"
      ></b-skeleton>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import TableSkeletonLoader from '@/components/global/TableSkeletonLoader.vue'
import PaginationComponent from '@/components/global/PaginationComponent.vue'
import GlobalTabel from '@/components/global/GlobalTabel.vue'

export default {
  name: 'AppEventHistory',
  props: ['permissions', 'section', 'user', 'langs', 'settings', 'language'],
  components: { TableSkeletonLoader, PaginationComponent, GlobalTabel },

  data() {
    return {
      columns: ['id', 'username', 'action_target', 'action', 'status', 'updated_at', 'options'],
      searchOn: false,

      action_events: [],

      filter: {
        per_page: 30
      },
      users: [],
      loaded: true,
      usingFilters: 0,
      itemsLoaded: false,
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      last_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,
      products: [],
      variations: [],
      skeletonLoading: true
    }
  },
  mounted() {
    window.scrollTo(0, 0)

    this.getAllActions()
  },
  methods: {
    getDate(datetime) {
      const time = moment(datetime)

      const formattedTime = time.format('YYYY-MM-DD HH:mm:ss')

      return formattedTime
    },

    getAllActions() {
      this.axios({
        method: 'GET',
        url: '/api/action-event/action-events'
      })
        .then((res) => {
          this.skeletonLoading = false
          this.action_events = res.data.body.action_events.data

          this.total = res.data.body.action_events.paginate.total
          this.current_page = res.data.body.action_events.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.action_events.paginate.next_page_url
          this.prev_page_url = res.data.body.action_events.paginate.prev_page_url
          this.first_page_url = res.data.body.action_events.paginate.first_page_url
          this.last_page_url = res.data.body.action_events.paginate.last_page_url
          this.last_page = res.data.body.action_events.paginate.last_page
        })
        .catch((error) => {
          this.ToastErrorMixin(error.response.data.message, error.response.data.custom_code)
        })
    },

    goTo(url) {
      this.skeletonLoading = true
      this.action_events = []
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
          this.itemsLoaded = true
          this.skeletonLoading = false
          this.action_events = res.data.body.action_events.data

          this.total = res.data.body.action_events.paginate.total
          this.current_page = res.data.body.action_events.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.action_events.paginate.next_page_url
          this.prev_page_url = res.data.body.action_events.paginate.prev_page_url
          this.first_page_url = res.data.body.action_events.paginate.first_page_url
          this.last_page_url = res.data.body.action_events.paginate.last_page_url

          this.last_page = res.data.body.action_events.paginate.last_page
        })
        .catch((error) => {
          this.ToastErrorMixin(error.response.data.message, error.response.data.custom_code)
        })
    }
  }
}
</script>
<style scoped>
td {
  text-align: center;
}
</style>
