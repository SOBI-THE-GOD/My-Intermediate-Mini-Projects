const inputElem = document.getElementById("input");
let inputElemLength = 19;
let isWritable = true;
inputElem.addEventListener("input", (e) => {
    calcInputLength(e);
    innerHTMLLengthUpdater();
    inputStylesHandler();
    inputMaxLengthHandler(e);
});
function calcInputLength(e) {
    inputElemLength = 19 - e.target.value.length;
}
function innerHTMLLengthUpdater() {
    document.getElementById("input-length").innerHTML = inputElemLength;
}
function inputStylesHandler() {
    const inputWrapperChilds = Array.from(
        document.querySelector(".wrapper").children
    );
    inputWrapperChilds.shift();
    if (inputElemLength < 19) {
        inputWrapperChilds.forEach((elem) => {
            if (elem === inputWrapperChilds[1]) {
                elem.style.backgroundColor = "var(--background-color)";
            } else {
                elem.style.color = "var(--background-color)";
            }
        });
    } else {
        inputWrapperChilds.forEach((elem) => {
            if (elem === inputWrapperChilds[1]) {
                elem.style.backgroundColor = "var(--text-color)";
            } else {
                elem.style.color = "var(--text-color)";
            }
        });
    }
}
function inputMaxLengthHandler(e) {
    if (inputElemLength < 1) {
        isWritable = false;
        e.target.addEventListener("keypress", eventPreventer);
    } else {
        isWritable = true;
        e.target.removeEventListener("keypress", eventPreventer);
    }
}
function eventPreventer(e) {
    e.preventDefault();
}
