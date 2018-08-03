const express = require('express');
const app = express();
const eventRouter = require('./api/routes/event');
const news = require('./api/routes/news');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const newsTool = require('./toolNews/listEvent');
const admin = require('./api/routes/admin');
const student = require('./api/routes/student');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const account = require('./api/routes/account');
// connect to mysql
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/admin/event', eventRouter);
app.use('/api/news', news);
app.use('/api/admin', admin);
app.use('/api', account);
app.use('/api/v1', student);
/* app.use('/', function(req, res){
    res.send('Welcome to home page');
}) */



app.use((req, res, next) => {
    const err = new Error('Not found');
    res.status(404).json({
        messsage: err.message
    })
})

// setInterval(newsTool, 1000);

module.exports = app;