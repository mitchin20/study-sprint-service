const db = require('../db/database');
const logger = require("../lib/logs");

const getUser = async (email) => {
    try {
        // User table was created using Prisma with double quote.
        // Must use "" to get user or users
        const query = `
            SELECT *
            FROM "User"
            WHERE email = $1;
        `;

        const values = [email];

        const result = await db.query(query, values);

        return result.rows[0];
    } catch (error) {
        logger.error(error);
        throw new Error('Failed to fetch user data');
    }
}

module.exports = {
    getUser,
}