# Playwright + Cucumber (JavaScript) Example

![Playwright](https://img.shields.io/badge/Playwright-Enabled-brightgreen)
![Cucumber](https://img.shields.io/badge/Cucumber-Gherkin-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-yellow)

This repository contains an automated end-to-end testing setup using [Playwright](https://playwright.dev/) and [Cucumber](https://cucumber.io/docs/installation/javascript/) with Gherkin syntax and JavaScript.

## 🚀 Features

- Uses **DuckDuckGo** to demonstrate search functionality.
- Built with **Page Object Model** (POM) structure.
- Includes:
  - `Scenario Outline` with multiple examples.
  - Custom helper utilities.
  - **Playwright Tracing** enabled per scenario.
  - **Screenshots on failure**.
  - Timestamped trace and screenshot files.
  - Clean setup with VS Code compatibility.

---

## 🧰 Requirements

- Node.js (v18+ recommended)
- Git Bash / Terminal
- Google Chrome or Chromium (optional for headed runs)

> ⚠️ This project has been tested with Node.js v18–v20. Newer versions (e.g. v22) may work but could display warnings from Cucumber. You can ignore them unless errors occur.

---

## 📦 Installation

```bash
npm install
npx playwright install
```

---

## 🧪 Running Tests

```bash
npx cucumber-js
```

Run only scenarios with a specific tag:

```bash
npx cucumber-js --tags @search
```

---

## 🔍 Playwright Tracing

Tracing is enabled per scenario. Each `.zip` trace file is saved to the `traces/` directory with a timestamped name.

### Open a trace file:

```bash
npx playwright show-trace traces/<filename>.zip
```

To open all traces:

**Bash**:

```bash
for f in traces/*.zip; do npx playwright show-trace "$f"; done
```

**PowerShell**:

```powershell
Get-ChildItem -Path traces -Filter *.zip | ForEach-Object { npx playwright show-trace $_.FullName }
```

---

## 📸 Screenshots on Failure

If a scenario fails, a screenshot is automatically saved to `reports/failures/`.

---

## 🔁 Hooks

The project uses `Before` and `After` hooks to:

- Start and stop Playwright tracing per scenario.
- Capture screenshots on scenario failure.
- Close the browser context after each test.

See `features/hooks.js` for implementation details.

---

## 📝 Project Structure

```
project-root/
├── features/
│   ├── duckduckgo_search.feature
│   ├── steps/
│   │   └── duckduckgo_steps.js
│   └── hooks.js
├── pages/
│   └── DuckDuckGoPage.js
├── utils/
│   └── helpers.js
├── reports/
│   └── failures/
├── traces/
├── package.json
├── cucumber.js
└── playwright.config.js
```

---

## 🧼 Clean Commands

To delete traces, screenshots, and compiled files:

```bash
rm -r traces/
rm -r reports/failures/
```

---

## ✅ Recommended VS Code Extensions

- **Cucumber (Gherkin) Full Support** by Alexander Krechik
- **Playwright Test for VSCode** by Microsoft
- **JavaScript ESLint** for linting

---

## 🧪 Example Feature

```gherkin
Feature: DuckDuckGo Search

  @search
  Scenario Outline: Search <term> and verify link
    Given I open the browser and go to DuckDuckGo
    When I search for "<term>"
    Then I should see "<expected>" in the results

    Examples:
      | term      | expected        |
      | mercadona | mercadona.es    |
      | openai    | openai.com      |
```

---

## 🤝 Contributing

Pull requests and issues are welcome!
