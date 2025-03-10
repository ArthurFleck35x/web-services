<template>
    <div class="bg-dark2">
        <div>
            <h1>Sign Up</h1>
            <p>Create your account to access your assets</p>
        </div>
        <form >
            <div>
                <label for="email">Email Adress</label>
                <div>
                    <input type="text" id="email" name="email" placeholder="youremail@example.com">
                    <Mail></Mail>
                </div>
            </div>

            <div>
                <label for="username">Username</label>
                <div>
                    <input type="text" id="username" name="username" placeholder="UniPlaceUser">
                    <Person></Person>
                </div>
            </div>

            <div>
                <div>
                    <label for="password"></label>
                    <a href="#">Forgot your password? </a>
                </div>
                <div>
                    <input type="password" id="password" name="password" placeholder="UniPlace123">
                    <Lock></Lock>
                    <button > <!--Eyeoff--></button>
                </div>
            </div>

            <button>
                <span>Sign Up</span>
            </button>

            <div>
                <div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <span>Or continue with</span>
                    </div>
                </div>
                <div>
                    <button >Log In</button>
                </div>
            </div>
        </form>
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
