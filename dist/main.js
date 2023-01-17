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
    this.todolist = new _Todolist__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
    console.log("Todoitem added:", todoItem)
    this.todolist.addTodo(todoItem);
  }
  displayTodos() {
    this.todolist.displayTodos();
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
      this.#setCurrentProject(project);
      this.displayProjects();
    });
    return projectBtn;
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
      } else {
        projectBtn.classList.remove('bg-lime-500');
      }
      projectList.appendChild(projectBtn);
    });
    this.selectedProject.displayTodos();
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
        
    // projectList.getProjects().forEach((project) => { console.log("Project:",project,"\nTodos: ",project.getTodoList().getTodos()); });
    return projectList;
  }

  static addTodo(projectName, todo) {
    const projectList = Storage.getProjectList();
    projectList.getProject(projectName).addTodo(todo);
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
  constructor() {
    this.todos = [];
  }

  getTodos() {
    return this.todos;
  }

  setTodos(todos) {
    this.todos = todos;
  }

  getNumTodos() {
    return this.todos.length - 1;
  }

  #todoCard(todo) {
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
      this.removeTodo(todo.getID);
    });
    return card;
  }

  addTodoByDetails(name, description, date) {
    const id = this.getNumTodos();
    const todo = new _TodoItem__WEBPACK_IMPORTED_MODULE_0__["default"](id, name, description, date);
    this.todos.push(todo);
    this.displayTodos();
  }

  addTodo(todoItem){
    this.todos.push(todoItem)
    this.displayTodos();
  }

  contains(todoId){
    return this.todos.some((todo) => todo.getID === todoId)
  }

  removeTodo(todoID) {
    this.todos = this.todos.filter((todo) => todo.getID !== todoID )
    this.displayTodos();
    // Storage.removeTodo(todo.getID);
  }

  displayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    this.todos.forEach((todo) => {
      const card = this.#todoCard(todo);
      todoList.appendChild(card);
    });
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
    console.log("Retrieve saved projectlist: ",_Storage__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectList());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1I7O0FBRWhDO0FBQ0EsdUJBQXVCLG9EQUFXOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsK0RBQXNCO0FBQ3JFO0FBQ0EsV0FBVztBQUNYOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7OztVQzlDdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055Qzs7QUFFekMsOERBQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9Qcm9qZWN0TGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1RvZG9saXN0LmpzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvbWFpblVJLmpzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvZG9MaXN0IGZyb20gJy4vVG9kb2xpc3QnO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9TdG9yYWdlJztcbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtJztcblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKGlkLCBuYW1lKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50b2RvbGlzdCA9IG5ldyBUb2RvTGlzdCgpO1xuICAgIHRoaXMuaXNDdXJyZW50ID0gZmFsc2U7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXRJc0N1cnJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNDdXJyZW50O1xuICB9XG5cbiAgc2V0SXNDdXJyZW50KGN1cnJlbnQpIHtcbiAgICB0aGlzLmlzQ3VycmVudCA9IGN1cnJlbnQ7XG4gIH1cblxuICBnZXRUb2RvTGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvbGlzdDtcbiAgfVxuXG4gIHNldFRvZG9MaXN0KHRvZG9zKSB7XG4gICAgdGhpcy50b2RvbGlzdCA9IHRvZG9zO1xuICB9XG5cbiAgYWRkVG9kb0J5RGV0YWlscyhuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSkge1xuICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQgfHwgZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCB8fCBkYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50b2RvbGlzdC5hZGRUb2RvQnlEZXRhaWxzKG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKTtcbiAgICBjb25zdCB0b2RvSXRlbSA9IG5ldyBUb2RvSXRlbSh0aGlzLnRvZG9saXN0LmdldE51bVRvZG9zKCksIG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKTtcbiAgICBTdG9yYWdlLmFkZFRvZG8odGhpcy5uYW1lLCB0b2RvSXRlbSk7XG4gIH1cblxuICBhZGRUb2RvKHRvZG9JdGVtKXtcbiAgICBjb25zb2xlLmxvZyhcIlRvZG9pdGVtIGFkZGVkOlwiLCB0b2RvSXRlbSlcbiAgICB0aGlzLnRvZG9saXN0LmFkZFRvZG8odG9kb0l0ZW0pO1xuICB9XG4gIGRpc3BsYXlUb2RvcygpIHtcbiAgICB0aGlzLnRvZG9saXN0LmRpc3BsYXlUb2RvcygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9TdG9yYWdlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdExpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb2plY3RzID0gW107XG4gICAgdGhpcy5zZWxlY3RlZFByb2plY3QgPSB7fTtcbiAgfVxuXG4gIGdldFByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuICB9XG5cbiAgZ2V0U3RvcmVkUHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBTdG9yYWdlLmdldFByb2plY3RMaXN0KCk7XG4gICAgaWYgKHByb2plY3RMaXN0ID09PSBudWxsIHx8IHByb2plY3RMaXN0LmdldFByb2plY3RzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0UHJvamVjdHMocHJvamVjdExpc3QuZ2V0UHJvamVjdHMoKSk7XG4gICAgdGhpcy4jc2V0Q3VycmVudFByb2plY3QocHJvamVjdExpc3QuZ2V0Q3VycmVudFByb2plY3QoKSk7XG4gIH1cblxuICBnZXRQcm9qZWN0KG5hbWUpIHtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdHMoKS5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gbmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFByb2plY3RzKCkuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXRJc0N1cnJlbnQoKSk7XG4gIH1cblxuICBzZXRQcm9qZWN0cyhwcm9qZWN0cykge1xuICAgIHRoaXMucHJvamVjdHMgPSBwcm9qZWN0cztcbiAgfVxuXG4gIGdldCBudW1Qcm9qZWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5sZW5ndGg7XG4gIH1cblxuICBnZXRDdXJyZW50UHJvamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFByb2plY3Q7XG4gIH1cblxuICAjc2V0Q3VycmVudFByb2plY3QocHJvamVjdCkge1xuICAgIGlmICh0aGlzLmdldFByb2plY3RzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnNlbGVjdGVkUHJvamVjdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkUHJvamVjdC5zZXRJc0N1cnJlbnQoZmFsc2UpO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdDtcbiAgICB0aGlzLnNlbGVjdGVkUHJvamVjdC5zZXRJc0N1cnJlbnQodHJ1ZSk7XG4gIH1cblxuICBzZXRDdXJyZW50UHJvamVjdEJ5SW5kZXgoaW5kZXgpIHtcbiAgICBpZiAodGhpcy5nZXRQcm9qZWN0cygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZWxlY3RlZFByb2plY3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFByb2plY3Quc2V0SXNDdXJyZW50KGZhbHNlKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkUHJvamVjdCA9IHRoaXMucHJvamVjdHNbaW5kZXhdO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0LnNldElzQ3VycmVudCh0cnVlKTtcbiAgfVxuXG4gIGFkZFByb2plY3RCeU5hbWUobmFtZSkge1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdCh0aGlzLnByb2plY3RzLmxlbmd0aCwgbmFtZSk7XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdDtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgdGhpcy5kaXNwbGF5UHJvamVjdHMoKVxuICB9XG5cbiAgYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdDtcbiAgfVxuXG4gICNwcm9qZWN0QnV0dG9uKHByb2plY3QpIHtcbiAgICBjb25zdCBwcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgcHJvamVjdEJ0bi5pbm5lckhUTUwgPSBgJHtwcm9qZWN0Lm5hbWV9IC0+YDtcbiAgICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2JvcmRlci0yJywgJ2JvcmRlci1pbmRpZ28tNTAwJywgJ3JvdW5kZWQtbWQnLCAnaG92ZXI6YmctaW5kaWdvLTMwMCcsICdwLTEnKTtcbiAgICBwcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy4jc2V0Q3VycmVudFByb2plY3QocHJvamVjdCk7XG4gICAgICB0aGlzLmRpc3BsYXlQcm9qZWN0cygpO1xuICAgIH0pO1xuICAgIHJldHVybiBwcm9qZWN0QnRuO1xuICB9XG5cbiAgZGlzcGxheVByb2plY3RzKCkge1xuICAgIGlmICh0aGlzLm51bVByb2plY3RzID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMtbGlzdCcpO1xuICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdEJ0biA9IHRoaXMuI3Byb2plY3RCdXR0b24ocHJvamVjdCk7XG4gICAgICBpZiAocHJvamVjdC5nZXRJc0N1cnJlbnQoKSkge1xuICAgICAgICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2JnLWxpbWUtNTAwJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2JnLWxpbWUtNTAwJyk7XG4gICAgICB9XG4gICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcbiAgICB9KTtcbiAgICB0aGlzLnNlbGVjdGVkUHJvamVjdC5kaXNwbGF5VG9kb3MoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBQcm9qZWN0TGlzdCBmcm9tICcuL1Byb2plY3RMaXN0JztcbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtJztcbmltcG9ydCBUb2RvTGlzdCBmcm9tICcuL1RvZG9saXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XG4gIHN0YXRpYyBzYXZlUHJvamVjdExpc3QoZGF0YSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0TGlzdCcsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0TGlzdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IE9iamVjdC5hc3NpZ24oXG4gICAgICBuZXcgUHJvamVjdExpc3QoKSxcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RMaXN0JykpLFxuICAgICk7XG5cbiAgICBpZiAocHJvamVjdExpc3QgPT09IG51bGwgfHwgcHJvamVjdExpc3QuZ2V0UHJvamVjdHMoKS5udW1Qcm9qZWN0cyA9PT0gMCkge1xuICAgICAgcmV0dXJuIHByb2plY3RMaXN0O1xuICAgIH1cblxuICAgIHByb2plY3RMaXN0LnNldFByb2plY3RzKFxuICAgICAgcHJvamVjdExpc3QuZ2V0UHJvamVjdHMoKS5tYXAoKHByb2plY3QpID0+IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3QoKSwgcHJvamVjdCkpLFxuICAgICk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIHByb2plY3RMaXN0XG4gICAgICAuZ2V0UHJvamVjdHMoKVxuICAgICAgLmZvckVhY2goKHByb2plY3QpID0+IFxuICAgICAgICBwcm9qZWN0LnNldFRvZG9MaXN0KFxuICAgICAgICAgIE9iamVjdC5hc3NpZ24obmV3IFRvZG9MaXN0KCksIHByb2plY3QuZ2V0VG9kb0xpc3QoKSkpXG4gICAgICApO1xuXG4gICAgcHJvamVjdExpc3Quc2V0Q3VycmVudFByb2plY3RCeUluZGV4KDApO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgcHJvamVjdExpc3RcbiAgICAuZ2V0UHJvamVjdHMoKVxuICAgIC5mb3JFYWNoKChwcm9qZWN0KSA9PiBcbiAgICBwcm9qZWN0LmdldFRvZG9MaXN0KCkuc2V0VG9kb3MoXG4gICAgICBwcm9qZWN0LmdldFRvZG9MaXN0KCkuZ2V0VG9kb3MoKS5tYXAoXG4gICAgICAgICh0b2RvKSA9PiBPYmplY3QuYXNzaWduKG5ldyBUb2RvSXRlbSgpLCB0b2RvKSkpXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgIC8vIHByb2plY3RMaXN0LmdldFByb2plY3RzKCkuZm9yRWFjaCgocHJvamVjdCkgPT4geyBjb25zb2xlLmxvZyhcIlByb2plY3Q6XCIscHJvamVjdCxcIlxcblRvZG9zOiBcIixwcm9qZWN0LmdldFRvZG9MaXN0KCkuZ2V0VG9kb3MoKSk7IH0pO1xuICAgIHJldHVybiBwcm9qZWN0TGlzdDtcbiAgfVxuXG4gIHN0YXRpYyBhZGRUb2RvKHByb2plY3ROYW1lLCB0b2RvKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBTdG9yYWdlLmdldFByb2plY3RMaXN0KCk7XG4gICAgcHJvamVjdExpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuYWRkVG9kbyh0b2RvKTtcbiAgICBTdG9yYWdlLnNhdmVQcm9qZWN0TGlzdChwcm9qZWN0TGlzdCk7XG4gIH1cblxuICBzdGF0aWMgYWRkUHJvamVjdChwcm9qZWN0KXtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IFN0b3JhZ2UuZ2V0UHJvamVjdExpc3QoKTtcbiAgICBpZiAocHJvamVjdExpc3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHJvamVjdExpc3QuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICBTdG9yYWdlLnNhdmVQcm9qZWN0TGlzdChwcm9qZWN0TGlzdCk7XG4gIH1cbn1cbiIsImNsYXNzIFRvZG9JdGVtIHtcbiAgY29uc3RydWN0b3IoaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gIH1cblxuICBnZXQgZ2V0SUQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0l0ZW07XG4iLCJpbXBvcnQgVG9kb0l0ZW0gZnJvbSAnLi9Ub2RvSXRlbSc7XG5cbmNsYXNzIFRvZG9MaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50b2RvcyA9IFtdO1xuICB9XG5cbiAgZ2V0VG9kb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3M7XG4gIH1cblxuICBzZXRUb2Rvcyh0b2Rvcykge1xuICAgIHRoaXMudG9kb3MgPSB0b2RvcztcbiAgfVxuXG4gIGdldE51bVRvZG9zKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zLmxlbmd0aCAtIDE7XG4gIH1cblxuICAjdG9kb0NhcmQodG9kbykge1xuICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjb25zdCB0b2RvRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0b2RvVGl0bGUuaW5uZXJIVE1MID0gYCR7dG9kby5uYW1lfWA7XG4gICAgdG9kb0Rlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RvZG8uZGVzY3JpcHRpb259YDtcbiAgICB0b2RvRHVlRGF0ZS5pbm5lckhUTUwgPSBgRHVlIGRhdGU6ICR7dG9kby5kYXRlfWA7XG4gICAgdG9kb1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3RleHQteGwnLCAnZm9udC1ib2xkJyk7XG4gICAgdG9kb0Rlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ3RleHQtbGcnKTtcbiAgICB0b2RvRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxnJyk7XG4gICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdib3JkZXItMicsICdib3JkZXItaW5kaWdvLTUwMCcsICdyb3VuZGVkLW1kJywgJ2hvdmVyOmJnLWluZGlnby0zMDAnLCAncC0xJywgJ2N1cnNvci1wb2ludGVyJyk7XG4gICAgY2FyZC5hcHBlbmRDaGlsZCh0b2RvVGl0bGUpO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQodG9kb0Rlc2NyaXB0aW9uKTtcbiAgICBjYXJkLmFwcGVuZENoaWxkKHRvZG9EdWVEYXRlKTtcblxuICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZVRvZG8odG9kby5nZXRJRCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH1cblxuICBhZGRUb2RvQnlEZXRhaWxzKG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLmdldE51bVRvZG9zKCk7XG4gICAgY29uc3QgdG9kbyA9IG5ldyBUb2RvSXRlbShpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGRhdGUpO1xuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgICB0aGlzLmRpc3BsYXlUb2RvcygpO1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvSXRlbSl7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG9JdGVtKVxuICAgIHRoaXMuZGlzcGxheVRvZG9zKCk7XG4gIH1cblxuICBjb250YWlucyh0b2RvSWQpe1xuICAgIHJldHVybiB0aGlzLnRvZG9zLnNvbWUoKHRvZG8pID0+IHRvZG8uZ2V0SUQgPT09IHRvZG9JZClcbiAgfVxuXG4gIHJlbW92ZVRvZG8odG9kb0lEKSB7XG4gICAgdGhpcy50b2RvcyA9IHRoaXMudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLmdldElEICE9PSB0b2RvSUQgKVxuICAgIHRoaXMuZGlzcGxheVRvZG9zKCk7XG4gICAgLy8gU3RvcmFnZS5yZW1vdmVUb2RvKHRvZG8uZ2V0SUQpO1xuICB9XG5cbiAgZGlzcGxheVRvZG9zKCkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tbGlzdCcpO1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMudG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgY29uc3QgY2FyZCA9IHRoaXMuI3RvZG9DYXJkKHRvZG8pO1xuICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoY2FyZCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0xpc3Q7XG4iLCJpbXBvcnQgUHJvamVjdExpc3QgZnJvbSAnLi9Qcm9qZWN0TGlzdCc7XG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnO1xuXG5jb25zdCBtYWluVUkgPSAoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzID0gbmV3IFByb2plY3RMaXN0KCk7XG5cbiAgY29uc3QgYWRkUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3Qtc3VibWl0Jyk7XG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtdGl0bGUnKTtcbiAgICBmb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRpdGxlID0gcHJvamVjdElucHV0LnZhbHVlO1xuICAgICAgcHJvamVjdHMuYWRkUHJvamVjdEJ5TmFtZSh0aXRsZSk7XG4gICAgICBwcm9qZWN0cy5kaXNwbGF5UHJvamVjdHMoKTtcbiAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFRvZG8gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXN1Ym1pdCcpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tdGl0bGUnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLWRlc2NyaXB0aW9uJyk7XG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLWRhdGUnKTtcbiAgICBmb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRpdGxlVmFsID0gdGl0bGUudmFsdWU7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvblZhbCA9IGRlc2NyaXB0aW9uLnZhbHVlO1xuICAgICAgY29uc3QgZGF0ZVZhbCA9IGRhdGUudmFsdWU7XG4gICAgICBwcm9qZWN0cy5nZXRDdXJyZW50UHJvamVjdCgpLmFkZFRvZG9CeURldGFpbHModGl0bGVWYWwsIGRlc2NyaXB0aW9uVmFsLCBkYXRlVmFsKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gICAgICBkZXNjcmlwdGlvbi52YWx1ZSA9ICcnO1xuICAgICAgZGF0ZS52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBhZGRQcm9qZWN0KCk7XG4gICAgYWRkVG9kbygpO1xuICAgIC8vIFN0b3JhZ2Uuc2F2ZVByb2plY3RMaXN0KHByb2plY3RzKTtcbiAgICBwcm9qZWN0cy5nZXRTdG9yZWRQcm9qZWN0cygpO1xuICAgIHByb2plY3RzLmRpc3BsYXlQcm9qZWN0cygpO1xuICAgIGNvbnNvbGUubG9nKFwiUmV0cmlldmUgc2F2ZWQgcHJvamVjdGxpc3Q6IFwiLFN0b3JhZ2UuZ2V0UHJvamVjdExpc3QoKSk7XG4gIH1cbiAgcmV0dXJuIHsgcmVuZGVyIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtYWluVUk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBtYWluVUkgZnJvbSAnLi9jb21wb25lbnRzL21haW5VSSc7XG5cbm1haW5VSSgpLnJlbmRlcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9