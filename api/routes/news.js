const express = require('express');
const router = express.Router();

const newsController = require('../../controller/newsController')

router.get('/', newsController.getNewsList);

router.get('/:id_news', newsController.getNews);

module.exports = router;