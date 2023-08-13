import log4js, { LoggingEvent } from 'log4js';
import { ILogger } from './commons/ILogger';
import { injectable } from 'inversify';

@injectable()
export class LoggerLog4JS implements ILogger<log4js.Logger> {

    private logger: log4js.Log4js;
    constructor() {
        this.configure();
    }
    configure(): void {
        this.logger = log4js.configure({
            appenders: {
                out: {
                    type: 'stdout',
                    layout: {
                        type: 'pattern',
                        pattern: '%[[%d{yyyy-MM-dd hh:mm:ss}] [%p]%] %m',
                        tokens: {
                            coloredLevel: (logEvent: LoggingEvent) => {
                                const level = logEvent.level.levelStr;
                                let color = '\x1b[0m';

                                if (level === 'TRACE') {
                                    color = '\x1b[36m';
                                } else if (level === 'DEBUG') {
                                    color = '\x1b[32m';
                                } else if (level === 'INFO') {
                                    color = '\x1b[34m';
                                } else if (level === 'WARN') {
                                    color = '\x1b[33m';
                                } else if (level === 'ERROR') {
                                    color = '\x1b[31m';
                                } else if (level === 'FATAL') {
                                    color = '\x1b[35m';
                                }
                                return `${color + level}\x1b[0m`;
                            },
                        },
                    },
                },
            },
            categories: {
                default: { appenders: ['out'], level: 'debug' },
            },
        });
    }
    getConfiguredLogger(): log4js.Logger {
        return this.logger.getLogger();
    }
}