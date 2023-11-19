<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card mt-4">
      <div class="row w-100 mx-0 mt-4" v-if="loaded">
        <div class="card col-lg-auto col-12 tree-container" :class="treeOpened ? 'opened' : ''">
          <h4>
            <strong>
              <font-awesome-icon icon="fa-solid fa-list " @click="treeOpened = !treeOpened" />
              <span>{{ trans('account_trees') }}</span>
              <span :class="language === 'ar' ? 'float-left' : 'float-right'">
                <a
                  class="btn btn-blue mx-1"
                  v-b-tooltip.hover
                  :title="trans('add new account')"
                  @click="startCreate()"
                >
                  <i class="bi bi-plus-lg"></i>
                </a>
              </span>
            </strong>
          </h4>
          <div class="my-3 search">
            <i
              class="bi bi-search"
              :class="language === 'ar' ? 'position-left' : 'position-right'"
              @click="searchTree()"
            ></i>

            <input
              class="form-control"
              @keyup="searchTree()"
              v-model="searchKey"
              type="text"
              :placeholder="trans('search_here')"
              aria-label="Search"
            />
          </div>
          <b-tree-view
            :class="language === 'en' ? 'textLeft' : 'textRight'"
            :renameNodeOnDblClick="false"
            :data="treeDetailed"
            nodeChildrenProp="children"
            v-if="searchedTree.length == 0"
            nodeLabelProp="title"
            :contextMenu="false"
            @nodeSelect="itemClick"
          ></b-tree-view>
          <b-tree-view
            style="position: relative"
            :renameNodeOnDblClick="false"
            v-if="searchedTree.length > 0"
            :data="searchedTree"
            nodeChildrenProp="children"
            nodeLabelProp="text"
            :contextMenu="false"
            @nodeSelect="itemClick"
          >
          </b-tree-view>
          <span v-if="editingNode.length != 0" class="node-actions" v-on="handleScroll">
            <a
              v-if="permissions.includes('create_account_tree')"
              class="btn btn-blue mx-1"
              v-b-tooltip.hover
              :title="trans('Add  sub account')"
              @click="startCreateSub(editingNode.id)"
            >
              <img
                style="width: 12px; height: 12px; margin-top: -4px"
                src="@/assets/images/add_sub.png"
                alt="Profile image"
              />
            </a>
            <a
              v-if="permissions.includes('delete_account_tree') && deletable === '1'"
              class="btn btn-danger mx-1"
              v-b-tooltip.hover
              :title="trans('delete account')"
              @click="deleteNode(editingNode.id)"
            >
              <font-awesome-icon icon="fa-solid fa-trash" />
            </a>
            <a
              v-if="permissions.includes('update_account_tree')"
              class="btn btn-dark-blue mx-1"
              @click="editNode()"
              v-b-tooltip.hover
              :title="trans('edit account')"
            >
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </a>
          </span>
        </div>

        <!-- v-if="editingNode.id || editMode" -->
        <div v-if="editingNode.id || editMode" class="col mx-3 details">
          <div class="row">
            <div class="col-12">
              <h4 class="text-center">
                <div class="row justify-content-around">
                  <span> {{ trans('show account') }}</span>
                  <span class="active">{{ trans('main data') }}</span>
                </div>
              </h4>
            </div>
          </div>
          <hr />
          <div class="card my-2 p-3">
            <p class="m-0" style="font-size: 21px !important">
              <span>
                <strong>{{ trans('main account') }} : </strong>
                <span v-if="createSubCat">{{ form.parent_name }}</span>
                <span v-else>{{ form.title }}</span>
              </span>
            </p>
          </div>
          <b-form @reset="onReset" v-if="show">
            <div class="card my-2 p-3">
              <div class="row">
                <div class="col">
                  <h5>{{ trans('is active') }}</h5>

                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="form.active"
                      :disabled="!editMode"
                      id="checkbox-1"
                      name="active"
                      value="1"
                      unchecked-value="0"
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
                <div class="col">
                  <h5>{{ trans('account classification') }}</h5>
                  <b-form-radio
                    id="is_parent_1"
                    v-model="form.is_parent"
                    :disabled="!editMode || parent_id !== ''"
                    name="is_parent"
                    value="1"
                  >
                    {{ trans('main') }}
                  </b-form-radio>
                  <b-form-radio
                    id="is_parent_2"
                    v-model="form.is_parent"
                    :disabled="!editMode || parent_id == ''"
                    name="is_parent"
                    value="0"
                  >
                    {{ trans('sub') }}
                  </b-form-radio>
                </div>
                <div class="col">
                  <h5>{{ trans('account nature') }}</h5>
                  <b-form-radio
                    id="account_nature_1"
                    v-model="form.account_nature"
                    :disabled="!editMode"
                    name="account_nature"
                    value="debit"
                    required
                  >
                    {{ trans('debit') }}
                  </b-form-radio>
                  <b-form-radio
                    required
                    id="account_nature_2"
                    v-model="form.account_nature"
                    :disabled="!editMode"
                    name="account_nature"
                    value="credit"
                  >
                    {{ trans('credit') }}
                  </b-form-radio>
                  <b-form-radio
                    required
                    id="account_nature_3"
                    v-model="form.account_nature"
                    :disabled="!editMode"
                    name="account_nature"
                    value="both"
                  >
                    {{ trans('both') }}
                  </b-form-radio>
                </div>
                <div class="col" v-if="creatMode || !editMode">
                  <h5>{{ trans('deleteable') }}</h5>

                  <label class="switch">
                    <input
                      id="checkbox-2"
                      type="checkbox"
                      v-model="form.allow_delete"
                      :disabled="!editMode"
                      name="allow_delete"
                      value="1"
                      unchecked-value="0"
                      required
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="card my-2 p-3">
              <ValidationProvider
                rules="required|arabicLettersAndNumbersOnly"
                v-slot="{ valid, errors }"
                name="trans('name') + '(AR)"
                style="width: 100%"
              >
                <b-form-group :label="trans('name') + '(AR)'">
                  <b-form-input
                    style="border-raduis: 20px !important"
                    type="text"
                    v-model="form.translation.title.ar"
                    :state="errors[0] ? false : valid ? true : null"
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ trans('This field accepts arabic words only') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider
                rules="required|englishLettersAndNumbersOnly"
                v-slot="{ valid, errors }"
                :name="trans('name') + '(EN)'"
                style="width: 100%"
              >
                <b-form-group :label="trans('name') + '(EN)'">
                  <b-form-input
                    style="border-raduis: 20px !important"
                    type="text"
                    v-model="form.translation.title.en"
                    :state="errors[0] ? false : valid ? true : null"
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ trans('This field accepts English words only') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

              <div class="row">
                <b-form-group
                  class="col-6"
                  id="input-group-3"
                  :label="trans('account type')"
                  label-for="input-3"
                >
                  <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                    <b-form-select
                      id="input-3"
                      :disabled="!editMode"
                      v-model="form.type_id"
                      required
                    >
                      <b-form-select-option
                        v-for="type in accountType"
                        :value="type.id"
                        :key="type.id"
                        v-if="type.active === true"
                      >
                        <span v-if="language === 'en'"> {{ type.translation.title.en }}</span>
                        <span v-else> {{ type.translation.title.ar }}</span>
                      </b-form-select-option>
                    </b-form-select>
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  v-if="!editMode"
                  class="col-6"
                  id="input-group-3"
                  :label="trans('account_number')"
                  label-for="input-3"
                >
                  <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input-group-prepend is-text>
                      <font-awesome-icon class="info-icon" icon="fa-solid fa-info" />
                    </b-input-group-prepend>
                    <b-form-input
                      :disabled="!editMode"
                      id="input-2"
                      v-model="form.account"
                      required
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
              <hr />
              <div class="row">
                <b-form-group
                  v-if="!editMode"
                  class="col"
                  id="input-group-2"
                  :label="trans('debit balance')"
                  label-for="input-2"
                >
                  <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input-group-prepend is-text>
                      <font-awesome-icon class="info-icon" icon="fa-solid fa-info" />
                    </b-input-group-prepend>
                    <b-form-input
                      id="input-2"
                      :disabled="!editMode"
                      :class="Number(debit_balance).isNegative('negative_number_color')"
                      v-model="Number(debit_balance).toNegativeFormat()"
                      required
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  v-if="!editMode"
                  class="col"
                  id="input-group-2"
                  :label="trans('credit balance')"
                  label-for="input-2"
                >
                  <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input-group-prepend is-text>
                      <font-awesome-icon class="info-icon" icon="fa-solid fa-info" />
                    </b-input-group-prepend>
                    <b-form-input
                      id="input-2"
                      :class="Number(credit_balance).isNegative('negative_number_color')"
                      v-model="Number(credit_balance).toNegativeFormat()"
                      :disabled="!editMode"
                      required
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  v-if="!editMode"
                  class="col"
                  id="input-group-2"
                  :label="trans('balance')"
                  label-for="input-2"
                >
                  <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input-group-prepend is-text>
                      <font-awesome-icon class="info-icon" icon="fa-solid fa-info" />
                    </b-input-group-prepend>
                    <b-form-input
                      id="input-2"
                      :disabled="!editMode"
                      :class="
                        Number(debit_balance - credit_balance).isNegative('negative_number_color')
                      "
                      :value="Number(debit_balance - credit_balance).toNegativeFormat()"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>

              <div class="row justify-content-around">
                <b-button v-if="creatMode" @click="onSubmit" variant="success">
                  {{ trans('save new account') }}
                </b-button>
                <b-button v-if="editSubmit" @click="onSubmitEdit" variant="success">
                  {{ trans('save edits') }}
                </b-button>
                <b-button v-if="editMode" type="reset" variant="danger">
                  {{ trans('cancel') }}
                </b-button>
              </div>
            </div>
          </b-form>
        </div>
      </div>
      <div class="card" v-else>
        <skeleton-loader />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

import { bTreeView } from 'bootstrap-vue-treeview'
import SkeletonLoaderVue from '@/components/global/SkeletonLoader.vue'

export default {
  name: 'AppViewTree',
  components: {
    bTreeView,
    SkeletonLoaderVue
  },
  props: ['permissions', 'sections', 'section', 'user', 'langs', 'settings', 'language'],
  data() {
    return {
      loaded: false,
      scrolled: false,
      creatMode: false,
      editSubmit: false,
      strings: [],
      tree: [],
      treeDetailed: [],
      editingNode: [],

      alertType: 'success',
      data: [
        {
          text: 'الأصول ( 1 ) 1',
          id: '1',
          children: [
            {
              id: '2',
              text: 'الاصول المتداوله ( 101 ) حسابات 2'
            },
            {
              id: '3',
              text: 'الاصول الثابته ( 102 ) حسابات 3'
            }
          ]
        },
        {
          text: 'الأصول ( 1 ) 1',
          id: '4',
          children: [
            {
              id: '5',
              text: 'الاصول المتداوله ( 101 ) حسابات 2'
            },
            {
              id: '6',
              text: 'الاصول المتداوله ( 101 ) حسابات 2'
            }
          ]
        }
      ],
      nature: null,
      treeOpened: true,
      form: {
        active: 0,
        is_parent: '',
        account: {},
        account_nature: null,

        allow_delete: 0,
        translation: {
          title: {
            ar: '',
            en: ''
          }
        },
        type_id: null,
        parent_id: ''
      },
      accountType: [],
      show: true,
      rootAccount: '',
      editMode: false,
      parent_id: '',
      searchKey: '',
      searchedTree: '',
      initial_credit_balance: 0,
      initial_debit_balance: 0,
      debit_balance: 0,
      credit: 0,
      deletable: 0,
      createSubCat: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
  },
  computed: {
    getLabel() {
      let labels = []

      this.treeDetailed.forEach((el) => {
        if (this.language === 'en') {
          labels.push(el.translation.title.en)
        } else {
          labels.push(el.translation.title.ar)
        }
      })
      return labels
    },

    findNameOfParent(parent_id) {
      this.treeDetailed.map((el) => {
        if (el['id'] == parent_id) {
          return el['id']
        } else {
          console.log(el)
        }
      })

      // this.treeDetailed.find(el=>{
      //   el.id = parent_id
      //   return el
      // })
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // handleScroll() {
    //     console.log(window.scrollY);
    //     if (window.scrollY > 150) {
    //         this.scrolled = true;

    //     } else {
    //         this.scrolled = false;
    //     }
    // },
    refresh() {
      axios
        .get('/api/account-tree')

        .then((res) => {
          if (res.data.status) {
            this.loaded = true
            this.itemsLoaded = true
            this.treeDetailed = Object.values(res.data.body.tree)

            console.log(this.treeDetailed)
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
      axios.get('/api/account-tree/create').then((res) => {
        if (res.data.status) {
          this.accountType = res.data.body.accounts_type
        }
      })
    },
    searchTree() {
      if (this.searchKey == '') {
        this.searchedTree = ''
      } else {
        axios.get('/api/account-tree?search=' + this.searchKey + '').then((res) => {
          if (res.data.status) {
            this.loaded = true
            this.itemsLoaded = true
            this.searchedTree = Object.values(res.data.body.tree)
            this.showToastError(res.data.message, res.data.custom_code)
          }
        })
      }
    },
    startCreate() {
      this.editMode = true
      this.creatMode = true
      // (this.searchKey = ''), (this.searchedTree = ''), (this.creatMode = true)
      this.editingNode = []
      this.form = {
        active: 0,
        is_parent: '1',
        account_nature: '',
        allow_delete: 0,
        translation: {
          title: {
            ar: '',
            en: ''
          }
        },
        type_id: null,
        parent_id: ''
      }
      this.rootAccount = ''
      this.parent_id = ''
    },
    startCreateSub(id) {
      this.form.active = 0
      this.form.is_parent = 0
      this.form.account_nature = ''
      this.form.allow_delete = 0
      this.form.translation.title.ar = ''
      this.form.translation.title.en = ''
      this.form.type_id = null
      this.creatMode = true
      this.editMode = true
      this.parent_id = id
    },
    deleteNode(id) {
      axios
        .delete('/api/account-tree/' + id)
        .then((res) => {
          if (res.data.status) {
            this.showToastError(res.data.message, response.data.custom_code)

            window.location.reload()

            this.refresh()
          }
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    editNode() {
      ;(this.editSubmit = true), (this.editMode = true)

      this.createSubCat = true
    },
    itemClick(nodeSelect, selected) {
      console.log(nodeSelect.data)
      if (selected) {
        this.editMode = false
        this.creatMode = false
        this.editSubmit = false
        this.editingNode = nodeSelect.data
        this.form = nodeSelect.data
        this.rootAccount = this.treeDetailed.find((x) => x.id === this.editingNode.acc_root)

        this.getTransactionData(nodeSelect.data.id)
      }
      this.createSubCat = false
    },
    getTransactionData(id) {
      axios
        .get('/api/account-tree/' + id)
        .then((res) => {
          this.deletable = res.data.body.account.allow_delete
          this.initial_credit_balance = res.data.body.account.initial_credit_balance ?? 0
          this.initial_debit_balance = res.data.body.account.initial_debit_balance ?? 0

          this.credit_balance = res.data.body.account.credit ?? 0
          this.debit_balance = res.data.body.account.debit ?? 0
        })
        .catch((error) => {})
    },
    onSubmit(event) {
      event.preventDefault()
      if (this.parent_id == '') {
        let data = {
          active: this.form.active === true ? 1 : 0,
          is_parent: this.form.is_parent,
          account_nature: this.form.account_nature,
          allow_delete: this.form.allow_delete === true ? 1 : 0,
          title: {
            ar: this.form.translation.title.ar,
            en: this.form.translation.title.en
          },
          type_id: this.form.type_id
        }
        axios
          .post('/api/account-tree', data)
          .then((res) => {
            if (res.data.status) {
              this.showToastError(res.data.message, res.data.custom_code)
              return this.getTransactionData()
            }
            this.refresh()
            location.reload()
          })
          .catch((error) => {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          })
      } else {
        let data = {
          active: this.form.active === true ? 1 : 0,
          is_parent: this.form.is_parent,
          account_nature: this.form.account_nature,
          allow_delete: this.form.allow_delete === true ? 1 : 0,
          title: {
            ar: this.form.translation.title.ar,
            en: this.form.translation.title.en
          },
          parent_id: this.parent_id,
          type_id: this.form.type_id
        }
        axios
          .post('/api/account-tree', data)
          .then((res) => {
            if (res.data.status) {
              this.showToastError(res.data.message, res.data.custom_code)
            }
            this.refresh()
          })
          .catch((error) => {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          })
      }
    },
    onSubmitEdit(event) {
      let data = {
        active: this.form.active,
        is_parent: this.form.is_parent,
        account_nature: this.form.account_nature,
        allow_delete: this.form.allow_delete,
        title: {
          ar: this.form.translation.title.ar,
          en: this.form.translation.title.en
        },
        type_id: this.form.type_id
      }
      axios
        .put('/api/account-tree/' + this.editingNode.id + '', data)
        .then((res) => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            this.form.active = 0
            this.form.is_parent = ''
            this.form.account_nature = ''
            this.form.allow_delete = 0
            this.form.translation.title.ar = ''
            this.form.translation.title.en = ''
            this.form.type_id = null
          }
          this.refresh()
        })
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.active = 0
      this.form.is_parent = ''
      this.form.account_nature = ''
      this.form.allow_delete = 0
      this.form.translation.title.ar = ''
      this.form.translation.title.en = ''
      this.form.type_id = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
<style scoped>
.tree-container {
  padding: 30px 11px;
  /* height: 80vh; */
  /* position: absolute; */
  width: 50px;
  overflow: hidden;
  transition: all 0.25s ease-in;
  max-height: 100vh;
}

.tree-container h4 span {
  display: none;
}

.tree-container .search {
  display: none;
}

.tree-container .tree-view {
  display: none;
}

.tree-container.tree-container.opened .tree-view {
  display: block;
}

.tree-branch {
  margin-bottom: 15px;
}

.tree-container.opened h4 span {
  display: inline-block !important;
  margin: 0 10px !important;
}

.tree-container.opened .search {
  display: block;
}

.tree-container.opened {
  padding: 30px;
  /* height: 80vh; */
  /* position: absolute; */
  width: 40%;
  overflow: scroll;
}

.details {
  /* position: absolute; */
  width: 50%;
  overflow: scroll;
}

.tree {
  text-align: start;
}

h4 {
  font: normal normal bold;
  letter-spacing: 0px;
  color: #707070;
}

.search {
  position: relative;
}
.position-left {
  left: 15px;
}
.position-right {
  right: 15px;
}
.search svg {
  position: absolute;

  top: 9px;
  color: #ababab;
}

.search input {
  border-radius: 20px;
}

.btn-blue,
.btn-blue:hover {
  background: #39a9db;
  color: #fff;
  font-size: 18px;
}

.btn-green,
.btn-green:hover {
  background: #39db7f;
  color: #fff;
  font-size: 18px;
}

.btn-dark-blue,
.btn-dark-blue:hover {
  background: #181570;
  color: #fff;
  font-size: 18px;
}

.details span.active {
  color: #b83460;
  font-size: 30px;
}

.info-icon {
  color: #7062e9;
  border: 1px solid #7062e9;
  border-radius: 50%;
  padding: 3px 8px;
}

.input-group-prepend {
  background: #ececec;
  border-radius: 0 0.25rem 0.25rem 0;
}

.node-actions {
  position: absolute;
  left: 30px;
  top: 150px;
  background: #c8c8c8;
  border-radius: 50px;
  padding: 8px 10px;
  width: 126px;
}

.node-actions .btn {
  padding: 0 5px;
  color: #fff;
}

.btn,
.btn:hover {
  color: #fff !important;
}

a:hover {
  font-size: 0.875rem !important;
}

.btn-danger,
.btn-danger:hover {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-success {
  background: linear-gradient(180deg, #137b97 0%, #5dc5e0 100%) 0% 0%;
  box-shadow: 0px 1px 8px #0000000d;
  border-radius: 19px !important;
  border: none;
  padding: 8px 14px;
}

input[type='text'] {
  border-radius: 0px !important;
}

.textRight {
  text-align: right !important;
  direction: ltr !important;
}
.textLeft {
  text-align: left !important ;
  direction: rtl !important;
}
.tree-branch {
  width: fit-content !important;
}
.tree-node-icon {
  position: absolute;
  right: 0 !important;
  top: 7px !important;
}

.node-actions {
  width: fit-content !important;
}
</style>
