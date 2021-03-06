'use strict';

const roomName = document.getElementById('room-name');
const addNote = document.querySelector('.note');
const addButton = document.querySelector('.add');
const todo = document.querySelector('.todo');
const menu = document.querySelector('.menu');
const del = document.getElementById('delete');
const clear = document.getElementById('clear');
const mark = document.getElementById('mark');
const copy = document.getElementById('copy');
const edit = document.getElementById('edit');

let todoList = [];

const displayNote = () => {
  let note = '';
  let index;
  if (todoList.length === 0) todo.innerHTML = '';
  for (const item of todoList) {
    index = todoList.indexOf(item);
    note += `
			<li>
			<input type='checkbox' id='item_${index}'
       ${item.checked ? 'checked' : ''}>
			<label for='item_${index}' 
      class='${item.important ? 'important' : ''}'>
      ${item.todo}
      </label>
			</li>
		`;
    todo.innerHTML = note;
  }
};

const loadNotes = () => {
  if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayNote();
  }
};

loadNotes();

//get array of only notes' values
const arrOfValues = [];

for (const item of todoList) {
  arrOfValues.push(item.todo);
}


const saveNote = () => {
  localStorage.setItem('todo', JSON.stringify(todoList));
};

const inputNote = () => {
  if (!addNote.value || arrOfValues.includes(addNote.value)) {
    alert('Please insert correctly!');
    return;
  }

  const newTodo = {
    todo: addNote.value,
    checked: false,
    important: false
  };

  todoList.push(newTodo);
  saveNote();
  displayNote();
  addNote.value = '';
};

addButton.addEventListener('click', inputNote);

todo.addEventListener('change', e => {
  const idInput = e.target.getAttribute('id');
  const label = todo.querySelector('[for=' + idInput + ']');
  const valueOfLabel = label.innerHTML;

  for (const item of todoList) {
    if (item.todo === valueOfLabel) {
      item.checked = !item.checked;
      saveNote();
    }
  }
});


//contextmenu

const displayMenu = e => {
  e.preventDefault();
  const offset = 20;
  menu.style.top = `${e.clientY - offset}px`;
  menu.style.left = `${e.clientX - offset}px`;
  menu.classList.remove('off');
};

const hideMenu = () => {
  menu.classList.add('off');
  menu.style.top = '-200%';
  menu.style.left = '-200%';
};

todo.addEventListener('contextmenu', displayMenu);

menu.classList.add('off');
menu.addEventListener('mouseleave', hideMenu);

todo.addEventListener('contextmenu', e => {
  e.preventDefault();

  const note = e.target;
  const text = e.target.innerText.trim();
  const index = arrOfValues.indexOf(text);

  const deleteNote = () => {
    hideMenu();
    todoList.splice(index, 1);
    saveNote();
    displayNote();
  };

  const clearNotes = () => {
    hideMenu();
    todoList.splice(0, todoList.length + 1);
    displayNote();
    saveNote();
  };

  const markNote = () => {
    hideMenu();
    for (const item of todoList) {
      if (item.todo === text) {
        item.important = !item.important;
        displayNote();
        saveNote();
      }
    }
  };

  const copyToClipboard = () => {
    hideMenu();
    navigator.clipboard.writeText(text);
  };

  const editText = () => {
    hideMenu();
    for (const item of todoList) {
      if (item.todo === text) {
        note.setAttribute('contenteditable', 'true');
        todo.item = note.innerText;
        saveNote();
      }
    }
  };

  del.addEventListener('click', deleteNote);
  clear.addEventListener('click', clearNotes);
  mark.addEventListener('click', markNote);
  copy.addEventListener('click', copyToClipboard);
  edit.addEventListener('click', editText);
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
