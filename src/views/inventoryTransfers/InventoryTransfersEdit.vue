<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card" v-if="loaded">
      <!-- Header -->
      <div class="card-header header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ trans('edit_store_transfer_voucher') }}</h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>
      <b-form @submit.prevent="EditTransferRequest()">
        <!-- Filter -->
        <div class="d-flex" style="justify-content: space-between; margin: 12px 14px 0">
          <div class="filter" style="margin-bottom: 35px">
            <b-form-select
              style="
                height: 38px !important;
                width: 224px;
                float: left;
                border-top-left-radius: 10px !important;
                border-bottom-left-radius: 10px !important;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                outline: 0;
              "
              v-model="product.from_inventory.id"
            >
              <b-form-select-option :value="inv.id" v-for="inv in filteredItems" :key="inv.id">
                {{ inv.title }}
              </b-form-select-option>
            </b-form-select>
            <span
              style="
                background: #59bcd7;
                height: 38px !important;
                color: #fff;
                border-top-right-radius: 10px !important;
                border-bottom-right-radius: 10px !important;
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
                padding: 7px 14px;
                float: left;
              "
            >
              {{ trans('from_inventory') }}
            </span>
          </div>
          <div class="filter" style="margin-bottom: 35px">
            <b-form-select
              style="
                height: 38px !important;
                width: 224px;
                float: left;
                border-top-left-radius: 10px !important;
                border-bottom-left-radius: 10px !important;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                outline: 0;
              "
              v-model="product.to_inventory.id"
            >
              <b-form-select-option :value="inv.id" v-for="inv in filteredItems" :key="inv.id">
                {{ inv.title }}
              </b-form-select-option>
            </b-form-select>
            <span
              style="
                background: #59bcd7;
                height: 38px !important;
                color: #fff;
                border-top-right-radius: 10px !important;
                border-bottom-right-radius: 10px !important;
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
                padding: 7px 14px;
                float: left;
              "
            >
              {{ trans('to_inventory') }}
            </span>
          </div>
        </div>

        <!-- Body -->

        <div class="card-body col-sm-12">
          <div class="">
            <div class="col-sm-12 text-center" v-if="message.length">
              <div class="alert" :class="'alert-' + alertType" v-html="message"></div>
            </div>
            <div class="col-sm-12">
              <div class="table-responsive" style="padding: 0; margin: 0">
                <b-table-simple
                  sticky-header
                  striped
                  bordered
                  responsive
                  style="min-height: 50px; padding: 0; margin: 0"
                >
                  <b-thead>
                    <b-tr class="rounded" item="dark">
                      <th>{{ trans('barcode') }}</th>
                      <th>
                        {{ trans('product name') }}
                      </th>
                      <th>{{ trans('unit or bottle') }}</th>
                      <th>{{ trans('quantity') }}</th>
                      <th>{{ trans('options') }}</th>
                    </b-tr>
                  </b-thead>
                  <b-tbody class="request_body">
                    <b-tr v-for="(item, index) in items" :key="item.id">
                      <b-td style="max-width: 180px !important">
                        <b-form-select
                          class="request_input"
                          style="border-radius: 10px !important; height: 35px !important"
                          @input="setProduct(item.product.serial, index, item)"
                          v-model="item.product.serial"
                        >
                          <b-form-select-option
                            :value="prod.serial"
                            v-for="prod in products"
                            :key="prod.id"
                          >
                            {{ prod.serial }}
                          </b-form-select-option>
                        </b-form-select>
                      </b-td>
                      <b-td>
                        <b-input
                          class="request_input"
                          style="border-radius: 10px !important; height: 35px !important"
                          :value="getTitleById(item.product.serial)"
                        >
                        </b-input>
                      </b-td>
                      <b-td>
                        <b-input
                          class="request_input"
                          style="border-radius: 10px !important; height: 35px !important"
                          :value="trans(getUnitById(item.product.serial))"
                        ></b-input>
                      </b-td>
                      <b-td>
                        <b-form-input
                          class="request_input"
                          style="border-radius: 10px !important; height: 35px !important"
                          type="number"
                          v-model="item.quantity"
                          @keypress="isNumber($event)"
                        ></b-form-input>
                      </b-td>

                      <b-td>
                        <b-button
                          style="outline: none"
                          class="trash_btn"
                          @click="addItem(item.product.serial)"
                          variant="danger"
                          v-if="items.length - 1 === index"
                        >
                          <i class="bi bi-plus-lg"></i>
                        </b-button>

                        <b-button
                          style="outline: none"
                          variant="danger"
                          @click="removeItem(item)"
                          v-if="items.length - 1 !== index"
                        >
                          <font-awesome-icon icon="fa-solid fa-trash " />
                        </b-button>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-12">
          <button
            class="col-sm-3 text-center final_btn final_btn1"
            type="submit"
            style="width: 163px; color: #fff"
          >
            {{ trans('confirm_request') }}
          </button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hide: true,
      shown: true,
      selectedProduct: [],
      userInventory: localStorage.getItem('userInventory'),
      message: '',
      addVisiable: true,
      loaded: true,
      newSerial: '',
      products: [],
      inventories: [],
      items: [],
      product: {
        items: [{ quantity: 1, product_serial: '', unit: '', title: '' }],
        from_inventory_id: '',
        to_inventory_id: ''
      }
    }
  },

  mounted() {
    this.getProducts()
    this.getInventories()
    this.getMyTransferRequests()
  },
  computed: {
    calcQty() {
      let totalQuantity = ''
      this.product.items.map((el) => {
        totalQuantity += el['quantity']
      })
      return totalQuantity
    },
    filteredItems() {
      return this.inventories.filter((item) => item.id !== localStorage.getItem('userInventory'))
    }
  },
  methods: {
    getProducts() {
      axios
        .get('/api/products')
        .then((res) => {
          this.products = res.data.body.products.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUnitById(serial) {
      const record = this.products.find((el) => el.serial === serial)
      return record.unit_key
    },
    getTitleById(serial) {
      const record = this.products.find((el) => el.serial === serial)
      return record.title
    },
    getInventories() {
      axios
        .get('/api/inventories')
        .then((res) => {
          this.inventories = res.data.body.inventories.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addItem(serial) {
      let item = {
        quantity: 1,
        product: {
          serial: '',
          title: ''
        }
      }
      this.items.push(item)
      console.log('this.items')
      console.log(this.items)
    },

    removeItem(idx) {
      this.items.splice(idx, 1)
    },

    updateOrder(item) {
      let duplicated = 0
      for (let i in this.items) {
        if (this.items[i].serial === item.serial) {
          duplicated += 1
        }
      }
      if (duplicated >= 2) {
        this.message = 'لا يمكن اختيار نفس المنتج مرتين'
        this.alertType = 'danger'

        this.items.splice(item, 1)
        setTimeout(() => {
          this.message = ''
          this.alertType = 'success'
        }, 120000)
      } else {
        // this.addItem()
        this.hide = true
        this.shown = true
      }

      console.log(duplicated)
    },

    setProduct(serial, index, item) {
      const foundItem = this.products.find((item) => item.serial === serial)
      this.items[index].title = foundItem.title
      this.items[index].unit = foundItem.unit.title
      console.log('foundItem')
      console.log(foundItem)
      this.updateOrder(item)
    },
    getMyTransferRequests() {
      axios
        .get('/api/inventory-transfer/inventory-transfers/' + this.$route.params.id)
        .then((res) => {
          this.product = res.data.body.inventory_transfer
          this.items = res.data.body.inventory_transfer.items
          this.globalStatus = res.data.body.inventory_transfer.status.value
          this.color = res.data.body.inventory_transfer.status.color.hexadecimal
          console.log(this.items)
          this.from_inventory = res.data.body.inventory_transfer.from_inventory
          this.to_inventory = res.data.body.inventory_transfer_request.to_inventory

          this.message = res.data.message
          this.alertType = 'success'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 5000)
        })
        .catch((err) => {
          this.message = err.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    EditTransferRequest() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'
      axios
        .put('/api/inventory-transfer/inventory-transfers/' + this.$route.params.id, this.product)
        .then((res) => {
          if (res.data.status == true) {
            this.alertType = 'success'
            this.message = res.data.message ? res.data.message : ''
            setTimeout(() => {
              this.message = ''
              this.message = res.data.message
            }, 3000)

            this.alertType = 'success'
            setTimeout(() => {
              this.$router.push(
                '/direct-transfer-requests/' + res.data.body.inventory_transfer_request.id
              )
            }, 2000)
          }
        })
        .catch((err) => {
          this.message = err.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    }
  }
}
</script>

<style scoped>
.request_body td span,
.request_body .request_input .request_body .custom-select {
  border-radius: 10px !important ;

  padding: 5px;
  border: 1px solid rgb(102 108 109 / 50%);
  display: block;
  outline: 0;
}
.request_body .request_input:focus {
  outline: none;
}
.request_body .form-group {
  border: none;
  margin: 0;
}
.trash_btn {
  color: #fff;
  outline: none;
}
.trash_btn svg {
  color: #fff;
}
.final_btn {
  color: #fff;
  font-size: 15px;
  border-radius: 9px;
  font-weight: 500;
  padding: 7px;
}
.final_btn1 {
  background: rgba(79, 167, 190, 1) !important;
}
.totalQty {
  background: #f6f6f6;
  color: #000;
  text-align: center;
  line-height: 2.1;
  font-size: 20px;
  width: 87%;
  margin: auto;
}
</style>
