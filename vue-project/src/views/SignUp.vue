<template>
    <div class="popup bg-dark" v-if="isPopupVisible">
        <div class="errorMessage">Error</div>
        <div>{{ errormessage }}</div>
    </div>
    <div class="popup bg-dark" v-if="isSuccessVisible">
        <div class="successMessage">Success</div>
        <div>{{ successmessage }}</div>
    </div>
    <div class="bg-special">
        <div class="right element"> 
            <h1 class="top5">Sign Up</h1>
            <p>Create your account to access your assets</p>
        </div>
        <div >
            <div class="right element">
                <label for="email">Email Adress</label>
                <div>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        v-model="email"
                        placeholder="youremail@example.com"
                        :class="{'error': emailEmpty}"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at svg" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                    <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                    </svg>
                </div>
            </div>

            <div class="right element">
                <label for="username">Username</label>
                <div>
                    <input
                        type="text"
                        id="userName"
                        name="UserName"
                        v-model="username"
                        placeholder="UniPlaceUser"
                        :class="{'error': userNameEmpty}"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle svg" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                </div>
            </div>

            <div class="right element">
                <div>
                    <label for="password">Password</label>
                    <!--<a href="#">Forgot your password? </a>-->
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        v-model="password"
                        placeholder="UniPlace123"
                        :class="{'error': passwordEmpty}"
                    />
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-lock svg"
                    viewBox="0 0 16 16"
                    >
                    <path
                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"
                    />
                    </svg>
                </div>
            </div>
            <div class="right element">
                <div>
                    <label for="selectedCurrency">Select preferred currency </label>
                </div>
                <div>
                    <select  v-model="selectedCurrency">
                        <option v-for="currency in currencies" :key="currency" :value="currency">
                            {{ currency.toUpperCase() }}
                        </option>
                    </select>
                </div>
            </div>
            <button class="right element button" @click="signUp">
                <span>Sign Up</span>
            </button>

            <div class="right">
                <div>
                    <div>
                        <div></div>
                    </div>
                    <div class="element">
                        <span>Or continue with</span>
                    </div>
                </div>
                <div>
                    <button class="bottom5 button" @click="goToLogIn">Login</button>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-special">
        <div class="center">
            <h2 class="bottom2">Welcome to UniPlace!</h2>
            <p class="bottom2">Create an account now to start shopping on our marketplace or sell your own items. <br> If you already have an account, simply click Log In and get started!</p>
            <p class="bottom2">Sign up now & start today!</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-sunglasses-fill bottom5 center" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v.116A4.2 4.2 0 0 1 8 5c.35 0 .69.04 1 .116V5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-1.994-1.839A3 3 0 0 0 8 6c-.393 0-.74.064-1.006.161A2 2 0 0 1 5 8h-.438a2 2 0 0 1-1.94-1.515zM4.969 9.75A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .866-.5z"/>
            </svg>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { registerUser, setCurrency, setCurrencyRate, setCurrencySymbol, fetchCurrencyRate } from "@/RESTjs/REST";
import CryptoJS from "crypto-js";

const router = useRouter();

const goToLogIn = () => {
    router.push("/"); // Navigiert zum LogIn
};

const email = ref('');
const emailEmpty = ref(false);

const username = ref('');
const userNameEmpty = ref(false);

const password = ref('');
const passwordEmpty = ref(false)

const selectedCurrency = ref("eur");
const currencies = ["eur", "usd", "gbp", "jpy", "krw", "cny", "mxn"];

const hashedPassword = ref('');

const isPopupVisible = ref(false);

const isSuccessVisible = ref(false);

const errormessage = ref('');

const successmessage = ref('');

const signUp = () => {
  if(!checkValues()){
    hashedPassword.value = CryptoJS.SHA256(username.value+password.value).toString(CryptoJS.enc.Hex);
    sendSignUpData()
  }else{
    errormessage.value = "Please input your data";
    openPopup();
  }
}

function checkValues(){
  var isEmpty = false;
  if(email.value == ''){
    emailEmpty.value = true;
    isEmpty = true;
  }else{
    emailEmpty.value = false;
  }
  if(username.value == ''){
    userNameEmpty.value = true;
    isEmpty = true;
  }else{
    userNameEmpty.value = false;
  }
  if(password.value == ''){
    passwordEmpty.value = true;
    isEmpty = true;
  }else{
    passwordEmpty.value = false;
  }
  return isEmpty;
}

function sendSignUpData(){
  registerUser(email.value,username.value,hashedPassword.value,selectedCurrency.value).then(success=>{
    if(success){
        successmessage.value = "Successfully signed in"
        isSuccessVisible.value = true;
  
        setTimeout(() => {
            isSuccessVisible.value = false;
            if(selectedCurrency.value == "eur"){
                setCurrency("eur");
                setCurrencyRate(1);
                setCurrencySymbol("€");
            }else{
                fetchCurrencyRate(selectedCurrency.value);
            }

            router.push("/market")
        }, 2000);
    }else{
        errormessage.value = "Username or email already exists" 
        openPopup();
    }
  });
}

function openPopup(){
  isPopupVisible.value = true;
  
  setTimeout(() => {
    isPopupVisible.value = false;
  }, 2000);
};

</script>
<style scoped>

section div {
    padding: 1rem;
    text-align: center;
}
.svg{
    margin-left: 2px;
}
.top5{
    margin-top: 5rem
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

/* Zentriert den Text */
.center {
    text-align: center;
}
.bottom2 {
    margin-bottom: 2rem;
}
.bottom5 {
    margin-bottom: 5rem;
}

/* Platz zwischen den Elementen */
.element {
    margin-bottom: 1rem;
}
.dropdown li:hover {
    background: #f1f1f1;
}
/*Text nach rechts verschieben*/
.right {
    margin-left: 10%;
}
/* Für den Dark Mode Hintergrund */
.bg-dark {
    background: linear-gradient(to bottom right, #1a202c, #2d3748, #4a5568); /* Dark Gray to Slate */
    color: white;
}

/* Für den Spezialhintergrund */
.bg-special {
    background: linear-gradient(to left, #5cbbca,#c59bec); /* Indigo to Blue-green */
    color: white;
    width: 100%;
    padding: 1rem;
}

.error{
  color: red;
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
  position: absolute;
  border-radius: 10px;
  z-index: 400;
}

.successMessage{
    color: lightgreen;
    text-align: center;
}

</style>
