<template>
  <div class="pomodoro-timer">
    <h3>Pomodoro Timer</h3>
    
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

/**
 * Reactive state: Time remaining in current session (in seconds)
 * @type {Ref<number>}
 * @default 1500 (25 minutes)
 */
const timeLeft = ref(1500)

/**
 * Reactive state: Whether the timer is currently running
 * @type {Ref<boolean>}
 * @default false
 */
const isRunning = ref(false)

/**
 * Reactive state: Total number of work sessions selected by user
 * @type {Ref<number>}
 * @default 1
 */
const totalSessions = ref(1)

/**
 * Reactive state: Current session number (1-indexed)
 * @type {Ref<number>}
 * @default 1
 */
const currentSession = ref(1)

/**
 * Reactive state: Session type indicator
 * @type {Ref<boolean>}
 * @default true
 * @description true = work session (25 min), false = break session (5 min)
 */
const isWorkSession = ref(true)

/**
 * Interval ID for the countdown timer
 * @type {number | null}
 */
let intervalId: number | null = null

/**
 * Computed property that formats timeLeft as MM:SS string
 * @returns {string} Formatted time string (e.g., "25:00", "04:59")
 */
const formattedTime = computed(() => {
  const totalSeconds = timeLeft.value
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const mm = minutes.toString().padStart(2, '0')
  const ss = seconds.toString().padStart(2, '0')
  return `${mm}:${ss}`
})

/**
 * Starts the countdown timer
 * @description Creates an interval that decrements timeLeft every second.
 * Prevents multiple intervals by checking isRunning state.
 * Calls switchSession() when timer reaches zero.
 */
const startTimer = () => {
  if (isRunning.value) {
    return
  }
  
  isRunning.value = true
  
  intervalId = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value = timeLeft.value - 1
    } else {
      switchSession()
    }
  }, 1000)
}

/**
 * Pauses/stops the countdown timer
 * @description Clears the interval and updates isRunning state
 */
const pauseTimer = () => {
  if (intervalId !== null) {
    window.clearInterval(intervalId)
    intervalId = null
  }
  isRunning.value = false
}

/**
 * Handles automatic session transitions
 * @description Manages work → break → work cycle:
 * - After work: starts break (5 min) or stops if last session
 * - After break: increments session counter and starts next work (25 min)
 */
const switchSession = () => {
  if (isWorkSession.value) {
    if (currentSession.value >= totalSessions.value) {
      pauseTimer()
      return
    }
    isWorkSession.value = false
    timeLeft.value = 300
  } else {
    currentSession.value++
    isWorkSession.value = true
    timeLeft.value = 1500
  }
}

/**
 * Resets timer to initial state
 * @description Stops timer and resets all values to defaults:
 * - Time: 25:00
 * - Session: 1
 * - Mode: Work
 */
const resetTimer = () => {
  pauseTimer()
  timeLeft.value = 1500
  currentSession.value = 1
  isWorkSession.value = true
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
  border: 2px solid rgba(135, 206, 235, 0.4);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.session-btn:hover {
  background: rgba(135, 206, 235, 0.25);
  border-color: rgba(135, 206, 235, 0.6);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.session-btn.active {
  background: rgba(135, 206, 235, 0.5);
  border-color: rgba(135, 206, 235, 0.8);
  color: white;
  box-shadow: 0 6px 12px rgba(135, 206, 235, 0.3);
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
  border: 2px solid rgba(72, 201, 176, 0.5);
  border-radius: 15px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
  background: rgba(72, 201, 176, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 16px rgba(72, 201, 176, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3),
               0 0 8px rgba(255, 255, 255, 0.2);
  -webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.1);
}

.start-button:hover {
  background: rgba(72, 201, 176, 0.75);
  border-color: rgba(72, 201, 176, 0.7);
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(72, 201, 176, 0.3);
}

.start-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(72, 201, 176, 0.2);
}

.pause-button {
  padding: 1rem 2rem;
  border: 2px solid rgba(236, 159, 146, 0.5);
  border-radius: 15px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
  background: rgba(236, 159, 146, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 16px rgba(236, 159, 146, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3),
               0 0 8px rgba(255, 255, 255, 0.2);
  -webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.1);
}

.pause-button:hover {
  background: rgba(236, 159, 146, 0.75);
  border-color: rgba(236, 159, 146, 0.7);
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(236, 159, 146, 0.3);
}

.pause-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(236, 159, 146, 0.2);
}

.reset-button {
  padding: 1rem 2rem;
  border: 2px solid rgba(135, 206, 235, 0.5);
  border-radius: 15px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
  background: rgba(135, 206, 235, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 16px rgba(135, 206, 235, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3),
               0 0 8px rgba(255, 255, 255, 0.2);
  -webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.1);
}

.reset-button:hover {
  background: rgba(135, 206, 235, 0.75);
  border-color: rgba(135, 206, 235, 0.7);
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(135, 206, 235, 0.3);
}

.reset-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(135, 206, 235, 0.2);
}
</style>