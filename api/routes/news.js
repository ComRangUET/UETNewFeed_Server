const express = require('express');
const router = express.Router();
const newsController = require('../../controller/newsController')
const verifyPrivileges = require('../../model/verifyPrivileges');
// get all news 

router.get('/', verifyPrivileges('nhan thong tin'), newsController.getNewsList);

router.get('/getnew/:id_news', newsController.getNew);
module.exports = router;