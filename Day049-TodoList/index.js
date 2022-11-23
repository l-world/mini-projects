const taskInput = document.getElementById('task'),
      todoList = document.querySelector('.todo-list'),
      form = document.getElementById('form');

const todos = JSON.parse(localStorage.getItem('todos'));
if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', e =>{
    e.preventDefault();

    addTodo();
})

function addTodo(todo){
    const todoText = taskInput.value || todo.text;
    if(todoText){
        const li = document.createElement('li');
        if(todo && todo.completed){
            li.classList.add('completed');
        }
        li.innerText = todoText;

        li.addEventListener('click', e=> {
            li.classList.toggle('completed');
            updateTodo();
        })
        li.addEventListener('contextmenu', e=> {
            e.preventDefault();

            li.remove();

            updateTodo();
        })
        todoList.appendChild(li);
        
        taskInput.value = ''

        updateTodo();
    }   
}

function updateTodo(){
    const lis = document.querySelectorAll('li');
    const todos = [];
    lis.forEach( li => {
        todos.push({
            text: li.innerText,
            completed: li.classList.contains('completed')
        })
    })
    localStorage.setItem('todos',JSON.stringify(todos))
}
