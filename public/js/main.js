'use strict';

const chatForm = document.getElementById('chat_form');
const chatMessages = document.querySelector('.chat');
const userList = document.getElementById('users');
const roomName = document.getElementById('room-name');

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


// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message1');
  div.innerHTML = ` <p class="text">
    ${message.text}
   </p>
   <p class="meta">${username}<span>&#160;${message.time}</span></p>`;
  document.querySelector('.output_message').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const div = document.createElement('div');
    div.innerText = '';
    const p = document.createElement('p');
    p.innerText = `${user.username}`;
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


chatMessages.addEventListener('contextmenu', e => {
    e.preventDefault();
    chatMessages.addEventListener('contextmenu', displayMenu);
    const text = e.target.innerHTML;
  console.log('text', text);
    //delete message
    /*
    del.addEventListener('click', () => {
      hideMenu();
      let index;
      for (const item of todoList) {
        index = todoList.indexOf(item);
        if (item.todo === text) {
          todoList.splice(index, 1);
          displayMessage();
          localStorage.setItem('todo', JSON.stringify(todoList));
        }
      }
    });
    //clear note
    clear.addEventListener('click', () => {
      hideMenu();
      let index;
      for (const item of todoList) {
        index = todoList.indexOf(item);
        todoList.splice(index);
        displayMessage();
        localStorage.setItem('todo', JSON.stringify(todoList));
      }
    });
  
    //mark as important
    mark.addEventListener('click', () => {
      hideMenu();
      for (const item of todoList) {
        if (item.todo === text) {
          item.important = !item.important;
          displayMessage();
          localStorage.setItem('todo', JSON.stringify(todoList));
        }
      }
    });
  
    //copy text
    copy.addEventListener('click', () => {
      hideMenu();
      navigator.clipboard.writeText(text);
    });
  
    //edit text
    edit.addEventListener('click', () => {
      inputChange(text);
    });  */

  });


