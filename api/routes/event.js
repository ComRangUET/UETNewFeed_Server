const express = require('express');
const router = express.Router();

const eventController = require('../../controller/eventController');


//list event and MSSV join

router.get('/get_list_event', eventController.getListEvent);

//post event

router.post('/post_event', eventController.postEvent);

//delete event at id

router.delete('/delete_event/:id_event',eventController.deleteEvent);

//updata header, place of event has id

router.put('/:id',eventController.putEvent);


module.exports = router;