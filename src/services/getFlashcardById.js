const db = require('../db/database');
const logger = require('../lib/logs');

const getFlashcardById = async (id) => {
    try {
        const query = `
            SELECT *
            FROM flashcards
            WHERE id = $1;
        `;

        const values = [id];

        const result = await db.query(query, values);

        return result.rows[0];
    } catch (error) {
        logger.error(error);
        throw new Error('Failed to fetch record');
    }
}

module.exports = {
    getFlashcardById,
}