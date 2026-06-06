const BASE = process.env.REACT_APP_BACKEND_URL
  ? `${process.env.REACT_APP_BACKEND_URL}/api`
  : "http://localhost:5000/api";

const opts = (method, body) => ({
  method,
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  ...(body ? { body: JSON.stringify(body) } : {}),
});

export const register    = (data) => fetch(`${BASE}/auth/register`, opts("POST", data)).then(r => r.json());
export const login       = (data) => fetch(`${BASE}/auth/login`,    opts("POST", data)).then(r => r.json());
export const logout      = ()     => fetch(`${BASE}/auth/logout`,   opts("POST")).then(r => r.json());
export const getMe       = ()     => fetch(`${BASE}/auth/me`,       opts("GET")).then(r => r.json());
export const sendFutureLetter = (data) => fetch(`${BASE}/future-letter`, opts("POST", data)).then(r => r.json());



export const sendToAntar = (message, feelings, sessionId) =>
  fetch(`${BASE}/antar/message`, opts("POST", { message, feelings, sessionId })).then(r => r.json());

export const logSession  = (mode, feelings, meta) =>
  fetch(`${BASE}/activity/session`, opts("POST", { mode, feelings, meta })).then(r => r.json());
export const getMyActivity    = () =>
  fetch(`${BASE}/activity/mine`, opts("GET")).then(r => r.json());
export const getReleaseOpening = (feelings) =>
  fetch(`${BASE}/activity/release-opening`, opts("POST", { feelings })).then(r => r.json());

export const releaseText = () =>
  fetch(`${BASE}/release`, opts("POST", { content: null })).then(r => r.json());

export const getWisdomToday = (feelings) =>
  fetch(`${BASE}/wisdom/today?feelings=${feelings.join(",")}`, opts("GET")).then(r => r.json());

export const submitFeedback = (data) =>
  fetch(`${BASE}/feedback`, opts("POST", data)).then(r => r.json());

export const getFeedback = () =>
  fetch(`${BASE}/feedback`, opts("GET")).then(r => r.json());

export const deleteFeedback = (id) =>
  fetch(`${BASE}/feedback/${id}`, opts("DELETE")).then(r => r.json());

export const getCommunityStats = () =>
  fetch(`${BASE}/activity/community-stats`, opts("GET")).then(r => r.json());

export const submitRating = (data) =>
  fetch(`${BASE}/ratings`, opts("POST", data)).then(r => r.json());

export const getRatings = () =>
  fetch(`${BASE}/ratings`, opts("GET")).then(r => r.json());

export const deleteRating = (id) =>
  fetch(`${BASE}/ratings/${id}`, opts("DELETE")).then(r => r.json());

export const logMood = (feeling) =>
  fetch(`${BASE}/mood`, opts("POST", { feeling })).then(r => r.json());

export const getMoodTimeline = () =>
  fetch(`${BASE}/mood/timeline`, opts("GET")).then(r => r.json());

export const getStreak = () =>
  fetch(`${BASE}/activity/streak`, opts("GET")).then(r => r.json());