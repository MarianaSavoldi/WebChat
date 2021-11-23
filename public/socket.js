const socket = window.io();

const form = document.getElementById('form');
const inputMessage = document.getElementById('messageInput');
const onlineUser = document.getElementById('nickname-box');
const buttonNick = document.getElementById('nicknameButton');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputMessage.value) {
    socket.emit('message', { chatMessage: inputMessage.value, nickname: socket.id.slice(0, 16) });
    inputMessage.value = '';
  }
});

buttonNick.addEventListener('click', (e) => {
  e.preventDefault();
  const nickUser = { nickname: (socket.id = onlineUser.value) };
  onlineUser.value = '';
  return nickUser;
});

const createMessage = (message) => {
  const chatUl = document.getElementById('chat');
  const chatLi = document.createElement('li');
  chatLi.innerHTML = message;
  // https://developer.mozilla.org/pt-BR/docs/Web/API/Element/setAttribute
  chatLi.setAttribute('data-testid', 'message');
  chatUl.appendChild(chatLi);
};

const msgHistory = (history) => {
  console.log('history', history);
  history.forEach(({ time, nickname, chatMessage }) => {
    const message = document.getElementById('chat');
    console.log('messages', message);
    const li = document.createElement('li');
    li.innerText = `${time} - ${nickname} : ${chatMessage}`;
    li.setAttribute('data-testid', 'message');
    message.appendChild(li);
  });
};

socket.on('history', (history) => msgHistory(history));
socket.on('message', (message) => createMessage(message));
socket.on('online', (user) => {
  const pUser = document.getElementById('userNickname');
  pUser.innerHTML = user;
});
