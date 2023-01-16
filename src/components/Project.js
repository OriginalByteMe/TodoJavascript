import TodoList from './Todolist';

class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.todolist = new TodoList();
    this.isCurrent = false;
  }

  getName() {
    return this.name;
  }

  getIsCurrent() {
    return this.isCurrent;
  }

  setIsCurrent(current) {
    this.isCurrent = current;
  }

  getTodoList() {
    return this.todolist;
  }

  setTodoList(todos) {
    this.todolist = todos;
  }

  addTodo(name, description, date) {
    if (name === undefined || description === undefined || date === undefined) {
      return;
    }
    this.todolist.addTodo(name, description, date);
  }

  displayTodos() {
    this.todolist.displayTodos();
  }
}

export default Project;
