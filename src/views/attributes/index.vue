<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div class="card-header mb-3 header-sm d-flex justify-content-between align-items-center">
          <h4 class="card-title" v-if="user.language" v-text="trans('attributes')"></h4>
          <div class="dropdown"></div>
        </div>
        <div class="card-body">
          <div class="row mx-0 align-items-start justify-content-between mb-4">
            <div class="col-sm-12 text-center" v-if="this.message.length">
              <div class="alert" :class="'alert-' + alertType" v-html="this.message"></div>
            </div>
            <div class="clear clearfix"></div>
            <b-col cols="12" md="4" v-if="permissions.includes('add_attributes')">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(store)">
                  <ValidationProvider
                    rules="englishLettersAndNumbersOnly"
                    v-slot="{ valid, errors }"
                    name="name"
                  >
                    <b-form-group :label="trans('title') + ' En'">
                      <b-form-input
                        type="text"
                        v-model="attribute.title"
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
                    <b-form-group :label="trans('title') + ' Ar'">
                      <b-form-input
                        type="text"
                        v-model="attribute.title_ar"
                        :state="errors[0] ? false : valid ? true : null"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider name="type" rules="required" v-slot="{ valid, errors }">
                    <b-form-group :label="trans('type')">
                      <b-form-select
                        v-model="attribute.type"
                        :state="errors[0] ? false : valid ? true : null"
                      >
                        <b-form-select-option value="text">
                          {{ trans('text') }}
                        </b-form-select-option>
                        <b-form-select-option value="color">
                          {{ trans('color') }}
                        </b-form-select-option>
                      </b-form-select>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <b-form-row class="justify-content-center mb-4">
                    <b-button variant="primary" type="submit" v-if="EditMode">
                      <font-awesome-icon icon="fa-solid fa-check " />
                    </b-button>
                    <b-button variant="success" type="submit" v-else>
                      <i class="bi bi-plus-lg"></i>
                    </b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </b-col>
            <b-col cols="12" md="8" v-if="permissions.includes('view_attributes')">
              <b-table-simple sticky-header striped bordered responsive style="min-height: 50px">
                <b-thead>
                  <b-tr class="rounded" variant="dark">
                    <b-th>{{ trans('title') }}</b-th>
                    <b-th>{{ trans('type') }}</b-th>
                    <b-th></b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-if="itemsLoaded && attributes.length" class="text-center">
                  <b-tr v-for="(attr, index) in attributes" :key="attr.id">
                    <b-td>{{ trans(attr.title) }}</b-td>
                    <b-td>{{ attr.type == 'text' ? trans('text') : trans('color') }}</b-td>
                    <b-td>
                      <router-link
                        v-b-tooltip.hover
                        :title="trans('manage_terms')"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        :to="'/terms/' + attr.id"
                        ><font-awesome-icon icon="fa-solid fa-bars-progress"
                      /></router-link>

                      <a
                        v-b-tooltip.hover
                        title="تعديل"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        v-if="permissions.includes('edit_attributes')"
                        @click="edit(attr, index)"
                        ><font-awesome-icon icon="fa-solid fa-pen-to-square"
                      /></a>

                      <a
                        v-b-tooltip.hover
                        title="حذف"
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2"
                        @click="deleteAttr(attr.id)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash "
                      /></a>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-if="itemsLoaded && !attributes.length" class="text-center">
                  <b-tr>
                    <b-td colspan="5">
                      <h5>{{ trans('no_results_found') }}</h5>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
            <b-col cols="12" v-else>
              <h2 class="text-center" v-if="user.language == 'en'">
                You Not Allowed to Open This Page
              </h2>
              <h2 class="text-center" v-else>هذه الصفحه غير مسموح لك الدخول عليها</h2>
            </b-col>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="card-body text-center">
          <font-awesome-icon class="fa-spin-pulse" icon="fa-solid fa-spinner " />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
tr.select-attribute {
  border: 1px solid #000;
  background-color: #077b53 !important;
  height: 60px;
}
</style>
<script>
export default {
  name: 'AppAttributes',
  props: ['section', 'sections', 'user', 'user_language', 'langs', 'permissions'],
  data() {
    return {
      message: '',
      alertType: 'success',
      attributes: [],
      strings: [],
      attribute: {
        type: 'text'
      },
      EditMode: 0,
      editIndex: [],
      loaded: false,
      itemsLoaded: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    refresh() {
      this.itemsLoaded = false

      axios
        .get('/api/attributes')
        .then((res) => {
          this.attributes = res.data.attributes
          this.strings = res.data.strings
          this.loaded = true
          this.itemsLoaded = true
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
    edit(attr, idx) {
      this.EditMode = 1
      this.attribute = this.cloneItem(attr)
      this.editIndex = idx
    },
    store() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'
      let uri = this.EditMode
        ? '/api/attributes/update/' + this.attribute.id
        : '/api/attributes/store'
      axios
        .post(uri, this.attribute)
        .then(
          (res) => {
            if (res.data.success) {
              this.message = res.data.message
              this.alertType = 'success'
              if (this.EditMode) {
                this.EditMode = 0
                this.attribute[this.editIndex] = this.attribute
                // this.refresh();
              } else {
                this.attributes.push(res.data.attribute)
              }
              this.$nextTick(() => {
                this.$refs.form.reset()
              })
              this.attribute = {
                type: 'text'
              }
              this.refresh()
            } else {
              this.message = res.data.message
              this.alertType = 'danger'
            }
          },
          (error) => {
            this.message = error.response.data.message
            this.alertType = 'danger'
          }
        )
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
        })
    },
    deleteAttr(id) {
      this.$bvModal
        .msgBoxConfirm(this.trans('Do you want to delete this term'), {
          okTitle: this.trans('yes'),
          cancelTitle: this.trans('no'),
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal'
        })
        .then((value) => {
          if (value) {
            this.message = "<i class='fa fa-spin fa-spinner'></i>"
            this.alertType = 'info'
            axios
              .delete('/api/attributes/delete/' + id)
              .then((res) => {
                if (res.data.success) {
                  this.message = res.data.message
                  this.alertType = 'success'
                  setTimeout(() => {
                    this.message = ''
                    this.alertType = 'success'
                  }, 5000)
                  this.attributes = this.attributes.filter((x) => {
                    return x.id != id
                  })
                  this.refresh()
                } else {
                  this.message = res.data.message
                  this.alertType = 'danger'
                  setTimeout(() => {
                    this.message = ''
                    this.alertType = 'success'
                  }, 120000)
                }
              })
              .catch((error) => {
                this.message = error.response.data.message
                this.alertType = 'danger'
                setTimeout(() => {
                  this.message = ''
                  this.alertType = 'success'
                }, 120000)
              })
          }
        })
        .catch((err) => {
          // An error occurred
        })
    }
  }
}
</script>
