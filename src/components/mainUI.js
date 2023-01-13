import ProjectList from './ProjectList';
import Project from './Project';
import Storage from './Storage';

const mainUI = () => {
  const projects = new ProjectList();

  const addProject = () => {
    const formSubmit = document.querySelector('#project-submit');
    const projectInput = document.querySelector('#project-title');
    formSubmit.addEventListener('click', (e) => {
      const title = projectInput.value;
      projects.addProject(title);
      projects.displayProjects();
      projectInput.value = '';
      e.preventDefault();
    });
  };

  const addTodo = () => {
    const formSubmit = document.querySelector('#todo-submit');
    const title = document.querySelector('#todo-title');
    const description = document.querySelector('#todo-description');
    const date = document.querySelector('#todo-date');
    formSubmit.addEventListener('click', (e) => {
      const titleVal = title.value;
      const descriptionVal = description.value;
      const dateVal = date.value;
      projects.currentProject.addTodo(titleVal, descriptionVal, dateVal);
      e.preventDefault();
      title.value = '';
      description.value = '';
      date.value = '';
    });
  };

  function render() {
    addProject();
    addTodo();
    const project1 = 'emails';
    const project2 = 'Groceries';
    projects.addProject(project1);
    projects.getCurrentProject().addTodo('Gotta email dad', 'He really needs this email soon', new Date());
    projects.addProject(project2);
    projects.getCurrentProject().addTodo('Gotta get groceries', "I'm very hungry rn", new Date());
    projects.setCurrentProjectByIndex(0);
    Storage.saveProjectList(projects);
    console.log('live projects:', projects);
    console.log('Project list:', localStorage.getItem('projectList'));
    projects.displayProjects();
  }
  return { render };
};

export default mainUI;
