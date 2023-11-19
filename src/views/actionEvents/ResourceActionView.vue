<template>
  <div>
    <div class="card resource_action">
      <div
        class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        style="margin: 0 20px"
      >
        <h4 class="card-title">
          {{ trans('Action_Resources') }}
          <span style="color: #44aefc; margin: 0 5px"
            >(
            {{
              action_event.actionable.title
                ? action_event.actionable.title
                : action_event.actionable.resource
            }}
            )</span
          >
        </h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>
      <div class="card_body">
        <b-row style="justify-content: center">
          <v-card class="details col-md-3">
            <b-col cols="12" class="detail_card">
              <b-row>
                <b-col class="col" cols="12" md="6"
                  ><h4>{{ trans('name') }}</h4></b-col
                >
                <b-col class="col" cols="12" md="6"
                  ><h5>: {{ action_event.authenticatable.name }}</h5></b-col
                >
              </b-row>
              <b-row>
                <b-col class="col" cols="12" md="6"
                  ><h4>{{ trans('username') }}</h4></b-col
                >
                <b-col class="col" cols="12" md="6"
                  ><h5>
                    :
                    {{
                      action_event.authenticatable.username
                        ? action_event.authenticatable.username
                        : '---'
                    }}
                  </h5></b-col
                >
              </b-row>
              <b-row>
                <b-col class="col" cols="12" md="6"
                  ><h4>{{ trans('phone') }}</h4></b-col
                >
                <b-col class="col" cols="12" md="6"
                  ><h5>
                    :
                    {{
                      action_event.authenticatable.phone
                        ? action_event.authenticatable.phone
                        : '---'
                    }}
                  </h5></b-col
                >
              </b-row>
              <b-row>
                <b-col class="col" cols="12" md="6"
                  ><h4>{{ trans('email') }}</h4></b-col
                >
                <b-col class="col" cols="12" md="6"
                  ><h5>
                    :
                    {{
                      action_event.authenticatable.email
                        ? action_event.authenticatable.email
                        : '---'
                    }}
                  </h5></b-col
                >
              </b-row>
            </b-col>
          </v-card>
          <v-card class="details col-md-3">
            <b-col cols="12" class="detail_card">
              <b-row>
                <b-col class="col" cols="12" md="3"><h4>IP</h4></b-col>
                <b-col class="col" cols="12" md="9"
                  ><h5>: {{ action_event.info.ip }}</h5></b-col
                >
              </b-row>
              <b-row>
                <b-col class="col" cols="12" md="3"><h4>user_agent</h4></b-col>
                <b-col class="col" cols="12" md="9"
                  ><h5>: {{ action_event.info.user_agent }}</h5></b-col
                >
              </b-row>
            </b-col>
          </v-card>
          <v-card class="details col-md-4">
            <b-col cols="12" class="detail_card">
              <b-row>
                <b-col class="col" cols="12" md="4"
                  ><h4>{{ trans('action') }}</h4></b-col
                >
                <b-col class="col" cols="12" md="8"
                  ><h5>: {{ action_event.name }}</h5></b-col
                >
              </b-row>
              <b-row>
                <b-col class="col" cols="12" md="4"
                  ><h4>{{ trans('created_at') }}</h4></b-col
                >
                <b-col class="col" cols="12" md="8"
                  ><h5>: {{ getDate(action_event.created_at) }}</h5></b-col
                >
              </b-row>
              <b-row>
                <b-col class="col" cols="12" md="4"
                  ><h4>{{ trans('updated_at') }}</h4></b-col
                >
                <b-col class="col" cols="12" md="8"
                  ><h5>: {{ getDate(action_event.updated_at) }}</h5></b-col
                >
              </b-row>
              <b-row>
                <b-col class="col" cols="12" md="4"
                  ><h4>{{ trans('status') }}</h4></b-col
                >
                <b-col class="col" cols="12" md="8"
                  ><h5>: {{ action_event.status }}</h5></b-col
                >
              </b-row>
            </b-col>
          </v-card>
        </b-row>

        <b-row
          style="
            margin: auto;
            width: 92%;
            border-raduis: 15px;
            flex-direction: row;
            justify-content: center;
          "
        >
          <v-simple-table
            v-if="action_event.original"
            style="width: 48%; margin-top: 50px; border: 1px solid #ddd"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    class="text-center"
                    style="background: #44aefc; color: #fff"
                  >
                    key
                  </th>
                  <th
                    class="text-center"
                    style="
                      background: #44aefc;
                      color: #fff;
                      border-right: 1px solid #ddd;
                    "
                  >
                    original
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, key) in action_event.original" :key="item">
                  <td
                    style="
                      font-weight: 600 !important;
                      font-size: 18px !important;
                    "
                  >
                    {{ trans(key) }}
                  </td>
                  <td
                    v-if="key === 'updated_at'"
                    style="
                      font-weight: 600 !important;
                      font-size: 18px !important;
                    "
                  >
                    {{ getDate(item) }}
                  </td>
                  <td
                    v-else-if="key === 'created_at'"
                    style="
                      font-weight: 600 !important;
                      font-size: 18px !important;
                    "
                  >
                    {{ getDate(item) }}
                  </td>
                  <td
                    v-else-if="typeof item == 'object' && item != null"
                    style="
                      padding-top: 8px;
                      font-weight: 600 !important;
                      font-size: 18px !important;
                      direction: ltr !important;
                    "
                    v-html="getObject(item)"
                  ></td>
                  <td
                    v-else
                    style="
                      font-weight: 600 !important;
                      font-size: 18px !important;
                    "
                  >
                    {{ item }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-simple-table
            style="width: 48%; margin-top: 50px; border: 1px solid #ddd"
          >
            <template>
              <thead>
                <tr>
                  <th
                    class="text-center"
                    style="
                      background: #44aefc;
                      color: #fff;
                      border-right: 1px solid #ddd;
                    "
                  >
                    key
                  </th>
                  <th
                    class="text-center"
                    style="
                      background: #44aefc;
                      color: #fff;
                      border-right: 1px solid #ddd;
                    "
                  >
                    Changes
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, key) in action_event.changes" :key="item">
                  <td
                    style="
                      font-weight: 600 !important;
                      font-size: 18px !important;
                    "
                  >
                    {{ trans(key) }}
                  </td>
                  <td
                    v-if="key === 'updated_at'"
                    style="
                      font-weight: 600 !important;
                      font-size: 18px !important;
                    "
                  >
                    {{ getDate(item) }}
                  </td>
                  <td
                    v-else-if="key === 'created_at'"
                    style="
                      font-weight: 600 !important;
                      font-size: 18px !important;
                    "
                  >
                    {{ getDate(item) }}
                  </td>
                  <td
                    v-else-if="typeof item == 'object' && item != null"
                    style="
                      padding-top: 8px;
                      font-weight: 600 !important;
                      font-size: 18px !important;
                      direction: ltr !important;
                    "
                    v-html="getObject(item)"
                  ></td>
                  <td
                    v-else
                    style="
                      font-weight: 600 !important;
                      font-size: 18px !important;
                    "
                  >
                    {{ item }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      action_event: {},
      myItem: {
        ar: '',
        en: '',
      },
    }
  },
  mounted() {
    this.getResourceAction()
  },

  methods: {
    getObject(item) {
      this.myItem = item
      return `<p>Ar : ${this.myItem.ar} <br/> En : ${this.myItem.en} </p>`
    },

    getDate(datetime) {
      const time = moment(datetime)

      const formattedTime = time.format('YYYY-MM-DD HH:mm:ss')

      return formattedTime
    },
    getResourceAction() {
      axios({
        method: 'GET',
        url:
          '/api/action-event/' +
          this.$route.params.resource_name +
          '/' +
          this.$route.params.resource_id +
          '/actions/' +
          this.$route.params.action_id,
      }).then(res => {
        this.action_event = res.data.body.action_event
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.details {
  border-radius: 5px;

  margin: 20px;

  h4 {
    font-size: 16px !important;
    color: #44aefc;
  }
  h5 {
    font-size: 16px !important;
    margin-bottom: 0 !important;
    margin-top: 5px !important;
    font-weight: 600;
  }
  .col {
    padding-bottom: 0;
    padding-top: 0;
  }
}
</style>
