const logger = require('../lib/logs');
const { filterFlashcard } = require('../services/filterFlashcard');

const filterFlashcardController = async (req, res) => {
    try {
        const { categories } = req.body;
        if (!categories || !Array.isArray(categories)) {
            return res.status(409).json({
                success: false,
                data: null,
                error: "Missing filter values",
                message: "No record found"
            })
        }

        const result = await filterFlashcard(categories);
        if (!result) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "No record found",
                message: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: result,
            error: null,
            message: "Successfully fetched record"
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
            message: "Failed to fetch data"
        })
    }
}

module.exports = {
    filterFlashcardController,
}