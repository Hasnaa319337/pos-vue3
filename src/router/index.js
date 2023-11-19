import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /////////////////////////// customer //////////////////

    { path: '/customers', component: () => import('@/views/customers/index.vue') },
    { path: '/customers/add', component: () => import('@/views/customers/AddCustomers.vue') },
    {
      path: '/customers/edit/:id',
      component: () => import('@/views/customers/CustomersUpdate.vue')
    },
    { path: '/customers/view/:id', component: () => import('@/views/customers/CustomersView.vue') },

    { path: '/', component: () => import('@/views/statistics/index.vue') },

    ////////////////////////// units /////////////////////////
    {
      path: '/product-units',

      component: () => import('@/views/units/index.vue')
    },

    ////////////////////////// Vouchers //////////////////////////
    { path: '/vouchers', component: () => import('@/views/vouchers/index.vue') },
    {
      path: '/payment-voucher/add',
      component: () => import('@/views/vouchers/payment/AddPaymentVouchers.vue')
    },
    {
      path: '/payment-voucher/:id',
      component: () => import('@/views/vouchers/payment/EditPaymentVouchers.vue')
    },
    {
      path: '/receipt-voucher/add',
      component: () => import('@/views/vouchers/receipt/AddReceiptVouchers.vue')
    },
    {
      path: '/receipt-voucher/:id',
      component: () => import('@/views/vouchers/receipt/EditReceiptVouchers.vue')
    },
    ////////////////////////////// auth /////////////////////
    { path: '/login', component: () => import('@/views/auth/Login.vue') },

    // { path: '*', name: 'Not Found', component: () => import('@/components/sections/NotFound.vue') },

    { path: '/change-password', component: () => import('@/views/auth/ChangePassword.vue') },

    //////////////////////////// Equations ///////////////////////////

    {
      path: '/financial-equations',
      component: () => import('@/views/financialEquations/index.vue')
    },
    {
      path: '/financial_equation_add',
      component: () => import('@/views/financialEquations/FinancialEquationAdd.vue')
    },
    {
      path: '/financial-equation/show/:id',
      component: () => import('@/views/financialEquations/FinancialEquationShow.vue')
    },
    {
      path: '/financial-equation/edit/:id',
      component: () => import('@/views/financialEquations/FinancialEquationEdit.vue')
    },

    /////////////////////////// Financial ////////////////////////

    {
      path: '/financial-list-sections',
      component: () => import('@/views/financial/FinancialStatement.vue')
    },
    {
      path: '/financial_statement_add',
      component: () => import('@/views/financial/FinancialStatementAdd.vue')
    },
    {
      path: '/financial_statement/show/:id',
      component: () => import('@/views/financial/FinancialStatementShow.vue')
    },
    {
      path: '/financial_statement/edit/:id',
      component: () => import('@/views/financial/FinancialStatementEdit.vue')
    },
    {
      path: '/income-list',
      component: () => import('@/views/financial/FinancialStatementReport.vue')
    },

    ///////////////////////// Resource Actions /////////////////////

    {
      path: '/:resource_name/:id',
      component: () => import('@/views/actionEvents/ResourceActions.vue')
    },
    {
      path: '/view/:resource_name/:resource_id/:action_id',
      component: () => import('@/views/actionEvents/ResourceActionView.vue')
    },

    ///////////////////////////// Sidebar //////////////////////////

    { path: '/sidebar', component: () => import('@/views/sidebar/index.vue') },
    { path: '/sidebar/add', component: () => import('@/views/sidebar/SidebarAdd.vue') },
    { path: '/sidebar/edit/:id', component: () => import('@/views/sidebar/SidebarEdit.vue') },

    //////////////////////////// Assets ///////////////////////////

    { path: '/asset', component: () => import('@/views/assets/index.vue') },
    { path: '/add-asset', component: () => import('@/views/assets/AssetsAdd.vue') },
    { path: '/asset/edit/:id', component: () => import('@/views/assets/AssetsEdit.vue') },

    //////////////////////////// Inventory Transfers ////////////////////////////////

    {
      path: '/inventory-transfers',
      component: () => import('@/views/inventoryTransfers/index.vue')
    },
    {
      path: '/inventory-transfers/add',
      component: () => import('@/views/inventoryTransfers/InventoryTransfersAdd.vue')
    },
    {
      path: '/inventory-transfers/edit/:id',
      component: () => import('@/views/inventoryTransfers/InventoryTransfersEdit.vue')
    },
    {
      path: '/inventory-transfer/inventory-transfers/:id',
      component: () => import('@/views/inventoryTransfers/DirectTransferRequest.vue')
    },

    /////////////////////////// Event History //////////////////////

    { path: '/action-event', component: () => import('@/views/eventHistory/index.vue') },
    {
      path: '/action-event/actions/:id',
      component: () => import('@/views/eventHistory/ShowUserActivity.vue')
    },

    /////////////////// Tabels /////////////////////////

    { path: '/tables', component: () => import('@/views/tabels/index.vue') },

    //////////////////// Stoke History ///////////////////

    { path: '/stock-history', component: () => import('@/views/stokeHistory/index.vue') },

    ///////////////////// Purchases ////////////////////////////
    { path: '/purchases', component: () => import('@/views/purchases/index.vue') },
    { path: '/purchases/add', component: () => import('@/views/purchases/PurchasesAdd.vue') },
    { path: '/purchases/edit/:id', component: () => import('@/views/purchases/PurchasesEdit.vue') },
    {
      path: '/purchases-reports',
      component: () => import('@/views/purchases/PurchasesReports.vue')
    },

    //////////////////// Providers //////////////

    { path: '/providers', component: () => import('@/views/providers/index.vue') },
    { path: '/providers/add', component: () => import('@/views/providers/ProvidersAdd.vue') },
    { path: '/providers/edit/:id', component: () => import('@/views/providers/ProvidersEdit.vue') },

    /////////////////////// Transfers//////////////////

    {
      path: '/inventory-transfer-requests',
      component: () => import('@/views/transfers/index.vue')
    },
    {
      path: '/my-inventory-transfer-requests',
      component: () => import('@/views/transfers/MyTransferRequests.vue')
    },
    {
      path: '/inventory-transfer-requests/:id',
      component: () => import('@/views/transfers/TransferRequest.vue')
    },
    {
      path: '/my-inventory-transfer-requests/:id',
      component: () => import('@/views/transfers/MyTransferRequest.vue')
    },
    {
      path: '/single-transfer-request',
      component: () => import('@/views/transfers/SingleTransferRequest.vue')
    },
    ////////////////////////// Sales//////////////////////

    { path: '/sales', component: () => import('@/views/sales/index.vue') },
    { path: '/sales/add', component: () => import('@/views/sales/SalesAdd.vue') },
    { path: '/sales/view/:id', component: () => import('@/views/sales/Sale.vue') },

    //////////////////////// Refund Sale ////////////////////

    { path: '/refund-sales', component: () => import('@/views/refundSales/index.vue') },

    {
      path: '/refund-sale/view/:id',
      component: () => import('@/views/refundSales/RefundSaleView.vue')
    },

    ////////////////////refund ////////////////////
    {
      path: '/sales/refund/:id',
      component: () => import('@/components/sections/NewRefundSale.vue')
    },
    {
      path: '/purchase/refund/:id',
      component: () => import('@/components/sections/NewRefundPurchase.vue')
    },
    // Refund Purchases

    {
      path: '/refund-purchases',
      component: () => import('@/views/refundPurchases/index.vue')
    },

    {
      path: '/refund-sales/view/:id',
      component: () => import('@/components/sections/AppRefundSalesAdd.vue')
    },
    {
      path: '/refund-purchase/view/:id',
      component: () => import('@/views/refundPurchases/RefundPurchaseView.vue')
    },
    {
      path: '/accounts-reports',

      component: () => import('@/components/sections/AccountsReports.vue')
    },

    {
      path: '/accounts-report-data/:id',
      component: () => import('@/components/sections/accounts-report-data.vue')
    },
    { path: '/users-reports', component: () => import('@/views/users/UsersReports.vue') },

    ////////////////////////////// Discounts ///////////////////////

    { path: '/discounts', component: () => import('@/views/discounts/index.vue') },
    { path: '/discounts/add', component: () => import('@/views/discounts/DiscountAdd.vue') },
    { path: '/discounts/edit/:id', component: () => import('@/views/discounts/DiscountEdit.vue') },

    //////////////////////////// Cashier //////////////////////////

    { path: '/cashier', component: () => import('@/views/cashier/Cashier.vue') },
    { path: '/cashier/view/:id', component: () => import('@/views/cashier/CashierView.vue') },

    //////////////////////// Settings /////////////////////////////
    { path: '/settings', component: () => import('@/views/settings/index.vue') },

    //////////////////////////// Inventories ///////////////////////

    { path: '/inventories', component: () => import('@/views/inventories/index.vue') },
    {
      path: '/stock/histories',
      component: () => import('@/views/inventories/InventoryHistory.vue')
    },

    ///////////////////////////// Categories /////////////////////

    { path: '/categories', component: () => import('@/views/categories/index.vue') },
    { path: '/categories/add', component: () => import('@/views/categories/CategoriesAdd.vue') },
    {
      path: '/categories/show/:id',
      component: () => import('@/views/categories/CategoriesShow.vue')
    },

    {
      path: '/categories/edit/:id',
      component: () => import('@/views/categories/CategoriesEdit.vue')
    },
    //////////////////// Attributes //////////////////////////////

    { path: '/attributes', component: () => import('@/views/attributes/index.vue') },

    { path: '/terms/:id', component: () => import('@/components/sections/Terms.vue') },

    /////////////////////// Products ////////////////////////

    { path: '/products', component: () => import('@/views/products/index.vue') },
    { path: '/products/add', component: () => import('@/views/products/ProductsAdd.vue') },
    { path: '/products/edit/:id', component: () => import('@/views/products/ProductsEdit.vue') },
    {
      path: '/products-card/:serial',
      component: () => import('@/components/sections/ProductCard.vue')
    },

    { path: '/variations/:id', component: () => import('@/components/sections/Variations.vue') },

    ///////////////////////// Taxes ///////////////////////

    { path: '/taxes', component: () => import('@/views/taxes/index.vue') },
    { path: '/taxes-reports', component: () => import('@/views/taxes/TaxesReports.vue') },
    { path: '/summary-tax', component: () => import('@/views/taxes/SummaryTax.vue') },

    //////////////////////////////// Roles ////////////////////////

    { path: '/roles', component: () => import('@/views/roles/index.vue') },
    { path: '/roles/add', component: () => import('@/views/roles/RolesAdd.vue') },
    { path: '/roles/show/:id', component: () => import('@/views/roles/RolesShow.vue') },
    { path: '/roles/edit/:id', component: () => import('@/views/roles/RolesEdit.vue') },

    ////////////////////// Users ///////////////////

    { path: '/users', component: () => import('@/views/users/index.vue') },
    { path: '/users/add', component: () => import('@/views/users/UsersAdd.vue') },
    { path: '/users/show/:id', component: () => import('@/views/users/UserShow.vue') },
    { path: '/users/edit/:id', component: () => import('@/views/users/UsersEdit.vue') },

    {
      path: '/accounting_restriction/show/:id',
      component: () => import('@/views/bonds/BondsShow.vue')
    },

    ////////////////////////// Units /////////////////

    { path: '/product-units', component: () => import('@/views/units/index.vue') },

    // Accounts

    {
      path: '/accounts-to-link',
      component: () => import('@/views/accounts/AccountToLink.vue')
    },

    { path: '/accounts-links', component: () => import('@/views/accounts/AccountsTypes.vue') },

    {
      path: '/accounts-type',
      component: () => import('@/views/accounts/AccountsLinkTypes.vue')
    },

    { path: '/accounts-tree', component: () => import('@/views/accounts/ViewTree.vue') },

    // Permissions

    { path: '/permissions', component: () => import('@/views/permissions/index.vue') },

    // Sections
    { path: '/sections', component: () => import('@/views/sections/index.vue') },

    // Translations

    { path: '/translations', component: () => import('@/views/translations/index.vue') },

    //////////////////////// Bonds /////////////////////

    { path: '/accounting-restrictions', component: () => import('@/views/bonds/Bonds.vue') },
    { path: '/accounting-restrictions/add', component: () => import('@/views/bonds/AddBonds.vue') },
    {
      path: '/accounting-restrictions/edit/:id',
      component: () => import('@/views/bonds/EditBonds.vue')
    },

    //////////////////////// OpeningBalance ///////////////////

    {
      path: '/accounting-restrictions/addBalance',
      component: () => import('@/views/balances/OpeningBalance.vue')
    },

    {
      path: '/accounting-restrictions/addBalanceAdditional',
      component: () => import('@/components/sections/OpeningBalanceAddTwo.vue')
    },

    // languages

    { path: '/languages', component: () => import('@/views/languages/index.vue') },

    {
      path: '/stock_initial_balance',
      component: () => import('@/components/sections/OpeningInventoryBalance.vue')
    },

    {
      path: '/accounting_initial_balance',
      component: () => import('@/components/sections/OpeningBalanceReport.vue')
    },

    // edit inital balance

    {
      path: '/accounting_initial_balance/edit/:id',
      component: () => import('@/components/sections/OpeningBalanceReportEdit.vue')
    },

    {
      path: '/accounting_initial_balance/show/:id',
      component: () => import('@/components/sections/OpeningBalanceShow.vue'),
      params: true
    }
  ]
})

export default router
