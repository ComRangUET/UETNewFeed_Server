const express = require('express');
const router = express.Router();

const people = require('../../controller/peopleController');

router.post('/download', people.download);

module.exports = router;