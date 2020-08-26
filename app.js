// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const header = document.querySelector('header');
const filterOption = document.querySelector('.filter-todos')


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
// Removing big shadow
todoButton.addEventListener('click', () => {
    header.classList.toggle('not-blank');
});
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions
function addTodo(event) {
    // Prevent from submitting
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD Todo to LocalStorage
    saveLocalTodos(todoInput.value);
    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // Append to Todo List
    todoList.appendChild(todoDiv);
    // Clear Todo INPUT VALUE
    todoInput.value = "";
};

function deleteCheck(e) {
    const item = e.target;
    //DELTE TODO
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // The Event Animation
        todo.classList.toggle('fadeOut');
        deleteLocalTodos(todo);(
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })); 
    }
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        if (todo.classList[1] === 'completed') {
            localStorage.removeItem(todo.childNodes[0].innerText);
        }
        todo.classList.toggle('completed');
        localStorage.setItem(todo.childNodes[0].innerText, JSON.stringify(todo.classList[1]));
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;s
        }
    });
}

function saveLocalTodos(todo) {
    // CHECK --- HEY, Do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    } 

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

function getTodos () { 
    // CHECK --- HEY, Do I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        // Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // Delete button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // Append to Todo List
        todoList.appendChild(todoDiv);
        if(localStorage.getItem(todo) === JSON.stringify('completed')) {
            todoDiv.classList.toggle('completed');
        }
    });
    
}

function deleteLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    } 
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    // Remove the class completed backup if that exists
    if(localStorage.getItem(todo.childNodes[0].innerText)){
        localStorage.removeItem(todo.childNodes[0].innerText);
    }   
}