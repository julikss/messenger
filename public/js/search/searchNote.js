const searchNote = document.getElementById('search-note');
const todolist = require('./todolist');

const highlightNote = (note, pos, length) => {
    return note.slice(0, pos) + '<mark>' +
        note.slice(pos, pos + length) + '</mark>' +
        note.slice(pos + length);
}

searchNote.addEventListener('click', (event) => {
    const searchData = event.target.value.toLowerCase();

    if (searchData != '') {
        const foundNote = todolist.filter((el) => {
            el.todo.toLowerCase().includes(searchData);
        });
        highlightNote(foundNote.todo, , searchData.length);
    }
});