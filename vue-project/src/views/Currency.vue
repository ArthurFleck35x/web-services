<template>
    <div>
        
        <div class=" bg-special currency-container">
            <h2 class="top5">Choose Your Currency!</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-exchange" viewBox="0 0 16 16">
            <path d="M0 5a5 5 0 0 0 4.027 4.905 6.5 6.5 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05q-.001-.07.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.5 3.5 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98q-.004.07-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5m16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0m-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674z"/>
            </svg>
            <p>Choose your preferred currency and see the exchange rate on the whole market!</p>
            <!-- Dropdown -->
            <label for="selectedCurrency">Select preferred currency </label>
            <select v-model="selectedCurrency" @change="updateCurrencyRate">
                <option v-for="currency in currencies" :key="currency" :value="currency">
                    {{ currency }}
                </option>
            </select>
            <p>Wechselkurs: {{ currencyRate }}</p>
            <img v-if="flagURL" :src="flagURL" alt="Flag" class="flag-image" />
            <p class="bottom5">Lets go to the market!</p>
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
.top5{
    margin-top: 5rem
}
.bottom2{
    margin-bottom: 2rem
}
.bottom5{
    margin-bottom: 5rem
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
        currencies: ["USD", "EUR", "GBP", "JPY", "CHF", "CNY","MXN"]
        };
    },
    methods: {
        async updateCurrencyRate() {
        try {
            this.currencyRate = await fetchCurrencyRate(this.selectedCurrency);
            const country = this.getCountryByCurrency(this.selectedCurrency);
            this.flagURL = await fetchFlagURL(country);
        } catch (error) {
            console.error("Fehler beim Laden der Währungsdaten:", error);
        }
        },
        getCountryByCurrency(currency) {
        const currencyMap = {
            "USD": "United States",
            "EUR": "Germany",
            "GBP": "United Kingdom",
            "JPY": "Japan",
            "CHF": "Switzerland",
            "CNY": "China",
            "MXN": "Mexico"
        };
        return currencyMap[currency] || "Unknown";
        }
    },
    async mounted() {
        await this.updateCurrencyRate();
    }
};
</script>