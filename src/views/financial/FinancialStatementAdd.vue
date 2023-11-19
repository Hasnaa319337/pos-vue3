<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card finanacial_statment">
      <div class="card-header mb-3 header-sm d-flex">
        <div class="row m-0 w-100 justify-content-between align-items-center">
          <h4 class="card-title col-auto" v-if="language">
            {{ trans('add_financial_section') }}
          </h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
      </div>
      <div class="card-body">
        <b-form @submit.prevent="createFinancialStatment()">
          <!-- Select  -->
          <b-row style="justify-content: center">
            <b-col cols="12" md="3">
              <ValidationProvider
                rules="required|arabicLettersAndNumbersOnly"
                v-slot="{ valid, errors }"
                name="trans('name') + '(AR)"
              >
                <b-form-group :label="trans('section_name') + ' ( Ar ) '">
                  <b-input
                    class="request_input"
                    style="
                      border-radius: 5px !important;
                      height: 35px !important;
                      border: 1px solid #17a2b8;
                    "
                    v-model="account.title.ar"
                    :state="errors[0] ? false : valid ? true : null"
                  ></b-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ trans('This field accepts arabic words only') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col cols="12" md="3">
              <ValidationProvider
                rules="required|englishLettersAndNumbersOnly"
                v-slot="{ valid, errors }"
                name="trans('name') + '(AR)"
              >
                <b-form-group :label="trans('section_name') + ' ( En ) '">
                  <b-input
                    class="request_input"
                    style="
                      border-radius: 5px !important;
                      height: 35px !important;
                      border: 1px solid #17a2b8;
                    "
                    v-model="account.title.en"
                    :state="errors[0] ? false : valid ? true : null"
                  ></b-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ trans('This field accepts English words only') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="trans('list_type')">
                <b-form-select
                  v-model="account.type"
                  style="border-radius: 5px !important; border: 1px solid #17a2b8"
                >
                  <b-form-select-option v-for="(key, type) in list_types" :key="key" :value="type">
                    {{ key }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="trans('math_operator')">
                <b-form-select
                  v-model="account.mathematics_operator"
                  style="border-radius: 5px !important; border: 1px solid #17a2b8"
                >
                  <b-form-select-option
                    v-for="(key, operator) in section_operators"
                    :key="key"
                    :value="operator"
                  >
                    {{ key }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Add item -->
          <div class="col-sm-12">
            <div class="table-responsive" style="padding: 0; margin: 0">
              <b-table-simple
                sticky-header
                striped
                bordered
                responsive
                style="min-height: 400px; padding: 0; margin: 0"
              >
                <b-thead>
                  <b-tr class="rounded" item="dark">
                    <th style="width: 30% !important">
                      {{ trans('account') }} / {{ trans('equation') }}
                    </th>
                    <th style="width: 30% !important; border: 1px solid #85c3ff">
                      {{ trans('account_name') }} / {{ trans('equation_name') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('math_operator') }}
                    </th>
                    <th>{{ trans('actions') }}</th>
                  </b-tr>
                </b-thead>
                <b-tbody class="request_body">
                  <b-tr v-for="(item, index) in account.items" :key="item.id">
                    <b-td>
                      <b-form-select
                        v-model="account.items[index].reference_type"
                        style="border-radius: 5px !important; border: 1px solid #17a2b8"
                      >
                        <b-form-select-option
                          v-for="(key, val) in financial_reference_types"
                          :key="key"
                          :value="val"
                        >
                          {{ key }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-td>
                    <b-td style="max-width: 180px !important">
                      <v-select
                        v-if="account.items[index].reference_type === 'account_tree'"
                        v-model="account.items[index].reference_id"
                        :dir="language == 'ar' ? 'rtl' : 'rtl'"
                        :value="account.id"
                        label="title"
                        :options="accounts"
                        :reduce="(option) => option.id"
                      >
                      </v-select>

                      <v-select
                        v-if="account.items[index].reference_type === 'financial_equation'"
                        v-model="account.items[index].reference_id"
                        :dir="language == 'ar' ? 'rtl' : 'ltr'"
                        :value="account.id"
                        label="title"
                        :options="financial_equations"
                        :reduce="(option) => option.id"
                      >
                      </v-select>
                    </b-td>

                    <b-td>
                      <b-form-select
                        v-model="account.items[index].mathematics_operator"
                        style="border-radius: 5px !important; border: 1px solid #17a2b8"
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
                    <b-td>
                      <b-button
                        style="outline: none"
                        class="trash_btn"
                        @click="addItem(item)"
                        variant="danger"
                        v-if="account.items.length - 1 === index"
                      >
                        <i class="bi bi-plus-lg"></i>
                      </b-button>

                      <b-button
                        style="outline: none"
                        variant="danger"
                        @click="removeItem(item)"
                        v-if="account.items.length - 1 !== index"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash " />
                      </b-button>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </div>

          <div class="col-sm-12 d-flex" style="justify-content: center">
            <button
              class="col-sm-3 text-center final_btn final_btn1"
              type="submit"
              style="width: 163px; color: #fff"
            >
              {{ trans('save') }}
            </button>
          </div>
        </b-form>
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
    'inventories'
  ],
  data() {
    return {
      financial_reference_types: [],
      accounts: [],
      financial_equations: [],
      account_id: '',
      account: {
        items: [{ reference_id: '', mathematics_operator: '', reference_type: '' }],
        type: '',
        title: {
          ar: ''
        },

        mathematics_operator: ''
      },
      section_operators: [],
      section_item_operators: [],
      list_types: []
    }
  },
  mounted() {
    this.create()
    this.enums()
  },
  methods: {
    create() {
      axios({
        method: 'GET',
        url: '/api/financial-list/financial-list-sections/create'
      })
        .then((res) => {
          this.accounts = res.data.body.account_trees
          this.financial_equations = res.data.body.financial_equations
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    createFinancialStatment() {
      axios({
        method: 'post',
        url: '/api/financial-list/financial-list-sections',
        data: this.account
      })
        .then((res) => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            this.$router.push('/financial-list-sections')
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    addItem() {
      let item = {
        account: ''
      }
      this.account.items.push(item)
      console.log(this.account.items)
    },
    removeItem(idx) {
      this.account.items.splice(idx, 1)
    },
    enums() {
      axios({
        method: 'GET',
        url: '/api/enums'
      }).then((res) => {
        this.list_types = res.data.body.financial_list_type
        this.financial_reference_types = res.data.body.financial_reference_type
        this.section_operators = res.data.body.income_list_section_operator
        this.section_item_operators = res.data.body.income_list_section_item_operator
      })
    }
  }
}
</script>
<style>
.finanacial_statment .vs__dropdown-toggle {
  border-radius: 5px !important;
  border: 1px solid #17a2b8 !important;
  height: 39px !important;
}
</style>
