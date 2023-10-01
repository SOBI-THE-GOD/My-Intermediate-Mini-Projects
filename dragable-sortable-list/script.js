const $ = document;
const listContainerElem = $.querySelector(".list-container");
const currectSortArr = [
    "egypt",
    "sassanid",
    "china",
    "rome",
    "japan",
    "viking",
];
const civilizationsArr = [
    { name: "sassanid", flagPicture: "iran.png", number: 1 },
    { name: "egypt", flagPicture: "egypt.png", number: 2 },
    { name: "china", flagPicture: "china.svg.png", number: 3 },
    { name: "rome", flagPicture: "rome.svg.png", number: 4 },
    { name: "japan", flagPicture: "japan.svg.png", number: 5 },
    { name: "viking", flagPicture: "scandinavia.png", number: 6 },
];
let listItemDistantTopParent;
let listItemCurrentSpot;
let hoveredListItemElem;
let draggedListItemElem;
const buttonElem = $.getElementById("button");
const arrangElementsRandomly = (function () {
    civilizationsArr.forEach((elem) => {
        elem.number = Math.random();
    });
    civilizationsArr.sort((a, b) => {
        return a.number - b.number;
    });
})();
civilizationsArr.forEach((elem, index) => {
    const liElem = $.createElement("li");
    liElem.className = "list-item";
    liElem.dataset.name = elem.name;
    liElem.dataset.index = index;
    liElem.draggable = true;
    liElem.innerHTML = `
        <img src="${elem.flagPicture}" class="flag dropable" draggable="false"/>
        <span class="item-name dropable">${elem.name}</span>
        <i class="fa-regular fa-grip-vertical item-icon dropable"></i>
    `;
    listContainerElem.append(liElem);
});
const listItemElem = $.querySelectorAll(".list-item");
const itemIconElems = $.querySelectorAll(".item-icon");
let dragadElemIndex;
//event listeners
listItemElem.forEach((item) => {
    item.addEventListener("dragstart", listItemDragStart);
    item.addEventListener("dragend", listItemDragEnd);
    item.addEventListener("drag", listItemDrag);
    item.addEventListener("dragover", listItemDragOver);
    item.addEventListener("dragleave", listItemDragLeave);
    item.addEventListener("mouseover", listItemOver);
    item.addEventListener("mouseleave", listItemMouseLeave);
});
[...$.querySelectorAll(".dropable")].forEach((item) => {
    item.addEventListener("dragover", (e) => e.preventDefault());
});
buttonElem.addEventListener("mouseup", (e) => {
    const spanElem = $.createElement("span");
    spanElem.classList.add("button-animate");
    spanElem.style.top = e.pageY - buttonElem.offsetTop + "px";
    spanElem.style.left = e.pageX - buttonElem.offsetLeft + "px";
    buttonElem.append(spanElem);
    setTimeout(() => {
        spanElem.remove(spanElem);
    }, 1500);
    sortingValidationHandler();
});
listContainerElem.addEventListener("dragover", (e) => e.preventDefault());
//functions
function sortingValidationHandler() {
    [...listContainerElem.children].forEach((li, index) => {
        if (li.dataset.name === currectSortArr[index]) {
            [...$.querySelector(".sort-index").children][
                index
            ].style.backgroundColor = "#02ec8833";
            li.style.backgroundColor = "#02ec8833";
        } else {
            [...$.querySelector(".sort-index").children][
                index
            ].style.backgroundColor = "#df113733";
            li.style.backgroundColor = "#df113733";
        }
    });
}
function listItemDragStart(e) {
    draggedListItemElem = e.target;
    dragadElemIndex = [...listContainerElem.children].findIndex((elem) => {
        return elem.dataset.name === e.target.dataset.name;
    });
    [...$.querySelectorAll(".index")][dragadElemIndex].classList.add("hover");
    setTimeout(() => {
        e.target.classList.add("dragging");
    }, 0);
}
function listItemDrag(e) {
    if (
        listContainerElem.lastElementChild !== this &&
        e.pageY > this.nextElementSibling.offsetTop + this.offsetHeight / 2
    ) {
        listContainerElem.insertBefore(
            this,
            this.nextElementSibling.nextElementSibling
        );
    } else {
        if (
            e.pageY <
                this.previousElementSibling.offsetTop + this.offsetHeight / 2 &&
            listContainerElem.firstElementChild !== this
        ) {
            listContainerElem.insertBefore(this, this.previousElementSibling);
        }
    }
}
function listItemDragEnd(e) {
    e.target.classList.remove("dragging");
    [...$.querySelectorAll(".index")][dragadElemIndex].classList.remove(
        "hover"
    );
}
function listItemMouseLeave(e) {
    this.classList.remove("hover");
}
function listItemOver(e) {
    this.classList.add("hover");
}
function listItemDragOver(e) {
    e.preventDefault();
    this.classList.add("hover");
}
function listItemDragLeave(e) {
    this.classList.remove("hover");
}
