<template>
  <div class="pomodoro-timer">
    <h3>Pomodoro Timer</h3>
    
    <div class="timer-display">
      <div class="time">{{ formattedTime }}</div>
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