<script setup>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="NavBar">
    <NavBar></NavBar>
  </div>
  
  <div class="top"><RouterView/></div>
  
  <div class="Footer">
    <Footer></Footer>
  </div>
</template>

<style scoped>

.NavBar {
  width: 100%;
  position: fixed;
  z-index: 1000;
}
.Footer {
  width: 100%;
}
.top{
  margin-top: 70px;
}
/* Burger-Menü Button */
.menu-button {
    font-size: 1.8rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    display: block; /* Immer sichtbar */
}
</style>