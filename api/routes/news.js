const express = require('express');
const router = express.Router();
const newsController = require('../../controller/newsController')
const verifyPrivileges = require('../../model/verifyPrivileges');
// get all news 

router.get('/', verifyPrivileges('nhan thong tin'), newsController.getNewsList);

router.get('/getnews/:id_news', newsController.getNews);
module.exports = router;