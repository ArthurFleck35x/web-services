<template>
    <footer class="bg-dark text-white text-center p-4">
        <div class="container">
            <div class="row">
                <!--Logo und Beschreibung-->
                <div>
                    <h5 class="fw-bold">Mein Unternehmen</h5>
                    <p class="text-secondary">
                        Werde Teil unserer Community!
                    </p>
                </div>
                <!--Navigation-->
                <div class="col-md-4">
                    <h5 class="fw-bold">Navigation</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-secondary text-decoration-none">Startseite</a></li>
                        <li><a href="#" class="text-secondary text-decoration-none">Über uns</a></li>
                        <li><a href="#" class="text-secondary text-decoration-none">Leistungen</a></li>
                        <li><a href="#" class="text-secondary text-decoration-none">Kontakt</a></li>
                    </ul>
                </div>
                <!--Copyright-->
                <div class="text-center mt-4 border-top pt-3">
                    <p class="text-secondary">© {{ currentYear }} UniMarket</p>
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
a {
    transition: color 0.3s;
}
a:hover {
    color: #f8f9fa !important;
}
</style>