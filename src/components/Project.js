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

  addTodo(name, description, date) {
    this.#todolist.addTodo(name, description, date);
  }

  displayTodos() {
    this.#todolist.displayTodos();
  }
}

export default Project;
