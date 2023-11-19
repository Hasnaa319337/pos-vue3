<template>
  <b-modal
    id="add-products-modal"
    class="add-products-modal"
    ref="add-products-modal"
    centered
    size="lg"
    scrollable
    :title="trans('add new product')"
  >
    <div id="add-product">
      <span v-if="firstErrorMessage" class="text-danger font-weight-bold">{{
        firstErrorMessage
      }}</span>
      <div class="row">
        <b-form-group class="col-12" :label="trans('serial')">
          <b-form-input type="text" v-model="product.serial"></b-form-input>
        </b-form-group>

        <b-form-group class="col-12" :label="trans('title') + ' Ar'">
          <b-form-input
            type="text"
            v-model="product.translation.title.ar"
          ></b-form-input>
        </b-form-group>
        <b-form-group class="col-12" :label="trans('title') + ' En'">
          <b-form-input
            type="text"
            v-model="product.translation.title.en"
          ></b-form-input>
        </b-form-group>

        <b-form-group class="col-12" :label="trans('unit')">
          <select v-model="product.unit_key">
            <option
              v-for="(unit, index) in units"
              :value="unit.key"
              :key="index + unit.key"
            >
              {{ unit.title }}
            </option>
          </select>
        </b-form-group>

        <b-form-group class="col-12" :label="trans('category')">
          <b-form-select v-model="product.category_id">
            <b-form-select-option
              v-for="cat in categories"
              :value="cat.id"
              :key="cat.id"
            >
              <span
                ><span v-if="cat.parent">&nbsp; &nbsp;&nbsp; &nbsp;</span
                >{{ cat.title }}</span
              >
            </b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group class="col-12" :label="trans('quantity')">
          <b-form-input type="text" v-model="product.quantity"></b-form-input>
        </b-form-group>
      </div>
    </div>
    <section slot="modal-footer">
      <b-button size="md" variant="success" type="submit" @click="printBarcode">
        {{ trans('save') }}
      </b-button>
      <b-button size="md" variant="danger" @click="closeBarcodeModal">
        {{ trans('close') }}
      </b-button>
    </section>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      customEvents: [
        { eventName: 'open-product-modal', callback: this.openProductModal },
      ],
      units: [],
      categories: [],
      errors: [],
      firstErrorMessage: '',
      product: {
        serial: '',
        translation: {
          title: {
            ar: '',
            en: '',
          },
        },
        unit_key: '',
        cost: 0,
        price: 0,
        sale_price_after_tax: 0,
        price_after_tax: 0,
        tax: 0,
        has_attributes: 0,
        category_id: '',
        quantity: '',
      },
      user: '',
      language: '',
      strings: '',
      cssText: `
                    .row {
                        display: flex;
                        flex-wrap: wrap;
                        margin-right: -15px;
                        margin-left: -15px;
                        width: 100%;
                    }
                    .col-12 {
                        flex: 0 0 100%;
                        max-width: 100%;
                        text-align: center;
                    }

            `,
    }
  },
  created() {
    this.refresh()
    ////////////////////////////////////////////////////
    //**          Custom Event Listener           ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      SharedEvent.listen(customEvent.eventName, customEvent.callback)
    })
  },
  destroyed() {
    ////////////////////////////////////////////////////
    //**      Remove Custom Event Listener        ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      SharedEvent.off(customEvent.eventName, customEvent.callback)
    })
  },
  mounted() {
    this.getUnits()
    this.getCategories()
  },
  methods: {
    refresh() {
      axios
        .get('/api/products/create')
        .then(res => {})
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    getCategories() {
      axios
        .get('/api/product-categories')
        .then(res => {
          this.categories = res.data.body.categories.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getUnits() {
      axios
        .get('/api/product-units')
        .then(res => {
          this.units = res.data.body.units.data
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

    openProductModal(data) {
      this.$refs['add-products-modal'].show()
    },
    closeBarcodeModal() {
      this.$bvModal.hide('add-products-modal')
    },
    printBarcode() {
      this.errors = []
      this.firstErrorMessage = ''

      let data = {
        serial: this.product.serial,

        title: {
          ar: this.product.translation.title.ar,
          en: this.product.translation.title.en,
        },

        unit_key: this.product.unit_key,
        cost: this.product.cost,
        price: this.product.price,
        sale_price_after_tax: this.product.sale_price_after_tax,
        price_after_tax: this.product.price_after_tax,
        tax: this.product.tax,
        has_attributes: this.product.has_attributes,
        category_id: this.product.category_id,
        quantity: this.product.quantity,
      }

      axios
        .post('/api/products', data, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        })
        .then(response => {
          ;(this.product = {
            serial: '',
            translation: {
              title: {
                ar: '',
                en: '',
              },
            },
            unit_key: '',
            cost: 0,
            price: 0,
            sale_price_after_tax: 0,
            price_after_tax: 0,
            tax: 0,
            has_attributes: 0,
            category_id: '',
            quantity: '',
          }),
            this.closeBarcodeModal()
          SharedEvent.fire('close-add-products-modal', response.data)
        })
        .catch(error => {
          this.errors = error.response.data.body
          this.firstErrorMessage = error.response.data.message
        })
    },
  },
}
</script>
