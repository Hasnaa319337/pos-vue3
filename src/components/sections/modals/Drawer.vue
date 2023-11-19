<template>
  <section>
    <b-modal
      id="drawer-modal"
      class="drawer-modal"
      ref="drawer-modal"
      centered
      scrollable
      :title="`${strings['drawer']}`"
      @hidden="cancel_action"
    >
      <div class="col-sm-12 text-center" v-if="message.length">
        <div class="alert" :class="'alert-' + alertType" v-html="message"></div>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <b-form @submit.prevent="handleSubmit(closeDrawer)">
          <ValidationProvider
            rules="required"
            v-slot="{ valid, errors }"
            name="evaluated_amount"
          >
            <b-form-group
              :label="
                strings['evaluated in drawer'] +
                ' (' +
                (language == 'en'
                  ? settings.currency_en
                  : settings.currency_ar) +
                ')'
              "
            >
              <b-form-input
                type="text"
                readonly
                v-model="drawer.evaluated"
                :state="errors[0] ? false : valid ? true : null"
              >
              </b-form-input>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
              <b-form-text
                >{{ strings['since'] }}: {{ drawer.since }}</b-form-text
              >
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            rules="required"
            v-slot="{ valid, errors }"
            name="actual_amount"
          >
            <b-form-group
              :label="
                strings['actual in drawer'] +
                ' (' +
                (language == 'en'
                  ? settings.currency_en
                  : settings.currency_ar) +
                ')'
              "
            >
              <b-form-input
                type="number"
                v-model="drawer.actual"
                @keypress="isNumber($event)"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-form>
      </ValidationObserver>

      <section slot="modal-footer">
        <b-button
          size="md"
          variant="success"
          type="submit"
          @click="handleSubmit()"
        >
          {{ strings['submit day'] }}
        </b-button>
        <b-button size="md" variant="danger" @click="cancel_action">
          {{ strings['cancel'] }}
        </b-button>
      </section>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      customEvents: [
        { eventName: 'open-drawer-modal', callback: this.openDrawerModal },
      ],
      message: '',
      alertType: '',
      drawer: {},
      strings: [],
      language: '',
      settings: {},
    }
  },
  created() {
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
      // eslint-disable-next-line no-undef
      SharedEvent.off(customEvent.eventName, customEvent.callback)
    })
  },
  methods: {
    openDrawerModal(data) {
      axios.get('/api/cashier/open-drawer').then(res => {
        if (res.data.success) {
          this.drawer.evaluated = res.data.evaluated
          this.drawer.since = res.data.since
          this.strings = data.strings
          this.settings = data.settings
          this.language = data.language
          this.$refs['drawer-modal'].show()
        }
      })
    },
    handleSubmit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          // Successfully validated & update the data.
          this.closeDrawer()
        }
      })
    },
    closeDrawer() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'
      let vm = this
      axios.post('/api/cashier/close-drawer', this.drawer).then(res => {
        if (res.data.success) {
          this.alertType = 'success'
        } else {
          this.alertType = 'danger'
        }
        this.message = res.data.message
      })
    },
    cancel_action() {
      this.clearForm()
      this.$bvModal.hide('drawer-modal')
    },
    clearForm() {
      this.drawer = {}
      this.message = ''
      this.alertType = ''
    },
  },
}
</script>

<style lang="scss"></style>
