<template>
  <div>
    <div class="col-sm-12 text-center">
      <nav aria-label="Page navigation center-block" style="margin-top: 20px; direction: ltr">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a
              class="page-link"
              @click.prevent="$emit('goToFirst', first_page_url)"
              :class="prev_page_url === '' ? 'disabledClass' : ''"
              href="#"
              tabindex="-1"
            >
              <i class="bi bi-chevron-double-left"></i>
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              :class="current_page === 1 ? 'disabledClass' : ''"
              @click.prevent="$emit('goToPrev', prev_page_url)"
              href="#"
              tabindex="-1"
            >
              <i class="bi bi-chevron-left"></i>
            </a>
          </li>
          <li class="page-item active disabled">
            <a class="page-link" @click.prevent="javascript" href="#">{{ current_page }}</a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              :class="current_page === last_page ? 'disabledClass' : ''"
              @click.prevent="$emit('goToNext', next_page_url)"
              href="#"
            >
              <i class="bi bi-chevron-right"></i>
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link disabled"
              @click.prevent="$emit('goToLast', last_page_url)"
              :class="next_page_url === '' ? 'disabledClass' : ''"
              href="#"
            >
              <i class="bi bi-chevron-double-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div
      v-if="items.length > 0"
      class="col-sm-12 text-center"
      :style="{ direction: language == 'en' ? 'ltr' : 'rtl' }"
    >
      <span> {{ trans('total_search_results') }} : {{ total }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: [
    'items',
    'paginate',
    'filters',
    'language',
    'first_page_url',
    'last_page_url',
    'prev_page_url',
    'next_page_url',
    'prev_page',
    'current_page',
    'last_page',
    'total'
  ],

  methods: {}
}
</script>

<style>
.disabledClass {
  pointer-events: none;
}
</style>
