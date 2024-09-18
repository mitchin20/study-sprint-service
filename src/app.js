require('dotenv').config();
const db = require('./db/database');
const limiter = require('./lib/rateLimit');
const logger = require('./lib/logs');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Secure app by setting various HTTP headers
app.use(helmet());

// Logger middleware: config morgan to use winston as the stream
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
app.use(limiter);

// // Logger Middleware
// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     next();
// });

// Health check
app.get('/health', (req, res) => {
    res.send('Application is healthy');
});

// Root route
app.get('/', (req, res) => {
    res.send('Study Sprint is running...');
});

// Handle Unknown Routes (404)
app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send("Server Error");
});

const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

// Shut down database connection pool on exit
const shutDownDbConnection = () => {
    server.close(() => {
        db.pool.end((err) => {
            if (err) {
                logger.error('Error closing database connection:', err);
            } else {
                logger.info("Database connection has ended");
            }
            process.exit(0);
        });
    });
};

// Setup shutdown listeners for graceful shutdown
const setupShutDownListener = () => {
    process.on('SIGTERM', shutDownDbConnection);
    process.on('SIGINT', shutDownDbConnection);
    process.on('uncaughtException', (err) => {
        logger.error('Uncaught Exception:', err);
        shutDownDbConnection();
    });
    process.on('unhandledRejection', (reason, promise) => {
        logger.error('Unhandled Rejection:', reason, promise);
        shutDownDbConnection();
    });
}

setupShutDownListener();

module.exports = app;