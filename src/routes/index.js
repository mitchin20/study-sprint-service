const express = require('express');
const router = express.Router();
const { categoriesListController } = require("../controllers/categoriesListController"); 
const { filterListController } = require('../controllers/filterListController');
const { createFlashcardController } = require('../controllers/createFlashcardController');

router.get('/flashcardCategories', categoriesListController);
router.get('/filterByCategories', filterListController);

router.post('/createFlashcard', createFlashcardController);

module.exports = router;