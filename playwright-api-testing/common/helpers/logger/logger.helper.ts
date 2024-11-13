import winston from "winston";

export default winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.uncolorize({ level: true, message: true, raw: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
        )
      ),
    }),
  ],
});
