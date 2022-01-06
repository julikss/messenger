//adding some constants

const inputText = document.getElementById('input-text');
const sendMesg = document.querySelector('.submit');
const chat = document.querySelector('.chat-popup');
const openChat = document.querySelector('.chat-btn');
const chatWindow = document.querySelector('.chat-area');
const emoji = document.querySelector('#emoji-btn');
const picker = new EmojiButton();
const commands = [
    ['Hello', 'Hi'],
    ['Help', 'About us, Use'],
    ['About us', 'ULUMANANA'],
    ['Use', 'Chat-room for real-time chatting'],
    ['Donate', '544550005444-donation card']
];
let isOpen = false;

const automaticOpen = () => {
    setTimeout(() => {
        if (isOpen === false) {
            chat.style.display = "block";
            isOpen = true;
        }
    }, 5000);
}

openChat.addEventListener('click', () => {
    if (isOpen === false) {
        chat.style.display = "block";
        isOpen = true;
    } else {
        chat.style.display = "none";
        isOpen = false;
    }

});

//sending messages

const sendMessage = () => {
    const mesgText = inputText.value;

    if (mesgText != '') {
        const newMesg = `<div class="out-msg">
      <span class="my-msg">${mesgText}</span>
      </div>`;

        chatWindow.insertAdjacentHTML("beforeend", newMesg);
        inputText.value = '';
    }

    for (let el of commands) {
        if (mesgText == el[0]) {
            const reply = `<div class="income-msg">
      <span id="income-m" class="reply">${el[1]}</span>
      </div>`;
            setTimeout(() => {
                chatWindow.insertAdjacentHTML("beforeend", reply)
            }, 600);
        }
    }
}

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