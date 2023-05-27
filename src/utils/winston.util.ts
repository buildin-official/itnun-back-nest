import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

const env = process.env.NODE_ENV;
const logDir = process.cwd() + '/log'; // Log File Directory

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 90, // days of file
    zippedArchive: true,
  };
};

// rfc5424 log level
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: env === 'production' ? 'http' : 'debug',
      // production 환경이라면 http Level, 개발환경이라면 debug Level
      format:
        env === 'production'
          ? // production 환경은 simple 포맷
            winston.format.simple()
          : winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike('ITNUN', {
                prettyPrint: true,
              }),
            ),
    }),

    // info, warn, error 로그는 파일로 관리
    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
});
