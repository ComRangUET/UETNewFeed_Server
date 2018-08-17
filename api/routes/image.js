const express = require('express');
const router = express.Router();
const imageController = require('../../controller/imageController');
const verify = require('../../middleware/verify-token');

router.post('/image_file',verify.verifyToken, imageController.uploadFile);

module.exports = router;