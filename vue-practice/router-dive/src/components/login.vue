<template>
  <div class="login">Login</div>
  <div>this is list page</div>
  <table cellspacing="0" class="table" border="1">
    <thead>
      <tr>
        <th>brand</th>
        <th>price</th>
        <th>operation</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="item.id" v-for="item in data">
        <th>{{ item.name }}</th>
        <th>{{ item.price }}</th>
        <th>
          <!-- <button @click="toDetail(item)">details</button> -->
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
// import { data } from "./list.json";
import { useRouter } from "vue-router";
const router = useRouter();

type Item = {
  name: string;
  price: number;
  id: number;
};

const toDetail = (item: Item) => {
  router.push({
    name: "register",
    // query: item,
    params: item,
    // params: {
    //   id: item.id,
    // },
  });
};
</script>

<style scoped>
.login {
  background-color: red;
  height: 400px;
  width: 400px;
  font-size: 20px;
  color: white;
}
</style>
