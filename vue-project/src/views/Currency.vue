<template>
    <div>
        
        <div class=" bg-special currency-container">
            <h2 class="top5">Choose Your Currency!</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-exchange" viewBox="0 0 16 16">
            <path d="M0 5a5 5 0 0 0 4.027 4.905 6.5 6.5 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05q-.001-.07.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.5 3.5 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98q-.004.07-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5m16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0m-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674z"/>
            </svg>
            <p>Choose your preferred currency and see the exchange rate on the whole market!</p>
            <!-- Dropdown -->
            <label class="right" for="selectedCurrency">Select preferred currency </label>
            <select  v-model="selectedCurrency" @change="updateCurrencyRate">
                <option v-for="currency in currencies" :key="currency" :value="currency">
                    {{ currency.toUpperCase() }}
                </option>
            </select>

            <img :src="flagUrl" alt="Flag" class="flag-image" />
            <p class="bottom5">Lets go to the market!</p>
        </div>
    </div>
</template>

<script setup>
import { fetchCurrencyRate, fetchFlagURL, getCurrency, setCurrency, setCurrencyRate, setCurrencySymbol } from "@/RESTjs/REST.js";
import { onMounted, ref } from "vue";

// Daten für die View
const selectedCurrency = ref("");
const flagUrl = ref(""); // ref für reaktiven Wert
const currencies = ["eur", "usd", "gbp", "jpy", "krw", "cny", "mxn"];

// Funktion zum Abrufen des Wechselkurses
async function updateCurrencyRate() {
    try {
        if (selectedCurrency.value !== "eur") {
            await fetchCurrencyRate(selectedCurrency.value);
        } else {
            setCurrencyRate(1);
            setCurrency(selectedCurrency.value);
            setCurrencySymbol("€");
        }

        // Flag-URL abrufen
        flagUrl.value = await fetchFlagURL(selectedCurrency.value);
    } catch (error) {
        console.error("Fehler beim Laden der Währungsdaten:", error);
    }
}

onMounted(async () => {
    selectedCurrency.value = getCurrency();
    flagUrl.value = await fetchFlagURL(selectedCurrency.value);
});

</script>

<style scoped>

section div {
    padding: 1rem;
    text-align: center;
}

.currency-container {
    text-align: center;
    padding: 20px;
}

.flag-image {
    width: 40%;
    height: auto;
    display: block;
    margin: 1rem auto;
    
}

.top5{
    margin-top: 5rem
}

.bottom5{
    margin-bottom: 5rem
}

.dropdown li:hover {
    background: #f1f1f1;
}

/* Für den Spezialhintergrund */
.bg-special {
    background: linear-gradient(to left, #5cbbca,#c59bec); /* Indigo to Blue-green */
    color: white;
    width: 100%;
    padding: 1rem;
}
.right {
    margin-right: 1rem;
}
</style>
