<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div
          class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        >
          <h4
            class="card-title"
            v-if="user.language == 'en'"
            v-text="product.title"
          ></h4>
          <h4 class="card-title" v-else v-text="product.title_ar"></h4>
          <div class="dropdown">
            <router-link to="/products" class="btn btn-primary"
              >{{ trans('back to products') }}
              <font-awesome-icon icon="fa-solid fa-list" />
            </router-link>
            <router-link to="/products/add" class="btn btn-success"
              >{{ trans('add new product') }}
              <font-awesome-icon icon="fa-solid fa-plus"
            /></router-link>
          </div>
        </div>
        <div class="card-body">
          <div class="row mx-0 align-items-center justify-content-between mb-4">
            <div class="col-sm-12 text-center" v-if="message.length">
              <div
                class="alert"
                :class="'alert-' + alertType"
                v-html="message"
              ></div>
            </div>
            <div class="clear clearfix"></div>
            <div class="ml-md-0 mr-md-0 vertical-tab tab-minimal">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(update)">
                  <div class="col-sm-12 text-center">
                    <b-alert
                      variant="danger"
                      :show="
                        Object.keys(validationErrors).length ? true : false
                      "
                    >
                      <h6 v-for="(error, idx) in validationErrors" :key="idx">
                        {{ idx }} - {{ error[0] }}
                      </h6>
                    </b-alert>
                  </div>
                  <b-tabs pills card vertical v-if="variations.length">
                    <b-tab v-for="(vr, index) in variations" :key="vr.id">
                      <template v-slot:title>
                        <i
                          :class="
                            user.language == 'en'
                              ? 'fa fa-arrow-circle-right'
                              : 'fa fa-arrow-circle-left'
                          "
                        ></i>
                        <font-awesome-icon
                          v-if="user.language == 'en'"
                          icon="fa-solid fa-angle-right"
                        />
                        <font-awesome-icon
                          v-else
                          icon="fa-solid fa-angle-left"
                        />

                        {{ trans(vr.terms.title) }}
                      </template>
                      <b-form-row>
                        <b-col>
                          <b-form-group :label="strings['image']">
                            <b-form-file
                              @change="onFileChange($event, index)"
                            ></b-form-file>
                          </b-form-group>

                          <b-img
                            v-if="vr.image != 'parent'"
                            :src="vr.image"
                            width="100"
                          >
                          </b-img>
                          <b-img
                            v-else
                            :src="
                              product.image
                                ? product.image
                                : 'assets/images/product.png'
                            "
                            width="100"
                          >
                          </b-img>
                          <b-button variant="danger" @click="removeImage">
                            <font-awesome-icon icon="fa-solid fa-trash " />
                          </b-button>
                        </b-col>
                        <b-col>
                          <b-form-row>
                            <b-col>
                              <ValidationProvider
                                rules="required"
                                v-slot="{ valid, errors }"
                                name="serial"
                                :vid="
                                  user.language == 'en'
                                    ? vr.terms.title
                                    : vr.terms.title_ar +
                                      ' - ' +
                                      trans('serial')
                                "
                              >
                                <b-form-group :label="strings['serial']">
                                  <b-form-input
                                    type="text"
                                    v-model="vr.serial"
                                    :state="
                                      errors[0] ? false : valid ? true : null
                                    "
                                  ></b-form-input>
                                  <b-form-invalid-feedback
                                    id="inputLiveFeedback"
                                  >
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </ValidationProvider>
                            </b-col>
                          </b-form-row>
                          <b-form-row>
                            <b-col>
                              <ValidationProvider
                                rules="required|positive|decimal"
                                v-slot="{ valid, errors }"
                                name="cost"
                                :vid="
                                  user.language == 'en'
                                    ? vr.terms.title
                                    : vr.terms.title_ar + ' - ' + trans('cost')
                                "
                              >
                                <b-form-group :label="strings['cost']">
                                  <b-form-input
                                    type="text"
                                    v-model="vr.cost"
                                    :state="
                                      errors[0] ? false : valid ? true : null
                                    "
                                  ></b-form-input>
                                  <b-form-invalid-feedback
                                    id="inputLiveFeedback"
                                  >
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </ValidationProvider>
                            </b-col>
                            <b-col>
                              <ValidationProvider
                                rules="required|positive|decimal"
                                v-slot="{ valid, errors }"
                                name="price"
                                :vid="
                                  user.language == 'en'
                                    ? vr.terms.title
                                    : vr.terms.title_ar + ' - ' + trans('price')
                                "
                              >
                                <b-form-group :label="strings['price']">
                                  <b-form-input
                                    type="text"
                                    v-model="vr.price"
                                    :state="
                                      errors[0] ? false : valid ? true : null
                                    "
                                  ></b-form-input>
                                  <b-form-invalid-feedback
                                    id="inputLiveFeedback"
                                  >
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </ValidationProvider>
                            </b-col>
                          </b-form-row>
                          <b-form-row>
                            <b-col>
                              <ValidationProvider
                                rules="positive|decimal"
                                v-slot="{ valid, errors }"
                                name="sale_price"
                                :vid="
                                  user.language == 'en'
                                    ? vr.terms.title
                                    : vr.terms.title_ar +
                                      ' - ' +
                                      trans('sale price')
                                "
                              >
                                <b-form-group :label="strings['sale_price']">
                                  <b-form-input
                                    type="text"
                                    v-model="vr.sale_price"
                                    :state="
                                      errors[0] ? false : valid ? true : null
                                    "
                                  ></b-form-input>
                                  <b-form-invalid-feedback
                                    id="inputLiveFeedback"
                                  >
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </ValidationProvider>
                            </b-col>
                            <b-col>
                              <b-col>
                                <ValidationProvider
                                  rules="positive|decimal"
                                  v-slot="{ valid, errors }"
                                  name="tax"
                                  :vid="
                                    user.language == 'en'
                                      ? vr.terms.title
                                      : vr.terms.title_ar + ' - ' + trans('tax')
                                  "
                                >
                                  <b-form-group :label="strings['tax']">
                                    <b-form-input
                                      type="text"
                                      v-model="vr.tax"
                                      :state="
                                        errors[0] ? false : valid ? true : null
                                      "
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                      id="inputLiveFeedback"
                                    >
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                                </ValidationProvider>
                              </b-col>
                            </b-col>
                          </b-form-row>
                          <b-form-row>
                            <b-col>
                              <ValidationProvider
                                rules="numeric"
                                v-slot="{ valid, errors }"
                                name="quantity"
                                :vid="
                                  user.language == 'en'
                                    ? vr.terms.title
                                    : vr.terms.title_ar +
                                      ' - ' +
                                      trans('quantity')
                                "
                              >
                                <b-form-group :label="strings['stock']">
                                  <b-form-input
                                    type="number"
                                    :readonly="vr.quantity == 1 ? false : true"
                                    v-model="vr.quantity"
                                    :state="
                                      errors[0] ? false : valid ? true : null
                                    "
                                  ></b-form-input>
                                  <b-form-invalid-feedback
                                    id="inputLiveFeedback"
                                  >
                                    {{ errors[0] }}
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </ValidationProvider>
                            </b-col>
                          </b-form-row>
                          <b-form-row class="justify-content-center">
                            <b-button variant="success" type="submit"
                              ><font-awesome-icon icon="fa-solid fa-check" />
                            </b-button>
                          </b-form-row>
                        </b-col>
                      </b-form-row>
                    </b-tab>
                  </b-tabs>
                </b-form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppVariations',
  props: ['section', 'sections', 'user', 'langs'],
  data() {
    return {
      message: '',
      alertType: 'success',
      product: {},
      variations: [],
      strings: [],
      isMounted: false,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    this.isMounted = true
  },
  methods: {
    refresh() {
      axios
        .get('/api/products/variations/' + this.$route.params.id)
        .then(res => {
          this.variations = res.data.variations
          this.product = res.data.product
          this.strings = res.data.strings
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    update() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'
      axios
        .post('/api/products/variations/' + this.$route.params.id + '/update', {
          variations: this.variations,
        })
        .then(res => {
          if (res.data.success) {
            this.message = res.data.message
            this.alertType = 'success'
            // console.log("length",this.$refs.form.length);
            this.$nextTick(() => {
              this.$refs.form.reset()
            })
          } else {
            this.message = res.data.message
            this.alertType = 'danger'
          }
        })
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    onFileChange(e, index) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0], index)
    },
    createImage(file, index) {
      var image = new Image()
      var reader = new FileReader()
      var vm = this

      reader.onload = e => {
        vm.variations[index].image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e, index) {
      this.variations[index].image = this.product.image
    },
  },
  computed: {
    validationErrors() {
      let errors = {}
      if (!this.isMounted) return errors

      $.each(this.$refs.form.errors, function (key, value) {
        if (value != '' && value != 'undefined') {
          errors[key] = value
        }
      })
      return errors
    },
  },
}
</script>
