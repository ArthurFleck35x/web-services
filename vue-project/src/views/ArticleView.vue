
<template>
    <div class="bg-special">
        <div class="product-item" v-for="product in products">
            <p class="product-field"><strong>Produkt:</strong> {{ product.title }}</p>
            <p class="product-field"><strong>Preis:</strong> {{ product.price * currencyRate}}€</p>
            <p class="product-field"><strong>Anzahl:</strong> {{ product.count }}</p>
            <button class="detailButton" @click="getDetails(product.id)">Details</button>
        </div>
    </div>
    <div class="popup-overlay" v-if="isPopupVisible">
        <div  class="popup">
            <h2>Produktdetails</h2>
            <h3><strong>{{ certainProduct.title }}</strong></h3>
            <div class="description-box">
                <p><strong>Beschreibung:</strong></p>
                <p>{{ certainProduct.description }}</p>
            </div>
            <button class="close-button" @click="closePupUp()">Close</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getCurrencyRate,fetchArticles,fetchSearchArticles } from '@/RESTjs/REST';

var certainProduct;

var currencyRate;

var isPopupVisible = ref(false);

const products = ref([]);

function getDetails(id){
    certainProduct = products.value.find(product => product.id == id);
    isPopupVisible.value = true;
}

function closePupUp(){
    isPopupVisible.value = false;
}



onMounted(()=>{
    currencyRate = getCurrencyRate();
    //products.value = fetchArticles();
    fetchSearchArticles("a").then(data=>{
        products.value = data;
        console.log(data);
    });
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

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 25%;
  text-align: center;
  color: black;
}

.close-button {
  margin-top: 10px;
  background: red;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

.description-box {
  border: 2px solid gray;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>