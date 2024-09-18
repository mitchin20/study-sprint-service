const express = require('express');
const router = express.Router();
const { categoriesListController } = require("../controllers/categoriesListController"); 
const { filterListController } = require('../controllers/filterListController');

router.get('/flashcardCategories', categoriesListController);
router.get('/filterByCategories', filterListController);

module.exports = router;