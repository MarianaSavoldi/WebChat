const express = require('express');
const path = require('path');
const { OK } = require('http-status-codes').StatusCodes;
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.status(OK).render('index');
});

io.on('connection', (socket) => {
  console.log('logged in user', socket.id);
  socket.on('message', ({ chatMessage, nickname }) => {
    const time = new Date().toLocaleString().replace(/\//g, '-');
    console.log('message', chatMessage, time);
    io.emit('message', `${time} - ${nickname}: ${chatMessage}`);
  });
  socket.on('disconnect', () => {
    console.log('disconnected user', socket.id);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

http.listen(port, (console.log(`Webchat open on port ${port}`)));
