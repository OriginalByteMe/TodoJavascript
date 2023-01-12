import TodoList from './Todolist';

class Project {
  #todolist = new TodoList();

  #isCurrent = false;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  get isCurrent() {
    return this.#isCurrent;
  }

  set isCurrent(current) {
    this.#isCurrent = current;
  }

  get todos() {
    return this.#todolist;
  }

  addTodo(todo) {
    this.#todolist.addTodo(todo);
  }

  displayTodos() {
    this.#todolist.displayTodos();
  }
}

export default Project;
