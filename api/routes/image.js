const express = require('express');
const router = express.Router();
const imageController = require('../../controller/imageController');
const verify = require('../../middleware/verify-token');


router.use(verify.verifyToken);

router.post('/image_file', imageController.uploadFile);

module.exports = router;