
<template>
    <div v-if="isPopupVisible" class="popUp">
        <div>Hallo</div>
        <button @click="closePupUp()">Close</button>
    </div>
    <div class="bg-special">
        <div class="product-item" v-for="product in products">
            <p class="product-field"><strong>Produkt:</strong> {{ product.name }}</p>
            <p class="product-field"><strong>Preis:</strong> {{ product.price * currencyRate}}€</p>
            <p class="product-field"><strong>Anzahl:</strong> {{ product.quantity }}</p>
            <button class="detailButton" @click="getDetails(product.id)">Details</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getCurrencyRate } from '@/RESTjs/REST';

var certainProduct;

var currencyRate;

var isPopupVisible = false;

const products = ref([
  {id: 1, name: "Laptop", price: 1200, quantity: 5 },
  {id: 2, name: "Handy", price: 800, quantity: 10 },
  {id: 3, name: "Kopfhörer", price: 150, quantity: 20 }
]);

function getDetails(id){
    certainProduct = products.value.find(product => product.id == id);
    isPopupVisible = true;
}

function closePupUp(){
    isPopupVisible = false;
}

onMounted(()=>{
    currencyRate = getCurrencyRate();
})

</script>

<style scoped>
/* Für den Spezialhintergrund */
.bg-special {
    background: linear-gradient(to left, #5cbbca,#c59bec); /* Indigo to Blue-green */
    color: white;
    width: 100%;
    padding: 1rem;
}

.product-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 5px;
  border-radius: 15px;
  text-align: center;
  background-color: #f9f9f9;
  width: 90%;
  margin-left: 5%;
}
.product-field {
  margin: 20px 0;
  color: #333;
}

.detailButton{
    color: white;
    background-color: blue;
    padding: 10px 20px; /* Innenabstand */
    border: none; /* Kein Rand */
    border-radius: 5px; /* Abgerundete Ecken */
    cursor: pointer; /* Zeigt Hand-Cursor beim Hover */
}

.popUp{
    position: absolute;
    width: 80%;
    height: 70%;
    margin-top: 80px;
    margin-left: 10%;
    background-color: white;
    color: black;
    text-align: center;
}

</style>