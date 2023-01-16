import Project from './Project';

export default class ProjectList {
  constructor() {
    this.projects = [];
    this.selectedProject = {};
  }

  getProjects() {
    return this.projects;
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
    if (this.selectedProject.length > 0) {
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

  addProject(name) {
    const project = new Project(this.projects.length, name);
    this.projects.push(project);
    this.selectedProject = project;
  }

  #projectButton(project) {
    const projectBtn = document.createElement('button');
    projectBtn.innerHTML = `${project.name} ->`;
    projectBtn.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1');
    projectBtn.addEventListener('click', () => {
      this.#setCurrentProject(project);
      this.displayProjects();
    });
    return projectBtn;
  }

  displayProjects() {
    const projectList = document.querySelector('#projects-list');
    projectList.innerHTML = '';
    this.projects.forEach((project) => {
      const projectBtn = this.#projectButton(project);
      if (project.getIsCurrent()) {
        projectBtn.classList.add('bg-lime-500');
      }
      projectList.appendChild(projectBtn);
    });
    this.selectedProject.displayTodos();
  }
}
