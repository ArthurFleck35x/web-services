<template >
<div class="bg-dark2 ">
    <div class="center bg-special" >
        <div>
            <!-- About Us Banner -->
            <div class="center">
                <div >
                    <h1 class="title top5">About UniPlace</h1>
                    <p class="bottom5">
                        Pioneering of asset trading across the multiverse
                    </p>
                </div>
            </div>
        </div>
    </div>

    <main>
        <section>
            <div class="section">
                <div class="center">
                    <!-- About Us Banner img (bookmark) -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                    </svg>
                    <h2>Our Story
                    </h2>
                    <p>
                        We are four students who created Uniplace – a platform where anyone can buy and sell.<br> Whether it’s digital in-game items or real-world products, Uniplace makes trading easy, secure, and efficient. <br>Our goal is to build a professional marketplace that is open to everyone and provides seamless access to all kinds of products.</p>
                    <p>Uniplace – your place for limitless trading.</p>
                </div>
            </div>
        </section>

        <section>
            <div>
                <!-- About Us Banner img (flag) -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
                </svg>
                <h2>Revolutionizing Digital Trading</h2>
                <p>Digital trading is evolving rapidly – and we are at the forefront. <br> With innovative technologies and a user-friendly platform, we are creating new opportunities to trade digital assets securely, quickly, and efficiently.<br> Our vision: a limitless, transparent, and accessible trading environment for everyone.</p>
                <p class="bottom5">The future of digital trading starts now.</p>
            </div>
        </section>
    </main>
</div>
</template>
<style scoped>

section div {
    padding: 1rem;
    text-align: center;
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
.top5{
    margin-top: 5rem
}
.bottom5{
    margin-bottom: 5rem
}

/* Für den Dark Mode Hintergrund */
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