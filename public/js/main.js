'use strict';

const chatForm = document.getElementById('chat_form');
const chatMessages = document.querySelector('.chat-messages');
// eslint-disable-next-line no-undef
const socket = io("ws://localhost:3000");

socket.on('message', message => {
    console.log(message);
});

chatForm.addEventListener('submit', (send) => {
    send.preventDefault();

    let message = send.target.elements.message.valuel;
    message = message.trim();

    if (!message) {
        return false;
    }

    socket.email('MessageInChat', message);

    send.target.elements.message.value = '';
    send.target.elements.message.focus();
});