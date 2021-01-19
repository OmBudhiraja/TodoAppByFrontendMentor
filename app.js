// global selectors
const todoInput = document.querySelector(".todo-input");
const app = document.querySelector(".app");
const todoBox = document.querySelector(".todo-box");
const themeChanger = document.querySelector(".theme");
const inputCircle = document.querySelector(".input-circle");
const remainBox = document.querySelector(".remain");
const todo = document.querySelector(".todo");
const itemLeft = document.querySelector(".item-left");
const clearCompleteBtn = document.querySelector(".clear");
const infoBox = document.querySelector('.info')
const infoBtns = document.querySelectorAll(".types h4");
let todoArray;

// functions//

function deleteTodo(e) {
  if (e.target.classList.contains("cross")) {
    let inner = e.target.parentElement.children[1].innerHTML;
    // console.log(inner)
    // deleting from local storage
    if (!localStorage.getItem("local-todos")) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(localStorage.getItem("local-todos"));
    }
    todoArray.splice(todoArray.indexOf(inner), 1);
    localStorage.setItem("local-todos", JSON.stringify(todoArray));

    // deleting from ui
    e.target.parentElement.style.opacity = 0;
    e.target.parentElement.addEventListener("transitionend", () => {
      e.target.parentElement.remove();
      nrOfItems();
    });
  }
}

function saveLocal(value) {
  if (!localStorage.getItem("local-todos")) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(localStorage.getItem("local-todos"));
  }
  todoArray.push(value);
  localStorage.setItem("local-todos", JSON.stringify(todoArray));
}

function showTodo() {
  if (!localStorage.getItem("local-todos")) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(localStorage.getItem("local-todos"));
  }
  todoArray.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const compCircle = document.createElement("span");
    compCircle.classList.add("tick");
    const content = document.createElement("div");
    content.classList.add("content");
    content.innerHTML = todo;
    const crossImg = document.createElement("img");
    crossImg.classList.add("cross");
    crossImg.src = "./images/icon-cross.svg";

    // append childs
    todoDiv.appendChild(compCircle);
    todoDiv.appendChild(content);
    todoDiv.appendChild(crossImg);

    todoBox.appendChild(todoDiv);
  });
}

function nrOfItems() {
  let allTodos = document.querySelectorAll(".todo");
  // console.log(allTodos)
  let checkedTodos = [];
  allTodos.forEach((todo) => {
    if (!todo.children[0].classList.contains("checked")) {
      checkedTodos.push(todo);
    }
  });
  if (checkedTodos.length == 0) {
    itemLeft.innerText = "-- Items Left";
  } else {
    itemLeft.innerText = checkedTodos.length + " Items Left";
  }
}

function clearComplete() {
  let allTodos = document.querySelectorAll(".todo");
  allTodos.forEach((todo) => {
    if (todo.children[0].classList.contains("checked")) {
      todo.style.opacity = 0;
      todo.addEventListener("transitionend", () => {
        todo.remove();
      });
      let localArray = JSON.parse(localStorage.getItem("local-todos"));
      localArray.splice(localArray.indexOf(todo.innerText), 1);

      // reseting the local storage
      localStorage.setItem("local-todos", JSON.stringify(localArray));
    }
  });
}

// event listners



document.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    if (todoInput.value != "") {
      //creating elements
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      if(app.classList.contains('light')){
        todoDiv.classList.add('light-todo')
      }

      const compCircle = document.createElement("span");
      compCircle.classList.add("tick");
      const content = document.createElement("div");
      content.classList.add("content");
      content.innerHTML = todoInput.value;
      const crossImg = document.createElement("img");
      crossImg.classList.add("cross");
      crossImg.src = "./images/icon-cross.svg";

      // save to local storage
      saveLocal(todoInput.value);

      // append childs
      todoDiv.appendChild(compCircle);
      todoDiv.appendChild(content);
      todoDiv.appendChild(crossImg);

      todoBox.appendChild(todoDiv);

      todoInput.value = "";

      // increase number of todos
      nrOfItems();
    }
  }
});

document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("content") ||
    e.target.classList.contains("tick")
  ) {
    if (e.target.classList.contains("content")) {
      e.target.classList.toggle("checked-content");
      e.target.parentElement.children[0].classList.toggle("checked");
    } else if (e.target.classList.contains("tick")) {
      e.target.classList.toggle("checked");
      e.target.parentElement.children[1].classList.toggle("checked-content");
    }
    nrOfItems();
  }
});

themeChanger.addEventListener("click", () => {
  //selcting all todos
  let todos = document.querySelectorAll('.todo')

  app.classList.toggle("light");
  todoInput.classList.toggle("light-input");
  inputCircle.classList.toggle("light-circle");
  remainBox.classList.toggle("light-remain");
  todoBox.classList.toggle("light-todo-box");
  infoBox.classList.toggle('info-light')
  todos.forEach(todo=>{
    todo.classList.toggle('light-todo')
  })

  if (app.classList.contains("light")) {
    themeChanger.src = "./images/icon-moon.svg";
  } else {
    themeChanger.src = "./images/icon-sun.svg";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  showTodo();
});

document.addEventListener("DOMContentLoaded", () => {
  nrOfItems();
});

document.addEventListener("click", (e) => {
  deleteTodo(e);
});

clearCompleteBtn.addEventListener("click", () => {
  clearComplete();
});

infoBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // selecting all todos
    let allTodos = document.querySelectorAll(".todo");

    if (btn.classList.contains("uncomplete")) {
      btn.classList.add("active");
      btn.parentElement.children[0].classList.remove("active");
      btn.parentElement.children[2].classList.remove("active");

      allTodos.forEach((todo) => {
        if (todo.children[0].classList.contains("checked")) {
          todo.style.opacity = 0;
          setTimeout(() => {
            todo.style.display = "none";
          }, 200);
        } else {
          todo.style.opacity = 1;
          setTimeout(() => {
            todo.style.display = "flex";
          }, 200);
        }
      });
    } else if (btn.classList.contains("completed")) {
      btn.classList.add("active");
      btn.parentElement.children[0].classList.remove("active");
      btn.parentElement.children[1].classList.remove("active");

      allTodos.forEach((todo) => {
        if (todo.children[0].classList.contains("checked")) {
          todo.style.opacity = 1;
          setTimeout(() => {
            todo.style.display = "flex";
          }, 200);
        } else {
          todo.style.opacity = 0;
          setTimeout(() => {
            todo.style.display = "none";
          }, 200);
        }
      });
    } else if (btn.classList.contains("all")) {
      btn.classList.add("active");
      btn.parentElement.children[1].classList.remove("active");
      btn.parentElement.children[2].classList.remove("active");

      allTodos.forEach((todo) => {
        todo.style.opacity = 1;
        setTimeout(() => {
          todo.style.display = "flex";
        }, 200);
      });
    }
  });
});


