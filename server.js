const express = require('express');
const path = require('path');
const { OK } = require('http-status-codes').StatusCodes;
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ['GET', 'POST'],
  },
});

const msgModel = require('./models/msgHistory');

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_req, res) => {
  res.status(OK).render('index');
});

io.on('connection', async (socket) => {
  console.log('logged in user', socket.id);
  socket.emit('online', socket.id.slice(0, 16));
  socket.emit('history', await msgModel.history());

  socket.on('message', async ({ chatMessage, nickname }) => {
    console.log('Your nickname:', nickname);
    const time = new Date().toLocaleString().replace(/\//g, '-');
    await msgModel.create({ time, nickname, chatMessage });
    io.emit('message', `${time} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log('disconnected user', socket.id);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

http.listen(port, (console.log(`Webchat open on port ${port}`)));
