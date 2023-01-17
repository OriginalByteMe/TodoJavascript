import TodoItem from './TodoItem';

class TodoList {
  constructor() {
    this.todos = [];
  }

  getTodos() {
    return this.todos;
  }

  setTodos(todos) {
    this.todos = todos;
  }

  getNumTodos() {
    return this.todos.length - 1;
  }

  #todoCard(todo) {
    const card = document.createElement('div');
    const todoTitle = document.createElement('h3');
    const todoDescription = document.createElement('p');
    const todoDueDate = document.createElement('p');
    todoTitle.innerHTML = `${todo.name}`;
    todoDescription.innerHTML = `${todo.description}`;
    todoDueDate.innerHTML = `Due date: ${todo.date}`;
    todoTitle.classList.add('text-xl', 'font-bold');
    todoDescription.classList.add('text-lg');
    todoDueDate.classList.add('text-lg');
    card.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1', 'cursor-pointer');
    card.appendChild(todoTitle);
    card.appendChild(todoDescription);
    card.appendChild(todoDueDate);

    card.addEventListener('click', () => {
      this.removeTodo(todo.getID);
    });
    return card;
  }

  addTodoByDetails(name, description, date) {
    const id = this.getNumTodos();
    const todo = new TodoItem(id, name, description, date);
    this.todos.push(todo);
    this.displayTodos();
  }

  addTodo(todoItem){
    this.todos.push(todoItem)
    this.displayTodos();
  }

  contains(todoId){
    return this.todos.some((todo) => todo.getID === todoId)
  }

  removeTodo(todoID) {
    this.todos = this.todos.filter((todo) => todo.getID !== todoID )
    this.displayTodos();
    // Storage.removeTodo(todo.getID);
  }

  displayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    this.todos.forEach((todo) => {
      const card = this.#todoCard(todo);
      todoList.appendChild(card);
    });
  }
}

export default TodoList;
