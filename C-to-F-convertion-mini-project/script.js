let $ = document;
let tempInput = $.getElementById("temp-input");
let resetButton = $.getElementById("reset-button");
let changeButton = $.getElementById("change-button");
let convertButton = $.getElementById("convert-button");
let convertTitle = $.getElementById("into-what");
let alertElem = $.getElementById("alert");
let resultElem = $.getElementById("result");
let finalTemprature = 0;
let finalResultIndex = 0;
let correctImputValue = false;
let convertToC = false;
let finalResult = "";
let isAlertVisible = false;
convertButton.addEventListener("click", converter);
function converter() {
    finalTemprature = tempInput.value;
    if (isNaN(finalTemprature) === false && finalTemprature.length > 0) {
        correctImputValue = true;
        resultElem.innerHTML = "";
        finalResultIndex = 0;
        finalTemprature = Number.parseFloat(finalTemprature).toFixed(2);
        if (convertToC) {
            finalTemprature = (finalTemprature - 30) / 2;
            finalResult =
                tempInput.value + " F° Eaquals : " + finalTemprature + " C°";
            finalResult = finalResult.split("");
            convertButton.removeEventListener("click", converter);
            let convertResultTimer = setInterval(() => {
                if (finalResultIndex === finalResult.length - 1) {
                    clearInterval(convertResultTimer);
                    convertButton.addEventListener("click", converter);
                }
                resultElem.innerHTML += finalResult[finalResultIndex];
                finalResultIndex++;
            }, 100);
            resultElem.style.animation = "OpacityUp 0.4s ease";
            resultElem.style.display = "block";
        } else {
            finalTemprature = finalTemprature * 2 + 30;
            finalResult =
                tempInput.value + " C° Eaquals : " + finalTemprature + " F°";
            finalResult = finalResult.split("");
            convertButton.removeEventListener("click", converter);
            let converterResultTimer = setInterval(() => {
                if (finalResultIndex === finalResult.length - 1) {
                    clearInterval(converterResultTimer);
                    convertButton.addEventListener("click", converter);
                }
                resultElem.innerHTML += finalResult[finalResultIndex];
                finalResultIndex++;
            }, 100);
            resultElem.style.animation = "OpacityUp 0.4s ease";
            resultElem.style.display = "block";
        }
    } else {
        if (isAlertVisible) {
            setTimeout(() => {
                alertElem.style.animation = "OpacityDown 0.4s ease";
            }, 4000);
            setTimeout(() => {
                $.getElementById("alert").style.display = "none";
                isAlertVisible = false;
            }, 4400);
        } else {
            alertElem.style.animation = "OpacityUp 0.4s ease";
            alertElem.style.display = "block";
            setTimeout(() => {
                if (!isAlertVisible) {
                    alertElem.style.animation = "OpacityDown 0.4s ease";
                }
            }, 4000);
            setTimeout(() => {
                if (!isAlertVisible) {
                    $.getElementById("alert").style.display = "none";
                    isAlertVisible = false;
                }
            }, 4400);
            isAlertVisible = true;
        }
        correctImputValue = false;
    }
}
changeButton.addEventListener("click", () => {
    if (convertToC) {
        convertToC = false;
        convertTitle.innerHTML = "C° TO F°";
        $.title = "CONVERTING C° TO F°";
        tempInput.setAttribute("placeholder", "Temprature (C°)");
    } else {
        convertToC = true;
        convertTitle.innerHTML = "F° TO C°";
        $.title = "CONVERTING F° TO C°";
        tempInput.setAttribute("placeholder", "Temprature (F°)");
    }
    console.log(convertToC);
});

resetButton.addEventListener("click", () => {
    tempInput.value = "";
    resultElem.style.animation = "OpacityDown 0.4s ease";
    setTimeout(() => (resultElem.style.display = "none"), 400);
});
