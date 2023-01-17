/* eslint-disable camelcase */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Project.js":
/*!***********************************!*\
  !*** ./src/components/Project.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Todolist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Todolist */ "./src/components/Todolist.js");
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Storage */ "./src/components/Storage.js");
/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoItem */ "./src/components/TodoItem.js");




class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.todolist = new _Todolist__WEBPACK_IMPORTED_MODULE_0__["default"](name);
    this.isCurrent = false;
  }

  getName() {
    return this.name;
  }

  getIsCurrent() {
    return this.isCurrent;
  }

  setIsCurrent(current) {
    this.isCurrent = current;
  }

  getTodos(){
    return this.todolist.getTodos();
  }
  getTodoList() {
    return this.todolist;
  }

  setTodoList(todos) {
    this.todolist = todos;
  }

  addTodoByDetails(name, description, date) {
    if (name === undefined || description === undefined || date === undefined) {
      return;
    }
    this.todolist.addTodoByDetails(name, description, date);
    const todoItem = new _TodoItem__WEBPACK_IMPORTED_MODULE_2__["default"](this.todolist.getNumTodos(), name, description, date);
    _Storage__WEBPACK_IMPORTED_MODULE_1__["default"].addTodo(this.name, todoItem);
  }

  addTodo(todoItem){
    this.todolist.addTodo(todoItem);
  }

  removeTodo(todoItem){
    this.todolist.removeTodo(todoItem);
    _Storage__WEBPACK_IMPORTED_MODULE_1__["default"].removeTodo(this.name, todoItem);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);


/***/ }),

/***/ "./src/components/ProjectList.js":
/*!***************************************!*\
  !*** ./src/components/ProjectList.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/components/Project.js");
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Storage */ "./src/components/Storage.js");



class ProjectList {
  constructor() {
    this.projects = [];
    this.selectedProject = {};
  }

  getProjects() {
    return this.projects;
  }

  getStoredProjects() {
    const projectList = _Storage__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectList();
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
    const project = new _Project__WEBPACK_IMPORTED_MODULE_0__["default"](this.projects.length, name);
    this.projects.push(project);
    this.selectedProject = project;
    _Storage__WEBPACK_IMPORTED_MODULE_1__["default"].addProject(project);
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


/***/ }),

/***/ "./src/components/Storage.js":
/*!***********************************!*\
  !*** ./src/components/Storage.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/components/Project.js");
/* harmony import */ var _ProjectList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProjectList */ "./src/components/ProjectList.js");
/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoItem */ "./src/components/TodoItem.js");
/* harmony import */ var _Todolist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Todolist */ "./src/components/Todolist.js");





class Storage {
  static saveProjectList(data) {
    localStorage.setItem('projectList', JSON.stringify(data));
  }

  static getProjectList() {
    const projectList = Object.assign(
      new _ProjectList__WEBPACK_IMPORTED_MODULE_1__["default"](),
      JSON.parse(localStorage.getItem('projectList')),
    );

    if (projectList === null || projectList.getProjects().numProjects === 0) {
      return projectList;
    }

    projectList.setProjects(
      projectList.getProjects().map((project) => Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_0__["default"](), project)),
    );

    // eslint-disable-next-line max-len
    projectList
      .getProjects()
      .forEach((project) => 
        project.setTodoList(
          Object.assign(new _Todolist__WEBPACK_IMPORTED_MODULE_3__["default"](), project.getTodoList()))
      );

    projectList.setCurrentProjectByIndex(0);
    // eslint-disable-next-line max-len
    projectList
    .getProjects()
    .forEach((project) => 
    project.getTodoList().setTodos(
      project.getTodoList().getTodos().map(
        (todo) => Object.assign(new _TodoItem__WEBPACK_IMPORTED_MODULE_2__["default"](), todo)))
        );
        
    return projectList;
  }

  static addTodo(projectName, todo) {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).addTodo(todo);
    Storage.saveProjectList(projectList);
  }

  static removeTodo(projectName, todoID) {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).getTodoList().removeTodo(todoID);
    Storage.saveProjectList(projectList);
  }

  static addProject(project){
    const projectList = Storage.getProjectList();
    if (projectList === null) {
      return;
    }
    projectList.addProject(project);
    Storage.saveProjectList(projectList);
  }
}


/***/ }),

/***/ "./src/components/TodoItem.js":
/*!************************************!*\
  !*** ./src/components/TodoItem.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TodoItem {
  constructor(id, name, description, date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
  }

  get getID() {
    return this.id;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoItem);


/***/ }),

/***/ "./src/components/Todolist.js":
/*!************************************!*\
  !*** ./src/components/Todolist.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoItem */ "./src/components/TodoItem.js");


class TodoList {
  constructor(name) {
    this.todos = [];
    this.projectName = name;
  }

  getTodos() {
    return this.todos;
  }

  setProjectName(projectName) {
    this.projectName = projectName;
  }

  getProjectName() {
    return this.projectName;
  }

  setTodos(todos) {
    this.todos = todos;
  }

  getNumTodos() {
    return this.todos.length - 1;
  }


  addTodoByDetails(name, description, date) {
    const id = this.getNumTodos();
    const todo = new _TodoItem__WEBPACK_IMPORTED_MODULE_0__["default"](id, name, description, date);
    this.todos.push(todo);
  }

  addTodo(todoItem){
    this.todos.push(todoItem)
  }

  contains(todoId){
    return this.todos.some((todo) => todo.getID === todoId)
  }

  removeTodo(todoID) {
    this.todos = this.todos.filter((todo) => todo.getID !== todoID )
  }


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoList);


/***/ }),

/***/ "./src/components/mainUI.js":
/*!**********************************!*\
  !*** ./src/components/mainUI.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProjectList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectList */ "./src/components/ProjectList.js");

const mainUI = () => {
  const projects = new _ProjectList__WEBPACK_IMPORTED_MODULE_0__["default"]();

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
      projects.displayProjects();
      title.value = '';
      description.value = '';
      date.value = '';
      e.preventDefault();
    });
  };

  
  function render() {
    addProject();
    addTodo();
    projects.getStoredProjects();
    projects.displayProjects();
  }
  return { render };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mainUI);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_mainUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/mainUI */ "./src/components/mainUI.js");


(0,_components_mainUI__WEBPACK_IMPORTED_MODULE_0__["default"])().render();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQztBQUNGO0FBQ0U7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlEQUFRO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlEQUFRO0FBQ2pDLElBQUksd0RBQWU7QUFDbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLDJEQUFrQjtBQUN0QjtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RFM7QUFDQTs7QUFFakI7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsK0RBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixnREFBTztBQUMvQjtBQUNBO0FBQ0EsSUFBSSwyREFBa0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsVUFBVTtBQUN2QyxtQ0FBbUMsaUJBQWlCO0FBQ3BELHlDQUF5QyxVQUFVO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0lnQztBQUNRO0FBQ047QUFDQTs7QUFFbkI7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsb0RBQVc7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRUFBbUUsZ0RBQU87QUFDMUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpREFBUTtBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxpREFBUTtBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDYlU7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHFCQUFxQixpREFBUTtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRGdCO0FBQ3hDO0FBQ0EsdUJBQXVCLG9EQUFXOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7OztVQzVDdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055Qzs7QUFFekMsOERBQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9Qcm9qZWN0TGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1RvZG9saXN0LmpzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvbWFpblVJLmpzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvZG9MaXN0IGZyb20gJy4vVG9kb2xpc3QnO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9TdG9yYWdlJztcbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtJztcblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKGlkLCBuYW1lKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50b2RvbGlzdCA9IG5ldyBUb2RvTGlzdChuYW1lKTtcbiAgICB0aGlzLmlzQ3VycmVudCA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0SXNDdXJyZW50KCkge1xuICAgIHJldHVybiB0aGlzLmlzQ3VycmVudDtcbiAgfVxuXG4gIHNldElzQ3VycmVudChjdXJyZW50KSB7XG4gICAgdGhpcy5pc0N1cnJlbnQgPSBjdXJyZW50O1xuICB9XG5cbiAgZ2V0VG9kb3MoKXtcbiAgICByZXR1cm4gdGhpcy50b2RvbGlzdC5nZXRUb2RvcygpO1xuICB9XG4gIGdldFRvZG9MaXN0KCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9saXN0O1xuICB9XG5cbiAgc2V0VG9kb0xpc3QodG9kb3MpIHtcbiAgICB0aGlzLnRvZG9saXN0ID0gdG9kb3M7XG4gIH1cblxuICBhZGRUb2RvQnlEZXRhaWxzKG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG4gICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCB8fCBkZXNjcmlwdGlvbiA9PT0gdW5kZWZpbmVkIHx8IGRhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRvZG9saXN0LmFkZFRvZG9CeURldGFpbHMobmFtZSwgZGVzY3JpcHRpb24sIGRhdGUpO1xuICAgIGNvbnN0IHRvZG9JdGVtID0gbmV3IFRvZG9JdGVtKHRoaXMudG9kb2xpc3QuZ2V0TnVtVG9kb3MoKSwgbmFtZSwgZGVzY3JpcHRpb24sIGRhdGUpO1xuICAgIFN0b3JhZ2UuYWRkVG9kbyh0aGlzLm5hbWUsIHRvZG9JdGVtKTtcbiAgfVxuXG4gIGFkZFRvZG8odG9kb0l0ZW0pe1xuICAgIHRoaXMudG9kb2xpc3QuYWRkVG9kbyh0b2RvSXRlbSk7XG4gIH1cblxuICByZW1vdmVUb2RvKHRvZG9JdGVtKXtcbiAgICB0aGlzLnRvZG9saXN0LnJlbW92ZVRvZG8odG9kb0l0ZW0pO1xuICAgIFN0b3JhZ2UucmVtb3ZlVG9kbyh0aGlzLm5hbWUsIHRvZG9JdGVtKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0O1xuIiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBTdG9yYWdlIGZyb20gJy4vU3RvcmFnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RMaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0ge307XG4gIH1cblxuICBnZXRQcm9qZWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcbiAgfVxuXG4gIGdldFN0b3JlZFByb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gU3RvcmFnZS5nZXRQcm9qZWN0TGlzdCgpO1xuICAgIGlmIChwcm9qZWN0TGlzdCA9PT0gbnVsbCB8fCBwcm9qZWN0TGlzdC5nZXRQcm9qZWN0cygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFByb2plY3RzKHByb2plY3RMaXN0LmdldFByb2plY3RzKCkpO1xuICAgIHRoaXMuI3NldEN1cnJlbnRQcm9qZWN0KHByb2plY3RMaXN0LmdldEN1cnJlbnRQcm9qZWN0KCkpO1xuICB9XG5cbiAgZ2V0UHJvamVjdChuYW1lKSB7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3RzKCkuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXROYW1lKCkgPT09IG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0cygpLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0SXNDdXJyZW50KCkpO1xuICB9XG5cbiAgc2V0UHJvamVjdHMocHJvamVjdHMpIHtcbiAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHM7XG4gIH1cblxuICBnZXQgbnVtUHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMubGVuZ3RoO1xuICB9XG5cbiAgZ2V0Q3VycmVudFByb2plY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRQcm9qZWN0O1xuICB9XG5cbiAgI3NldEN1cnJlbnRQcm9qZWN0KHByb2plY3QpIHtcbiAgICBpZiAodGhpcy5nZXRQcm9qZWN0cygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5nZXRDdXJyZW50UHJvamVjdCgpKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkUHJvamVjdC5zZXRJc0N1cnJlbnQoZmFsc2UpO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdDtcbiAgICB0aGlzLnNlbGVjdGVkUHJvamVjdC5zZXRJc0N1cnJlbnQodHJ1ZSk7XG4gIH1cblxuICBzZXRDdXJyZW50UHJvamVjdEJ5SW5kZXgoaW5kZXgpIHtcbiAgICBpZiAodGhpcy5nZXRQcm9qZWN0cygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZWxlY3RlZFByb2plY3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFByb2plY3Quc2V0SXNDdXJyZW50KGZhbHNlKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkUHJvamVjdCA9IHRoaXMucHJvamVjdHNbaW5kZXhdO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0LnNldElzQ3VycmVudCh0cnVlKTtcbiAgfVxuXG4gIGFkZFByb2plY3RCeU5hbWUobmFtZSkge1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdCh0aGlzLnByb2plY3RzLmxlbmd0aCwgbmFtZSk7XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdDtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgdGhpcy5kaXNwbGF5UHJvamVjdHMoKVxuICB9XG5cbiAgYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdDtcbiAgfVxuXG4gICNwcm9qZWN0QnV0dG9uKHByb2plY3QpIHtcbiAgICBjb25zdCBwcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgcHJvamVjdEJ0bi5pbm5lckhUTUwgPSBgJHtwcm9qZWN0Lm5hbWV9IC0+YDtcbiAgICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2JvcmRlci0yJywgJ2JvcmRlci1pbmRpZ28tNTAwJywgJ3JvdW5kZWQtbWQnLCAnaG92ZXI6YmctaW5kaWdvLTMwMCcsICdwLTEnKTtcbiAgICBwcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1Byb2plY3QgOicsIHByb2plY3QpO1xuICAgICAgdGhpcy4jc2V0Q3VycmVudFByb2plY3QocHJvamVjdCk7XG4gICAgICB0aGlzLmRpc3BsYXlQcm9qZWN0cygpO1xuICAgIH0pO1xuICAgIHJldHVybiBwcm9qZWN0QnRuO1xuICB9XG5cbiAgI3RvZG9DYXJkKHByb2plY3QsIHRvZG8pIHtcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBjb25zdCB0b2RvRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY29uc3QgdG9kb0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdG9kb1RpdGxlLmlubmVySFRNTCA9IGAke3RvZG8ubmFtZX1gO1xuICAgIHRvZG9EZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0b2RvLmRlc2NyaXB0aW9ufWA7XG4gICAgdG9kb0R1ZURhdGUuaW5uZXJIVE1MID0gYER1ZSBkYXRlOiAke3RvZG8uZGF0ZX1gO1xuICAgIHRvZG9UaXRsZS5jbGFzc0xpc3QuYWRkKCd0ZXh0LXhsJywgJ2ZvbnQtYm9sZCcpO1xuICAgIHRvZG9EZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxnJyk7XG4gICAgdG9kb0R1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGV4dC1sZycpO1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnYm9yZGVyLTInLCAnYm9yZGVyLWluZGlnby01MDAnLCAncm91bmRlZC1tZCcsICdob3ZlcjpiZy1pbmRpZ28tMzAwJywgJ3AtMScsICdjdXJzb3ItcG9pbnRlcicpO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQodG9kb1RpdGxlKTtcbiAgICBjYXJkLmFwcGVuZENoaWxkKHRvZG9EZXNjcmlwdGlvbik7XG4gICAgY2FyZC5hcHBlbmRDaGlsZCh0b2RvRHVlRGF0ZSk7XG5cbiAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcHJvamVjdC5yZW1vdmVUb2RvKHRvZG8uZ2V0SUQpO1xuICAgICAgdGhpcy5kaXNwbGF5UHJvamVjdHMoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gY2FyZDtcbiAgfVxuXG4gIGRpc3BsYXlUb2Rvcyhwcm9qZWN0KXtcbiAgICBjb25zdCB0b2RvcyA9IHByb2plY3QuZ2V0VG9kb3MoKTtcbiAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLWxpc3QnKTtcbiAgICB0b2RvTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICB0b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICBjb25zdCBjYXJkID0gdGhpcy4jdG9kb0NhcmQocHJvamVjdCwgdG9kbyk7XG4gICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChjYXJkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRpc3BsYXlQcm9qZWN0cygpIHtcbiAgICBpZiAodGhpcy5udW1Qcm9qZWN0cyA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RzLWxpc3QnKTtcbiAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLnByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3RCdG4gPSB0aGlzLiNwcm9qZWN0QnV0dG9uKHByb2plY3QpO1xuICAgICAgaWYgKHByb2plY3QuZ2V0SXNDdXJyZW50KCkpIHtcbiAgICAgICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdiZy1saW1lLTUwMCcpO1xuICAgICAgICB0aGlzLmRpc3BsYXlUb2Rvcyhwcm9qZWN0KTtcbiAgICAgIH1cbiAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RCdG4pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFByb2plY3RMaXN0IGZyb20gJy4vUHJvamVjdExpc3QnO1xuaW1wb3J0IFRvZG9JdGVtIGZyb20gJy4vVG9kb0l0ZW0nO1xuaW1wb3J0IFRvZG9MaXN0IGZyb20gJy4vVG9kb2xpc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIHtcbiAgc3RhdGljIHNhdmVQcm9qZWN0TGlzdChkYXRhKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RMaXN0JywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9XG5cbiAgc3RhdGljIGdldFByb2plY3RMaXN0KCkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIG5ldyBQcm9qZWN0TGlzdCgpLFxuICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdExpc3QnKSksXG4gICAgKTtcblxuICAgIGlmIChwcm9qZWN0TGlzdCA9PT0gbnVsbCB8fCBwcm9qZWN0TGlzdC5nZXRQcm9qZWN0cygpLm51bVByb2plY3RzID09PSAwKSB7XG4gICAgICByZXR1cm4gcHJvamVjdExpc3Q7XG4gICAgfVxuXG4gICAgcHJvamVjdExpc3Quc2V0UHJvamVjdHMoXG4gICAgICBwcm9qZWN0TGlzdC5nZXRQcm9qZWN0cygpLm1hcCgocHJvamVjdCkgPT4gT2JqZWN0LmFzc2lnbihuZXcgUHJvamVjdCgpLCBwcm9qZWN0KSksXG4gICAgKTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcHJvamVjdExpc3RcbiAgICAgIC5nZXRQcm9qZWN0cygpXG4gICAgICAuZm9yRWFjaCgocHJvamVjdCkgPT4gXG4gICAgICAgIHByb2plY3Quc2V0VG9kb0xpc3QoXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihuZXcgVG9kb0xpc3QoKSwgcHJvamVjdC5nZXRUb2RvTGlzdCgpKSlcbiAgICAgICk7XG5cbiAgICBwcm9qZWN0TGlzdC5zZXRDdXJyZW50UHJvamVjdEJ5SW5kZXgoMCk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBwcm9qZWN0TGlzdFxuICAgIC5nZXRQcm9qZWN0cygpXG4gICAgLmZvckVhY2goKHByb2plY3QpID0+IFxuICAgIHByb2plY3QuZ2V0VG9kb0xpc3QoKS5zZXRUb2RvcyhcbiAgICAgIHByb2plY3QuZ2V0VG9kb0xpc3QoKS5nZXRUb2RvcygpLm1hcChcbiAgICAgICAgKHRvZG8pID0+IE9iamVjdC5hc3NpZ24obmV3IFRvZG9JdGVtKCksIHRvZG8pKSlcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIHByb2plY3RMaXN0O1xuICB9XG5cbiAgc3RhdGljIGFkZFRvZG8ocHJvamVjdE5hbWUsIHRvZG8pIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IFN0b3JhZ2UuZ2V0UHJvamVjdExpc3QoKTtcbiAgICBwcm9qZWN0TGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5hZGRUb2RvKHRvZG8pO1xuICAgIFN0b3JhZ2Uuc2F2ZVByb2plY3RMaXN0KHByb2plY3RMaXN0KTtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVUb2RvKHByb2plY3ROYW1lLCB0b2RvSUQpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IFN0b3JhZ2UuZ2V0UHJvamVjdExpc3QoKTtcbiAgICBwcm9qZWN0TGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5nZXRUb2RvTGlzdCgpLnJlbW92ZVRvZG8odG9kb0lEKTtcbiAgICBTdG9yYWdlLnNhdmVQcm9qZWN0TGlzdChwcm9qZWN0TGlzdCk7XG4gIH1cblxuICBzdGF0aWMgYWRkUHJvamVjdChwcm9qZWN0KXtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IFN0b3JhZ2UuZ2V0UHJvamVjdExpc3QoKTtcbiAgICBpZiAocHJvamVjdExpc3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHJvamVjdExpc3QuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICBTdG9yYWdlLnNhdmVQcm9qZWN0TGlzdChwcm9qZWN0TGlzdCk7XG4gIH1cbn1cbiIsImNsYXNzIFRvZG9JdGVtIHtcbiAgY29uc3RydWN0b3IoaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gIH1cblxuICBnZXQgZ2V0SUQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0l0ZW07XG4iLCJpbXBvcnQgVG9kb0l0ZW0gZnJvbSAnLi9Ub2RvSXRlbSc7XG5cbmNsYXNzIFRvZG9MaXN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMudG9kb3MgPSBbXTtcbiAgICB0aGlzLnByb2plY3ROYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldFRvZG9zKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zO1xuICB9XG5cbiAgc2V0UHJvamVjdE5hbWUocHJvamVjdE5hbWUpIHtcbiAgICB0aGlzLnByb2plY3ROYW1lID0gcHJvamVjdE5hbWU7XG4gIH1cblxuICBnZXRQcm9qZWN0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0TmFtZTtcbiAgfVxuXG4gIHNldFRvZG9zKHRvZG9zKSB7XG4gICAgdGhpcy50b2RvcyA9IHRvZG9zO1xuICB9XG5cbiAgZ2V0TnVtVG9kb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3MubGVuZ3RoIC0gMTtcbiAgfVxuXG5cbiAgYWRkVG9kb0J5RGV0YWlscyhuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5nZXROdW1Ub2RvcygpO1xuICAgIGNvbnN0IHRvZG8gPSBuZXcgVG9kb0l0ZW0oaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKTtcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG4gIH1cblxuICBhZGRUb2RvKHRvZG9JdGVtKXtcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kb0l0ZW0pXG4gIH1cblxuICBjb250YWlucyh0b2RvSWQpe1xuICAgIHJldHVybiB0aGlzLnRvZG9zLnNvbWUoKHRvZG8pID0+IHRvZG8uZ2V0SUQgPT09IHRvZG9JZClcbiAgfVxuXG4gIHJlbW92ZVRvZG8odG9kb0lEKSB7XG4gICAgdGhpcy50b2RvcyA9IHRoaXMudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLmdldElEICE9PSB0b2RvSUQgKVxuICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvTGlzdDtcbiIsImltcG9ydCBQcm9qZWN0TGlzdCBmcm9tICcuL1Byb2plY3RMaXN0JztcbmNvbnN0IG1haW5VSSA9ICgpID0+IHtcbiAgY29uc3QgcHJvamVjdHMgPSBuZXcgUHJvamVjdExpc3QoKTtcblxuICBjb25zdCBhZGRQcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvcm1TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1zdWJtaXQnKTtcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10aXRsZScpO1xuICAgIGZvcm1TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdGl0bGUgPSBwcm9qZWN0SW5wdXQudmFsdWU7XG4gICAgICBwcm9qZWN0cy5hZGRQcm9qZWN0QnlOYW1lKHRpdGxlKTtcbiAgICAgIHByb2plY3RzLmRpc3BsYXlQcm9qZWN0cygpO1xuICAgICAgcHJvamVjdElucHV0LnZhbHVlID0gJyc7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYWRkVG9kbyA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tc3VibWl0Jyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby10aXRsZScpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tZGVzY3JpcHRpb24nKTtcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tZGF0ZScpO1xuICAgIGZvcm1TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdGl0bGVWYWwgPSB0aXRsZS52YWx1ZTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsID0gZGVzY3JpcHRpb24udmFsdWU7XG4gICAgICBjb25zdCBkYXRlVmFsID0gZGF0ZS52YWx1ZTtcbiAgICAgIHByb2plY3RzLmdldEN1cnJlbnRQcm9qZWN0KCkuYWRkVG9kb0J5RGV0YWlscyh0aXRsZVZhbCwgZGVzY3JpcHRpb25WYWwsIGRhdGVWYWwpO1xuICAgICAgcHJvamVjdHMuZGlzcGxheVByb2plY3RzKCk7XG4gICAgICB0aXRsZS52YWx1ZSA9ICcnO1xuICAgICAgZGVzY3JpcHRpb24udmFsdWUgPSAnJztcbiAgICAgIGRhdGUudmFsdWUgPSAnJztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBcbiAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGFkZFByb2plY3QoKTtcbiAgICBhZGRUb2RvKCk7XG4gICAgcHJvamVjdHMuZ2V0U3RvcmVkUHJvamVjdHMoKTtcbiAgICBwcm9qZWN0cy5kaXNwbGF5UHJvamVjdHMoKTtcbiAgfVxuICByZXR1cm4geyByZW5kZXIgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1haW5VSTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IG1haW5VSSBmcm9tICcuL2NvbXBvbmVudHMvbWFpblVJJztcblxubWFpblVJKCkucmVuZGVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=