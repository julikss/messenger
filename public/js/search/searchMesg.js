const searchMesg = document.getElementById('search-message');
const messages = require('');

const highlightMesg = (mesg) => {

}

searchMesg.addEventListener('keyup', (event) => {
    const searchData = event.target.value.toLowerCase();

    const foundMesg = messages.filter((el) => {
        el.text.toLowerCase().includes(searchData);
    });
    highlightMesg(foundMesg);
});