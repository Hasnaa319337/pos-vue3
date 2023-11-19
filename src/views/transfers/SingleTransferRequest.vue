<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card" v-if="loaded">
      <!-- Header -->
      <div class="card-header header-sm d-flex justify-content-between align-items-center">
        <h4 class="card-title">{{ trans('transfer_request') }}</h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>
      <b-form @submit.prevent="createTransferRequest()">
        <!-- Filter -->
        <div class="d-flex" style="height: 70px">
          <div class="filter col-sm-6">
            <b-form-select
              style="
                height: 47px !important;
                width: 70%;
                border: 1px solid #59bcd7;
                border-top-left-radius: 10px !important;
                border-bottom-left-radius: 10px !important;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                outline: 0;
              "
              v-model="product.from_inventory_id"
            >
              <b-form-select-option
                :value="inv.id"
                v-for="inv in inventories"
                :key="inv.id"
                v-if="inv.is_user_main_inventory === false"
              >
                {{ inv.title }}
              </b-form-select-option>
            </b-form-select>
            <span
              style="
                background: #59bcd7;
                height: 47px !important;
                color: #fff;
                border-top-right-radius: 10px !important;
                border-bottom-right-radius: 10px !important;
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
                padding: 11px 14px;
                float: right;
              "
            >
              {{ trans('from_inventory') }}
            </span>
          </div>
          <div class="filter col-sm-6">
            <b-form-input
              style="
                border: 1px solid #59bcd7;
                height: 47px !important;
                width: 70%;
                display: inline-block;
                border-top-left-radius: 10px !important;
                border-bottom-left-radius: 10px !important;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                outline: 0;
              "
              type="text"
              required
              v-model="product.note"
            >
            </b-form-input>
            <span
              style="
                background: #59bcd7;
                height: 47px !important;
                color: #fff;
                border-top-right-radius: 10px !important;
                border-bottom-right-radius: 10px !important;
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
                padding: 11px 14px;
                float: right;
              "
            >
              {{ trans('statement') }}
            </span>
          </div>
        </div>
        <div class="d-flex" style="height: 70px">
          <div class="filter col-sm-6">
            <b-form-input
              style="
                border: 1px solid #59bcd7;
                height: 47px !important;
                width: 70%;
                display: inline-block;
                border-top-left-radius: 10px !important;
                border-bottom-left-radius: 10px !important;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                outline: 0;
              "
              type="text"
              readonly
              :value="main_inventory"
            >
            </b-form-input>
            <span
              style="
                background: #59bcd7;
                height: 47px !important;
                color: #fff;
                border-top-right-radius: 10px !important;
                border-bottom-right-radius: 10px !important;
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
                padding: 11px 14px;
                float: right;
              "
            >
              {{ trans('to_inventory') }}
            </span>
          </div>
          <div class="filter col-sm-6">
            <b-form-input
              style="
                border: 1px solid #59bcd7;
                height: 47px !important;
                width: 70%;
                display: inline-block;
                border-top-left-radius: 10px !important;
                border-bottom-left-radius: 10px !important;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                outline: 0;
              "
              type="text"
              readonly
              :value="Today"
            >
            </b-form-input>
            <span
              style="
                background: #59bcd7;
                height: 47px !important;
                color: #fff;
                border-top-right-radius: 10px !important;
                border-bottom-right-radius: 10px !important;
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
                padding: 11px 14px;
                float: right;
              "
            >
              {{ trans('date') }}
            </span>
          </div>
        </div>

        <!-- Body -->

        <div class="card-body col-sm-12" style="margin-top: 20px">
          <div class="">
            <div class="col-sm-12">
              <div class="table-responsive" style="padding: 0; margin: 0">
                <b-table-simple
                  sticky-header
                  striped
                  bordered
                  responsive
                  style="min-height: 400px; padding: 0; margin: 0"
                >
                  <b-thead>
                    <b-tr class="rounded" item="dark">
                      <th>{{ trans('num') }}</th>
                      <th>{{ trans('barcode') }}</th>
                      <th>
                        {{ trans('product name') }}
                      </th>
                      <th>{{ trans('product unit') }}</th>
                      <th>{{ trans('quantity') }}</th>
                      <th>{{ trans('note') }}</th>
                      <th>{{ trans('options') }}</th>
                    </b-tr>
                  </b-thead>
                  <b-tbody class="request_body">
                    <b-tr v-for="(item, index) in product.items" :key="item.id">
                      <b-td>{{ index + 1 }}</b-td>
                      <b-td style="max-width: 180px !important">
                        <v-select
                          v-model="product.items[index].product_serial"
                          @input="setProduct(product.items[index].product_serial, index, item)"
                          dir="rtl"
                          :value="index"
                          label="serial"
                          :options="products"
                          :reduce="(product) => product.serial"
                        >
                        </v-select>
                      </b-td>
                      <b-td>
                        <b-input
                          readonly
                          class="request_input"
                          style="border-radius: 10px !important; height: 35px !important"
                          v-model="product.items[index].title"
                          >{{ getUnitById(product.items[index].serial) }}</b-input
                        >
                      </b-td>
                      <b-td>
                        <b-input
                          readonly
                          class="request_input"
                          style="border-radius: 10px !important; height: 35px !important"
                          v-model="product.items[index].unit"
                          >{{ getUnitById(product.items[index].serial) }}</b-input
                        >
                      </b-td>
                      <b-td>
                        <b-form-input
                          class="request_input"
                          style="border-radius: 10px !important; height: 35px !important"
                          type="number"
                          v-model="product.items[index].quantity"
                          @keypress="isNumber($event)"
                        ></b-form-input>
                      </b-td>
                      <b-td>
                        <b-form-input
                          class="request_input"
                          style="border-radius: 10px !important; height: 35px !important"
                          type="tex"
                          v-model="product.items[index].note"
                        ></b-form-input>
                      </b-td>

                      <b-td>
                        <b-button
                          style="
                            outline: none;
                            color: #fff;
                            background: rgb(89, 188, 215);
                            border: 1px solid transparent;
                            border-radius: 50% 50% !important;
                          "
                          class="trash_btn"
                          @click="addItem(item)"
                          v-if="product.items.length - 1 === index"
                        >
                          <i class="bi bi-plus-lg"></i>
                        </b-button>

                        <b-button
                          style="outline: none"
                          variant="danger"
                          @click="removeItem(item)"
                          v-if="product.items.length - 1 !== index"
                        >
                          <font-awesome-icon icon="fa-solid fa-trash " />
                        </b-button>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </div>
              <!-- <div class="row" style="padding: 0; margin: 0">
                <div class="col col-lg-8"></div>
                <div class="col col-lg-3" style="padding: 0; margin: 0">
                  <div class="totalQty" style="padding: 0; margin: 0 22px 0">
                    {{ calcQty }}
                  </div>
                </div>
                <div class="col col-lg-1"></div>
              </div> -->
            </div>
          </div>
        </div>

        <div class="col-sm-12 d-flex" style="justify-content: center">
          <button
            class="col-sm-3 text-center final_btn final_btn1"
            type="submit"
            style="width: 163px; color: #fff; padding: 12px 9px"
          >
            {{ trans('confirm_request') }}
          </button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      main_inventory: '',
      hide: true,
      shown: true,
      selectedProduct: [],
      userInventory: localStorage.getItem('userInventory'),

      addVisiable: true,
      loaded: true,
      newSerial: '',
      products: [],
      Today: localStorage.getItem('Today'),
      product: {
        items: [{ quantity: 1, product_serial: '', unit: '', title: '', note: '' }],
        from_inventory_id: '',

        note: ''
      },
      inventories: [],
      customEvents: [{ eventName: 'update-order', callback: this.updateOrder }]
    }
  },

  mounted() {
    this.getProducts()
    this.getInventories()
    this.getProfile()
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
      return this.inventories.filter(
        (item) => item.id !== 1
        // item => item.id !== localStorage.getItem('userInventory')
      )
    },
    filterProducts(item) {
      return this.products.filter((el) => {
        if (el.serial == item.product_serial) {
          this.products.pop(el)
        }
      })
    }
  },
  methods: {
    getProfile() {
      axios({
        method: 'GET',
        url: '/api/profile'
      }).then((res) => {
        this.main_inventory = res.data.body.user.inventory.title
      })
    },
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

      return record
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
    addItem() {
      let item = {
        quantity: 1,

        item: {}
      }
      this.product.items.push(item)
      console.log(this.product.items)
      console.log(this.products)
    },
    addItem2() {
      let item = {
        quantity: 1,

        item: {}
      }
      this.item = item
      this.product.items.push(item)
      this.product.items.pop()
    },

    removeItem(idx) {
      this.product.items.splice(idx, 1)
    },

    updateOrder(item) {
      let duplicated = 0
      for (let i in this.product.items) {
        if (this.product.items[i].product_serial === item.product_serial) {
          duplicated += 1
        }
      }
      if (duplicated >= 2) {
        this.showToastError('لا يمكن اختيار نفس المنتج مرتين', '4000')

        // this.removeItem(this.item.index)
        this.product.items.splice(item, 1)
      } else {
        // this.addItem()
        this.hide = true
        this.shown = true
      }

      console.log(duplicated)
    },

    setProduct(serial, index) {
      const foundItem = this.products.find((item) => item.serial === serial)
      this.product.items[index].title = foundItem.title
      this.product.items[index].unit = foundItem.unit.title
      this.updateOrder(item)
    },

    createTransferRequest() {
      axios
        .post('/api/inventory-transfer/inventory-transfer-requests', this.product)
        .then((res) => {
          if (res.data.status == true) {
            this.showToastError(res.data.message, res.data.custom_code)

            setTimeout(() => {
              this.$router.push('/my-inventory-transfer-requests')
            }, 3000)
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
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
