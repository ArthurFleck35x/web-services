<template>
    <div>
        <div>
            <!-- About Us Banner img -->
            <div>
                <div>
                    <h1>
                        <span class="title">About UniPlace</span>
                    </h1>
                    <p>
                        Pioneering of asset trading across the multiverse
                    </p>
                </div>
            </div>
        </div>
    </div>

    <main>
        <section>
            <div>
                <div>
                    <Zap size={20}></Zap>
                    <h2>
                    </h2>
                </div>
                <h3>
                    Since 2025
                </h3>
                <p>
                    UniPlace is a platform for trading assets across the multiverse. We are the first to offer this service and have been doing so since 2025. Our platform is secure and easy to use. We offer a wide range of assets to trade, including stocks, bonds, and cryptocurrencies. Our platform is designed to be user-friendly and intuitive, so you can start trading right away. Join us today and start trading assets across the multiverse!</p>
                <p>next pragraph</p>

            </div>
        </section>

        <section>
            <div>
                <Target size={20}></Target>
                <h2>Revolutionizing Digital Asset Trading</h2>
            </div>
        </section>
    </main>
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

/* Für den Light Mode Hintergrund */
.bg-light {
    background: linear-gradient(to bottom right, #f7fafc, #ffffff, #edf2f7); /* Light Gray to White */
    color: #1a202c;
}
</style>