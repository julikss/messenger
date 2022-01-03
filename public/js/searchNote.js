const searchNote = document.getElementById('search-note');
const todo = require('');

const highlightMesg = (note) => {

}

searchNote.addEventListener('keyup', (event) => {
    const searchData = event.target.value.toLowerCase();

    const foundNote = todo.filter((el) => {
        el.text.toLowerCase().includes(searchData);
    });
    highlightMesg(foundNote);
});