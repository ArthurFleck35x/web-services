
<template>
    <div class="bg-special" :class="{'too-few-products': tooFewProducts.value}">
        <div class="product-item" v-for="product in products">
            <p class="product-field"><strong>Produkt:</strong> {{ product.title }}</p>
            <p class="product-field"><strong>Preis:</strong> {{ product.price * currencyRate}}€</p>
            <p class="product-field"><strong>Anzahl:</strong> {{ product.count }}</p>
            <button class="detailButton" @click="getDetails(product)">Details</button>
        </div>
    </div>
    <div class="popup-overlay" v-if="isPopupVisible">
        <div class="popup">
            <h2>Produktdetails</h2>

            <!-- Editierbare Felder -->
            <div v-if="isEditing">
                <label><strong>Produkt:</strong></label>
                <input v-model="certainProduct.title" type="text" />
                
                <label><strong>Preis:</strong></label>
                <input v-model.number="certainProduct.price" type="number" />
                
                <label><strong>Anzahl:</strong></label>
                <input v-model.number="certainProduct.count" type="number" />
                
                <label><strong>Beschreibung:</strong></label>
                <textarea v-model="certainProduct.description"></textarea>
            </div>

            <!-- Anzeige-Modus -->
            <div v-else>
                <p><strong>Produkt:</strong> {{ certainProduct.title }}</p>
                <p><strong>Preis:</strong> {{ certainProduct.price * currencyRate }}€</p>
                <p><strong>Anzahl:</strong> {{ certainProduct.count }}</p>
                <div class="description-box">
                <p><strong>Beschreibung:</strong></p>
                <p>{{ certainProduct.description }}</p>
                </div>
            </div>

            <!-- Buttons -->
            <div class="popup-buttons">
                <button class="delete-button" @click="deleteProduct(certainProduct.id)">Löschen</button>
                <button class="edit-button" @click="toggleEditMode">{{ isEditing ? 'Speichern' : 'Bearbeiten' }}</button>
                <button class="close-button" @click="closePopup">Schließen</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getCurrencyRate,fetchMyArticles,deleteArticle,updateArticle } from '@/RESTjs/REST';

var certainProduct;

var currencyRate;

const isEditing = ref(false);

var isPopupVisible = ref(false);

var tooFewProducts = ref(false)

const products = ref([]);

function getDetails(product){
    certainProduct = { ...product };
    isPopupVisible.value = true;
    isEditing.value = false;
}

const toggleEditMode = () => {
    if(isEditing){
        if(certainProduct.count>0){
            //updateArticle(certainProduct);
        }else{
            deleteProduct(certainProduct.id);
        }
    }
    isEditing.value = !isEditing.value;
};

const deleteProduct = (id) => {
    products.value = products.value.filter(product => product.id !== id);
    //deleteArticle(id);
    closePopup();
};

function closePopup(){
    isPopupVisible.value = false;
}

function initialiseProducts(){
    fetchMyArticles().then(data=>{
        products.value = data;
    });
}

onMounted(()=>{
    currencyRate = getCurrencyRate();
    //products.value = fetchArticles();
    initialiseProducts();

    if(products.value.length<1){
        tooFewProducts.value = true;
    }else{
        tooFewProducts.value = false;
    }
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

/* Buttons */
.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

.delete-button {
  background: red;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.edit-button {
  background: orange;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.close-button {
  background: gray;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

input, textarea {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
}

.description-box {
  border: 2px solid gray;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}

.too-few-products {
    height: 250px;
}
</style>