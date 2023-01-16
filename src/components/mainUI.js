import ProjectList from './ProjectList';
import Storage from './Storage';

const mainUI = () => {
  const projects = new ProjectList();

  const addProject = () => {
    const formSubmit = document.querySelector('#project-submit');
    const projectInput = document.querySelector('#project-title');
    formSubmit.addEventListener('click', (e) => {
      const title = projectInput.value;
      projects.addProject(title);
      Storage.addProject(title);
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
    Storage.saveProjectList(projects);
    projects.addProject(project1);
    Storage.addProject(project1);
    projects.getCurrentProject().addTodo('Gotta email dad', 'He really needs this email soon', new Date());
    projects.addProject(project2);
    Storage.addProject(project2);
    projects.getCurrentProject().addTodo('Gotta get groceries', "I'm very hungry rn", new Date());
    Storage.addTodo(project1, 'Gotta email dad', 'He really needs this email soon', new Date());
    Storage.addTodo(project2, 'Gotta get groceries', "I'm very hungry rn", new Date());
    projects.setCurrentProjectByIndex(0);
    projects.displayProjects();
    console.log("Retrieve saved projectlist: ",Storage.getProjectList());
  }
  return { render };
};

export default mainUI;
