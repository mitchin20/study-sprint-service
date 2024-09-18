const logger = require('../lib/logs');
const data = require('../mockData/data.json');

const categoriesListController = async (req, res) => {
    try {
        const list = data.flashcards;
        if (!list) {
            return res.status(404).json({
                success: false,
                data: null,
                error: null,
                message: "Flashcard list not available at the moment!"
            })
        }

        const categories = [...new Set(list.map(fc => fc.category))];

        if (!categories) {
            return res.status(404).json({
                success: false,
                data: null,
                error: null,
                message: "Flashcard category list not available at the moment!"
            })
        }

        res.status(200).json({
            success: true,
            data: categories,
            error: null,
            message: "Successfully fetch Flashcard list"
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
            message: "Failed to fetch Flashcard list"
        })
    }
}

module.exports = {
    categoriesListController,
}