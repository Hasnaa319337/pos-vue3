<template>
  <div class="users">
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div
          class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title" v-if="language">
            {{ trans('discountEdit') }}
          </h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="row mx-0 align-items-start justify-content-between mb-4">
            <b-col
              cols="12 mb-3"
              md="12"
              v-if="permissions.includes('create_discount')"
            >
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(store)">
                  <b-form-row>
                    <b-col cols="12" md="6">
                      <ValidationProvider
                        rules="required|englishLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('title') + ' (EN)'"
                      >
                        <b-form-group :label="trans('title') + ' (EN)'">
                          <b-form-input
                            type="text"
                            v-model="discount.translation.title.en"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts English words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col cols="12" md="6">
                      <ValidationProvider
                        rules="required|arabicLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('title') + ' (AR)'"
                      >
                        <b-form-group :label="trans('title') + ' (AR)'">
                          <b-form-input
                            type="text"
                            v-model="discount.translation.title.ar"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts arabic words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col cols="12" md="6">
                      <ValidationProvider
                        :name="trans('discount type')"
                        rules="required"
                        v-slot="{ valid, errors }"
                      >
                        <b-form-group :label="trans('discount type')">
                          <b-form-select
                            v-model="discount.type"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option value="percentage">
                              {{ trans('percentage') }}
                            </b-form-select-option>
                            <b-form-select-option value="fixed">
                              {{ trans('fixed_value') }}
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>

                    <b-col cols="12" md="6">
                      <ValidationProvider
                        rules="required|numeric"
                        v-slot="{ valid, errors }"
                        :name="trans('discount amount')"
                      >
                        <b-form-group :label="trans('discount amount')">
                          <b-form-input
                            type="number"
                            v-model="discount.value"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col cols="12" md="6">
                      <b-form-group>
                        <b-row>
                          <label class="switch" style="margin: 0 5px">
                            <input
                              type="checkbox"
                              v-model="discount.is_scheduled"
                              @change="checked = !checked"
                            />
                            <span class="slider round"></span>
                          </label>
                          <span style="margin: 3px 3px 0">
                            {{ trans('discount scheduled') }}</span
                          >
                        </b-row>
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6" v-if="discount.is_scheduled">
                      <ValidationProvider
                        :rules="`${discount.is_scheduled ? 'required' : ''}`"
                        :name="trans('date from')"
                      >
                        <b-form-group>
                          <VueDatePicker
                            v-model="date"
                            :placeholder="trans('select_date')"
                            :button-validate="trans('save')"
                            :button-cancel="trans('cancel')"
                            range
                            :range-header-text="`${trans('from')} %d ${trans(
                              'to'
                            )} %d`"
                            :range-input-text="`${trans('from')} %d ${trans(
                              'to'
                            )} %d`"
                            fullscreen-mobile
                            validate
                            rtl
                            @onClose="
                              showConsoleMessage('-- datepicker closed --')
                            "
                          />
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>

                  <b-form-row class="justify-content-center">
                    <b-button variant="success" type="submit">
                      {{ trans('save') }}
                    </b-button>
                    <b-button
                      variant="danger"
                      @click="resetForm()"
                      style="margin: 0 10px"
                    >
                      <span style="display: block">{{ trans('cancel') }}</span>
                    </b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </b-col>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppDiscountEdit',
  props: [
    'section',
    'sections',
    'user',
    'user_language',
    'settings',
    'permissions',
    'language',
  ],
  data() {
    return {
      discount: {
        type: 'percentage',
        is_scheduled: 0,

        value: 0,
        date_from: '',
        date_to: '',
        translation: {
          title: {
            ar: '',
            en: '',
          },
        },
      },
      checked: false,
      loaded: false,
      itemsLoaded: false,
      date: {
        start: '',
        end: '',
      },
    }
  },
  mounted() {
    this.getDiscount()
  },
  methods: {
    getDiscount() {
      axios({
        method: 'GET',
        url: '/api/discounts/' + this.$route.params.id,
      })
        .then(res => {
          this.discount = res.data.body.discount
          this.date.start = res.data.body.discount.date_from
          this.date.end = res.data.body.discount.date_to

          console.log(this.date)
        })
        .catch(error => {})
    },
    store() {
      let withoutDate = {
        title: {
          ar: this.discount.translation.title.ar,
          en: this.discount.translation.title.en,
        },
        type: this.discount.type,
        is_scheduled: this.discount.is_scheduled,
        discount_user: this.discount.discount_user,
        value: this.discount.value,
      }
      let withDate = {
        title: {
          ar: this.discount.translation.title.ar,
          en: this.discount.translation.title.en,
        },
        type: this.discount.type,
        is_scheduled: this.discount.is_scheduled,
        date_from: this.date.start,
        date_to: this.date.end,
        value: this.discount.value,
      }

      let url = '/api/discounts/' + this.$route.params.id

      let method = 'put'
      let data = this.discount.is_scheduled ? withDate : withoutDate

      axios[method](url, data)
        .then(res => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            ;(this.discount.translation.title.ar = ''),
              (this.discount.translation.title.en = ''),
              (this.discount.type = null),
              (this.discount.value = 0)

            this.$nextTick(() => {
              this.$refs.form.reset()
              this.date = {}
              this.discount.is_scheduled = false
            })
            this.$router.push('/discounts')
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
          }
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    resetForm() {
      this.$router.push('/discounts')
      ;(this.discount.translation.title.ar = ''),
        (this.discount.translation.title.en = ''),
        (this.discount.type = null),
        (this.discount.value = 0)
    },
  },
}
</script>
<style></style>
