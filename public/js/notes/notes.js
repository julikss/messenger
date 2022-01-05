let addNote = document.querySelector('.message'),
	addButton = document.querySelector('.add'),
	todo = document.querySelector('.todo'), 
	del = document.getElementById('delete'),
	clear = document.getElementById('clear');

let todoList = [];
let menu = null;

document.addEventListener('DOMContentLoaded', function(){
	 
	menu = document.querySelector('.menu');
	menu.classList.add('off');
	menu.addEventListener('mouseleave', hideMenu);

});


if(localStorage.getItem('todo')){
	todoList = JSON.parse(localStorage.getItem('todo'));
	displayMessage();
}

addButton.addEventListener('click', () => {
	if(!addNote.value) return;

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

function displayMessage(){
	let displayMessage = '';
	if(todoList.length === 0) todo.innerHTML = '';

	//for (const todo of todoList) {
		//for (let i=0; i<todoList.length; i++) {
			todoList.forEach(function(item, i){
				displayMessage += `
				<li>
				<input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
				<label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
				</li>
				`;
				todo.innerHTML = displayMessage;
			});
}

todo.addEventListener('change', function(event){
	let idInput = event.target.getAttribute('id');
	let forLabel = todo.querySelector('[for='+ idInput +']');
	let valueLabel = forLabel.innerHTML;

	todoList.forEach(function(item){
		if (item.todo === valueLabel) {
			item.checked =! item.checked;
			localStorage.setItem('todo', JSON.stringify(todoList));
		}
	});
});


todo.addEventListener('contextmenu', function(e){

	e.preventDefault();
	todo.addEventListener('contextmenu', displayMenu);
	let text = e.target.innerHTML;

	//delete note
	del.addEventListener('click', function(e){

		console.log(e.target.innerHTML);
		todoList.forEach(function(item, i){
		if(item.todo === text) {
			todoList.splice(i, 1);
		}
		//item.important =! item.important;
		displayMessage();
		localStorage.setItem('todo', JSON.stringify(todoList));
	})
	});

	//clear note
	clear.addEventListener('click', clearAllNotes);


		
})


function clearAllNotes(e) {
	e.preventDefault(); 
	for(const item of todoList) {
		todoList.splice(todoList.indexOf(item));
		displayMessage();
		localStorage.setItem('todo', JSON.stringify(todoList));
	}
}

function markAsImportant(item) {

}

function copyToClipboard(e) {
	
}

function displayMenu(e){
	e.preventDefault(); 
	menu.style.top = `${e.clientY - 20}px`;
	menu.style.left = `${e.clientX - 20}px`;
	menu.classList.remove('off');
}

function hideMenu(e){
	menu.classList.add('off');
	menu.style.top = '-200%';
	menu.style.left = '-200%';
}