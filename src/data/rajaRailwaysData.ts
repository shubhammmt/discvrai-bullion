export const inputEvents = [
  { time: "09:42", type: "delay", text: "Train 12345 delayed 18 min (caution order, Zone North)", icon: "🚂" },
  { time: "09:45", type: "weather", text: "Heavy rain forecast Zone East (14:00–18:00)", icon: "🌧️" },
  { time: "09:48", type: "staff", text: "Loco pilot S/Shri Kumar (Cluster 7) — medical leave", icon: "👤" },
  { time: "09:50", type: "freight", text: "Rake 5678 empty at Yard X — cement demand +8%", icon: "📦" },
];

export const agentLog = [
  { agent: "Ops", text: "Train 12345 delay detected. Primary corridor blocked. Suggest re-route via alternate track — saves 12 min. Crew shift at Station B needs revision." },
  { agent: "Safety", text: "Weather alert Zone East. Recommend pre-positioning maintenance crew. No overlap with 12345 re-route." },
  { agent: "Revenue", text: "Empty rake 5678 at Yard X. Cement demand +8% today. Suggest Marketing contact Client ABC for 5 MT placement — discount window 4 hrs." },
  { agent: "Ops", text: "Consensus: Re-route 12345, revise crew, pre-position maintenance, flag cement opportunity. Drafting Decision Brief." },
];

export const decisionBrief = {
  summary: "3 actions recommended by Agentic Control Room",
  actions: [
    "Re-route Train 12345 via alternate track — ETA revised -12 min",
    "Pre-position maintenance crew Zone East (weather)",
    "Flag cement opportunity — 5 MT, Yard X, Marketing to contact Client ABC",
  ],
};
