import reporter from 'cucumber-html-reporter';

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": process.env.ENV || 'testing',
    "Browser": "API",
    "Platform": process.platform,
    "Executed": new Date().toISOString(),
  } 
} as const;
console.log('dosya çalışacak')
reporter.generate(options);
console.log('Rapor oluşturuldu: reports/report.html');
