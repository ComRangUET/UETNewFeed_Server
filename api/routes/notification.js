const express = require('express');
const router = express();
const notificationController = require('../../controller/notification-controller');
const verify = require('../../middleware/verify-token');

router.use(verify.verifyToken);

router.put('/work_with_token', notificationController.putToken);

router.post('/work_with_content_notification', notificationController.sendNotification)

module.exports = router;