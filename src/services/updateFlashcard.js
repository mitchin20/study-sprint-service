const db = require('../db/database');
const logger = require('../lib/logs');

const updateFlashcard = async (recordId, data) => {
    try {
        if (!recordId) {
            throw new Error('Record ID is required');
        }

        const { category, multiAnswer, question, answers, correctAnswer, definition } = data;
        if (!category && !multiAnswer && !question && !answers && !correctAnswer && !definition) {
            throw new Error('No fields to update');
        }

        // SQL query
        const query = `
            UPDATE flashcards
            SET category = COALESCE($2, category),
                multiAnswer = COALESCE($3, multiAnswer),
                question = COALESCE($4, question),
                answers = COALESCE($5, answers),
                correctAnswer = COALESCE($6, correctAnswer),
                definition = COALESCE($7, definition),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *;
        `;

        // SQL query values
        const values = [recordId, category, multiAnswer, question, answers, correctAnswer, definition];

        // Execute query
        const result = await db.query(query, values);

        // Return updated record
        return result.rows[0];
    } catch (error) {
        logger.error(error);
        throw new Error('Failed to update record')
    }
}

module.exports = {
    updateFlashcard,
}