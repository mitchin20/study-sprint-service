const express = require('express');
const router = express.Router();
const { categoriesListController } = require("../controllers/categoriesListController"); 
const { filterListController } = require('../controllers/filterListController');
const { createFlashcardController } = require('../controllers/createFlashcardController');
const { updateFlashcardController } = require('../controllers/updateFlashcardController');
const { deleteFlashcardController } = require('../controllers/deleteFlashcardController');
const { filterFlashcardController } = require('../controllers/filterFlashCardController');

router.get('/flashcardCategories', categoriesListController);
// from .json file
router.get('/filterByCategories', filterListController);
// from database
router.get('/flashcardCategories', categoriesListController);
router.get('/filterFlashcard', filterFlashcardController)

router.post('/createFlashcard', createFlashcardController);

router.put('/updateFlashcard/:flashcardId', updateFlashcardController);

router.delete('/deleteFlashcard/:flashcardId', deleteFlashcardController)

module.exports = router;