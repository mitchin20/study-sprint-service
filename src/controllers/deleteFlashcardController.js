const logger = require('../lib/logs');
const { deleteFlashcard } = require('../services/deleteFlashcard');
const { getFlashcardById } = require('../services/getFlashcardById');

const deleteFlashcardController = async (req, res) => {
    try {
        const { flashcardId } = req.params;
        if (!flashcardId) {
            return res.status(409).json({
                success: false,
                data: null,
                error: "Missing flashcard ID",
                message: "No record found with the provided ID"
            })
        }

        const exisitingRecord = await getFlashcardById(flashcardId);
        if (!exisitingRecord) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "Record not found",
                message: "No record found with the provided ID"
            })
        }

        const result = await deleteFlashcard(flashcardId);

        res.status(200).json({
            success: true,
            data: result,
            error: null,
            message: "Successfully deleted record"
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
            message: "Failed to delete record"
        })
    }
}

module.exports = {
    deleteFlashcardController,
}