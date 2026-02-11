<template>
  <div class="pomodoro-timer">
    <h3>Pomodoro Timer</h3>
    
    <div class="timer-display">
      <div class="time">{{ formattedTime }}</div>
    </div>
    
    <div class="timer-controls">
      <button @click="startTimer" class="start-button">Start</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Create reactive data - 25 minutes in seconds
const timeLeft = ref(1500)

// Computed property - automatically calculates formatted time
const formattedTime = computed(() => {
  // Get the current seconds from timeLeft
  const totalSeconds = timeLeft.value  // ← Here we need .value!
  
  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60)  // 1500 ÷ 60 = 25
  const seconds = totalSeconds % 60               // 1500 % 60 = 0
  
  // Format as "MM:SS" with leading zeros
  const mm = minutes.toString().padStart(2, '0')  // "25"
  const ss = seconds.toString().padStart(2, '0')  // "00"
  
  return `${mm}:${ss}`  // "25:00"
})

// Function to start the timer countdown
const startTimer = () => {
  // setInterval runs code repeatedly every X milliseconds
  // 1000 milliseconds = 1 second
  setInterval(() => {
    // Check if there's time left
    if (timeLeft.value > 0) {
      timeLeft.value = timeLeft.value - 1  // ← Here we use .value!
      // This could also be written as: timeLeft.value--
    }
  }, 1000)  // Run every 1000ms (1 second)
}
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

.timer-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.start-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
  background: rgba(46, 204, 113, 0.8);
}

.start-button:hover {
  background: rgba(46, 204, 113, 1);
  transform: translateY(-2px);
}

.start-button:active {
  transform: translateY(0);
}
</style>