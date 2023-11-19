<template>
  <div v-if="showReceipt" class="popup receipt">
    <div class="popup-overlay"></div>
    <div class="popup-content" v-if="sale.id > 0">
      <div class="row">
        <div class="col-sm-12 prevent-print">
          <select v-model="user.language">
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
          <i class="fa fa-close" @click="$emit('closeReceipt')"></i>
        </div>
      </div>
      <div :style="{ direction: user.language == 'en' ? 'ltr' : 'rtl' }">
        <div class="col-sm-12 text-center">
          <h3>
            {{ user.language == 'en' ? 'Purchase Invoice' : 'فاتورة مشتريات' }}
            #{{ sale.id }}
          </h3>
          <p v-if="sale.paid">
            {{ user.language == 'en' ? 'Paid' : 'مدفوعة' }}
          </p>
          <p v-else>{{ user.language == 'en' ? 'Non-paid' : 'غير مدفوعة' }}</p>
        </div>
        <table
          class="table allow-print"
          :style="{
            direction: user.language == 'en' ? 'ltr' : 'rtl',
            textAlign: user.language == 'en' ? 'left' : 'right',
          }"
        >
          <tr>
            <th>{{ user.language == 'en' ? 'Item' : 'المنتج' }}</th>
            <th>{{ user.language == 'en' ? 'Price' : 'الثمن' }}</th>
            <th class="text-center">
              {{ user.language == 'en' ? 'Quantity' : 'الكمية' }}
            </th>
            <th>{{ user.language == 'en' ? 'Total' : 'المجموع' }}</th>
          </tr>
          <tr v-for="(item, index) in sale.items" class="order-row">
            <td>
              <b>{{ parseInt(index) + 1 }}.</b>
              {{ user.language == 'en' ? item.title : item.title_ar }}
            </td>
            <td>{{ item.cost }}</td>
            <td>
              <span>X </span>
              <input
                type="text"
                readonly
                v-model="item.quantity"
                class="quantity-field"
                :class="'order-item-' + index"
              />
            </td>
            <td>
              {{ item.subtotal }}
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <b>{{ trans('total') }}</b>
            </td>
            <td>
              <h4>
                {{ sale.total }}&nbsp;
                {{ getSetting('currency', settings) }}
              </h4>
            </td>
          </tr>
        </table>
        <div class="row">
          <div class="col-sm-12 text-center">
            <button
              class="btn btn-primary btn-block prevent-print"
              @click="print_page"
            >
              {{ trans('print receipt') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-content text-center" v-else>
      <i
        class="fa fa-spinner fa-spin"
        style="font-size: 80px; margin-top: 50px"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Receipt',
  data() {
    return {}
  },
  props: ['user', 'strings', 'sale', 'showReceipt', 'settings'],
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    print_page() {
      window.print()
    },
  },
}
</script>
