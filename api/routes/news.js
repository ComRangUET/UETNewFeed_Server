const express = require('express');
const router = express.Router();


const newsController = require('../../controller/newsController')
     
router.get('/:index', newsController.getNewsList);

router.get('/getnews/:id_news', newsController.getNews);

module.exports = router;