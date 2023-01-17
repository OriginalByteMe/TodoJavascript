import ProjectList from './ProjectList';
import Storage from './Storage';

const mainUI = () => {
  const projects = new ProjectList();

  const addProject = () => {
    const formSubmit = document.querySelector('#project-submit');
    const projectInput = document.querySelector('#project-title');
    formSubmit.addEventListener('click', (e) => {
      const title = projectInput.value;
      projects.addProjectByName(title);
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
      projects.getCurrentProject().addTodoByDetails(titleVal, descriptionVal, dateVal);
      e.preventDefault();
      title.value = '';
      description.value = '';
      date.value = '';
    });
  };

  function render() {
    addProject();
    addTodo();
    // Storage.saveProjectList(projects);
    projects.getStoredProjects();
    projects.displayProjects();
    console.log("Retrieve saved projectlist: ",Storage.getProjectList());
  }
  return { render };
};

export default mainUI;
