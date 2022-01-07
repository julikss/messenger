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
    let result;

    result = hour + ':' + minutes;
    return result;
};


const commands = [
    ['Hello', 'Hi'],
    ['Help', 'About us, Use, Possibilities, More'],
    ['About us', 'We are ULUMANANA corporation'],
    ['Use', 'Chat-room for real-time chatting'],
    ['Donate', '544550005444-donation card'],
    ['Possibilities', 'Check Notes'],
    //['Chat info', `room: ${room}, your name:${username}`],
    ['More', 'Date, Time, Signed up'],
    ['Date', `${getDate()}`],
    ['Time', `${getTime()}`],
    ['Signed up', `${usernames}`]
];
let isOpen = false;

const loggedUsers = async() => {
    const result = await fetch('/auth/users')
        .then(res => res.json());

    for (let el of result) {
        usernames.push(el.username);
    }
    commands[9][1] = `${usernames}`;
}

const automaticOpen = () => {
    setTimeout(() => {
        if (isOpen === false) {
            chat.style.display = 'block';
            isOpen = true;
        }
    }, 5000);
};

openChat.addEventListener('click', () => {
    if (isOpen === false) {
        chat.style.display = 'block';
        isOpen = true;
    } else {
        chat.style.display = 'none';
        isOpen = false;
    }

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