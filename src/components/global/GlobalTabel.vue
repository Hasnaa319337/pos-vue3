<template>
  <b-thead>
    <b-tr class="rounded" variant="dark">
      <th
        style="
          background: #2192ff !important;
          color: #fff !important;
          border: 2px solid #85c3ff;
          font-size: 15px !important;
          height: 20px !important;
          min-height: 16px !important;
          padding: 0 3px !important;
        "
        v-for="col in columns"
        :key="col"
      >
        {{ trans(col) }}
      </th>
    </b-tr>
  </b-thead>
</template>

<script>
export default {
  props: ['columns', 'items'],
  methods: {}
}
</script>

<style></style>
