<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card finanacial_statment">
      <div class="card-header mb-3 header-sm d-flex">
        <div class="row m-0 w-100 justify-content-between align-items-center">
          <h4 class="card-title col-auto" v-if="language">
            {{ trans('add_financial_equation') }}
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
                <b-form-group :label="trans('equation_name') + ' ( Ar ) '">
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
                <b-form-group :label="trans('equation_name') + ' ( En ) '">
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
          </b-row>
          <!-- <v-card
            class="details col-md-10"
            style="margin: auto"
            v-if="account.items[0].account_tree_id"
          >
            <b-col cols="12" class="detail_card" style="display: flex">
              <p
                v-for="item in account.items"
                :key="item.id"
                style="dispaly: flex"
              >
                <span
                  >{{ getAccountTitle(item.account_tree_id, accounts) }}
                </span>

                <strong v-if="item.mathematics_operator === 'plus'"> +</strong>
                <strong v-if="item.mathematics_operator === 'minus'"> -</strong>
              </p>
            </b-col>
          </v-card> -->
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
                  <b-tr v-for="(item, index) in account.items" :key="item.id">
                    <b-td style="max-width: 180px !important">
                      <v-select
                        v-model="account.items[index].account_tree_id"
                        :dir="language == 'ar' ? 'rtl' : 'rtl'"
                        :value="account.id"
                        label="title"
                        :options="accounts"
                        :reduce="option => option.id"
                      >
                      </v-select>
                    </b-td>

                    <b-td>
                      <b-form-select
                        v-model="account.items[index].mathematics_operator"
                        style="
                          border-radius: 5px !important;
                          border: 1px solid #17a2b8;
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
                    <b-td>
                      <b-button
                        style="outline: none"
                        class="trash_btn"
                        @click="addItem(item)"
                        variant="danger"
                        v-if="account.items.length - 1 === index"
                      >
                        <font-awesome-icon icon="fa-solid fa-plus" />
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
    'inventories',
  ],
  data() {
    return {
      accounts: [],
      account_id: '',
      account: {
        items: [{ account_tree_id: '', mathematics_operator: '' }],
        type: '',
        title: {
          ar: '',
        },

        mathematics_operator: '',
      },
      section_operators: [],
      section_item_operators: [],
      list_types: [],
      accountTitle: '',
    }
  },
  mounted() {
    this.create()
    this.enums()
  },
  methods: {
    getAccountTitle(id, array) {
      var result = array.filter(el => {
        if (id) {
          return el.id === id
        } else {
        }
      })[0]

      return result
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
    createFinancialStatment() {
      axios({
        method: 'post',
        url: '/api/equation/financial-equations',
        data: this.account,
      })
        .then(res => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            this.$router.push('/financial-equations')
          }
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    addItem() {
      let item = {
        account: {
          account_tree_id: 1,
          mathematics_operator: '',
        },
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
