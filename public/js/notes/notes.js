'use strict';

const addNote = document.querySelector('.note'),
  addButton = document.querySelector('.add'),
  todo = document.querySelector('.todo'),
  menu = document.querySelector('.menu'),
  del = document.getElementById('delete'),
  clear = document.getElementById('clear'),
  mark = document.getElementById('mark'),
  copy = document.getElementById('copy'),
  edit = document.getElementById('edit');

let todoList = [];

menu.classList.add('off');
menu.addEventListener('mouseleave', hideMenu);

function displayMenu(e) {
  e.preventDefault();
  menu.style.top = `${e.clientY - 20}px`;
  menu.style.left = `${e.clientX - 20}px`;
  menu.classList.remove('off');
}

function hideMenu() {
  menu.classList.add('off');
  menu.style.top = '-200%';
  menu.style.left = '-200%';
}


if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessage();
}

function displayMessage() {
  let displayMessage = '';
  let index;
  if (todoList.length === 0) todo.innerHTML = '';
  for (const item of todoList) {
    index = todoList.indexOf(item);
    displayMessage += `
			<li>
			<input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
			<label for='item_${index}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
			</li>
		`;
    todo.innerHTML = displayMessage;
  }
}

function inputNote() {
  if (!addNote.value) return;
  const newTodo = {
    todo: addNote.value,
    checked: false,
    important: false
  };
  todoList.push(newTodo);
  displayMessage();
  localStorage.setItem('todo', JSON.stringify(todoList));
  addNote.value = '';
}

addButton.addEventListener('click', inputNote);


todo.addEventListener('change', e => {
  const idInput = e.target.getAttribute('id');
  const label = todo.querySelector('[for=' + idInput + ']');
  const valueOfLabel = label.innerHTML;

  for (const item of todoList) {
    if (item.todo === valueOfLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  }
});

//contextmenu
todo.addEventListener('contextmenu', e => {
  e.preventDefault();
  todo.addEventListener('contextmenu', displayMenu);
  const text = e.target.innerHTML;

  //delete note
  del.addEventListener('click', () => {
    hideMenu();
    let index;
    for (const item of todoList) {
      index = todoList.indexOf(item);
      if (item.todo === text) {
        todoList.splice(index, 1);
        displayMessage();
        localStorage.setItem('todo', JSON.stringify(todoList));
      }
    }
  });

  //clear note
  clear.addEventListener('click', () => {
    hideMenu();
    let index;
    for (const item of todoList) {
      index = todoList.indexOf(item);
      todoList.splice(index);
      displayMessage();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });

  //mark as important
  mark.addEventListener('click', () => {
    hideMenu();
    for (const item of todoList) {
      if (item.todo === text) {
        item.important = !item.important;
        displayMessage();
        localStorage.setItem('todo', JSON.stringify(todoList));
      }
    }
  });

  //copy text
  copy.addEventListener('click', () => {
    hideMenu();
    navigator.clipboard.writeText(text);
  });

  //edit text
  edit.addEventListener('click', () => {
    hideMenu();
    for (const item of todoList) {
      if (item.todo === text) {
        addButton.addEventListener('click', () => {
          if (!addNote.value) return;
          item.todo = addNote.value;
          displayMessage();
          localStorage.setItem('todo', JSON.stringify(todoList));
          addNote.value = '';
        });
      }
    }
  });

});


//functions for searching
const highlightNote = (note, pos, length) => note.slice(0, pos) + '<mark>' +
        note.slice(pos, pos + length) +
        '</mark>' + note.slice(pos + length);

document.querySelector('#input').oninput = function() {
  const searchData = this.value.trim().toLowerCase();
  const items = document.querySelectorAll('.todo label');

  if (searchData !== '') {
    for (const el of items) {
      if (el.innerText.includes(searchData)) {
        const str = el.innerText;
        //console.log(el);
        const position = el.innerText.search(searchData);
        el.innerHTML = highlightNote(str, position, searchData.length);
      } else {
        el.innerHTML = el.innerText;
      }
    }
  } else {
    console.log('Empty input');
    for (const el of items) {
      el.innerHTML = el.innerText;
    }
  }
};
