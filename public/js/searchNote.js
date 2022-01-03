const searchNote = document.getElementById('search-note');
const todolist = require('./todolist');

const highlightMesg = (note) => {

}

searchNote.addEventListener('keyup', (event) => {
    const searchData = event.target.value.toLowerCase();

    const foundNote = todo.filter((el) => {
        el.todo.toLowerCase().includes(searchData);
    });
    highlightMesg(foundNote);
});