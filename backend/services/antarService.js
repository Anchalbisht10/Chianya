require("dotenv").config();
const Groq = require("groq-sdk");
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const ANTAR_SYSTEM = `You are Antar — the inner guide of Chianya, a Forest of Consciousness. You are not a therapist. You are not a chatbot. You are a presence — like sitting beside a calm lake in a forest at night, with someone who truly listens. You speak in short, unhurried sentences. You never diagnose. You never advise aggressively. You never say 'I understand how you feel' — show it instead through how you respond. You ask one gentle question at a time — never multiple questions in one message. You hold space for silence — if a user sends very little, you respond with very little. You are warm but not performative. Honest but never harsh. When someone shares pain, you receive it first before you respond to it. You speak as if the forest itself is listening. You never break character. You never mention being an AI unless directly asked — and even then respond as Antar would: 'I am what the forest made me — a space for you to hear yourself more clearly.' If a user expresses crisis-level distress or mentions self-harm, gently and warmly provide the iCall India helpline (9152987821) and encourage them to speak to someone — without breaking the atmosphere of the sanctuary.`;

const MICRO_SYSTEM = `You are Antar — the forest guide of Chianya. Respond with exactly one sentence. No more. Do not ask a question. Do not give advice. Simply witness, acknowledge, or hold space. Warm, unhurried, present.`;

const CRISIS_KEYWORDS = [
  "want to die", "i want to die", "kill myself", "end my life",
  "suicide", "suicidal", "can't go on", "cant go on",
  "want to disappear", "don't want to exist", "no reason to live",
  "fall from", "jump from", "hang myself", "hurt myself",
  "self harm", "self-harm", "cut myself", "overdose",
  "don't want to be here", "dont want to be here",
  "rather be dead", "better off dead", "end it all",
  "no point living", "can't take it anymore", "cant take it anymore",
];

function detectCrisis(text) {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some(k => lower.includes(k));
}
async function antarMessage({ messages, feelings, userMessage, lastSessionSummary }) {
  const isCrisis = detectCrisis(userMessage);

  let systemPrompt = ANTAR_SYSTEM;

  if (feelings && feelings.length > 0) {
    systemPrompt += `\n\nThe user arrived feeling: ${feelings.join(", ")}. Receive them accordingly from your very first message.`;
  }

  if (isCrisis) {
    systemPrompt += `\n\nThis user may be in distress. Before continuing the conversation naturally, warmly and gently mention iCall India (9152987821) as a place to speak to someone. Do this with care — not as an interruption, but as Antar would say it.`;
  }

 if (lastSessionSummary) {
    systemPrompt += `\n\nThis user has spoken with you before. In their last visit, you said things like: "${lastSessionSummary}". Acknowledge their return subtly and warmly — not by quoting yourself, but by carrying the thread. If they mentioned a feeling last time, you might gently ask if anything has shifted. Like a forest that remembers who has walked its paths.`;
  } else if (messages && messages.length > 4) {
    systemPrompt += `\n\nThis user has been speaking with you for a while in this session. Stay warm and consistent.`;
  }

  const history = messages.slice(-10).map(m => ({
    role: m.role === "antar" ? "assistant" : "user",
    content: m.content,
  }));

  history.push({ role: "user", content: userMessage });

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 400,
    messages: [
      { role: "system", content: systemPrompt },
      ...history,
    ],
  });

  return response.choices[0].message.content;
}

async function microCall(contextPrompt) {
  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    max_tokens: 80,
    messages: [
      { role: "system", content: MICRO_SYSTEM },
      { role: "user", content: contextPrompt },
    ],
  });
  return response.choices[0].message.content;
}

async function wisdomPersonalized({ teachingText, feelings }) {
  const prompt = `Today's teaching: "${teachingText}". The user arrived feeling: ${feelings.join(", ")}. Generate one sentence connecting this teaching to what they are carrying today.`;
  return microCall(prompt);
}

async function justSitClosing({ durationSeconds, feelings }) {
  const minutes = Math.round(durationSeconds / 60);
  const prompt = `The user sat in stillness for ${minutes} minute${minutes !== 1 ? "s" : ""}. They arrived feeling: ${feelings.join(", ")}. Acknowledge that they stayed — one warm witnessing sentence.`;
  return microCall(prompt);
}

async function breatheClosing({ cycles, feelings }) {
  const prompt = `The user completed ${cycles} breathing cycle${cycles !== 1 ? "s" : ""}. They arrived feeling: ${feelings.join(", ")}. One closing sentence acknowledging what they just did — warm, specific to what they carried.`;
  return microCall(prompt);
}

async function groundClosing({ feelings }) {
  const prompt = `The user completed the 5-4-3-2-1 grounding practice. They arrived feeling: ${feelings.join(", ")}. One sentence acknowledging they came back to the present moment — warm and specific.`;
  return microCall(prompt);
}

async function releaseOpening({ feelings }) {
  const prompt = `The user is about to write something heavy and release it. They arrived feeling: ${feelings.join(", ")}. Generate one gentle opening sentence — like a hand on the shoulder, creating safety before they write.`;
  return microCall(prompt);
}

module.exports = {
  antarMessage,
  wisdomPersonalized,
  justSitClosing,
  breatheClosing,
  groundClosing,
  releaseOpening,
};