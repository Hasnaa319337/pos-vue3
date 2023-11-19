<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card finanacial_statment">
      <div
        class="card-header mb-5 header-sm d-flex"
        style="padding: 3px 5px !important"
      >
        <div class="row m-0 w-100 justify-content-between align-items-center">
          <h4 class="card-title col-auto" v-if="language">
            {{ trans('show_financial_section') }}
          </h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
      </div>
      <div class="card-body">
        <b-row style="margin-bottom: 20px; gap: 20px; justify-content: center">
          <v-card class="details col-md-4">
            <b-col cols="12" class="detail_card">
              <b-row>
                <b-col class="col" cols="12" md="4"
                  ><h4 style="margin: 0 !important; font-size: 17px !important">
                    {{ trans('name') }} (Ar) :
                  </h4></b-col
                >
                <b-col class="col" cols="12" md="8"
                  ><h5 style="font-size: 19px; margin-top: 7px">
                    {{ account.translation.title.ar }}
                  </h5></b-col
                >
              </b-row>
            </b-col>
          </v-card>
          <v-card class="details col-md-4">
            <b-col cols="12" class="detail_card">
              <b-row>
                <b-col class="col" cols="12" md="4"
                  ><h4 style="margin: 0 !important; font-size: 17px !important">
                    {{ trans('name') }} (En) :
                  </h4></b-col
                >
                <b-col class="col" cols="12" md="8"
                  ><h5 style="font-size: 19px; margin-top: 7px">
                    {{ account.translation.title.en }}
                  </h5></b-col
                >
              </b-row>
            </b-col>
          </v-card>
        </b-row>
        <b-row style="margin-bottom: 20px; gap: 20px; justify-content: center">
          <v-card class="details col-md-4">
            <b-col cols="12" class="detail_card">
              <b-row>
                <b-col class="col" cols="12" md="4"
                  ><h4 style="margin: 0 !important; font-size: 17px !important">
                    {{ trans('type') }} :
                  </h4></b-col
                >
                <b-col class="col" cols="12" md="8"
                  ><h5 style="font-size: 19px; margin-top: 7px">
                    {{ trans(account.type) }}
                  </h5></b-col
                >
              </b-row>
            </b-col>
          </v-card>
          <v-card class="details col-md-4">
            <b-col cols="12" class="detail_card">
              <b-row>
                <b-col class="col" cols="12" md="5"
                  ><h4 style="margin: 0 !important; font-size: 17px !important">
                    {{ trans('math_operator') }} :
                  </h4></b-col
                >
                <b-col class="col" cols="12" md="7"
                  ><h5 style="font-size: 19px; margin-top: 7px">
                    {{ account.mathematics_operator }}
                  </h5></b-col
                >
              </b-row>
            </b-col>
          </v-card>
        </b-row>
        <!--  items -->
        <div class="col-sm-12">
          <div class="table-responsive" style="padding: 0; margin: 0">
            <b-table-simple
              sticky-header
              striped
              bordered
              responsive
              style="min-height: 400px; padding: 0; margin: auto; width: 85%"
            >
              <b-thead>
                <b-tr class="rounded" item="dark">
                  <th style="width: 30% !important">
                    {{ trans('type') }}
                  </th>
                  <th style="width: 30% !important; border: 2px solid #85c3ff">
                    {{ trans('account_name') }}
                  </th>
                  <th style="border: 2px solid #85c3ff">
                    {{ trans('math_operator') }}
                  </th>
                </b-tr>
              </b-thead>
              <b-tbody class="request_body">
                <b-tr v-for="(item, index) in account.items" :key="item.id">
                  <b-td style="max-width: 180px !important">
                    <p
                      style="
                        border-radius: 5px !important;
                        border: 1px solid #17a2b8;
                        background: #fff;
                        padding: 5px 0;
                        color: rgb(0 0 0 / 78%);
                        font-weight: 700;
                      "
                      v-if="
                        account.items[index].reference_type === 'account_tree'
                      "
                    >
                      {{ trans('account') }}
                    </p>

                    <p
                      style="
                        border-radius: 5px !important;
                        border: 1px solid #17a2b8;
                        background: #fff;
                        padding: 5px 0;
                        color: rgb(0 0 0 / 78%);
                        font-weight: 700;
                      "
                      v-else
                    >
                      {{ trans('equation') }}
                    </p>
                  </b-td>
                  <b-td style="max-width: 180px !important">
                    <p
                      style="
                        border-radius: 5px !important;
                        border: 1px solid #17a2b8;
                        background: #fff;
                        padding: 5px 0;
                        color: rgb(0 0 0 / 78%);
                        font-weight: 700;
                      "
                    >
                      {{ account.items[index].reference.title }}
                    </p>
                  </b-td>

                  <b-td>
                    <b-form-select
                      disabled
                      v-model="account.items[index].mathematics_operator"
                      style="
                        border-radius: 5px !important;
                        border: 1px solid #17a2b8;
                        text-align: center;
                        color: rgb(0 0 0 / 78%);
                        font-weight: 700;
                      "
                    >
                      <b-form-select-option
                        v-for="(key, operator) in section_item_operators"
                        :key="key"
                        :value="operator"
                      >
                        {{ key }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: [
    'permissions',
    'section',
    'user',
    'langs',
    'settings',
    'permissions',
    'language',
    'inventories',
  ],
  data() {
    return {
      accounts: [],
      account_id: '',
      account: {
        items: [{ account: '', mathematics_operator: '' }],
        type: '',
        translation: {
          title: {
            ar: '',
            en: '',
          },
        },

        mathematics_operator: '',
      },
      section_operators: [],
      section_item_operators: [],
      list_types: [],
    }
  },
  mounted() {
    this.getSection()
    this.create()
    this.enums()
  },
  methods: {
    getSection() {
      axios({
        method: 'GET',
        url:
          '/api/financial-list/financial-list-sections/' +
          this.$route.params.id,
      })
        .then(res => {
          this.account = res.data.body.financial_list_section
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    create() {
      axios({
        method: 'GET',
        url: '/api/financial-list/financial-list-sections/create',
      })
        .then(res => {
          this.accounts = res.data.body.account_trees
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    enums() {
      axios({
        method: 'GET',
        url: '/api/enums',
      }).then(res => {
        this.list_types = res.data.body.financial_list_type
        this.section_operators = res.data.body.income_list_section_operator
        this.section_item_operators =
          res.data.body.income_list_section_item_operator
      })
    },
  },
}
</script>
<style>
.finanacial_statment .vs__dropdown-toggle {
  border-radius: 5px !important;
  border: 1px solid #17a2b8 !important;
  height: 39px !important;
}
</style>
