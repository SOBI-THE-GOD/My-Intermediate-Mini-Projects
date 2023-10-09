const $ = document;
const toDoContainerElement = $.querySelector(".todo-container");
let todosArr = [];
const toDoSubjectInputElem = $.getElementById("add-todo-subject");
const toDoDetailInputElem = $.getElementById("todo-detail-text-area");
let toDoDoneBox = $.querySelectorAll(".done");
let toDoDoneCircle = $.querySelectorAll(".done-circle");
let toDoDoneIcon = $.querySelectorAll(".done-icon");
let deleteIconElem = $.querySelectorAll(".delete-icon");
let toDoIndexNum = 1;
let toDoChildCount = 0;
let isAddBoxOpen = false;
const addButtonElem = $.querySelector(".add-box-button");
addButtonElem.addEventListener("mouseup", (event) => {
    if (isAddBoxOpen) {
        if (
            event.target.previousElementSibling.previousElementSibling.value.trim()
                .length > 0
        ) {
            isAddBoxOpen = false;
            toDoIndexUpdater();
            todosArrayAdder();
            console.log(todosArr);
            toDoGenerator(
                toDoIndexNum,
                toDoSubjectInputElem.value.trim(),
                toDoDetailInputElem.value.trim(),
                false
            );
            $.getElementById("h1-title").innerHTML = "YOUR TODOS";
            deleteEventListenerUpdater();
            eventListenerDonesUpdater();
            event.target.parentElement.classList.add("close-add-box-animation");
            event.target.previousElementSibling.previousElementSibling.style.display =
                "none";
            event.target.previousElementSibling.style.display = "none";
            event.target.style.position = "absolute";
            $.getElementById("close-add-box").children[0].style.display =
                "none";
            setTimeout(() => {
                event.target.parentElement.classList.remove(
                    "close-add-box-animation"
                );
                event.target.parentElement.style.width = "0";
            }, 300);
        }
    } else {
        isAddBoxOpen = true;
        event.target.parentElement.style.animation =
            "addBoxOpenWidthAnim .3s ease forwards";
        event.target.previousElementSibling.previousElementSibling.style.display =
            "block";
        event.target.previousElementSibling.style.display = "block";
        event.target.style.position = "unset";
        event.target.previousElementSibling.previousElementSibling.value = null;
        event.target.previousElementSibling.previousElementSibling.style.width =
            "17ch";
        event.target.previousElementSibling.value = null;
        event.target.previousElementSibling.style.width = "17ch";
        event.target.previousElementSibling.style.height = "4ch";
        $.getElementById("close-add-box").children[0].style.display = "block";
        setTimeout(() => {
            event.target.parentElement.style.animation = null;
            event.target.parentElement.style.width = "33.295625rem";
        }, 300);
    }
});
function localStorageToDoArrayUpdater() {
    localStorage.setItem("usertodos", JSON.stringify(todosArr));
}
function toDoGenerator(toDoIndex, toDoSubject, toDoDetail, toDoStatus) {
    let toDoDiv = $.createElement("div");
    toDoDiv.classList.add("todo");
    toDoDiv.innerHTML = `
            <span class="todo-element todo-index">
                <span class="todo-index-circle">${toDoIndex}</span>
            </span>
            <span class="todo-element todo-describe-container">
                <details class="todo-describe">
                    <summary>${toDoSubject}</summary>
                    <p>${toDoDetail}</p>
                </details>
            </span>
            <span class="todo-element done" >
                <div class="done-circle" id="todo-done">
                    <span class="material-symbols-outlined done-icon" >close</span>
                </div>
            </span>
            <span class="todo-element delete-todo">
                <span class="delete-container">
                    <span class="material-symbols-outlined delete-icon">delete</span>
                </span>
            </span>`;
    let doneSpan = toDoDiv.querySelector(".done");
    let doneCircle = toDoDiv.querySelector(".done-circle");
    let doneIcon = toDoDiv.querySelector(".done-icon");
    let indexCircle = toDoDiv.querySelector(".todo-index-circle");
    let toDoDescribe = toDoDiv.querySelector(".todo-describe");
    if (toDoStatus) {
        doneCircle.style.translate = "137%";
        doneSpan.style.backgroundColor = "#00DFA2";
        doneIcon.style.color = "#00DFA2";
        doneIcon.innerHTML = "done";
        indexCircle.style.color = "#00DFA2";
        toDoDescribe.style.backgroundColor = "#00DFA2";
        doneCircle.removeAttribute("id");
    } else {
        doneSpan.style.backgroundColor = "#fc3a52";
        doneIcon.style.color = "#fc3a52";
        indexCircle.style.color = "#fc3a52";
        doneIcon.innerHTML = "close";
        toDoDescribe.style.backgroundColor = "#fc3a52";
        doneCircle.setAttribute("id", "todo-done");
    }
    toDoContainerElement.append(toDoDiv);
}
function todosArrayAdder() {
    todosArr.push({
        toDoIndex: toDoIndexNum,
        toDoSubject: toDoSubjectInputElem.value.trim(),
        toDoDetail: toDoDetailInputElem.value.trim(),
        isToDoDone: false,
    });
    localStorageToDoArrayUpdater();
}
$.getElementById("cancel-add-icon").addEventListener("mouseup", (event) => {
    isAddBoxOpen = false;
    event.target.parentElement.parentElement.classList.add(
        "close-add-box-animation"
    );
    event.target.parentElement.nextElementSibling.style.display = "none";
    event.target.parentElement.nextElementSibling.nextElementSibling.style.display =
        "none";
    event.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.style.position =
        "absolute";
    $.getElementById("close-add-box").children[0].style.display = "none";
    setTimeout(() => {
        event.target.parentElement.parentElement.classList.remove(
            "close-add-box-animation"
        );
        event.target.parentElement.parentElement.style.width = "0";
    }, 300);
});
function deleteEventListenerUpdater() {
    deleteIconElem = $.querySelectorAll(".delete-icon");
    Array.from(deleteIconElem).forEach((element) => {
        element.addEventListener("mouseup", deleteToDoHandler);
    });
}
deleteEventListenerUpdater();
function deleteToDoHandler() {
    this.parentElement.parentElement.parentElement.style.animation =
        "deleteOpacityAnim .3s ease-in-out";
    setTimeout(() => {
        this.parentElement.parentElement.parentElement.remove();
        toDoIndexHandler();
        toDoIndexUpdater();
        todosArrayUpdater(this);
        if (toDoContainerElement.childElementCount <= 2) {
            $.getElementById("h1-title").innerHTML = "ADD NEW TODO";
        } else {
            $.getElementById("h1-title").innerHTML = "YOUR TODOS";
        }
    }, 300);
}
function todosArrayUpdater(deleteIconElem) {
    let todoIndex = todosArr.findIndex((todo) => {
        return (
            todo.toDoSubject ===
            deleteIconElem.parentElement.parentElement.previousElementSibling
                .previousElementSibling.firstElementChild.firstElementChild
                .innerHTML
        );
    });
    todosArr.splice(todoIndex, 1);
    todosArr.forEach((todo, index) => {
        todo.toDoIndex = index + 1;
    });
    localStorageToDoArrayUpdater();
}
function toDoIndexUpdater() {
    toDoIndexNum = 1;
    Array.from($.getElementsByClassName("todo")).forEach((element) => {
        element.firstElementChild.firstElementChild.innerHTML = toDoIndexNum;
        toDoIndexNum++;
    });
}
function toDoIndexHandler() {
    toDoChildCount = toDoContainerElement.childElementCount - 2;
}
function eventListenerDonesUpdater() {
    toDoDoneBox = $.querySelectorAll(".done");
    toDoDoneCircle = $.querySelectorAll(".done-circle");
    toDoDoneIcon = $.querySelectorAll(".done-icon");
    Array.from(toDoDoneBox).forEach((element) => {
        element.addEventListener("mousedown", doneMouseDownHandler);
    });
    Array.from(toDoDoneCircle).forEach((element) => {
        element.addEventListener("mousedown", doneCircleMouseDownHandler);
    });
    Array.from(toDoDoneIcon).forEach((element) => {
        element.addEventListener("mousedown", doneIconleMouseDownHandler);
    });
}
eventListenerDonesUpdater();
function doneItemsRemoveAddEventListenersHandler() {
    [...toDoDoneBox].forEach((elem) => {
        elem.removeEventListener("mousedown", doneMouseDownHandler);
    });
    [...toDoDoneCircle].forEach((elem) => {
        elem.removeEventListener("mousedown", doneCircleMouseDownHandler);
    });
    [...toDoDoneIcon].forEach((elem) => {
        elem.removeEventListener("mousedown", doneIconleMouseDownHandler);
    });
    setTimeout(() => {
        [...toDoDoneBox].forEach((elem) => {
            elem.addEventListener("mousedown", doneMouseDownHandler);
        });
        [...toDoDoneCircle].forEach((elem) => {
            elem.addEventListener("mousedown", doneCircleMouseDownHandler);
        });
        [...toDoDoneIcon].forEach((elem) => {
            elem.addEventListener("mousedown", doneIconleMouseDownHandler);
        });
    }, 305);
}
function todoArrayStatusUpdate(toDOIndex, toDoStatus) {
    let todoIndex = toDOIndex.innerHTML - 1;
    todosArr[todoIndex].isToDoDone = toDoStatus;
    localStorageToDoArrayUpdater();
}
function doneIconleMouseDownHandler() {
    doneItemsRemoveAddEventListenersHandler();
    if (this.parentElement.getAttribute("id") === "todo-done") {
        this.parentElement.style.animation =
            "doneAnimToRight .3s ease-in-out forwards";
        setTimeout(() => {
            todoArrayStatusUpdate(
                this.parentElement.parentElement.previousElementSibling
                    .previousElementSibling.firstElementChild,
                true
            );
            this.parentElement.parentElement.style.backgroundColor = "#00DFA2";
            this.style.color = "#00DFA2";
            this.parentElement.parentElement.previousElementSibling.previousElementSibling.children[0].style.color =
                "#00DFA2";
            this.parentElement.parentElement.previousElementSibling.children[0].style.backgroundColor =
                "#00DFA2";
            this.parentElement.removeAttribute("id");
        }, 300);
    } else {
        this.parentElement.style.animation =
            "doneAnimToLeft .3s ease-in-out forwards";
        setTimeout(() => {
            todoArrayStatusUpdate(
                this.parentElement.parentElement.previousElementSibling
                    .previousElementSibling.firstElementChild,
                false
            );
            this.parentElement.parentElement.style.backgroundColor = "#fc3a52";
            this.style.color = "#fc3a52";
            this.parentElement.parentElement.previousElementSibling.previousElementSibling.children[0].style.color =
                "#fc3a52";
            this.parentElement.parentElement.previousElementSibling.children[0].style.backgroundColor =
                "#fc3a52";
            this.parentElement.setAttribute("id", "todo-done");
        }, 300);
    }
    this.style.animation = "doneIconScale .3s ease";
    setTimeout(() => {
        this.style.animation = null;
    }, 300);
    setTimeout(() => {
        if (this.innerHTML === "done") {
            this.innerHTML = "close";
        } else {
            this.innerHTML = "done";
        }
    }, 150);
}
function doneCircleMouseDownHandler() {
    doneItemsRemoveAddEventListenersHandler();
    if (this.getAttribute("id") === "todo-done") {
        this.style.animation = "doneAnimToRight .3s ease-in-out forwards";
        setTimeout(() => {
            todoArrayStatusUpdate(
                this.parentElement.previousElementSibling.previousElementSibling
                    .firstElementChild,
                true
            );
            this.parentElement.style.backgroundColor = "#00DFA2";
            this.children[0].style.color = "#00DFA2";
            this.parentElement.previousElementSibling.previousElementSibling.children[0].style.color =
                "#00DFA2";
            this.parentElement.previousElementSibling.children[0].style.backgroundColor =
                "#00DFA2";
            this.removeAttribute("id");
        }, 300);
    } else {
        this.style.animation = "doneAnimToLeft .3s ease-in-out forwards";
        setTimeout(() => {
            todoArrayStatusUpdate(
                this.parentElement.previousElementSibling.previousElementSibling
                    .firstElementChild,
                false
            );
            this.parentElement.style.backgroundColor = "#fc3a52";
            this.children[0].style.color = "#fc3a52";
            this.parentElement.previousElementSibling.previousElementSibling.children[0].style.color =
                "#fc3a52";
            this.parentElement.previousElementSibling.children[0].style.backgroundColor =
                "#fc3a52";
            this.setAttribute("id", "todo-done");
        }, 300);
    }
    this.children[0].style.animation = "doneIconScale .3s ease";
    setTimeout(() => {
        this.children[0].style.animation = null;
    }, 300);
    setTimeout(() => {
        if (this.children[0].innerHTML === "done") {
            this.children[0].innerHTML = "close";
        } else {
            this.children[0].innerHTML = "done";
        }
    }, 150);
}
function doneMouseDownHandler() {
    doneItemsRemoveAddEventListenersHandler();
    if (this.children[0].getAttribute("id") === "todo-done") {
        this.children[0].style.animation =
            "doneAnimToRight .3s ease-in-out forwards";
        setTimeout(() => {
            todoArrayStatusUpdate(
                this.previousElementSibling.previousElementSibling
                    .firstElementChild,
                true
            );
            this.style.backgroundColor = "#00DFA2";
            this.children[0].children[0].style.color = "#00DFA2";
            this.previousElementSibling.previousElementSibling.children[0].style.color =
                "#00DFA2";
            this.previousElementSibling.children[0].style.backgroundColor =
                "#00DFA2";
            this.children[0].removeAttribute("id");
        }, 300);
    } else {
        this.children[0].style.animation =
            "doneAnimToLeft .3s ease-in-out forwards";
        setTimeout(() => {
            todoArrayStatusUpdate(
                this.previousElementSibling.previousElementSibling
                    .firstElementChild,
                false
            );
            this.style.backgroundColor = "#fc3a52";
            this.children[0].children[0].style.color = "#fc3a52";
            this.previousElementSibling.previousElementSibling.children[0].style.color =
                "#fc3a52";
            this.previousElementSibling.children[0].style.backgroundColor =
                "#fc3a52";
            this.children[0].setAttribute("id", "todo-done");
        }, 300);
    }
    this.children[0].children[0].style.animation = "doneIconScale .3s ease";
    setTimeout(() => {
        this.children[0].children[0].style.animation = null;
    }, 300);
    setTimeout(() => {
        if (this.children[0].children[0].innerHTML === "done") {
            this.children[0].children[0].innerHTML = "close";
        } else {
            this.children[0].children[0].innerHTML = "done";
        }
    }, 150);
}
const toDoInputElems = $.querySelectorAll(".todo-input-boxes");
Array.from(toDoInputElems).forEach((element) => {
    element.addEventListener("input", inputSizeController);
});
let textAreaHeight = 4;
let lettersHeightCount = 0;
function inputSizeController(event) {
    if (event.target.value.length <= 34) {
        event.target.style.width = event.target.value.length + 6 + "ch";
        if (event.target.value.length === 0) {
            event.target.style.width = "17ch";
        }
    }
    if (event.target.id === "todo-detail-text-area") {
        lettersHeightCount = Math.floor(event.target.value.length / 36);
        textAreaHeight = lettersHeightCount * 2 + 6;
        if (event.target.value.length <= 36) {
            event.target.style.height = "4ch";
            event.target.style.animation = null;
        }
        if (
            event.target.value.length % 36 === 0 &&
            event.target.value.length !== 0
        ) {
            event.target.style.animation = "borderAnim .2s ease-out forwards";
            event.target.style.height = textAreaHeight + "ch";
        }
    }
}

window.onload = () => {
    if (
        localStorage.getItem("usertodos") !== null &&
        JSON.parse(localStorage.getItem("usertodos")).length >= 1
    ) {
        todosArr = JSON.parse(localStorage.getItem("usertodos"));
        $.getElementById("h1-title").innerHTML = "YOUR TODOS";
        todosArr.forEach((todo) => {
            toDoGenerator(
                todo.toDoIndex,
                todo.toDoSubject,
                todo.toDoDetail,
                todo.isToDoDone
            );
        });
        deleteEventListenerUpdater();
        eventListenerDonesUpdater();
    }
};
