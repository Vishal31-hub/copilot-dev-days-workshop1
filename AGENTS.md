# Project instructions

- Use plain HTML, CSS, and JavaScript. Do not add frameworks, build tools, or npm dependencies unless explicitly requested.
- Keep pure quiz logic in `src/quiz.js`, exported with `module.exports` and tested with Node's built-in `node:test`.
- Keep question data in `src/questions.js` and DOM/event handling in `src/app.js`.
- Keep markup in `src/index.html` and styles in `src/style.css`; preserve script load order: questions, quiz logic, then app.
- Follow the existing JavaScript style: two-space indentation, semicolons, double quotes, and `const`/`let` (never `var`).
- Define all CSS colors as variables in `:root`. Build accessible UI with semantic controls, visible keyboard focus, and `aria-live` for changing status or feedback.
- Run `npm test` to validate changes; all tests should pass. See [workshops/vscode.md](workshops/vscode.md) for workshop details.
- `npm start` serves `src/` on port 8080; Node.js 20+ is expected. If npm is unavailable, consult [README.md](README.md) rather than adding dependencies. See [workshops/vscode.md](workshops/vscode.md) for workshop details.

## How I like code written
- Small functions with clear names and early returns.
- `const`/`let`, never `var`. Comments only for non-obvious logic.