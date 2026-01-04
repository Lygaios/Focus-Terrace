<template>
  <div class="home">
    <div class="hero-section">
      <h2>Welcome to Focus Terrace</h2>
      <p>Stay a while and focus</p>
    </div>
    
    <div class="main-content">
      <div class="left-panel">
        <h3>To-Do List</h3>
        <p class="placeholder-text">Todo functionality coming soon...</p>
      </div>
      
      <div class="right-panel">
        <h3>Pomodoro Timer</h3>
        <p class="placeholder-text">Timer functionality coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Basic Vue component - functionality will be added step by step
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-section h2 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 300;
}

.hero-section p {
  color: #34495e;
  font-size: 1.2rem;
  opacity: 0.8;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.left-panel,
.right-panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  min-height: 500px;
}

.left-panel h3,
.right-panel h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.placeholder-text {
  color: #34495e;
  opacity: 0.8;
  text-align: center;
  font-style: italic;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}
</style>