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

// const onlineUser = (user) => {
//   const userUl = document.getElementById('userNickname');
//   const userLi = document.createElement('li');
// };

socket.on('message', (message) => createMessage(message));
socket.on('online', (user) => {
  const pUser = document.getElementById('userNickname');
  pUser.innerHTML = user;
});
