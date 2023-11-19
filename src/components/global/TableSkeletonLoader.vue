<template>
  <b-tbody style="height: 100%">
    <b-tr v-for="item in items" :key="item.id">
      <b-td v-for="i in length" :key="i">
        <b-skeleton
          animation="wave"
          height="30px"
          width="100%"
          style="border-raduis: 15px"
        ></b-skeleton>
      </b-td>
    </b-tr>
  </b-tbody>
</template>

<script>
export default {
  props: ['items', 'length']
}
</script>

<style></style>
