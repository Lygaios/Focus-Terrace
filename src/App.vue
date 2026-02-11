<template>
  <div id="app">
    <nav class="navigation">
      <div class="nav-brand">
        <h1>Focus Terrace</h1>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/imprint" class="nav-link">Imprint</router-link>
        <router-link to="/privacy" class="nav-link">Privacy</router-link>
      </div>
    </nav>
    
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: url('/terrace.png') center/cover no-repeat fixed;
  min-height: 100vh;
  position: relative;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(2px);
  z-index: -1;
}

#app {
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-brand h1 {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 300;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

main {
  padding: 2rem;
}
</style>