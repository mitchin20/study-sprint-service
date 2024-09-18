const express = require('express');
const router = express.Router();
const { categoriesListController } = require("../controllers/categoriesListController"); 
const { filterListController } = require('../controllers/filterListController');
const { createFlashcardController } = require('../controllers/createFlashcardController');
const { updateFlashcardController } = require('../controllers/updateFlashcardController');

router.get('/flashcardCategories', categoriesListController);
router.get('/filterByCategories', filterListController);

router.post('/createFlashcard', createFlashcardController);

router.put('/updateFlashcard/:flashcardId', updateFlashcardController);

module.exports = router;