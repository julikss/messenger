'use strict';

const chatForm = document.getElementById('chat_form');
const chatMessages = document.querySelector('.chat');
// eslint-disable-next-line no-undef
const socket = io("ws://localhost:3000");

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
});

chatForm.addEventListener('submit', (send) => {
    send.preventDefault();

    let msg = send.target.elements.msg.value;
    msg = msg.trim();

    if (!msg) {
        return false;
    }

    socket.emit('MessageInChat', msg);

    send.target.elements.msg.value = '';
    send.target.elements.msg.focus();
});


// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message1');
    div.innerHTML = `<p class="text">${message}</p>`;
    // const p = document.createElement('p');
    // p.classList.add('text');
    // p.innerText = message.text;
    // div.appendChild(p);
    document.querySelector('.chat').appendChild(div);
}