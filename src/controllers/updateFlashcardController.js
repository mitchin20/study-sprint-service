const logger = require('../lib/logs');
const yup = require('yup');
const { updateFlashcard } = require('../services/updateFlashcard');
const { getFlashcardById } = require('../services/getFlashcardById');

const schema = yup.object().shape({
    category: yup.string().min(2).required(),
    multiAnswer: yup.boolean().default(false),
    question: yup.string().required('Question is required'),
    answers: yup.array().of(yup.string().max(100).required()).min(1).required(),
    correctAnswer: yup.array().of(yup.string().max(100).required()).min(1).required(),
    definition: yup.array().of(yup.string().max(500))
})

const updateFlashcardController = async (req, res) => {
    try {
        const { flashcardId } = req.params;
        const body = req.body;

        if (!flashcardId) {
            return res.status(500).json({
                success: false,
                data: null,
                error: "Missing flashcard ID",
                message: "Failed to update record"
            })
        }
        schema.validateSync(body);

        const existingRecord = await getFlashcardById(flashcardId);
        if (!existingRecord) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "Record not found",
                message: "No record not found with the provided ID"
            })
        }

        const result = await updateFlashcard(flashcardId, body);
        if (!result) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "Flashcard not found",
                message: "No record found with the provided ID"
            })
        }

        res.status(200).json({
            success: true,
            data: result,
            error: null,
            message: "Successfully updated record"
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
            message: "Failed to update record"
        })
    }
}

module.exports = {
    updateFlashcardController,
}