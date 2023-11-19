<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div
          class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">{{ trans('add_product') }}</h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body" v-if="permissions.includes('create_product')">
          <div class="row mx-0 align-items-center justify-content-between mb-4">
            <div
              class="card-body"
              v-if="permissions.includes('create_product')"
            >
              <div
                class="row mx-0 align-items-center justify-content-between mb-4"
              >
                <div
                  class="col-sm-12"
                  v-if="permissions.includes('create_product')"
                >
                  <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                    <b-form @submit.prevent="handleSubmit(store)">
                      <b-form-row>
                        <b-col>
                          <ValidationProvider
                            rules="required|englishLettersAndNumbersOnly"
                            v-slot="{ valid, errors }"
                            :name="trans('serial')"
                          >
                            <b-form-group :label="trans('serial')">
                              <b-form-input
                                type="text"
                                v-model="product.serial"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{
                                  trans('This field accepts English words only')
                                }}
                                - {{ trans('without sapces') }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </b-col>
                      </b-form-row>
                      <b-form-row>
                        <div class="col-sm-6 col-12">
                          <ValidationProvider
                            rules="required|arabicLettersAndNumbersOnly"
                            v-slot="{ valid, errors }"
                            :name="trans('title') + 'AR'"
                          >
                            <b-form-group :label="trans('arabic title')">
                              <b-form-input
                                type="text"
                                v-model="product.translation.title.ar"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{
                                  trans('This field accepts arabic words only')
                                }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>

                        <div class="col-sm-6 col-12">
                          <ValidationProvider
                            rules="required|englishLettersAndNumbersOnly"
                            v-slot="{ valid, errors }"
                            :name="trans('title') + 'EN'"
                          >
                            <b-form-group :label="trans('english title')">
                              <b-form-input
                                type="text"
                                v-model="product.translation.title.en"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{
                                  trans('This field accepts English words only')
                                }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                      </b-form-row>
                      <b-form-row>
                        <div class="col-sm-6 col-12">
                          <ValidationProvider
                            rules="required|arabicLettersAndNumbersOnly"
                            v-slot="{ valid, errors }"
                            :name="trans('description') + 'ar'"
                          >
                            <b-form-group :label="trans('arabic description')">
                              <b-form-textarea
                                v-model="product.translation.description.ar"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-textarea>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{
                                  trans('This field accepts arabic words only')
                                }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                        <div class="col-sm-6 col-12">
                          <ValidationProvider
                            rules="required|englishLettersAndNumbersOnly"
                            v-slot="{ valid, errors }"
                            :name="trans('description') + 'en'"
                          >
                            <b-form-group :label="trans('english description')">
                              <b-form-textarea
                                v-model="product.translation.description.en"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-textarea>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{
                                  trans('This field accepts English words only')
                                }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                      </b-form-row>
                      <b-form-row>
                        <div class="col-sm-6 col-12">
                          <div v-if="product.image">
                            <b-img :src="shownImage.src" width="100" />
                          </div>
                          <ValidationProvider :name="trans('image')">
                            <b-form-group :label="trans('image')">
                              <b-form-file
                                ref="image"
                                accept="image/*"
                                multiple="multiple"
                                @change="previewImage"
                                class="form-control-file d-block"
                                id="add_img"
                              ></b-form-file>
                              <span
                                class="hint"
                                style="
                                  font-size: 15px;
                                  margin-top: 9px;
                                  display: block;
                                "
                              >
                                {{ trans('the system accepts') }}</span
                              >
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ trans('required_field') }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                        <div class="col-sm-6 col-12">
                          <ValidationProvider
                            :name="trans('category')"
                            rules="required"
                            v-slot="{ valid, errors }"
                          >
                            <b-form-group :label="trans('category')">
                              <b-form-select
                                v-model="product.category_id"
                                :state="errors[0] ? false : valid ? true : null"
                              >
                                <b-form-select-option
                                  v-for="cat in categories"
                                  :value="cat.id"
                                  :key="cat.id"
                                >
                                  <span
                                    ><span v-if="cat.parent"
                                      >&nbsp; &nbsp;&nbsp; &nbsp;</span
                                    >{{ cat.title }}</span
                                  >
                                </b-form-select-option>
                              </b-form-select>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ trans('required_field') }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                      </b-form-row>

                      <b-form-row>
                        <div class="col-md-4 col-12">
                          <ValidationProvider
                            rules="required|positive|decimal"
                            v-slot="{ valid, errors }"
                            :name="trans('cost')"
                          >
                            <b-form-group :label="trans('cost')">
                              <b-form-input
                                type="number"
                                v-model="product.cost"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-input>
                              <span class="hint">{{
                                trans('numbers_should_be_english')
                              }}</span>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ trans('required_field') }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                        <div
                          class="col-md-4 col-12"
                          v-if="!product.has_attributes"
                        >
                          <ValidationProvider
                            rules="positive|decimal"
                            v-slot="{ valid, errors }"
                            :name="trans('quantity')"
                          >
                            <b-form-group :label="trans('quantity')">
                              <b-form-input
                                type="number"
                                v-model="product.quantity"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-input>
                              <span class="hint">
                                {{ trans('numbers_should_be_english') }}
                              </span>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ trans('required_field') }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                        <div class="col-md-4 col-12">
                          <ValidationProvider
                            v-slot="{ valid, errors }"
                            :name="trans('unit')"
                            rules="required"
                          >
                            <b-form-group :label="trans('unit')">
                              <b-form-select
                                v-model="product.unit_key"
                                :state="errors[0] ? false : valid ? true : null"
                              >
                                <b-form-select-option
                                  v-for="(unit, index) in units"
                                  :value="unit.key"
                                  :key="index + unit.key"
                                  v-if="unit.active === true"
                                >
                                  {{ unit.title }}
                                </b-form-select-option>
                              </b-form-select>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ trans('required_field') }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                        <div class="col-md-4 col-12">
                          <ValidationProvider
                            rules="required|positive|decimal"
                            v-slot="{ valid, errors }"
                            :name="trans('price')"
                          >
                            <b-form-group :label="trans('price')">
                              <b-form-input
                                :disabled="product.sale_price !== ''"
                                @change="updatePrice(product.price)"
                                type="number"
                                min="0"
                                step="0.01"
                                value="0.00"
                                v-model="product.price"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-input>
                              <span class="hint">
                                {{ trans('numbers_should_be_english') }}
                              </span>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ trans('required_field') }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                        <div class="col-md-4 col-12">
                          <ValidationProvider
                            rules="positive|decimal"
                            v-slot="{ valid, errors }"
                            :name="trans('product_tax')"
                          >
                            <b-form-group :label="trans('product_tax')">
                              <b-form-input
                                :disabled="product.sale_price !== ''"
                                @change="updateTax()"
                                type="number"
                                min="0"
                                step="0.01"
                                value="0.00"
                                v-model="product.tax"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-input>
                              <span class="hint">
                                {{ trans('numbers_should_be_english') }}
                              </span>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ trans('required_field') }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                        <div class="col-md-4 col-12">
                          <ValidationProvider
                            rules="required|positive|decimal"
                            v-slot="{ valid, errors }"
                            :name="trans('price_after_tax')"
                          >
                            <b-form-group
                              :label="
                                language == 'en'
                                  ? 'Price after tax'
                                  : 'السعر بعد الضريبة'
                              "
                            >
                              <b-form-input
                                :disabled="product.sale_price !== ''"
                                @change="
                                  updatePriceBeforeTax(product.price_after_tax)
                                "
                                type="number"
                                min="0"
                                step="0.01"
                                value="0.00"
                                v-model="product.price_after_tax"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-input>
                              <span class="hint">
                                {{ trans('numbers_should_be_english') }}
                              </span>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ trans('required_field') }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                      </b-form-row>
                      <b-form-row>
                        <div class="col-md-4 col-12">
                          <ValidationProvider
                            rules="positive|decimal"
                            v-slot="{ valid, errors }"
                            :name="trans('sale_price')"
                          >
                            <b-form-group :label="trans('sale_price')">
                              <b-form-input
                                @change="updateSalePrice(product.sale_price)"
                                type="number"
                                min="0"
                                step="0.01"
                                value="0.00"
                                v-model="product.sale_price"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-input>
                              <span class="hint">
                                {{ trans('numbers_should_be_english') }}
                              </span>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ trans('required_field') }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                        <div class="col-md-4 col-12">
                          <ValidationProvider
                            rules="positive|decimal"
                            v-slot="{ valid, errors }"
                            :name="trans('sale_price_after_tax')"
                          >
                            <b-form-group
                              :label="
                                language == 'en'
                                  ? 'Sale Price After Tax'
                                  : 'سعر الخصم بعد الضريبة'
                              "
                            >
                              <b-form-input
                                @change="
                                  updateSalePriceBeforeTax(
                                    product.sale_price_after_tax
                                  )
                                "
                                type="number"
                                min="0"
                                step="0.01"
                                value="0.00"
                                v-model="product.sale_price_after_tax"
                                :state="errors[0] ? false : valid ? true : null"
                              ></b-form-input>
                              <span class="hint">
                                {{ trans('numbers_should_be_english') }}
                              </span>
                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ trans('required_field') }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </div>

                        <div class="col-md-4 col-12">
                          <b-form-group :label="trans('expiration_date')">
                            <b-form-input
                              type="date"
                              v-model="product.expiration_date"
                            ></b-form-input>
                          </b-form-group>
                        </div>
                      </b-form-row>

                      <b-form-row v-if="product.has_attributes">
                        <b-col>
                          <multiselect
                            v-model="product.attributes"
                            @input="showTerms()"
                            :placeholder="trans('select_attributes')"
                            label="title"
                            :multiple="true"
                            :close-on-select="false"
                            track-by="title"
                            :options="attributes"
                          >
                            <template slot="singleLabel" slot-scope="props">
                              <span class="option__title">{{
                                language == 'en'
                                  ? props.option.title
                                  : props.option.title_ar
                              }}</span>
                            </template>
                            <template slot="option" slot-scope="props">
                              <span class="option__title">{{
                                language == 'en'
                                  ? props.option.option.title
                                  : props.option.title_ar
                              }}</span>
                            </template>
                          </multiselect>
                        </b-col>
                        <b-col>
                          <ValidationProvider
                            :name="trans('input_required')"
                            v-if="terms.length"
                            :rules="`${
                              product.has_attributes ? 'required' : ''
                            }`"
                          >
                            <b-form-group>
                              <template v-for="(trm, index) in terms">
                                <b-form-group
                                  :key="trm"
                                  :label="trans(trm.title)"
                                >
                                  <b-form-input
                                    type="text"
                                    :placeholder="trans('quantity')"
                                    v-model="product.terms[trm.id]"
                                    :key="index"
                                  ></b-form-input>
                                </b-form-group>
                              </template>
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
      <div class="card" v-else>
        <skeleton-loader />
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'

export default {
  name: 'AppProductsAdd',
  components: { SkeletonLoader },
  props: [
    'section',
    'sections',
    'user',
    'langs',
    'settings',
    'language',
    'permissions',
  ],
  data() {
    return {
      shownImage: '',

      categories: [],
      product: {
        category_id: '',
        unit_key: '',
        serial: '',
        image: '',
        has_attributes: 0,
        attributes: [],
        terms: [],
        tax: 0,
        price: 0,
        price_after_tax: 0,
        sale_price: '',
        sale_price_after_tax: 0,
        quantity: 0,
        key: '',
        cost: 0,
        expiration_date: '',
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
      },
      terms: {},
      attributes: [],
      strings: [],
      loaded: false,
      units: '',
    }
  },
  computed: {},
  mounted() {
    window.scrollTo(0, 0)
    // this.refresh()
    this.getUnits()
    this.getCategories()
  },
  methods: {
    getUnits() {
      axios
        .get('/api/product-units')
        .then(res => {
          this.units = res.data.body.units.data
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    getCategories() {
      this.loaded = false
      axios
        .get('/api/product-categories')
        .then(res => {
          this.loaded = true
          this.categories = res.data.body.categories.data
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    store() {
      if (this.product.has_attributes) {
        if (!this.product.attributes.length) {
          this.showToastError('Please Select some attributes', 4001)

          return
        }
        if (!this.product.terms.length) {
          this.showToastError('Please Select some Terms', '4001')
          return
        }
      }
      const file = this.$refs.image.files[0]
      const data = new FormData()
      data.append('attributes', this.product.attributes)
      data.append('has_attributes', this.product.has_attributes)
      data.append('category_id', this.product.category_id)
      data.append('cost', this.product.cost)
      data.append('expiration_date', this.product.expiration_date)
      data.append('image', file || '')
      data.append('key', this.product.key)
      data.append('price', this.product.price)
      data.append('price_after_tax', this.product.price_after_tax)
      data.append('quantity', this.product.quantity)
      data.append('sale_price', this.product.sale_price)
      data.append('sale_price_after_tax', this.product.sale_price_after_tax)
      data.append('serial', this.product.serial)
      data.append('tax', this.product.tax)
      data.append('unit_key', this.product.unit_key)
      data.append('title[ar]', this.product.translation.title.ar)
      data.append('title[en]', this.product.translation.title.en)
      data.append('description[ar]', this.product.translation.description.ar)
      data.append('description[en]', this.product.translation.description.en)

      axios
        .post('/api/products', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          if (res.data.status) {
            this.product.image = res.data.url

            this.showToastError(res.data.message, res.data.custom_code)
            setTimeout(() => {
              this.$router.push('/products')
            }, 3000)
          }

          this.$router.push('/products')
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    showTerms() {
      if (this.product.attributes.length) {
        let ids = []
        for (let index = 0; index < this.product.attributes.length; index++) {
          const id = this.product.attributes[index].id
          ids.push(id)
        }
        this.product.terms = []
        axios
          .get('/api/terms/' + ids.toString())
          .then(res => {
            this.terms = res.data.terms
          })
          .catch(error => {
            this.showToastError(
              error.response.data.message,
              error.response.data.custom_code
            )
          })
      }
    },
    previewImage(e) {
      this.product.image = e

      if (e.target.files) {
        this.shownImage = {
          file: e.target.files[0],
          src: URL.createObjectURL(e.target.files[0]),
        }
      }
    },

    removeImage: function (e) {
      this.product.image = ''
    },

    updateTax() {
      if (this.product.tax == '') {
        this.product.tax = 0
        if (this.product.price != '') {
          this.updatePrice(this.product.price)
        } else if (this.product.taxPrice != '') {
          this.updatePriceBeforeTax(this.product.taxPrice)
        } else if (this.product.price == '' && this.product.taxPrice == '') {
          return
        }
      } else {
        if (this.product.price != '') {
          this.updatePrice(this.product.price)
        } else if (this.product.taxPrice != '') {
          this.updatePriceBeforeTax(this.product.taxPrice)
        } else if (this.product.price == '' && this.product.taxPrice == '') {
          return
        }
      }
    },
    updatePrice(price) {
      if (price == '') {
        price = 0
      }
      this.product.price_after_tax = parseFloat(
        parseFloat(price) +
          parseFloat(price) * (parseFloat(this.product.tax) / 100)
      ).toFixed(2)
    },
    updateSalePrice(price) {
      if (price == '') {
        price = 0
      }
      this.product.sale_price_after_tax = (
        parseFloat(price) +
        parseFloat(price) * (parseFloat(this.product.tax) / 100)
      ).toFixed(2)
    },
    updatePriceBeforeTax(price) {
      if (price == '') {
        price = 0
      }
      this.product.price = (
        (parseFloat(price) * 100) /
        (100 + parseFloat(this.product.tax))
      ).toFixed(2)
    },
    updateSalePriceBeforeTax(price) {
      if (price == '') {
        price = 0
        this.product.sale_price = ''
      } else {
        this.product.sale_price = (
          (parseFloat(price) * 100) /
          (100 + parseFloat(this.product.tax))
        ).toFixed(2)
      }
    },
  },
}
</script>
<style>
.hint {
  font-size: 12px;
  color: #17a2b8;
}
</style>
