<template>
  <div class="pomodoro-timer">
    <h3>Pomodoro Timer</h3>
    
    <div class="timer-display">
      <div class="time">{{ timeLeft }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Create reactive data - 25 minutes in seconds
const timeLeft = ref(1500)
</script>

<style scoped>
.pomodoro-timer h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 300;
  font-size: 1.5rem;
  text-align: center;
}

.timer-display {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
}

.time {
  font-size: 4rem;
  font-weight: 300;
  color: #2c3e50;
  font-family: 'Courier New', monospace;
}
</style>