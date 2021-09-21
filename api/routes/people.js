const express = require('express');
const router = express.Router();

const people = require('../../controller/peopleController');

router.get('/download/:file_name', people.download);

module.exports = router;