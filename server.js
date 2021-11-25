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

let users = [];

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_req, res) => {
  res.status(OK).render('index', { users });
});

const changeNickname = (nickname, id) => (user) => { 
  if (id === user.id) return { ...user, nickname };
  return user;
};

io.on('connection', async (socket) => {
  const userNick = socket.id.slice(0, 16);
  users.push({ nickname: userNick, id: socket.id });
  io.emit('user', users);
  socket.emit('history', await msgModel.history());
  socket.on('changeNickname', ({ nickname, id }) => {
  users = users.map(changeNickname(nickname, id));
    io.emit('user', users);
  });
  socket.on('message', async ({ chatMessage, nickname }) => {
    const time = new Date().toLocaleString().replace(/\//g, '-');
    await msgModel.create({ time, nickname, chatMessage });
    io.emit('message', `${time} - ${nickname}: ${chatMessage}`);
  });
  socket.on('disconnect', () => {
    // https://www.mundojs.com.br/2018/09/06/removendo-elementos-de-uma-lista-array-javascript/
    const index = users.findIndex((user) => socket.id === user.id);
    users.splice(index, 1);
    io.emit('user', users);
  });
});
app.use(express.static(path.join(__dirname, 'public')));

http.listen(port, (console.log(`Webchat open on port ${port}`)));
