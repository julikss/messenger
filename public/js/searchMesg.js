const search = document.getElementById('search');
const messages = require('');

const highlightMesg = (mesg) => {

}

search.addEventListener('keyup', (event) => {
    const searchData = event.target.value.toLowerCase();

    const foundMesg = messages.filter((el) => {
        el.text.toLowerCase().includes(searchData);
    });
    highlightMesg(foundMesg);
});