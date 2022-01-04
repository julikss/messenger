/*const searchNote = document.getElementById('search-note');
const todolist = require('./todolist');
const highlightNote = (note, length) => {
    return '<mark>' +
        note.slice(0, length) +
        '</mark>';
}

searchNote.addEventListener('click', (event) => {
    const searchData = event.target.value.toLowerCase();

    if (searchData != '') {
        const foundNote = todolist.filter((el) => {
            el.todo.toLowerCase().includes(searchData);
        });
        highlightNote(foundNote.todo, searchData.length);
    } else console.log('Empty input');
});*/

const searchNote = document.querySelector('#input');
const search = () => {
    let searchData = this.value.trim();
}

searchNote.oninput = search();