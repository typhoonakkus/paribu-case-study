import fs from 'fs';
import path from 'path';

export class Logger {
  private logFilePath: string;

  constructor(fileName = 'test-execution.log') {
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }
    this.logFilePath = path.join(logsDir, fileName);
  }

  private formatMessage(level: string, message: string) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}\n`;
  }

  log(message: string) {
    const fullMessage = this.formatMessage('LOG', message);
    fs.appendFileSync(this.logFilePath, fullMessage, 'utf8');
    console.log(fullMessage.trim());
  }

  info(message: string) {
    const fullMessage = this.formatMessage('INFO', message);
    fs.appendFileSync(this.logFilePath, fullMessage, 'utf8');
    console.log(fullMessage.trim());
  }

  warn(message: string) {
    const fullMessage = this.formatMessage('WARN', message);
    fs.appendFileSync(this.logFilePath, fullMessage, 'utf8');
    console.warn(fullMessage.trim());
  }

  error(message: string) {
    const fullMessage = this.formatMessage('ERROR', message);
    fs.appendFileSync(this.logFilePath, fullMessage, 'utf8');
    console.error(fullMessage.trim());
  }
}
