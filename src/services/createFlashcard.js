const db = require('../db/database');
const logger = require('../lib/logs');

const createFlashcard = async (data) => {
    try {
        // Prepare columns and values
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

        // SQL query to insert new record
        const query = `
            INSERT INTO flashcards(${columns})
            VALUES (${placeholders})
            RETURNING *;
        `

        // Execute the query
        const result = await db.query(query, values);

        // return the created record
        return result.rows[0];
        
    } catch (error) {
        logger.error(error);
        throw new Error('Failed to create new Flashcard record', error.message);
    }
}

module.exports = {
    createFlashcard,
}