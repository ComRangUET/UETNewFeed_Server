const express = require('express');
const router = express.Router();

const eventController = require('../../controller/eventController');
const bodyParser = require('body-parser');
const verifyPrivileges = require('../../middleware/verifyPrivileges');
const verifyToken = require('../../middleware/verify-token');
//list event and MSSV join
router.use(verifyToken.verifyToken);

router.get('/get_list_event', eventController.getListEvent);

router.get('/get_event/:id', eventController.getEventContent);

//post event
router.post('/post_event', eventController.postEvent);

//delete event at id

router.delete('/delete_event/:id_event', eventController.deleteEvent);

//update header, place of event has id

router.put('/:id', eventController.putEvent);


module.exports = router;