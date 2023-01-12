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
  #todolist = new _Todolist__WEBPACK_IMPORTED_MODULE_0__["default"]();

  #isCurrent = false;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  get isCurrent() {
    return this.#isCurrent;
  }

  set isCurrent(current) {
    this.#isCurrent = current;
  }

  get todos() {
    return this.#todolist;
  }

  addTodo(name, description, date) {
    this.#todolist.addTodo(name, description, date);
  }

  displayTodos() {
    this.#todolist.displayTodos();
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ProjectList {
  #projects = [];

  #selectedProject = [];

  get projects() {
    return this.#projects;
  }

  get numProjects() {
    return this.#projects.length;
  }

  get currentProject() {
    return this.#selectedProject;
  }

  set currentProject(project) {
    this.#selectedProject.isCurrent = false;

    this.#selectedProject = project;
    this.#selectedProject.isCurrent = true;
  }

  addProject(project) {
    this.#projects.push(project);
    this.currentProject = project;
  }

  #projectButton(project) {
    const projectBtn = document.createElement('button');
    projectBtn.innerHTML = `${project.name} ->`;
    projectBtn.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1');
    projectBtn.addEventListener('click', () => {
      this.currentProject = project;
      this.displayProjects();
    });
    return projectBtn;
  }

  displayProjects() {
    const projectList = document.querySelector('#projects-list');
    projectList.innerHTML = '';
    this.#projects.forEach((project) => {
      const projectBtn = this.#projectButton(project);
      if (project.isCurrent) {
        projectBtn.classList.add('bg-lime-500');
      }
      projectList.appendChild(projectBtn);
    });
    this.currentProject.displayTodos();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectList);


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
  #todos = [];

  get getTodos() {
    return this.#todos;
  }

  get numTodos() {
    return this.#todos.length;
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
    const id = this.#todos.length;
    const todo = new _TodoItem__WEBPACK_IMPORTED_MODULE_0__["default"](id, name, description, date);
    this.#todos.push(todo);
    this.displayTodos();
  }

  removeTodo(todo) {
    this.#todos = this.#todos.splice(todo.getID, todo.getID);
    this.displayTodos();
  }

  displayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    this.#todos.forEach((todo) => {
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
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ "./src/components/Project.js");



const mainUI = () => {
  const projects = new _ProjectList__WEBPACK_IMPORTED_MODULE_0__["default"]();

  const addProject = () => {
    const formSubmit = document.querySelector('#project-submit');
    const projectInput = document.querySelector('#project-title');
    formSubmit.addEventListener('click', (e) => {
      const title = projectInput.value;
      const project = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"](projects.numProjects, title);
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
    const project1 = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"](projects.numProjects, 'Emails');
    const project2 = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"](projects.numProjects, 'Groceries');
    project1.addTodo('Gotta email dad', 'He really needs this email soon', new Date());
    project2.addTodo('Gotta get groceries', "I'm very hungry rn", new Date());
    projects.addProject(project1);
    projects.addProject(project2);
    projects.currentProject = project1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0Esa0JBQWtCLGlEQUFROztBQUUxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNqQ3ZCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3REM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDYlU7O0FBRWxDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFVBQVU7QUFDdkMsbUNBQW1DLGlCQUFpQjtBQUNwRCx5Q0FBeUMsVUFBVTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixpREFBUTtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEZ0I7QUFDUjs7QUFFaEM7QUFDQSx1QkFBdUIsb0RBQVc7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsZ0RBQU87QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZ0RBQU87QUFDaEMseUJBQXlCLGdEQUFPO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7OztVQ25EdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055Qzs7QUFFekMsOERBQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9Qcm9qZWN0TGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1RvZG9JdGVtLmpzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvVG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9tYWluVUkuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9kb0xpc3QgZnJvbSAnLi9Ub2RvbGlzdCc7XG5cbmNsYXNzIFByb2plY3Qge1xuICAjdG9kb2xpc3QgPSBuZXcgVG9kb0xpc3QoKTtcblxuICAjaXNDdXJyZW50ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoaWQsIG5hbWUpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldCBpc0N1cnJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lzQ3VycmVudDtcbiAgfVxuXG4gIHNldCBpc0N1cnJlbnQoY3VycmVudCkge1xuICAgIHRoaXMuI2lzQ3VycmVudCA9IGN1cnJlbnQ7XG4gIH1cblxuICBnZXQgdG9kb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3RvZG9saXN0O1xuICB9XG5cbiAgYWRkVG9kbyhuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSkge1xuICAgIHRoaXMuI3RvZG9saXN0LmFkZFRvZG8obmFtZSwgZGVzY3JpcHRpb24sIGRhdGUpO1xuICB9XG5cbiAgZGlzcGxheVRvZG9zKCkge1xuICAgIHRoaXMuI3RvZG9saXN0LmRpc3BsYXlUb2RvcygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7XG4iLCJjbGFzcyBQcm9qZWN0TGlzdCB7XG4gICNwcm9qZWN0cyA9IFtdO1xuXG4gICNzZWxlY3RlZFByb2plY3QgPSBbXTtcblxuICBnZXQgcHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3Byb2plY3RzO1xuICB9XG5cbiAgZ2V0IG51bVByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLiNwcm9qZWN0cy5sZW5ndGg7XG4gIH1cblxuICBnZXQgY3VycmVudFByb2plY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3NlbGVjdGVkUHJvamVjdDtcbiAgfVxuXG4gIHNldCBjdXJyZW50UHJvamVjdChwcm9qZWN0KSB7XG4gICAgdGhpcy4jc2VsZWN0ZWRQcm9qZWN0LmlzQ3VycmVudCA9IGZhbHNlO1xuXG4gICAgdGhpcy4jc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdDtcbiAgICB0aGlzLiNzZWxlY3RlZFByb2plY3QuaXNDdXJyZW50ID0gdHJ1ZTtcbiAgfVxuXG4gIGFkZFByb2plY3QocHJvamVjdCkge1xuICAgIHRoaXMuI3Byb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgdGhpcy5jdXJyZW50UHJvamVjdCA9IHByb2plY3Q7XG4gIH1cblxuICAjcHJvamVjdEJ1dHRvbihwcm9qZWN0KSB7XG4gICAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHByb2plY3RCdG4uaW5uZXJIVE1MID0gYCR7cHJvamVjdC5uYW1lfSAtPmA7XG4gICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdib3JkZXItMicsICdib3JkZXItaW5kaWdvLTUwMCcsICdyb3VuZGVkLW1kJywgJ2hvdmVyOmJnLWluZGlnby0zMDAnLCAncC0xJyk7XG4gICAgcHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgdGhpcy5kaXNwbGF5UHJvamVjdHMoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcHJvamVjdEJ0bjtcbiAgfVxuXG4gIGRpc3BsYXlQcm9qZWN0cygpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1saXN0Jyk7XG4gICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy4jcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdEJ0biA9IHRoaXMuI3Byb2plY3RCdXR0b24ocHJvamVjdCk7XG4gICAgICBpZiAocHJvamVjdC5pc0N1cnJlbnQpIHtcbiAgICAgICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdiZy1saW1lLTUwMCcpO1xuICAgICAgfVxuICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEJ0bik7XG4gICAgfSk7XG4gICAgdGhpcy5jdXJyZW50UHJvamVjdC5kaXNwbGF5VG9kb3MoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0TGlzdDtcbiIsImNsYXNzIFRvZG9JdGVtIHtcbiAgY29uc3RydWN0b3IoaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gIH1cblxuICBnZXQgZ2V0SUQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0l0ZW07XG4iLCJpbXBvcnQgVG9kb0l0ZW0gZnJvbSAnLi9Ub2RvSXRlbSc7XG5cbmNsYXNzIFRvZG9MaXN0IHtcbiAgI3RvZG9zID0gW107XG5cbiAgZ2V0IGdldFRvZG9zKCkge1xuICAgIHJldHVybiB0aGlzLiN0b2RvcztcbiAgfVxuXG4gIGdldCBudW1Ub2RvcygpIHtcbiAgICByZXR1cm4gdGhpcy4jdG9kb3MubGVuZ3RoO1xuICB9XG5cbiAgI3RvZG9DYXJkKHRvZG8pIHtcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBjb25zdCB0b2RvRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY29uc3QgdG9kb0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdG9kb1RpdGxlLmlubmVySFRNTCA9IGAke3RvZG8ubmFtZX1gO1xuICAgIHRvZG9EZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0b2RvLmRlc2NyaXB0aW9ufWA7XG4gICAgdG9kb0R1ZURhdGUuaW5uZXJIVE1MID0gYER1ZSBkYXRlOiAke3RvZG8uZGF0ZX1gO1xuICAgIHRvZG9UaXRsZS5jbGFzc0xpc3QuYWRkKCd0ZXh0LXhsJywgJ2ZvbnQtYm9sZCcpO1xuICAgIHRvZG9EZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxnJyk7XG4gICAgdG9kb0R1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGV4dC1sZycpO1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnYm9yZGVyLTInLCAnYm9yZGVyLWluZGlnby01MDAnLCAncm91bmRlZC1tZCcsICdob3ZlcjpiZy1pbmRpZ28tMzAwJywgJ3AtMScsICdjdXJzb3ItcG9pbnRlcicpO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQodG9kb1RpdGxlKTtcbiAgICBjYXJkLmFwcGVuZENoaWxkKHRvZG9EZXNjcmlwdGlvbik7XG4gICAgY2FyZC5hcHBlbmRDaGlsZCh0b2RvRHVlRGF0ZSk7XG5cbiAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVUb2RvKHRvZG8uZ2V0SUQpO1xuICAgIH0pO1xuICAgIHJldHVybiBjYXJkO1xuICB9XG5cbiAgYWRkVG9kbyhuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSkge1xuICAgIGNvbnN0IGlkID0gdGhpcy4jdG9kb3MubGVuZ3RoO1xuICAgIGNvbnN0IHRvZG8gPSBuZXcgVG9kb0l0ZW0oaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlKTtcbiAgICB0aGlzLiN0b2Rvcy5wdXNoKHRvZG8pO1xuICAgIHRoaXMuZGlzcGxheVRvZG9zKCk7XG4gIH1cblxuICByZW1vdmVUb2RvKHRvZG8pIHtcbiAgICB0aGlzLiN0b2RvcyA9IHRoaXMuI3RvZG9zLnNwbGljZSh0b2RvLmdldElELCB0b2RvLmdldElEKTtcbiAgICB0aGlzLmRpc3BsYXlUb2RvcygpO1xuICB9XG5cbiAgZGlzcGxheVRvZG9zKCkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tbGlzdCcpO1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMuI3RvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgIGNvbnN0IGNhcmQgPSB0aGlzLiN0b2RvQ2FyZCh0b2RvKTtcbiAgICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKGNhcmQpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9MaXN0O1xuIiwiaW1wb3J0IFByb2plY3RMaXN0IGZyb20gJy4vUHJvamVjdExpc3QnO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcblxuY29uc3QgbWFpblVJID0gKCkgPT4ge1xuICBjb25zdCBwcm9qZWN0cyA9IG5ldyBQcm9qZWN0TGlzdCgpO1xuXG4gIGNvbnN0IGFkZFByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXN1Ym1pdCcpO1xuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXRpdGxlJyk7XG4gICAgZm9ybVN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCB0aXRsZSA9IHByb2plY3RJbnB1dC52YWx1ZTtcbiAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0cy5udW1Qcm9qZWN0cywgdGl0bGUpO1xuICAgICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICAgIHByb2plY3RzLmRpc3BsYXlQcm9qZWN0cygpO1xuICAgICAgcHJvamVjdElucHV0LnZhbHVlID0gJyc7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYWRkVG9kbyA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tc3VibWl0Jyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby10aXRsZScpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tZGVzY3JpcHRpb24nKTtcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tZGF0ZScpO1xuICAgIGZvcm1TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdGl0bGVWYWwgPSB0aXRsZS52YWx1ZTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsID0gZGVzY3JpcHRpb24udmFsdWU7XG4gICAgICBjb25zdCBkYXRlVmFsID0gZGF0ZS52YWx1ZTtcbiAgICAgIHByb2plY3RzLmN1cnJlbnRQcm9qZWN0LmFkZFRvZG8odGl0bGVWYWwsIGRlc2NyaXB0aW9uVmFsLCBkYXRlVmFsKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gICAgICBkZXNjcmlwdGlvbi52YWx1ZSA9ICcnO1xuICAgICAgZGF0ZS52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBhZGRQcm9qZWN0KCk7XG4gICAgYWRkVG9kbygpO1xuICAgIGNvbnN0IHByb2plY3QxID0gbmV3IFByb2plY3QocHJvamVjdHMubnVtUHJvamVjdHMsICdFbWFpbHMnKTtcbiAgICBjb25zdCBwcm9qZWN0MiA9IG5ldyBQcm9qZWN0KHByb2plY3RzLm51bVByb2plY3RzLCAnR3JvY2VyaWVzJyk7XG4gICAgcHJvamVjdDEuYWRkVG9kbygnR290dGEgZW1haWwgZGFkJywgJ0hlIHJlYWxseSBuZWVkcyB0aGlzIGVtYWlsIHNvb24nLCBuZXcgRGF0ZSgpKTtcbiAgICBwcm9qZWN0Mi5hZGRUb2RvKCdHb3R0YSBnZXQgZ3JvY2VyaWVzJywgXCJJJ20gdmVyeSBodW5ncnkgcm5cIiwgbmV3IERhdGUoKSk7XG4gICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0MSk7XG4gICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0Mik7XG4gICAgcHJvamVjdHMuY3VycmVudFByb2plY3QgPSBwcm9qZWN0MTtcbiAgICBwcm9qZWN0cy5kaXNwbGF5UHJvamVjdHMoKTtcbiAgfVxuICByZXR1cm4geyByZW5kZXIgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1haW5VSTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IG1haW5VSSBmcm9tICcuL2NvbXBvbmVudHMvbWFpblVJJztcblxubWFpblVJKCkucmVuZGVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=