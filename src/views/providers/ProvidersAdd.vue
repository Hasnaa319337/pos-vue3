<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card ProvidersAdd">
      <div class="card">
        <div
          class="card-header header-sm mb-3 d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title" v-if="language">
            {{ trans('add_provider') }}
          </h4>
          <div class="btns_header">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body" v-if="permissions.includes('view_provider')">
          <b-row class="mx-0">
            <b-col
              cols="12"
              md="12"
              v-if="permissions.includes('create_provider')"
            >
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(store)">
                  <b-form-row>
                    <b-col cols="12" md="4">
                      <ValidationProvider
                        rules="required|englishLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        name="name"
                      >
                        <b-form-group :label="trans('name_en')">
                          <b-form-input
                            type="text"
                            v-model="provider.translation.name.en"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col cols="12" md="4">
                      <ValidationProvider
                        rules="required|arabicLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        name="name_ar"
                      >
                        <b-form-group :label="trans('name_ar')">
                          <b-form-input
                            type="text"
                            v-model="provider.translation.name.ar"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>

                    <b-col cols="12" md="4">
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        :name="trans('address')"
                      >
                        <b-form-group :label="trans('address')">
                          <b-form-input
                            type="text"
                            v-model="provider.address"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>

                    <b-col cols="12" md="4">
                      <ValidationProvider
                        :rules="`${
                          language == 'en' ? '15numbersOnly' : '15numbersOnly'
                        }`"
                        v-slot="{ valid, errors }"
                        name="tax_num"
                      >
                        <b-form-group :label="trans('tax_num')">
                          <b-form-input
                            type="number"
                            v-model="provider.tax_num"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col cols="12" md="4">
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        :name="trans('phone')"
                      >
                        <b-form-group :label="trans('phone')">
                          <vue-phone-number-input
                            :state="errors[0] ? false : valid ? true : null"
                            :only-countries="['SA', 'EG']"
                            v-model="provider.phone"
                            default-country-code="SA"
                            required
                            placeholder=""
                            @update="onCountryChange"
                          ></vue-phone-number-input>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>

                  <b-form-row
                    class="justify-content-center mb-4"
                    style="gap: 5px"
                  >
                    <b-button variant="success" type="submit">
                      {{ trans('save') }}
                    </b-button>
                    <b-button variant="danger">
                      <router-link
                        to="/providers"
                        style="color: #fff; text-decoration: none"
                      >
                        {{ trans('cancel') }}</router-link
                      >
                    </b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppProviders',
  props: [
    'section',
    'sections',
    'user',
    'user_language',
    'settings',
    'langs',
    'permissions',
    'language',
  ],
  data() {
    return {
      columns: [
        'name',
        'name_en',
        'phone',
        'tax_num',
        'added_by',
        'debit',
        'credit',
        'created_at',
        'options',
      ],
      skeletonLoading: true,

      providers: [],
      total_debit: 0,
      total_credit: 0,
      total: '',
      current_page: '',
      prev_page: '',
      next_page: '',
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      strings: [],
      provider: {
        translation: {
          name: {
            en: '',
            ar: '',
          },
        },

        address: '',
        phone: '',
        tax_num: '',
      },
      filters: {},
      EditMode: 0,
      loaded: false,
      tableLoaded: false,
      searchOn: false,
      countryCode: 'SA',
      myPhone: '',
    }
  },

  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    onCountryChange(e) {
      this.countryCode = e.countryCode
      this.myPhone = e.formattedNumber
      console.log(e)
      console.log(e.formattedNumber)
    },

    store() {
      let uri = '/api/providers'

      let method = 'post'
      let data = {
        name: {
          ar: this.provider.translation.name.ar,
          en: this.provider.translation.name.en,
        },
        tax_num: this.provider.tax_num,
        phone: this.myPhone,
        address: this.provider.address,
      }
      axios[method](uri, data)
        .then(
          res => {
            this.showToastError(res.data.message, res.data.custom_code)

            this.providers.push(res.data.body.provider)
            ;(this.provider = {
              translation: {
                name: {
                  en: '',
                  ar: '',
                },
              },
              tax_num: '',
              address: '',
              phone: '',
              tax_num: '',
            }),
              this.$nextTick(() => {
                this.$refs.form.reset()
              })
            setTimeout(() => {
              this.$router.push('/providers')
            }, 2000)
          },
          error => {
            this.showToastError(
              error.response.data.message,
              error.response.data.custom_code
            )
          }
        )
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    reset() {
      this.filters = {}
      this.$refs.form.reset()
    },
  },
}
</script>

<style>
.white-nowrap tr th {
  white-space: nowrap !important;
}

tr.select-provider {
  border: 1px solid #000;
  background-color: #077b53 !important;
  height: 60px;
}

.search-btns button {
  margin-bottom: 16px;
}
.ProvidersAdd .form-control {
  border-radius: 5px !important;
  height: 47px !important;
}
</style>
