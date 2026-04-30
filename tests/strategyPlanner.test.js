const test = require("node:test");
const assert = require("node:assert/strict");
const { buildWeeklyPlan, prioritizeIdeas } = require("../src/strategyPlanner");

test("prioritizeIdeas sorts by weighted value", () => {
  const ideas = [
    { title: "Low effort post", channel: "telegram", impact: 5, confidence: 7, effort: 2 },
    { title: "Deep YouTube tutorial", channel: "youtube", impact: 9, confidence: 8, effort: 4 }
  ];

  assert.equal(prioritizeIdeas(ideas)[0].title, "Deep YouTube tutorial");
});

test("buildWeeklyPlan respects capacity", () => {
  const plan = buildWeeklyPlan([
    { title: "A", channel: "youtube", impact: 9, confidence: 9, effort: 3 },
    { title: "B", channel: "blog", impact: 6, confidence: 8, effort: 2 },
    { title: "C", channel: "linkedin", impact: 4, confidence: 6, effort: 1 }
  ], 2);

  assert.equal(plan.length, 2);
  assert.equal(plan[0].day, "Monday");
});

