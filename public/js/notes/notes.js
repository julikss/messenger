let addNote = document.querySelector('.note'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo'),
    del = document.getElementById('delete'),
    clear = document.getElementById('clear'),
    mark = document.getElementById('mark'),
    copy = document.getElementById('copy'),
    edit = document.getElementById('edit');

let todoList = [];
let menu = null;


document.addEventListener('DOMContentLoaded', function() {

    menu = document.querySelector('.menu');
    menu.classList.add('off');
    menu.addEventListener('mouseleave', hideMenu);

});


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
});


todo.addEventListener('contextmenu', function(e) {

    e.preventDefault();
    todo.addEventListener('contextmenu', displayMenu);
    let text = e.target.innerHTML;

    //delete note
    del.addEventListener('click', function(e) {

        todoList.forEach(function(item, i) {
            if (item.todo === text) {
                todoList.splice(i, 1);
                displayMessage();
                localStorage.setItem('todo', JSON.stringify(todoList));
            }
        })
    });

    //clear note
    clear.addEventListener('click', function(e) {
        for (const item of todoList) {
            todoList.splice(todoList.indexOf(item));
            displayMessage();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });

    //mark as important
    mark.addEventListener('click', function(e) {
        for (const item of todoList) {
            if (item.todo === text) {
                item.important = !item.important;
                displayMessage();
                localStorage.setItem('todo', JSON.stringify(todoList));
            }
        }
    });

    //copy text 
    copy.addEventListener('click', function() {
        navigator.clipboard.writeText(text);
    });

    //edit text 
    edit.addEventListener('click', function() {

    })

})


function displayMenu(e) {
    e.preventDefault();
    menu.style.top = `${e.clientY - 20}px`;
    menu.style.left = `${e.clientX - 20}px`;
    menu.classList.remove('off');
}

function hideMenu(e) {
    menu.classList.add('off');
    menu.style.top = '-200%';
    menu.style.left = '-200%';
}

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
                const position = el.innerText.search(searchData);
                el.innerHTML = highlightNote(str, position, searchData.length);
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