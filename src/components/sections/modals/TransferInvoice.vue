<template>
  <div class="transfer_invoice">
    <!-- Printed Report -->
    <div id="TransferInvoice" class="d-none">
      <!-- company info -->
      <b-row
        style="border-radius: 8px !important; padding: 8px !important"
        :style="{
          direction: language == 'en' ? 'ltr' : 'rtl',
          textAlign: language == 'en' ? 'left' : 'right',
        }"
        class="mx-0 mb-3 justify-content-between row_box"
      >
        <div class="col p-0" style="text-align: right">
          <div class="col-auto p-0">
            <div
              class="right_header_parent"
              style="font-family: 'BahijTheSansArabic-Light' !important"
            >
              <h1 class="title" style="color: #353f4d; margin-bottom: 5px">
                <strong>
                  {{ getSetting('company_name') }}
                </strong>
              </h1>

              <h1 class="title" style="color: #353f4d; margin-bottom: 10px">
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ trans('phone') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ getSetting('company_phone') }}</span
                >
              </h1>
            </div>
          </div>
        </div>
        <div class="col p-0" style="text-align: center">
          <div style="width: 120px; margin: auto">
            <img
              style="width: 100%; height: 100%; object-fit: cover"
              :src="
                getSetting('logo')
                  ? getSetting('logo')
                  : getSetting('default_image')
              "
            />
          </div>
          <h3
            style="
              text-align: center;
              line-height: 22.81px;
              color: #070707;
              font-size: 20px;

              font-weight: 700;
              border: 2px solid #48aac4;
              width: fit-content;
              margin: 20px auto;
              padding: 13px;
              font-family: BahijTheSansArabic-Light !important;
            "
          >
            {{ trans('store_transfer') }}
          </h3>
        </div>
        <div class="col p-0" style="text-align: left">
          <div class="right_header_parent">
            <h1 class="title" style="color: #353f4d; margin-bottom: 15px">
              <strong>
                {{ getSettingLang('company_name') }}
              </strong>
            </h1>
          </div>

          <p
            class="paragraph_header_bottom"
            style="color: #353f4d; margin-bottom: 10px"
          >
            <span
              style="
                font-size: 15.07px;
                font-weight: 500;
                color: #000;
                line-height: 18.64px;
                font-family: BahijTheSansArabic-Light !important;
              "
              >Phone :
            </span>
            <span
              style="
                font-size: 15.07px;
                font-weight: 500;
                color: #000;
                line-height: 18.64px;
                font-family: BahijTheSansArabic-Light !important;
              "
              >{{ getSetting('company_phone') }}</span
            >
          </p>
        </div>
      </b-row>

      <!-- Transfer Details -->
      <b-row
        :style="{
          direction: language == 'en' ? 'ltr' : 'rtl',
        }"
        class="row"
        style="
      
    align-items:center
    margin-bottom: 20px;
     margin:10px 0 20px;
    border-top: 2px solid  #DCDCDC;
 !important;
    border-bottom: 2px solid #DCDCDC !important;
  padding: 8px !important;
"
      >
        <div
          class="col col-3"
          style="
            height: 80px;
            border-left: 2px solid #dcdcdc;
            display: flex;
            padding-top: 10px;
            flex-direction: column;
          "
        >
          <div class="d-flex">
            <span>{{ trans('added_by') }} :</span>
            <span>{{ created_by.name }}</span>
          </div>
        </div>

        <div class="col col-9" style="padding-top: 0">
          <!-- Start:: movement -->

          <div class="movement">
            <b-row>
              <div
                cols="12"
                class="col col-4 d-flex"
                style="
                  border-left: 1px solid #9a9a9a;
                  margin-bottom: 20px !important;
                "
              >
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ trans('movement') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ id }}</span
                >
              </div>

              <div
                cols="12"
                class="col col-4 d-flex"
                style="
                  border-left: 1px solid #9a9a9a;
                  margin-bottom: 20px !important;
                "
              >
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ trans('request_date') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ created_at }}</span
                >
              </div>

              <div cols="12" class="col col-4 d-flex" style="border: none">
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ trans('from_inventory') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ from_inventory.title }}</span
                >
              </div>
            </b-row>
          </div>

          <!-- Start::description -->
          <div class="desc">
            <b-row>
              <div class="col col-8" style="text-align: start">
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ trans('description') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ note }}</span
                >
              </div>
              <div
                class="col col-4"
                style="text-align: start; padding-right: 0"
              >
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                    margin-right: 12px;
                  "
                  >{{ trans('to_inventory') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ to_inventory.title }}</span
                >
              </div>
            </b-row>
          </div>
        </div>
      </b-row>

      <!-- Tabel Data -->

      <div
        class="row justify-content-end m-0"
        style="
          margin-bottom: 100px !important;
          border-top-left-radius: 9px !important;
          border-top-right-radius: 9px !important;
        "
      >
        <div
          class="col-12"
          style="
            background: #f2f2f2;
            border-top-left-radius: 9px !important;
            border-top-right-radius: 9px !important;
            align-items: center;
            justify-content: center;
            height: 60px;
            padding-top: 19px;
          "
        >
          <div
            class="row table_div_body"
            style="
              font-family: 'BahijTheSansArabic-Bold' !important;
              align-items: center;
              text-align: center;
              padding: 5px 0;
            "
          >
            <div class="table_header_div_chlid" style="width: 70px">
              {{ trans('number') }}
            </div>
            <div class="table_header_div_chlid" style="width: 140px">
              {{ trans('barcode') }}
            </div>
            <div class="table_header_div_chlid" style="width: 140px">
              {{ trans('product') }}
            </div>

            <div class="table_header_div_chlid" style="width: 140px">
              {{ trans('unit or bottle') }}
            </div>
            <div class="table_header_div_chlid" style="width: 140px">
              {{ trans('quantity') }}
            </div>
            <div class="table_header_div_chlid" style="width: 140px">
              {{ trans('note') }}
            </div>
          </div>
        </div>
        <div class="col-12">
          <div
            style="
              align-items: center;
              text-align: center !important;
              height: 80px;
              background: transparent;
              border-bottom: 1px solid #d1d3d3;
            "
            v-for="(item, index) in items"
            :key="index"
            class="row table_div_body"
          >
            <div class="" style="width: 70px">
              {{ index + 1 }}
            </div>
            <div
              class="table_header_div_chlid"
              style="width: 140px; text-align: center"
            >
              {{ spliceText(item.product.serial, '10') }}
            </div>
            <div
              class="table_header_div_chlid"
              style="width: 140px; text-align: center"
            >
              {{ spliceText(item.product.title, '10') }}
            </div>

            <div class="table_header_div_chlid" style="width: 140px">
              {{ item.product.unit.title }}
            </div>
            <div class="" style="width: 140px">
              {{ item.quantity }}
            </div>
            <div class="" style="width: 140px">
              {{ item.note }}
            </div>
          </div>
        </div>
      </div>

      <!-- Total -->
      <div
        class="row align-items-center justify-content-center"
        style="
          justify-content: center !important;
          align-items: center;

          border-top: 1px solid #d1d3d3;
          border-bottom: 1px solid #d1d3d3;
          padding: 8px 0 !important;
        "
      >
        <div
          class="col-6"
          style="margin: 15px 0 !important; text-align: center"
        >
          <span style="font-weight: 700">{{ trans('items_no') }}</span>
          <span
            style="
              font-weight: 700;
              border: 2px solid #48aac4;
              padding: 3px 6px;
              margin: 0 10px;
            "
            >{{ items.length }}</span
          >
        </div>
        <div
          class="col-6"
          style="margin: 15px 0 !important; text-align: center"
        >
          <span style="font-weight: 700">{{ trans('total amount') }}</span>
          <span
            style="
              font-weight: 700;
              border: 2px solid #48aac4;
              padding: 3px 6px;
              margin: 0 10px;
            "
            >{{ calcQty }}</span
          >
        </div>
      </div>

      <!-- Start:: Signature -->
      <b-row
        :style="{
          direction: language == 'en' ? 'ltr' : 'rtl',
          textAlign: language == 'en' ? 'left' : 'right',
        }"
        class="justify-content-around invoice-footer"
        style="
          margin: 30px 0 40px !important;
          justify-content: center;
          font: normal normal 17px Tahoma;
          color: #353f4d;
        "
      >
        <b-col style="text-align: center">
          <p>{{ trans('Recipient signature') }} :</p>
        </b-col>
        <b-col style="text-align: center">
          <p>{{ trans('accepted_from') }} :</p>
        </b-col>
        <b-col style="text-align: center">
          <p>{{ trans('Recipient signature') }} :</p>
        </b-col>
        <b-col style="text-align: center">
          <p>{{ trans('notes') }} :</p>
        </b-col>
      </b-row>

      <!-- Start:: info -->
      <b-row
        style="
          border-top: 0.54px solid #d1d3d3;
          isplay: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          margin: 20px 0;
          padding: 20px 0;
        "
      >
        <div>
          <span
            ><img
              style="width: 17px; margin: 0 5px"
              src="@/assets/images/phone.svg"
          /></span>
          <span>{{ getSetting('company_phone') }}</span>
        </div>
        <div>
          <span
            ><img
              style="width: 17px; margin: 0 5px"
              src="@/assets/images/blueEmail.svg"
          /></span>
          <!-- <span>{{ getSetting('website') }}</span> -->
          <span>www.7lsoft.com</span>
        </div>
        <div>
          <span
            ><img
              style="width: 17px; margin: 0 5px"
              src="@/assets/images/location.svg"
          /></span>
          <span>{{ getSetting('company_address') }}</span>
        </div>
      </b-row>
    </div>

    <!-- Shown Report -->
    <div>
      <!-- company info -->
      <b-row
        style="border-radius: 8px !important; padding: 8px !important"
        :style="{
          direction: language == 'en' ? 'ltr' : 'rtl',
          textAlign: language == 'en' ? 'left' : 'right',
        }"
        class="mx-0 mb-3 justify-content-between row_box"
      >
        <div class="col p-0" style="text-align: right">
          <div class="col-auto p-0">
            <div class="right_header_parent">
              <h1 class="title" style="color: #353f4d; margin-bottom: 15px">
                <strong>
                  {{ getSetting('company_name') }}
                </strong>
              </h1>
              <div style="display: flex; column-gap: 5px"></div>

              <h1 class="title" style="color: #353f4d; margin-bottom: 10px">
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ trans('phone') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ getSetting('company_phone') }}</span
                >
              </h1>
            </div>
          </div>
        </div>
        <div class="col p-0" style="text-align: center">
          <div style="width: 120px; margin: auto">
            <img
              style="width: 100%; height: 100%; object-fit: cover"
              :src="
                getSetting('logo')
                  ? getSetting('logo')
                  : getSetting('default_image')
              "
            />
          </div>
          <h3
            style="
              text-align: center;
              line-height: 22.81px;
              color: #070707;
              font-size: 13.95px;

              font-weight: 500;
              border: 2px solid #48aac4;
              width: fit-content;
              margin: 20px auto;
              padding: 13px;
              font-family: BahijTheSansArabic-Light !important;
            "
          >
            {{ trans('store_transfer') }}
          </h3>
        </div>
        <div class="col p-0" style="text-align: left">
          <div class="right_header_parent">
            <h1
              class="title"
              style="color: #353f4d; margin-bottom: 15px; font-size: 20px"
            >
              <strong>
                {{ getSettingLang('company_name') }}
              </strong>
            </h1>
          </div>

          <p
            class="paragraph_header_bottom"
            style="color: #353f4d; margin-bottom: 10px"
          >
            <span
              style="
                font-size: 15.07px;
                font-weight: 500;
                color: #000;
                line-height: 18.64px;
                font-family: BahijTheSansArabic-Light !important;
              "
              >Phone :
            </span>
            <span
              style="
                font-size: 15.07px;
                font-weight: 500;
                color: #000;
                line-height: 18.64px;
                font-family: BahijTheSansArabic-Light !important;
              "
              >{{ getSetting('company_phone') }}</span
            >
          </p>
        </div>
      </b-row>

      <!-- Transfer Details -->
      <b-row
        :style="{
          direction: language == 'en' ? 'ltr' : 'rtl',
        }"
        class="row"
        style="
      
    align-items:center
    margin-bottom: 20px;
     margin:10px 0 20px;
    border-top: 2px solid  #DCDCDC;
 !important;
    border-bottom: 2px solid #DCDCDC !important;
  padding: 8px !important;
"
      >
        <div
          class="col col-3"
          style="
            height: 80px;
            border-left: 2px solid #dcdcdc;
            display: flex;

            flex-direction: column;
          "
        >
          <div class="d-flex">
            <span>{{ trans('added_by') }} :</span>
            <span>{{ created_by.name }}</span>
          </div>
        </div>

        <div class="col col-9" style="padding-top: 13px">
          <!-- Start:: movement -->

          <div class="movement">
            <b-row>
              <div
                cols="12"
                class="col col-4 d-flex"
                style="border-left: 1px solid #9a9a9a; padding-top: 8px"
              >
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ trans('movement') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ id }}</span
                >
              </div>
              <div
                cols="12"
                class="col col-4 d-flex"
                style="border-left: 1px solid #9a9a9a; padding-top: 8px"
              >
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ trans('request_date') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ created_at }}</span
                >
              </div>
              <div
                cols="12"
                class="col col-4 d-flex"
                style="border: none; padding-top: 8px"
              >
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ trans('from_inventory') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ from_inventory.title }}</span
                >
              </div>
            </b-row>
          </div>

          <!-- Start::desc -->
          <div class="desc">
            <b-row>
              <div class="col col-8" style="text-align: start">
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ trans('description') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ note }}</span
                >
              </div>
              <div
                class="col col-4"
                style="text-align: start; padding-right: 0"
              >
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                    margin-right: 12px;
                  "
                  >{{ trans('to_inventory') }} :
                </span>
                <span
                  style="
                    font-size: 15.07px;
                    font-weight: 500;
                    color: #000;
                    line-height: 18.64px;
                    font-family: BahijTheSansArabic-Light !important;
                  "
                  >{{ to_inventory.title }}</span
                >
              </div>
            </b-row>
          </div>
        </div>
      </b-row>

      <!-- Tabel Data -->

      <div
        class="row justify-content-end m-0"
        style="
          margin-bottom: 100px !important;
          border-top-left-radius: 9px !important;
          border-top-right-radius: 9px !important;
        "
      >
        <div
          class="col-12"
          style="
            background: #f2f2f2;
            border-top-left-radius: 9px !important;
            border-top-right-radius: 9px !important;
            align-items: center;
            justify-content: center;
            height: 60px;
            padding-top: 19px;
          "
        >
          <div
            class="row table_div_body"
            style="
              font-family: 'BahijTheSansArabic-Bold' !important;
              align-items: center;
              text-align: center;
              padding: 5px 0;
            "
          >
            <div class="table_header_div_chlid" style="width: 70px">
              {{ trans('number') }}
            </div>
            <div class="table_header_div_chlid" style="width: 200px">
              {{ trans('barcode') }}
            </div>
            <div class="table_header_div_chlid" style="width: 200px">
              {{ trans('product') }}
            </div>
       
            <div class="table_header_div_chlid" style="width: 200px">
              {{ trans('unit or bottle') }}
            </div>
            <div class="table_header_div_chlid" style="width: 200px">
              {{ trans('quantity') }}
            </div>
            <div class="table_header_div_chlid" style="width: 200px">
              {{ trans('note') }}
            </div>
          </div>
        </div>
        <div class="col-12">
          <div
            style="
              align-items: center;
              text-align: center !important;
              height: 80px;
              background: transparent;
              border-bottom: 1px solid #d1d3d3;
            "
            v-for="(item, index) in items"
            :key="index"
            class="row table_div_body"
          >
            <div class="" style="width: 70px">
              {{ index + 1 }}
            </div>
            <div
              class="table_header_div_chlid"
              style="width: 200px; text-align: center"
            >
              {{ spliceText(item.product.serial, '10') }}
            </div>
            <div
              class="table_header_div_chlid"
              style="width: 200px; text-align: center"
            >
              {{ spliceText(item.product.title, '10') }}
            </div>
        

            <div class="table_header_div_chlid" style="width: 200px">
              {{ item.product.unit.title }}
            </div>
            <div class="" style="width: 200px">
              {{ item.quantity }}
            </div>
            <div class="" style="width: 200px">
              {{ item.note }}
            </div>
          </div>
        </div>
      </div>

      <!-- Total -->
      <b-row
        class="row align-items-center justify-content-center"
        style="
        justify-content:center;
    align-items:center
    margin-bottom: 20px;
     margin:10px 0 20px;
    border-top: 2px solid  #DCDCDC;
 !important;
    border-bottom: 2px solid #DCDCDC !important;
  padding:8px 0 !important;
"
      >
        <div class="col col-6">
          <span style="font-weight: 700">{{ trans('items_no') }}</span>
          <span
            style="
              font-weight: 700;
              border: 2px solid #48aac4;
              padding: 3px 6px;
              margin: 0 10px;
            "
            >{{ items.length }}</span
          >
        </div>
        <div class="col col-6">
          <span style="font-weight: 700">{{ trans('total amount') }}</span>
          <span
            style="
              font-weight: 700;
              border: 2px solid #48aac4;
              padding: 3px 6px;
              margin: 0 10px;
            "
            >{{ calcQty }}</span
          >
        </div>
      </b-row>

      <!-- Start:: Signature -->
      <b-row
        :style="{
          direction: language == 'en' ? 'ltr' : 'rtl',
          textAlign: language == 'en' ? 'left' : 'right',
        }"
        class="justify-content-around invoice-footer"
        style="
          margin-top: 0px;
          justify-content: center;
          font: normal normal 17px Tahoma;
          color: #353f4d;
        "
      >
        <b-col style="text-align: center">
          <p>{{ trans('Recipient signature') }} :</p>
        </b-col>
        <b-col style="text-align: center">
          <p>{{ trans('accepted_from') }} :</p>
        </b-col>
        <b-col style="text-align: center">
          <p>{{ trans('Recipient signature') }} :</p>
        </b-col>
        <b-col style="text-align: center">
          <p>{{ trans('notes') }} :</p>
        </b-col>
      </b-row>

      <!-- Start:: info -->
      <b-row
        style="
          border-top: 0.54px solid #d1d3d3;
          isplay: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          margin: 20px 0;
          padding: 20px 0;
        "
      >
        <div>
          <span
            ><img
              style="width: 17px; margin: 0 5px"
              src="@/assets/images/phone.svg"
          /></span>
          <span>{{ getSetting('company_phone') }}</span>
        </div>
        <div>
          <span
            ><img
              style="width: 17px; margin: 0 5px"
              src="@/assets/images/blueEmail.svg"
          /></span>
          <!-- <span>{{ getSetting('website') }}</span> -->
          <span>www.7lsoft.com</span>
        </div>
        <div>
          <span
            ><img
              style="width: 17px; margin: 0 5px"
              src="@/assets/images/location.svg"
          /></span>
          <span>{{ getSetting('company_address') }}</span>
        </div>
      </b-row>
    </div>
    <!-- Start:: print button -->

    <div class="col-12 text-center invoice-btns">
      <b-button
        class="m-2"
        style="
          background: #137b97 0% 0% no-repeat padding-box;
          border-radius: 50px;
          font: normal normal 300 14px/11px Tahoma;
          letter-spacing: 0px;
          color: #ffffff;
          padding: 15px 50px;
        "
        type="submit"
        @click="printTransferReceipt"
      >
        {{ trans('print') }}
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'id',
    'items',
    'products',
    'settings',
    'language',
    'inventory_transfer',
    'created_at',
    'created_by',
    'note',
    'to_inventory',
    'from_inventory',
  ],

  data() {
    return {
      cssText: `
                            @media print {
* {
  direction:rtl;
            overflow: visible !important;
            margin: 0;
            padding: 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            outline: none;
            text-transform: none;
            text-decoration: none;
        }
            @page {
        margin:5px;
    }
    body {
        padding-top: 10px;
        padding-bottom: 10px ;
    }

        .container {
            width: auto;
            min-width: unset !important;
        }

        .w-100 {
            width: 100% !important;
        }
        .m-0 {
            margin: 0 !important;
        }
        .pl-3, .px-3 {
            padding-left: 1rem !important;
        }
        .pr-3, .px-3 {
            padding-right: 1rem !important;
        }
        .pb-2, .py-2 {
            padding-bottom: 0.5rem !important;
        }
        .pt-2, .py-2 {
            padding-top: 0.5rem !important;
        }
        .d-flex{
          dispaly:flex;
        }
        .align-items-center {
            align-items: center;
        }
        .justify-content-center{
          justify-content:center !important;
        }
        .justify-content-between {
            justify-content: space-between !important;
        }
        .justify-content-around {
            justify-content: space-around !important;
        }
        .justify-content-end {
            justify-content: flex-end !important;
        }
        .row {
            display: -webkit-box;
            display: flex;
            flex-wrap: wrap;
            margin-left: -15px;
            margin-right: -15px;
        }
        .col {
            flex-basis: 0;
            -webkit-box-flex: 1;
            flex-grow: 1;
            max-width: 100%;
            padding: 0 15px;
        }
        .col-4 {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
        }
        .col-3{
          flex: 0 0 20%;
            max-width: 20%;
        }
        .col-9{
          flex: 0 0 80%;
            max-width: 80%;
        }

        .col-sm-12 {
            -webkit-box-flex: 0;
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 15px;
        }
        .col-12 {
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 15px;
        }
        .col-6 {
            flex: 0 0 50%;
            max-width: 50%;
            padding: 0 15px;
        }
        .total_css{
            display:flex;
            justify-content: space-between;
            text-align:center;
        }
        .col-auto {
            flex: 0 0 auto;
            width: auto;
            max-width: 100%;
            padding: 0 15px;
        }


        .mb-3, .my-3 {
            margin-bottom: 1rem !important;
        }
        .mx-0 {
            margin: 0;
        }
                            }
                        `,
    }
  },
  mounted() {},
  computed: {
    calcQty() {
      let totalQuantity = 0
      this.items.map(el => {
        totalQuantity += el['quantity']
      })
      return totalQuantity
    },
  },
  methods: {
    printTransferReceipt() {
      this.printMe('#TransferInvoice', this.cssText)
    },
    getTitleById(serial) {
      const record = this.products.find(el => el.serial === serial)

      return record.unit.title
    },
    getSetting(key) {
      const result = this.settings.find(el => {
        if (el.key == key) {
          return el.value
        }
      })
      return result.value
    },
    getSettingLang(key) {
      const result = this.settings.find(el => {
        if (el.key == key) {
          return el.translation.translated_value['en']
        }
      })

      return result.translation.translated_value['en']
    },
    spliceText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength)
      } else {
        return text
      }
    },
  },
}
</script>

<style>
.transfer_invoice {
  font-family: BahijTheSansArabic-Light !important;
}

.transfer_invoice #modal-xl___BV_modal_body_ {
  padding: 0 !important;
}

#modal-xl___BV_modal_title_ {
  display: none !important;
}

.transfer_invoice span {
  font-size: 15.07px;
  font-weight: 500;
  color: #000;
  line-height: 18.64px;
  font-family: BahijTheSansArabic-Light !important;
}

.movement .col {
  border-left: 1px solid #9a9a9a;
  padding-top: 8px;
}

#modal-xl___BV_modal_footer_ {
  display: none;
}
</style>
