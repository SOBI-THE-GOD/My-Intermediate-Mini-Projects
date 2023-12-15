const imgNamesArr = [
    "9nzly4v0hfk61.png",
    "5456FE7F-CE12-4761-9E8F-34030627DEA9.jpg",
    "648692.jpg",
    "1330235.png",
    "n3nhi48p8yp81.jpg",
    "wallhaven-9mjoy1.png",
];
const sliderContainerElem = document.querySelector(".slider-show-container");
const slideSelectionButtonsContainer = document.querySelector(
    ".selecetion-buttons-container"
);
let slideWidth = 0;
let silderOutoChangeTimeOut = 0;
let currentSlideIndex = 0;
let lastSelectedSlideIndex = 0;
const toLeftButtonElem = document.querySelector(".left-button");
const toRightButtonElem = document.querySelector(".right-button");
const sliderShowWrapperElem = document.querySelector(".slider-show-wrapper");
function createSlideElems(imgNamesArr) {
    let newElem;
    let newSelectionSlideButtonElem;
    imgNamesArr.forEach((elem, index) => {
        newElem = document.createElement("div");
        newElem.style.cssText = `height : 100vh;
        width : 100vw;
        background-image : url(images/${elem});
        background-size : cover;
        background-position : center;`;
        newElem.dataset.slideNumb = index;
        sliderContainerElem.append(newElem);
        newSelectionSlideButtonElem = document.createElement("span");
        newSelectionSlideButtonElem.style.cssText = `width : 2.2rem;
        height : 2.2rem;
        border-radius: 100rem ;
        background-color : #ffffff;
        transition: width .9s ease;`;
        newSelectionSlideButtonElem.dataset.slideNumb = index;
        if (index === 0) {
            newSelectionSlideButtonElem.style.width = "4.2rem";
        }
        newSelectionSlideButtonElem.addEventListener(
            "click",
            slideSelectionButtonsClickHandler
        );
        slideSelectionButtonsContainer.append(newSelectionSlideButtonElem);
    });
    autoChangeSlideHandler();
}
toLeftButtonElem.addEventListener("click", changingSlideTowardLeft);
toRightButtonElem.addEventListener("click", changingSlideTowardRIght);
function slideWidthUpdater() {
    slideWidth = sliderContainerElem.firstElementChild.offsetWidth;
}
function autoChangeSlideHandler() {
    silderOutoChangeTimeOut = setTimeout(() => {
        lastSelectedSlideIndex = currentSlideIndex;
        unselectSlideSelectionButtonStyleHandler(lastSelectedSlideIndex);
        if (lastSelectedSlideIndex !== imgNamesArr.length - 1) {
            currentSlideIndex++;
        } else if (lastSelectedSlideIndex === imgNamesArr.length - 1) {
            currentSlideIndex = 0;
        }
        selectSlideSelectionButtonStyleHandler(currentSlideIndex);
        sliderShowWrapperElem.style.left =
            sliderContainerPositionCalcuator() + "px";
        autoChangeSlideHandler();
    }, 6000);
}
function unselectSlideSelectionButtonStyleHandler(slideIndex) {
    slideSelectionButtonsContainer.children[slideIndex].style.width = "2.2rem";
}
function selectSlideSelectionButtonStyleHandler(slideIndex) {
    slideSelectionButtonsContainer.children[slideIndex].style.width = "4.2rem";
}
function sliderContainerPositionCalcuator() {
    slideWidthUpdater();
    return -(slideWidth * currentSlideIndex);
}
function slideSelectionButtonsClickHandler(e) {
    lastSelectedSlideIndex = currentSlideIndex;
    currentSlideIndex = +e.target.dataset.slideNumb;
    unselectSlideSelectionButtonStyleHandler(lastSelectedSlideIndex);
    selectSlideSelectionButtonStyleHandler(currentSlideIndex);
    sliderShowWrapperElem.style.left =
        sliderContainerPositionCalcuator() + "px";
    clearTimeout(silderOutoChangeTimeOut);
    autoChangeSlideHandler();
}
function changingSlideTowardRIght(e) {
    slideWidthUpdater();
    lastSelectedSlideIndex = currentSlideIndex;
    unselectSlideSelectionButtonStyleHandler(lastSelectedSlideIndex);
    if (lastSelectedSlideIndex !== imgNamesArr.length - 1) {
        currentSlideIndex++;
    } else if (lastSelectedSlideIndex === imgNamesArr.length - 1) {
        currentSlideIndex = 0;
    }
    sliderShowWrapperElem.style.left =
        sliderContainerPositionCalcuator() + "px";
    selectSlideSelectionButtonStyleHandler(currentSlideIndex);
    clearTimeout(silderOutoChangeTimeOut);
    autoChangeSlideHandler();
}
function changingSlideTowardLeft(e) {
    slideWidthUpdater();
    lastSelectedSlideIndex = currentSlideIndex;
    unselectSlideSelectionButtonStyleHandler(lastSelectedSlideIndex);
    if (lastSelectedSlideIndex !== 0) {
        currentSlideIndex--;
    } else if (lastSelectedSlideIndex === 0) {
        currentSlideIndex = imgNamesArr.length - 1;
    }
    sliderShowWrapperElem.style.left =
        sliderContainerPositionCalcuator() + "px";
    selectSlideSelectionButtonStyleHandler(currentSlideIndex);
    clearTimeout(silderOutoChangeTimeOut);
    autoChangeSlideHandler();
}
createSlideElems(imgNamesArr);
