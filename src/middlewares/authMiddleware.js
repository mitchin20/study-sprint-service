const jose = require('jose');
const jwt = require('jsonwebtoken');
const logger = require('../lib/logs');

// Use outside middleware function to cache the encoded secret
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
// Permission list
const permisionList = ['BASIC', 'ADMIN', 'ADVANCE'];

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({
            message: "No token provided"
        })
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
        return res.status(400).json({
            message: "Invalid token format"
        })
    }

    const token = tokenParts[1];

    try {
        const { payload } = await jose.jwtVerify(token, secret);
        
        if (!payload.role || !permisionList.includes(payload.role)) {
            return res.status(403).json({
                message: "Insufficient permissions"
            })
        }

        req.user = payload;

        next();
    } catch (error) {
        logger.error(`Unauthorized: ${error}`);

        if (error.code === "ERR_JWT_EXPIRED") {
            return res.status(401).json({
                message: "Token expired"
            })
        }
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = authMiddleware;