import ProjectList from './ProjectList';
import Project from './Project';
import TodoItem from './TodoItem';

const mainUI = () => {
  const projects = new ProjectList();

  const addProject = () => {
    const formSubmit = document.querySelector('#project-submit');
    const projectInput = document.querySelector('#project-title');
    formSubmit.addEventListener('click', (e) => {
      const title = projectInput.value;
      const project = new Project(projects.numProjects, title);
      projects.addProject(project);
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
      const todoItem = new TodoItem(titleVal, descriptionVal, dateVal);
      projects.currentProject.addTodo(todoItem);
      e.preventDefault();
      title.value = '';
      description.value = '';
      date.value = '';
    });
  };

  function render() {
    addProject();
    addTodo();
    const project1 = new Project(projects.numProjects, 'Emails');
    const project2 = new Project(projects.numProjects, 'Groceries');
    project1.addTodo(new TodoItem('Gotta email dad', 'He really needs this email soon', new Date()));
    project2.addTodo(new TodoItem('Gotta get groceries', "I'm very hungry rn", new Date()));
    projects.addProject(project1);
    projects.addProject(project2);
    projects.currentProject = project1;
    projects.displayProjects();
  }
  return { render };
};

export default mainUI;
