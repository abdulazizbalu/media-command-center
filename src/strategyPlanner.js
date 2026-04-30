const CHANNEL_WEIGHTS = {
  youtube: 1.25,
  shortform: 1.1,
  linkedin: 1,
  telegram: 0.9,
  blog: 0.95
};

function scoreIdea(idea) {
  const impact = Number(idea.impact || 0);
  const confidence = Number(idea.confidence || 0);
  const effort = Math.max(Number(idea.effort || 1), 1);
  const channelWeight = CHANNEL_WEIGHTS[String(idea.channel || "").toLowerCase()] || 1;
  return Number(((impact * confidence * channelWeight) / effort).toFixed(2));
}

function prioritizeIdeas(ideas) {
  return ideas
    .map((idea) => ({ ...idea, score: scoreIdea(idea) }))
    .sort((a, b) => b.score - a.score);
}

function buildWeeklyPlan(ideas, capacity = 3) {
  return prioritizeIdeas(ideas).slice(0, capacity).map((idea, index) => ({
    day: ["Monday", "Wednesday", "Friday", "Sunday"][index] || "Next week",
    title: idea.title,
    channel: idea.channel,
    score: idea.score
  }));
}

module.exports = { scoreIdea, prioritizeIdeas, buildWeeklyPlan };

