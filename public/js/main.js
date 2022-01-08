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
const edit = document.getElementById('edit');
const report = document.getElementById('report');

// eslint-disable-next-line no-undef
const socket = io('ws://localhost:3000');
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

console.log(Qs.parse(location.search, {
    ignoreQueryPrefix: true,
}));

socket.emit('joinRoom', { room });

socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    //chatMessage.scrollTop = chatMessage.scrollHeight;
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
   let msg = msgBlock.appendChild(div);
   createMenu(msg);

}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;

}

function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((users) => {
        const div = document.createElement('div');
        div.innerText = ``;
        const p = document.createElement('p');
        p.innerText = `${users.username}`;
        div.appendChild(p);
        userList.appendChild(div);
    });
}

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
function createMenu(el){
  el.addEventListener('contextmenu', displayMenu);
  el.addEventListener('contextmenu', e => {
    e.preventDefault();
    
    const text = el.innerText;
    let click = e.target;
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

})
}