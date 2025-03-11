<template>
    <div>
        <div class="bg-special" >
            <div>
                <!-- About Us Banner img -->
                <div>
                    <div>
                        <h1 class="title center" >Fast FAQ</h1>
                        <p class="center"> Get your answers here!</p>
                    </div>
                </div>
            </div>
        </div>

        <main>
            <div class="bg-dark2" >
                <div>
                    <h3 class="element">General</h3>
                    <div>
                    <h5>
                        What is UniPlace?
                    </h5>
                    <p>
                        Uniplace is a marketplace where users can buy and sell both digital and real-world assets easily and securely.
                    </p>
                    </div>
                    <!--für die anderen anpassen-->
                    <h3 class="element">Account</h3>
                    <div>
                    <h5>
                        How do I create an account?
                    </h5>
                    <p>
                        Simply sign up with your email, verify your identity, and start trading.
                    </p>
                    </div>
                    <h3 class="element">Marketplace</h3>
                    <div>
                    <h5>
                        What can I buy and sell?
                    </h5>
                    <p>
                        You can trade a wide range of items, from in-game assets and NFTs to physical goods.

                    </p>
                    </div>
                    <h3 class="element">Support</h3>
                    <div>
                    <h5>
                        How do I contact customer support?
                    </h5>
                    <p>
                        You can reach us through email.
                    </p>
                    </div>
                </div>
            </div>
        </main>
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
/* Platz zwischen den Elementen */
.element {
    margin-bottom: 1rem;
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
/*Schrift mittig*/
.fonts {
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