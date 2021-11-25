const socket = window.io();

const dataTestId = 'data-testid';

const form = document.getElementById('form');
const inputMessage = document.getElementById('messageInput');
const userNickname = document.getElementById('nickname-box');
const buttonNick = document.getElementById('nicknameButton');
let nick;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputMessage.value) {
    socket.emit('message', { chatMessage: inputMessage.value, nickname: nick });
    inputMessage.value = '';
  }
});

buttonNick.addEventListener('click', (e) => {
  e.preventDefault();
  nick = userNickname.value;
  socket.emit('changeNickname', { nickname: nick, id: socket.id });
  const userOnline = document.getElementById('online-now');
  userOnline.innerHTML = nick;
  userNickname.value = '';
});

const createMessage = (message) => {
  const chatUl = document.getElementById('chat');
  const chatLi = document.createElement('li');
  chatLi.innerHTML = message;
  // https://developer.mozilla.org/pt-BR/docs/Web/API/Element/setAttribute
  chatLi.setAttribute(dataTestId, 'message');
  chatUl.appendChild(chatLi);
};

const msgHistory = (history) => {
  history.forEach(({ time, nickname, chatMessage }) => {
    const message = document.getElementById('chat');
    const li = document.createElement('li');
    li.innerText = `${time} - ${nickname} : ${chatMessage}`;
    li.setAttribute(dataTestId, 'message');
    message.appendChild(li);
  });
};

const onlineUser = (nickname) => {
  const onlineUl = document.getElementById('userNickname');
  const onlineLi = document.createElement('li');
  onlineLi.innerHTML = nickname;
  onlineLi.setAttribute(dataTestId, 'online-user');
  onlineLi.setAttribute('id', 'online-now');
  onlineUl.appendChild(onlineLi);
};
/* 
zambelli 0
mari 1
maiara 2
*/
const usersList = (users) => {
  const onlineUsers = document.getElementById('userNickname');
  onlineUsers.innerHTML = '';
  const index = users.findIndex((user) => socket.id === user.id);
  onlineUser(users[index].nickname);
  for (let i = 0; i < users.length; i += 1) {
    if (index !== i) {
      onlineUser(users[i].nickname);
      console.log('index !== i');
    }
  }
};

socket.on('history', (history) => msgHistory(history));
socket.on('message', (message) => createMessage(message));
socket.on('user', (users) => usersList(users));
socket.on('connect', () => { nick = socket.id.slice(0, 16); });
