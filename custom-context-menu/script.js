const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const contextMenuContainerUl = document.querySelector(".context-menu");
let contextMenuWidth = contextMenuContainerUl.offsetWidth;
let contextMenuHeight = contextMenuContainerUl.offsetHeight;
document.body.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    contextMenuVisibilityHandler();
    contextMenuWidthUpdater();
    contextMenuHeightUpdater();
    contextMenuPositionHandler(event);
});
document.body.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        contextMenuHiddenityHandler();
    }
});
Array.from(contextMenuContainerUl.children).forEach((element) => {
    element.addEventListener("click", contextMenuHiddenityHandler);
});
document.body.addEventListener("click", contextMenuHiddenityHandler);
function contextMenuHiddenityHandler() {
    contextMenuContainerUl.style.display = "none";
    contextMenuContainerUl.style.animation = "hiddenOpacity .15s forwards";
    setTimeout(() => {
        contextMenuContainerUl.style.animation = null;
    }, 150);
}
function contextMenuVisibilityHandler() {
    contextMenuContainerUl.style.display = "inline-block";
    contextMenuContainerUl.style.animation = "visibleOpacity .15s backwards";
    setTimeout(() => {
        contextMenuContainerUl.style.animation = null;
    }, 150);
}
function contextMenuPositionHandler(event) {
    if (isNeedChangeTopHandler(event) || isNeedChangeLeftHandler(event)) {
        if (isNeedChangeTopHandler(event) && isNeedChangeLeftHandler(event)) {
            finalTopPosition(event);
            finalLeftPosition(event);
        } else if (isNeedChangeTopHandler(event)) {
            finalTopPosition(event);
            contextMenuContainerUl.style.left = calcLeft(event) + "px";
        } else {
            finalLeftPosition(event);
            contextMenuContainerUl.style.top = calcTop(event) + "px";
        }
    } else {
        contextMenuContainerUl.style.top = calcTop(event) + "px";
        contextMenuContainerUl.style.left = calcLeft(event) + "px";
    }
}
function calcLeft(event) {
    return event.pageX;
}
function calcTop(event) {
    return event.pageY;
}
function calcHeightMinusTop(event) {
    return windowHeight - event.pageY;
}
function calcWidthMinusLeft(event) {
    return windowWidth - event.pageX;
}
function isNeedChangeTopHandler(event) {
    if (calcHeightMinusTop(event) < contextMenuHeight) {
        return true;
    } else {
        return false;
    }
}
function isNeedChangeLeftHandler(event) {
    if (calcWidthMinusLeft(event) < contextMenuWidth) {
        return true;
    } else {
        return false;
    }
}
function calcLeftChanging(event) {
    return contextMenuWidth - calcWidthMinusLeft(event);
}
function calcTopChanging(event) {
    return contextMenuHeight - calcHeightMinusTop(event);
}
function finalTopPosition(event) {
    contextMenuContainerUl.style.top =
        calcTop(event) -
        calcTopChanging(event) -
        calcHeightMinusTop(event) +
        "px";
}
function finalLeftPosition(event) {
    contextMenuContainerUl.style.left =
        calcLeft(event) -
        calcLeftChanging(event) -
        calcWidthMinusLeft(event) +
        "px";
}
function contextMenuWidthUpdater() {
    contextMenuWidth = contextMenuContainerUl.offsetWidth;
}
function contextMenuHeightUpdater() {
    contextMenuHeight = contextMenuContainerUl.offsetHeight;
}
