'use strict';

const chatForm = document.getElementById('chat_form');
const chatMessages = document.querySelector('.chat');
const userList = document.getElementById('users');
const roomName = document.getElementById('room-name');
const msgBlock = document.querySelector('.output_message');
const menu = document.querySelector('.menu');
const del = document.getElementById('delete');
const clear = document.getElementById('clear');
const copy = document.getElementById('copy');
const userPhoto = document.getElementById('photo_user');

// eslint-disable-next-line no-undef
const socket = io('ws://localhost:3000');
const { username, room } = Qs.parse(location.search);

console.log(Qs.parse(location.search));

socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ username, room }) => {
    console.log(username);
    outputUsers(username);
    outputRoomName(room);
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

    socket.emit('chatMessage', msg);

    send.target.elements.msg.value = '';
    send.target.elements.msg.focus();
    console.log(msg);
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message1');
    div.innerHTML = ` <p class="text">${message.text}</p>
                    <p class="meta">${username}<span>&#160;${message.time}</span></p>
                    `;
    const msg = msgBlock.appendChild(div);
    createMenu(msg);

}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

function outputUsers() { <<
    << << < HEAD
    const div = document.createElement('div');
    div.classList.add('contact2-5');
    div.innerHTML = ` <p class="ulumanana">${username}</p>`;
    userList.appendChild(div);
    const img = document.createElement('IMG');
    img.src = 'https://img.icons8.com/nolan/64/homer-simpson.png';
    img.classList.add('photo_user');
    userPhoto.appendChild(img);
} ===
=== =
const div = document.createElement('div');
div.classList.add('contact2-5');
console.log(username);
div.innerHTML = ` <p class="ulumanana">${username}</p>`;
userList.appendChild(div);
const img = document.createElement('IMG');
img.src = "https://img.icons8.com/nolan/64/homer-simpson.png";
img.classList.add('photo_user');
userPhoto.appendChild(img);
}; >>>
>>> > 07147 c6a0ba3221ba03be7634d2f0331495b1d51

document.getElementById('leave_room').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
        window.location = '../login.html';
    } else {}
});


menu.classList.add('off');
menu.addEventListener('mouseleave', hideMenu);

function displayMenu(e) {
    e.preventDefault();
    menu.style.top = `${e.clientY - 20}px`;
    menu.style.left = `${e.clientX - 20}px`;
    menu.classList.remove('off');
}

function hideMenu() {
    menu.classList.add('off');
    menu.style.top = '-200%';
    menu.style.left = '-200%';
}

//contextmenu
function createMenu(el) {
    el.addEventListener('contextmenu', displayMenu);
    el.addEventListener('contextmenu', e => {
        e.preventDefault();

        const text = el.innerText;
        const click = e.target;
        console.log(click);
        console.log(el);

        //delete message
        del.addEventListener('click', () => {
            hideMenu();
            el.parentNode.removeChild(el);
        });
        //clear note
        clear.addEventListener('click', () => {
            hideMenu();
            msgBlock.parentNode.removeChild(msgBlock);
        });

        //copy text
        copy.addEventListener('click', () => {
            hideMenu();
            navigator.clipboard.writeText(text);
        });

    });
}