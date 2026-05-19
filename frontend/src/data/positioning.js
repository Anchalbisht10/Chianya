// ── Chianya Global Positioning Document ──────────────────────
// Version 1.0 — Youth Wellbeing Prototype

export const positioning = {

  name: "Chianya",
  origin: "Derived from Sanskrit: Chittaranya — Forest of Consciousness",
  version: "1.0 — Prototype",

  // ── One-line pitch ──────────────────────────────────────────
  pitch: "An immersive AI emotional reflection system for young people — where the forest listens.",

  // ── What it is ──────────────────────────────────────────────
  what: {
    short: "A cinematic AI space for emotional reflection and mindfulness.",
    long: `Chianya is a browser-based immersive environment that uses a 3D sacred forest, 
a Buddhist-inspired avatar guide, and AI-powered conversation to help young people 
pause, reflect, and process what they are feeling — without clinical language, 
without diagnoses, and without pressure.`,
  },

  // ── What it is NOT ──────────────────────────────────────────
  notTherapy: `Chianya is not a mental health platform, a diagnostic tool, 
or a replacement for professional support. It is a digital wellbeing 
exploration environment that creates space for reflection.`,

  // ── Who it serves ───────────────────────────────────────────
  audience: {
    primary: "Young people aged 14–28",
    context: [
      "Students navigating academic pressure",
      "Young professionals experiencing burnout",
      "Individuals processing emotional heaviness without clinical need",
      "Anyone seeking a mindful pause in a digital space",
    ],
  },

  // ── Core experience modes and their wellbeing meaning ───────
  modes: {
    antar: {
      name: "Antar — Inner Guide",
      type: "AI conversation",
      wellbeing: "Non-judgmental reflection partner. Supports emotional labeling and self-expression.",
      notThis: "Not a therapist, not a chatbot. A wise mirror.",
    },
    breathe: {
      name: "Breathe",
      type: "Guided physiological practice",
      wellbeing: "4-7-8 breathing activates the parasympathetic nervous system. Reduces acute stress.",
      evidence: "Jerath et al. (2006) — slow breathing and autonomic balance",
    },
    release: {
      name: "Release",
      type: "Expressive writing + visual dissolution",
      wellbeing: "Expressive writing improves emotional processing and reduces rumination.",
      evidence: "Pennebaker (1997) — writing to heal",
    },
    ground: {
      name: "Ground",
      type: "5-4-3-2-1 sensory grounding",
      wellbeing: "Interrupts anxiety loops by anchoring attention to present sensory experience.",
      evidence: "CBT-standard grounding protocol for anxiety",
    },
    wisdom: {
      name: "Wisdom",
      type: "Contemplative teaching + practice",
      wellbeing: "Psychoeducation through Buddhist philosophy. Supports cognitive reframing.",
      evidence: "Mindfulness-based cognitive therapy (MBCT) foundations",
    },
    justSit: {
      name: "Just Sit",
      type: "Unstructured stillness",
      wellbeing: "Permission to be present without task. Reduces cognitive overload.",
      evidence: "Default Mode Network rest — reduces rumination (Buckner et al., 2008)",
    },
    forestImmersion: {
      name: "Forest Environment",
      type: "3D immersive ambient system",
      wellbeing: "Nature immersion reduces cortisol and restores directed attention.",
      evidence: "Kaplan (1995) — Attention Restoration Theory",
    },
  },

  // ── Global alignment ─────────────────────────────────────────
  globalAlignment: [
    {
      body: "World Health Organization",
      framework: "WHO Mental Health Action Plan 2013–2030",
      relevance: "Youth mental health — early intervention, digital tools, non-clinical support",
    },
    {
      body: "UNESCO",
      framework: "Global Framework for Education — Social-Emotional Learning",
      relevance: "Emotional awareness, self-regulation, and reflective capacity as educational outcomes",
    },
    {
      body: "United Nations",
      framework: "SDG 3 — Good Health and Wellbeing",
      relevance: "Mental wellbeing as a component of holistic health",
    },
    {
      body: "United Nations",
      framework: "SDG 4 — Quality Education",
      relevance: "Social-emotional learning as part of holistic education systems",
    },
  ],

  // ── Technology stack ─────────────────────────────────────────
  tech: {
    frontend: "React.js + Three.js + Framer Motion",
    ai: "Claude (Anthropic) — conversational reflection engine",
    rendering: "React Three Fiber — 3D immersive environment",
    backend: "Node.js + Express (planned)",
    database: "MongoDB — mood logs, session data, journal entries (planned)",
  },

  // ── Prototype status ─────────────────────────────────────────
  status: {
    current: "Frontend prototype — fully functional immersive experience",
    next: [
      "Backend integration — mood logging and session persistence",
      "MongoDB — journal and reflection storage",
      "Pattern recognition — emotional trend awareness over time",
      "Accessibility layer — screen reader support, reduced motion mode",
      "Mobile optimization — PWA packaging",
    ],
  },

  // ── Ethical commitments ──────────────────────────────────────
  ethics: {
    privacy: "No user data sold. No advertising. No surveillance.",
    safety: "Not a crisis tool. Users in distress directed to professional support.",
    transparency: "AI responses clearly attributed to Antar — never presented as human.",
    inclusion: "Secular framing of Buddhist principles — accessible to all backgrounds.",
    noPathologizing: "Chianya does not label, diagnose, or categorize users.",
  },

};

export default positioning;