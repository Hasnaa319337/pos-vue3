<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card content">
      <div class="w-100" v-if="loaded">
        <div class="card">
          <h1>{{ trans('Hello') }} {{ userName }}</h1>
          <p class="lead">
            {{ trans('public_text') }}
          </p>
        </div>

        <div class="row search">
          <div class="col-lg">
            <label>{{ trans('search for customers') }}</label>
            <b-input-group class="mt-3">
              <b-form-input
                v-model="customer"
                type="text"
                :placeholder="trans('type customer name')"
              ></b-form-input>
              <b-input-group-append>
                <a @click="redirectUserCustomer(customer)">
                  <i class="bi bi-search"></i>
                </a>
              </b-input-group-append>
            </b-input-group>
          </div>
          <div class="col-lg">
            <label>{{
              language == 'en' ? 'search for sales invoices' : 'البحث عن فواتير المبيعات'
            }}</label>
            <b-input-group class="mt-3">
              <b-form-input
                v-model="invoiceNum"
                type="text"
                :placeholder="language == 'en' ? 'type Invoice number' : 'ضع رقم الفاتوره هنا'"
              ></b-form-input>
              <b-input-group-append>
                <a @click="redirectUserSales(invoiceNum)">
                  <i class="bi bi-search"></i>
                </a>
              </b-input-group-append>
            </b-input-group>
          </div>
          <div class="col-lg">
            <label>{{ trans('search for purshases invoices') }}</label>
            <b-input-group class="mt-3">
              <b-form-input
                v-model="invoiceNum2"
                type="text"
                :placeholder="trans('type Invoice number')"
              ></b-form-input>
              <b-input-group-append>
                <a @click="redirectUserPurshase(invoiceNum2)">
                  <i class="bi bi-search"></i>
                </a>
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>
        <div class="row justify-content-center">
          <h2 class="col-12">
            {{ trans('General_Statistics') }}
          </h2>
          <div v-for="(statistic, index) in statistics" :key="index" class="col-lg-4 mb-3">
            <div class="row m-0 align-items-center dashboard-statistic-card">
              <div class="col-12 text">
                <!-- <h4 class="m-0" v-if="language === 'en'">{{ statistic.translation.title.en }}</h4>
                <h4 class="m-0" v-else>{{ statistic.translation.title.en }}</h4> -->
                <h4 class="m-0">{{ statistic.title }}</h4>
                <p class="m-0">
                  {{ statistic.number }}
                </p>

                <p class="m-0">
                  {{ getSetting('currency', settings) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="dashboard-statistic-card chart">
              <div class="row">
                <div class="col-12">
                  <h3>
                    {{ trans('Sales summary') }}
                  </h3>
                </div>
                <div class="col-12">
                  <b-form inline>
                    <label class="mr-sm-2" for="inline-form-custom-select-pref"
                      >{{ trans('during') }} :</label
                    >
                    <b-form-select
                      id="inline-form-custom-select-pref"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      :options="[
                        {
                          text: trans('last month'),
                          value: null
                        },
                        'One',
                        'Two',
                        'Three'
                      ]"
                      :value="null"
                    ></b-form-select>
                  </b-form>
                </div>
                <div class="col-12"></div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="dashboard-statistic-card chart">
              <div class="row">
                <div class="col-12">
                  <h3>
                    {{ trans('Purshases summary') }}
                  </h3>
                </div>
                <div class="col-12">
                  <b-form inline>
                    <label class="mr-sm-2" for="inline-form-custom-select-pref"
                      >{{ trans('during') }} :
                    </label>
                    <b-form-select
                      id="inline-form-custom-select-pref"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      :options="[
                        {
                          text: trans('last month'),
                          value: null
                        },
                        'One',
                        'Two',
                        'Three'
                      ]"
                      :value="null"
                    ></b-form-select>
                  </b-form>
                </div>
                <div class="col-12"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row p-2 justify-content-center mt-5">
          <div class="col-lg-4 mb-4">
            <router-link
              to="/customers"
              class="row dashboard-statistic-card btn-card align-items-center m-0"
            >
              <div class="col-auto">
                <i class="bi bi-plus-lg"></i>
              </div>
              <div class="col btn-text">{{ trans('add_customer') }}</div>
            </router-link>
          </div>
          <div class="col-lg-4 mb-4">
            <router-link
              to="/providers"
              class="row dashboard-statistic-card btn-card align-items-center m-0"
            >
              <div class="col-auto">
                <font-awesome-icon icon="fa-solid fa-users" />
              </div>
              <div class="col btn-text">{{ trans('add_providers') }}</div>
            </router-link>
          </div>
          <div class="col-lg-4 mb-4">
            <router-link
              to="/products/add"
              class="row dashboard-statistic-card btn-card align-items-center m-0"
            >
              <div class="col-auto">
                <font-awesome-icon icon="fa-solid fa-people-carry-box" />
              </div>
              <div class="col btn-text">{{ trans('add_products') }}</div>
            </router-link>
          </div>
          <div class="col-lg-4 mb-4">
            <router-link
              to="/purchases/add"
              class="row dashboard-statistic-card btn-card align-items-center m-0"
            >
              <div class="col-auto">
                <font-awesome-icon icon="fa-solid fa-share-nodes" />
              </div>
              <div class="col btn-text">
                {{ trans('add_purchase_invoice') }}
              </div>
            </router-link>
          </div>
          <div class="col-lg-4 mb-4">
            <router-link
              to="/cashier"
              class="row dashboard-statistic-card btn-card align-items-center m-0"
            >
              <div class="col-auto">
                <font-awesome-icon icon="fa-solid fa-circle-dollar-to-slot" />
              </div>
              <div class="col btn-text">{{ trans('add_sale_invoice') }}</div>
            </router-link>
          </div>
          <div class="col-lg-4 mb-4">
            <router-link
              to="/"
              class="row dashboard-statistic-card btn-card align-items-center m-0"
            >
              <div class="col-auto">
                <font-awesome-icon icon="fa-regular fa-clipboard" />
              </div>
              <div class="col btn-text">
                {{ trans('add_daily_restriction') }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="card-body row text-center">
          <i class="fa fa-spin fa-spinner" style="font-size: 30px; margin: 50px"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Statistics',

  props: ['permissions', 'section', 'user', 'langs', 'settings', 'language'],
  data() {
    return {
      userName: localStorage.getItem('userName'),
      message: '',
      alertType: 'success',
      loaded: true,
      statistics: [],
      strings: [],
      customer: '',
      invoiceNum: '',
      invoiceNum2: ''
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },

  methods: {
    refresh() {
      this.loaded = false
      this.statistics = []
      axios
        .get('/api/dashboard')
        .then((res) => {
          this.statistics = res.data.body
          // delete this.statistics.strings
          this.loaded = true
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    redirectUserCustomer(customer) {
      if (customer !== '') {
        this.$router.push('/customers?name=' + customer)
      } else {
        if (this.language == 'en') {
          alert('Add Some Data')
        } else {
          alert('ادخل بيانات في حقل البحث')
        }
      }
    },
    redirectUserSales(sale) {
      if (sale !== '') {
        this.$router.push('/sales/view/' + sale)
      } else {
        if (this.language == 'en') {
          alert('Add Some Data')
        } else {
          alert('ادخل بيانات في حقل البحث')
        }
      }
    },
    redirectUserPurshase(purshse) {
      if (purshse !== '') {
        this.$router.push('/purchases/edit/' + purshse)
      } else {
        if (this.language == 'en') {
          alert('Add Some Data')
        } else {
          alert('ادخل بيانات في حقل البحث')
        }
      }
    }
  }
}
</script>
<style scoped>
.dashboard-card {
  width: 240px;
  height: 150px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 22px #0000000f;
  border-radius: 10px;
  font-weight: 300;
}

.dashboard-card img {
  margin-bottom: 15px;
}
.dashboard-btn {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #fff;
  border: 4px solid #e8e8e8;
  align-items: center;
  justify-content: center;
  display: flex;
}
.dashboard-btn-blue {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #294def;
  align-items: center;
  justify-content: center;
  display: flex;
}
.dashboard-btn-blue a {
  color: #fff;
  font-size: 66px;
}
.dashboard-statistic-card {
  background: #fff;
  box-shadow: 0px 2px 22px #0000000f;
  border-radius: 10px;
  padding: 20px 10px;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  text-decoration: none;
}
.dashboard-statistic-card:hover {
  text-decoration: none;
}

.dashboard-statistic-card .text {
  overflow: hidden;
  text-align: center;
}
.dashboard-statistic-card .text h4 {
  font-size: 21px;
  color: #137b97;
  font-weight: 600;
}
.dashboard-statistic-card .text p {
  font-size: 21px;
  color: #0d0d0d;
  font-weight: 600;
}

.dashboard-statistic-card p {
  font-size: 15px;
  font-weight: 300;
}
.dashboard-statistic-card .blue {
  color: #323eb6;
}
h2 {
  font-weight: 600;
  font-size: 26px;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
  margin-bottom: 50px;
}
.btn-card svg {
  font-size: 37px;
  color: #137b97;
}
.btn-card .btn-text {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #0d0d0d;
}
.card {
  background: #fcfcfc 0% 0% no-repeat padding-box !important;
  border-radius: 11px !important;
  border: none !important;
  box-shadow: none !important;
  padding: 25px 35px 40px;

  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #1f1f1f;
}
.card h1 {
  font-size: 32px;
  font-weight: 600;
}
p.lead {
  text-align: right;
  font-size: 16px;
  font-weight: 300;
  color: #1f1f1f;
}

.input-group input {
  padding: 16px;
  min-height: 50px;
}

.input-group-append {
  z-index: 3;
}

.input-group-append a {
  position: absolute;
  left: auto;
  right: 1px;
  top: 2px;
  background: linear-gradient(180deg, #4d3b9d 0%, #6e5cc2 100%) 0% 0%;
  color: #fff;
  padding: 14.5px 16px;
  border-radius: 50%;
  font-size: 14px;
  line-height: 1;
}
.rtl .input-group-append a {
  left: 1px;
  right: auto;
  color: #fff;
}
label {
  color: #4d3b9d;
  font-size: 16px;
  font-weight: 300;
}
.search {
  margin-top: 32px;
  margin-bottom: 54px;
}
.stretch-card {
  padding: 0 38px;
}
@media screen and (max-width: 575px) {
  .stretch-card {
    padding: 0 20px;
  }
  .card h1 {
    font-size: 28px;
    margin-bottom: 1rem;
  }
}
.chart {
  padding: 26px 22px;
  margin: 48px 0 20px;
}
.chart h3 {
  border: none;
  font-size: 23px;
  font-weight: bold;
  color: #137b97;
  margin-bottom: 10px;
  padding: 0;
}
.chart .form-inline label {
  font-size: 16px;
  font-weight: 300;
}

.chart .form-inline select {
  padding: 0;
  border: none;
  font-size: 16px;
  font-weight: 300;
}
.chart::after {
  content: ;
}
.custom-select {
  background-image: none;
}
</style>
