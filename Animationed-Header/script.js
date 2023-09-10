const imgArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"];
let randomIndex = Math.floor(Math.random() * imgArr.length);
window.onload = () => {
    let randomIndex = Math.floor(Math.random() * imgArr.length);
    let headerElem = document.getElementById("header");
    headerElem.style.backgroundImage = "url(" + imgArr[randomIndex] + ")";
};
//------------------------------
const rotateIconElems = Array.from(document.querySelectorAll(".rotate-icon"));
const headerButtonElem = document.querySelector(".header-button");
const becomeGodMudalElem = document.querySelector(".become-god-mudal");
const productArticlesContainers = Array.from(
    document.querySelectorAll(".product-container")
);
rotateIconElems.forEach((elem) => {
    elem.addEventListener("click", (e) => {
        if (
            e.target.parentElement.parentElement.className ===
            "products-articles flip"
        ) {
            e.target.parentElement.parentElement.classList.remove("flip");
            e.target.parentElement.parentElement.style.animation =
                "rotateFlipYAgain 800ms forwards";
        } else {
            e.target.parentElement.parentElement.classList.add("flip");
            e.target.parentElement.parentElement.style.animation =
                "rotateFlipY 800ms forwards";
        }
    });
});
headerButtonElem.addEventListener("mouseup", () => {
    becomeGodMudalElem.style.scale = "1";
    let containerIndex = 0;
    productArticlesContainers.forEach((elem) => {
        if (containerIndex === 1) {
            elem.style.transitionDelay = ".4s";
        } else if (containerIndex === 2) {
            elem.style.transitionDelay = ".5s";
        }
        elem.style.transform = "translateY(0)";
        elem.style.opacity = "1";
        containerIndex++;
    });
});
becomeGodMudalElem.addEventListener("mouseup", (e) => {
    if (e.target === becomeGodMudalElem) {
        becomeGodMudalInvisHandler();
    }
});
becomeGodMudalElem.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key === "Escape") {
        becomeGodMudalInvisHandler();
    }
});
function becomeGodMudalInvisHandler() {
    becomeGodMudalElem.style.scale = "0";
    productArticlesContainers.forEach((elem) => {
        elem.style.transform = "translateY(20rem)";
        elem.style.opacity = "0";
    });
}
