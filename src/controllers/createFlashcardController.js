const { createFlashcard } = require('../services/createFlashcard');
const logger = require('../lib/logs');
const yup = require('yup');

const schema = yup.object().shape({
    category: yup.string().min(2).required(),
    multiAnswer: yup.boolean().default(false),
    question: yup.string().required('Question is required'),
    answers: yup.array().of(yup.string().max(100).required()).min(1).required(),
    correctAnswer: yup.array().of(yup.string().max(100).required()).min(1).required(),
    definition: yup.array().of(yup.string().max(500))
})

const createFlashcardController = async (req, res) => {
    try {
        const body = req.body;

        schema.validateSync(body);

        const result = await createFlashcard(body);

        res.status(200).json({
            success: true,
            data: result,
            error: null,
            message: "Successfully created new record"
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
            message: "Failed to create new record"
        })
    }
}

module.exports = {
    createFlashcardController,
}