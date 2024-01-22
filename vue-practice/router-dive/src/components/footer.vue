<template>
  <div>
    <router-view></router-view>
    <hr />
    <h1>this is father route</h1>
    <router-link to="/">Login</router-link>
    <router-link to="/register">register</router-link>
  </div>
</template>

<script setup></script>

<style scoped></style>
