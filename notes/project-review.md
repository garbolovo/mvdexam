# Project Review

Date: 2026-05-15

## Current Structure

The project is a small static quiz application without a build step.

- `index.html` contains the page markup and loads all scripts directly.
- `styles/` contains Skeleton CSS, normalize CSS, and custom styles.
- `topics/` contains quiz datasets for each topic.
- `app.js`, `functions.js`, and `generator-abstraction.js` contain DOM bindings, topic selection, quiz state, and rendering logic.

## Main Improvement Areas

### 1. Normalize Quiz Data

Current data uses numbered object keys such as `question1`, `answer1`, `answer2`, plus a separate `correctAnswers...` array. This is fragile because the question, its answers, and the correct answer can drift out of sync.

Recommended shape:

```js
{
  text: 'Question text',
  answers: ['Answer 1', 'Answer 2', 'Answer 3'],
  correctAnswer: 2
}
```

This keeps each question self-contained and makes validation simpler.

### 2. Add Data Validation

A small validation script should check every topic for:

- missing question text;
- empty answers;
- duplicate answer keys;
- `correctAnswer` values outside the available answer range;
- mismatch between number of questions and number of correct answers.

Issues found during review:

- `topics/sluzba.js`: some questions have correct answer indexes outside the available answers.
- `topics/ognev.js`: question 95 has an empty answer.
- `topics/pravo.js` and `topics/ognev.js`: some objects contain duplicate `answer3` keys, which causes one answer to overwrite another.

### 3. Reduce Global State

The quiz currently relies on globals such as `currentQuestion`, `userAnswers`, `wrongAnswers`, DOM references, and topic functions. This makes reset, replay, and future feature work harder.

Recommended direction:

```js
const state = {
  topic: null,
  currentIndex: 0,
  answers: [],
  mistakes: []
};
```

Then keep quiz transitions in explicit functions such as `selectTopic`, `renderQuestion`, `selectAnswer`, `nextQuestion`, and `resetQuiz`.

### 4. Simplify Topic Selection

`functions.js` repeats almost the same code for every topic. Replace the five separate handlers with one topic registry:

```js
const topics = [
  { id: 'pravo', title: 'Правовая', questions: questionsPravo, correctAnswers: correctAnswersPravo },
  { id: 'police', title: 'О Полиции', questions: questionsPolice, correctAnswers: correctAnswersPolice }
];
```

Then register handlers in a loop.

### 5. Clean Up Entrypoints

`app.js` contains a large commented-out older implementation, while the active quiz logic is in `generator-abstraction.js`. This makes the application entrypoint unclear.

Recommended structure:

```text
src/
  app.js
  quiz.js
  render.js
  data/
    pravo.js
    police.js
    sluzba.js
    npa.js
    ognev.js
scripts/
  validate-data.js
```

For a static site, this can still work without a bundler by using ES modules in the browser.

### 6. Minor HTML And Code Hygiene

- Change `<html lang="en">` to `<html lang="ru">`.
- Quote `id=police` as `id="police"`.
- Remove unused lookup for `#result`.
- Remove leftover `console.log` calls.
- Remove `debug.log` from the repository or add it to `.gitignore`.
- Replace page reload for reset with an explicit state reset.

## Suggested Priority

1. Add data validation.
2. Fix existing dataset issues.
3. Normalize question data.
4. Refactor quiz state and rendering.
5. Clean up HTML, logs, and old commented code.

