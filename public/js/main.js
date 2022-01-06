'use strict';

const chatForm = document.getElementById('chat_form');
const chatMessages = document.querySelector('.chat');
const userList = document.getElementById('users');
const roomName = document.getElementById('room-name');


// eslint-disable-next-line no-undef
const socket = io('ws://localhost:3000');


socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
});

chatForm.addEventListener('submit', send => {
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

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}


function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
        const div = document.createElement('div');
        div.innerText = `<p class="ulumanana">${user.username}</p>`;
        userList.appendChild(div);
    });
}