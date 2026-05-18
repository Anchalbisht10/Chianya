require("dotenv").config();
const mongoose = require("mongoose");
const Wisdom   = require("../models/Wisdom");

const teachings = [
  { tag:"awareness",      teachingText:"You are not your thoughts.",                        reflection:"Thoughts arise and pass like clouds. You are the sky — not the storm." },
  { tag:"acceptance",     teachingText:"Suffering comes from resistance.",                  reflection:"Pain is inevitable. Suffering is the story we add to it." },
  { tag:"presence",       teachingText:"This moment is complete.",                          reflection:"Life only ever happens here, now — not in the story your mind tells about it." },
  { tag:"detachment",     teachingText:"Attachment is the root of unrest.",                 reflection:"Loosening the grip on how things should be — even slightly — brings relief." },
  { tag:"self-compassion",teachingText:"Compassion begins with yourself.",                  reflection:"Gentleness toward yourself is not weakness. It is the beginning of wisdom." },
  { tag:"stillness",      teachingText:"Stillness is always available.",                    reflection:"Beneath every wave is a calm ocean. That stillness is not outside you." },
  { tag:"impermanence",   teachingText:"Change is the only constant.",                      reflection:"Everything that feels permanent is already in motion. This too will shift." },
  { tag:"awareness",      teachingText:"What you resist, persists.",                        reflection:"When we stop fighting what we feel, the feeling often softens on its own." },
  { tag:"presence",       teachingText:"The breath is always here.",                        reflection:"Whenever you are lost, your breath is the path back to now." },
  { tag:"acceptance",     teachingText:"You cannot think your way out of a feeling.",       reflection:"Feelings want to be felt — not solved. Let yourself feel it first." },
  { tag:"impermanence",   teachingText:"This feeling is not forever.",                      reflection:"Even the heaviest emotions are visitors. They arrive, stay a while, and leave." },
  { tag:"awareness",      teachingText:"Noticing is the beginning of freedom.",             reflection:"The moment you notice a thought, you are already separate from it." },
  { tag:"self-compassion",teachingText:"You are doing your best with what you have.",       reflection:"Most people are. Including you. Right now." },
  { tag:"stillness",      teachingText:"Rest is not laziness.",                             reflection:"The tree that survives the storm is the one whose roots went deep in stillness." },
  { tag:"detachment",     teachingText:"Let it be uncertain.",                              reflection:"Not everything needs to be resolved today. Uncertainty is not danger." },
  { tag:"presence",       teachingText:"Where your attention goes, your energy flows.",     reflection:"Gently bring your attention back. Again and again. That is the practice." },
  { tag:"acceptance",     teachingText:"Grief is love with nowhere to go.",                 reflection:"What you are mourning was something that mattered. That is not weakness." },
  { tag:"awareness",      teachingText:"The mind moves fast. You don't have to follow.",    reflection:"You can watch the river without jumping in." },
  { tag:"self-compassion",teachingText:"Being kind to yourself is a radical act.",          reflection:"The world is loud about what you should be. Chianya is quiet. So are you." },
  { tag:"impermanence",   teachingText:"Nothing is as permanent as it feels right now.",    reflection:"Your nervous system makes things feel final. Most things are not." },
  { tag:"stillness",      teachingText:"Silence has its own answers.",                      reflection:"Not every question needs an answer today. Some answers come in the quiet." },
  { tag:"detachment",     teachingText:"You can care without carrying everything.",          reflection:"Caring deeply and letting go are not opposites. They can coexist." },
  { tag:"presence",       teachingText:"Five senses. Five doorways home.",                  reflection:"When the mind is lost, the body always knows where it is." },
  { tag:"awareness",      teachingText:"Judgment is exhausting. Curiosity is restoring.",   reflection:"Try observing what you feel — not evaluating it. Just: what is this?" },
  { tag:"acceptance",     teachingText:"Acceptance is not agreement.",                      reflection:"You can accept that something happened without believing it was okay." },
  { tag:"self-compassion",teachingText:"The voice that criticizes you is not the truth.",   reflection:"It is a pattern — an old one. You are allowed to question it." },
  { tag:"impermanence",   teachingText:"Every season ends.",                                reflection:"Even the hard ones. Even the ones that feel endless." },
  { tag:"stillness",      teachingText:"You don't always have to respond.",                 reflection:"Sometimes the wisest thing is to be still and let the moment pass through you." },
  { tag:"detachment",     teachingText:"Expectations create suffering.",                    reflection:"Not because wanting is wrong — but because clinging to outcomes is painful." },
  { tag:"presence",       teachingText:"Your feet are on the ground right now.",            reflection:"Whatever is happening in your mind — your body is safe, here, in this moment." },
  { tag:"awareness",      teachingText:"The present moment has never hurt anyone.",         reflection:"Pain lives in memory and anticipation. Right now, this moment is okay." },
  { tag:"acceptance",     teachingText:"You are allowed to feel what you feel.",            reflection:"Feelings don't need permission. But they do need space." },
  { tag:"self-compassion",teachingText:"Healing is not linear.",                            reflection:"Some days are harder than others. That is not failure. That is being human." },
  { tag:"impermanence",   teachingText:"The forest has survived many storms.",              reflection:"So have you — even the ones you thought you wouldn't." },
  { tag:"stillness",      teachingText:"In stillness, nothing is missing.",                 reflection:"The feeling that something is wrong often dissolves when we stop running from quiet." },
  { tag:"detachment",     teachingText:"Other people's reactions are not yours to carry.",  reflection:"You can care how someone feels without taking responsibility for it." },
  { tag:"presence",       teachingText:"Each breath is a new beginning.",                   reflection:"You don't have to carry what happened in the last breath into this one." },
  { tag:"awareness",      teachingText:"Most fear is about the future.",                    reflection:"And the future is not here yet. Right now, you are okay." },
  { tag:"acceptance",     teachingText:"Vulnerability is courage.",                         reflection:"The willingness to be seen — uncertain, imperfect — is one of the bravest things." },
  { tag:"self-compassion",teachingText:"You are not behind.",                               reflection:"There is no schedule for becoming yourself. You are on time." },
  { tag:"impermanence",   teachingText:"Even joy is impermanent — and that is okay.",       reflection:"Impermanence does not make things less meaningful. It makes them precious." },
  { tag:"stillness",      teachingText:"The forest does not try to be peaceful.",           reflection:"Stillness is its nature. Yours too — beneath all the noise." },
  { tag:"detachment",     teachingText:"Let the thought pass without feeding it.",          reflection:"A thought only grows when we argue with it, agree with it, or fear it." },
  { tag:"presence",       teachingText:"You arrived here. That took courage.",              reflection:"Coming to this space, when you could have numbed — that is already something." },
  { tag:"awareness",      teachingText:"Emotion is information, not instruction.",          reflection:"Feeling anxious does not mean danger is real. Feeling sad does not mean life is hopeless." },
  { tag:"acceptance",     teachingText:"Some things cannot be fixed — only held.",          reflection:"And holding them gently is enough. It is more than enough." },
  { tag:"self-compassion",teachingText:"Rest before you are broken.",                       reflection:"The body asks gently first. Then it asks louder. Listen now." },
  { tag:"impermanence",   teachingText:"You have survived every hard day so far.",          reflection:"One hundred percent. That is your record." },
  { tag:"stillness",      teachingText:"You do not have to earn stillness.",                reflection:"You are allowed to be still without producing anything. Simply being is enough." },
  { tag:"detachment",     teachingText:"You cannot control the waves — only how you float.", reflection:"The practice is not to stop the waves. It is to become a better swimmer." },
  { tag:"presence",       teachingText:"Look around. Name what you see.",                   reflection:"The world is real and present. So are you. Both of you, here, together." },
  { tag:"awareness",      teachingText:"The watcher is not the watched.",                   reflection:"You are not the chaos in your mind. You are the one noticing it." },
  { tag:"acceptance",     teachingText:"Asking for help is not giving up.",                 reflection:"It is the opposite — it is choosing to keep going." },
  { tag:"self-compassion",teachingText:"Your worth is not your productivity.",              reflection:"You are not valuable because of what you produce. You are valuable because you exist." },
  { tag:"impermanence",   teachingText:"The heaviness you feel today is not who you are.",  reflection:"It is what you are carrying right now. It is not your identity." },
  { tag:"stillness",      teachingText:"Slow down before the world makes you.",             reflection:"Choose slowness as a practice. It is a form of resistance and of care." },
  { tag:"detachment",     teachingText:"Release what is not yours to hold.",                reflection:"Some burdens were placed on you by others. You are allowed to set them down." },
  { tag:"presence",       teachingText:"This breath. This moment. This is enough.",         reflection:"Everything else can wait. Right here, right now — this is the whole world." },
  { tag:"awareness",      teachingText:"Awareness without judgment is healing.",            reflection:"See what is there. Name it softly. Do not sentence it." },
  { tag:"acceptance",     teachingText:"Wholeness includes the broken parts.",              reflection:"You do not have to fix yourself to be whole. You already are." },
  { tag:"self-compassion",teachingText:"Speak to yourself as you would a dear friend.",     reflection:"Would you say to a friend what you say to yourself? If not — notice that." },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Wisdom.deleteMany({});
  await Wisdom.insertMany(teachings);
  console.log(`${teachings.length} wisdom teachings seeded.`);
  mongoose.connection.close();
}

seed().catch(console.error);