<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';

    const isSticky = ref(false);

    // Funktion, um Scroll-Status zu überprüfen
    const handleScroll = () => {
        isSticky.value = window.scrollY > 50; // Aktiviert "sticky", wenn mehr als 50px gescrollt
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>

<template>
    <div class="background">
        <div :class="['search-container', { sticky: isSticky }]">
            <input type="text" placeholder="Suche..." class="search-input" />
        </div>
    </div>
</template>

<style scoped>
/* 🔹 Der Hintergrund soll den kompletten Bildschirm füllen */
.background {
    background-image: url('@/assets/tisch.jpg');
    width: 100%;
    height: 100svh;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

/* 🔹 Standard: Searchbar in der Mitte */
.search-container {
    position: absolute;
    top: 50%; /* Mitte */
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    max-width: 600px;
    padding: 12px;
    background: white;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
}

/* 🔹 Sticky-Style: Sobald gescrollt wird */
.search-container.sticky {
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    max-width: 600px;
    border-radius: 0;
    padding: 15px;
    z-index: 1000;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
}

/* 🔹 Suchfeld-Styling */
.search-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    outline: none;
}
</style>