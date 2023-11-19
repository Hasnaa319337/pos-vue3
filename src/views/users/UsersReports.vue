<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div
          class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        >
          <h4
            class="card-title"
            v-if="user.language"
            v-text="trans('users reports')"
          ></h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <b-row class="mx-0 align-items-start">
            <div class="col-sm-12">
              <h5></h5>
            </div>
            <b-col cols="12" class="mb-3">
              <ValidationObserver v-slot="{ handleSubmit }" ref="usersLogsForm">
                <b-form
                  @submit.prevent="handleSubmit(filterResults)"
                  @reset.prevent="reset"
                >
                  <b-form-row>
                    <b-col>
                      <b-form-group label="المستخدم" label-for="input-2">
                        <b-form-input
                          id="input-2"
                          type="text"
                          class="form-control"
                          v-model="search_by_name"
                          :placeholder="usersLogsStrings['username']"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label="نوع السجل" label-for="input-3">
                        <b-form-select v-model="search_by_type_login">
                          <b-form-select-option
                            v-for="(type, index) in log_type"
                            :key="index"
                            :value="type"
                            >{{ type }}</b-form-select-option
                          >
                        </b-form-select>
                      </b-form-group>
                    </b-col>

                    <b-col>
                      <b-form-group label="الجدول" label-for="input-">
                        <b-form-select v-model="search_by_table">
                          <b-form-select-option
                            v-for="(tablee, value, index) in tables"
                            :key="index"
                            :value="tablee"
                          >
                            {{ tablee }}
                          </b-form-select-option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-form-row>
                  <!-- <b-form-row>
                                        <b-col>
                                            <b-form-group>
                                                <b-form-input
                                                    type="email"
                                                    class="form-control"
                                                    v-model="
                                                        filter.email
                                                    "
                                                    :placeholder="
                                                        usersLogsStrings[
                                                            'email'
                                                        ]
                                                    "
                                                />
                                            </b-form-group>
                                        </b-col>
                                    </b-form-row> -->
                  <!-- <b-form-row class="mt-3">
                                        <b-col cols="12" md="4">
                                            <b-form-group label="
                                                    من تاريخ
                                                ">
                                                <b-input type="date" class="form-control" v-model="
                                                    filter.date_from
                                                "></b-input>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="12" md="4">
                                            <b-form-group label="
                                                    حتى الان
                                                ">
                                                <b-input type="date" class="form-control" v-model="
                                                    filter.date_to
                                                "></b-input>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="12" md="4" class="flex-go">
                                            <b-form-group>
                                                <b-button variant="success" type="submit" class="mr-2">
                                                    <font-awesome-icon icon="fa-solid fa-filter" />
                                                    {{
                                                            usersLogsStrings[
                                                            "search"
                                                            ]
                                                    }}
                                                </b-button>
                                            </b-form-group>
                                        </b-col>
                                    </b-form-row> -->
                  <!-- <b-form-row class="justify-content-center">
                                        <b-button
                                            variant="warning"
                                            type="reset"
                                            class="mr-2"
                                        >
                                            <font-awesome-icon
                                                icon="fa-solid fa-arrows-rotate"
                                            />
                                            {{
                                                usersLogsStrings["reset_search"]
                                            }}
                                        </b-button>
                                    </b-form-row> -->
                </b-form>
              </ValidationObserver>
            </b-col>
            <b-col cols="12">
              <b-table-simple
                sticky-header
                striped
                bordered
                responsive
                style="min-height: 50px"
              >
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <b-th>م</b-th>
                    <b-th>الوقت والتاريخ</b-th>
                    <b-th>نوع التسجيل</b-th>
                    <b-th>اسم الجدول</b-th>
                    <b-th> تم بواسطه </b-th>
                    <b-th> التـأثير </b-th>
                  </b-tr>
                </b-thead>
                <b-tbody class="text-center" v-if="items.length">
                  <b-tr v-for="item in handleSearchCm" :key="item.id">
                    <b-td>{{ item.id }}</b-td>
                    <b-td>{{ item.log_date + item.dateHumanize }}</b-td>
                    <b-td>
                      <span class="log-type">{{ item.log_type }}</span>
                    </b-td>
                    <b-td>{{ item.table_name }}</b-td>
                    <b-td>
                      <div class="all">
                        <span class="name">{{ item.user.username }}</span>
                        <span>{{ item.user.email }}</span>
                      </div>
                    </b-td>
                    <b-td>
                      <div class="col-10">
                        <b-button
                          class="showing"
                          v-b-modal="'myModal' + item.id"
                          >إظهار</b-button
                        >

                        <b-modal
                          size="xl"
                          :id="'myModal' + item.id"
                          title="سجل النشاطات"
                        >
                          <b-table-simple
                            sticky-header
                            striped
                            bordered
                            responsive
                            style="min-height: 50px"
                            class="mt-5 mb-5"
                          >
                            <b-thead>
                              <b-tr class="rounded" variant="dark">
                                <b-th>المعلومات</b-th>
                                <b-th></b-th>
                              </b-tr>
                            </b-thead>
                            <b-tbody class="text-center" v-if="items.length">
                              <b-tr>
                                <b-th scope="col">النوع</b-th>
                                <b-td class="white"
                                  ><span class="log-type">{{
                                    item.log_type
                                  }}</span></b-td
                                >
                              </b-tr>
                              <b-tr>
                                <b-th scope="col">الجدول</b-th>
                                <b-td class="white">{{ item.table_name }}</b-td>
                              </b-tr>
                              <b-tr>
                                <b-th scope="col">الوقت والتاريخ</b-th>
                                <b-td class="white">{{
                                  item.log_date + item.dateHumanize
                                }}</b-td>
                              </b-tr>
                              <b-tr>
                                <b-th scope="col">تم بواسطة</b-th>
                                <b-td class="white">
                                  <div class="all">
                                    <span class="name">{{
                                      item.user.username
                                    }}</span>
                                    <span>{{ item.user.email }}</span>
                                  </div>
                                </b-td>
                              </b-tr>
                            </b-tbody>
                            <b-tbody
                              class="text-center"
                              v-else-if="!items.length"
                            >
                              <b-tr class="text-center">
                                <b-td colspan="10">
                                  <h5>no_results_found</h5>
                                </b-td>
                              </b-tr>
                            </b-tbody>
                            <b-tbody v-else class="text-center">
                              <b-tr>
                                <b-td colspan="10">
                                  <font-awesome-icon
                                    class="fa-spin-pulse"
                                    icon="fa-solid fa-spinner "
                                  />
                                </b-td>
                              </b-tr>
                            </b-tbody>
                          </b-table-simple>

                          <!-- <b-table-simple
                                                        sticky-header
                                                        striped
                                                        bordered
                                                        responsive
                                                        style="min-height: 50px;"
                                                        class="mt-5 mb-5"
                                                    >
                                                        <b-thead>
                                                            <b-tr
                                                                class="rounded"
                                                                variant="dark"
                                                            >
                                                                <b-th
                                                                    >المعلومات</b-th
                                                                >
                                                                <b-th></b-th>
                                                            </b-tr>
                                                        </b-thead>
                                                        <b-tbody
                                                            class="text-center"
                                                            v-if="items.length"
                                                        >
                                                            <b-tr>
                                                                <b-th
                                                                    scope="col"
                                                                    >النوع</b-th
                                                                >
                                                                <b-td
                                                                    class="white"
                                                                    ><span
                                                                        class="log-type"
                                                                        >{{
                                                                            item.log_type
                                                                        }}</span
                                                                    ></b-td
                                                                >
                                                            </b-tr>
                                                            <b-tr>
                                                                <b-th
                                                                    scope="col"
                                                                    >الجدول</b-th
                                                                >
                                                                <b-td
                                                                    class="white"
                                                                    >{{
                                                                        item.table_name
                                                                    }}</b-td
                                                                >
                                                            </b-tr>
                                                            <b-tr>
                                                                <b-th
                                                                    scope="col"
                                                                    >الوقت
                                                                    والتاريخ</b-th
                                                                >
                                                                <b-td
                                                                    class="white"
                                                                    >{{
                                                                        item.log_date +
                                                                            item.dateHumanize
                                                                    }}</b-td
                                                                >
                                                            </b-tr>
                                                            <b-tr>
                                                                <b-th
                                                                    scope="col"
                                                                    >تم
                                                                    بواسطة</b-th
                                                                >
                                                                <b-td
                                                                    class="white"
                                                                >
                                                                    <div
                                                                        class="all"
                                                                    >
                                                                        <span
                                                                            class="name"
                                                                            >{{
                                                                                item
                                                                                    .user
                                                                                    .username
                                                                            }}</span
                                                                        >
                                                                        <span>{{
                                                                            item
                                                                                .user
                                                                                .email
                                                                        }}</span>
                                                                    </div>
                                                                </b-td>
                                                            </b-tr>
                                                        </b-tbody>
                                                        <b-tbody
                                                            class="text-center"
                                                            v-else-if="
                                                                !items.length
                                                            "
                                                        >
                                                            <b-tr
                                                                class="text-center"
                                                            >
                                                                <b-td
                                                                    colspan="10"
                                                                >
                                                                    <h5>
                                                                        no_results_found
                                                                    </h5>
                                                                </b-td>
                                                            </b-tr>
                                                        </b-tbody>
                                                        <b-tbody
                                                            v-else
                                                            class="text-center"
                                                        >
                                                            <b-tr>
                                                                <b-td
                                                                    colspan="10"
                                                                >
                                                                    <font-awesome-icon
                                                                        class="fa-spin-pulse"
                                                                        icon="fa-solid fa-spinner "
                                                                    />
                                                                </b-td>
                                                            </b-tr>
                                                        </b-tbody>
                                                    </b-table-simple> -->
                        </b-modal>
                      </div>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody class="text-center" v-else-if="!items.length">
                  <b-tr class="text-center">
                    <b-td colspan="10">
                      <h5 class="no_results_found">
                        {{ trans('no_results_found') }}
                      </h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-else class="text-center">
                  <b-tr>
                    <b-td colspan="10">
                      <font-awesome-icon
                        class="fa-spin-pulse"
                        icon="fa-solid fa-spinner "
                      />
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UsersReports',
  props: ['section', 'sections', 'user', 'user_language'],
  data() {
    return {
      loaded: false,
      usersLogsLoaded: false,
      usersLogs: [],
      usersLogsFilters: {
        username: '',
        type_login: '',
        type: '',
        date_from: '',
        date_to: '',
      },
      usersLogsStrings: [],
      reports: [],
      items: [],
      tables: {},
      log_type: [],
      filter: {},
      usingFilters: 0,

      search_by_name: '',
      search_by_type_login: '',
      search_by_table: '',
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    // this.hat();
    this.activity()
  },
  computed: {
    handleSearchCm() {
      return this.items.filter(
        item =>
          item.user.username.includes(this.search_by_name) &&
          item.log_type.includes(this.search_by_type_login) &&
          item.table_name.includes(this.search_by_table)
      )
    },
  },
  methods: {
    // filter(filters, report, url) {
    //     let str = "";
    //     for (var key in filters) {
    //         if (filters[key] == "") continue;
    //         if (str != "") {
    //             str += "&";
    //         }
    //         str += key + "=" + filters[key];
    //     }
    //     url = url + "?" + str;
    //     this.refresh(report, url);
    // },

    filterResults() {
      this.usingFilters = 1
      this.refresh()
    },
    refresh() {
      let url = 'api/user-activity?action=data'
      if (this.usingFilters) {
        let str = ''
        for (var key in this.filter) {
          if (this.filter[key] == '') continue
          if (str != '') {
            str += '&'
          }
          str += key + '=' + this.filter[key]
        }
        url = url + '?' + str
      }
      // this.loaded = false;
      axios
        .get(url)
        .then(res => {
          this.items = res.data.body.data.data
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    reset() {
      this.filter = {}
      this.$refs.form.reset()
    },
    // handleSearch() {
    //     this.items = this.items.filter((item) =>
    //         item.log_type.includes(this.usersLogsFilters.type_login)
    //     );
    // },

    // refresh(report, url) {
    //     if (report) {
    //         let getMethodName =
    //             "get" + report.charAt(0).toUpperCase() + report.slice(1);
    //         this.reports = [this[getMethodName](url)];
    //         this.usersLogsLoaded = false;
    //     } else {
    //         this.reports = [
    //             this.getUsersLogs("api/user-activity?action=data")
    //         ];
    //     }
    //     Promise.all(this.reports)
    //         .then(response => {
    //             if (report) {
    //                 let setMethodName =
    //                     "set" +
    //                     report.charAt(0).toUpperCase() +
    //                     report.slice(1) +
    //                     "Logic";
    //                 this[setMethodName](response[0]);
    //             } else {
    //                 this.setUsersLogsLogic(response[0]);
    //             }
    //         })
    //         .catch(error => { });
    // },
    // async getUsersLogs(url) {
    //     let response = await axios.get(url);
    //     return response;
    // },
    // setUsersLogsLogic(res) {
    //     if (res.status == 200) {
    //         this.usersLogs = res.data.usersLogs;
    //         console.log(usersLogs);
    //         this.usersLogsStrings = res.data.strings;
    //         this.usersLogsLoaded = true;
    //     }
    // },
    // resetForm(report) {
    //     let formFiltersName = report + "Filters";
    //     Object.keys(this[formFiltersName]).forEach(key => {
    //         this[formFiltersName][key] = "";
    //     });
    // },

    activity() {
      let url = 'api/user-activity'
      // console.log(url);
      axios
        .get(url)
        .then(res => {
          console.log(res.data.body.tables)
          console.log(res.data.body.types)

          this.tables = res.data.body.tables
          this.log_type = res.data.body.types
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
.log-type {
  width: 85px;
  height: 33px;
  /* UI Properties */
  background: #e1e1e1 0% 0% no-repeat padding-box;
  border-radius: 17px;
  color: #000000;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.showing {
  width: 163px;
  height: 40px;
  background: transparent linear-gradient(180deg, #137b97 0%, #5dc5e0 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 1px 8px #0000000d;
  border-radius: 24px;
  margin: auto;
}

.all {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.all .name {
  font-weight: 600;
}

td.white {
  background: #fff !important;
  border: none;
}

.flex-go {
  display: flex;
  align-items: flex-end;
}
</style>
