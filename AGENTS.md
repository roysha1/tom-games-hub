# Project: Tom's Learning Adventure (Hebrew Education Game)

## Project Overview
A web-based interactive educational game designed specifically for a 6-year-old boy named Tom. The game focuses on Hebrew literacy and conceptual logic (opposites) through a vibrant, gamified experience.

## Target Audience
- **Primary User:** Tom (6 years old).
- **Language:** Hebrew (Right-to-Left support is critical).
- **UX Goal:** High engagement, intuitive navigation without needing to read complex instructions, and positive reinforcement.

## Tech Stack
- **Framework:** React (JavaScript) with Vite
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Font:** Rubik (Google Fonts, loaded in `index.html`)
- **RTL:** `dir="rtl"` and `lang="he"` set on `<html>`, CSS `direction: rtl` on body

## Project Structure
```
letter_games/
├── index.html                        # RTL + Hebrew lang + Rubik font
├── vite.config.js                    # React + Tailwind plugins
├── src/
│   ├── main.jsx                      # Entry point
│   ├── index.css                     # Tailwind import + custom animations
│   ├── App.jsx                       # Screen router (home / firstLetter / opposites / syllables / dinoMath / pattern)
│   ├── data.js                       # Word list, Hebrew letters, letter utilities, syllable & pattern data
│   ├── sounds.js                     # Placeholder sound effect functions
│   └── components/
│       ├── HomeScreen.jsx            # Landing page ("המשחק של טום")
│       ├── FirstLetterGame.jsx       # First/Last letter game with full logic
│       ├── OppositesGame.jsx         # Opposites matching game (basic + advanced)
│       ├── SyllableGame.jsx          # Syllable counting game (clapping hands)
│       ├── DinoMathGame.jsx          # Dino-Math addition/subtraction game
│       ├── PatternGame.jsx           # Pattern completion (color sequences)
│       └── Confetti.jsx              # Success confetti animation overlay
```

## Core Features

### 1. First & Last Letter Game (Hebrew Literacy) — ✅ Implemented
- **Mechanic:** Display an emoji + Hebrew word. The child must identify the starting or ending letter.
- **Content:** 5 sample words: תפוח 🍎, כלב 🐶, בית 🏠, שמש ☀️, דג 🐟, פרח 🌸, ספר 📖, כוכב ⭐, ירח 🌙, עץ 🌳, חתול 🐱, ארנב 🐰, גלידה 🍦, כדור ⚽, מטוס ✈️ (15 words total)
- **Modes:** Toggle between "אות ראשונה" (first letter) and "אות אחרונה" (last letter).
- **Letter grid:** 6 shuffled Hebrew letter choices (1 correct + 5 distractors).
- **Final-form handling:** Maps final letters (ך→כ, ם→מ, ן→נ, ף→פ, ץ→צ) so answers match the grid.
- **Feedback:** Confetti + stars + "!כל הכבוד" on correct; shake + "!נסה שוב" on wrong.
- **Progress:** Score counter + dot indicators for words completed.

### 2. Opposites Game (Logic) — ✅ Implemented
- **Mechanic:** Show a word+emoji prompt, child picks the opposite from 4 choices (1 correct + 3 distractors).
- **Basic Mode:** 6 pairs — גדול/קטן, חם/קר, שמח/עצוב, יום/לילה, למעלה/למטה, פתוח/סגור.
- **Advanced Mode:** Toggle adds 6 harder pairs (מהר/לאט, ריק/מלא, כבד/קל, ישן/חדש, רך/קשה, ארוך/קצר) for a total of 12.
- **Feedback:** Same confetti + stars + shake as the letter game. Score tracking + progress dots.

### 3. Syllable Counter (Phonological Awareness) — ✅ Implemented
- **Mechanic:** Show an emoji + Hebrew word. The user clicks on the number of syllables (1–5).
- **Visuals:** Clapping hands (👏) icons for buttons — e.g., 👏 for 1, 👏👏 for 2, etc.
- **Content:** 16 Hebrew words with syllable counts (1–5 syllables).
- **Feedback:** Confetti + stars on correct, shake on wrong. Score tracking + progress dots.

### 4. Dino-Math (Basic Arithmetic) — ✅ Implemented
- **Mechanic:** Simple addition/subtraction within 10 using Dinosaur (🦕) icons as visual counters.
- **Display:** Shows dinosaur emoji groups + numeric equation. Pick the correct answer from 4 choices.
- **Feedback:** Same confetti + stars + shake pattern. Endless mode with round counter.

### 5. Pattern Completion (Logic) — ✅ Implemented
- **Mechanic:** Visual color sequences (e.g., Red-Blue-Red-Blue-Red-?). Pick the next color from 4 choices.
- **Patterns:** 2-color and 3-color repeating units using 6 colors (red, blue, green, yellow, purple, orange).
- **Display:** Colored squares in sequence with a "?" placeholder. Choose by colored button.
- **Feedback:** Same confetti + stars + shake pattern. Endless mode with round counter.

## Design & UI Guidelines
- **Visuals:** Bright gradient backgrounds (yellow→pink home, sky→blue game). Large, clickable buttons with rounded corners.
- **Imagery:** Emoji placeholders for now — swap with real images/illustrations later.
- **Language Support:** All UI text, instructions, and feedback are in Hebrew. Full RTL layout.
- **Feedback Loop:** CSS animations — confetti fall, bounce-in, shake, float, star-pop. Sound effects via Web Audio API (ascending tones for success, low buzz for wrong, click tick).
- **Kid-friendly:** Extra-large text (3xl–7xl), no scrollbars, high contrast, active/hover scale transforms.

## Development Rules
- **Math expressions are LTR:** Any mathematical expressions (equations, arithmetic) must use `dir="ltr"` so they read left-to-right, even though the app is RTL Hebrew. This applies to both visual (emoji-based) and numeric equation displays.
- **Shuffle by default:** All games must shuffle both question order and answer choices so they never appear in the same sequence on repeated plays. Questions should be shuffled on mount and re-shuffled when the game resets or mode changes.
- **Consistent feedback pattern:** All games use the same feedback loop — confetti + stars + "!כל הכבוד" on correct answer, shake animation + "!נסה שוב" on wrong answer, with sound effects (success tones / wrong buzz / click).
- **Answer choices:** Always include the correct answer plus shuffled distractors (typically 3–5 wrong options depending on the game).

## Current Status
- [x] Project scaffolded (Vite + React + Tailwind)
- [x] RTL and Hebrew support configured
- [x] Home Screen with game selection buttons
- [x] First & Last Letter game fully functional
- [x] Opposites game fully functional (basic + advanced mode)
- [x] Syllable Counter game fully functional
- [x] Dino-Math game fully functional
- [x] Pattern Completion game fully functional
- [x] Success/error animations (confetti, shake, stars)
- [x] Sound effects via Web Audio API
- [x] 15 Hebrew words in word bank
- [ ] Replace emoji placeholders with real images