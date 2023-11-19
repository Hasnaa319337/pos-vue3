<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title" v-if="user.language">{{ trans('Taxes') }}</h4>
          <div class="dropdown">
            <GoBackButton style="margin-top: 5px !important" />
          </div>
        </div>
        <div class="card-body">
          <div class="align-items-center justify-content-between mb-4">
            <b-row class="mx-0">
              <b-col cols="12" md="4" v-if="permissions.includes('add_taxes')">
                <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                  <b-form @submit.prevent="handleSubmit(store)">
                    <ValidationProvider
                      rules="englishLettersAndNumbersOnly"
                      v-slot="{ valid, errors }"
                      name="name"
                    >
                      <b-form-group :label="`${strings['title'] + ' ' + '(EN)'}`">
                        <b-form-input
                          type="text"
                          v-model="tax.translation.title.en"
                          :state="errors[0] ? false : valid ? true : null"
                        ></b-form-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                      rules="required|arabicLettersAndNumbersOnly"
                      v-slot="{ valid, errors }"
                      name="name_ar"
                    >
                      <b-form-group :label="`${strings['title'] + ' ' + '(AR)'}`">
                        <b-form-input
                          type="text"
                          v-model="tax.translation.title.ar"
                          :state="errors[0] ? false : valid ? true : null"
                        ></b-form-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider rules="required" v-slot="{ valid, errors }" name="tax_type">
                      <b-form-group :label="strings['type']">
                        <b-form-select
                          v-model="tax.type"
                          :state="errors[0] ? false : valid ? true : null"
                        >
                          <b-form-select-option value="percentage">
                            {{ strings['percentage'] }}
                          </b-form-select-option>
                          <b-form-select-option value="fixed">
                            {{ strings['fixed value'] }}
                          </b-form-select-option>
                        </b-form-select>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                      :rules="`required|${langs.locale == 'en' ? 'numbersOnly' : 'numbersOnly'}`"
                      name="tax_value"
                      v-slot="{ valid, errors }"
                    >
                      <b-form-group :label="strings['tax value']">
                        <b-form-input
                          type="text"
                          v-model="tax.value"
                          :state="errors[0] ? false : valid ? true : null"
                        ></b-form-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </ValidationProvider>
                    <b-form-row class="justify-content-center mb-4">
                      <b-button variant="primary" type="submit" v-if="EditMode">
                        <font-awesome-icon icon="fa-solid fa-check " />
                      </b-button>
                      <b-button variant="success" type="submit" v-else>
                        <i class="bi bi-plus-lg"></i>
                      </b-button>
                    </b-form-row>
                  </b-form>
                </ValidationObserver>
              </b-col>
              <b-col cols="12" md="8" v-if="permissions.includes('view_taxes')">
                <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                  <b-thead>
                    <b-tr class="rounded" variant="dark">
                      <b-th>{{ strings['title'] }} (EN)</b-th>
                      <b-th>{{ strings['title'] }} (AR)</b-th>
                      <b-th>{{ strings['tax value'] }}</b-th>
                      <b-th></b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody v-if="itemsLoaded && taxes.length" class="text-center">
                    <b-tr v-for="(tax, idx) in taxes" :key="tax.id">
                      <b-td>{{ tax.title }}</b-td>
                      <b-td>{{ tax.title_ar }}</b-td>
                      <b-td>{{ tax.type == 'percentage' ? tax.value + '%' : tax.value }}</b-td>
                      <b-td>
                        <a
                          v-b-tooltip.hover
                          :title="trans('edit')"
                          style="cursor: pointer; color: #007bff !important"
                          class="mx-2"
                          v-if="permissions.includes('edit_taxes')"
                          @click="edit(idx, tax)"
                          ><font-awesome-icon icon="fa-solid fa-pen-to-square"
                        /></a>

                        <a
                          v-b-tooltip.hover
                          :title="trans('delete')"
                          style="cursor: pointer; color: #dc3545 !important"
                          class="mx-2"
                          v-if="permissions.includes('delete_taxes')"
                          @click="Delete(tax.id)"
                        >
                          <font-awesome-icon icon="fa-solid fa-trash "
                        /></a>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                  <b-tbody v-else-if="itemsLoaded && !taxes.length" class="text-center">
                    <b-tr>
                      <b-td colspan="4">
                        <h5 class="no_results_found">
                          {{ strings['no_results_found'] }}
                        </h5>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                  <b-tbody v-else class="text-center">
                    <b-tr>
                      <b-td colspan="4">
                        <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-col>
              <b-col cols="12" v-else>
                <h2 class="text-center" v-if="user.language == 'en'">
                  You Not Allowed to Open This Page
                </h2>
                <h2 class="text-center" v-else>هذه الصفحه غير مسموح لك الدخول عليها</h2>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <skeleton-loader />
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'

export default {
  components: { SkeletonLoader },
  name: 'AppTaxes',
  props: ['section', 'sections', 'user', 'user_language', 'langs', 'permissions'],
  data() {
    return {
      message: '',
      alertType: 'success',
      taxes: [],
      strings: [],
      tax: {
        type: '',

        value: '',

        translation: {
          title: {
            ar: '',
            en: ''
          }
        }
      },
      EditMode: 0,
      loaded: false,
      editIndex: '',
      itemsLoaded: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    refresh() {
      // this.loaded = false;
      this.itemsLoaded = false

      this.axios
        .get('/api/taxes')
        .then((res) => {
          this.taxes = res.data.taxes
          this.strings = res.data.strings
          this.loaded = true
          this.itemsLoaded = true
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    edit(idx, tax) {
      this.EditMode = 1
      this.tax = this.cloneItem(tax)
      this.editIndex = idx
    },
    store() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'

      let method = this.EditMode ? 'put' : 'post'

      let uri = this.EditMode ? '/api/taxes/' + this.tax.id : '/api/taxes/store'

      this.axios[method](uri, this.tax)
        .then((res) => {
          if (res.data.success) {
            this.message = res.data.message
            this.alertType = 'success'
            this.tax = {
              type: '',
              value: '',
              translation: {
                title: {
                  ar: '',
                  en: ''
                }
              }
            }
            if (this.EditMode) {
              this.EditMode = 0
              this.taxes[this.editIndex] = this.tax
              // this.refresh();
            } else {
              this.taxes.push(res.data.tax)
            }
            this.$nextTick(() => {
              this.$refs.form.reset()
            })
            this.tax = {
              type: ''
            }
          } else {
            this.message = res.data.message
            this.alertType = 'danger'
          }
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    Delete(id) {
      this.$bvModal
        .msgBoxConfirm(this.trans('Do you want to delete this tax'), {
          okTitle: this.user.language == 'en' ? 'Yes' : 'نعم',
          cancelTitle: this.user.language == 'en' ? 'No' : 'لا',
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal'
        })
        .then((value) => {
          if (value) {
            this.message = "<i class='fa fa-spin fa-spinner'></i>"
            this.alertType = 'info'
            this.axios
              .post('/api/taxes/delete', { id: id })
              .then((res) => {
                if (res.data.success) {
                  this.message = res.data.message
                  this.alertType = 'success'
                  this.taxes = this.taxes.filter((x) => {
                    return x.id != id
                  })
                } else {
                  this.message = res.data.message
                  this.alertType = 'danger'
                }
              })
              .catch((error) => {
                this.message = error.response.data.message
                this.alertType = 'danger'
                setTimeout(() => {
                  this.message = ''
                  this.alertType = 'success'
                }, 120000)
              })
          }
        })
        .catch((err) => {
          // An error occurred
          console.log(err)
        })
    }
  }
}
</script>

<style>
tr.select-tax {
  border: 1px solid #000;
  background-color: #077b53 !important;
  height: 60px;
}
</style>
