<template>
  <div>
    <b-modal
      style="text-align: start"
      id="import-products-modal"
      class="import-products-modal"
      ref="import-products-modal"
      centered
      size="lg"
      scrollable
      :title="trans('add translation')"
    >
      <div class="col-sm-12 text-center" v-if="message.length">
        <div class="alert" :class="'alert-' + alertType" v-html="message"></div>
      </div>
      <div class="clear clearfix"></div>
      <div id="import-products">
        <div class="row" style="margin-top: 10px; flex-direction: column">
          <ValidationProvider rules="required" :name="trans('key')">
            <b-form-group class="col-12" :label="trans('key')" style="text-align: start">
              <b-form-input
                :placeholder="trans('write the key in English')"
                type="text"
                v-model="translations.key"
              ></b-form-input>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ trans('This field accepts English words only') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider rules="required|englishLettersAndNumbers" :name="trans('english')">
            <b-form-group class="col-12" :label="trans('english')" style="text-align: start">
              <b-form-input
                :placeholder="trans('write the translation in English')"
                type="text"
                v-model="translations.t_['en']"
              ></b-form-input>
            </b-form-group>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ trans('This field accepts English words only') }}
            </b-form-invalid-feedback>
          </ValidationProvider>

          <ValidationProvider
            style="text-align: start"
            rules="required|arabicLettersAndNumbers"
            :name="trans('arabic')"
          >
            <b-form-group class="col-12" :label="trans('arabic')">
              <b-form-input
                :placeholder="trans('write the translation in Arabic')"
                type="text"
                v-model="translations.t_['ar']"
              ></b-form-input>
            </b-form-group>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ trans('This field accepts arabic words only') }}
            </b-form-invalid-feedback>
          </ValidationProvider>
        </div>
      </div>
      <section class="btns_header">
        <b-button size="md" variant="success" type="submit" @click="printBarcode">
          {{ trans('save') }}
        </b-button>
        <b-button size="md" variant="danger" @click="closeBarcodeModal">
          {{ trans('close') }}
        </b-button>
      </section>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customEvents: [{ eventName: 'open-barcode-modal', callback: this.openBarcodeModal }],
      translations: {
        key: '',
        t_: {},
        group: 'api'
      },
      langs: [],
      languages: [],
      message: '',
      product: '',
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

            `
    }
  },
  created() {
    ////////////////////////////////////////////////////
    //**          Custom Event Listener           ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      // this.SharedEvent.listen(customEvent.eventName, customEvent.callback)
    })
  },
  unmounted() {
    ////////////////////////////////////////////////////
    //**      Remove Custom Event Listener        ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // this.SharedEvent.off(customEvent.eventName, customEvent.callback)
    })
  },
  mounted() {
    this.getTranslation()
  },
  methods: {
    getTranslation() {
      this.axios
        .get('/api/languages')
        .then((res) => {
          this.languages = res.data.body.languages.data
        })
        .catch(() => {})
    },
    openBarcodeModal(data) {
      this.$refs['import-products-modal'].show()
      this.langs = data.langs
      if (this.langs) {
        this.langs.forEach((lang) => {
          let s = lang.locale
          this.translations.t_[s] = ''
        })
      }
    },
    closeBarcodeModal() {
      this.$bvModal.hide('import-products-modal')
    },
    printBarcode() {
      this.axios
        .post('api/translations', this.translations)
        .then((res) => {
          if (res.data.status) {
            this.translations.key = ''

            this.showToastError(res.data.message, res.data.custom_code)

            return this.closeBarcodeModal()

            // this.SharedEvent.fire('close-import-products-modal', response.data)
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    }
  }
}
</script>
