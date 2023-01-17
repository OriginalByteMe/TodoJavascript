import Project from './Project';
import ProjectList from './ProjectList';
import TodoItem from './TodoItem';
import TodoList from './Todolist';

export default class Storage {
  static saveProjectList(data) {
    localStorage.setItem('projectList', JSON.stringify(data));
  }

  static getProjectList() {
    const projectList = Object.assign(
      new ProjectList(),
      JSON.parse(localStorage.getItem('projectList')),
    );

    if (projectList === null || projectList.getProjects().numProjects === 0) {
      return projectList;
    }

    projectList.setProjects(
      projectList.getProjects().map((project) => Object.assign(new Project(), project)),
    );

    // eslint-disable-next-line max-len
    projectList
      .getProjects()
      .forEach((project) => 
        project.setTodoList(
          Object.assign(new TodoList(), project.getTodoList()))
      );

    projectList.setCurrentProjectByIndex(0);
    // eslint-disable-next-line max-len
    projectList
    .getProjects()
    .forEach((project) => 
    project.getTodoList().setTodos(
      project.getTodoList().getTodos().map(
        (todo) => Object.assign(new TodoItem(), todo)))
        );
        
    // projectList.getProjects().forEach((project) => { console.log("Project:",project,"\nTodos: ",project.getTodoList().getTodos()); });
    return projectList;
  }

  static addTodo(projectName, todo) {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).addTodo(todo);
    Storage.saveProjectList(projectList);
  }

  static addProject(project){
    const projectList = Storage.getProjectList();
    if (projectList === null) {
      return;
    }
    projectList.addProject(project);
    Storage.saveProjectList(projectList);
  }
}
