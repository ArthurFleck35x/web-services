<template>
    <div>
        <div class="bg-special" >
            <div>
                <!-- About Us Banner img -->
                <div>
                    <div>
                        <h1 class="title center top5" >Fast FAQ</h1>
                        <p class="center bottom5"> Get your answers here!</p>
                    </div>
                </div>
            </div>
        </div>

        <main>
            <div >
                <div class="bg-dark2 center">
                    <h3 class="element title ">General</h3>
                    <div>
                    <h5 >
                        What is UniPlace?
                    </h5>
                    <p class="bottom2">
                        Uniplace is a marketplace where users can buy and sell both digital and real-world assets easily and securely.
                    </p>
                    </div>
                    <!--für die anderen anpassen-->
                    <h3 class="element title">Account</h3>
                    <div>
                    <h5 >
                        Do I need to register to buy or sell something?
                    </h5>
                    <p class="bottom2">
                        Yes, registration is required to sell items or to contact sellers.
                    </p>
                    <h5>
                        How do I create an account?
                    </h5>
                    <p class="bottom2">
                        Simply sign up with your email, verify your identity, and start trading.
                    </p>
                    </div>
                    <h3 class="element title">Marketplace</h3>
                    <div>
                    <h5>
                        What can I buy and sell?
                    </h5>
                    <p class="bottom2">
                        You can trade a wide range of items, from in-game assets and NFTs to physical goods.

                    </p>
                    <h5>
                        How can I buy?
                    </h5>
                    <p class="bottom2">
                        For each article, the seller's email address appears so you can complete your purchases.

                    </p>
                    </div>
                    <h3 class="element title">Support</h3>
                    <div>
                    <h5 >
                        How do I contact customer support?
                    </h5>
                    <p >
                        You can reach us through email.
                    </p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<style scoped>
section div {
    padding: 1rem;
    text-align: center;
}
.bottom5{
    margin-bottom: 5rem
}
.bottom2{
    margin-bottom: 2rem
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

/* Zentriert den Text */
.center {
    text-align: center;
}

.bg-dark2 {
    background: linear-gradient(to bottom right, #1a202c, #2d3748); /* Dark Gray to Slate */
    color: white;
}

/* Für den Spezialhintergrund */
.bg-special {
    background: linear-gradient(to left, #5cbbca,#c59bec); /* Indigo to Blue-green */
    color: white;
    width: 100%;
    padding: 1rem;
}
</style>