import ProjectList from './ProjectList';
import Project from './Project';

const mainUI = () => {
  const projects = new ProjectList();

  const todoCard = (title, description, dueDate) => {
    const todo = document.createElement('div');
    const todoTitle = document.createElement('h3');
    const todoDescription = document.createElement('p');
    const todoDueDate = document.createElement('p');
    todoTitle.innerHTML = `${title}`;
    todoDescription.innerHTML = `${description}`;
    todoDueDate.innerHTML = `Due date: ${dueDate}`;
    todoTitle.classList.add('text-xl', 'font-bold');
    todoDescription.classList.add('text-lg');
    todoDueDate.classList.add('text-lg');
    todo.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1');
    todo.appendChild(todoTitle);
    todo.appendChild(todoDescription);
    todo.appendChild(todoDueDate);
    return todo;
  };
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
      const todo = todoCard(titleVal, descriptionVal, dateVal);
      todoList.appendChild(todo);
      e.preventDefault();
      title.value = '';
      description.value = '';
      date.value = '';
    });
  };

  function render() {
    addProject();
    addTodo();
  }
  return { render };
};

export default mainUI;
