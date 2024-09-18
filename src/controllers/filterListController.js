const data = require('../mockData/data.json');
const logger = require('../lib/logs');

const filterListController = async (req, res) => {
    try {
        const { categories } = req.body;

        if (!categories || !Array.isArray(categories)) {
            return res.status(409).json({
                success: false,
                data: null,
                error: "Missing filter values",
                message: "Missing filter values"
            })
        }

        const list = data.flashcards;
        if (!list) {
            return res.status(404).json({
                success: false,
                data: null,
                error: null,
                message: "Flashcard list not available at the moment!"
            })
        }

        const filteredData = list.filter(fc => categories.includes(fc.category));

        res.status(200).json({
            success: true,
            data: filteredData,
            error: null,
            message: "Successfully fetched flashcard data"
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
            message: "Failed to fetch flashcard data"
        })
    }
}

module.exports = {
    filterListController,
}