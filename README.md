> ⚠️ This project is protected under a custom license.
> Unauthorized use, copying, or redistribution is strictly prohibited.
> © 2026 Anchal Bisht · All Rights Reserved

# Chianya — Forest of Consciousness

> *"You don't have to explain anything. Just arrive as you are."*

**Live:** https://chianya.vercel.app  
**Built by:** Anchal Bisht | anchal001bisht@gmail.com | github.com/Anchalbisht10

---

## Where the Name Comes From

The project was first called Sattva — a Sanskrit word meaning purity of mind and clarity. It was beautiful, but something felt incomplete. Then one night, a word arrived: Chittaranya. It comes from two Sanskrit roots — Chitta, meaning consciousness, and Aranya, meaning forest, wildness, sacred inner space. Together they become forest of consciousness.

We live in a world of extraordinary technology and extraordinary loneliness. We have apps for everything and space for almost nothing. Chianya does not claim to fix that. It is a tool, built with intention, designed so that when you arrive here — even briefly — you feel something natural. Something conscious. Something yours.

---

## What Is Chianya?

Chianya is a digital sanctuary — an emotionally intelligent wellbeing platform built specifically for young people who are carrying something heavy and have nowhere to put it down.

It is not a therapy app. It is not a productivity tool. It is not another wellness dashboard with mood sliders and habit trackers.

Chianya is a forest. A space that meets you exactly where you are — without diagnosis, without judgment, without cost.

When you enter, a 3D forest world opens around you. An AI companion named Antar waits — not as a chatbot, but as a presence. You choose what you are carrying. The forest responds. You breathe, release, ground yourself, receive wisdom, or simply sit in stillness. And if you need a real human voice, Antar will always point you there.

---

## The Problem

Millions of young people exist in a space the mental health system has largely ignored — the space between "I'm fine" and "I need a therapist."

They are not in crisis. They are not diagnosed. They are simply overwhelmed, anxious, lonely, numb, or stuck — and they have no idea what to do about it.

Therapy is expensive, inaccessible, and culturally stigmatized in many communities. Wellness apps feel clinical, corporate, or hollow. Social media offers distraction, not recovery. So most young people do nothing — and it compounds.

The World Health Organization identifies depression and anxiety as leading causes of disability among young people globally. In South Asia alone, student mental health crises linked to academic pressure are documented at alarming levels. Yet mental health infrastructure for youth — especially in middle and lower-income countries — remains severely underfunded and culturally inaccessible.

Chianya was built for that 11 PM moment. The alone-in-a-crowd moment. The I-don't-even-know-what-I'm-feeling moment.

---

## Who It Is Built For

Chianya is built for youth aged 16–28 — specifically:

- Students under academic pressure: board exams, entrance tests, family expectations, thesis deadlines
- Young professionals experiencing early burnout, caught between ambition and exhaustion
- People in cultures where mental health conversations are still stigmatized, where asking for help feels impossible
- Anyone carrying quiet suffering — not in crisis, but not okay either
- Youth across South Asia and beyond who have never had access to affordable, culturally resonant emotional support

Chianya does not require the user to identify as mentally ill. It only requires them to show up.

---

## Core Features

### 🌲 The Living Forest
A fully immersive 3D forest environment built with Three.js. The forest is not decoration — it is alive and responsive. When you select your emotional state, the forest changes with you. Feeling anxious? The fog thickens, the light dims. Feeling numb? The fireflies fade. Feeling heavy? The atmosphere deepens. The world around you reflects what you are carrying inside. As you return daily, the forest grows brighter — more fireflies, warmer light — quietly acknowledging your consistency.

### 🧘 Antar — The Inner Guide
An AI companion powered by Groq's Llama 3.3 70B model, designed to converse with emotional intelligence. Antar is not a chatbot. Antar listens, reflects, and responds with genuine care — never clinical advice, never false promises. Every message is crafted to make the user feel received, not processed.

Antar also remembers. Based on how many days you have returned to the forest, Antar's greeting changes. On day 7: *"Seven days. The forest has been counting. It missed you on the days you weren't here."* On day 30: *"A month. You came back every day. That is not nothing. That is everything."*

### 🛡️ Crisis Safety Layer
If Antar detects language indicating serious distress or self-harm risk, the conversation shifts immediately. Antar gently acknowledges the weight of what was shared and surfaces real human support — specifically iCall (9152987821) in India — warmly and in character, never alarmingly, never pretending to be a therapist.

### 🌬️ Breathe
Guided 4-7-8 breathing technique with animated visual feedback. Evidence-based. Designed to slow the nervous system in moments of acute anxiety.

### 🌍 Ground
The 5-4-3-2-1 sensory grounding technique — five things you can see, four you can touch, three you can hear, two you can smell, one you can taste. Brings users back to the present moment, away from spiral thinking.

### 🌿 Release
A ritual writing space. Users write what is heavy. Then they watch it dissolve into the earth. By design, release content is never stored. What is released, is released.

### 🪷 Just Sit
A dedicated space to do nothing. No prompts. No tasks. No guidance. Simply rest in the forest and let the stillness be enough.

### 📖 Wisdom
60 philosophical teachings across 7 themes — awareness, acceptance, presence, stillness, self-compassion, impermanence, and detachment — matched to the user's emotional state.

### ✉️ Letter to Future Self
Users write a letter to their future self and choose when it arrives — 7, 14, or 30 days from now. The forest holds it. On the chosen day, it arrives by email: *"The forest kept this for you."* No other student wellness project does this.

### 🌱 Forest Streak System
Every day a user returns, their streak grows. Badges earned quietly: Forest Seedling at 3 days, Forest Walker at 7, Forest Keeper at 14, Forest Elder at 30. The forest visually responds to consistency. Antar's greeting changes at every milestone.

### ⭐ Voices from the Forest
A community feedback wall where users leave star ratings and reflections using emoji avatars. A quiet reminder that others have been here too — and found something worth returning to.

### 📊 Your Sanctuary — Personal Dashboard
Session history, emotional patterns over the last 7 days, streak and badge status, time in the forest. Not a clinical dashboard — a mirror held with kindness.

### 🌐 Community Impact Counter
Live statistics — how many breaths taken, how many things released, how many conversations held, how many souls in the forest. A quiet reminder that no one is doing this alone.

### 🔒 Ethical Architecture
No advertising. No data sold. No diagnosis. No manipulation. No dark patterns. The forest does not have a business model built on human pain.

---

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Three.js, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI | Groq API — Llama 3.3 70B (conversations), Llama 3.1 8B (quick responses) |
| Email | Nodemailer with Gmail App Password |
| Auth | bcrypt, JWT, httpOnly cookies |
| Security | helmet.js, rate limiting, CORS domain lock |
| Deployment | Vercel (frontend), Render (backend) |
| PWA | Installable on mobile home screen |

Languages & Technologies
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=threedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)

---

## Project Architecture
Chianya/
├── backend/
│   ├── models/       — User, Conversation, MoodEntry, FutureLetter,
│   │                   StarRating, Wisdom, UserActivity
│   ├── routes/       — auth, antar, mood, activity, wisdom, feedback,
│   │                   futureLetter, starRating, admin
│   ├── services/     — antarService (Groq AI), emailService, weatherReport
│   ├── middleware/   — auth (JWT protect)
│   └── server.js     — Express app, MongoDB connection, cron jobs
│
└── frontend/
├── src/
│   ├── screens/  — 18 screens across the full user journey
│   ├── components/ — ProfileBadge, StarButton, CursorTrail,
│   │                 AmbientSound, InstallButton
│   ├── scenes/   — ForestScene (Three.js 3D world)
│   ├── avatar/   — Antar SVG character with animations
│   ├── context/  — ChianyaContext (global state)
│   └── services/ — api.js (all backend calls)
└── public/
└── sounds/   — 7 ambient audio files with per-mode fade switching

---

## Ethical Commitments

1. **No diagnosis, ever.** Antar is a companion, not a clinician.
2. **No data exploitation.** Emotional data is never sold, never shared.
3. **Crisis safety first.** Any sign of serious distress surfaces real human support immediately.
4. **Accessible by default.** No paywall to access core emotional support tools.
5. **Transparent AI.** Users always know they are speaking with an AI guide.
6. **Culturally grounded.** Language, metaphor, and crisis resources account for South Asian emotional and social contexts.
7. **Release is real.** Content written in Release mode is never stored — by architectural design, not just policy.

---

## Social Impact Alignment

| Framework | Alignment |
|---|---|
| WHO Global Mental Health Action Plan | Addresses youth mental health gap in low-resource settings |
| UNESCO Education for Sustainable Development | Emotional regulation as foundational to quality education |
| UN SDG 3 — Good Health and Wellbeing | Direct contribution to mental wellbeing as a human right |
| UN SDG 4 — Quality Education | Emotional stability as prerequisite for learning |
| UN SDG 10 — Reduced Inequalities | Free, accessible mental support across economic backgrounds |

---

## Current Status

| Component | Status |
|---|---|
| 3D Forest World | ✅ Complete |
| Emotional Check-In Flow | ✅ Complete |
| Antar AI Companion | ✅ Complete |
| Crisis Safety Detection | ✅ Complete |
| All 6 Therapeutic Modes | ✅ Complete |
| Letter to Future Self | ✅ Complete |
| Forest Streak + Badges | ✅ Complete |
| Mood Timeline | ✅ Complete |
| Star Rating System | ✅ Complete |
| Community Impact Counter | ✅ Complete |
| Personal Dashboard | ✅ Complete |
| About / Mission Page | ✅ Complete |
| Creator Page | ✅ Complete |
| Admin Panel | ✅ Complete |
| Mobile Responsive | ✅ Complete |
| PWA Installable | ✅ Complete |
| Ambient Sound System | ✅ Complete |
| Security Layer | ✅ Complete |
| Deployed — Production | ✅ Live |

---

## Who Built This

I am Anchal Bisht — a student, a builder, and someone who believes technology can hold space for human emotion. I created Chianya because I know what it feels like to carry something heavy with nowhere to put it down.

Chianya was born from a simple question: what if there was a space online that felt like sitting beside a calm lake at night — no judgment, no advice, just presence? I built the answer. Every line of code in this project is an attempt to make that feeling real for someone who needs it.

This is not just a portfolio project. It is my attempt to contribute something meaningful to the conversation about youth mental wellbeing. I built Chianya with honesty, care, and the belief that no one should have to carry this alone.

---

## Impact Measure

The measure of success for Chianya is not downloads or revenue.

It is whether a student at 11 PM, carrying something they cannot name, finds this — and feels, even slightly, less alone.

---

> *"The forest is still here. So am I. Take your time."*  
> — Antar, Chianya's inner guide