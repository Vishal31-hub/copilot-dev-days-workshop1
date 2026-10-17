// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  shuffle,
  isCorrect,
  createQuiz,
  answerQuestion,
  advanceQuestion,
  isQuizFinished,
  calculatePercentage,
  getGrade,
  formatTimeLeft,
} = require("../src/quiz.js");

test("createQuiz starts with a new state for the provided questions", () => {
  const questions = [{ answer: 1 }];
  const state = createQuiz(questions);

  assert.deepEqual(state, { questions, current: 0, score: 0 });
  assert.notEqual(state, questions);
  assert.notEqual(state.questions, questions);
});

test("createQuiz creates a finished state for no questions", () => {
  assert.equal(isQuizFinished(createQuiz([])), true);
});

test("answerQuestion increments the score for a correct answer without mutating state", () => {
  const state = createQuiz([{ answer: 1 }]);
  const result = answerQuestion(state, 1);

  assert.equal(result.correct, true);
  assert.deepEqual(result.state, { ...state, score: 1 });
  assert.notEqual(result.state, state);
  assert.deepEqual(state, { questions: [{ answer: 1 }], current: 0, score: 0 });
});

test("answerQuestion keeps the score for an incorrect answer", () => {
  const state = createQuiz([{ answer: 1 }]);
  const result = answerQuestion(state, 0);

  assert.equal(result.correct, false);
  assert.deepEqual(result.state, state);
  assert.notEqual(result.state, state);
});

test("answerQuestion treats a null selection as incorrect", () => {
  const state = createQuiz([{ answer: 1 }]);
  const result = answerQuestion(state, null);

  assert.equal(result.correct, false);
  assert.equal(result.state.score, 0);
});

test("advanceQuestion returns a new state with the next index", () => {
  const state = createQuiz([{ answer: 0 }, { answer: 1 }]);
  const nextState = advanceQuestion(state);

  assert.equal(nextState.current, 1);
  assert.equal(state.current, 0);
  assert.notEqual(nextState, state);
});

test("isQuizFinished detects the last question boundary", () => {
  const state = { questions: [{}, {}], current: 2, score: 0 };

  assert.equal(isQuizFinished({ ...state, current: 1 }), false);
  assert.equal(isQuizFinished(state), true);
});

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
