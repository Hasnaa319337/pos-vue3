<template>
  <b-modal
    id="import-customers-modal"
    class="import-customers-modal"
    ref="import-customers-modal"
    centered
    size="lg"
    scrollable
    :title="trans('import_customers')"
  >
    <div id="import-customers">
      <div class="row">
        <b-form-group class="col-12" :label="trans('file')">
          <b-form-file @change="getFile"></b-form-file>
          <span class="text-danger" v-if="errorValidation"> {{ errorValidation }}</span>
        </b-form-group>
      </div>
    </div>
    <section>
      <b-button
        :disabled="!fileData"
        size="md"
        variant="success"
        type="submit"
        @click="printBarcode"
      >
        {{ trans('import') }}
      </b-button>
      <b-button
        size="md"
        variant="success"
        download
        type="button"
        href="template/excel/demoCustomersImport.xlsx"
      >
        {{ trans('export sample') }}
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
        {
          eventName: 'open-import-customers-modal',
          callback: this.openBarcodeModal
        }
      ],
      product: '',
      errorValidation: '',
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
    this.customEvents.forEach(function (customEvent) {
      // this.SharedEvent.listen(customEvent.eventName, customEvent.callback)
    })
  },
  unmounted() {
    this.customEvents.forEach(function (customEvent) {
      // this.SharedEvent.off(customEvent.eventName, customEvent.callback)
    })
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
      this.$refs['import-customers-modal'].show()
      this.fileData = ''
    },
    closeBarcodeModal() {
      this.$bvModal.hide('import-customers-modal')
      this.fileData = ''
    },
    printBarcode() {
      this.errorValidation = ''
      this.formData = new FormData()
      this.formData.append('import', this.fileData)
      this.axios
        .post('api/customers-import', this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
        })
        .then((response) => {
          if (response.data.success == false) {
            this.errorValidation = response.data.message
            return false
          }
          this.closeBarcodeModal()

          this.SharedEvent.fire('close-import-customers-modal', response.data)
          this.fileData = ''
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
