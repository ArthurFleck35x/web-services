<template>
    <div>
        <div class="bg-special">
            <div class="elem">
                <h2>Currency</h2>
                <!-- Dropdown -->
                <div>
                    <label for="currency">Select preferred currency </label>
                    <select name="currency" id="currency">
                    <option value="eur">EUR</option>
                    <option value="usd">USD</option>
                    <option value="gbp">GBP</option>
                    <option value="jpy">JPY</option>
                    <option value="krw">KRW</option>
                    <option value="cny">CNY</option>
                    <option value="mxn">MXN</option>
                    </select>
                    <div>
                        <img alt="Flag">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        
        <div class=" bg-special currency-container">
            <h2>Currency</h2>
            <!-- Dropdown -->
            <label for="selectedCurrency">Select preferred currency </label>
            <select v-model="selectedCurrency" @change="updateCurrencyRate">
                <option v-for="currency in currencies" :key="currency" :value="currency">
                    {{ currency }}
                </option>
            </select>
            <p>Wechselkurs: {{ currencyRate }}</p>
            <img v-if="flagURL" :src="flagURL" alt="Flag" class="flag-image" />
        </div>
    </div>
</template>
<style scoped>
/* Navbar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*background-color: #2563eb;*/
    padding: 1rem;
    color: white;
    position: relative;
}
section div {
    padding: 1rem;
    text-align: center;
}

/* Logo */
.logo img {
    height: 40px;
    width: 40px;
}

/* Titel */
.title {
    font-size: 2rem; /* Entspricht "text-2xl" in Tailwind */
    font-weight: bold;
    background: linear-gradient(to right, #22d3ee, #9333ea); /* Farbverlauf von Cyan nach Lila */
    -webkit-background-clip: text; /* Hintergrundclip für den Text */
    color: transparent; /* Text transparent machen, damit der Hintergrund sichtbar wird */
}
h4 {
    font-size: 1rem; /* Anpassen der Schriftgröße */
    font-weight: bold;
    color: white; /* Oder eine passende Farbe */
    text-align: center;
}
/* Zentriert den Text */
.center {
    text-align: center;
}
/* weiße Schrift */
.white {
    color: white;
}
/* Burger-Menü Button */
.menu-button {
    font-size: 1.8rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    display: block; /* Immer sichtbar */
}
.currency-container {
    text-align: center;
    padding: 20px;
}

.flag-image {
    width: 100px;
    height: auto;
    margin-top: 10px;
}
/* Dropdown-Menü */
.dropdown {
    position: absolute;
    right: 1rem;
    top: 3.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 150px;
}

/* Dropdown-Text schwarz machen */
.dropdown li {
    color: black;
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s;
    list-style: none;
}

.dropdown li:hover {
    background: #f1f1f1;
}

/* Für den Dark Mode Hintergrund */
.bg-dark {
    background: linear-gradient(to bottom right, #1a202c, #2d3748, #4a5568); /* Dark Gray to Slate */
    color: white;
}
.bg-dark2 {
    background: linear-gradient(to bottom right, #1a202c, #2d3748); /* Dark Gray to Slate */
    color: white;
}

/* Für den Light Mode Hintergrund */
.bg-light {
    background: linear-gradient(to bottom right, #f7fafc, #ffffff, #edf2f7); /* Light Gray to White */
    color: #1a202c;
}
/* Für den Spezialhintergrund */
.bg-special {
    background: linear-gradient(to left, #5cbbca,#c59bec); /* Indigo to Blue-green */
    color: white;
    width: 100%;
    padding: 1rem;
}
</style>
<script>
import { fetchCurrencyRate, fetchFlagURL } from "@/RESTjs/REST.js";

export default {
    data() {
        return {
        selectedCurrency: "USD",
        currencyRate: null,
        flagURL: "",
        currencies: ["USD", "EUR", "GBP", "JPY", "CHF"]
        };
    },
    methods: {
        async updateCurrencyRate() {
            this.currencyRate = await fetchCurrencyRate(this.selectedCurrency);
            this.flagURL = await fetchFlagURL(this.getCountryByCurrency(this.selectedCurrency));
        },
        getCountryByCurrency(currency) {
            const currencyMap = {
            "USD": "United States",
            "EUR": "Germany",
            "GBP": "United Kingdom",
            "JPY": "Japan",
            "CHF": "Switzerland"
            };
        return currencyMap[currency] || "Unknown";
        }
    },
    mounted() {
        this.updateCurrencyRate();
    }
};
</script>