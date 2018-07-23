const express = require('express');
const app = express();
const eventRouter = require('./api/routes/event');
const news = require('./api/routes/news');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const newsTool = require('./toolNews/listEvent');

// connect to mysql

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/event', eventRouter);
app.use('/api/news', news);

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
