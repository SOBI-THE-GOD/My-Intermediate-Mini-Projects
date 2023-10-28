const $ = document;
const brightBarDress = $.querySelector(".brightness-dress");
const brightBarWrapper = $.querySelector(".brightness-bar-wrapper");
const brightBar = $.querySelector(".brightness-bar");
const brightBarClickDress = $.querySelector(".brightness-click-dress");
let brightBarWrapperWidth, brightBarWrapperDistantLeft, brightnessRatio;
let mouseMoveEvent = new MouseEvent("mousemove", {
    bubbles: true,
    cancelable: true,
    view: window,
});
// event listeners
brightBarClickDress.addEventListener(
    "mousedown",
    startChangingBrightnessHandler
);
// functions
function startChangingBrightnessHandler(e) {
    brightBarWrapper.style.scale = "0.98";
    brightBarDress.style.display = "block";
    brightBarDress.addEventListener("mouseup", stopChangingBrightnessHandler);
    brightBarDress.addEventListener("mousemove", changingBrightnessHandler);
    brightBarClickDress.style.display = "none";
    $.body.style.cursor = "grabbing";
    brightnessCalculator(e);
}
function stopChangingBrightnessHandler() {
    brightBarDress.style.display = "none";
    brightBarClickDress.style.display = "block";
    $.body.style.cursor = "default";
    brightBarWrapper.style.scale = "1";
    brightBarDress.removeEventListener(
        "mouseup",
        stopChangingBrightnessHandler
    );
    brightBarDress.removeEventListener("mousemove", changingBrightnessHandler);
}

function changingBrightnessHandler(e) {
    brightnessCalculator(e);
}

function brightnessCalculator(e) {
    brightBarWrapperWidth = brightBarWrapper.offsetWidth;
    brightBarWrapperDistantLeft = brightBarWrapper.offsetLeft;
    brightnessRatio =
        (e.pageX - brightBarWrapperDistantLeft) / brightBarWrapperWidth;
    brightBar.style.width = `${brightnessRatio * brightBarWrapperWidth}px`;
    $.body.style.filter = `brightness(${brightnessRatio * 100}%)`;
    if (e.pageX - brightBarWrapperDistantLeft <= 0) {
        brightBar.style.width = `0px`;
        $.body.style.filter = `brightness(0%)`;
    } else if (e.pageX - brightBarWrapperDistantLeft >= brightBarWrapperWidth) {
        brightBar.style.width = `${brightBarWrapperWidth}px`;
        $.body.style.filter = `brightness(100%)`;
    }
}
