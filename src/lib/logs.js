require('winston-daily-rotate-file');
const winston = require('winston');
const { combine, timestamp, printf, colorize } = winston.format;

// Configure daily rotate file transport
const transports = new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log', // Log files pattern with date
    datePattern: 'MM-DD-YYYY', // Date format in log file name
    zippedArchive: true, // Compress old log files
    maxSize: '20m', // Maximum size of a log file
    maxFiles: '14d' // Maximum number of days to keep logs
})

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Create a logger instance
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(), // Add timestamp to logs
        colorize(), // Add colors to log levels
        logFormat
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        transports,
        // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to file
        // new winston.transports.File({ filename: 'logs/combined.log' }) // Log all to file
    ]
});

module.exports = logger;