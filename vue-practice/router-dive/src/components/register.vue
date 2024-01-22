<template>
  <div class="register">register</div>
  <div>this is details page</div>
  <div>brand: {{ route.query.name }}</div>
  <div>price: {{ route.query.price }}</div>
  <div>id: {{ route.query.id }}</div>
  <!-- <div>brand: {{ item?.name }}</div> -->
  <!-- <div>price: {{ item?.price }}</div> -->
  <!-- <div>id: {{ item?.id }}</div> -->
</template>

<script setup lang="ts">
import { data } from "./list.json";
import { useRoute } from "vue-router";
const route = useRoute();
const item = data.find((item) => item.id === Number(route.params.id));
</script>

<style scoped>
.register {
  background-color: green;
  height: 400px;
  width: 400px;
  font-size: 20px;
  color: white;
}
</style>
