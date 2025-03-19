<template>
    <div class="popup bg-dark" v-if="isErrorVisible">
        <div class="errorMessage">Error</div>
        <div>{{ errormessage }}</div>
    </div>
    <div class="popup bg-dark" v-if="isSuccessVisible">
        <div class="successMessage">Success</div>
        <div>{{ successmessage }}</div>
    </div>
    <div class="bg-special">
        <div class="new-product-frame">
            <h3 class="title"><strong>Add a new Product</strong></h3>
            <label><strong>Product:</strong></label>
            <input v-model="productForm.title" type="text"/>
            
            <label><strong>Price:</strong></label>
            <input v-model.number="productForm.price" type="number"/>
            
            <label><strong>Count:</strong></label>
            <input v-model.number="productForm.count" type="number"/>
            
            <label><strong>Description:</strong></label>
            <textarea v-model="productForm.description"></textarea>
            <div class="button-div"><button class="submit-button button" @click="submitArticle">Submit</button></div>
            
        </div>
    </div>
</template>

<script setup>
import { createNewArticle } from '@/RESTjs/REST';
import { ref } from 'vue';

const isErrorVisible = ref(false);

const isSuccessVisible = ref(false);

var errormessage = ref('');

var successmessage = ref('');

const productForm = ref({
  title: "",
  price: 0,
  count: 0,
  description: "",
});

const submitArticle = () => {
    if(checkProductForm()){
        successmessage.value = "Articlecreation was a success"
        isSuccessVisible.value = true

        setTimeout(() => {
            isSuccessVisible.value = false;
        }, 2000);
        createNewArticle(productForm.value.title,productForm.value.price,productForm.value.count,productForm.value.description);
        clearProductForm();
    }else{
        errormessage.value = "Please input all information"
        isErrorVisible.value = true

        setTimeout(() => {
            isErrorVisible.value = false;
        }, 2000);
    }
}

function checkProductForm(){
    return (productForm.value.title != "") && (productForm.value.price != 0) && (productForm.value.count != 0) && (productForm.value.description != ""); 
}

function clearProductForm(){
    productForm.value.title = "";
    productForm.value.price = 0;
    productForm.value.count = 0;
    productForm.value.description = "";
}

</script>

<style scoped>
/* Für den Spezialhintergrund */
.bg-special {
    background: linear-gradient(to left, #5cbbca,#c59bec); /* Indigo to Blue-green */
    color: white;
    width: 100%;
    padding: 1rem;
}

input, textarea {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
}
.title {
  font-size: 2rem; /* Entspricht "text-2xl" in Tailwind */
  font-weight: bold;
  background: linear-gradient(
    to right,
    #22d3ee,
    #9333ea
  ); /* Farbverlauf von Cyan nach Lila */
  -webkit-background-clip: text; /* Hintergrundclip für den Text */
  color: transparent; /* Text transparent machen, damit der Hintergrund sichtbar wird */
}
.new-product-frame {
    padding: 10px;
    background-color: white;
    color: black;
    margin: 0 20%;
}

h3 {
    text-align: center;
}

.submit-button {
    font-weight: bold;
    margin-top: 20px;
    border-radius: 5px;
    font-size: x-large;
}

.button-div {
    width: 100%;
    text-align: center;
}

.bg-dark {
  background: linear-gradient(
    to bottom right,
    #1a202c,
    #2d3748,
    #4a5568
  ); /* Dark Gray to Slate */
  color: white;
}
.button {
    background:  linear-gradient(to right, #1a202c, #2d3748, #4a5568);
    border: none;
    color: white;
    padding: 16px 32px;
    text-align: center;
    font-size: 16px;
    margin: 4px 2px;
    opacity: 0.6;
    transition: 0.3s; 
    display: inline-block;
    cursor: pointer;
    display: inline-block;
    padding: 15px 25px;
    outline: none;
    border: none;
    border-radius: 15px;
}

.button:hover {opacity: 1}
.button:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}
.errorMessage{
  color: red;
  text-align: center;
}

.popup {
  margin-top: 70px;
  margin-left: 45%;
  width: 10%;
  height: auto;
  position: fixed;
  border-radius: 10px;
  z-index: 400;
  text-align: center;
}

.successMessage{
    color: lightgreen;
    text-align: center;
}

</style>