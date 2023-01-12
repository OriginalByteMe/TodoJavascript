import TodoList from './Todolist';

class Project {
  // #todolist = new TodoList();

  // #isCurrent = false;

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.todolist = new TodoList();
    this.isCurrent = false;
  }

  getIsCurrent() {
    return this.isCurrent;
  }

  setIsCurrent(current) {
    this.isCurrent = current;
  }

  getTodos() {
    return this.todolist;
  }

  setTodos(todos) {
    this.todolist = todos;
  }

  addTodo(name, description, date) {
    this.todolist.addTodo(name, description, date);
  }

  displayTodos() {
    this.todolist.displayTodos();
  }
}

export default Project;
