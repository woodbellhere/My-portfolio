<template>
  <div>
    <h1>woodbell here</h1>
    <div>
      <!-- <router-link replace to="/">Login</router-link> -->
      <!-- <router-link replace to="/">Login</router-link> -->
      <!-- <router-link replace to="/register">Register</router-link> -->
      <!-- <router-link replace to="/register">Register</router-link> -->
      <!-- <button @click="toPage('/')">Login</button> -->
      <!-- <button @click="toPage('/register')">Register</button> -->
      <!-- <button @click="next()">next</button> -->
      <!-- <button @click="pre()">pre</button> -->
    </div>
    <hr />
    <!-- <router-link to="/">Login</router-link> -->
    <!-- <router-link :to="{ name: 'login' }">Login</router-link> -->
    <!-- <router-link to="/register">Register</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const toPage = (url: string) => {
  router.push(url);
  // router.push({
  //   name: url,
  // });
};

const next = () => {
  router.go(1);
};
const pre = () => {
  // router.go(-1);
  router.back();
};
</script>

<style scoped>
router-link {
  margin-right: 10px;
}
</style>
