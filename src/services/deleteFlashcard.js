const db = require('../db/database');
const logger = require('../lib/logs');

const deleteFlashcard = async (id) => {
    try {
        const query = `
            DELETE FROM flashcards
            WHERE id = $1
            RETURNING id;
        `

        const values = [id];

        const result = await db.query(query, values);

        return result.rows[0];
    } catch (error) {
        logger.error(error);
        throw new Error('Failed to delete record');
    }
}

module.exports = {
    deleteFlashcard
}