const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3005;

http.createServer(app);

app.listen(port, function(err) {
    if (err) {
        res.json({
            message: err.message
        });
    }
    console.log('running');
});
