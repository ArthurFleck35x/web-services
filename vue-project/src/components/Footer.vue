<template>
    <footer class="bg-dark text-white text-center p-4">
        <div class="container">
            <div class="row">
                <!--Logo und Beschreibung-->
                <div>
                    <h5 class="title">UniPlace</h5>
                    <p class="text-secondary">
                        be part of our community!
                    </p>
                </div>
                <!--Navigation-->
                <div class="col-md-4">
                    <h5 class="fw-bold">Navigation</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-secondary text-decoration-none">Home</a></li>
                        <li><a href="#" class="text-secondary text-decoration-none">About Us</a></li>
                        <li><a href="#" class="text-secondary text-decoration-none">Fast FAQ</a></li>
                        <li><a href="#" class="text-secondary text-decoration-none">Kontakt</a></li>
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
/* Logo */
.logo img {
    height: 30px;
    width: 30px;
}
.title {
    font-size: 1.5rem; /* Entspricht "text-2xl" in Tailwind */
    font-weight: bold;
    background: linear-gradient(to right, #22d3ee, #9333ea); /* Farbverlauf von Cyan nach Lila */
    -webkit-background-clip: text; /* Hintergrundclip für den Text */
    color: transparent; /* Text transparent machen, damit der Hintergrund sichtbar wird */
}
/*a {
    transition: color 0.3s;
}
a:hover {
    color: #f8f9fa !important;
}
*/
</style>