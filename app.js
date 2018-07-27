const express = require('express');
const app = express();
const eventRouter = require('./api/routes/event');
const news = require('./api/routes/news');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const newsTool = require('./toolNews/listEvent');
const admin = require('./api/routes/admin');
const student = require('./api/routes/student');

// connect to mysql

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/admin/event', eventRouter);
app.use('/api/admin/news', news);
app.use('/api/admin', admin);

app.use('/api/student', student);
/* app.use('/', function(req, res){
    res.send('Welcome to home page');
}) */



app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
})

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

setInterval(newsTool,1000);

module.exports = app;
