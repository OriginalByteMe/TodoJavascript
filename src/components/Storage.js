import Project from './Project';
import ProjectList from './ProjectList';
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

    projectList.setProjects(
      projectList.getProjects().map((project) => Object.assign(new Project(), project)),
    );

    // eslint-disable-next-line max-len
    projectList.getProjects().forEach((project) => project.setTodos(Object.assign(new TodoList(), project.getTodos)));

    return projectList;
  }
}
