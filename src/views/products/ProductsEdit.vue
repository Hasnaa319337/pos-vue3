<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div
          class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title" v-text="trans('edit_product')"></h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="row mx-0 align-items-center justify-content-between mb-4">
            <div class="col-sm-12" v-if="loaded">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(update)">
                  <b-form-row>
                    <b-col>
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        name="serial"
                      >
                        <b-form-group :label="trans('serial')">
                          <b-form-input
                            readonly
                            type="text"
                            v-model="product.serial"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts English words only') }}
                            - {{ trans('without sapces') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                    <b-col>
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        name="name_ar"
                      >
                        <b-form-group :label="trans('arabic title')">
                          <!--    -->
                          <b-form-input
                            required
                            type="text"
                            v-model="product.translation.title.ar"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts arabic words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col>
                      <ValidationProvider
                        rules="required"
                        v-slot="{ valid, errors }"
                        name="name"
                      >
                        <b-form-group :label="trans('english title')">
                          <!--                      -->
                          <b-form-input
                            type="text"
                            required
                            v-model="product.translation.title.en"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts English words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                    <b-col>
                      <b-form-group
                        :label="trans('arabic description')"
                        rules="required"
                      >
                        <!--   -->
                        <b-form-textarea
                          required
                          v-model="product.translation.description.ar"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        :label="trans('english description')"
                        rules="required"
                      >
                        <!--      -->
                        <b-form-textarea
                          required
                          v-model="product.translation.description.en"
                        ></b-form-textarea>
                      </b-form-group>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col>
                      <div v-if="product.image">
                        <b-img
                          style="margin-bottom: 10px"
                          :src="product.image"
                          width="100"
                          v-if="!changeImage"
                        />
                        <b-img
                          style="margin-bottom: 10px"
                          :src="product.image.src"
                          width="100"
                          v-else
                        />
                      </div>
                      <b-form-group>
                        <b-form-file
                          ref="image"
                          accept="image/*"
                          multiple="multiple"
                          @change="uploadImage($event)"
                          class="form-control-file d-block"
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
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <ValidationProvider
                        name="category"
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
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <div class="col-md-4 col-12">
                      <ValidationProvider
                        rules="required|positive|decimal"
                        v-slot="{ valid, errors }"
                        name="cost"
                      >
                        <b-form-group :label="trans('cost')">
                          <b-form-input
                            type="text"
                            v-model="product.cost"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-4 col-12" v-if="!product.has_attributes">
                      <ValidationProvider
                        rules="integer"
                        v-slot="{ valid, errors }"
                        name="tax"
                      >
                        <b-form-group :label="trans('stock')">
                          <b-form-input
                            disabled
                            type="number"
                            v-model="product.quantity"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-4 col-12">
                      <ValidationProvider
                        v-slot="{ valid, errors }"
                        name="unit"
                      >
                        <b-form-group :label="trans('unit')">
                          <b-form-select
                            v-model="product.unit_key"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option
                              v-for="un in units"
                              :key="un.id"
                              :value="un.key"
                              v-if="un.active === true"
                            >
                              <span>{{ un.title }}</span>
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-md col-12">
                      <ValidationProvider
                        rules="required|positive|decimal"
                        v-slot="{ valid, errors }"
                        name="price"
                      >
                        <b-form-group :label="trans('price')">
                          <b-form-input
                            @change="updatePrice(product.price)"
                            type="text"
                            v-model="product.price"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-md col-12">
                      <ValidationProvider
                        rules="positive|decimal"
                        v-slot="{ valid, errors }"
                        name="tax"
                      >
                        <b-form-group :label="trans('product tax')">
                          <b-form-input
                            @change="updateTax()"
                            type="text"
                            v-model="product.tax"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <div class="col-md col-12">
                      <ValidationProvider
                        rules="required|positive|decimal"
                        v-slot="{ valid, errors }"
                        name="price"
                      >
                        <b-form-group
                          :label="
                            user.language == 'en'
                              ? 'Price after tax'
                              : 'السعر بعد الضريبة'
                          "
                        >
                          <b-form-input
                            @change="
                              updatePriceBeforeTax(product.price_after_tax)
                            "
                            type="text"
                            v-model="product.price_after_tax"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
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
                        name="sale_price"
                      >
                        <b-form-group :label="trans('sale_price')">
                          <b-form-input
                            @change="updateSalePrice(product.sale_price)"
                            type="text"
                            v-model="product.sale_price"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
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
                        name="sale_price"
                      >
                        <b-form-group
                          :label="
                            user.language == 'en'
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
                            type="text"
                            v-model="product.sale_price_after_tax"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>

                    <div class="col-md-4 col-12">
                      <b-form-group :label="trans('expiration_date')">
                        <b-form-input
                          required
                          type="datetime-local"
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
                        <div slot="singleLabel" slot-scope="props">
                          <span class="option__title">{{
                            user.language == 'en'
                              ? props.option.title
                              : props.option.title_ar
                          }}</span>
                        </div>
                        <div slot="option" slot-scope="props">
                          <span class="option__title">{{
                            user.language == 'en'
                              ? props.option.option.title
                              : props.option.title_ar
                          }}</span>
                        </div>
                      </multiselect>
                    </b-col>
                    <b-col>
                      <ValidationProvider
                        name="terms"
                        v-if="terms.length"
                        :rules="`${product.has_attributes ? 'required' : ''}`"
                      >
                        <b-form-group>
                          <div v-for="(trm, index) in terms" :key="index">
                            <b-form-group :label="trans(trm.title)">
                              <b-form-input
                                type="text"
                                :placeholder="trans('quantity')"
                                v-model="product.terms[trm.id]"
                                :key="index"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>

                  <b-form-row class="justify-content-center">
                    <b-button
                      style="margin-left: 50px"
                      v-if="product.has_attributes"
                      :to="'/variations/' + product.id"
                      variant="warning"
                    >
                      {{ trans('variations') }}
                      <font-awesome-icon icon="fa-solid fa-pen-to-square " />
                    </b-button>

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
      <div class="card" v-else>
        <skeleton-loader />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'
// import { Date } from  '../../support/mixins/date'
export default {
  components: { SkeletonLoader },
  name: 'AppProductsEdit',
  props: ['section', 'sections', 'user', 'langs'],
  data() {
    return {
      changeImage: false,

      categories: [],
      units: [],
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
        price_after_tax: '0',
        sale_price: '',
        sale_price_after_tax: 0,
        quantity: 0,
        key: '',
        cost: 0,
        expiration_date: localStorage.getItem('Today'),
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
      terms: [],
      attributes: [],
      strings: [],
      loaded: false,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    this.getCategories()
    this.getUnits()
    console.log(this.product.expiration_date)
  },
  computed: {
    findSubcategories() {
      let subcategories = []
      this.categories.find(el => {
        subcategories.push(el['child'])
      })
      return subcategories
    },
    calcQty() {
      let totalQuantity = 0
      this.invoice.items.map(el => {
        totalQuantity += el['quantity']
      })
      return totalQuantity
    },
  },
  methods: {
    getCategories() {
      axios.get('/api/product-categories').then(res => {
        this.categories = res.data.body.categories.data
      })
    },
    getUnits() {
      axios.get('/api/product-units').then(res => {
        this.units = res.data.body.units.data
      })
    },
    refresh() {
      axios
        .get('/api/products/' + this.$route.params.id)
        .then(res => {
          this.loaded = true
          this.attributes = res.data.attributes
          this.product = res.data.body.product
          this.product.category_id = this.product.category.id
          this.product.taxPrice = this.product.taxPrice = (
            parseFloat(this.product.price) +
            parseFloat(this.product.price) *
              (parseFloat(this.product.tax) / 100)
          ).toFixed(2)

          if (this.product.sale_price == 0) {
            this.product.sale_price = ''
            this.product.sale_price_after_tax = ''
          }
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    update() {
      if (this.product.has_attributes) {
        if (!this.product.attributes.length) {
          this.showToastError('Please Select some attributes', '4001')
          return
        }
        if (!this.product.terms.length) {
          this.showToastError('Please Select some Terms', '4001')
          return
        }
      }
      const file = this.$refs.image.files[0]
      const data = new FormData()
      data.append('id', this.$route.params.id)
      data.append('attributes', this.product.attributes)
      data.append('has_attributes', 0)
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
      data.append('tax', this.product.tax)
      data.append('unit_key', this.product.unit_key)
      data.append('title[ar]', this.product.translation.title.ar)
      data.append('title[en]', this.product.translation.title.en)
      data.append('description[ar]', this.product.translation.description.ar)
      data.append('description[en]', this.product.translation.description.en)

      axios
        .post('/api/products/' + this.$route.params.id + '?_method=put', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          if (res.data.status) {
            this.product.image = res.data.url
            this.message = res.data.message
            this.alertType = 'success'

            this.showToastError(res.data.message, res.data.custom_code)
            setTimeout(() => {
              this.$router.push('/products')
            }, 3000)

            this.product.tax = this.settings.default_tax_amount
          }
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
        this.product.terms = []
        axios
          .get('/api/terms/' + this.product.attributes.toString())
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

    uploadImage(e) {
      if (e.target.files) {
        this.product.image = {
          file: e.target.files[0],
          src: URL.createObjectURL(e.target.files[0]),
        }
      }

      this.changeImage = true
      console.log(this.product.image)
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
      this.product.price_after_tax = (
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
    updateSalePrice(price) {
      if (price !== '') {
        this.product.sale_price_after_tax = (
          parseFloat(price) +
          parseFloat(price) * (parseFloat(this.product.tax) / 100)
        ).toFixed(2)
      }
    },
    updateSalePriceBeforeTax(price) {
      if (price !== '') {
        this.product.sale_price = (
          (parseFloat(price) * 100) /
          (100 + parseFloat(this.product.tax))
        ).toFixed(2)
      }
    },
  },
}
</script>
