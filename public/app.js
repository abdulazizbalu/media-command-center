const ideas = [
  { title: "AI workflow mini-course teaser", channel: "youtube", impact: 9, confidence: 8, effort: 4 },
  { title: "Before/after automation thread", channel: "linkedin", impact: 7, confidence: 8, effort: 2 },
  { title: "Daily prompt teardown", channel: "shortform", impact: 8, confidence: 7, effort: 2 },
  { title: "Community Q&A recap", channel: "telegram", impact: 5, confidence: 9, effort: 1 }
];

const weights = { youtube: 1.25, shortform: 1.1, linkedin: 1, telegram: 0.9 };

function scoreIdea(idea) {
  return Number(((idea.impact * idea.confidence * (weights[idea.channel] || 1)) / idea.effort).toFixed(2));
}

const ranked = ideas.map((idea) => ({ ...idea, score: scoreIdea(idea) })).sort((a, b) => b.score - a.score);
const days = ["Monday", "Wednesday", "Friday", "Sunday"];

document.querySelector("#stats").innerHTML = [
  ["Ideas", ideas.length],
  ["Top score", ranked[0].score],
  ["Channels", new Set(ideas.map((idea) => idea.channel)).size]
].map(([label, value]) => `<article><strong>${value}</strong><span>${label}</span></article>`).join("");

document.querySelector("#ideas").innerHTML = ranked.map((idea) => `
  <article class="idea">
    <div>
      <strong>${idea.title}</strong>
      <span>${idea.channel}</span>
    </div>
    <b>${idea.score}</b>
  </article>
`).join("");

document.querySelector("#plan").innerHTML = ranked.slice(0, 4).map((idea, index) => `
  <article>
    <span>${days[index]}</span>
    <strong>${idea.title}</strong>
    <small>${idea.channel} / score ${idea.score}</small>
  </article>
`).join("");
