const $ = document;
const colorsArr = {
    green: {
        mainColor: "#37ff9b",
        lightColor: "#6affb5",
        superLightColor: "#d0ffe8",
    },
    orange: {
        mainColor: "#ffa637",
        lightColor: "#ffbd6a",
        superLightColor: "#ffead0",
    },
    purple: {
        mainColor: "#e037ff",
        lightColor: "#e86aff",
        superLightColor: "#f8d0ff",
    },
    blue: {
        mainColor: "#37beff",
        lightColor: "#6acfff",
        superLightColor: "#d0f0ff",
    },
    yellow: {
        mainColor: "#f3ff37",
        lightColor: "#f6ff6a",
        superLightColor: "#fcffd0",
    },
};
let isEditingThemeOpen = false;
const editIcon = $.querySelector(".edit-icon");
const editButtonContainer = $.querySelector(".edit-theme-button");
const editColorButtons = Array.from(
    $.querySelectorAll(".theme-colors-buttons")
);
const choosenTheme = localStorage.getItem("theme");
if (choosenTheme) {
    $.documentElement.style.setProperty(
        "--main-color",
        colorsArr[choosenTheme].mainColor
    );
    $.documentElement.style.setProperty(
        "--light-color",
        colorsArr[choosenTheme].lightColor
    );
    $.documentElement.style.setProperty(
        "--super-light-color",
        colorsArr[choosenTheme].superLightColor
    );
}
editButtonContainer.addEventListener("click", mainButtonAnimationHandler);
function mainButtonAnimationHandler() {
    editButtonContainer.removeEventListener(
        "click",
        mainButtonAnimationHandler
    );
    if (!isEditingThemeOpen) {
        isEditingThemeOpen = true;
        let mainColorTheme = window
            .getComputedStyle(document.documentElement)
            .getPropertyValue("--main-color");
        editColorButtons.forEach((element, index) => {
            switch (index) {
                case 0:
                    element.style.animation = "firstColorPopUpAnm .4s forwards";
                    element.dataset.color = "orange";
                    break;
                case 1:
                    element.style.animation =
                        "secondColorPopUpAnm .55s forwards";
                    element.dataset.color = "green";
                    break;
                case 2:
                    element.style.animation = "thirdColorPopUpAnm .7s forwards";
                    element.dataset.color = "blue";
                    break;
                case 3:
                    element.style.animation =
                        "fourthColorPopUpAnm .85s forwards";
                    element.dataset.color = "purple";
                    break;
                case 4:
                    element.style.animation = "fifthColorPopUpAnm 1s forwards";
                    element.dataset.color = "yellow";
                    break;
            }
            element.addEventListener("click", changingThemeHandler);
        });
        editColorButtons.forEach((element) => {
            if (mainColorTheme === colorsArr[element.dataset.color].mainColor) {
                element.style.backgroundColor = mainColorTheme;
            }
        });
    } else {
        isEditingThemeOpen = false;
        editColorButtons.forEach((element, index) => {
            switch (index) {
                case 0:
                    element.style.animation = "firstColorPopOffAnm 1s forwards";
                    break;
                case 1:
                    element.style.animation =
                        "secondColorPopOffAnm .85s forwards";
                    break;
                case 2:
                    element.style.animation =
                        "thirdColorPopOffAnm .7s forwards";
                    break;
                case 3:
                    element.style.animation =
                        "fourthColorPopOffAnm .55s forwards";
                    break;
                case 4:
                    element.style.animation =
                        "fifthColorPopOffAnm .4s forwards";
                    break;
            }
            element.addEventListener("click", changingThemeHandler);
        });
    }
    editButtonContainer.style.animation = "editButtonScaleAnm 1s forwards";
    editIcon.style.animation = "editIconAnm 1s forwards";
    setTimeout(() => {
        editButtonContainer.style.animation = null;
        editIcon.style.animation = null;
        editButtonContainer.addEventListener(
            "click",
            mainButtonAnimationHandler
        );
    }, 1000);
    setTimeout(() => {
        if (editIcon.classList.contains("fa-pen")) {
            editIcon.classList.remove("fa-pen");
            editIcon.classList.add("fa-check");
        } else {
            editIcon.classList.remove("fa-check");
            editIcon.classList.add("fa-pen");
        }
    }, 500);
}
function changingThemeHandler(e) {
    let lastSuperLightColorTheme = window
        .getComputedStyle($.documentElement)
        .getPropertyValue("--super-light-color");
    editColorButtons.forEach((elem) => {
        if (
            colorsArr[elem.dataset.color].superLightColor ===
            lastSuperLightColorTheme
        ) {
            elem.style.backgroundColor = lastSuperLightColorTheme;
        }
    });
    let choosenColor = e.target.dataset.color;
    let mainColor = colorsArr[choosenColor].mainColor;
    let lightColor = colorsArr[choosenColor].lightColor;
    let superLightColor = colorsArr[choosenColor].superLightColor;
    e.target.style.backgroundColor = mainColor;
    changingElementsColorHandler(mainColor, lightColor, superLightColor);
    localStorage.setItem("theme", choosenColor);
}
function changingElementsColorHandler(mainColor, lightColor, superLightColor) {
    $.documentElement.style.setProperty("--main-color", mainColor);
    $.documentElement.style.setProperty("--light-color", lightColor);
    $.documentElement.style.setProperty("--super-light-color", superLightColor);
}
