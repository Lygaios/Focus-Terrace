# Focus Terrace - Documentation

## Overview

Focus Terrace is a minimalist Pomodoro timer application built with Vue 3, TypeScript, and Vite. The app features a beautiful glassmorphism design with a terrace background image and helps users maintain focus through timed work/break sessions.

## Project Structure

```
focus-terrace/
├── public/
│   └── terrace.png          # Background image
├── src/
│   ├── components/
│   │   └── PomodoroTimer.vue    # Main timer component
│   ├── views/
│   │   ├── Home.vue             # Home page with timer
│   │   ├── Imprint.vue          # Legal imprint page
│   │   └── Privacy.vue          # Privacy policy page
│   ├── App.vue                  # Root component with navigation
│   ├── main.ts                  # Application entry point
│   └── vite-env.d.ts            # TypeScript declarations
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── DOCUMENTATION.md             # This file
```

## Technology Stack

- **Vue 3.5.21** - Progressive JavaScript framework
- **TypeScript 5.9.2** - Type-safe JavaScript
- **Vue Router 4.5.1** - Client-side routing
- **Vite 7.1.7** - Build tool and dev server
- **Composition API** - Modern Vue reactive programming

## Features

### Pomodoro Timer

The timer implements the classic Pomodoro Technique:
- **Work sessions**: 25 minutes
- **Break sessions**: 5 minutes
- **Configurable sessions**: Choose 1-4 work sessions
- **Auto-switching**: Automatically transitions between work and breaks
- **Smart ending**: No break after the final work session

### Session Pattern Example

For 3 sessions selected:
```
Work (25 min) → Break (5 min) → Work (25 min) → Break (5 min) → Work (25 min) → END
```

### Visual Design

- **Glassmorphism**: Semi-transparent panels with backdrop blur
- **Background**: Terrace photo with subtle white overlay
- **Color Scheme**: 
  - Turquoise (#48C9B0) for Start button
  - Rosy gold (#EC9F92) for Pause button
  - Sky blue (#87CEEB) for Reset and session selector
- **Typography**: System fonts (GDPR compliant)

## Component Documentation

### PomodoroTimer.vue

Main timer component with full session management.

#### Reactive State

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `timeLeft` | `Ref<number>` | 1500 | Time remaining in seconds |
| `isRunning` | `Ref<boolean>` | false | Timer running state |
| `totalSessions` | `Ref<number>` | 1 | User-selected session count |
| `currentSession` | `Ref<number>` | 1 | Current session number |
| `isWorkSession` | `Ref<boolean>` | true | Work (true) or break (false) |
| `intervalId` | `number \| null` | null | Interval reference |

#### Computed Properties

**`formattedTime`**
- Returns: `string` (e.g., "25:00")
- Formats `timeLeft` seconds as MM:SS display

#### Methods

**`startTimer()`**
- Starts the countdown timer
- Guards against multiple intervals
- Decrements `timeLeft` every second
- Calls `switchSession()` when reaching zero

**`pauseTimer()`**
- Stops the countdown timer
- Clears the interval
- Sets `isRunning` to false

**`switchSession()`**
- Handles work ↔ break transitions
- After work session:
  - Stops if last session
  - Starts 5-minute break otherwise
- After break session:
  - Increments session counter
  - Starts next 25-minute work session

**`resetTimer()`**
- Stops the timer
- Resets to initial state (25:00, session 1, work mode)

#### Template Features

**Session Selector**
- Displays when timer is not running
- Buttons 1-4 for session count selection
- Visual active state indicator

**Session Status**
- Dynamic heading: "Focus" (work) or "Relax" (break)
- Session counter: "Session X of Y"

**Timer Display**
- Large monospace font (4rem)
- Real-time countdown display

**Controls**
- Start button (visible when stopped)
- Pause button (visible when running)
- Reset button (always visible)

## Vue Composition API Patterns

### Reactivity

```typescript
// ref() creates reactive primitive values
const timeLeft = ref(1500)

// Access in script with .value
timeLeft.value = 1500

// Auto-unwrapped in templates
{{ timeLeft }}
```

### Computed Properties

```typescript
// Automatically recalculates when dependencies change
const formattedTime = computed(() => {
  return formatSeconds(timeLeft.value)
})
```

### Conditional Rendering

```vue
<!-- v-if removes element from DOM -->
<button v-if="!isRunning">Start</button>
<button v-if="isRunning">Pause</button>

<!-- v-else for alternative -->
<h2 v-if="isWorkSession">Focus</h2>
<h2 v-else>Relax</h2>
```

### List Rendering

```vue
<!-- v-for creates multiple elements -->
<button v-for="n in 4" :key="n">{{ n }}</button>
```

### Dynamic Classes

```vue
<!-- :class binding with array and object -->
<button :class="['session-btn', { active: totalSessions === n }]">
```

### Event Handling

```vue
<!-- @click shorthand for v-on:click -->
<button @click="startTimer">Start</button>
```

## Styling Architecture

### Global Styles (App.vue)

- Background overlay system using `::before` pseudo-element
- Navigation with glassmorphism effect
- Responsive layout structure

### Scoped Styles (PomodoroTimer.vue)

- Component-specific styles with `<style scoped>`
- Button glassmorphism with backdrop-filter
- Text enhancement with text-shadow and text-stroke
- Smooth transitions and hover effects

### CSS Techniques Used

**Glassmorphism**
```css
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(10px);
border: 2px solid rgba(135, 206, 235, 0.4);
```

**Text Enhancement**
```css
text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3),
             0 0 8px rgba(255, 255, 255, 0.2);
-webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.1);
```

**Layered Shadows**
```css
box-shadow: 0 8px 16px rgba(72, 201, 176, 0.2);
```

## Development

### Available Scripts

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

### TypeScript Configuration

- Strict mode enabled
- Vue JSX support
- Path aliases configured
- Modern ES2020 target

## Browser Compatibility

- Modern browsers with ES6+ support
- CSS backdrop-filter support required
- Flexbox and CSS Grid
- fetch API for potential future features

## GDPR Compliance

- No external font CDNs (only system fonts)
- No analytics or tracking
- No cookies
- Privacy policy and imprint pages included

## Future Enhancement Ideas

- Sound notifications when sessions complete
- Customizable work/break durations

## License & Credits

Created for personal productivity use. The terrace background image provides a calming visual atmosphere aligned with focus and relaxation principles.
Background image created with Midjourney. 

---

**Version**: 1.0.0  
**Last Updated**: February 2026
