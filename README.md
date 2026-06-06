
> ⚠️ This project is protected under a custom license.
> Code may not be copied, reused, or redistributed without 
> explicit written permission from the author.
> © 2026 Anchal Bisht · All Rights Reserved


# Chianya — Forest of Consciousness

> *"You don't have to explain anything. Just arrive as you are."*

**Chianya** is an open, emotionally intelligent well-being platform built for the generation that is always online, always expected to perform, and rarely given space to simply feel.

---

## The Problem It Solves

Modern youth — students, young professionals, first-generation strivers — are navigating an invisible crisis.

Not the kind that makes headlines. The kind that lives in 2 AM study sessions, in the quiet dread before a presentation, in the numbness after months of pushing through without pause. The kind where someone is technically fine but emotionally drowning.

The existing options are broken:
- **Therapy** is expensive, inaccessible, and carries stigma in many cultures
- **Wellness apps** are clinical, corporate, or gamified in ways that feel hollow
- **Social media** offers distraction, not recovery
- **Doing nothing** is what most young people default to — and it compounds

Chianya addresses the gap between "I'm struggling" and "I need professional help." It is the space that most people never have: a place to pause, feel, and be met with care — without judgment, without diagnosis, without cost.

---

## Who It Specifically Helps

Chianya is built for:

- **Students** under academic pressure — board exams, entrance tests, thesis deadlines, the weight of family expectations
- **Young professionals** experiencing burnout in their first or second jobs, caught between ambition and exhaustion
- **Digitally overwhelmed youth** aged 16–28 who have grown up in an always-on world and don't know what emotional rest looks like
- **People experiencing quiet suffering** — not in crisis, but carrying anxiety, loneliness, emotional numbness, or a sense of being stuck
- **Youth in cultures** where mental health conversations are still stigmatized, where "talking to someone" feels impossible or shameful

Chianya does not require the user to identify as mentally ill. It only requires them to show up.

---

## What It Does (Complete Vision)

When complete, Chianya will offer a full emotional support ecosystem through a visually immersive, forest-world interface guided by **Antar** — the platform's inner guide character.

### Core Experience Flows

| Feature | What It Does |
|---|---|
| **Emotional Check-In** | Users select what they're "carrying" from a curated emotion vocabulary. Antar responds with a reflection, not a prescription. |
| **Antar — Inner Guide** | An AI-powered, emotionally intelligent conversation companion. Not a chatbot. A presence. Responds with grounding, compassion, and wisdom — never clinical advice. |
| **Breathe** | Guided breathing exercises (4-7-8, box breathing) with animated visual feedback to slow the nervous system |
| **Ground** | 5-4-3-2-1 sensory grounding technique to bring users back to the present moment |
| **Release** | A ritual writing space. Write what is heavy. Watch it dissolve. A symbolic act of emotional letting go. |
| **Just Sit** | A dedicated do-nothing space. No prompts, no tasks. Simply rest in the forest. |
| **Wisdom** | Daily philosophical teachings — short, meaningful, tied to the user's emotional state |
| **Mood Tracking** | Lightweight emotional pattern awareness — not overwhelming dashboards, but gentle reflection over time |
| **Anonymous Reflection** | Users can share thoughts without identity — the forest holds it, no one judges it |
| **Resource Section** | Curated, culturally sensitive links to real professional support, crisis lines, and community resources |

### Safety Layer
Chianya will include an ethical crisis detection system. If a user expresses language indicating serious distress or self-harm risk, Antar will gently acknowledge the weight of what was shared and surface appropriate human support resources — without alarming the user or pretending to be a therapist.

---

## Why It Matters

**The scale of the problem is real.**

The World Health Organization identifies depression and anxiety as leading causes of disability among young people globally. In South Asia alone, student suicide rates linked to academic pressure have been documented at alarming levels. Yet mental health infrastructure for youth — especially in middle and lower-income countries — remains severely underfunded and culturally inaccessible.

**The existing digital response is inadequate.**

Most mental health apps are built for Western, English-speaking, middle-class users with insurance. They use clinical language. They require credit cards. They feel like medical software.

**Chianya is different because:**

- It feels like a sanctuary, not a service
- It speaks in emotional truth, not clinical terminology
- It is designed to be accessible to anyone with a browser
- It does not require account creation to begin healing
- It is built with ethical AI principles — no manipulation, no false promises, no diagnosis
- It is grounded in evidence-based techniques (breathing, grounding, reflective journaling) presented through a culturally resonant, visually human interface

---

## The Goal

**Short-term:** Build a fully functional, emotionally thoughtful platform that youth can use today to feel less alone and more grounded.

**Medium-term:** Reach young people in high-stress educational and professional environments across South Asia and beyond — starting with India, expanding to communities where emotional support infrastructure is weakest.

**Long-term:** Become a trusted, community-referenced emotional well-being companion — a platform that educators, student organizations, and youth communities can point to without hesitation. One that sets a standard for what ethical, human-centered mental wellness technology looks like.

**This project is not trying to replace therapists.**
It is trying to make sure that the millions of young people who will never see a therapist have somewhere to go.

---

## Technical Architecture

```
chianya/
├── frontend/          # Immersive visual interface (HTML/CSS/JS)
│   ├── scenes/        # Forest world, emotional flows
│   ├── components/    # Antar guide, breathing animations
│   └── assets/        # Characters, backgrounds, audio
│
├── backend/           # Node.js / Express API server
│   ├── routes/        # API endpoints
│   ├── controllers/   # Business logic
│   ├── models/        # Database schemas
│   └── middleware/    # Auth, safety filters, rate limiting
│
├── database/          # MongoDB / PostgreSQL
│   ├── check-ins      # Emotional state records (anonymized)
│   ├── sessions       # User journey tracking
│   └── reflections    # Anonymous written releases
│
└── ai/                # AI integration layer
    ├── antar/         # Conversation engine (open-source LLM)
    └── safety/        # Crisis detection & resource routing
```

### Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla / lightweight framework)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (flexible schema for emotional data)
- **AI:** Open-source LLM integration (Ollama / Hugging Face / free-tier APIs)
- **Deployment:** Railway / Render / Vercel (accessible, low-cost)

---

## Ethical Commitments

Chianya is built on principles, not just features:

1. **No diagnosis, ever.** Antar is a companion, not a clinician.
2. **No data exploitation.** Emotional check-ins are anonymized and never sold.
3. **Crisis safety first.** Any sign of serious distress surfaces human resources immediately.
4. **Accessible by default.** No paywall to access core emotional support tools.
5. **Transparent AI.** Users always know they are speaking with an AI guide.
6. **Culturally humble.** Language, metaphor, and design account for South Asian emotional contexts.

---

## Current Status

| Component | Status |
|---|---|
| Visual Design & World-Building | ✅ Complete |
| Emotional Check-In Flow | ✅ Built |
| Breathing Exercise | ✅ Built |
| Grounding (5-4-3-2-1) | ✅ Built |
| Release Ritual | ✅ Built |
| Just Sit / Wisdom screens | ✅ Built |
| Antar Conversation (AI) | ✅ Complete |
| Backend API | ✅ Complete |
| Database Integration | ✅ Complete |
| Crisis Safety Layer | ✅ Complete |
| Mood Tracking | ✅ Complete |
| Anonymous Reflection System | ✅ Complete |
| Resource Section | ✅ Complete |
| Mobile Optimization | ✅ Complete |
| Deployment | ✅ Complete |
| Letter to Future Self | ✅ Complete |
| Emotional Weather Report | ✅ Complete |
| Star Ratings & Feedback Wall | ✅ Complete |
| Admin Panel | ✅ Complete |
| Shareable Moment Cards | ✅ Complete |

---

## Impact Direction

Chianya is being developed as a meaningful social-impact platform with the ambition of meeting the standard expected in global youth innovation spaces — including UNESCO youth programs, UNICEF innovation initiatives, international student fellowships, and social-impact showcases.

It is not a portfolio project dressed as social good. It is social good that happens to also be a portfolio.

The measure of success is not downloads or revenue. It is whether a student at 11 PM, carrying something they can't name, finds this and feels — even slightly — less alone.

---

## Built By

**[Anchal Bisht]**
Student | Builder | Believer in emotionally intelligent technology

*Building at the intersection of human emotion and responsible AI.*

---

> *"The forest is still here. So am I. Take your time."*
> — Antar, Chianya's inner guide