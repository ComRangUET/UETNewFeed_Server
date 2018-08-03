const express = require('express');
const router = express.Router();
const newsController = require('../../controller/newsController')
    // get all news 

router.get(':index', newsController.getNewsList);

router.get('/getContentNews/:id_news', newsController.getContentNews);

module.exports = router;