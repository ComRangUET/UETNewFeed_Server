const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3005;



http.createServer(app);

app.listen(port, function() {
    console.log('running');
});