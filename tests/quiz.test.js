// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { shuffle, isCorrect, calculatePercentage, getGrade, formatTimeLeft } = require("../src/quiz.js");

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade gives an A for exactly 90%", () => {
  assert.equal(getGrade(90), "A");
});

test("formatTimeLeft includes the remaining seconds", () => {
  assert.equal(formatTimeLeft(12), "⏱ 12s");
});

test("formatTimeLeft preserves the urgent threshold value", () => {
  assert.equal(formatTimeLeft(5), "⏱ 5s");
});

test("formatTimeLeft displays zero seconds", () => {
  assert.equal(formatTimeLeft(0), "⏱ 0s");
});

test("formatTimeLeft floors fractional seconds", () => {
  assert.equal(formatTimeLeft(4.9), "⏱ 4s");
});

test("formatTimeLeft clamps negative seconds to zero", () => {
  assert.equal(formatTimeLeft(-1), "⏱ 0s");
});

test("formatTimeLeft uses zero for null input", () => {
  assert.equal(formatTimeLeft(null), "⏱ 0s");
});

test("formatTimeLeft uses zero for non-numeric input", () => {
  assert.equal(formatTimeLeft("12"), "⏱ 0s");
});

test("formatTimeLeft uses zero for non-finite input", () => {
  assert.equal(formatTimeLeft(Number.NaN), "⏱ 0s");
});
