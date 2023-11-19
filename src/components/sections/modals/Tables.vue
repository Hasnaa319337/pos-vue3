<template>
  <section>
    <b-modal
      id="tables-modal"
      class="tables-modal"
      ref="tables-modal"
      centered
      scrollable
      :title="strings['tables']"
      size="lg"
      @hidden="cancel_action"
      hide-footer
    >
      <b-card-group deck style="display: -webkit-box !important">
        <b-card
          class="product p-3"
          v-for="(table, index) in tables"
          :key="table.id"
          style="max-width: 8rem; min-width: 8rem; height: 10rem"
          :bg-variant="table.busy ? 'warning' : 'success'"
        >
          <b-card-title>
            <b-row class="justify-content-center">
              <h6>
                {{ table.title }}
              </h6>
            </b-row>
          </b-card-title>
          <b-card-text class="text-center">
            <b-row class="justify-content-center m-0">
              <b-button
                @click="checkout(table, index)"
                variant="success"
                size="sm"
                v-if="table.busy"
                >{{ strings['checkout'] }}
              </b-button>
              <b-button
                v-if="!table.busy"
                @click="setTable(table, index)"
                variant="primary"
                size="sm"
              >
                {{ strings['set table'] }}
              </b-button>
            </b-row>
          </b-card-text>
        </b-card>
      </b-card-group>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      customEvents: [
        { eventName: 'open-tables-modal', callback: this.openTablesModal },
      ],
      message: '',
      alertType: '',
      tables: {},
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
    openTablesModal(data) {
      this.strings = data.strings
      this.settings = data.settings
      this.language = data.language
      this.tables = data.tables
      this.$refs['tables-modal'].show()
    },
    cancel_action() {
      this.clearForm()
      this.$bvModal.hide('tables-modal')
    },
    clearForm() {
      this.tables = {}
      this.message = ''
      this.alertType = ''
    },
    setTable(table, index) {
      let data = {
        table: table,
        index: index,
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('cashier-set-table', data)
      this.cancel_action()
    },
    checkout(table, index) {
      let data = {
        table: table,
        index: index,
      }
      // eslint-disable-next-line no-undef
      SharedEvent.fire('cashier-table-checkout', data)
      this.cancel_action()
    },
  },
}
</script>

<style lang="scss"></style>
