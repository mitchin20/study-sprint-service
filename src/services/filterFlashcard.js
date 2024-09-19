const db = require('../db/database');
const logger = require('../lib/logs');

const filterFlashcard = async (categories) => {
    try {
        const query = `
            SELECT *
            FROM flashcards
            WHERE category = ANY($1);
        `;

        const values = [categories];

        const result = await db.query(query, values);

        return result.rows;
    } catch (error) {
        logger.error(error);
        throw new Error('Failed to fetch record');
    }
}

module.exports = {
    filterFlashcard,
}