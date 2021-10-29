const socket = window.io();

const form = document.getElementById('form');
const inputMessage = document.getElementById('messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputMessage.value) {
    socket.emit('message', { chatMessage: inputMessage.value, nickname: socket.id });
    inputMessage.value = '';
  }
});

const createMessage = (message) => {
  const chatUl = document.getElementById('chat');
  console.log(chatUl);
  const chatLi = document.createElement('li');
  console.log(chatLi);
  chatLi.innerHTML = message;
  chatUl.appendChild(chatLi);
};

socket.on('message', (message) => createMessage(message));
