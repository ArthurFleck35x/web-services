<template>
    <nav class="navbar bg-dark">
      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/logo.svg" alt="Logo" />
      </div>
  
      <!-- Titel -->
      <h1 class="title">UniPlace</h1>
  
      <!-- Menü -->
      <div class="menu">
        <button class="menu-button" @click="toggleMenu">
          ☰
        </button>
  
        <!-- Dropdown -->
        <div v-show="menuOpen" class="dropdown">
          <ul>
            <li @click="closeMenu"><RouterLink to="/" >Home</RouterLink></li>
            <li @click="closeMenu"><RouterLink to="/about">About</RouterLink></li>
            <li @click="closeMenu"><RouterLink to="/market">Market</RouterLink></li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
<script>
    export default {
        data() {
            return {
                menuOpen: false
            };
        },
        methods: {
            toggleMenu() {
                this.menuOpen = !this.menuOpen;
            },
            closeMenu() {
                this.menuOpen = false;
            }
        }
    };
    import { RouterLink } from 'vue-router';
</script>

<style scoped>
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
</style>
