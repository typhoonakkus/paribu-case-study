import reporter, { Options } from 'cucumber-html-reporter';
import path from 'path';

const options: Options = {
  theme: 'bootstrap', 
  jsonFile: path.join(__dirname, 'cucumber_report.json'),
  output: path.join(__dirname, 'cucumber_report.html'),
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "Test Environment": "STAGING",
    "Browser": process.env.BROWSER || "chromium",
    "Platform": process.platform,
    "Executed": "Local"
  }
};

reporter.generate(options);
