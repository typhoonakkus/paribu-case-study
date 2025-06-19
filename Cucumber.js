module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require features/**/*.ts',
    '--format json:reports/cucumber_report.json',  
    '--publish-quiet',
    '--format progress'
  ].join(' ')
};
