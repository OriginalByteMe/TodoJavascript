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
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Storage */ "./src/components/Storage.js");



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7QUFHQTs7QUFFQSxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbERnQjtBQUNSOztBQUVoQztBQUNBLHVCQUF1QixvREFBVzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQSxpRUFBZSxNQUFNLEVBQUM7Ozs7Ozs7VUM5Q3RCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUM7O0FBRXpDLDhEQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9Qcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvUHJvamVjdExpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9TdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvVG9kb0l0ZW0uanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9Ub2RvbGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL21haW5VSS5qcyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb2RvTGlzdCBmcm9tICcuL1RvZG9saXN0JztcbmltcG9ydCBTdG9yYWdlIGZyb20gJy4vU3RvcmFnZSc7XG5pbXBvcnQgVG9kb0l0ZW0gZnJvbSAnLi9Ub2RvSXRlbSc7XG5cbmNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihpZCwgbmFtZSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudG9kb2xpc3QgPSBuZXcgVG9kb0xpc3QobmFtZSk7XG4gICAgdGhpcy5pc0N1cnJlbnQgPSBmYWxzZTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldElzQ3VycmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0N1cnJlbnQ7XG4gIH1cblxuICBzZXRJc0N1cnJlbnQoY3VycmVudCkge1xuICAgIHRoaXMuaXNDdXJyZW50ID0gY3VycmVudDtcbiAgfVxuXG4gIGdldFRvZG9zKCl7XG4gICAgcmV0dXJuIHRoaXMudG9kb2xpc3QuZ2V0VG9kb3MoKTtcbiAgfVxuICBnZXRUb2RvTGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvbGlzdDtcbiAgfVxuXG4gIHNldFRvZG9MaXN0KHRvZG9zKSB7XG4gICAgdGhpcy50b2RvbGlzdCA9IHRvZG9zO1xuICB9XG5cbiAgYWRkVG9kb0J5RGV0YWlscyhuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSkge1xuICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQgfHwgZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCB8fCBkYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50b2RvbGlzdC5hZGRUb2RvQnlEZXRhaWxzKG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKTtcbiAgICBjb25zdCB0b2RvSXRlbSA9IG5ldyBUb2RvSXRlbSh0aGlzLnRvZG9saXN0LmdldE51bVRvZG9zKCksIG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKTtcbiAgICBTdG9yYWdlLmFkZFRvZG8odGhpcy5uYW1lLCB0b2RvSXRlbSk7XG4gIH1cblxuICBhZGRUb2RvKHRvZG9JdGVtKXtcbiAgICB0aGlzLnRvZG9saXN0LmFkZFRvZG8odG9kb0l0ZW0pO1xuICB9XG5cbiAgcmVtb3ZlVG9kbyh0b2RvSXRlbSl7XG4gICAgdGhpcy50b2RvbGlzdC5yZW1vdmVUb2RvKHRvZG9JdGVtKTtcbiAgICBTdG9yYWdlLnJlbW92ZVRvZG8odGhpcy5uYW1lLCB0b2RvSXRlbSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDtcbiIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0TGlzdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvamVjdHMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkUHJvamVjdCA9IHt9O1xuICB9XG5cbiAgZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XG4gIH1cblxuICBnZXRTdG9yZWRQcm9qZWN0cygpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IFN0b3JhZ2UuZ2V0UHJvamVjdExpc3QoKTtcbiAgICBpZiAocHJvamVjdExpc3QgPT09IG51bGwgfHwgcHJvamVjdExpc3QuZ2V0UHJvamVjdHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRQcm9qZWN0cyhwcm9qZWN0TGlzdC5nZXRQcm9qZWN0cygpKTtcbiAgICB0aGlzLiNzZXRDdXJyZW50UHJvamVjdChwcm9qZWN0TGlzdC5nZXRDdXJyZW50UHJvamVjdCgpKTtcbiAgfVxuXG4gIGdldFByb2plY3QobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0cygpLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdHMoKS5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldElzQ3VycmVudCgpKTtcbiAgfVxuXG4gIHNldFByb2plY3RzKHByb2plY3RzKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHByb2plY3RzO1xuICB9XG5cbiAgZ2V0IG51bVByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmxlbmd0aDtcbiAgfVxuXG4gIGdldEN1cnJlbnRQcm9qZWN0KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkUHJvamVjdDtcbiAgfVxuXG4gICNzZXRDdXJyZW50UHJvamVjdChwcm9qZWN0KSB7XG4gICAgaWYgKHRoaXMuZ2V0UHJvamVjdHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuZ2V0Q3VycmVudFByb2plY3QoKSkubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFByb2plY3Quc2V0SXNDdXJyZW50KGZhbHNlKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkUHJvamVjdCA9IHByb2plY3Q7XG4gICAgdGhpcy5zZWxlY3RlZFByb2plY3Quc2V0SXNDdXJyZW50KHRydWUpO1xuICB9XG5cbiAgc2V0Q3VycmVudFByb2plY3RCeUluZGV4KGluZGV4KSB7XG4gICAgaWYgKHRoaXMuZ2V0UHJvamVjdHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRQcm9qZWN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0LnNldElzQ3VycmVudChmYWxzZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZFByb2plY3QgPSB0aGlzLnByb2plY3RzW2luZGV4XTtcbiAgICB0aGlzLnNlbGVjdGVkUHJvamVjdC5zZXRJc0N1cnJlbnQodHJ1ZSk7XG4gIH1cblxuICBhZGRQcm9qZWN0QnlOYW1lKG5hbWUpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QodGhpcy5wcm9qZWN0cy5sZW5ndGgsIG5hbWUpO1xuICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICB0aGlzLnNlbGVjdGVkUHJvamVjdCA9IHByb2plY3Q7XG4gICAgU3RvcmFnZS5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgIHRoaXMuZGlzcGxheVByb2plY3RzKClcbiAgfVxuXG4gIGFkZFByb2plY3QocHJvamVjdCkge1xuICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICB0aGlzLnNlbGVjdGVkUHJvamVjdCA9IHByb2plY3Q7XG4gIH1cblxuICAjcHJvamVjdEJ1dHRvbihwcm9qZWN0KSB7XG4gICAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHByb2plY3RCdG4uaW5uZXJIVE1MID0gYCR7cHJvamVjdC5uYW1lfSAtPmA7XG4gICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdib3JkZXItMicsICdib3JkZXItaW5kaWdvLTUwMCcsICdyb3VuZGVkLW1kJywgJ2hvdmVyOmJnLWluZGlnby0zMDAnLCAncC0xJyk7XG4gICAgcHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdQcm9qZWN0IDonLCBwcm9qZWN0KTtcbiAgICAgIHRoaXMuI3NldEN1cnJlbnRQcm9qZWN0KHByb2plY3QpO1xuICAgICAgdGhpcy5kaXNwbGF5UHJvamVjdHMoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcHJvamVjdEJ0bjtcbiAgfVxuXG4gICN0b2RvQ2FyZChwcm9qZWN0LCB0b2RvKSB7XG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgY29uc3QgdG9kb0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNvbnN0IHRvZG9EdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRvZG9UaXRsZS5pbm5lckhUTUwgPSBgJHt0b2RvLm5hbWV9YDtcbiAgICB0b2RvRGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dG9kby5kZXNjcmlwdGlvbn1gO1xuICAgIHRvZG9EdWVEYXRlLmlubmVySFRNTCA9IGBEdWUgZGF0ZTogJHt0b2RvLmRhdGV9YDtcbiAgICB0b2RvVGl0bGUuY2xhc3NMaXN0LmFkZCgndGV4dC14bCcsICdmb250LWJvbGQnKTtcbiAgICB0b2RvRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndGV4dC1sZycpO1xuICAgIHRvZG9EdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ3RleHQtbGcnKTtcbiAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2JvcmRlci0yJywgJ2JvcmRlci1pbmRpZ28tNTAwJywgJ3JvdW5kZWQtbWQnLCAnaG92ZXI6YmctaW5kaWdvLTMwMCcsICdwLTEnLCAnY3Vyc29yLXBvaW50ZXInKTtcbiAgICBjYXJkLmFwcGVuZENoaWxkKHRvZG9UaXRsZSk7XG4gICAgY2FyZC5hcHBlbmRDaGlsZCh0b2RvRGVzY3JpcHRpb24pO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQodG9kb0R1ZURhdGUpO1xuXG4gICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHByb2plY3QucmVtb3ZlVG9kbyh0b2RvLmdldElEKTtcbiAgICAgIHRoaXMuZGlzcGxheVByb2plY3RzKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH1cblxuICBkaXNwbGF5VG9kb3MocHJvamVjdCl7XG4gICAgY29uc3QgdG9kb3MgPSBwcm9qZWN0LmdldFRvZG9zKCk7XG4gICAgY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby1saXN0Jyk7XG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgdG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgY29uc3QgY2FyZCA9IHRoaXMuI3RvZG9DYXJkKHByb2plY3QsIHRvZG8pO1xuICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoY2FyZCk7XG4gICAgfSk7XG4gIH1cblxuICBkaXNwbGF5UHJvamVjdHMoKSB7XG4gICAgaWYgKHRoaXMubnVtUHJvamVjdHMgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1saXN0Jyk7XG4gICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBjb25zdCBwcm9qZWN0QnRuID0gdGhpcy4jcHJvamVjdEJ1dHRvbihwcm9qZWN0KTtcbiAgICAgIGlmIChwcm9qZWN0LmdldElzQ3VycmVudCgpKSB7XG4gICAgICAgIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnYmctbGltZS01MDAnKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5VG9kb3MocHJvamVjdCk7XG4gICAgICB9XG4gICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBQcm9qZWN0TGlzdCBmcm9tICcuL1Byb2plY3RMaXN0JztcbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtJztcbmltcG9ydCBUb2RvTGlzdCBmcm9tICcuL1RvZG9saXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XG4gIHN0YXRpYyBzYXZlUHJvamVjdExpc3QoZGF0YSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0TGlzdCcsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0TGlzdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IE9iamVjdC5hc3NpZ24oXG4gICAgICBuZXcgUHJvamVjdExpc3QoKSxcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RMaXN0JykpLFxuICAgICk7XG5cbiAgICBpZiAocHJvamVjdExpc3QgPT09IG51bGwgfHwgcHJvamVjdExpc3QuZ2V0UHJvamVjdHMoKS5udW1Qcm9qZWN0cyA9PT0gMCkge1xuICAgICAgcmV0dXJuIHByb2plY3RMaXN0O1xuICAgIH1cblxuICAgIHByb2plY3RMaXN0LnNldFByb2plY3RzKFxuICAgICAgcHJvamVjdExpc3QuZ2V0UHJvamVjdHMoKS5tYXAoKHByb2plY3QpID0+IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3QoKSwgcHJvamVjdCkpLFxuICAgICk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIHByb2plY3RMaXN0XG4gICAgICAuZ2V0UHJvamVjdHMoKVxuICAgICAgLmZvckVhY2goKHByb2plY3QpID0+IFxuICAgICAgICBwcm9qZWN0LnNldFRvZG9MaXN0KFxuICAgICAgICAgIE9iamVjdC5hc3NpZ24obmV3IFRvZG9MaXN0KCksIHByb2plY3QuZ2V0VG9kb0xpc3QoKSkpXG4gICAgICApO1xuXG4gICAgcHJvamVjdExpc3Quc2V0Q3VycmVudFByb2plY3RCeUluZGV4KDApO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcHJvamVjdExpc3RcbiAgICAuZ2V0UHJvamVjdHMoKVxuICAgIC5mb3JFYWNoKChwcm9qZWN0KSA9PiBcbiAgICBwcm9qZWN0LmdldFRvZG9MaXN0KCkuc2V0VG9kb3MoXG4gICAgICBwcm9qZWN0LmdldFRvZG9MaXN0KCkuZ2V0VG9kb3MoKS5tYXAoXG4gICAgICAgICh0b2RvKSA9PiBPYmplY3QuYXNzaWduKG5ldyBUb2RvSXRlbSgpLCB0b2RvKSkpXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgIHJldHVybiBwcm9qZWN0TGlzdDtcbiAgfVxuXG4gIHN0YXRpYyBhZGRUb2RvKHByb2plY3ROYW1lLCB0b2RvKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBTdG9yYWdlLmdldFByb2plY3RMaXN0KCk7XG4gICAgcHJvamVjdExpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuYWRkVG9kbyh0b2RvKTtcbiAgICBTdG9yYWdlLnNhdmVQcm9qZWN0TGlzdChwcm9qZWN0TGlzdCk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlVG9kbyhwcm9qZWN0TmFtZSwgdG9kb0lEKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBTdG9yYWdlLmdldFByb2plY3RMaXN0KCk7XG4gICAgcHJvamVjdExpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuZ2V0VG9kb0xpc3QoKS5yZW1vdmVUb2RvKHRvZG9JRCk7XG4gICAgU3RvcmFnZS5zYXZlUHJvamVjdExpc3QocHJvamVjdExpc3QpO1xuICB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QocHJvamVjdCl7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBTdG9yYWdlLmdldFByb2plY3RMaXN0KCk7XG4gICAgaWYgKHByb2plY3RMaXN0ID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHByb2plY3RMaXN0LmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgU3RvcmFnZS5zYXZlUHJvamVjdExpc3QocHJvamVjdExpc3QpO1xuICB9XG59XG4iLCJjbGFzcyBUb2RvSXRlbSB7XG4gIGNvbnN0cnVjdG9yKGlkLCBuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmRhdGUgPSBkYXRlO1xuICB9XG5cbiAgZ2V0IGdldElEKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9JdGVtO1xuIiwiaW1wb3J0IFRvZG9JdGVtIGZyb20gJy4vVG9kb0l0ZW0nO1xuXG5jbGFzcyBUb2RvTGlzdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLnRvZG9zID0gW107XG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXRUb2RvcygpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvcztcbiAgfVxuXG4gIHNldFByb2plY3ROYW1lKHByb2plY3ROYW1lKSB7XG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IHByb2plY3ROYW1lO1xuICB9XG5cbiAgZ2V0UHJvamVjdE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdE5hbWU7XG4gIH1cblxuICBzZXRUb2Rvcyh0b2Rvcykge1xuICAgIHRoaXMudG9kb3MgPSB0b2RvcztcbiAgfVxuXG4gIGdldE51bVRvZG9zKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zLmxlbmd0aCAtIDE7XG4gIH1cblxuXG4gIGFkZFRvZG9CeURldGFpbHMobmFtZSwgZGVzY3JpcHRpb24sIGRhdGUpIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0TnVtVG9kb3MoKTtcbiAgICBjb25zdCB0b2RvID0gbmV3IFRvZG9JdGVtKGlkLCBuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSk7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvSXRlbSl7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG9JdGVtKVxuICB9XG5cbiAgY29udGFpbnModG9kb0lkKXtcbiAgICByZXR1cm4gdGhpcy50b2Rvcy5zb21lKCh0b2RvKSA9PiB0b2RvLmdldElEID09PSB0b2RvSWQpXG4gIH1cblxuICByZW1vdmVUb2RvKHRvZG9JRCkge1xuICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby5nZXRJRCAhPT0gdG9kb0lEIClcbiAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0xpc3Q7XG4iLCJpbXBvcnQgUHJvamVjdExpc3QgZnJvbSAnLi9Qcm9qZWN0TGlzdCc7XG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnO1xuXG5jb25zdCBtYWluVUkgPSAoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzID0gbmV3IFByb2plY3RMaXN0KCk7XG5cbiAgY29uc3QgYWRkUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3Qtc3VibWl0Jyk7XG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtdGl0bGUnKTtcbiAgICBmb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRpdGxlID0gcHJvamVjdElucHV0LnZhbHVlO1xuICAgICAgcHJvamVjdHMuYWRkUHJvamVjdEJ5TmFtZSh0aXRsZSk7XG4gICAgICBwcm9qZWN0cy5kaXNwbGF5UHJvamVjdHMoKTtcbiAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFRvZG8gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXN1Ym1pdCcpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tdGl0bGUnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLWRlc2NyaXB0aW9uJyk7XG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLWRhdGUnKTtcbiAgICBmb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRpdGxlVmFsID0gdGl0bGUudmFsdWU7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvblZhbCA9IGRlc2NyaXB0aW9uLnZhbHVlO1xuICAgICAgY29uc3QgZGF0ZVZhbCA9IGRhdGUudmFsdWU7XG4gICAgICBwcm9qZWN0cy5nZXRDdXJyZW50UHJvamVjdCgpLmFkZFRvZG9CeURldGFpbHModGl0bGVWYWwsIGRlc2NyaXB0aW9uVmFsLCBkYXRlVmFsKTtcbiAgICAgIHByb2plY3RzLmRpc3BsYXlQcm9qZWN0cygpO1xuICAgICAgdGl0bGUudmFsdWUgPSAnJztcbiAgICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gJyc7XG4gICAgICBkYXRlLnZhbHVlID0gJyc7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgXG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBhZGRQcm9qZWN0KCk7XG4gICAgYWRkVG9kbygpO1xuICAgIHByb2plY3RzLmdldFN0b3JlZFByb2plY3RzKCk7XG4gICAgcHJvamVjdHMuZGlzcGxheVByb2plY3RzKCk7XG4gIH1cbiAgcmV0dXJuIHsgcmVuZGVyIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtYWluVUk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBtYWluVUkgZnJvbSAnLi9jb21wb25lbnRzL21haW5VSSc7XG5cbm1haW5VSSgpLnJlbmRlcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9