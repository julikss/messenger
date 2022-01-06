//adding some constants

const inputText = document.getElementById('input-text');
const sendMesg = document.querySelector('.submit');
const chat = document.querySelector('.chat-popup');
const openChat = document.querySelector('.chat-btn');
const chatWindow = document.querySelector('.chat-area');
const emoji = document.querySelector('#emoji-btn');
const picker = new EmojiButton();

openChat.addEventListener('click', () => {
    chat.classList.toggle('show');
});

//sending messages

const sendMessage = () => {
    const mesgText = inputText.value;

    const newMesg = `<div class="out-msg">
  <span class="my-msg">${mesgText}</span>
  </div>`;

    chatWindow.insertAdjacentHTML("beforeend", newMesg);
    inputText.value = '';

    if (mesgText == "Hello") {
        const reply = `<div class="income-msg">
      <span id="income-m" class="reply">${mesgText}</span>
      </div>`;
        setTimeout(() => {
            chatWindow.insertAdjacentHTML("beforeend", reply)
        }, 600);
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