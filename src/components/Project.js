import TodoList from './Todolist';

class Project {
  #todolist = new TodoList();

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  get todos() {
    return this.#todolist;
  }

  addTodo(todo) {
    this.#todolist.push(todo);
  }
}

export default Project;
