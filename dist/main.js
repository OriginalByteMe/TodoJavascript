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

  addTodo(name, description, date) {
    if (name === undefined || description === undefined || date === undefined) {
      return;
    }
    this.todolist.addTodo(name, description, date);
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


class ProjectList {
  constructor() {
    this.projects = [];
    this.selectedProject = {};
  }

  getProjects() {
    return this.projects;
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

  addProject(name) {
    const project = new _Project__WEBPACK_IMPORTED_MODULE_0__["default"](this.projects.length, name);
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
    const projectList = document.querySelector('#projects-list');
    projectList.innerHTML = '';
    this.projects.forEach((project) => {
      const projectBtn = this.#projectButton(project);
      if (project.getIsCurrent()) {
        projectBtn.classList.add('bg-lime-500');
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

  static addTodo(projectName, name, description, date) {
    const projectList = Storage.getProjectList();
    if (projectList === null || projectList.getProjects().length === 0) {
      return;
    }
    projectList.getProject(projectName).addTodo(name, description, date);
    Storage.saveProjectList(projectList);
  }

  static addProject(name) {
    const projectList = Storage.getProjectList();
    if (projectList === null) {
      return;
    }
    projectList.addProject(name);
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
    return this.todos.length;
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

  addTodo(name, description, date) {
    const id = this.getNumTodos();
    const todo = new _TodoItem__WEBPACK_IMPORTED_MODULE_0__["default"](id, name, description, date);
    this.todos.push(todo);
    this.displayTodos();
  }

  removeTodo(todo) {
    this.todos = this.todos.splice(todo.getID, todo.getID);
    this.displayTodos();
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
      projects.addProject(title);
      _Storage__WEBPACK_IMPORTED_MODULE_1__["default"].addProject(title);
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
    _Storage__WEBPACK_IMPORTED_MODULE_1__["default"].saveProjectList(projects);
    projects.addProject(project1);
    _Storage__WEBPACK_IMPORTED_MODULE_1__["default"].addProject(project1);
    projects.getCurrentProject().addTodo('Gotta email dad', 'He really needs this email soon', new Date());
    projects.addProject(project2);
    _Storage__WEBPACK_IMPORTED_MODULE_1__["default"].addProject(project2);
    projects.getCurrentProject().addTodo('Gotta get groceries', "I'm very hungry rn", new Date());
    _Storage__WEBPACK_IMPORTED_MODULE_1__["default"].addTodo(project1, 'Gotta email dad', 'He really needs this email soon', new Date());
    _Storage__WEBPACK_IMPORTED_MODULE_1__["default"].addTodo(project2, 'Gotta get groceries', "I'm very hungry rn", new Date());
    projects.setCurrentProjectByIndex(0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSwyREFBa0I7QUFDdEI7QUFDQTtBQUNBLElBQUksMkRBQWtCO0FBQ3RCO0FBQ0EsSUFBSSx3REFBZTtBQUNuQixJQUFJLHdEQUFlO0FBQ25CO0FBQ0E7QUFDQSwrQ0FBK0MsK0RBQXNCO0FBQ3JFO0FBQ0EsV0FBVztBQUNYOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7OztVQ3pEdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055Qzs7QUFFekMsOERBQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9Qcm9qZWN0TGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1RvZG9saXN0LmpzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvbWFpblVJLmpzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvZG9MaXN0IGZyb20gJy4vVG9kb2xpc3QnO1xuXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IoaWQsIG5hbWUpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRvZG9saXN0ID0gbmV3IFRvZG9MaXN0KCk7XG4gICAgdGhpcy5pc0N1cnJlbnQgPSBmYWxzZTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldElzQ3VycmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0N1cnJlbnQ7XG4gIH1cblxuICBzZXRJc0N1cnJlbnQoY3VycmVudCkge1xuICAgIHRoaXMuaXNDdXJyZW50ID0gY3VycmVudDtcbiAgfVxuXG4gIGdldFRvZG9MaXN0KCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9saXN0O1xuICB9XG5cbiAgc2V0VG9kb0xpc3QodG9kb3MpIHtcbiAgICB0aGlzLnRvZG9saXN0ID0gdG9kb3M7XG4gIH1cblxuICBhZGRUb2RvKG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG4gICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCB8fCBkZXNjcmlwdGlvbiA9PT0gdW5kZWZpbmVkIHx8IGRhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRvZG9saXN0LmFkZFRvZG8obmFtZSwgZGVzY3JpcHRpb24sIGRhdGUpO1xuICB9XG5cbiAgZGlzcGxheVRvZG9zKCkge1xuICAgIHRoaXMudG9kb2xpc3QuZGlzcGxheVRvZG9zKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDtcbiIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RMaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0ge307XG4gIH1cblxuICBnZXRQcm9qZWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcbiAgfVxuXG4gIGdldFByb2plY3QobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0cygpLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdHMoKS5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldElzQ3VycmVudCgpKTtcbiAgfVxuXG4gIHNldFByb2plY3RzKHByb2plY3RzKSB7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHByb2plY3RzO1xuICB9XG5cbiAgZ2V0IG51bVByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmxlbmd0aDtcbiAgfVxuXG4gIGdldEN1cnJlbnRQcm9qZWN0KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkUHJvamVjdDtcbiAgfVxuXG4gICNzZXRDdXJyZW50UHJvamVjdChwcm9qZWN0KSB7XG4gICAgaWYgKHRoaXMuZ2V0UHJvamVjdHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRQcm9qZWN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0LnNldElzQ3VycmVudChmYWxzZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0O1xuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0LnNldElzQ3VycmVudCh0cnVlKTtcbiAgfVxuXG4gIHNldEN1cnJlbnRQcm9qZWN0QnlJbmRleChpbmRleCkge1xuICAgIGlmICh0aGlzLmdldFByb2plY3RzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnNlbGVjdGVkUHJvamVjdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkUHJvamVjdC5zZXRJc0N1cnJlbnQoZmFsc2UpO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRQcm9qZWN0ID0gdGhpcy5wcm9qZWN0c1tpbmRleF07XG4gICAgdGhpcy5zZWxlY3RlZFByb2plY3Quc2V0SXNDdXJyZW50KHRydWUpO1xuICB9XG5cbiAgYWRkUHJvamVjdChuYW1lKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KHRoaXMucHJvamVjdHMubGVuZ3RoLCBuYW1lKTtcbiAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgdGhpcy5zZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0O1xuICB9XG5cbiAgI3Byb2plY3RCdXR0b24ocHJvamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBwcm9qZWN0QnRuLmlubmVySFRNTCA9IGAke3Byb2plY3QubmFtZX0gLT5gO1xuICAgIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnYm9yZGVyLTInLCAnYm9yZGVyLWluZGlnby01MDAnLCAncm91bmRlZC1tZCcsICdob3ZlcjpiZy1pbmRpZ28tMzAwJywgJ3AtMScpO1xuICAgIHByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLiNzZXRDdXJyZW50UHJvamVjdChwcm9qZWN0KTtcbiAgICAgIHRoaXMuZGlzcGxheVByb2plY3RzKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb2plY3RCdG47XG4gIH1cblxuICBkaXNwbGF5UHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMtbGlzdCcpO1xuICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdEJ0biA9IHRoaXMuI3Byb2plY3RCdXR0b24ocHJvamVjdCk7XG4gICAgICBpZiAocHJvamVjdC5nZXRJc0N1cnJlbnQoKSkge1xuICAgICAgICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2JnLWxpbWUtNTAwJyk7XG4gICAgICB9XG4gICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcbiAgICB9KTtcbiAgICB0aGlzLnNlbGVjdGVkUHJvamVjdC5kaXNwbGF5VG9kb3MoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBQcm9qZWN0TGlzdCBmcm9tICcuL1Byb2plY3RMaXN0JztcbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtJztcbmltcG9ydCBUb2RvTGlzdCBmcm9tICcuL1RvZG9saXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XG4gIHN0YXRpYyBzYXZlUHJvamVjdExpc3QoZGF0YSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0TGlzdCcsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9qZWN0TGlzdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IE9iamVjdC5hc3NpZ24oXG4gICAgICBuZXcgUHJvamVjdExpc3QoKSxcbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RMaXN0JykpLFxuICAgICk7XG5cbiAgICBwcm9qZWN0TGlzdC5zZXRQcm9qZWN0cyhcbiAgICAgIHByb2plY3RMaXN0LmdldFByb2plY3RzKCkubWFwKChwcm9qZWN0KSA9PiBPYmplY3QuYXNzaWduKG5ldyBQcm9qZWN0KCksIHByb2plY3QpKSxcbiAgICApO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBwcm9qZWN0TGlzdFxuICAgICAgLmdldFByb2plY3RzKClcbiAgICAgIC5mb3JFYWNoKChwcm9qZWN0KSA9PiBcbiAgICAgICAgcHJvamVjdC5zZXRUb2RvTGlzdChcbiAgICAgICAgICBPYmplY3QuYXNzaWduKG5ldyBUb2RvTGlzdCgpLCBwcm9qZWN0LmdldFRvZG9MaXN0KCkpKVxuICAgICAgKTtcblxuICAgIHByb2plY3RMaXN0LnNldEN1cnJlbnRQcm9qZWN0QnlJbmRleCgwKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIHByb2plY3RMaXN0XG4gICAgLmdldFByb2plY3RzKClcbiAgICAuZm9yRWFjaCgocHJvamVjdCkgPT4gXG4gICAgcHJvamVjdC5nZXRUb2RvTGlzdCgpLnNldFRvZG9zKFxuICAgICAgcHJvamVjdC5nZXRUb2RvTGlzdCgpLmdldFRvZG9zKCkubWFwKFxuICAgICAgICAodG9kbykgPT4gT2JqZWN0LmFzc2lnbihuZXcgVG9kb0l0ZW0oKSwgdG9kbykpKVxuICAgICAgICApO1xuICAgICAgICBcbiAgICAvLyBwcm9qZWN0TGlzdC5nZXRQcm9qZWN0cygpLmZvckVhY2goKHByb2plY3QpID0+IHsgY29uc29sZS5sb2coXCJQcm9qZWN0OlwiLHByb2plY3QsXCJcXG5Ub2RvczogXCIscHJvamVjdC5nZXRUb2RvTGlzdCgpLmdldFRvZG9zKCkpOyB9KTtcbiAgICByZXR1cm4gcHJvamVjdExpc3Q7XG4gIH1cblxuICBzdGF0aWMgYWRkVG9kbyhwcm9qZWN0TmFtZSwgbmFtZSwgZGVzY3JpcHRpb24sIGRhdGUpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IFN0b3JhZ2UuZ2V0UHJvamVjdExpc3QoKTtcbiAgICBpZiAocHJvamVjdExpc3QgPT09IG51bGwgfHwgcHJvamVjdExpc3QuZ2V0UHJvamVjdHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHJvamVjdExpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuYWRkVG9kbyhuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSk7XG4gICAgU3RvcmFnZS5zYXZlUHJvamVjdExpc3QocHJvamVjdExpc3QpO1xuICB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QobmFtZSkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gU3RvcmFnZS5nZXRQcm9qZWN0TGlzdCgpO1xuICAgIGlmIChwcm9qZWN0TGlzdCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwcm9qZWN0TGlzdC5hZGRQcm9qZWN0KG5hbWUpO1xuICAgIFN0b3JhZ2Uuc2F2ZVByb2plY3RMaXN0KHByb2plY3RMaXN0KTtcbiAgfVxufVxuIiwiY2xhc3MgVG9kb0l0ZW0ge1xuICBjb25zdHJ1Y3RvcihpZCwgbmFtZSwgZGVzY3JpcHRpb24sIGRhdGUpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5kYXRlID0gZGF0ZTtcbiAgfVxuXG4gIGdldCBnZXRJRCgpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvSXRlbTtcbiIsImltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtJztcblxuY2xhc3MgVG9kb0xpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRvZG9zID0gW107XG4gIH1cblxuICBnZXRUb2RvcygpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvcztcbiAgfVxuXG4gIHNldFRvZG9zKHRvZG9zKSB7XG4gICAgdGhpcy50b2RvcyA9IHRvZG9zO1xuICB9XG5cbiAgZ2V0TnVtVG9kb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3MubGVuZ3RoO1xuICB9XG5cbiAgI3RvZG9DYXJkKHRvZG8pIHtcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBjb25zdCB0b2RvRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY29uc3QgdG9kb0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdG9kb1RpdGxlLmlubmVySFRNTCA9IGAke3RvZG8ubmFtZX1gO1xuICAgIHRvZG9EZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0b2RvLmRlc2NyaXB0aW9ufWA7XG4gICAgdG9kb0R1ZURhdGUuaW5uZXJIVE1MID0gYER1ZSBkYXRlOiAke3RvZG8uZGF0ZX1gO1xuICAgIHRvZG9UaXRsZS5jbGFzc0xpc3QuYWRkKCd0ZXh0LXhsJywgJ2ZvbnQtYm9sZCcpO1xuICAgIHRvZG9EZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxnJyk7XG4gICAgdG9kb0R1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGV4dC1sZycpO1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnYm9yZGVyLTInLCAnYm9yZGVyLWluZGlnby01MDAnLCAncm91bmRlZC1tZCcsICdob3ZlcjpiZy1pbmRpZ28tMzAwJywgJ3AtMScsICdjdXJzb3ItcG9pbnRlcicpO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQodG9kb1RpdGxlKTtcbiAgICBjYXJkLmFwcGVuZENoaWxkKHRvZG9EZXNjcmlwdGlvbik7XG4gICAgY2FyZC5hcHBlbmRDaGlsZCh0b2RvRHVlRGF0ZSk7XG5cbiAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVUb2RvKHRvZG8uZ2V0SUQpO1xuICAgIH0pO1xuICAgIHJldHVybiBjYXJkO1xuICB9XG5cbiAgYWRkVG9kbyhuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5nZXROdW1Ub2RvcygpO1xuICAgIGNvbnN0IHRvZG8gPSBuZXcgVG9kb0l0ZW0oaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKTtcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG4gICAgdGhpcy5kaXNwbGF5VG9kb3MoKTtcbiAgfVxuXG4gIHJlbW92ZVRvZG8odG9kbykge1xuICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLnNwbGljZSh0b2RvLmdldElELCB0b2RvLmdldElEKTtcbiAgICB0aGlzLmRpc3BsYXlUb2RvcygpO1xuICB9XG5cbiAgZGlzcGxheVRvZG9zKCkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tbGlzdCcpO1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMudG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgY29uc3QgY2FyZCA9IHRoaXMuI3RvZG9DYXJkKHRvZG8pO1xuICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoY2FyZCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0xpc3Q7XG4iLCJpbXBvcnQgUHJvamVjdExpc3QgZnJvbSAnLi9Qcm9qZWN0TGlzdCc7XG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL1N0b3JhZ2UnO1xuXG5jb25zdCBtYWluVUkgPSAoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzID0gbmV3IFByb2plY3RMaXN0KCk7XG5cbiAgY29uc3QgYWRkUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3Qtc3VibWl0Jyk7XG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtdGl0bGUnKTtcbiAgICBmb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRpdGxlID0gcHJvamVjdElucHV0LnZhbHVlO1xuICAgICAgcHJvamVjdHMuYWRkUHJvamVjdCh0aXRsZSk7XG4gICAgICBTdG9yYWdlLmFkZFByb2plY3QodGl0bGUpO1xuICAgICAgcHJvamVjdHMuZGlzcGxheVByb2plY3RzKCk7XG4gICAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhZGRUb2RvID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvcm1TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby1zdWJtaXQnKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXRpdGxlJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby1kZXNjcmlwdGlvbicpO1xuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby1kYXRlJyk7XG4gICAgZm9ybVN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCB0aXRsZVZhbCA9IHRpdGxlLnZhbHVlO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb25WYWwgPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgIGNvbnN0IGRhdGVWYWwgPSBkYXRlLnZhbHVlO1xuICAgICAgcHJvamVjdHMuY3VycmVudFByb2plY3QuYWRkVG9kbyh0aXRsZVZhbCwgZGVzY3JpcHRpb25WYWwsIGRhdGVWYWwpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGl0bGUudmFsdWUgPSAnJztcbiAgICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gJyc7XG4gICAgICBkYXRlLnZhbHVlID0gJyc7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGFkZFByb2plY3QoKTtcbiAgICBhZGRUb2RvKCk7XG4gICAgY29uc3QgcHJvamVjdDEgPSAnZW1haWxzJztcbiAgICBjb25zdCBwcm9qZWN0MiA9ICdHcm9jZXJpZXMnO1xuICAgIFN0b3JhZ2Uuc2F2ZVByb2plY3RMaXN0KHByb2plY3RzKTtcbiAgICBwcm9qZWN0cy5hZGRQcm9qZWN0KHByb2plY3QxKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QocHJvamVjdDEpO1xuICAgIHByb2plY3RzLmdldEN1cnJlbnRQcm9qZWN0KCkuYWRkVG9kbygnR290dGEgZW1haWwgZGFkJywgJ0hlIHJlYWxseSBuZWVkcyB0aGlzIGVtYWlsIHNvb24nLCBuZXcgRGF0ZSgpKTtcbiAgICBwcm9qZWN0cy5hZGRQcm9qZWN0KHByb2plY3QyKTtcbiAgICBTdG9yYWdlLmFkZFByb2plY3QocHJvamVjdDIpO1xuICAgIHByb2plY3RzLmdldEN1cnJlbnRQcm9qZWN0KCkuYWRkVG9kbygnR290dGEgZ2V0IGdyb2NlcmllcycsIFwiSSdtIHZlcnkgaHVuZ3J5IHJuXCIsIG5ldyBEYXRlKCkpO1xuICAgIFN0b3JhZ2UuYWRkVG9kbyhwcm9qZWN0MSwgJ0dvdHRhIGVtYWlsIGRhZCcsICdIZSByZWFsbHkgbmVlZHMgdGhpcyBlbWFpbCBzb29uJywgbmV3IERhdGUoKSk7XG4gICAgU3RvcmFnZS5hZGRUb2RvKHByb2plY3QyLCAnR290dGEgZ2V0IGdyb2NlcmllcycsIFwiSSdtIHZlcnkgaHVuZ3J5IHJuXCIsIG5ldyBEYXRlKCkpO1xuICAgIHByb2plY3RzLnNldEN1cnJlbnRQcm9qZWN0QnlJbmRleCgwKTtcbiAgICBwcm9qZWN0cy5kaXNwbGF5UHJvamVjdHMoKTtcbiAgICBjb25zb2xlLmxvZyhcIlJldHJpZXZlIHNhdmVkIHByb2plY3RsaXN0OiBcIixTdG9yYWdlLmdldFByb2plY3RMaXN0KCkpO1xuICB9XG4gIHJldHVybiB7IHJlbmRlciB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbWFpblVJO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbWFpblVJIGZyb20gJy4vY29tcG9uZW50cy9tYWluVUknO1xuXG5tYWluVUkoKS5yZW5kZXIoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==