const express = require('express');
const router = express.Router();
const newsController = require('../../controller/newsController')

// get all news 

router.get('/', newsController.getNews);

module.exports = router;