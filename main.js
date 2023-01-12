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

  addTodo(todo) {
    this.#todolist.addTodo(todo);
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

  projectButton(project) {
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
      const projectBtn = this.projectButton(project);
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
  constructor(name, description, date) {
    this.name = name;
    this.description = description;
    this.date = date;
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
class TodoList {
  #todos = [];

  get todos() {
    return this.#todos;
  }

  get numTodos() {
    return this.#todos.length;
  }

  static todoCard(todo) {
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
    card.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1');
    card.appendChild(todoTitle);
    card.appendChild(todoDescription);
    card.appendChild(todoDueDate);
    return card;
  }

  addTodo(todo) {
    this.#todos.push(todo);
    // eslint-disable-next-line no-unused-expressions
    this.displayTodos;
  }

  displayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    this.#todos.forEach((todo) => {
      const card = TodoList.todoCard(todo);
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
/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoItem */ "./src/components/TodoItem.js");




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
      const todoItem = new _TodoItem__WEBPACK_IMPORTED_MODULE_2__["default"](titleVal, descriptionVal, dateVal);
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
    const project1 = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"](projects.numProjects, 'Emails');
    const project2 = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"](projects.numProjects, 'Groceries');
    project1.addTodo(new _TodoItem__WEBPACK_IMPORTED_MODULE_2__["default"]('Gotta email dad', 'He really needs this email soon', new Date()));
    project2.addTodo(new _TodoItem__WEBPACK_IMPORTED_MODULE_2__["default"]('Gotta get groceries', "I'm very hungry rn", new Date()));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0Esa0JBQWtCLGlEQUFROztBQUUxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNqQ3ZCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3REM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNSeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsVUFBVTtBQUN2QyxtQ0FBbUMsaUJBQWlCO0FBQ3BELHlDQUF5QyxVQUFVO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0NnQjtBQUNSO0FBQ0U7O0FBRWxDO0FBQ0EsdUJBQXVCLG9EQUFXOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGdEQUFPO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpREFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnREFBTztBQUNoQyx5QkFBeUIsZ0RBQU87QUFDaEMseUJBQXlCLGlEQUFRO0FBQ2pDLHlCQUF5QixpREFBUTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7OztVQ3JEdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055Qzs7QUFFekMsOERBQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9Qcm9qZWN0TGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1RvZG9JdGVtLmpzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvVG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9tYWluVUkuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9kb0xpc3QgZnJvbSAnLi9Ub2RvbGlzdCc7XG5cbmNsYXNzIFByb2plY3Qge1xuICAjdG9kb2xpc3QgPSBuZXcgVG9kb0xpc3QoKTtcblxuICAjaXNDdXJyZW50ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoaWQsIG5hbWUpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldCBpc0N1cnJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lzQ3VycmVudDtcbiAgfVxuXG4gIHNldCBpc0N1cnJlbnQoY3VycmVudCkge1xuICAgIHRoaXMuI2lzQ3VycmVudCA9IGN1cnJlbnQ7XG4gIH1cblxuICBnZXQgdG9kb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3RvZG9saXN0O1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvKSB7XG4gICAgdGhpcy4jdG9kb2xpc3QuYWRkVG9kbyh0b2RvKTtcbiAgfVxuXG4gIGRpc3BsYXlUb2RvcygpIHtcbiAgICB0aGlzLiN0b2RvbGlzdC5kaXNwbGF5VG9kb3MoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0O1xuIiwiY2xhc3MgUHJvamVjdExpc3Qge1xuICAjcHJvamVjdHMgPSBbXTtcblxuICAjc2VsZWN0ZWRQcm9qZWN0ID0gW107XG5cbiAgZ2V0IHByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLiNwcm9qZWN0cztcbiAgfVxuXG4gIGdldCBudW1Qcm9qZWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy4jcHJvamVjdHMubGVuZ3RoO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRQcm9qZWN0KCkge1xuICAgIHJldHVybiB0aGlzLiNzZWxlY3RlZFByb2plY3Q7XG4gIH1cblxuICBzZXQgY3VycmVudFByb2plY3QocHJvamVjdCkge1xuICAgIHRoaXMuI3NlbGVjdGVkUHJvamVjdC5pc0N1cnJlbnQgPSBmYWxzZTtcblxuICAgIHRoaXMuI3NlbGVjdGVkUHJvamVjdCA9IHByb2plY3Q7XG4gICAgdGhpcy4jc2VsZWN0ZWRQcm9qZWN0LmlzQ3VycmVudCA9IHRydWU7XG4gIH1cblxuICBhZGRQcm9qZWN0KHByb2plY3QpIHtcbiAgICB0aGlzLiNwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xuICB9XG5cbiAgcHJvamVjdEJ1dHRvbihwcm9qZWN0KSB7XG4gICAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHByb2plY3RCdG4uaW5uZXJIVE1MID0gYCR7cHJvamVjdC5uYW1lfSAtPmA7XG4gICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdib3JkZXItMicsICdib3JkZXItaW5kaWdvLTUwMCcsICdyb3VuZGVkLW1kJywgJ2hvdmVyOmJnLWluZGlnby0zMDAnLCAncC0xJyk7XG4gICAgcHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgdGhpcy5kaXNwbGF5UHJvamVjdHMoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcHJvamVjdEJ0bjtcbiAgfVxuXG4gIGRpc3BsYXlQcm9qZWN0cygpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1saXN0Jyk7XG4gICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy4jcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdEJ0biA9IHRoaXMucHJvamVjdEJ1dHRvbihwcm9qZWN0KTtcbiAgICAgIGlmIChwcm9qZWN0LmlzQ3VycmVudCkge1xuICAgICAgICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2JnLWxpbWUtNTAwJyk7XG4gICAgICB9XG4gICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcbiAgICB9KTtcbiAgICB0aGlzLmN1cnJlbnRQcm9qZWN0LmRpc3BsYXlUb2RvcygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RMaXN0O1xuIiwiY2xhc3MgVG9kb0l0ZW0ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkZXNjcmlwdGlvbiwgZGF0ZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0l0ZW07XG4iLCJjbGFzcyBUb2RvTGlzdCB7XG4gICN0b2RvcyA9IFtdO1xuXG4gIGdldCB0b2RvcygpIHtcbiAgICByZXR1cm4gdGhpcy4jdG9kb3M7XG4gIH1cblxuICBnZXQgbnVtVG9kb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3RvZG9zLmxlbmd0aDtcbiAgfVxuXG4gIHN0YXRpYyB0b2RvQ2FyZCh0b2RvKSB7XG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgY29uc3QgdG9kb0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNvbnN0IHRvZG9EdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRvZG9UaXRsZS5pbm5lckhUTUwgPSBgJHt0b2RvLm5hbWV9YDtcbiAgICB0b2RvRGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dG9kby5kZXNjcmlwdGlvbn1gO1xuICAgIHRvZG9EdWVEYXRlLmlubmVySFRNTCA9IGBEdWUgZGF0ZTogJHt0b2RvLmRhdGV9YDtcbiAgICB0b2RvVGl0bGUuY2xhc3NMaXN0LmFkZCgndGV4dC14bCcsICdmb250LWJvbGQnKTtcbiAgICB0b2RvRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndGV4dC1sZycpO1xuICAgIHRvZG9EdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ3RleHQtbGcnKTtcbiAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2JvcmRlci0yJywgJ2JvcmRlci1pbmRpZ28tNTAwJywgJ3JvdW5kZWQtbWQnLCAnaG92ZXI6YmctaW5kaWdvLTMwMCcsICdwLTEnKTtcbiAgICBjYXJkLmFwcGVuZENoaWxkKHRvZG9UaXRsZSk7XG4gICAgY2FyZC5hcHBlbmRDaGlsZCh0b2RvRGVzY3JpcHRpb24pO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQodG9kb0R1ZURhdGUpO1xuICAgIHJldHVybiBjYXJkO1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvKSB7XG4gICAgdGhpcy4jdG9kb3MucHVzaCh0b2RvKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgdGhpcy5kaXNwbGF5VG9kb3M7XG4gIH1cblxuICBkaXNwbGF5VG9kb3MoKSB7XG4gICAgY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby1saXN0Jyk7XG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy4jdG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgY29uc3QgY2FyZCA9IFRvZG9MaXN0LnRvZG9DYXJkKHRvZG8pO1xuICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoY2FyZCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb0xpc3Q7XG4iLCJpbXBvcnQgUHJvamVjdExpc3QgZnJvbSAnLi9Qcm9qZWN0TGlzdCc7XG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IFRvZG9JdGVtIGZyb20gJy4vVG9kb0l0ZW0nO1xuXG5jb25zdCBtYWluVUkgPSAoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzID0gbmV3IFByb2plY3RMaXN0KCk7XG5cbiAgY29uc3QgYWRkUHJvamVjdCA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3Qtc3VibWl0Jyk7XG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtdGl0bGUnKTtcbiAgICBmb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRpdGxlID0gcHJvamVjdElucHV0LnZhbHVlO1xuICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RzLm51bVByb2plY3RzLCB0aXRsZSk7XG4gICAgICBwcm9qZWN0cy5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgICAgcHJvamVjdHMuZGlzcGxheVByb2plY3RzKCk7XG4gICAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhZGRUb2RvID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvcm1TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby1zdWJtaXQnKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXRpdGxlJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby1kZXNjcmlwdGlvbicpO1xuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby1kYXRlJyk7XG4gICAgZm9ybVN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCB0aXRsZVZhbCA9IHRpdGxlLnZhbHVlO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb25WYWwgPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgIGNvbnN0IGRhdGVWYWwgPSBkYXRlLnZhbHVlO1xuICAgICAgY29uc3QgdG9kb0l0ZW0gPSBuZXcgVG9kb0l0ZW0odGl0bGVWYWwsIGRlc2NyaXB0aW9uVmFsLCBkYXRlVmFsKTtcbiAgICAgIHByb2plY3RzLmN1cnJlbnRQcm9qZWN0LmFkZFRvZG8odG9kb0l0ZW0pO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGl0bGUudmFsdWUgPSAnJztcbiAgICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gJyc7XG4gICAgICBkYXRlLnZhbHVlID0gJyc7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGFkZFByb2plY3QoKTtcbiAgICBhZGRUb2RvKCk7XG4gICAgY29uc3QgcHJvamVjdDEgPSBuZXcgUHJvamVjdChwcm9qZWN0cy5udW1Qcm9qZWN0cywgJ0VtYWlscycpO1xuICAgIGNvbnN0IHByb2plY3QyID0gbmV3IFByb2plY3QocHJvamVjdHMubnVtUHJvamVjdHMsICdHcm9jZXJpZXMnKTtcbiAgICBwcm9qZWN0MS5hZGRUb2RvKG5ldyBUb2RvSXRlbSgnR290dGEgZW1haWwgZGFkJywgJ0hlIHJlYWxseSBuZWVkcyB0aGlzIGVtYWlsIHNvb24nLCBuZXcgRGF0ZSgpKSk7XG4gICAgcHJvamVjdDIuYWRkVG9kbyhuZXcgVG9kb0l0ZW0oJ0dvdHRhIGdldCBncm9jZXJpZXMnLCBcIkknbSB2ZXJ5IGh1bmdyeSByblwiLCBuZXcgRGF0ZSgpKSk7XG4gICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0MSk7XG4gICAgcHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0Mik7XG4gICAgcHJvamVjdHMuY3VycmVudFByb2plY3QgPSBwcm9qZWN0MTtcbiAgICBwcm9qZWN0cy5kaXNwbGF5UHJvamVjdHMoKTtcbiAgfVxuICByZXR1cm4geyByZW5kZXIgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1haW5VSTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IG1haW5VSSBmcm9tICcuL2NvbXBvbmVudHMvbWFpblVJJztcblxubWFpblVJKCkucmVuZGVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=