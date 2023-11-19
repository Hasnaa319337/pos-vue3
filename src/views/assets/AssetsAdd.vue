<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div
          class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">{{ trans('add_asset') }}</h4>
          <div class="dropdown">
            <b-button @click="$router.go(-1)" class="btn btn-warning"
              ><font-awesome-icon icon="fa-solid fa-reply-all" />
            </b-button>
          </div>
        </div>
        <div class="card-body">
          <div class="row mx-0 align-items-center justify-content-between mb-4">
            <div class="col-sm-12 text-center" v-if="this.message.length">
              <div
                class="alert"
                :class="'alert-' + alertType"
                v-html="this.message"
              ></div>
            </div>
            <div class="clear clearfix"></div>
            <div class="col-sm-12" v-if="loaded">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(store)">
                  <b-form-row>
                    <b-col>
                      <ValidationProvider
                        rules=""
                        v-slot="{ valid, errors }"
                        name="main-account"
                      >
                        <b-form-group :label="trans('asset_account')">
                          <b-form-select
                            v-model="asset.main_account"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option
                              v-for="account in accounts"
                              :value="account.account"
                              :key="account.account"
                            >
                              <span>{{ account.title }}</span>
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <div class="col-6">
                      <ValidationProvider
                        rules="englishLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        name="name-en"
                      >
                        <b-form-group :label="trans('asset_name') + '(en)'">
                          <b-form-input
                            type="text"
                            v-model="asset.translation.title.en"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-6">
                      <ValidationProvider
                        rules="required|arabicLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        name="name-ar"
                      >
                        <b-form-group :label="trans('asset_name') + '(ar)'">
                          <b-form-input
                            type="text"
                            v-model="asset.translation.title.ar"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-6">
                      <ValidationProvider
                        rules="englishLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        name="description-en"
                      >
                        <b-form-group
                          :label="trans('asset_description') + '(en)'"
                        >
                          <b-textarea
                            type="text"
                            v-model="asset.translation.description.en"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-textarea>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-6">
                      <ValidationProvider
                        rules="required|arabicLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        name="description-ar"
                      >
                        <b-form-group
                          :label="trans('asset_description') + '(ar)'"
                        >
                          <b-textarea
                            type="text"
                            v-model="asset.translation.description.ar"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-textarea>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>

                    <div class="col-6">
                      <ValidationProvider
                        rules="required|arabicLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        name="price"
                      >
                        <b-form-group :label="trans('asset_price')">
                          <b-form-input
                            type="number"
                            v-model="asset.purchases_price"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-6">
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        name="purchases_date"
                      >
                        <b-form-group :label="trans('purchases_date')">
                          <b-form-input
                            type="date"
                            v-model="asset.purchases_date"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                  </b-form-row>
                  <h4>{{ trans('asset depreciation data') }}</h4>
                  <hr />
                  <b-form-row>
                    <div class="col-6">
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        name="depreciation_period"
                      >
                        <b-form-group :label="trans('depreciation_period')">
                          <b-form-input
                            type="number"
                            v-model="asset.depreciation_period"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-6">
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        name="depreciation_period_type"
                      >
                        <b-form-group
                          :label="trans('depreciation_period_type')"
                        >
                          <b-form-select
                            v-model="asset.depreciation_period_type"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option
                              v-for="(value, key) in depreciation_types"
                              :value="key"
                              :key="key"
                            >
                              <span>{{ value }} </span>
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                  </b-form-row>
                  <b-form-row>
                    <div class="col-6">
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        name="depreciation_value"
                      >
                        <b-form-group :label="trans('depreciation_value')">
                          <b-form-input
                            type="number"
                            v-model="asset.depreciation_value"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-6">
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        name="depreciation_value_type"
                      >
                        <b-form-group :label="trans('depreciation_value_type')">
                          <b-form-select
                            v-model="asset.depreciation_value_type"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option
                              v-for="(value, key) in depreciation_values"
                              :value="key"
                              :key="key"
                            >
                              <span>{{ value }}</span>
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                  </b-form-row>
                  <b-form-row class="justify-content-center">
                    <b-button variant="success" type="submit"
                      ><font-awesome-icon icon="fa-solid fa-check" />
                    </b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </div>
            <div v-else class="text-center col-sm-12">
              <font-awesome-icon
                class="fa-spin-pulse"
                icon="fa-solid fa-spinner "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppProductsAdd',
  props: ['section', 'sections', 'user', 'langs', 'settings'],
  data() {
    return {
      message: '',
      alertType: 'success',
      accounts: [],
      depreciation_types: [],
      depreciation_values: [],
      asset: {
        translation: {
          title: {
            ar: '',
            en: '',
          },
          description: {
            ar: '',
            en: '',
          },
        },
        purchases_date: localStorage.getItem('Today'),
        purchases_price: '',
        main_account: '',
        depreciation_period: '',
        depreciation_period_type: '',
        depreciation_value_type: '',
        depreciation_value: '',
      },
      terms: {},
      attributes: [],
      strings: [],
      loaded: false,
    }
  },
  mounted() {
    window.scrollTo(0, 0)

    this.refresh()
  },
  methods: {
    refresh() {
      axios.get('/api/assets/create').then(res => {
        this.accounts = res.data.body.asset_accounts
        this.depreciation_types = res.data.body.depreciation_period_type
        this.depreciation_values = res.data.body.depreciation_value_type
        this.strings = res.data.body.strings
        this.loaded = true
        console.log(this.depreciation_types)
      })
    },
    store() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'
      let data = {
        title: {
          ar: this.asset.translation.title.ar,
          en: this.asset.translation.title.en,
        },
        description: {
          ar: this.asset.translation.description.ar,
          en: this.asset.translation.description.en,
        },
        purchases_date: this.asset.purchases_date,
        purchases_price: this.asset.purchases_price,
        main_account: this.asset.main_account,
        depreciation_period: this.asset.depreciation_period,
        depreciation_period_type: this.asset.depreciation_period_type,
        depreciation_value_type: this.asset.depreciation_value_type,
        depreciation_value: this.asset.depreciation_value,
      }
      axios
        .post('/api/assets', data)
        .then(
          res => {
            if (res.data.status) {
              this.message = res.data.message
              // this.alertType = 'success'
              ;(this.asset = {
                translation: {
                  title: {
                    ar: '',
                    en: '',
                  },
                  description: {
                    ar: '',
                    en: '',
                  },
                },
                purchases_date: '',
                purchases_price: '',
                main_account: '',
                depreciation_period: '',
                depreciation_period_type: '',
                depreciation_value_type: '',
                depreciation_value: '',
              }),
                setTimeout(() => {
                  this.message = ''
                  this.alertType = 'success'
                }, 5000)
              this.$router.push('/asset')
              this.$nextTick(() => {
                this.$refs.form.reset()
              })
            } else {
              this.message = res.data.message
              this.alertType = 'danger'
              setTimeout(() => {
                this.message = ''
                this.alertType = 'success'
              }, 120000)
            }
          },
          error => {
            this.message = error.response.data.message
            this.alertType = 'danger'
            setTimeout(() => {
              this.message = ''
              this.alertType = 'success'
            }, 120000)
          }
        )
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
  },
}
</script>
