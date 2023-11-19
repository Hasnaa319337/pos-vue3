<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card resources_actions">
      <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ trans('Action_Resources') }}</h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-center mx-0 justify-content-between mb-4">
          <div class="col-sm-12" style="padding: 10px 0 !important">
            <div style="width: 75%; margin: auto">
              <v-timeline v-if="allActionVariables.length">
                <div
                  v-infinite-scroll="loadMore"
                  infinite-scroll-disabled="busy"
                  infinite-scroll-distance="200"
                >
                  <v-timeline-item
                    :color="action.name_utility.value"
                    fill-dot
                    :right="index % 0 ? right : left"
                    v-for="(action, index) in allActionVariables"
                    :key="index"
                  >
                    <v-card style="padding: 15px 5px">
                      <router-link
                        :to="
                          '/view/' +
                          action.actionable.resource +
                          '/' +
                          action.actionable.id +
                          '/' +
                          action.id
                        "
                      >
                        <v-card-title
                          style="display: flex; justify-content: space-between; align-items: center"
                        >
                          <h3 style="font-weight: 700">
                            {{
                              action.actionable.title
                                ? action.actionable.title
                                : action.actionable.resource
                            }}
                          </h3>
                          <h5
                            style="
                              background: #16cb3ddb;
                              color: #fff;
                              padding: 8px;
                              border-radius: 25px;
                              font-size: 14px !important;
                              font-weight: 700;
                            "
                          >
                            {{ action.status }}
                          </h5>
                        </v-card-title>
                        <v-container>
                          <v-row style="justify-content: space-between; align-items: end">
                            <v-col
                              cols="12"
                              md="3"
                              style="
                                display: flex;
                                align-items: center;
                                column-gap: 8px;
                                padding: 0;
                              "
                            >
                              <img
                                class="d-block"
                                width="21"
                                height="21"
                                src="https://img.icons8.com/ultraviolet/40/user.png"
                                alt="user"
                              />
                              <span
                                style="
                                  font-size: 18px;
                                  font-weight: 600;

                                  display: inline-block;
                                  margin-top: 6px;
                                "
                                >{{ action.authenticatable.username }}</span
                              >
                            </v-col>

                            <v-col
                              cols="12"
                              md="6"
                              style="
                                align-items: center;
                                display: flex;
                                margin-top: 10px;
                                padding: 0;
                              "
                            >
                              <span style="font-size: 15px; font-weight: 600; margin-bottom: 1px">
                                <svg
                                  style="margin: 0 2px"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  width="17"
                                  height="17"
                                  viewBox="0 0 40 40"
                                >
                                  <path
                                    fill="#dff0fe"
                                    d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"
                                  ></path>
                                  <path
                                    fill="#4788c7"
                                    d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    d="M20,35.5c-8.547,0-15.5-6.953-15.5-15.5S11.453,4.5,20,4.5S35.5,11.453,35.5,20S28.547,35.5,20,35.5 z"
                                  ></path>
                                  <path
                                    fill="#4788c7"
                                    d="M20,5c8.271,0,15,6.729,15,15s-6.729,15-15,15S5,28.271,5,20S11.729,5,20,5 M20,4 C11.163,4,4,11.163,4,20s7.163,16,16,16s16-7.163,16-16S28.837,4,20,4L20,4z"
                                  ></path>
                                  <path
                                    fill="none"
                                    stroke="#4788c7"
                                    stroke-linecap="round"
                                    stroke-miterlimit="10"
                                    stroke-width="2"
                                    d="M26.639 10.19L20 20 25 25"
                                  ></path>
                                  <path
                                    fill="#4788c7"
                                    d="M20 18.5A1.5 1.5 0 1 0 20 21.5A1.5 1.5 0 1 0 20 18.5Z"
                                  ></path>
                                  <path
                                    fill="#98ccfd"
                                    d="M20 7A1 1 0 1 0 20 9 1 1 0 1 0 20 7zM20 31A1 1 0 1 0 20 33 1 1 0 1 0 20 31z"
                                  ></path>
                                  <g>
                                    <path
                                      fill="#98ccfd"
                                      d="M32 19A1 1 0 1 0 32 21A1 1 0 1 0 32 19Z"
                                    ></path>
                                  </g>
                                  <g>
                                    <path
                                      fill="#98ccfd"
                                      d="M8 19A1 1 0 1 0 8 21A1 1 0 1 0 8 19Z"
                                    ></path>
                                  </g>
                                </svg>
                                {{ getDate(action.updated_at) }}
                              </span>
                            </v-col>
                            <v-col cols="12" md="3" style="padding: 0; text-align: center">
                              <span
                                style="
                                  font-weight: 600;
                                  padding: 6px 0;
                                  border-radius: 3px;
                                  margin-top: 8px;
                                  display: inline-block;

                                  font-size: 18px;
                                "
                                :style="{
                                  color: action.name_utility.color.hexadecimal
                                }"
                                >{{ action.name }}
                              </span>
                            </v-col>
                          </v-row>
                        </v-container>
                      </router-link>
                    </v-card>
                  </v-timeline-item>
                </div>
              </v-timeline>

              <v-card
                v-if="!allActionVariables.length && !skeletonLoading"
                style="
                  width: 50%;
                  margin: auto;

                  justify-content: center;
                  height: 87px;
                  align-items: center !important;
                  display: flex !important;
                  margin-top: 200px;
                  font-weight: 800;
                  font-size: 18px;
                "
              >
                {{ trans('no_action_resources') }}
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['language', 'settings', 'permissions'],
  components: {},
  mounted() {
    ;(this.resource_name = this.$route.params.resource_name),
      (this.resource_id = this.$route.params.id)

    setTimeout(() => {
      this.skeletonLoading = false
    }, 3000)

    this.loadMore()
  },
  data() {
    return {
      allActionVariables: [],
      items: [],
      busy: false,
      page: 1,
      action_events: [],
      resource_name: '',
      resource_id: '',
      skeletonLoading: true,
      resource_actions: [],
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      last_page: 0,
      total: 0
    }
  },

  methods: {
    loadMore() {
      if (this.busy) return
      this.busy = true

      this.axios({
        method: 'get',
        url:
          '/api/action-event/' +
          this.resource_name +
          '/' +
          this.resource_id +
          '/actions?page=' +
          this.page
      }).then((res) => {
        this.action_events = res.data.body.action_event.data
        this.busy = false
        this.total = res.data.body.action_event.paginate.total
        this.current_page = res.data.body.action_event.paginate.current_page
        this.prev_page = this.current_page - 1
        this.next_page = this.current_page + 1
        this.next_page_url = res.data.body.action_event.paginate.next_page_url
        this.prev_page_url = res.data.body.action_event.paginate.prev_page_url
        this.first_page_url = res.data.body.action_event.paginate.first_page_url
        this.last_page_url = res.data.body.action_event.paginate.last_page_url
        this.last_page = res.data.body.action_event.paginate.last_page
        if (this.current_page == this.last_page) {
          this.busy = true
          this.allActionVariables.push(...res.data.body.action_event.data)
          console.log(this.allActionVariables)
        } else {
          this.page++
          this.allActionVariables.push(...res.data.body.action_event.data)
          console.log(this.allActionVariables)
        }
      })
    },

    getDate(datetime) {
      const time = moment(datetime)

      const formattedTime = time.format('YYYY-MM-DD HH:mm:ss')

      return formattedTime
    },

    goTo(url) {
      this.action_events = []

      this.axios
        .get(url)
        .then((res) => {
          this.itemsLoaded = true

          this.action_events = res.data.body.action_event.data

          this.total = res.data.body.action_event.paginate.total
          this.current_page = res.data.body.action_event.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.action_event.paginate.next_page_url
          this.prev_page_url = res.data.body.action_event.paginate.prev_page_url
          this.first_page_url = res.data.body.action_event.paginate.first_page_url
          this.last_page_url = res.data.body.action_event.paginate.last_page_url
          this.last_page = res.data.body.action_event.paginate.last_page
        })
        .catch((error) => {
          this.message = error.response.data.message
        })
    }
  }
}
</script>

<style>
.resources_actions .v-timeline:before {
  left: 50% !important;
}

.resources_actions .v-card a {
  text-decoration: none !important;
  color: #000;
}
.resources_actions .v-card a:hover {
  text-decoration: none !important;
  color: #000;
}
.resources_actions .v-card {
  transition: 0.3s all ease-in-out !important;
}
.resources_actions .v-card:hover {
  background: rgb(30 144 255 / 10%) !important;
  color: #fff !important;
  transition: 0.3s all ease-in-out !important;
}

.resources_actions .theme--light.v-timeline .v-timeline-item .v-card:not(.v-card--link):before {
  display: none !important;
}
.resources_actions .theme--light.v-timeline .v-timeline-item .v-card:not(.v-card--link):after {
  display: none !important;
}

.update {
  background-color: rgb(13, 202, 240) !important;
}

.create {
  background-color: #16cb3ddb !important;
}
.delete {
  background-color: #dc3545 !important;
}
</style>
