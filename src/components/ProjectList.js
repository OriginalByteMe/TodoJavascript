class ProjectList {
  #projects = [];

  #selectedProject = null;

  get projects() {
    return this.#projects;
  }

  get numProjects() {
    return this.#projects.length;
  }

  addProject(project) {
    this.#projects.push(project);
  }

  static projectButton(project) {
    const projectBtn = document.createElement('button');
    projectBtn.innerHTML = `${project.name} ->`;
    project.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1');
    project.addEventListener('click', () => {
      this.#selectedProject = project;
      project.displayTodos();
    });
    return project;
  }

  displayProjects() {
    console.log('projects:', this.#projects);
    const projectList = document.querySelector('#projects-list');
    projectList.innerHTML = '';
    this.#projects.forEach((project) => {
      const projectBtn = ProjectList.projectButton(project);
      projectList.appendChild(projectBtn);
    });
  }
}

export default ProjectList;
