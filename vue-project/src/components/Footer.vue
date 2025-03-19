<template>
    <footer class="bg-dark footer">
        <div class=" footer">
            <div >
                <!--Logo und Beschreibung-->
                <div>
                    <h5 class="title">UniPlace</h5>
                    <p class="white center">
                        be part of our community!
                    </p>
                </div>
                <!--Navigation-->
                <div class="col-md-4">
                    <h5 class="fw-bold">Navigation</h5>
                    <ul class="list-unstyled">
                        <li><RouterLink to="/" class="text-decoration-none white">Home</RouterLink></li>
                        <li><RouterLink to="/about" class="text-decoration-none white">About Us</RouterLink></li>
                        <li><RouterLink to="/faq" class="text-decoration-none white">Fast FAQ</RouterLink></li>
                        <li><RouterLink to="/market" class="text-decoration-none white">Market</RouterLink></li>
                    </ul>
                </div>
                <!--Copyright-->
                <div class="text-center mt-4 border-top pt-3">
                    <p class="text-secondary">© {{ currentYear }} UniPlace</p>
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.footer {
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: white;
    position: relative;
}
/* Zentriert den Text */
.center {
    text-align: center;
}
/* Logo */
.logo img {
    height: 30px;
    width: 30px;
}
/* white Font */
.white {
    color: white;
}
/* title */
.title {
    font-size: 2rem; /* Matches "text-2xl" in Tailwind */
    font-weight: bold;
    text-align: center;
    background: linear-gradient(to right, #22d3ee, #9333ea); /* Gradient from Blue to Lila */
    -webkit-background-clip: text; /* Background-clip für den Text */
    color: transparent; /* Use a transparent text effect to show the background behind it */
}
/*a {
    transition: color 0.3s;
}
a:hover {
    color: #f8f9fa !important;
}
*/
</style>