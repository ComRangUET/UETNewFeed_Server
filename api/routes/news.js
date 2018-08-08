const express = require('express');
const router = express.Router();

const newsController = require('../../controller/newsController')

router.get('/', newsController.getNewsList);

router.get('/getnews', newsController.getNews);

module.exports = router;