const $ = document;
const navBarElem = $.querySelector(".nav-bar");
const musicTrackElem = $.querySelector(".music-track");
const playButtonContainerElem = $.querySelector(".play-button-container");
const playButtonElem = $.querySelector(".play-button");
const musicDurationBarSelectorElem = $.querySelector(".duration-bar-selector");
let imageRotateDEG = 0;
const audioRepeatToggleElem = $.querySelector(".audio-repeat-tuggle-button");
audioRepeatToggleElem.addEventListener("mouseup", audioRepeatToggleHandler);
const changeDurationSelectorDress = $.querySelector(".change-duration-dress");
let audioDurationBarExactWidth = 0;
let mouseDownEvent = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
    view: window,
});
$.querySelector(".duration-bar-click-dress").addEventListener(
    "mousedown",
    (e) => {
        musicDurationBarSelectorElem.style.left =
            e.pageX -
            (e.target.parentElement.parentElement.offsetWidth -
                audioDurationBarContainerWidth) /
                2 +
            "px";
        audioDurationBarElem.style.width =
            e.pageX -
            (e.target.parentElement.parentElement.offsetWidth -
                audioDurationBarContainerWidth) /
                2 +
            "px";
        musicTrackElem.currentTime =
            (audioDurationBarElem.offsetWidth /
                audioDurationBarContainerWidth) *
            musicTrackElem.duration;
        musicDurationBarSelectorElem.dispatchEvent(mouseDownEvent);
    }
);
function audioRepeatToggleHandler(e) {
    e.target.classList.toggle("orange-color");
    if (musicTrackElem.loop) {
        musicTrackElem.loop = false;
    } else {
        musicTrackElem.loop = true;
    }
}
$.querySelector(".audio-shuffle-toggle-button").addEventListener(
    "mouseup",
    (e) => {
        e.target.classList.toggle("pink-purple-color");
    }
);
const audioDurationBarContainerWidth = $.querySelector(
    ".duration-bar-container"
).offsetWidth;
const audioDurationBarElem = $.querySelector(".duration-bar");
const audioTimeBackWireButton = $.querySelector(".sec-back-wire");
const audioTimeForwardButton = $.querySelector(".sec-forward");
audioTimeBackWireButton.addEventListener("mouseup", audioTimeBackWireHandler);
function audioTimeBackWireHandler() {
    if (musicTrackElem.currentTime < 10) {
        musicTrackElem.currentTime = 0;
    } else if (isAudioPlayed) {
        musicTrackElem.currentTime -= 10;
    }
}
audioTimeForwardButton.addEventListener("mouseup", audioTimeForwardHandler);
function audioTimeForwardHandler() {
    if (musicTrackElem.currentTime > musicTrackElem.duration - 10) {
        musicTrackElem.currentTime = musicTrackElem.duration;
    } else if (isAudioPlayed) {
        musicTrackElem.currentTime += 10;
    }
}
$.addEventListener("scroll", scrollHandler);
function scrollHandler() {
    if (window.scrollY > 0) {
        navBarElem.classList.add("scrolled-nav-bar");
    } else {
        navBarElem.classList.remove("scrolled-nav-bar");
    }
}
playButtonContainerElem.addEventListener("mouseover", buttonHoverHandler);
playButtonElem.addEventListener("mouseover", buttonHoverHandler);
playButtonContainerElem.addEventListener("mouseleave", (e) => {
    e.target.style.scale = "1";
    playButtonContainerElem.style.backgroundColor = "#ffc681";
    playButtonContainerElem.style.boxShadow = "0 0 20px 5px rgba(0, 0, 0, 0.1)";
});
function buttonHoverHandler() {
    playButtonContainerElem.style.scale = "1.06";
    playButtonContainerElem.style.backgroundColor = "#ffbc6a";
}
playButtonContainerElem.addEventListener(
    "mousedown",
    playButtonMousDownHandler
);
playButtonContainerElem.addEventListener("mouseup", buttonMouseUpHandler);

function playButtonMousDownHandler() {
    playButtonContainerElem.style.scale = "1";
}
function buttonMouseUpHandler() {
    buttonHoverHandler();
    playPauseAudioHandler();
    audioImageRotateHandler();
    audioImageBorderHandler();
    audioCurrentTimeHandler();
}
let isAudioPlayed = false;
let currentTimeDDuration = 0;
function audioCurrentTimeHandler() {
    let audioCurrentTime = setInterval(() => {
        currentTimeDDuration =
            musicTrackElem.currentTime / musicTrackElem.duration;
        audioDurationBarElem.style.width =
            audioDurationBarContainerWidth * currentTimeDDuration + "px";
        musicDurationBarSelectorElem.style.left =
            audioDurationBarContainerWidth * currentTimeDDuration + "px";
        if (!isAudioPlayed) {
            clearInterval(audioCurrentTime);
        }
        if (musicTrackElem.currentTime >= musicTrackElem.duration) {
            if (!musicTrackElem.loop) {
                clearInterval(audioCurrentTime);
                pauseAudioHandler();
                musicTrackElem.currentTime = 0;
                $.getElementById("music-picture").style.borderRadius = "0.3rem";
            }
            audioDurationBarElem.style.width = 0 + "px";
            musicDurationBarSelectorElem.style.left = "0px";
        }
    }, 1);
}
function playPauseAudioHandler() {
    if (isAudioPlayed === false) {
        musicTrackElem.play();
        isAudioPlayed = true;
        playButtonElem.classList.remove("fa-play");
        playButtonElem.classList.add("fa-pause");
        playButtonElem.style.marginLeft = "0";
    } else {
        pauseAudioHandler();
    }
}
function pauseAudioHandler() {
    musicTrackElem.pause();
    isAudioPlayed = false;
    playButtonElem.classList.remove("fa-pause");
    playButtonElem.classList.add("fa-play");
    playButtonElem.style.marginLeft = "0.4rem";
}
function audioImageBorderHandler() {
    $.getElementById("music-picture").style.borderRadius = "50%";
}
function audioImageRotateHandler() {
    let audioImageRotateTimer = setInterval(() => {
        $.getElementById("music-picture").style.rotate =
            360 * (musicTrackElem.currentTime / musicTrackElem.duration) +
            "deg";
        if (!isAudioPlayed) {
            clearInterval(audioImageRotateTimer);
        }
    }, 0.5);
}
musicDurationBarSelectorElem.addEventListener(
    "mouseenter",
    musicDurationBarSelectorMouseEnterHandler
);
function musicDurationBarSelectorMouseEnterHandler(e) {
    e.target.style.backgroundColor = "#ffbc6a";
}
musicDurationBarSelectorElem.addEventListener(
    "mouseleave",
    musicDurationBarSelectorMouseLeaveHandler
);
function musicDurationBarSelectorMouseLeaveHandler(e) {
    e.target.style.backgroundColor = "#ffc681";
}
musicDurationBarSelectorElem.addEventListener(
    "mousedown",
    musicDurationBarSelectorMouseDownHandler
);
function musicDurationBarSelectorMouseDownHandler(e) {
    e.target.style.backgroundColor = "#ffc681";
    changeDurationSelectorDress.style.display = "block";
}
changeDurationSelectorDress.addEventListener("mouseup", (e) => {
    e.target.style.display = "none";
    musicDurationBarSelectorElem.style.backgroundColor = "#ffbc6a";
});
changeDurationSelectorDress.addEventListener("mousemove", (e) => {
    audioDurationBarExactWidth =
        e.pageX - (e.target.offsetWidth - audioDurationBarContainerWidth) / 2;
    if (
        audioDurationBarExactWidth <= audioDurationBarContainerWidth &&
        audioDurationBarExactWidth >= 0
    ) {
        audioDurationBarElem.style.width = audioDurationBarExactWidth + "px";
        musicDurationBarSelectorElem.style.left =
            audioDurationBarExactWidth + "px";
        musicTrackElem.currentTime =
            (audioDurationBarElem.offsetWidth /
                audioDurationBarContainerWidth) *
            musicTrackElem.duration;
    }
    if (audioDurationBarExactWidth < 0) {
        audioDurationBarElem.style.width = "0px";
        musicDurationBarSelectorElem.style.left = "0px";
        musicTrackElem.currentTime = 0;
    }
    if (audioDurationBarExactWidth > audioDurationBarContainerWidth) {
        audioDurationBarElem.style.width =
            audioDurationBarContainerWidth + "px";
        musicDurationBarSelectorElem.style.left =
            audioDurationBarContainerWidth + "px";
        musicTrackElem.currentTime = musicTrackElem.duration;
    }
});
