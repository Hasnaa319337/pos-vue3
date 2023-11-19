<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card" v-if="loaded">
      <div
        class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
      >
        <h4 class="card-title">{{ trans('pages') }}</h4>
        <div class="dropdown"></div>
      </div>
      <div class="card-body">
        <div class="row mx-0 align-items-start justify-content-between mb-4">
          <div class="col-sm-12 text-center" v-if="this.message.length">
            <div
              class="alert"
              :class="'alert-' + alertType"
              v-html="this.message"
            ></div>
          </div>
          <div class="clear clearfix"></div>

          <!-- Start:: form  -->
          <b-col cols="12" md="4">
            <ValidationObserver v-slot="{ handleSubmit }" ref="form">
              <b-form @submit.prevent="handleSubmit(store)">
                <ValidationProvider
                  rules="englishLettersAndNumbersOnly"
                  v-slot="{ valid, errors }"
                  name="name"
                >
                  <b-form-group :label="trans('title') + ' (En) '">
                    <b-form-input
                      type="text"
                      v-model="sec.x_title.en"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  rules="required|arabicLettersAndNumbersOnly"
                  v-slot="{ valid, errors }"
                  name="name_ar"
                >
                  <b-form-group :label="trans('title') + ' (Ar) '">
                    <b-form-input
                      type="text"
                      v-model="sec.x_title.ar"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  rules="required|min:2"
                  v-slot="{ valid, errors }"
                  name="slug"
                >
                  <b-form-group :label="trans('slug')">
                    <b-form-input
                      v-model="sec.slug"
                      type="text"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <b-form-group :label="trans('route')">
                  <b-form-input
                    value=""
                    v-model="sec.route"
                    type="text"
                  ></b-form-input>
                </b-form-group>
                <ValidationProvider
                  name="category"
                  rules=""
                  v-slot="{ valid, errors }"
                >
                  <b-form-group :label="trans('category')">
                    <b-form-select
                      class="col p-0"
                      v-model="sec.section"
                      :state="errors[0] ? false : valid ? true : null"
                    >
                      <b-form-select-option
                        v-for="(cat, index) in category"
                        :value="cat"
                        :selected="index === 0"
                        :key="cat"
                      >
                        <span> {{ cat }} </span>
                      </b-form-select-option>
                    </b-form-select>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  name="icon"
                  rules=""
                  v-slot="{ valid, errors }"
                >
                  <b-form-group :label="trans('icon')">
                    <b-form-select
                      class="col p-0"
                      v-model="sec.icon"
                      :state="errors[0] ? false : valid ? true : null"
                    >
                      <b-form-select-option
                        v-for="icon in icons"
                        :value="icon"
                        :key="icon"
                      >
                        <span> {{ icon }} </span>
                      </b-form-select-option>
                    </b-form-select>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>

                <template v-if="user.language == 'ar'">
                  <p class="m-0">
                    <small>
{{ trans('the icon can be viewed from this link') }}                      <a
                        target="_blank"
                        :href="
                          'https://fontawesome.com/icons/' +
                          sec.icon +
                          '?s=solid'
                        "
                      >
                        font awesome</a
                      >
                    </small>
                  </p>
                </template>
                <template v-if="user.language == 'en'">
                  <p class="m-0">
                    <small>
                      you can exmaine icon from this link
                      <a
                        target="_blank"
                        :href="
                          'https://fontawesome.com/icons/' +
                          sec.icon +
                          '?s=solid'
                        "
                        >font awesome</a
                      ></small
                    >
                  </p>
                </template>
                <ValidationProvider
                  name="parent"
                  rules="integer"
                  v-slot="{ valid, errors }"
                >
                  <b-form-group :label="trans('parent')">
                    <b-form-select
                      v-model="sec.parent"
                      :state="errors[0] ? false : valid ? true : null"
                    >
                      <b-form-select-option value="">
                        No Parent
                      </b-form-select-option>

                      <template v-for="s in parent_sections">
                        <b-form-select-option :value="s.id" :key="s.id">
                          {{ s.title }}
                        </b-form-select-option>
                      </template>
                    </b-form-select>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  name="order"
                  rules="integer"
                  v-slot="{  errors }"
                  @keypress="isNumber($event)"
                >
                  <b-form-group :label="trans('ordering')">
                    <b-form-input
                      v-model="sec.order"
                      type="number"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
                <b-form-row class="justify-content-center mb-4">
                  <b-button
                    :variant="editMode ? 'primary' : 'success'"
                    type="submit"
                  >
                    <font-awesome-icon
                      v-if="editMode"
                      icon="fa-solid fa-check"
                    />
                    <font-awesome-icon v-else icon="fa-solid fa-circle-plus" />
                  </b-button>
                </b-form-row>
              </b-form>
            </ValidationObserver>
          </b-col>
          <!-- End:: form  -->

          <!-- start:: table -->

          <b-col cols="12" md="8">
            <b-table-simple
              sticky-header
              striped
              bordered
              responsive
              style="min-height: 50px"
            >
              <b-thead>
                <b-tr class="rounded" variant="dark">
                  <b-th>{{ trans('ordering') }}</b-th>
                  <b-th> {{ trans('title') }} En </b-th>
                  <b-th>{{ trans('title') }} Ar </b-th>
                  <b-th>{{ trans('category') }}</b-th>
                  <b-th>{{ trans('slug') }}</b-th>
                  <b-th>{{ trans('route') }}</b-th>
                  <b-th>{{ trans('icon') }}</b-th>
                  <b-th>{{ trans('parent') }}</b-th>
                  <b-th>{{ trans('options') }}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody class="text-center">
                <template v-for="se in secs">
                  <b-tr :key="se.id">
                    <b-td>
                      {{ se.order }}
                    </b-td>
                    <b-td>
                      {{ se.title_trans }}
                    </b-td>
                    <b-td>
                      {{ se.title_trans }}
                    </b-td>
                    <b-td>
                      {{ se.section }}
                    </b-td>
                    <b-td>
                      {{ se.slug }}
                    </b-td>
                    <b-td>
                      {{ se.route }}
                    </b-td>
                    <b-td>
                      {{ se.icon }}
                    </b-td>
                    <b-td>
                      {{
                        se.parent == null
                          ? 'No Parent'
                          : secs.filter(x => {
                              return x.id == se.parent
                            })[0].title_trans
                      }}
                    </b-td>
                    <b-td>
                      <a
                        v-b-tooltip.hover
                        title="تعديل"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        @click="edit(se)"
                      >
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                      </a>

                      <a
                        v-b-tooltip.hover
                        title="حذف"
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2"
                        @click="destroy(se.id, index)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash " />
                      </a>
                    </b-td>
                  </b-tr>
                </template>
              </b-tbody>
              <!-- <b-tbody v-else-if="loaded && !secs.length" class="text-center">
                  <b-tr>
                      <b-td colspan="4">
                          <h5>{{ strings['no_results_found'] }}</h5>
                      </b-td>
                  </b-tr>
              </b-tbody> -->
              <!-- <b-tbody v-else class="text-center">
                  <b-tr>
                      <b-td colspan="7">
                          <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
                      </b-td>
                  </b-tr>
              </b-tbody> -->
            </b-table-simple>
          </b-col>

          <!-- End:: Table -->
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <div class="card-body text-center">
        <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppSections',
  props: ['section', 'sections', 'user', 'user_language', 'langs'],
  data() {
    return {
      message: '',
      editMode: 0,
      ed_sec: {},
      alertType: 'success',
      sec: {
        x_title: [{ en: '' }, { ar: '' }],
      },
      secs: [],
      parent_sections: [],
      strings: [],
      loaded: false,
      category: [],
      icons: [
        'user',
        'user-plus',
        'users',
        'people-carry-box',
        'share-nodes',
        'circle-dollar-to-slot',
        'circle',
        'xmark',
        'plus',
        'spinner',
        'minus',
        'angles-left',
        'angle-left',
        'angle-right',
        'angles-right',
        'trash',
        'phone',
        'calendar-days',
        'money-bill',
        'credit-card',
        'wifi',
        'question',
        'check',
        'filter',
        'arrows-rotate',
        'circle-plus',
        'pen-to-square',
        'reply-all',
        'circle-arrow-right',
        'circle-arrow-left',
        'upload',
        'arrow-right',
        'arrow-left',
        'arrows-left-right',
        'barcode',
        'download',
        'eye',
        'print',
        'list',
        'magnifying-glass',
        'arrow-downLong',
        'info',
        'bars-staggered',
        'angle-down',
        'angle-up',
        'bars',
        'clipboard',
        'globe',
        'calendar',
        'file-lines',
        'warehouse',
        'diagram-project',
        'box-open',
        'file-invoice-dollar',
        'percent',
        'chart-line',
        'user-group',
        'cart-plus',
        'chair',
        'users-gear',
        'shield',
        'gear',
        'language',
      ],
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    refresh() {
      this.loaded = false
      this.secs = []
      axios
        .get('/api/sections')
        .then(res => {
          this.secs = res.data.body.sections
          this.parent_sections = res.data.body.parent_sections
          this.category = res.data.body.section
          this.strings = res.data.strings
          this.loaded = true
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
    store() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'
      this.sec.parent = this.sec.parent == 0 ? null : this.sec.parent
      let method =  this.editMode ? 'put': 'post'
      axios
        [method](
          this.editMode
            ? '/api/sections/' + this.sec.id
            : '/api/sections',
          this.sec
        )
        .then(res => {
          if (res.data.status) {
            this.message = res.data.message
            this.alertType = 'success'
            // this.secs.push(res.data.sec);
            if (this.editMode) {
              this.editMode = 0
            }
            this.sec = {
              x_title: [{ en: '' }, { ar: '' }],
            }
            this.$nextTick(() => {
              this.$refs.form.reset()
            })
            this.refresh()
          } else {
            this.message = res.data.message
            this.alertType = 'danger'
          }
          this.refresh()
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
    edit(section) {
      this.editMode = 1
      this.sec = this.cloneItem(section)
      this.sec.parent = section.parent == null ? 0 : section.parent
      // let section = sec;
      // const x_title = {};
      // for (let i = 0; i < this.langs.length; i++) {
      //     x_title[this.langs[i].locale] =
      //         this.langs[i].locale == 'en' ?
      //             section.title :
      //             section.x_title.filter(x => {
      //                 return x.language == this.langs[i].locale
      //             })[0].value;
      // }
      // this.sec.x_title = x_title;
    },
    destroy(id, index) {
      let route = `/api/sections/${id}/destroy`
      this.$swal({
        title: this.strings['question'],
        text: this.strings['alert_delete'],
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          axios
            .post(route, {})
            .then(res => {
              this.secs.splice(index, 1)
            })
            .catch(error => {
              this.message = error.response.data.message
              this.alertType = 'danger'
              setTimeout(() => {
                this.message = ''
                this.alertType = 'success'
              }, 120000)
            })
        }
      })
    },
  },
}
</script>
