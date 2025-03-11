<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const loginUser = async () => {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    const data = await response.json();

    if (data.success) {
      alert('Login erfolgreich!');
      // Weiterleitung zur nächsten Seite (z. B. Dashboard)
    } else {
      errorMessage.value = data.message;
    }
  } catch (error) {
    console.error('Fehler beim Login:', error);
    errorMessage.value = 'Server nicht erreichbar!';
  }
};
</script>

<template>
  <div>
    <div>
      <h1>Log In</h1>
      <p>Sign in to your account to access your assets</p>
    </div>
    
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email Address</label>
        <div>
          <input type="text" id="email" v-model="email" placeholder="youremail@example.com">
        </div>
      </div>

      <div>
        <div>
          <label for="password"></label>
          <a href="#">Forgot your password?</a>
        </div>
        <div>
          <input type="password" id="password" v-model="password" placeholder="UniPlace123">
        </div>
      </div>

      <button type="submit">
        <span>Sign In</span>
      </button>

      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </form>
  </div>
</template>
