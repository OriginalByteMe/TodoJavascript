import TodoList from './Todolist';
import Storage from './Storage';
import TodoItem from './TodoItem';

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

  addTodoByDetails(name, description, date) {
    if (name === undefined || description === undefined || date === undefined) {
      return;
    }
    this.todolist.addTodoByDetails(name, description, date);
    const todoItem = new TodoItem(this.todolist.getNumTodos(), name, description, date);
    Storage.addTodo(this.name, todoItem);
  }

  addTodo(todoItem){
    console.log("Todoitem added:", todoItem)
    this.todolist.addTodo(todoItem);
  }
  displayTodos() {
    this.todolist.displayTodos();
  }
}

export default Project;
