const searchNote = document.querySelector('#input');

const highlightNote = (note, length) => {
    return '<mark>' +
        note.slice(0, length) +
        '</mark>';
}

const search = () => {
    const searchData = this.value.trim().toLowerCase();
    const todolist = require('./todolist');

    if (searchData != '') {
        for (let el of todolist) {
            el.todo.toLowerCase().includes(searchData);

            let str = el.todo.innerText;
            el.todo.innerHTML = highlightNote(str, searchData.length);
        }
    } else {
        console.log('Empty input');
    };

}

searchNote.oninput = search();