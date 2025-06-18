<<<<<<< HEAD
# paribu-case-study
=======
# 🧪 Paribu Case Study – UI & API Test Automation

This project is a test automation framework developed as part of a case study for a Senior QA Engineer position. It includes both UI and API test scenarios and follows industry best practices such as BDD, Page Object Model, and multi-browser support.

---

## 📚 Tech Stack

- **Language:** TypeScript
- **Test Runner:** [Cucumber.js](https://github.com/cucumber/cucumber-js)
- **Automation Library:** [Playwright](https://playwright.dev/)
- **BDD Syntax:** Gherkin
- **Assertions:** Playwright Expect
- **Test Design:** Page Object Model (POM)
- **Multi-Browser:** Chromium, Firefox, WebKit
- **Environment Management:** `cross-env`

---

🚀 Running Tests
UI Test Command Examples
Command	Description
npm run test:chromium	Run tests in Chromium
npm run test:firefox	Run tests in Firefox
npm run test:webkit	Run tests in WebKit (Safari engine)

All tests are opened in non-headless mode, in incognito and fullscreen (maximized) mode.



✅ Project Highlights
 Playwright + Cucumber integration with TypeScript

 BDD-style reusable steps

 Page Object Model structure

 Dynamic browser selection

 Viewport is maximized on launch

 Static wait avoided — proper waitFor usage

 Clean code and SOLID principles

 Custom assertion helpers via BasePage

 Easily configurable base URL (via env.ts)

🔍 Notes
this.homePage, this.marketPage, etc. are injected in Cucumber world context via hooks.ts.

To change environments or data, update files in src/config/.

>>>>>>> edc172e (first commit)
