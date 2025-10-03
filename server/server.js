const http = require('http');
const connectDB = require('./config/db');
const app = require('./app');

connectDB();

const server = http.createServer(app);
const port = 3000;

server.listen(port, () => {
    console.log('server started at port: ', port);
});