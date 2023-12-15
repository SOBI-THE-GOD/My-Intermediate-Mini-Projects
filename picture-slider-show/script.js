const imgNamesArr = [
    "9nzly4v0hfk61.png",
    "5456FE7F-CE12-4761-9E8F-34030627DEA9.jpg",
    "648692.jpg",
    "1330235.png",
    "n3nhi48p8yp81.jpg",
    "wallhaven-9mjoy1.png",
];
const sliderContainerElem = document.querySelector(".slider-show-container");
const selectionSlideCircleElemContainer = document.querySelector(
    ".selecetion-buttons-container"
);
const toLeftButtonElem = document.querySelector(".left-button");
const toRightButtonElem = document.querySelector(".right-button");
const sliderShowWrapperElem = document.querySelector(".slider-show-wrapper");
let currentSlideNumb = 1;
let slideWidth;
let sliderPosition = 0;
let currentSliderSelectionButtonIndex = 0;
let silderShowInterval;
function createSlideElems(imgNamesArr) {
    let newElem;
    let newSelectionSlideCircleElem;
    imgNamesArr.forEach((elem, index) => {
        newElem = document.createElement("div");
        newElem.style.cssText = `height : 100vh;
        width : 100vw;
        background-image : url(images/${elem});
        background-size : cover;`;
        newElem.dataset.slideNumb = index;
        sliderContainerElem.append(newElem);
        newSelectionSlideCircleElem = document.createElement("span");
        newSelectionSlideCircleElem.setAttribute("id", `slide-${index + 1}`);
        newSelectionSlideCircleElem.style.cssText = `width : 2.2rem;
        height : 2.2rem;
        border-radius: 100rem ;
        background-color : #ffffff;
        transition: width .9s ease;`;
        newSelectionSlideCircleElem.dataset.slideNumb = index;
        if (index === 0) {
            newSelectionSlideCircleElem.style.width = "4.2rem";
        }
        newSelectionSlideCircleElem.addEventListener("click", (e) => {
            sildesWidthUpdater();
            selectionSlideCircleElemContainer.children[
                currentSliderSelectionButtonIndex
            ].style.width = "2.2rem";
            currentSlideNumb = +e.target.dataset.slideNumb;
            currentSliderSelectionButtonIndex = +e.target.dataset.slideNumb;
            selectionSlideCircleElemContainer.children[
                currentSliderSelectionButtonIndex
            ].style.width = "4.2rem";
            clearInterval(silderShowInterval);
            silderShowInterval = setInterval(() => {
                widthAndPositionCalculator();
                if (currentSlideNumb === imgNamesArr.length - 1) {
                    setTimeout(() => {
                        currentSlideNumb = 0;
                    }, 6000);
                }
            }, 6000);
            sliderPosition = -(slideWidth * currentSlideNumb);
            sliderShowWrapperElem.style.left = sliderPosition + "px";
        });
        selectionSlideCircleElemContainer.append(newSelectionSlideCircleElem);
    });
}
function widthAndPositionCalculator() {
    sildesWidthUpdater();
    sliderSelectionButtonsStyleHandler();
    sliderPosition = -(slideWidth * currentSlideNumb);
    if (currentSlideNumb !== 5) {
        currentSlideNumb++;
    }
    sliderShowWrapperElem.style.left = sliderPosition + "px";
}
function autoSlideChanger() {
    silderShowInterval = setInterval(() => {
        widthAndPositionCalculator();
        if (currentSlideNumb === imgNamesArr.length - 1) {
            setTimeout(() => {
                currentSlideNumb = 0;
            }, 6000);
        }
    }, 6000);
}
function sliderSelectionButtonsStyleHandler() {
    selectionSlideCircleElemContainer.children[
        currentSliderSelectionButtonIndex
    ].style.width = "2.2rem";
    currentSliderSelectionButtonIndex = Array.from(
        selectionSlideCircleElemContainer.children
    ).findIndex((elem) => {
        return +elem.dataset.slideNumb === currentSlideNumb;
    });
    selectionSlideCircleElemContainer.children[
        currentSliderSelectionButtonIndex
    ].style.width = "4.2rem";
}
function sildesWidthUpdater() {
    slideWidth = sliderContainerElem.children[0].offsetWidth;
}
toLeftButtonElem.addEventListener("click", () => {
    sildesWidthUpdater();
    selectionSlideCircleElemContainer.children[
        currentSliderSelectionButtonIndex
    ].style.width = "2.2rem";
    if (currentSlideNumb - 1 === 0 && currentSliderSelectionButtonIndex === 0) {
        sliderPosition = -((imgNamesArr.length - 1) * slideWidth);
        currentSlideNumb = 5;
        currentSliderSelectionButtonIndex = 5;
    } else if (currentSlideNumb === 0) {
        sliderPosition = -((imgNamesArr.length - 1) * slideWidth);
        currentSlideNumb = 5;
        currentSliderSelectionButtonIndex = 5;
    } else {
        sliderPosition += slideWidth;
        currentSlideNumb--;
        currentSliderSelectionButtonIndex--;
    }
    selectionSlideCircleElemContainer.children[
        currentSliderSelectionButtonIndex
    ].style.width = "4.2rem";
    clearInterval(silderShowInterval);
    silderShowInterval = setInterval(() => {
        widthAndPositionCalculator();
        if (currentSlideNumb === imgNamesArr.length - 1) {
            setTimeout(() => {
                currentSlideNumb = 0;
            }, 6000);
        }
    }, 6000);
    sliderShowWrapperElem.style.left = sliderPosition + "px";
});
toRightButtonElem.addEventListener("click", () => {
    sildesWidthUpdater();
    selectionSlideCircleElemContainer.children[
        currentSliderSelectionButtonIndex
    ].style.width = "2.2rem";
    if (
        currentSlideNumb === imgNamesArr.length - 1 &&
        currentSliderSelectionButtonIndex === imgNamesArr.length - 1
    ) {
        sliderPosition = 0;
        currentSlideNumb = 0;
        currentSliderSelectionButtonIndex = 0;
    } else {
        sliderPosition -= slideWidth;
        if (currentSlideNumb !== imgNamesArr.length - 1) {
            currentSlideNumb++;
        }
        currentSliderSelectionButtonIndex++;
    }
    selectionSlideCircleElemContainer.children[
        currentSliderSelectionButtonIndex
    ].style.width = "4.2rem";
    clearInterval(silderShowInterval);
    silderShowInterval = setInterval(() => {
        widthAndPositionCalculator();
        if (currentSlideNumb === imgNamesArr.length - 1) {
            setTimeout(() => {
                currentSlideNumb = 0;
            }, 6000);
        }
    }, 6000);
    sliderShowWrapperElem.style.left = sliderPosition + "px";
});
createSlideElems(imgNamesArr);
autoSlideChanger();
sildesWidthUpdater();
