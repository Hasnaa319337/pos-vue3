<template>
  <div
    class="col-sm-12 grid-margin stretch-card"
    style="width: 100%; height: 100%; margin-top: 10px"
  >
    <div class="card" v-if="loaded">
      <div
        class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        style="margin: 40px 20px; border-radius: 12px; padding-bottom: 0px"
      >
        <h4 class="card-title">{{ trans('accounts_links') }}</h4>
        <div class="dropdown">
          <GoBackButton />
        </div>
      </div>
      <div class="col-sm-12 grid-margin stretch-card">
        <div class="row w-100 mx-0">
          <div
            class="col-12 text-center"
            v-if="message"
            style="z-index: 1000000"
          >
            <div
              class="alert"
              :class="'alert-' + alertType"
              v-html="message"
            ></div>
          </div>
          <div class="card col mx-1 tree-container">
            <h4>
              <strong>
                <p class="small">
                  {{
                    trans(
                      'Choose one of the links to view the accounts linked to it'
                    )
                  }}
                </p>
              </strong>
            </h4>

            <v-row>
              <v-col cols="12" md="10">
                <b-form-select @change="getAccounts($event)">
                  <b-form-select-option
                    v-for="(link, index) in accountLinks"
                    :value="link.slug"
                    :key="index"
                    @change="getAccounts(link.slug)"
                  >
                    {{ link.title }}
                  </b-form-select-option>
                </b-form-select>
              </v-col>
              <v-col cols="12" md="2">
                <b-button
                  @click="overlay = !overlay"
                  v-if="Object.keys(accountsInLink).length != 0"
                  style="font-size: 11px"
                  variant="warning"
                  type="reset"
                  class="mr-2"
                >
                  {{ trans('link new account') }}
                </b-button>
              </v-col>
            </v-row>
          </div>

          <b-table-simple
            v-if="Object.keys(accountsInLink).length != 0"
            bordered
            sticky-header
            responsive
          >
            <b-thead>
              <b-tr>
                <b-td style="background: whitesmoke !important">
                  {{ trans('linked account') }}</b-td
                >
                <b-td style="background: whitesmoke !important">{{
                  trans('options')
                }}</b-td>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr
                v-for="(account, index) in accountsInLink.accounts"
                :key="index"
              >
                <b-td
                  style="background: #fff !important; border: 1px solid #ddd"
                >
                  {{ account.title }}
                </b-td>
                <b-td>
                  <a
                    v-if="account.allow_delete == true"
                    v-b-tooltip.hover
                    :title="trans('delete')"
                    style="cursor: pointer; color: #dc3545 !important"
                    class="mx-2"
                    @click="deleteAccount(account.id, account.account)"
                  >
                    <font-awesome-icon icon="fa-solid fa-trash "
                  /></a>
                  <ActionButton
                    v-if="
                      permissions.includes('view_action_event_account_to_link')
                    "
                    :id="account.id"
                    :resource_name="'account_to_link'"
                  />
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <v-row justify="center">
            <v-overlay
              :z-index="zIndex"
              :value="overlay"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                justify-items: center;
              "
            >
              <div
                class="contain"
                style="height: 50%; width: 50%; overflow: hidden"
              >
                <font-awesome-icon
                  style="
                    font-size: 25px;
                    position: absolute;
                    left: 8px;
                    color: #cf1212;
                    padding: 5px;
                    border-radius: 50%;
                    cursor: pointer;
                  "
                  icon="fa fa-close"
                  @click="overlay = false"
                />
                <div style="margin-top: 30px">
                  <h5 style="text-align: center; margin-bottom: 15px">
                    {{ trans('Add an account to a link') }}
                  </h5>
                  <b-form-select v-model="form.tree_account">
                    <b-form-select-option
                      v-for="(account, index) in account_tree_mobile"
                      :value="account.account"
                      :key="index"
                    >
                      {{ account.title }}
                    </b-form-select-option>
                  </b-form-select>

                  <div
                    class="form-group check_box"
                    style="
                      display: flex;
                      align-items: center;
                      margin-top: 20px;
                      justify-content: space-between;
                    "
                  >
                    <label style="font-size: 21px; margin: 8px">
                      {{ trans('deleteable') }}</label
                    >
                    <label class="switch">
                      <input type="checkbox" v-model="form.allow_delete" />
                      <span class="slider round"></span
                    ></label>
                  </div>
                </div>
                <v-btn
                  @click="addNewAccount()"
                  class="save"
                  style="position: absolute; bottom: 33px; left: 39%"
                >
                  {{ trans('add new account') }}
                </v-btn>
              </div>
            </v-overlay>
          </v-row>
        </div>
      </div>
    </div>
    <div v-else style="width: 100%; height: 100%">
      <skeleton-loader />
    </div>
  </div>
</template>

<script>
import { bTreeView } from 'bootstrap-vue-treeview'
import axios from 'axios'

import SkeletonLoader from '@/components/global/SkeletonLoader.vue'

export default {
  name: 'AccountToLink',
  props: [
    'section',
    'sections',
    'user',
    'user_language',
    'langs',
    'permissions',
  ],
  components: {
    bTreeView,
    SkeletonLoader,
  },
  data() {
    return {
      message: '',
      editMode: 0,
      ed_sec: {},
      alertType: 'success',
      accountLinks: [],
      accountsInLink: {},
      treeDetailed: [],
      strings: [],
      loaded: false,
      activeLink: '',
      activeAsset: '',
      selectedAccounts: [],
      deleteable: '',
      overlay: false,
      zIndex: 150000,
      account_tree_mobile: [],
      currentShownAccount: '',
      form: {
        tree_account: {},
        allow_delete: 0,
      },
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    this.getMobileTree()
  },
  methods: {
    getMobileTree() {
      axios
        .get('/api/account-tree-mobile')
        .then(res => {
          this.account_tree_mobile = res.data.body.tree
        })
        .catch(err => {
          console.log(err)
        })
    },
    refresh() {
      this.secs = []
      axios
        .get('/api/account-to-link/links')
        .then(res => {
          this.loaded = true
          this.accountLinks = res.data.body.account_links
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
      axios
        .get('/api/account-tree')
        .then(res => {
          if (res.data.status) {
            this.loaded = true
            this.itemsLoaded = true
            this.treeDetailed = Object.values(res.data.body.tree)
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
          }
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    getAccounts(slug) {
      axios
        .get('/api/account-to-link/links/' + slug)
        .then(res => {
          this.accountsInLink = res.data.body.account_link
          this.currentShownAccount = res.data.body.account_link.slug
          this.strings = res.data.strings
          this.loaded = true
          this.activeLink = res.data.body.account_link.id
          this.activeAsset = res.data.body.account_link.slug
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    addNewAccount() {
      let data = {
        allow_delete: this.form.allow_delete,
        tree_account: this.form.tree_account,
      }

      axios
        .post(
          '/api/account-to-link/accounts/' +
            this.activeAsset +
            '?' +
            this.form.tree_account +
            '',
          data
        )
        .then(res => {
          if (res.data.status) {
            this.overlay = false

            this.showToastError(res.data.message, res.data.custom_code)
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
          }
          return this.getAccounts(this.currentShownAccount)
        })
        .catch(error => {
          this.overlay = false
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    deleteAccount(id, account) {
      let url =
        '/api/account-to-link/accounts/' + this.activeAsset + '?' + account
      let data = {
        tree_account: account,
      }

      this.$bvModal
        .msgBoxConfirm(this.trans('Do you want to this link from account'), {
          okTitle: this.trans('yes'),
          cancelTitle: this.trans('no'),
          okVariant: 'danger',
          footerClass: 'm-2',
          hideHeaderClose: false,
          centered: true,
          modalClass: 'delete-modal',
        })

        .then(res => {
          if (res) {
            axios
              .delete(url, { data: data })
              .then(res => {
                if (res.data.status) {
                  this.showToastError(res.data.message, res.data.custom_code)
                }
                return this.getAccounts(this.currentShownAccount)
              })
              .catch(error => {
                this.showToastError(
                  error.response.data.message,
                  error.response.data.custom_code
                )
              })
          }
        })
    },
  },
}
</script>

<style scoped>
.tree-container {
  padding: 30px 11px;

  width: 50px;
  overflow: scroll;
  transition: all 0.25s ease-in;
  max-height: 100vh;
}
.selected {
  color: #fff;
  background: #007bff;
  padding: 2px 5px;
  border-radius: 4px;
}
li {
  list-style: none;
  font-size: 18px;
  cursor: pointer;
}
.small {
  font-size: 14px;
  color: #948f8f;
}

.delete {
  display: none;
  color: #e64942;
}

li:hover .delete {
  display: inline-block;
}
</style>
