import TodoItem from './TodoItem';

class TodoList {
  constructor(name) {
    this.todos = [];
    this.projectName = name;
  }

  getTodos() {
    return this.todos;
  }

  setProjectName(projectName) {
    this.projectName = projectName;
  }

  getProjectName() {
    return this.projectName;
  }

  setTodos(todos) {
    this.todos = todos;
  }

  getNumTodos() {
    return this.todos.length - 1;
  }


  addTodoByDetails(name, description, date) {
    const id = this.getNumTodos();
    const todo = new TodoItem(id, name, description, date);
    this.todos.push(todo);
  }

  addTodo(todoItem){
    this.todos.push(todoItem)
  }

  contains(todoId){
    return this.todos.some((todo) => todo.getID === todoId)
  }

  removeTodo(todoID) {
    this.todos = this.todos.filter((todo) => todo.getID !== todoID )
  }


}

export default TodoList;
