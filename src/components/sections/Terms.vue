<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card" v-if="loaded">
        <div
          class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        >
          <h4
            class="card-title"
            v-if="user.language == 'en'"
            v-text="attribute.title"
          ></h4>
          <h4 class="card-title" v-else v-text="attribute.title_ar"></h4>
          <div class="dropdown">
            <b-button @click="$router.go(-1)" class="btn btn-warning"
              ><font-awesome-icon icon="fa-solid fa-reply-all " />
            </b-button>
          </div>
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
            <b-col cols="12" md="4">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(store)">
                  <ValidationProvider
                    rules="englishLettersAndNumbersOnly"
                    v-slot="{ valid, errors }"
                    name="name"
                  >
                    <b-form-group :label="`${strings['title'] + ' En'}`">
                      <b-form-input
                        type="text"
                        v-model="term.title"
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
                    <b-form-group :label="`${strings['title'] + ' Ar'}`">
                      <b-form-input
                        type="text"
                        v-model="term.title_ar"
                        :state="errors[0] ? false : valid ? true : null"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required"
                    v-slot="{ valid, errors }"
                    name="term_meta"
                  >
                    <label
                      style="
                        cursor: pointer;
                        text-align: center;
                        font-size: 24px;
                      "
                      v-if="attribute.type == 'color'"
                      for="color"
                    >
                      <font-awesome-icon icon="fa-solid fa-palette" />
                      اختر لون</label
                    >
                    <b-form-group
                      v-if="attribute.type == 'color'"
                      :style="
                        term.term_meta == ''
                          ? 'visibility:hidden'
                          : 'visibility:visible'
                      "
                    >
                      <b-form-input
                        :id="attribute.type"
                        v-model="term.term_meta"
                        placeholder="choose value"
                        type="color"
                        :state="errors[0] ? false : valid ? true : null"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group
                      v-if="attribute.type == 'text'"
                      :label="strings['term meta']"
                    >
                      <b-form-input
                        :id="attribute.type"
                        v-model="term.term_meta"
                        type="text"
                        :state="errors[0] ? false : valid ? true : null"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>
                  <b-form-row class="justify-content-center">
                    <b-button variant="success" type="submit">
                      <font-awesome-icon
                        v-if="EditMode"
                        icon="fa-solid fa-check"
                      />
                      <font-awesome-icon
                        v-else
                        icon="fa-solid fa-circle-plus "
                      />
                    </b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </b-col>
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
                    <b-th>{{ strings['title'] }}</b-th>
                    <b-th>{{ strings['term meta'] }}</b-th>
                    <b-th></b-th>
                  </b-tr>
                </b-thead>
                <b-tbody v-if="loaded" class="text-center">
                  <b-tr v-for="(trm, idx) in terms" :key="idx">
                    <b-td>{{
                      user.language == 'en' ? trm.title : trm.title_ar
                    }}</b-td>
                    <b-td v-if="attribute.type == 'text'">
                      {{ trm.term_meta }}</b-td
                    >
                    <b-td v-else
                      ><span
                        class="color-meta"
                        :style="'background:' + trm.term_meta"
                      ></span>
                    </b-td>
                    <b-td>
                      <a
                        v-b-tooltip.hover
                        title="تعديل"
                        style="cursor: pointer; color: #007bff !important"
                        class="mx-2"
                        @click="edit(idx, trm)"
                        ><font-awesome-icon icon="fa-solid fa-pen-to-square"
                      /></a>

                      <a
                        v-b-tooltip.hover
                        title="حذف"
                        style="cursor: pointer; color: #dc3545 !important"
                        class="mx-2"
                        @click="deleteTerm(trm.id)"
                      >
                        <font-awesome-icon icon="fa-solid fa-trash "
                      /></a>
                    </b-td>
                  </b-tr>
                </b-tbody>
                <b-tbody v-else class="text-center">
                  <b-tr>
                    <b-td colspan="3">
                      <font-awesome-icon
                        class="fa-spin-pulse"
                        icon="fa-solid fa-spinner "
                      />
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="card-body text-center">
          <font-awesome-icon
            class="fa-spin-pulse"
            icon="fa-solid fa-spinner "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
tr.select-term {
  border: 1px solid #000;
  background-color: #077b53 !important;
  height: 60px;
}
input[type='color'].form-control {
  padding-right: calc(1.5em + 0.75rem) !important;
  padding-top: 0.375rem !important;
  padding-bottom: 0.375rem !important;
  padding-left: 0.75rem !important;
}

.color-meta {
  width: 15px;
  height: 15px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #a7a7a7;
  display: inline-block;
}
</style>
<script>
export default {
  name: 'AppTerms',
  props: ['section', 'sections', 'user', 'user_language', 'langs'],
  data() {
    return {
      loaded: false,
      message: '',
      alertType: 'success',
      terms: [],
      strings: [],
      term: {
        term_meta: '',
      },
      attribute: {},
      EditMode: 0,
      editIndex: '',
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  methods: {
    refresh() {
      this.loaded = false
      axios
        .get('/api/terms/' + this.$route.params.id)
        .then(res => {
          this.attribute = res.data.attribute
          this.terms = res.data.terms
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
    edit(idx, trm) {
      this.EditMode = 1
      this.term = this.cloneItem(trm)
      this.editIndex = idx
    },
    store() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'
      // console.log(this.term);
      let uri = this.EditMode
        ? '/api/terms/update/' + this.term.id
        : '/api/terms/store/' + this.attribute.id
      axios
        .post(uri, this.term)
        .then(
          res => {
            if (res.data.success) {
              this.message = res.data.message
              this.alertType = 'success'
              if (this.EditMode) {
                this.EditMode = 0
                this.terms[this.editIndex] = this.term
                // this.refresh();
              } else {
                this.terms.push(res.data.term)
              }
              this.$nextTick(() => {
                this.$refs.form.reset()
              })
              this.term = {
                term_meta: '',
              }
            } else {
              this.message = res.data.message
              this.alertType = 'danger'
            }
          },
          error => {
            this.message = error.response.data.message
            this.alertType = 'danger'
          }
        )
        .catch(error => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    deleteTerm(id) {
      this.$bvModal
        .msgBoxConfirm(
          this.user.language == 'en'
            ? 'Do you want to delete this term ?'
            : 'هل تريد حذف هذه الخاصيه ؟',
          {
            okTitle: this.user.language == 'en' ? 'Yes' : 'نعم',
            cancelTitle: this.user.language == 'en' ? 'No' : 'لا',
            okVariant: 'danger',
            footerClass: 'm-2',
            hideHeaderClose: false,
            centered: true,
            modalClass: 'delete-modal',
          }
        )
        .then(value => {
          if (value) {
            this.message = "<i class='fa fa-spin fa-spinner'></i>"
            this.alertType = 'info'
            axios
              .delete('api/terms/delete/' + id)
              .then(res => {
                if (res.data.success) {
                  this.message = res.data.message
                  this.alertType = 'success'
                  setTimeout(() => {
                    this.message = ''
                    this.alertType = 'success'
                  }, 5000)
                  this.terms = this.terms.filter(x => {
                    return x.id != id
                  })
                } else {
                  this.message = res.data.message
                  this.alertType = 'danger'
                  setTimeout(() => {
                    this.message = ''
                    this.alertType = 'success'
                  }, 120000)
                }
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
        .catch(err => {
          // An error occurred
        })
    },
  },
}
</script>
