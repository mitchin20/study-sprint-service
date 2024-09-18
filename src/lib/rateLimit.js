const rateLimit = require('express-rate-limit');

// limit each IP to 10 request per windowMs
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10
});

module.exports = limiter;