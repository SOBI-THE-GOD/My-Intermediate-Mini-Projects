const $ = document;
let currentBand = 0;
const watchBandsImg = $.getElementById("watch-bands-picture");
// --big-hand-rot : -90deg;
// --little-hand-rot: 90deg;
// --seconds-hand-rot: -90deg;
// 325px
function watchHandsMoveHanlder() {
    setTimeout(() => {
        $.documentElement.style.setProperty(
            "--big-hand-rot",
            getMinutesHandRotaion() + "deg"
        );
        $.documentElement.style.setProperty(
            "--seconds-hand-rot",
            getSecondsHandRotation() + "deg"
        );
        $.documentElement.style.setProperty(
            "--little-hand-rot",
            getHoursHandRotation() + "deg"
        );
        watchHandsMoveHanlder();
    }, 5);
}
function getSecondsHandRotation() {
    let currentDate = new Date();
    return (
        ((currentDate.getSeconds() + currentDate.getMilliseconds() / 1000) /
            60) *
            360 -
        90
    );
}
function getMinutesHandRotaion() {
    let currentDate = new Date();
    return (
        ((currentDate.getMinutes() +
            (currentDate.getSeconds() + currentDate.getMilliseconds() / 1000) /
                60) /
            60) *
            360 -
        90
    );
}
function getHoursHandRotation() {
    let currentDate = new Date();
    return (
        ((currentDate.getHours() +
            (currentDate.getMinutes() + currentDate.getSeconds() / 60) / 60) /
            12) *
            360 +
        90
    );
}
function autoTowardRight() {
    setTimeout(() => {
        if (currentBand < 3) {
            currentBand++;
            watchBandsImg.style.left =
                "calc( 50% + " + currentBand * 325 + "px";
            autoTowardRight();
        } else {
            autoTowardLeft();
        }
    }, 7000);
}
function autoTowardLeft() {
    setTimeout(() => {
        if (currentBand > -3) {
            currentBand--;
            watchBandsImg.style.left =
                "calc( 50% + " + currentBand * 325 + "px";
            autoTowardLeft();
        } else {
            autoTowardRight();
        }
    }, 10000);
}
watchHandsMoveHanlder();
autoTowardLeft();
