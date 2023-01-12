class TodoItem {
  constructor(id, name, description, date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
  }

  get getID() {
    return this.id;
  }
}

export default TodoItem;
