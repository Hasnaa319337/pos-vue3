<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card finanacial_statment">
      <div class="card-header mb-3 header-sm d-flex">
        <div class="row m-0 w-100 justify-content-between align-items-center">
          <h4 class="card-title col-auto" v-if="language">
            {{ trans('edit_financial_equation') }}
          </h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
      </div>
      <div class="card-body">
        <b-form @submit.prevent="updateFinancialStatment()">
          <!-- Select  -->
          <b-row style="justify-content: center">
            <b-col cols="12" md="3">
              <ValidationProvider
                rules="required|arabicLettersAndNumbersOnly"
                v-slot="{ valid, errors }"
                name="trans('name') + '(AR)"
              >
                <b-form-group :label="trans('equation_name') + ' ( Ar ) '">
                  <b-input
                    class="request_input"
                    style="
                      border-radius: 5px !important;
                      height: 35px !important;
                      border: 1px solid #17a2b8;
                    "
                    v-model="financial_equation.translation.title.ar"
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
                <b-form-group :label="trans('equation_name') + ' ( En ) '">
                  <b-input
                    class="request_input"
                    style="
                      border-radius: 5px !important;
                      height: 35px !important;
                      border: 1px solid #17a2b8;
                    "
                    v-model="financial_equation.translation.title.en"
                    :state="errors[0] ? false : valid ? true : null"
                  ></b-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ trans('This field accepts English words only') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
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
                    <th style="width: 41% !important">
                      {{ trans('account_name') }}
                    </th>
                    <th style="border: 2px solid #85c3ff">
                      {{ trans('math_operator') }}
                    </th>
                    <th>{{ trans('actions') }}</th>
                  </b-tr>
                </b-thead>
                <b-tbody class="request_body">
                  <b-tr v-for="(item, index) in financial_equation.items" :key="item.id">
                    <b-td style="max-width: 180px !important">
                      <v-select
                        v-model="financial_equation.items[index].account"
                        :dir="language == 'ar' ? 'rtl' : 'ltr'"
                        :value="account_id"
                        label="title"
                        :options="accounts"
                        :reduce="(option) => option.id"
                      >
                      </v-select>
                    </b-td>

                    <b-td>
                      <b-form-select
                        v-model="financial_equation.items[index].mathematics_operator"
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
                        v-if="financial_equation.items.length - 1 === index"
                      >
                        <i class="bi bi-plus-lg"></i>
                      </b-button>

                      <b-button
                        style="outline: none"
                        variant="danger"
                        @click="removeItem(item)"
                        v-if="financial_equation.items.length - 1 !== index"
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
import axios from 'axios'
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
      accounts: [],
      account_id: '',
      financial_equation: {
        translation: {
          title: {
            ar: '',
            en: ''
          }
        },
        items: [{ account_tree_id: '', mathematics_operator: '' }],

        mathematics_operator: ''
      },
      section_operators: [],
      section_item_operators: [],
      list_types: []
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
        url: '/api/equation/financial-equations/' + this.$route.params.id
      })
        .then((res) => {
          this.financial_equation = res.data.body.financial_equation
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    create() {
      axios({
        method: 'GET',
        url: '/api/financial-list/financial-list-sections/create'
      })
        .then((res) => {
          this.accounts = res.data.body.account_trees
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    updateFinancialStatment() {
      let myData = {
        items: this.financial_equation.items,
        title: this.financial_equation.translation.title,
        mathematics_operator: this.financial_equation.mathematics_operator
      }
      axios
        .put(`/api/equation/financial-equations/${this.$route.params.id}`, myData)

        .then((res) => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            this.$router.push('/financial-equations')
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
