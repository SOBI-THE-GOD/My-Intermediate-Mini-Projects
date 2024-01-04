const $ = document;
const searchIcon = $.querySelector(".fa-light");
const searchInput = $.getElementById("search-bar");
const searchContainer = $.querySelector(".search-bar-cont");
const suggestionBox = $.querySelector(".suggestion-container");
let bestSuggestions = [];
const suggestionsDataArr = [
    "html",
    "css",
    "how to learn react",
    "how to learn javascript",
    "js",
    "javascript",
    "react",
    "sobi the god",
    "github",
];
// functions
const replaceClass = (elem, class1, class2) => {
    searchIcon.classList.contains(class1)
        ? elem.classList.replace(class1, class2)
        : elem.classList.replace(class2, class1);
};
const tuggleClass = (elem, className) => {
    elem.classList.toggle(className);
};
const searchIconAnmEndHandler = () => {
    searchIcon.style.animation = null;
    searchIcon.removeEventListener("animationEnd", searchIconAnmEndHandler);
    searchIcon.addEventListener("click", searchIconClickHandler);
};
const searchIconClickHandler = () => {
    searchIcon.addEventListener("animationend", searchIconAnmEndHandler);
    searchIcon.style.animation = "searchIconAnm .7s ease-in-out";
    searchIcon.removeEventListener("click", searchIconClickHandler);
    changingIconTimeOut = setTimeout(() => {
        replaceClass(searchIcon, "fa-magnifying-glass", "fa-xmark");
    }, 350);
    tuggleClass(searchInput, "input-searching");
    tuggleClass(searchContainer, "search-cont-searching");
    tuggleClass(
        $.querySelector(".search-icon-container"),
        "search-icon-container-searching"
    );
    suggestionBox.classList.remove("visible");
};
const findBestSuggests = () => {
    bestSuggestions = [];
    bestSuggestions = suggestionsDataArr.filter((elem) => {
        return elem === searchInput.value;
    });

    if (bestSuggestions.length === 0) {
        let suggestionsWithScore = [];
        let suggestionIndex = null;
        let inputArr = searchInput.value.split(" ");
        suggestionsDataArr.forEach((suggestion) => {
            suggestionsWithScore.push({ score: 0, value: suggestion });
        });
        inputArr.forEach((inputWord) => {
            if (inputWord !== "") {
                suggestionsDataArr.forEach((suggestion) => {
                    if (suggestion.includes(inputWord)) {
                        suggestionIndex = suggestionsWithScore.findIndex(
                            (suggest) => {
                                return suggest.value === suggestion;
                            }
                        );
                        suggestionsWithScore[suggestionIndex].score += 1;
                    }
                });
            }
        });
        bestSuggestions = suggestionsWithScore.sort((a, b) => {
            return b.score - a.score;
        });
    } else {
        bestSuggestions[0] = { score: 5, value: bestSuggestions[0] };
    }
};
const suggestionOnClickHandler = (e) => {
    searchInput.value = e.target.innerHTML;
    suggestionBox.classList.remove("visible");
};
const showBestSuggestions = (suggestions) => {
    suggestionBox.innerHTML = "";
    let finalSuggestions = suggestions.filter((s) => {
        return s.score > 0;
    });
    if (finalSuggestions.length > 5) {
        finalSuggestions = finalSuggestions.slice(0, 5);
    }
    const fragment = $.createDocumentFragment();
    let newElem = "";
    finalSuggestions.forEach((suggestion) => {
        newElem = $.createElement("li");
        newElem.className = "suggestion";
        newElem.innerHTML = suggestion.value;
        fragment.append(newElem);
    });
    suggestionBox.append(fragment);
    Array.from($.querySelectorAll(".suggestion")).forEach((e) => {
        e.addEventListener("click", suggestionOnClickHandler);
    });
};
const suggestHandler = () => {
    findBestSuggests();
    showBestSuggestions(bestSuggestions);
};
const searchBoxOnInput = () => {
    if (!suggestionBox.classList.contains("visible")) {
        suggestionBox.classList.add("visible");
    }
    suggestHandler();
};
// events
searchIcon.addEventListener("click", searchIconClickHandler);
searchInput.addEventListener("input", searchBoxOnInput);
