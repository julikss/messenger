'use strict';

//adding some constants

const inputText = document.getElementById('input-text');
const sendMesg = document.querySelector('.submit');
const chat = document.querySelector('.chat-popup');
const openChat = document.querySelector('.chat-btn');
const chatWindow = document.querySelector('.chat-area');
const emoji = document.querySelector('#emoji-btn');
const picker = new EmojiButton();
const usernames = [];
const birthDates = [];

const getDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  let result;

  if (date.getMonth() + 1 > 9) {
    result = day + '.' + month;
  } else {
    result = day + '.0' + month;
  }

  return result;
};

const getTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const result = hour + ':' + minutes;

  return result;
};

const commands = [
  ['Hello', 'Hi'],
  ['Help', 'About us, Use, Possibilities, More'],
  ['About us', 'We are ULUMANANA corporation'],
  ['Use', 'Chat-room for real-time chatting'],
  ['Donate', '544550005444-donation card'],
  ['Possibilities', 'Check Notes'],
  ['More', 'Date, Time, Signed up, Set Birthday'],
  ['Date', `${getDate()}`],
  ['Time', `${getTime()}`],
  ['Signed up', `${usernames}`],
  ['Set Birthday', 'Enter your Birthday'],
];
let isOpen = false;
let uniqueDates = [];

const loggedUsers = async () => {
  const result = await fetch('/auth/users')
    .then(res => res.json());

  for (const el of result) {
    usernames.push(el.username);
  }
  commands[9][1] = `${usernames}`;
};

const removeRep = array => {
  const newArr = array.filter((item, pos) => array.indexOf(item) === pos);
  return newArr;
};

const automaticOpen = () => {
  setTimeout(() => {
    if (!isOpen) {
      chat.style.display = 'block';
      isOpen = true;
    }
  }, 5000);
};

openChat.addEventListener('click', () => {
  chat.style.display = (isOpen) ? 'none' : 'block';
  isOpen = !isOpen;
});

//sending messages

const sendMessage = () => {
  const mesgText = inputText.value;

  if (mesgText !== '') {
    const newMesg = `<div class="out-msg">
      <span class="my-msg">${mesgText}</span>
      </div>`;

    chatWindow.insertAdjacentHTML('beforeend', newMesg);
    inputText.value = '';
  }

  for (const el of commands) {
    if (mesgText === el[0]) {
      const reply = `<div class="income-msg">
      <span id="income-m" class="reply">${el[1]}</span>
      </div>`;

      setTimeout(() => {
        chatWindow.insertAdjacentHTML('beforeend', reply);
      }, 600);

      if (el[1] === 'Enter your Birthday') {
        setTimeout(() => {
          const element = document.querySelectorAll('.out-msg');
          for (const e of element) {
            if (e.innerText.includes('.')) {
              const val = e.innerText;
              birthDates.push(val);
              uniqueDates = removeRep(birthDates);
            }
          }
        }, 7000);
      }
    }
  }
};

sendMesg.addEventListener('click', sendMessage);

window.addEventListener('DOMContentLoaded', () => {
  picker.on('emoji', emoji => {
    document.getElementById('input-text').value += emoji;
  });

  emoji.addEventListener('click', () => {
    picker.togglePicker(emoji);
  });
});

automaticOpen();
loggedUsers();
