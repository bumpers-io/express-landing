// Dependencies
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

// Init
var app = express();
var server = http.Server(app);
var io = socketIO(server);

const appPort = 3000;

app.set('port', appPort);
app.use('/static', express.static(path.join(__dirname, 'public')))

// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/public/index.html'));
});

// Resources
app.get('/static/main.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/public/main.js'));
});
app.get('/static/canvas.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/public/canvas.css'));
});

server.listen(appPort, () => {
    console.log('HTTP server listening on port ', appPort)
});

// WebSockets
io.on('connection', (socket) => {
    console.log('Connected to WebSocket: ', socket);
});

// testing
// setInterval(() => {
//     io.sockets.emit('message', 'testing');
// }, 5000);