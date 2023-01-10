/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/mainUI.js":
/*!**********************************!*\
  !*** ./src/components/mainUI.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mainUI = () => {
  const projectButton = () => {
    const project = document.createElement('button');
    project.classList.add('border-2', 'border-indigo-500', 'rounded-md', 'hover:bg-indigo-300', 'p-1');
    project.addEventListener('click', () => {
      console.log('clicked');
    });
    return project;
  };

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
    const projectList = document.querySelector('#projects-list');
    const project = projectButton();
    const projectInput = document.querySelector('#project-title');
    formSubmit.addEventListener('click', (e) => {
      const title = projectInput.value;
      project.innerHTML = `${title}  ->`;
      projectList.appendChild(project);
      projectInput.value = '';
      e.preventDefault();
    });
  };

  const addTodo = () => {
    const formSubmit = document.querySelector('#todo-submit');
    const todoList = document.querySelector('#todo-list');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsTUFBTTtBQUNuQyxtQ0FBbUMsWUFBWTtBQUMvQyx5Q0FBeUMsUUFBUTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixRQUFRO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQSxpRUFBZSxNQUFNLEVBQUM7Ozs7Ozs7VUNuRXRCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUM7O0FBRXpDLDhEQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9tYWluVUkuanMiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9qYXZhc2NyaXB0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2phdmFzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvamF2YXNjcmlwdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtYWluVUkgPSAoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZCgnYm9yZGVyLTInLCAnYm9yZGVyLWluZGlnby01MDAnLCAncm91bmRlZC1tZCcsICdob3ZlcjpiZy1pbmRpZ28tMzAwJywgJ3AtMScpO1xuICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcpO1xuICAgIH0pO1xuICAgIHJldHVybiBwcm9qZWN0O1xuICB9O1xuXG4gIGNvbnN0IHRvZG9DYXJkID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSkgPT4ge1xuICAgIGNvbnN0IHRvZG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjb25zdCB0b2RvRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0b2RvVGl0bGUuaW5uZXJIVE1MID0gYCR7dGl0bGV9YDtcbiAgICB0b2RvRGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7ZGVzY3JpcHRpb259YDtcbiAgICB0b2RvRHVlRGF0ZS5pbm5lckhUTUwgPSBgRHVlIGRhdGU6ICR7ZHVlRGF0ZX1gO1xuICAgIHRvZG9UaXRsZS5jbGFzc0xpc3QuYWRkKCd0ZXh0LXhsJywgJ2ZvbnQtYm9sZCcpO1xuICAgIHRvZG9EZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LWxnJyk7XG4gICAgdG9kb0R1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGV4dC1sZycpO1xuICAgIHRvZG8uY2xhc3NMaXN0LmFkZCgnYm9yZGVyLTInLCAnYm9yZGVyLWluZGlnby01MDAnLCAncm91bmRlZC1tZCcsICdob3ZlcjpiZy1pbmRpZ28tMzAwJywgJ3AtMScpO1xuICAgIHRvZG8uYXBwZW5kQ2hpbGQodG9kb1RpdGxlKTtcbiAgICB0b2RvLmFwcGVuZENoaWxkKHRvZG9EZXNjcmlwdGlvbik7XG4gICAgdG9kby5hcHBlbmRDaGlsZCh0b2RvRHVlRGF0ZSk7XG4gICAgcmV0dXJuIHRvZG87XG4gIH07XG4gIGNvbnN0IGFkZFByb2plY3QgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXN1Ym1pdCcpO1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RzLWxpc3QnKTtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdEJ1dHRvbigpO1xuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXRpdGxlJyk7XG4gICAgZm9ybVN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCB0aXRsZSA9IHByb2plY3RJbnB1dC52YWx1ZTtcbiAgICAgIHByb2plY3QuaW5uZXJIVE1MID0gYCR7dGl0bGV9ICAtPmA7XG4gICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcbiAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFRvZG8gPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXN1Ym1pdCcpO1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tbGlzdCcpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tdGl0bGUnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLWRlc2NyaXB0aW9uJyk7XG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLWRhdGUnKTtcbiAgICBmb3JtU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRpdGxlVmFsID0gdGl0bGUudmFsdWU7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvblZhbCA9IGRlc2NyaXB0aW9uLnZhbHVlO1xuICAgICAgY29uc3QgZGF0ZVZhbCA9IGRhdGUudmFsdWU7XG4gICAgICBjb25zdCB0b2RvID0gdG9kb0NhcmQodGl0bGVWYWwsIGRlc2NyaXB0aW9uVmFsLCBkYXRlVmFsKTtcbiAgICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG8pO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGl0bGUudmFsdWUgPSAnJztcbiAgICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gJyc7XG4gICAgICBkYXRlLnZhbHVlID0gJyc7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGFkZFByb2plY3QoKTtcbiAgICBhZGRUb2RvKCk7XG4gIH1cbiAgcmV0dXJuIHsgcmVuZGVyIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtYWluVUk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBtYWluVUkgZnJvbSAnLi9jb21wb25lbnRzL21haW5VSSc7XG5cbm1haW5VSSgpLnJlbmRlcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9