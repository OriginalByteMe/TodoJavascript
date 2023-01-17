import Project from './Project';
import Storage from './Storage';

export default class ProjectList {
  constructor() {
    this.projects = [];
    this.selectedProject = {};
  }

  getProjects() {
    return this.projects;
  }

  getStoredProjects() {
    const projectList = Storage.getProjectList();
    if (projectList === null || projectList.getProjects().length === 0) {
      return;
    }
    this.setProjects(projectList.getProjects());
    this.#setCurrentProject(projectList.getCurrentProject());
  }

  getProject(name) {
    if (name) {
      return this.getProjects().find((project) => project.getName() === name);
    }
    return this.getProjects().find((project) => project.getIsCurrent());
  }

  setProjects(projects) {
    this.projects = projects;
  }

  get numProjects() {
    return this.projects.length;
  }

  getCurrentProject() {
    return this.selectedProject;
  }

  #setCurrentProject(project) {
    if (this.getProjects().length === 0) {
      return;
    }
    if (Object.keys(this.getCurrentProject()).length > 0) {
      this.selectedProject.setIsCurrent(false);
    }

    this.selectedProject = project;
    this.selectedProject.setIsCurrent(true);
  }

  setCurrentProjectByIndex(index) {
    if (this.getProjects().length === 0) {
      return;
    }
    if (this.selectedProject.length > 0) {
      this.selectedProject.setIsCurrent(false);
    }

    this.selectedProject = this.projects[index];
    this.selectedProject.setIsCurrent(true);
  }

  addProjectByName(name) {
    const project = new Project(this.projects.length, name);
    this.projects.push(project);
    this.selectedProject = project;
    Storage.addProject(project);
    this.displayProjects()
  }

  addProject(project) {
    this.projects.push(project);
    this.selectedProject = project;
  }

  #projectButton(project) {
    const projectBtn = document.createElement('button');
    projectBtn.innerHTML = `${project.name} ->`;
    projectBtn.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1');
    projectBtn.addEventListener('click', () => {
      console.log('Project :', project);
      this.#setCurrentProject(project);
      this.displayProjects();
    });
    return projectBtn;
  }

  #todoCard(project, todo) {
    const card = document.createElement('div');
    const todoTitle = document.createElement('h3');
    const todoDescription = document.createElement('p');
    const todoDueDate = document.createElement('p');
    todoTitle.innerHTML = `${todo.name}`;
    todoDescription.innerHTML = `${todo.description}`;
    todoDueDate.innerHTML = `Due date: ${todo.date}`;
    todoTitle.classList.add('text-xl', 'font-bold');
    todoDescription.classList.add('text-lg');
    todoDueDate.classList.add('text-lg');
    card.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1', 'cursor-pointer');
    card.appendChild(todoTitle);
    card.appendChild(todoDescription);
    card.appendChild(todoDueDate);

    card.addEventListener('click', () => {
      project.removeTodo(todo.getID);
      this.displayProjects();
    });
    return card;
  }

  displayTodos(project){
    const todos = project.getTodos();
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    todos.forEach((todo) => {
      const card = this.#todoCard(project, todo);
      todoList.appendChild(card);
    });
  }

  displayProjects() {
    if (this.numProjects === 0) {
      return;
    }

    const projectList = document.querySelector('#projects-list');
    projectList.innerHTML = '';
    this.projects.forEach((project) => {
      const projectBtn = this.#projectButton(project);
      if (project.getIsCurrent()) {
        projectBtn.classList.add('bg-lime-500');
        this.displayTodos(project);
      }
      projectList.appendChild(projectBtn);
    });
  }
}
