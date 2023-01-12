class ProjectList {
  #projects = [];

  #selectedProject = [];

  get projects() {
    return this.#projects;
  }

  get numProjects() {
    return this.#projects.length;
  }

  get currentProject() {
    return this.#selectedProject;
  }

  set currentProject(project) {
    this.#selectedProject.isCurrent = false;

    this.#selectedProject = project;
    this.#selectedProject.isCurrent = true;
  }

  addProject(project) {
    this.#projects.push(project);
    this.currentProject = project;
  }

  #projectButton(project) {
    const projectBtn = document.createElement('button');
    projectBtn.innerHTML = `${project.name} ->`;
    projectBtn.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1');
    projectBtn.addEventListener('click', () => {
      this.currentProject = project;
      this.displayProjects();
    });
    return projectBtn;
  }

  displayProjects() {
    const projectList = document.querySelector('#projects-list');
    projectList.innerHTML = '';
    this.#projects.forEach((project) => {
      const projectBtn = this.#projectButton(project);
      if (project.isCurrent) {
        projectBtn.classList.add('bg-lime-500');
      }
      projectList.appendChild(projectBtn);
    });
    this.currentProject.displayTodos();
  }
}

export default ProjectList;
