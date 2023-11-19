<template>
  <b-modal
    id="import-products-modal"
    class="import-products-modal"
    ref="import-products-modal"
    centered
    size="lg"
    scrollable
    :title="trans('import_products')"
  >
    <div id="import-products">
      <div class="row">
        <b-form-group class="col-12" :label="trans('file')" style="margin-top: 20px">
          <b-form-file @change="getFile"></b-form-file>
        </b-form-group>
      </div>
    </div>
    <section slot="modal-footer">
      <b-button
        style="margin: 0 7px"
        :disabled="!fileData"
        size="md"
        variant="success"
        type="submit"
        @click="printBarcode"
      >
        {{ trans('import') }}
      </b-button>

      <b-button size="md" variant="danger" @click="closeBarcodeModal">
        {{ trans('close') }}
      </b-button>
    </section>
  </b-modal>
</template>

<script>
import VueBarcode from 'vue-barcode'

export default {
  components: { VueBarcode },
  data() {
    return {
      customEvents: [
        {
          eventName: 'open-import-products-modal',
          callback: this.openBarcodeModal
        }
      ],
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

            `,
      fileData: ''
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
      // eslint-disable-next-line no-undef
      // this.SharedEvent.off(customEvent.eventName, customEvent.callback)
    })
  },
  mounted() {
    // this.initPrintMe()
  },
  methods: {
    getFile(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.fileData = files[0]
    },
    openBarcodeModal(data) {
      this.$refs['import-products-modal'].show()
      this.fileData = ''
    },
    closeBarcodeModal() {
      this.$bvModal.hide('import-products-modal')
      this.fileData = ''
    },
    printBarcode() {
      this.formData = new FormData()
      this.formData.append('import', this.fileData)
      axios
        .post('api/products-import', this.formData, {
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          },
          responseType: 'arraybuffer'
        })
        .then((response) => {
          if (response.data.status) {
            this.closeBarcodeModal()
            this.SharedEvent.fire('close-import-products-modal', response.data)
            this.fileData = ''
          } else {
            this.message = res.data.message
            this.alertType = 'danger'
          }
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
        })
    }
  }
}
</script>
