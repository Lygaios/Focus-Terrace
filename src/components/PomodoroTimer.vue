<template>
  <div class="pomodoro-timer">
    <h3>Pomodoro Timer</h3>
    
    <!-- Session selector - only show when timer not running -->
    <div v-if="!isRunning" class="session-selector">
      <label>Number of work sessions:</label>
      <div class="session-buttons">
        <button 
          v-for="n in 4" 
          :key="n"
          @click="totalSessions = n"
          :class="['session-btn', { active: totalSessions === n }]"
        >
          {{ n }}
        </button>
      </div>
    </div>
    
    <!-- Session status heading -->
    <div class="session-status">
      <h2 v-if="isWorkSession">Focus</h2>
      <h2 v-else>Relax</h2>
      <p class="session-info">Session {{ currentSession }} of {{ totalSessions }}</p>
    </div>
    
    <div class="timer-display">
      <div class="time">{{ formattedTime }}</div>
    </div>
    
    <div class="timer-controls">
      <button v-if="!isRunning" @click="startTimer" class="start-button">Start</button>
      <button v-if="isRunning" @click="pauseTimer" class="pause-button">Pause</button>
      <button @click="resetTimer" class="reset-button">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Create reactive data - 25 minutes in seconds
const timeLeft = ref(1500)

// Track if timer is currently running
const isRunning = ref(false)

// Session management
const totalSessions = ref(1)  // How many work sessions the user wants
const currentSession = ref(1)  // Which session we're currently on
const isWorkSession = ref(true)  // true = work (25min), false = break (5min)

// Store the interval ID so we can stop it later
let intervalId: number | null = null

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
  // Don't start if already running!
  if (isRunning.value) {
    return  // Exit the function early
  }
  
  isRunning.value = true  // Mark as running
  
  // setInterval runs code repeatedly every X milliseconds
  // Store the ID so we can stop it later!
  intervalId = window.setInterval(() => {
    // Check if there's time left
    if (timeLeft.value > 0) {
      timeLeft.value = timeLeft.value - 1  // ← Here we use .value!
      // This could also be written as: timeLeft.value--
    } else {
      // Timer reached 0! Need to switch sessions
      switchSession()
    }
  }, 1000)  // Run every 1000ms (1 second)
}

// Function to pause/stop the timer
const pauseTimer = () => {
  if (intervalId !== null) {
    window.clearInterval(intervalId)  // Stop the interval
    intervalId = null  // Clear the ID
  }
  isRunning.value = false  // Mark as not running
}

// Function to handle session switching (work → break → work → etc.)
const switchSession = () => {
  if (isWorkSession.value) {
    // Just finished a WORK session
    
    // Check if this was the LAST work session
    if (currentSession.value >= totalSessions.value) {
      // All done! Stop the timer
      pauseTimer()
      return  // Exit - no more sessions!
    }
    
    // Not the last session, so take a break!
    isWorkSession.value = false  // Switch to break mode
    timeLeft.value = 300  // 5 minutes break (300 seconds)
    
  } else {
    // Just finished a BREAK session
    
    // Move to next work session
    currentSession.value++  // Increment session counter
    isWorkSession.value = true  // Switch to work mode
    timeLeft.value = 1500  // 25 minutes work (1500 seconds)
  }
}

// Function to reset the timer back to 25:00
const resetTimer = () => {
  pauseTimer()  // Stop the timer first
  timeLeft.value = 1500  // Reset to 25 minutes (1500 seconds)
  currentSession.value = 1  // Reset to session 1
  isWorkSession.value = true  // Reset to work mode
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

.session-selector {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
}

.session-selector label {
  color: #2c3e50;
  font-size: 1rem;
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;
}

.session-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.session-btn {
  width: 3rem;
  height: 3rem;
  border: 2px solid rgba(52, 152, 219, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.session-btn:hover {
  background: rgba(52, 152, 219, 0.2);
  border-color: rgba(52, 152, 219, 0.5);
}

.session-btn.active {
  background: rgba(52, 152, 219, 0.8);
  border-color: rgba(52, 152, 219, 1);
  color: white;
}

.session-status {
  text-align: center;
  margin-bottom: 1rem;
}

.session-status h2 {
  font-size: 2.5rem;
  font-weight: 400;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.session-info {
  color: #34495e;
  font-size: 0.9rem;
  opacity: 0.7;
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

.pause-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
  background: rgba(241, 196, 15, 0.8);
}

.pause-button:hover {
  background: rgba(241, 196, 15, 1);
  transform: translateY(-2px);
}

.pause-button:active {
  transform: translateY(0);
}

.reset-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
  background: rgba(52, 152, 219, 0.8);
}

.reset-button:hover {
  background: rgba(52, 152, 219, 1);
  transform: translateY(-2px);
}

.reset-button:active {
  transform: translateY(0);
}
</style>