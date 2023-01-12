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

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  get todos() {
    return this.#todolist;
  }

  addTodo(todo) {
    this.#todolist.push(todo);
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

  #selectedProject = null;

  get projects() {
    return this.#projects;
  }

  get numProjects() {
    return this.#projects.length;
  }

  addProject(project) {
    this.#projects.push(project);
  }

  static projectButton(project) {
    const projectBtn = document.createElement('button');
    projectBtn.innerHTML = `${project.name} ->`;
    project.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1');
    project.addEventListener('click', () => {
      this.#selectedProject = project;
      project.displayTodos();
    });
    return project;
  }

  displayProjects() {
    console.log('projects:', this.#projects);
    const projectList = document.querySelector('#projects-list');
    projectList.innerHTML = '';
    this.#projects.forEach((project) => {
      const projectBtn = ProjectList.projectButton(project);
      projectList.appendChild(projectBtn);
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectList);


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

  addTodo(todo) {
    this.#todos.push(todo);
  }

  static todoCard(todo) {
    const card = document.createElement('div');
    const todoTitle = document.createElement('h3');
    const todoDescription = document.createElement('p');
    const todoDueDate = document.createElement('p');
    todoTitle.innerHTML = `${todo.title}`;
    todoDescription.innerHTML = `${todo.description}`;
    todoDueDate.innerHTML = `Due date: ${todo.dueDate}`;
    todoTitle.classList.add('text-xl', 'font-bold');
    todoDescription.classList.add('text-lg');
    todoDueDate.classList.add('text-lg');
    card.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1');
    card.appendChild(todoTitle);
    card.appendChild(todoDescription);
    card.appendChild(todoDueDate);
    return card;
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



const mainUI = () => {
  const projects = new _ProjectList__WEBPACK_IMPORTED_MODULE_0__["default"]();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0Esa0JBQWtCLGlEQUFROztBQUUxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNuQnZCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFdBQVc7QUFDeEMsbUNBQW1DLGlCQUFpQjtBQUNwRCx5Q0FBeUMsYUFBYTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNDZ0I7QUFDUjs7QUFFaEM7QUFDQSx1QkFBdUIsb0RBQVc7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsTUFBTTtBQUNuQyxtQ0FBbUMsWUFBWTtBQUMvQyx5Q0FBeUMsUUFBUTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGdEQUFPO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUEsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7O1VDOUR0QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnlDOztBQUV6Qyw4REFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9qYXZhc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvUHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9jb21wb25lbnRzL1Byb2plY3RMaXN0LmpzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvVG9kb2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9tYWluVUkuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9kb0xpc3QgZnJvbSAnLi9Ub2RvbGlzdCc7XG5cbmNsYXNzIFByb2plY3Qge1xuICAjdG9kb2xpc3QgPSBuZXcgVG9kb0xpc3QoKTtcblxuICBjb25zdHJ1Y3RvcihpZCwgbmFtZSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0IHRvZG9zKCkge1xuICAgIHJldHVybiB0aGlzLiN0b2RvbGlzdDtcbiAgfVxuXG4gIGFkZFRvZG8odG9kbykge1xuICAgIHRoaXMuI3RvZG9saXN0LnB1c2godG9kbyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDtcbiIsImNsYXNzIFByb2plY3RMaXN0IHtcbiAgI3Byb2plY3RzID0gW107XG5cbiAgI3NlbGVjdGVkUHJvamVjdCA9IG51bGw7XG5cbiAgZ2V0IHByb2plY3RzKCkge1xuICAgIHJldHVybiB0aGlzLiNwcm9qZWN0cztcbiAgfVxuXG4gIGdldCBudW1Qcm9qZWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy4jcHJvamVjdHMubGVuZ3RoO1xuICB9XG5cbiAgYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgdGhpcy4jcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9qZWN0QnV0dG9uKHByb2plY3QpIHtcbiAgICBjb25zdCBwcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgcHJvamVjdEJ0bi5pbm5lckhUTUwgPSBgJHtwcm9qZWN0Lm5hbWV9IC0+YDtcbiAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoJ2JvcmRlci0yJywgJ2JvcmRlci1pbmRpZ28tNTAwJywgJ3JvdW5kZWQtbWQnLCAnaG92ZXI6YmctaW5kaWdvLTMwMCcsICdwLTEnKTtcbiAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy4jc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgIHByb2plY3QuZGlzcGxheVRvZG9zKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb2plY3Q7XG4gIH1cblxuICBkaXNwbGF5UHJvamVjdHMoKSB7XG4gICAgY29uc29sZS5sb2coJ3Byb2plY3RzOicsIHRoaXMuI3Byb2plY3RzKTtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cy1saXN0Jyk7XG4gICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy4jcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdEJ0biA9IFByb2plY3RMaXN0LnByb2plY3RCdXR0b24ocHJvamVjdCk7XG4gICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0TGlzdDtcbiIsImNsYXNzIFRvZG9MaXN0IHtcbiAgI3RvZG9zID0gW107XG5cbiAgZ2V0IHRvZG9zKCkge1xuICAgIHJldHVybiB0aGlzLiN0b2RvcztcbiAgfVxuXG4gIGdldCBudW1Ub2RvcygpIHtcbiAgICByZXR1cm4gdGhpcy4jdG9kb3MubGVuZ3RoO1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvKSB7XG4gICAgdGhpcy4jdG9kb3MucHVzaCh0b2RvKTtcbiAgfVxuXG4gIHN0YXRpYyB0b2RvQ2FyZCh0b2RvKSB7XG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgY29uc3QgdG9kb0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNvbnN0IHRvZG9EdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRvZG9UaXRsZS5pbm5lckhUTUwgPSBgJHt0b2RvLnRpdGxlfWA7XG4gICAgdG9kb0Rlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RvZG8uZGVzY3JpcHRpb259YDtcbiAgICB0b2RvRHVlRGF0ZS5pbm5lckhUTUwgPSBgRHVlIGRhdGU6ICR7dG9kby5kdWVEYXRlfWA7XG4gICAgdG9kb1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3RleHQteGwnLCAnZm9udC1ib2xkJyk7XG4gICAgdG9kb0Rlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ3RleHQtbGcnKTtcbiAgICB0b2RvRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxnJyk7XG4gICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdib3JkZXItMicsICdib3JkZXItaW5kaWdvLTUwMCcsICdyb3VuZGVkLW1kJywgJ2hvdmVyOmJnLWluZGlnby0zMDAnLCAncC0xJyk7XG4gICAgY2FyZC5hcHBlbmRDaGlsZCh0b2RvVGl0bGUpO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQodG9kb0Rlc2NyaXB0aW9uKTtcbiAgICBjYXJkLmFwcGVuZENoaWxkKHRvZG9EdWVEYXRlKTtcbiAgICByZXR1cm4gY2FyZDtcbiAgfVxuXG4gIGRpc3BsYXlUb2RvcygpIHtcbiAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLWxpc3QnKTtcbiAgICB0b2RvTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLiN0b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICBjb25zdCBjYXJkID0gVG9kb0xpc3QudG9kb0NhcmQodG9kbyk7XG4gICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChjYXJkKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvTGlzdDtcbiIsImltcG9ydCBQcm9qZWN0TGlzdCBmcm9tICcuL1Byb2plY3RMaXN0JztcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG5cbmNvbnN0IG1haW5VSSA9ICgpID0+IHtcbiAgY29uc3QgcHJvamVjdHMgPSBuZXcgUHJvamVjdExpc3QoKTtcblxuICBjb25zdCB0b2RvQ2FyZCA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUpID0+IHtcbiAgICBjb25zdCB0b2RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBjb25zdCB0b2RvRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY29uc3QgdG9kb0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdG9kb1RpdGxlLmlubmVySFRNTCA9IGAke3RpdGxlfWA7XG4gICAgdG9kb0Rlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke2Rlc2NyaXB0aW9ufWA7XG4gICAgdG9kb0R1ZURhdGUuaW5uZXJIVE1MID0gYER1ZSBkYXRlOiAke2R1ZURhdGV9YDtcbiAgICB0b2RvVGl0bGUuY2xhc3NMaXN0LmFkZCgndGV4dC14bCcsICdmb250LWJvbGQnKTtcbiAgICB0b2RvRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndGV4dC1sZycpO1xuICAgIHRvZG9EdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ3RleHQtbGcnKTtcbiAgICB0b2RvLmNsYXNzTGlzdC5hZGQoJ2JvcmRlci0yJywgJ2JvcmRlci1pbmRpZ28tNTAwJywgJ3JvdW5kZWQtbWQnLCAnaG92ZXI6YmctaW5kaWdvLTMwMCcsICdwLTEnKTtcbiAgICB0b2RvLmFwcGVuZENoaWxkKHRvZG9UaXRsZSk7XG4gICAgdG9kby5hcHBlbmRDaGlsZCh0b2RvRGVzY3JpcHRpb24pO1xuICAgIHRvZG8uYXBwZW5kQ2hpbGQodG9kb0R1ZURhdGUpO1xuICAgIHJldHVybiB0b2RvO1xuICB9O1xuICBjb25zdCBhZGRQcm9qZWN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvcm1TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1zdWJtaXQnKTtcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10aXRsZScpO1xuICAgIGZvcm1TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdGl0bGUgPSBwcm9qZWN0SW5wdXQudmFsdWU7XG4gICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdHMubnVtUHJvamVjdHMsIHRpdGxlKTtcbiAgICAgIHByb2plY3RzLmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgICBwcm9qZWN0cy5kaXNwbGF5UHJvamVjdHMoKTtcbiAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFRvZG8gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXN1Ym1pdCcpO1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby10aXRsZScpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tZGVzY3JpcHRpb24nKTtcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tZGF0ZScpO1xuICAgIGZvcm1TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdGl0bGVWYWwgPSB0aXRsZS52YWx1ZTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsID0gZGVzY3JpcHRpb24udmFsdWU7XG4gICAgICBjb25zdCBkYXRlVmFsID0gZGF0ZS52YWx1ZTtcbiAgICAgIGNvbnN0IHRvZG8gPSB0b2RvQ2FyZCh0aXRsZVZhbCwgZGVzY3JpcHRpb25WYWwsIGRhdGVWYWwpO1xuICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kbyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aXRsZS52YWx1ZSA9ICcnO1xuICAgICAgZGVzY3JpcHRpb24udmFsdWUgPSAnJztcbiAgICAgIGRhdGUudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgYWRkUHJvamVjdCgpO1xuICAgIGFkZFRvZG8oKTtcbiAgfVxuICByZXR1cm4geyByZW5kZXIgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1haW5VSTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IG1haW5VSSBmcm9tICcuL2NvbXBvbmVudHMvbWFpblVJJztcblxubWFpblVJKCkucmVuZGVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=