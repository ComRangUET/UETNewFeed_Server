const express = require('express');
const router = express.Router();

const eventController = require('../../controller/eventController');


//list event and MSSV join

router.get('/listjoin', eventController.getInformationEvent);

//all event need student  

router.get('/', eventController.getInformationEvent);

//post event

router.post('/pst', eventController.postEvent);

//delete event at id

router.delete('/:id',eventController.deleteEvent);

//updata header, place of event has id

router.put('/:id',eventController.putEvent);


module.exports = router;