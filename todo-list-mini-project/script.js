const $ = document;
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
            let toDoDiv = $.createElement("div");
            toDoDiv.classList.add("todo");
            let toDoIndexSpan = $.createElement("span");
            toDoIndexSpan.classList.add("todo-element", "todo-index");
            toDoDiv.append(toDoIndexSpan);
            let toDoIndexChildSpan = $.createElement("span");
            toDoIndexChildSpan.classList.add("todo-index-circle");
            toDoIndexSpan.append(toDoIndexChildSpan);
            let toDoDescribeSpan = $.createElement("span");
            toDoDescribeSpan.classList.add(
                "todo-element",
                "todo-describe-container"
            );
            toDoDiv.append(toDoDescribeSpan);
            let toDoDetails = $.createElement("details");
            toDoDetails.classList.add("todo-describe");
            toDoDescribeSpan.append(toDoDetails);
            let toDoSummaryElem = $.createElement("summary");
            toDoDetails.append(toDoSummaryElem);
            let toDoDetailParagraph = $.createElement("p");
            toDoDetails.append(toDoDetailParagraph);
            let toDoDoneSpanElem = $.createElement("span");
            toDoDoneSpanElem.classList.add("todo-element", "done");
            toDoDiv.append(toDoDoneSpanElem);
            let toDoDoneCircleDiv = $.createElement("div");
            toDoDoneCircleDiv.classList.add("done-circle");
            toDoDoneCircleDiv.setAttribute("id", "todo-done");
            toDoDoneSpanElem.append(toDoDoneCircleDiv);
            let toDoIconSpan = $.createElement("span");
            toDoIconSpan.classList.add(
                "material-symbols-outlined",
                "done-icon"
            );
            toDoIconSpan.innerHTML = "close";
            toDoDoneCircleDiv.append(toDoIconSpan);
            let toDoDeleteSpan = $.createElement("span");
            toDoDeleteSpan.classList.add("todo-element", "delete-todo");
            toDoDiv.append(toDoDeleteSpan);
            let toDoDeleteContainerSpan = $.createElement("span");
            toDoDeleteContainerSpan.classList.add("delete-container");
            toDoDeleteSpan.append(toDoDeleteContainerSpan);
            let toDoDeleteIconSpan = $.createElement("span");
            toDoDeleteIconSpan.classList.add(
                "material-symbols-outlined",
                "delete-icon"
            );
            toDoDeleteIconSpan.innerHTML = "delete";
            toDoDeleteContainerSpan.append(toDoDeleteIconSpan);
            toDoSummaryElem.innerHTML =
                event.target.previousElementSibling.previousElementSibling.value.trim();
            toDoDetailParagraph.innerHTML =
                event.target.previousElementSibling.value.trim();
            toDoIndexUpdater();
            toDoIndexChildSpan.innerHTML = toDoIndexNum;
            $.querySelector(".todo-container").append(toDoDiv);
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
function deleteToDoHandler(event) {
    event.target.parentElement.parentElement.parentElement.style.animation =
        "deleteOpacityAnim .3s ease-in-out";
    setTimeout(() => {
        event.target.parentElement.parentElement.parentElement.remove();
        toDoIndexHandler();
        toDoIndexUpdater();
        if ($.querySelector(".todo-container").childElementCount <= 2) {
            $.getElementById("h1-title").innerHTML = "ADD NEW TODO";
        } else {
            $.getElementById("h1-title").innerHTML = "YOUR TODOS";
        }
    }, 300);
}
function toDoIndexUpdater() {
    toDoIndexNum = 1;
    Array.from($.getElementsByClassName("todo")).forEach((element) => {
        element.firstElementChild.firstElementChild.innerHTML = toDoIndexNum;
        toDoIndexNum++;
    });
}
function toDoIndexHandler() {
    toDoChildCount = $.querySelector(".todo-container").childElementCount - 2;
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
    }, 405);
}
function doneIconleMouseDownHandler() {
    this.style.animation = "doneAnim .4s linear";
    doneItemsRemoveAddEventListenersHandler();
    if (this.parentElement.getAttribute("id") === "todo-done") {
        this.parentElement.style.animation =
            "doneAnimToRight .4s linear forwards";
        setTimeout(() => {
            this.parentElement.parentElement.style.backgroundColor = "#00DFA2";
            this.style.color = "#00DFA2";
            this.parentElement.parentElement.previousElementSibling.previousElementSibling.children[0].style.color =
                "#00DFA2";
            this.parentElement.parentElement.previousElementSibling.children[0].style.backgroundColor =
                "#00DFA2";
            this.parentElement.removeAttribute("id");
            this.style.animation = null;
        }, 400);
    } else {
        this.parentElement.style.animation =
            "doneAnimToLeft .4s linear forwards";
        setTimeout(() => {
            this.parentElement.parentElement.style.backgroundColor = "#fc3a52";
            this.style.color = "#fc3a52";
            this.parentElement.parentElement.previousElementSibling.previousElementSibling.children[0].style.color =
                "#fc3a52";
            this.parentElement.parentElement.previousElementSibling.children[0].style.backgroundColor =
                "#fc3a52";
            this.parentElement.setAttribute("id", "todo-done");
            this.style.animation = null;
        }, 400);
    }
    if (this.innerHTML === "done") {
        this.innerHTML = "close";
    } else {
        this.innerHTML = "done";
    }
}
function doneCircleMouseDownHandler() {
    this.children[0].style.animation = "doneAnim .4s linear";
    doneItemsRemoveAddEventListenersHandler();
    if (this.getAttribute("id") === "todo-done") {
        this.style.animation = "doneAnimToRight .4s linear forwards";
        setTimeout(() => {
            this.parentElement.style.backgroundColor = "#00DFA2";
            this.children[0].style.color = "#00DFA2";
            this.parentElement.previousElementSibling.previousElementSibling.children[0].style.color =
                "#00DFA2";
            this.parentElement.previousElementSibling.children[0].style.backgroundColor =
                "#00DFA2";
            this.removeAttribute("id");
            this.children[0].style.animation = null;
        }, 400);
    } else {
        this.style.animation = "doneAnimToLeft .4s linear forwards";
        setTimeout(() => {
            this.parentElement.style.backgroundColor = "#fc3a52";
            this.children[0].style.color = "#fc3a52";
            this.parentElement.previousElementSibling.previousElementSibling.children[0].style.color =
                "#fc3a52";
            this.parentElement.previousElementSibling.children[0].style.backgroundColor =
                "#fc3a52";
            this.setAttribute("id", "todo-done");
            this.children[0].style.animation = null;
        }, 400);
    }
    if (this.children[0].innerHTML === "done") {
        this.children[0].innerHTML = "close";
    } else {
        this.children[0].innerHTML = "done";
    }
}
function doneMouseDownHandler() {
    this.children[0].children[0].style.animation = "doneAnim .4s linear";
    doneItemsRemoveAddEventListenersHandler();
    if (this.children[0].getAttribute("id") === "todo-done") {
        this.children[0].style.animation =
            "doneAnimToRight .4s linear forwards";
        setTimeout(() => {
            this.style.backgroundColor = "#00DFA2";
            this.children[0].children[0].style.color = "#00DFA2";
            this.previousElementSibling.previousElementSibling.children[0].style.color =
                "#00DFA2";
            this.previousElementSibling.children[0].style.backgroundColor =
                "#00DFA2";
            this.children[0].removeAttribute("id");
            this.children[0].children[0].style.animation = null;
        }, 400);
    } else {
        this.children[0].style.animation = "doneAnimToLeft .4s linear forwards";
        setTimeout(() => {
            this.style.backgroundColor = "#fc3a52";
            this.children[0].children[0].style.color = "#fc3a52";
            this.previousElementSibling.previousElementSibling.children[0].style.color =
                "#fc3a52";
            this.previousElementSibling.children[0].style.backgroundColor =
                "#fc3a52";
            this.children[0].setAttribute("id", "todo-done");
            this.children[0].children[0].style.animation = null;
        }, 400);
    }
    if (this.children[0].children[0].innerHTML === "done") {
        this.children[0].children[0].innerHTML = "close";
    } else {
        this.children[0].children[0].innerHTML = "done";
    }
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
