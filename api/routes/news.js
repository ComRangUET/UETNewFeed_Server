const express = require('express');
const router = express.Router();
const newsController = require('../../controller/newsController')
const verifyModel = require('../../model/verify');
// get all news 

router.get('/', newsController.getNewsList);

module.exports = router;