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

/* Navbar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*background-color: #2563eb;*/
    padding: 1rem;
    color: white;
    position: relative;
}

/* Logo */
.logo img {
    height: 40px;
    width: 40px;
}

/* Titel */
.title {
    font-size: 2rem; /* Entspricht "text-2xl" in Tailwind */
    font-weight: bold;
    background: linear-gradient(to right, #22d3ee, #9333ea); /* Farbverlauf von Cyan nach Lila */
    -webkit-background-clip: text; /* Hintergrundclip für den Text */
    color: transparent; /* Text transparent machen, damit der Hintergrund sichtbar wird */
}

/*Schrift mittig*/
.fonts {
    text-align: center;
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

/* Dropdown-Menü */
.dropdown {
    position: absolute;
    right: 1rem;
    top: 3.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 150px;
}

/* Dropdown-Text schwarz machen */
.dropdown li {
    color: black;
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s;
    list-style: none;
}

.dropdown li:hover {
    background: #f1f1f1;
}

/* Für den Dark Mode Hintergrund */
.bg-dark {
    background: linear-gradient(to bottom right, #1a202c, #2d3748, #4a5568); /* Dark Gray to Slate */
    color: white;
}

/* Für den Light Mode Hintergrund */
.bg-light {
    background: linear-gradient(to bottom right, #f7fafc, #ffffff, #edf2f7); /* Light Gray to White */
    color: #1a202c;
}
/* Für den Spezialhintergrund */
.bg-special {
    background: linear-gradient(to left, #7ee2f1, #a351f0); /* Indigo to Blue-green */
    color: white;
}
</style>