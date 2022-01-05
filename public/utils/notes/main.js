let addNote = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessage();
}

addButton.addEventListener('click', () => {
    if (!addNote.value) return;
    let newTodo = {
        todo: addNote.value,
        checked: false,
        important: false
    };
    todoList.push(newTodo);
    displayMessage();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addNote.value = '';
});

function displayMessage() {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    //for (const todo of todoList) {
    //for (let i=0; i<todoList.length; i++) {
    todoList.forEach(function(item, i) {
        displayMessage += `
				<li>
				<input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
				<label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
				</li>
				`;
        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function(event) {
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;

    todoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
    //console.log('for label:', valueLabel);
});

todo.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    todoList.forEach(function(item, i) {
        if (item.todo === e.target.innerHTML) {
            if (e.ctrlKey || e.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            item.important = !item.important;
            displayMessage();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})

const highlightNote = (note, pos, length) => {
    return note.slice(0, pos) + '<mark>' +
        note.slice(pos, pos + length) +
        '</mark>' + note.slice(pos + length);
}

document.querySelector('#input').oninput = function() {
    const searchData = this.value.trim().toLowerCase();
    let items = document.querySelectorAll('.todo label');

    if (searchData != '') {
        for (let el of items) {
            if (el.innerText.includes(searchData)) {
                let str = el.innerText;
                //console.log(el);
                el.innerHTML = highlightNote(str, el.innerText.search(searchData), searchData.length);
            } else {
                el.innerHTML = el.innerText;
            }
        }
    } else {
        console.log('Empty input');
        for (let el of items) {
            el.innerHTML = el.innerText;
        }
    };

};