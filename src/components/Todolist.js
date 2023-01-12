class TodoList {
  #todos = [];

  get todos() {
    return this.#todos;
  }

  get numTodos() {
    return this.#todos.length;
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }

  static todoCard(todo) {
    const card = document.createElement('div');
    const todoTitle = document.createElement('h3');
    const todoDescription = document.createElement('p');
    const todoDueDate = document.createElement('p');
    todoTitle.innerHTML = `${todo.title}`;
    todoDescription.innerHTML = `${todo.description}`;
    todoDueDate.innerHTML = `Due date: ${todo.dueDate}`;
    todoTitle.classList.add('text-xl', 'font-bold');
    todoDescription.classList.add('text-lg');
    todoDueDate.classList.add('text-lg');
    card.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1');
    card.appendChild(todoTitle);
    card.appendChild(todoDescription);
    card.appendChild(todoDueDate);
    return card;
  }

  displayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    this.#todos.forEach((todo) => {
      const card = TodoList.todoCard(todo);
      todoList.appendChild(card);
    });
  }
}

export default TodoList;
